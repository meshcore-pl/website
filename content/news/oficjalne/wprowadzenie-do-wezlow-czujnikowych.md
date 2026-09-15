---
title: Wprowadzenie do węzłów czujnikowych
description: Scott Powell, główny programista firmware MeshCore, pokazuje krok po kroku, jak zbudować własny firmware węzła czujnikowego (sensor node) na bazie szablonu simple_sensor - konfigurację PlatformIO, alarmy, telemetrię, dane szeregów czasowych i niestandardowe komendy CLI.
createdAt: 14.09.2026
sourceUrl: https://blog.meshcore.io/2026/09/14/sensor-intro
tags: [Poradnik, Oprogramowanie]
---

# Wprowadzenie do węzłów czujnikowych
![Węzeł czujnikowy MeshCore](https://blog.meshcore.io/assets/images/2026/09/14/sensor_mesh.jpg)

_Scott Powell, główny programista firmware MeshCore_

Węzeł czujnikowy (sensor node) jest w MeshCore dużo trudniejszy w uruchomieniu niż pozostałe typy węzłów, ponieważ - w przeciwieństwie do repeatera, companiona i room serwera - nie budujemy dla niego gotowych wariantów wraz z każdym wydaniem. Wymaga to więc pewnej wiedzy programistycznej.

Powód jest prosty: liczba możliwych dostosowań, które trzeba by obsłużyć, jest zbyt duża - musiałyby powstać tysiące wariantów. Dlatego węzeł czujnikowy trzeba zaprojektować pod konkretny cel, na przykład monitorowanie poziomu wody w zbiorniku.

## Konfiguracja środowiska
Potrzebne narzędzia to [VSCode](https://code.visualstudio.com/download) oraz zainstalowane w nim rozszerzenie [PlatformIO](https://platformio.org/). Sklonuj repozytorium firmware'u MeshCore za pomocą Gita:

```
git clone https://github.com/meshcore-dev/MeshCore.git
```

## Zaczynając od przykładu
Firmware czujnika to w gruncie rzeczy startowy szablon, zawierający już większość potrzebnych komponentów. W drzewie projektu znajdziesz go pod `/examples/simple_sensor`.

Typowe dostosowania powinny ograniczać się do modułu `main.cpp`. Znajduje się w nim klasa `MyMesh`, dziedzicząca po `SensorMesh`, która dostarcza całą niezbędną „hydraulikę” i punkty zaczepienia (hooks), z których można korzystać.

## Wybór wariantu płytki
Wiele obsługiwanych płytek ma już zdefiniowany cel PlatformIO (`env`) dla przykładowego firmware'u simple_sensor, np. `[env:Heltec_v3_sensor]`. Może się jednak okazać, że trzeba dopisać własną definicję `env` w pliku `platformio.ini` w jednym z folderów `/variant`.

Ustala to reguły budowania i zależności dla danej kombinacji płytki i roli firmware'u. Może być też konieczna modyfikacja plików `target.h/cpp` danego wariantu - te moduły składają różne obiekty globalne, na przykład:

```
EnvironmentSensorManager sensors;
```

Ta klasa pomocnicza to swego rodzaju szwajcarski scyzoryk, z którego korzystają też inne firmware'y (np. repeater) do niskopoziomowej obsługi fizycznych czujników, takich jak BME180. Większość tej pracy jest więc już zrobiona, ale zwykle trzeba WŁĄCZYĆ moduły, których dany węzeł ma używać. Robi się to w pliku `platformio.ini` swojego wariantu, za pomocą `build_flags`, na przykład:

```
build_flags =
  -D ENV_INCLUDE_GPS=1
  -D ENV_INCLUDE_AHTX0=1
  -D ENV_INCLUDE_BME280=1
  -D ENV_INCLUDE_BMP280=1
  -D ENV_INCLUDE_SHTC3=1
  -D ENV_INCLUDE_SHT4X=1
  -D ENV_INCLUDE_LPS22HB=1
  -D ENV_INCLUDE_INA3221=1
  -D ENV_INCLUDE_INA219=1
  -D ENV_INCLUDE_INA226=1
  -D ENV_INCLUDE_INA260=1
  -D ENV_INCLUDE_MLX90614=1
  -D ENV_INCLUDE_VL53L0X=1
  -D ENV_INCLUDE_BME680=1
  -D ENV_INCLUDE_BMP085=1
```

## Podstawowe pojęcia
Węzły czujnikowe obsługują następujące funkcje:

- Alarmy (z priorytetem wysokim lub niskim)
- Zapytania telemetryczne (inne węzły mogą pobrać telemetrię z tego węzła)
- Dane szeregów czasowych
- Niestandardowa logika komend CLI (np. „włącz przełącznik A”)
- Subskrypcje wypychania telemetrii (NOWOŚĆ: wsparcie pojawi się wkrótce)

## Alarmy
Alarmy pokazano w przykładzie za pomocą klasy `Trigger` i wywołań `alertIf()`:

```
Trigger low_batt, critical_batt;

void onSensorDataRead() override {
  float batt_voltage = getVoltage(TELEM_CHANNEL_SELF);

  alertIf(batt_voltage < 3.4f, critical_batt, HIGH_PRI_ALERT, "Battery is critical!");
  alertIf(batt_voltage < 3.6f, low_batt, LOW_PRI_ALERT, "Battery is low");
}
```

Alarmy o wysokim priorytecie ponawiają wysyłkę do węzłów z listy ACL mających bit uprawnień `PERM_RECV_ALERTS_HI`, czekając na potwierdzenie tak jak zwykłe wiadomości tekstowe. Alarmy o niskim priorytecie wysyłane są jednorazowo, bez czekania na potwierdzenie, do węzłów ACL z bitem `PERM_RECV_ALERTS_LO`.

## Telemetria
Telemetria działa automatycznie, bo to podstawowy mechanizm MeshCore. Obiekt `sensor`, zdefiniowany w danym targecie/wariancie płytki, zajmuje się kodowaniem LPP wszystkich zebranych odczytów telemetrycznych.

Zazwyczaj to inne węzły proszą węzeł czujnikowy o telemetrię, a on na to odpowiada. Wkrótce subskrypcje wypychania telemetrii pozwolą węzłom czujnikowym samodzielnie wysyłać telemetrię do subskrybentów, gdy wartości zmienią się o minimalną zadaną deltę. Subskrybent może wysłać żądanie SUBSCRIBE określające np. zmianę temperatury o 2 stopnie Celsjusza.

Wypychanie telemetrii ma wbudowane zabezpieczenia przed nadużyciami:

- Subskrypcje mają czas wygaśnięcia (zwracany w odpowiedzi na subskrypcję), po którym trzeba zasubskrybować ponownie
- Jeśli nie ma ustalonej bezpośredniej trasy, jako rozwiązanie zapasowe trzeba użyć [zasięgu regionu](https://meshcorepolska.org/dokumentacja/meshcore/regionalizacja-wiadomosci) (region scope)
- Subskrybent musi określić kanały/typy LPP oraz minimalne delty wyzwalające wypchnięcie

## Dane szeregów czasowych
Czujniki mogą zbierać okresowe odczyty przechowywane w ulotnej pamięci bufora cyklicznego za pomocą klasy pomocniczej `TimeSeriesData`:

```
TimeSeriesData  battery_data;

MyMesh(mesh::MainBoard& board, mesh::Radio& radio, mesh::MillisecondClock& ms, mesh::RNG& rng, mesh::RTCClock& rtc, mesh::MeshTables& tables)
   : SensorMesh(board, radio, ms, rng, rtc, tables), 
     battery_data(12*24, 5*60)    // 24 godziny danych baterii, co 5 minut
{
}

void onSensorDataRead() override {
  float batt_voltage = getVoltage(TELEM_CHANNEL_SELF);

  battery_data.recordData(getRTCClock(), batt_voltage);   // zapisz stan baterii
}

int querySeriesData(uint32_t start_secs_ago, uint32_t end_secs_ago, MinMaxAvg dest[], int max_num) override {
  battery_data.calcMinMaxAvg(getRTCClock(), start_secs_ago, end_secs_ago, &dest[0], TELEM_CHANNEL_SELF, LPP_VOLTAGE);
  return 1;
}
```

Zdalne węzły mogą wysyłać zapytania o minimum/maksimum/średnią z podanym zakresem czasu. Metodę `querySeriesData()` trzeba nadpisać tak jak pokazano powyżej. Wartość zwracana to liczba obsługiwanych serii danych.

## Niestandardowe komendy CLI
Zdalne węzły mogą sterować siłownikami (np. diodami LED czy serwomechanizmami) za pomocą niestandardowej logiki komend CLI w metodzie `handleCustomCommand()`:

```
bool handleCustomCommand(uint32_t sender_timestamp, char* command, char* reply) override {
  if (strcmp(command, "magic") == 0) {    // przykładowa obsługa komendy niestandardowej
    strcpy(reply, "**Magic now done**");
    return true;   // obsłużono
  }
  return false;  // nieobsłużono
}
```

Takie podejście łatwo dostosować do potrzeb konkretnego węzła czujnikowego. Zwróć `true`, gdy komenda została obsłużona, a odpowiedź umieść w buforze `reply` - trafi ona do węzła, który wysłał komendę.
