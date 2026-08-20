---
title: Heltec WiFi LoRa 32 V3 - pinout i dokumentacja
description: Karta techniczna Heltec WiFi LoRa 32 V3 (HTIT-WB32LA) - ESP32-S3, SX1262, pinout, zasilanie i link do pełnej dokumentacji producenta.
canonical: /dokumentacja/schematy/heltec-wifi-lora-32-v3
createdAt: 19.08.2026
---

# Heltec WiFi LoRa 32 V3 - pinout i dokumentacja {toc: Heltec WiFi LoRa 32 V3}
Klasyczna płytka deweloperska Heltec, w wersji V3 oznaczona przez producenta jako `HTIT-WB32LA` (wariant `HTIT-WB32LAF` to osobna wersja na pasmo CN470). Względem V2 zmieniono MCU na `ESP32-S3`, radio LoRa na `SX1262`, złącze na USB-C, a pobór prądu w deep sleep spadł poniżej 10 µA.

## Najważniejsze parametry
- Mikrokontroler: `ESP32-S3FN8` (dwurdzeniowy Xtensa LX7, do 240 MHz)
- Radio LoRa: `SX1262`
- USB-C z pełną ochroną ESD i zwarciową
- Wbudowany układ zarządzania baterią LiPo (ładowanie/rozładowanie, ochrona przed przeładowaniem, pomiar napięcia), złącze `SH1.25-2`
- Wyświetlacz OLED 0,96" 128x64
- Konwerter USB-UART: `CP2102`
- Antena Wi-Fi/BLE na płytce (sprężynowa 2,4 GHz), gniazdo `U.FL` pod antenę LoRa

[Pełna dokumentacja PDF (Heltec, Rev. 1.1, 15 stron)](/pliki/schematy/pdf/heltec-wifi-lora-32-v3-2-dokumentacja.pdf) - zawiera m.in. dokładny opis pinów, wymiary fizyczne i charakterystykę RF.
