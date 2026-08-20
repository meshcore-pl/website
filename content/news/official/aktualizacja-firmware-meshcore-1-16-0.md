---
title: MeshCore Firmware v1.16.0
description: 6 czerwca 2026 - firmware v1.16.0 MeshCore, nowe zmienne CLI ograniczające ruch flood, dłuższa preambuła, rozszerzone ACK i obsługa nowych urządzeń.
createdAt: 6.06.2026
sourceUrl: https://blog.meshcore.io/2026/06/06/release-1-16-0
tags: [Lista zmian, Oprogramowanie]
---

# MeshCore Firmware v1.16.0
![MeshCore Firmware](https://blog.meshcore.io/assets/images/firmware_release.jpg)

6 czerwca 2026 ukazało się wydanie oprogramowania **v1.16.0** dla MeshCore.
Najnowszy firmware pobierzesz z [flasher.meshcore.io](https://flasher.meshcore.io).

## Nowe funkcje
- Nowa zmienna konfiguracyjna CLI `flood.max.unscoped`, ograniczająca ruch flood bez określonego zakresu (unscoped) ([#2661](https://github.com/meshcore-dev/MeshCore/pull/2661))
- Nowa zmienna konfiguracyjna CLI `flood.max.advert`, ograniczająca liczbę przeskoków (hopów) advertów ([#2702](https://github.com/meshcore-dev/MeshCore/pull/2702))
- Dłuższa preambuła dla niższych SF (32 symbole dla SF ≤ 8, 16 symboli dla SF > 8) ([#1954](https://github.com/meshcore-dev/MeshCore/pull/1954))
- Aplikacja/companion mogą teraz wykonywać zapytania anon_req/response do urządzeń spoza listy kontaktów ([#2672](https://github.com/meshcore-dev/MeshCore/pull/2672))
- Automatyczne wyłączanie companiona - wyłączone przy zasilaniu zewnętrznym, nowe ostrzeżenie na wyświetlaczu ([#2663](https://github.com/meshcore-dev/MeshCore/pull/2663))
- Nowa komenda CLI `region def ...` ([#2540](https://github.com/meshcore-dev/MeshCore/pull/2540))
- Rozszerzona obsługa ACK (extended ACK) ([#2594](https://github.com/meshcore-dev/MeshCore/pull/2594))
- Aplikacja/companion mogą teraz komponować i wysyłać surowe pakiety (raw packets) ([#2543](https://github.com/meshcore-dev/MeshCore/pull/2543))
- Companion może teraz nadpisać domyślny zakres (scope) na jawnie nieokreślony (unscoped) ([#2492](https://github.com/meshcore-dev/MeshCore/pull/2492))

## Usprawnienia
- Poprawki oszczędzania energii dla wszystkich przemienników na ESP ([#1687](https://github.com/meshcore-dev/MeshCore/pull/1687))
- Poprawki oszczędzania energii dla companionów na nRF ([#2286](https://github.com/meshcore-dev/MeshCore/pull/2286))

## Nowo obsługiwane urządzenia
- LilyGo T-Echo Card ([#2517](https://github.com/meshcore-dev/MeshCore/pull/2517))
- LilyGo T-Impulse Plus ([#2522](https://github.com/meshcore-dev/MeshCore/pull/2522))
- Station G3 ([#2515](https://github.com/meshcore-dev/MeshCore/pull/2515))
- Heltec Mesh Node T1 ([#2520](https://github.com/meshcore-dev/MeshCore/pull/2520))
- nowe warianty Xiao S3 (repeater, companion i inne) ([#2383](https://github.com/meshcore-dev/MeshCore/pull/2383))

## Poprawki błędów i pozostałe zmiany
- Poprawki budowania dla platformy docelowej RP2040 ([#2684](https://github.com/meshcore-dev/MeshCore/pull/2684))
- Zwiększono maksymalny rozmiar ramki protokołu companiona (teraz 176) ([#2022](https://github.com/meshcore-dev/MeshCore/pull/2022))
- Poprawki RAK Wismesh Tag ([#2664](https://github.com/meshcore-dev/MeshCore/pull/2664))
- Naprawiono błąd wykrywania sąsiadów przez przemiennik, gdy `path.hash.mode` != 0
- RAK4631 - użycie sterownika Bosch dla czujnika BME680 ([#2634](https://github.com/meshcore-dev/MeshCore/pull/2634))
- Włączono komendę CLI `radio.rxgain` dla LR1110 (T1000e) ([#2235](https://github.com/meshcore-dev/MeshCore/pull/2235))
- Domyślny interwał advertu typu flood zwiększony do 47 godzin (wcześniej 12) ([#2608](https://github.com/meshcore-dev/MeshCore/pull/2608))
- Zmiana częstotliwości client repeat (off-grid) dla UE - z 869,0 na 869,495 MHz ([#2604](https://github.com/meshcore-dev/MeshCore/pull/2604))
- Walidacja CLI dla `rxdelay`, `txdelay` i `direct.txdelay` ([#2443](https://github.com/meshcore-dev/MeshCore/pull/2443))
- Heltec T096 - obsługa węzła czujnikowego ([#2576](https://github.com/meshcore-dev/MeshCore/pull/2576))
- Naprawiono companiona USB dla Heltec E290 ([#2562](https://github.com/meshcore-dev/MeshCore/pull/2562))
- Przeprojektowano logikę ponownego łączenia companiona WiFi na nieblokującą ([#2493](https://github.com/meshcore-dev/MeshCore/pull/2493))
- Zmniejszono zużycie RAM na starszych płytkach ([#2497](https://github.com/meshcore-dev/MeshCore/pull/2497))
- nRF - aktualizacja biblioteki CustomLFS do wersji 2.2 ([#2519](https://github.com/meshcore-dev/MeshCore/pull/2519))
- T-Echo Lite - poprawki RXEN, TXEN i TCXO ([#2511](https://github.com/meshcore-dev/MeshCore/pull/2511))
- Poprawki timeoutu ramek modemu KISS ([#2490](https://github.com/meshcore-dev/MeshCore/pull/2490))
- Przeprojektowano menedżera czujników ([#2327](https://github.com/meshcore-dev/MeshCore/pull/2327))
- Dźwięk startowy wyciszany, jeśli preferencja dźwięku jest wyłączona ([#2460](https://github.com/meshcore-dev/MeshCore/pull/2460))
- Dodano warianty modemu KISS dla większości płytek ([#2620](https://github.com/meshcore-dev/MeshCore/pull/2620), [#2432](https://github.com/meshcore-dev/MeshCore/pull/2432))
- Fork Adafruit nRF BLE - zapobiega zawieszaniu się podczas szybkiego łączenia/rozłączania ([#2430](https://github.com/meshcore-dev/MeshCore/pull/2430))
- RAK3401 companion - obsługa przycisku analogowego ([#2436](https://github.com/meshcore-dev/MeshCore/pull/2436))
- Heltec - LNA domyślnie wyłączone ([#2439](https://github.com/meshcore-dev/MeshCore/pull/2439))
- Nowe ekrany powitalne (splash screens) ([#2424](https://github.com/meshcore-dev/MeshCore/pull/2424))
- Poprawka diody LED Tx dla Sensecap Solar ([#2157](https://github.com/meshcore-dev/MeshCore/pull/2157))
- Nowy wariant przemiennika: zestaw rozszerzający Heltec V4 ([#2326](https://github.com/meshcore-dev/MeshCore/pull/2326))
- Nowe warianty companiona T-Echo Lite bez powłoki (non-shell) ([#2503](https://github.com/meshcore-dev/MeshCore/pull/2503), [#2353](https://github.com/meshcore-dev/MeshCore/pull/2353))
- T-Echo Lite - poprawka pomiaru baterii ([#2287](https://github.com/meshcore-dev/MeshCore/pull/2287))
- RAK4631 - poprawka pinu resetu sx1262 ([#2008](https://github.com/meshcore-dev/MeshCore/pull/2008))
- Heltec T096, Wireless Tracker - FEM/LNA domyślnie włączone ([#2340](https://github.com/meshcore-dev/MeshCore/pull/2340))
- R1 Neo - poprawka wyłączania ([#2371](https://github.com/meshcore-dev/MeshCore/pull/2371))
- Heltec V4 - obsługa `adc.multiplier` ([#2335](https://github.com/meshcore-dev/MeshCore/pull/2335))

## Ograniczanie ruchu bez zakresu (unscoped)
Nowa zmienna konfiguracyjna CLI `flood.max.unscoped` służy do ograniczania ruchu flood bez określonego zakresu.
Podobnie jak `flood.max`, odrzuca pakiety typu flood bez zakresu, które osiągnęły określoną liczbę przeskoków. Domyślnie wynosi 64, co w praktyce oznacza wyłączony limit.

## Ograniczanie ruchu advertów
Nowa zmienna konfiguracyjna CLI `flood.max.advert` służy wyłącznie do ograniczania advertów.
Podobnie jak `flood.max`, odrzuca pakiety advertów, które osiągnęły określoną liczbę przeskoków. Domyślnie wynosi 8.

## Nowa preambuła
Przy niższych wartościach Spreading Factor radio ma mniej czasu na zsynchronizowanie się z nadchodzącym pakietem, dlatego ta zmiana wydłuża preambułę dla szybszych SF, zmniejszając ryzyko jej pominięcia.
Dla SF ≤ 8 preambuła ma teraz 32 symbole.

## Ulepszone wykrywanie regionów w aplikacji mobilnej
Nowy firmware companiona oraz najnowsza wersja aplikacji pozwalają na wykonywanie doraźnych (ad-hoc) zapytań do pobliskich przemienników bez konieczności wcześniejszego dodawania ich do kontaktów.
Usprawni to zarówno wykrywanie przemienników, jak i regionów.

## Nowa komenda `region def`
Definiowanie regionów przez CLI było dotychczas dość rozwlekłe.
Najnowsza obsługa CLI wprowadza nową komendę `region def...`, która oferuje skróconą notację do definiowania regionów, zwłaszcza tych z głębokim zagnieżdżeniem.

Więcej informacji znajdziesz w [dokumentacji poleceń CLI](https://docs.meshcore.io/cli_commands) (w języku angielskim).

## Rozszerzona obsługa ACK
Najnowsze firmware wprowadzają obsługę „rozszerzonych ACK” (extended ACK) - mają one 6 bajtów zamiast 4.
Dodatkowe bajty zawierają rozszerzony numer próby oraz dodatkowy losowy bajt.
To przygotowanie pod przyszłą funkcję aplikacji, która pozwoli na znacznie więcej niż 4 próby wysyłania wiadomości bezpośrednich.
Na razie w pierwszej kolejności trzeba zaktualizować przemienniki.

## Surowe pakiety companiona
Najnowsze firmware companiona pozwalają teraz aplikacjom na komponowanie pełnego pakietu, czyli nagłówków, trasy i danych.
Współgra to z istniejącą funkcją RxLog, dzięki czemu aplikacja może samodzielnie wysyłać i odbierać surowe pakiety.
