---
title: SenseCAP MeshTracker X1 - specyfikacja i pinout
description: Karta techniczna SenseCAP MeshTracker X1 (Seeed Studio) - nRF52840, LoRa Semtech LR2021, dwupasmowy GNSS L1+L5, bateria 1100 mAh oraz pinout modułów.
canonical: /dokumentacja/schematy/sensecap-meshtracker-x1
createdAt: 21.08.2026
updatedAt: 22.08.2026
---

# SenseCAP MeshTracker X1 - nRF52840 z GPS dwupasmowym {toc: SenseCAP MeshTracker X1}
Kieszonkowe urządzenie od Seeed Studio z fabrycznie wbudowanym, dwupasmowym GPS (L1+L5), przeznaczone do śledzenia lokalizacji w sieci mesh bez internetu i zasięgu GSM. Fabrycznie działa na firmware Meshtastic, ale sprzęt (`nRF52840` + radio LoRa) pozwala też na przeflashowanie na MeshCore.

## Najważniejsze parametry
- Mikrokontroler: `Nordic nRF52840`
- Radio LoRa: `Semtech LR2021`, pasmo 863-928 MHz, moc do 22 dBm, czułość do -141 dBm
- Zasięg: do 8 km w linii wzroku (915 MHz)
- GNSS: dwupasmowy L1+L5, wbudowany barometr (300-1100 hPa, dokładność ±0,03 hPa) i czujnik temperatury (dokładność ±1°C)
- Pamięć Flash: 8 MB (SPI)
- Bluetooth: 5.0
- USB-C: ładowanie, aktualizacje firmware, debugowanie
- Bateria: 1100 mAh, do 5 dni pracy, napięcie pełnego naładowania 4,37 V
- Silnik wibracyjny: `DRV2605L`
- Obudowa: `IP66` (pyłoszczelna i wodoodporna)
- Wymiary: 90 × 57 × 8 mm, waga 45 g
- Temperatura pracy: -20...60°C

## Piny modułów wewnętrznych
Wg oficjalnej tabeli „Pin List" producenta - piny `RTC_INT`, `PWR_EN` i `RTC_PWR_EN` są przypisane do bloku `GNSS` (prawdopodobnie zasilanie podtrzymania RTC modułu GNSS), a nie osobnego bloku RTC/zasilania systemu.

| Blok               | Piny                                | GPIO                                      | Protokół  | Funkcja |
|--------------------|--------------------------------------|--------------------------------------------|-----------|---------|
| LoRa (LR2021)      | SPIMISO / SPIMOSI / SPISCK / SPInCS  | P1.08 / P1.09 / P0.11 / P0.12               | SPI       | Komunikacja z radiem |
| LoRa (LR2021)      | LR_RST / LR_BUSY / LR_DIO8           | P1.10 / P0.07 / P1.01                       | GPIO      | Reset, status, przerwanie |
| GNSS               | TX / RX                              | P0.13 / P0.14                               | UART      | Transmisja danych pozycji |
| GNSS               | Sleep_INT / PPS0                     | P0.30 / P0.04                               | GPIO      | Uśpienie, sygnał PPS |
| GNSS               | RTC_INT / PWR_EN / RTC_PWR_EN        | P0.29 / P1.11 / P1.13                       | GPIO      | Przerwanie RTC, zasilanie modułu GNSS i jego RTC |
| Pamięć Flash       | SPISCK / SPInCS / SPIO0-SPIO3        | P0.19 / P0.20 / P0.21-P0.23, P1.00           | SPI       | Pamięć Flash 8 MB |
| Dioda RGB          | R / G / B                            | P0.03 / P0.24 / P0.28                       | GPIO      | Dioda statusu |
| Przycisk           | -                                     | P0.06                                       | GPIO      | Wejście użytkownika |
| Buzzer             | -                                     | P0.25                                       | GPIO      | Sygnalizacja dźwiękowa |
| Zasilanie sensorów | Sensor PWR EN                        | P1.07                                       | GPIO      | Włączanie zasilania czujników |
| Silnik wibracyjny  | EN / SCL / SDA                       | P1.05 / P1.14 / P1.15                       | GPIO/IIC  | Sterowanie `DRV2605L` |
| Czujnik ciśnienia  | SCL / SDA                            | P1.14 / P1.15                               | IIC       | Współdzieli magistralę z silnikiem wibracyjnym |

> [!NOTE]
> Producent wymienia też piny pod czujnik 6-osiowy i 3-osiowy oznaczone jako „Future Version" - nieobecne na obecnie sprzedawanym sprzęcie, dlatego pominięte w tabeli.

[Oficjalna dokumentacja producenta (Seeed Studio Wiki)](https://wiki.seeedstudio.com/meshtracker_x1_intro/) - pełny opis sprzętu, testy baterii i tutoriale programistyczne.
