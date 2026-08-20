---
title: MeshCore Firmware v1.17.0
description: 9 sierpnia 2026 - firmware v1.17.0 MeshCore, obsługa radia LR2021, konfiguracja w JSON, usprawnione wykrywanie preambuły i nowe urządzenia.
createdAt: 9.08.2026
sourceUrl: https://blog.meshcore.io/2026/08/09/release-1-17-0
tags: [Lista zmian, Oprogramowanie]
---

# MeshCore Firmware v1.17.0
![MeshCore Firmware](https://blog.meshcore.io/assets/images/firmware_release.jpg)

9 sierpnia 2026 ukazało się wydanie oprogramowania **v1.17.0** dla MeshCore.
Najnowszy firmware pobierzesz z [flasher.meshcore.io](https://flasher.meshcore.io).

## Nowe funkcje
- Companion - dodano temperaturę MCU do telemetrii sensorów ([#2987](https://github.com/meshcore-dev/MeshCore/pull/2987))
- Dodano obsługę radia LR2021 (a wraz z nią Meshnology W12) ([#3115](https://github.com/meshcore-dev/MeshCore/pull/3115))
- Nowa komenda CLI room servera `room.post` (do publikowania własnych postów przez serwer) ([#2688](https://github.com/meshcore-dev/MeshCore/pull/2688))
- Wyłączanie zasilania przemiennika przy długim przytrzymaniu przycisku ([#2883](https://github.com/meshcore-dev/MeshCore/pull/2883))
- Nowa komenda CLI `set cad on/off` ([#1727](https://github.com/meshcore-dev/MeshCore/pull/1727))
- Płytki ESP obsługują teraz komendę CLI `get pwrmgt.bootreason` ([#2765](https://github.com/meshcore-dev/MeshCore/pull/2765))
- Nowa komenda CLI `get/set radio.fem.rxgain` (niektóre płytki Heltec) ([#2140](https://github.com/meshcore-dev/MeshCore/pull/2140))

## Usprawnienia
- Poprawka brakującego bitu IRQ wykrywania preambuły ([#3036](https://github.com/meshcore-dev/MeshCore/pull/3036))
- Logika timeoutu odbioru dla IRQ preambuły i nagłówka ([#2977](https://github.com/meshcore-dev/MeshCore/pull/2977))
- Płytki nRF52 korzystają teraz ze sprzętowej kryptografii CC310 ([#2824](https://github.com/meshcore-dev/MeshCore/pull/2824))
- Konfiguracja przechowywana teraz w formacie JSON (wszystkie firmware) ([#2982](https://github.com/meshcore-dev/MeshCore/pull/2982))
- Nowy schemat kolorów w interfejsie companiona ([#3034](https://github.com/meshcore-dev/MeshCore/pull/3034))
- Room server obsługuje teraz podbite wzmocnienie odbioru (rx boosted gain) ([#3023](https://github.com/meshcore-dev/MeshCore/pull/3023))
- Szybszy sterownik wyświetlacza ST7735 (Heltec T096, Wireless Tracker i inne) ([#2951](https://github.com/meshcore-dev/MeshCore/pull/2951))
- Oszczędności poboru mocy w trybie hibernacji/wyłączenia ([#2895](https://github.com/meshcore-dev/MeshCore/pull/2895))

## Nowo obsługiwane urządzenia
- Sensecap X1 - obsługa pamięci flash QSPI ([#3139](https://github.com/meshcore-dev/MeshCore/pull/3139))
- Sensecap X1 - dioda LED i wibracje (haptic feedback) ([#3122](https://github.com/meshcore-dev/MeshCore/pull/3122))
- Dodano obsługę Sensecap MeshTracker X1 ([#3112](https://github.com/meshcore-dev/MeshCore/pull/3112))
- Obsługa Thinknode M7, plus architektura pod uniwersalnego companiona ([#3049](https://github.com/meshcore-dev/MeshCore/pull/3049))
- Dodano obsługę płytki Heltec RC32 ([#2966](https://github.com/meshcore-dev/MeshCore/pull/2966))
- Dodano obsługę płytki Heltec V4 R8 ([#2560](https://github.com/meshcore-dev/MeshCore/pull/2560))
- Obsługa modułów ethernet RAK ([#1983](https://github.com/meshcore-dev/MeshCore/pull/1983))
- Dodano obsługę Elecrow Thinknode M9 ([#2942](https://github.com/meshcore-dev/MeshCore/pull/2942))
- Dodano obsługę Elecrow Thinknode M7 ([#2839](https://github.com/meshcore-dev/MeshCore/pull/2839))
- Dodano obsługę Nibble Zero Connect ([#1194](https://github.com/meshcore-dev/MeshCore/pull/1194))
- Dodano obsługę Heltec Tower V2 ([#2752](https://github.com/meshcore-dev/MeshCore/pull/2752))

## Poprawki błędów i pozostałe zmiany
- Companion - wyłączono sprzętowe CAD ([#3121](https://github.com/meshcore-dev/MeshCore/pull/3121))
- Poprawka sprawdzania path_len w odpowiedzi ANON_REQ ([#3107](https://github.com/meshcore-dev/MeshCore/pull/3107))
- Thinknode M6 - poprawka ponownej inicjalizacji GPS ([#2863](https://github.com/meshcore-dev/MeshCore/pull/2863))
- Błąd komendy `start ota` jest teraz raportowany na urządzeniach nRF ([#3048](https://github.com/meshcore-dev/MeshCore/pull/3048))
- Poprawki modemu KISS przy zacinaniu się pod obciążeniem USB (backpressure) ([#2819](https://github.com/meshcore-dev/MeshCore/pull/2819))
- ESP32 - poprawka ponownego łączenia sparowanego BLE ([#3005](https://github.com/meshcore-dev/MeshCore/pull/3005))
- ESP32 - synchronizacja kolejki odbioru BLE ([#3007](https://github.com/meshcore-dev/MeshCore/pull/3007))
- Heltec V4 - sprzętowy port szeregowy USB ([#3006](https://github.com/meshcore-dev/MeshCore/pull/3006))
- T-Beam Supreme - poprawki OLED ([#2815](https://github.com/meshcore-dev/MeshCore/pull/2815))
- Thinknode M3 - poprawki diody LED GPS ([#2887](https://github.com/meshcore-dev/MeshCore/pull/2887))
- Poprawka budowania przemiennika Xiao nRF52 ([#2990](https://github.com/meshcore-dev/MeshCore/pull/2990))
- T-Echo Lite - poprawka regulatora DC-DC ([#2899](https://github.com/meshcore-dev/MeshCore/pull/2899))
- Heltec T114 - poprawka regulatora DC-DC ([#2905](https://github.com/meshcore-dev/MeshCore/pull/2905))
- Poprawka zawieszania się synchronizacji czasu GPS na węzłach z długim czasem działania ([#2937](https://github.com/meshcore-dev/MeshCore/pull/2937))
- Zewnętrzny watchdog timer dla Heltec Tower V2 ([#2936](https://github.com/meshcore-dev/MeshCore/pull/2936))
- Poprawka obsługi LDO dla sx1262 ([#2867](https://github.com/meshcore-dev/MeshCore/pull/2867))
- Naprawiono podbite wzmocnienie odbioru (rx boosted gain) na LR1110 ([#2844](https://github.com/meshcore-dev/MeshCore/pull/2844))
- Poprawka synchronizacji czasu GPS dla Heltec T114
- Companion - poprawka przy zapełnionych kontaktach anonimowych ([#2763](https://github.com/meshcore-dev/MeshCore/pull/2763))
- Nieprawidłowa wartość path_len jest teraz odrzucana w PAYLOAD_TYPE_PATH i ANON_REQ

## Usprawnienia w wykrywaniu kolizji pakietów
Kod „listen-before-talk” przeszedł spore zmiany dzięki pracy Taco.
Spędził tygodnie na diagnostyce, a nawet symulacjach, testując ulepszony schemat obsługujący przypadki, w których flagi IRQ radia LoRa się „zacinają”, a przede wszystkim -
właściwe wykrywanie preambuły. To może być najbardziej znacząca poprawa wydajności dla wszystkich sieci mesh.

Odkrył też, że nowy schemat działa na równi ze sprzętowym CAD, ale bez 4-sekundowych zacięć, na które CAD wciąż cierpi.
Dlatego sprzętowe CAD nadal pozostaje domyślnie wyłączone.

## Interfejs companiona
Różne wyświetlacze kolorowe zyskają teraz nowy wygląd i będą znacznie bardziej responsywne.

## Konfiguracja JSON
Konfiguracja węzła powinna zostać automatycznie zmigrowana do nowego formatu JSON podczas aktualizacji do v1.17.0.
Stara konfiguracja w formacie binarnym pozostaje jednak nienaruszona, na wypadek gdyby ktoś musiał wrócić do starszego firmware.

## Kroki w stronę uniwersalnego companiona
Dzięki [#3049](https://github.com/meshcore-dev/MeshCore/pull/3049) Liam utorował drogę do obsługi przez companiony wielu interfejsów szeregowych jednocześnie, np. BLE + USB.
Obsłużyć można teraz do 4 interfejsów. Nie ma jeszcze oficjalnych wersji companiona z obsługą wielu interfejsów, ale cała „instalacja” (plumbing) pod tę funkcję jest już gotowa.
