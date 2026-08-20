---
title: MeshCore Firmware v1.14.1
description: 20 marca 2026 - firmware v1.14.1 MeshCore, egzekwowanie duty cycle metodą token bucket, obsługa GAT562 oraz poprawki transmisji pakietów.
createdAt: 20.03.2026
sourceUrl: https://blog.meshcore.io/2026/03/20/release-1-14-1
tags: [Lista zmian, Oprogramowanie]
---

# MeshCore Firmware v1.14.1
![MeshCore Firmware](https://blog.meshcore.io/assets/images/firmware_release.jpg)

20 marca 2026 ukazało się wydanie oprogramowania **v1.14.1** dla MeshCore.
Najnowszy firmware pobierzesz z [flasher.meshcore.io](https://flasher.meshcore.io).

## Lista zmian
- Dodano obsługę GPS dla SenseCAP Solar P1 ([#1589](https://github.com/meshcore-dev/MeshCore/pull/1589))
- Obsługa długiego przytrzymania przełącznika wyłączania zasilania dla SenseCAP Solar P1 ([#1871](https://github.com/meshcore-dev/MeshCore/pull/1871))
- Dodano zarządzanie zasilaniem nRF52 dla RAK3401 ([#1984](https://github.com/meshcore-dev/MeshCore/pull/1984))
- Dodano egzekwowanie duty cycle metodą token bucket ([#1297](https://github.com/meshcore-dev/MeshCore/pull/1297))
- Dodano obsługę nowego urządzenia GAT562 30S Mesh Kit ([#2009](https://github.com/meshcore-dev/MeshCore/pull/2009))
- Dodano obsługę nowego urządzenia GAT562 Mesh Tracker Pro ([#1980](https://github.com/meshcore-dev/MeshCore/pull/1980))
- Dodano komendy CLI przełączające LNA: `radio.rxgain on` i `radio.rxgain off` ([#1653](https://github.com/meshcore-dev/MeshCore/pull/1653))
- Dodano temperaturę MCU do odpowiedzi telemetrycznych z room serwerów ([#2052](https://github.com/meshcore-dev/MeshCore/pull/2052))
- Przeniesiono Heltec Tracker v2 na KCT8103L ([#1936](https://github.com/meshcore-dev/MeshCore/pull/1936))
- Węzły z włączonym GPS będą teraz automatycznie synchronizować czas co 30 minut ([#1350](https://github.com/meshcore-dev/MeshCore/pull/1350))
- Naprawiono błąd, przez który niektóre zakolejkowane pakiety nie były nadawane ([#1877](https://github.com/meshcore-dev/MeshCore/pull/1877))
- Naprawiono błąd, przez który automatyczne adverty nie korzystały ze skonfigurowanego ustawienia wielobajtowej trasy ([fcfdc5f](https://github.com/meshcore-dev/MeshCore/commit/fcfdc5fc5b1e0cf81b4ca2dfbc51d714f3eb1ead))

## Dokumentacja
Komendy CLI LNA (rx gain):
```
get radio.rxgain
set radio.rxgain {on|off}
```
