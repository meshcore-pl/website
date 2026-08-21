---
title: EBYTE E22P-868M30S - pinout i dokumentacja
description: Karta techniczna modułu LoRa EBYTE E22P-868M30S (SX1262 + PA/LNA, 868 MHz, do 30 dBm) - pinout SPI, parametry elektryczne i link do dokumentacji producenta.
canonical: /dokumentacja/schematy/ebyte-e22p-868m30s
createdAt: 21.08.2026
---

# EBYTE E22P-868M30S - moduł LoRa {toc: EBYTE E22P-868M30S}
Moduł SMD oparty na chipie `SX1262`, rozszerzony przez producenta o dodatkowy front-end RF (wzmacniacz mocy PA i wzmacniacz małoszumny LNA), dzięki czemu osiąga moc nadawania do 30 dBm (1 W) - znacznie więcej niż typowe moduły oparte bezpośrednio na SX1262/SX1268. Wymaga zewnętrznego MCU jako sterownika (komunikacja po SPI).

## Najważniejsze parametry
- Chip RF: `SX1262` + wbudowany front-end RF (PA + LNA)
- Pasmo: 863,3-873,3 MHz (wariant 868 MHz)
- Maks. moc nadawania: 30 dBm, regulowana programowo w wielu poziomach
- Zasięg testowy: do 12 km w otwartym terenie (2,4 kbps, antena na wysokości 2 m)
- Interfejs: SPI, 0-10 Mbps
- Oscylator: 32 MHz, przemysłowej klasy, aktywny, temperaturowo kompensowany
- Zasilanie: 3,3-5,25 V (zalecane > 5 V dla maks. wydajności; ryzyko uszkodzenia powyżej 5,5 V)
- Pobór prądu: nadawanie 600-670 mA (@ 30 dBm), odbiór 18 mA, uśpienie 2 µA
- Temperatura pracy: -40...+85°C (klasa przemysłowa)
- Wymiary: 38,5 × 24 mm, waga ok. 5,1 g
- Antena: złącze IPEX-1 lub otwór stemplowy, impedancja 50 Ω

## Piny (wariant 868/915 MHz, 22 piny)
| Pin   | Nazwa | Kierunek  | Funkcja |
|-------|-------|-----------|---------|
| 1-5   | GND   | -         | Masa |
| 6     | EN    | Wejście   | Włączenie RF - stan wysoki, podłączony do GPIO MCU |
| 7     | T/R CTRL | Wejście | Sterowanie nadawaniem/odbiorem - wysoki = TX, niski = RX (wymaga `EN` = wysoki) |
| 8     | DIO2  | We/Wy     | Konfigurowalny port ogólnego przeznaczenia (patrz dokumentacja SX1262); opcjonalnie zwarty z `T/R CTRL`, żeby radio samo sterowało przełącznikiem RF bez udziału MCU |
| 9-10  | VCC   | -         | Zasilanie 3,3-5,25 V (zalecany kondensator filtrujący) |
| 11-12 | GND   | -         | Masa |
| 13    | DIO1  | We/Wy     | Konfigurowalny port ogólnego przeznaczenia |
| 14    | BUSY  | Wyjście   | Sygnalizacja zajętości chipu |
| 15    | NRST  | Wejście   | Reset chipu, aktywny stanem niskim |
| 16    | MISO  | Wyjście   | Dane SPI |
| 17    | MOSI  | Wejście   | Dane SPI |
| 18    | SCK   | Wejście   | Zegar SPI |
| 19    | NSS   | Wejście   | Chip select SPI |
| 20    | GND   | -         | Masa |
| 21    | ANT   | -         | Antena, otwór stemplowy (50 Ω) |
| 22    | GND   | -         | Masa |

> [!NOTE]
> `EN` i `T/R CTRL` sterują wewnętrznym przełącznikiem RF: `EN` = 1 włącza radio, a `T/R CTRL` wybiera kierunek (1 = nadawanie, 0 = odbiór). `DIO2` może być zwarty z `T/R CTRL` na płytce, żeby to radio (SX1262) samo sterowało przełącznikiem - wtedy nie trzeba tego robić z poziomu MCU.

[Pełna dokumentacja PDF (EBYTE, User Manual EN v1.3)](/pliki/schematy/pdf/ebyte-e22p-xxxmxxs-dokumentacja.pdf) - wymiary mechaniczne, poziomy mocy, rekomendowane obwody aplikacyjne, FAQ i wytyczne lutowania rozpływowego.

[Nota aplikacyjna: projektowanie zasilania modułów EBYTE PDF (AN2023005)](/pliki/schematy/pdf/ebyte-an2023005-zasilanie-modulow.pdf) - porównanie schematów zasilania LDO, DC-DC i hybrydowego (DC-DC + LDO) dla modułów bezprzewodowych.
