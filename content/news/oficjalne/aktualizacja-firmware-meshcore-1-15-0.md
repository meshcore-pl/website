---
title: Aktualizacja firmware MeshCore 1.15.0
description: 19 kwietnia 2026 - firmware v1.15.0 MeshCore, domyślny zakres (Default Scope), pakiety GROUP_DATA, obsługa Heltec V4.3 i T096 oraz aktualizacje OTA dla nRF.
createdAt: 19.04.2026
updatedAt: 22.08.2026
sourceUrl: https://blog.meshcore.io/2026/04/19/release-1-15-0
tags: [Lista zmian, Oprogramowanie]
---

# Firmware MeshCore v1.15.0 - domyślny zakres regionu
![MeshCore Firmware](https://blog.meshcore.io/assets/images/firmware_release.jpg)

19 kwietnia 2026 ukazało się wydanie oprogramowania **v1.15.0** dla MeshCore.
Najnowszy firmware pobierzesz z [flasher.meshcore.io](https://flasher.meshcore.io).

## Lista zmian
- Obsługa domyślnego zakresu (Default Scope)
- Obsługa nowych pakietów GROUP_DATA (binarnych) ([#1928](https://github.com/meshcore-dev/MeshCore/pull/1928), [#2130](https://github.com/meshcore-dev/MeshCore/pull/2130))
- Obsługa Heltec V4.3 ([#1867](https://github.com/meshcore-dev/MeshCore/pull/1867))
- Obsługa Heltec nRF Tracker (T096) ([#2097](https://github.com/meshcore-dev/MeshCore/pull/2097))
- Obsługa przemiennika i room serwera GAT562 Mesh EVB Pro ([#2042](https://github.com/meshcore-dev/MeshCore/pull/2042))
- `radio.rxgain` domyślnie włączone (ON) ([#2124](https://github.com/meshcore-dev/MeshCore/pull/2124))
- Obsługiwany zakres częstotliwości radia obniżony do 150 MHz ([#2126](https://github.com/meshcore-dev/MeshCore/pull/2126))
- Poprawka zachowywania ustawienia GPS ([#2018](https://github.com/meshcore-dev/MeshCore/pull/2018))
- Nowa komenda CLI `get|set dutycycle` ([#1961](https://github.com/meshcore-dev/MeshCore/pull/1961))
- Obsługa Muzi Works R1 Neo ([#2007](https://github.com/meshcore-dev/MeshCore/pull/2007))
- Obsługa GAT562 Watch ([#2138](https://github.com/meshcore-dev/MeshCore/pull/2138), [#2228](https://github.com/meshcore-dev/MeshCore/pull/2228))
- Poprawka inicjalizacji czujnika BME680 ([#2227](https://github.com/meshcore-dev/MeshCore/pull/2227))
- Poprawka odczytu baterii w Heltec Wireless Paper ([#2164](https://github.com/meshcore-dev/MeshCore/pull/2164))
- Poprawki companiona WiFi dla Heltec V4 i TBeam 1W ([#1833](https://github.com/meshcore-dev/MeshCore/pull/1833))
- Waveshare RP2040 - poprawka RXEN ([#2298](https://github.com/meshcore-dev/MeshCore/pull/2298))
- Companion nRF - obsługa aktualizacji OTA ([#2323](https://github.com/meshcore-dev/MeshCore/pull/2323))
- Dodano companiona dla Heltec Wireless Paper ([#2315](https://github.com/meshcore-dev/MeshCore/pull/2315))
- Różne drobne poprawki ([#2134](https://github.com/meshcore-dev/MeshCore/pull/2134), [#2190](https://github.com/meshcore-dev/MeshCore/pull/2190), [#1425](https://github.com/meshcore-dev/MeshCore/pull/1425), [#2075](https://github.com/meshcore-dev/MeshCore/pull/2075), [#2302](https://github.com/meshcore-dev/MeshCore/pull/2302), [#2306](https://github.com/meshcore-dev/MeshCore/pull/2306))
- Poprawka bootloopa na Xiao C3 ([#2328](https://github.com/meshcore-dev/MeshCore/pull/2328))

## Dokumentacja
Więcej o nowej funkcji domyślnego zakresu (Default Scope) znajdziesz w [tym artykule](https://blog.meshcore.io/2026/04/20/default-scope) (w języku angielskim).

Niskopoziomowy format pakietów GROUP_DATA opisany jest w [dokumentacji](https://docs.meshcore.io/payloads/?h=group+datagram#group-datagram) (w języku angielskim).
