---
title: Aktualizacja firmware MeshCore 1.17.1
description: 14 sierpnia 2026 - firmware v1.17.1 MeshCore, nowe komendy CLI dla wzmocnienia FEM, poprawki logowania i wykrywania preambuły oraz naprawa Tx dla Heltec T096.
createdAt: 14.08.2026
updatedAt: 22.08.2026
sourceUrl: https://blog.meshcore.io/2026/08/14/release-1-17-1
tags: [Lista zmian, Oprogramowanie]
---

# Firmware MeshCore v1.17.1 - komendy CLI dla FEM
![MeshCore Firmware](https://blog.meshcore.io/assets/images/firmware_release.jpg)

14 sierpnia 2026 ukazało się wydanie oprogramowania **v1.17.1** dla MeshCore.
Najnowszy firmware pobierzesz z [flasher.meshcore.io](https://flasher.meshcore.io).

## Nowe funkcje
- Nowe komendy CLI `get/set radio.fem.rxgain/txgain` (txgain wyłącznie na Station G3), poprawiono mapowanie preferencji dla `radio.fem.rxgain` ([#3137](https://github.com/meshcore-dev/MeshCore/pull/3137))
- Dodano brakujące role radiowe KISS, dodano build radia KISS do build.sh ([#3148](https://github.com/meshcore-dev/MeshCore/pull/3148))

## Usprawnienia
- Odpowiedź logowania nie jest już wysyłana jako flood przy logowaniu bezpośrednim, poprawka logowania flood bez określonego zakresu (unscoped) ([#3106](https://github.com/meshcore-dev/MeshCore/pull/3106))
- LR2021 - bit PREAMBLE_DETECTED i logika timeoutu odbioru IRQ ([#3146](https://github.com/meshcore-dev/MeshCore/pull/3146))
- NRF52 CC310 - `nRFCrypto.begin()/end()` wywoływane teraz tylko raz ([#3154](https://github.com/meshcore-dev/MeshCore/pull/3154))
- Debugowy wydruk poziomu szumów w RadioLibWrapper przeniesiony pod nową flagę `MESH_DEBUG_NOISE_FLOOR` ([#3166](https://github.com/meshcore-dev/MeshCore/pull/3166))
- nRF RadioNoiseListener RNG łączy teraz entropię z radia oraz CC310 ([#3206](https://github.com/meshcore-dev/MeshCore/pull/3206))

## Poprawki błędów i pozostałe zmiany
- Piny T-Echo Lite dostosowane do zaktualizowanego schematu Lilygo, napięcie TCXO ustawione na 3,0 V ([#3140](https://github.com/meshcore-dev/MeshCore/pull/3140))
- Poprawka budowania dla R1 Neo i repeatera Minewsemi ([#3142](https://github.com/meshcore-dev/MeshCore/pull/3142))
- Podbite wzmocnienie odbioru (Rx boosted gain) nie jest już resetowane do wartości skompilowanej po resecie AGC ([#3158](https://github.com/meshcore-dev/MeshCore/pull/3158))
- Poprawka wyświetlacza T-Beam Supreme S3 ([#3164](https://github.com/meshcore-dev/MeshCore/pull/3164))
- Porządki w mapie pinów ProMicro, piny LoRa przeniesione do variant.h ([#3170](https://github.com/meshcore-dev/MeshCore/pull/3170))
- T-Echo Card - napięcie TCXO ustawione na 3,0 V, analogicznie do [#3140](https://github.com/meshcore-dev/MeshCore/pull/3140) ([#3185](https://github.com/meshcore-dev/MeshCore/pull/3185))
- Naprawiono błąd Tx na Heltec T096 (odczyt poza zakresem dla PIN_SPI1_MISO) ([#3188](https://github.com/meshcore-dev/MeshCore/pull/3188))
- Heltec T1 / MeshPocket / T-Echo Lite - poprawka nieużywanego pinu ([przyczyna źródłowa](https://github.com/meshcore-dev/MeshCore/issues/3151#issuecomment-5268905160)) ([#3189](https://github.com/meshcore-dev/MeshCore/pull/3189))
- Companion - preferencja `fem_radio_rx/txgain` wyłączona do czasu, aż będzie możliwa do ustawienia ([#3203](https://github.com/meshcore-dev/MeshCore/pull/3203))

## Poprawki i usprawnienia dla urządzeń z FEM
Ustawienie `radio.fem.rxgain` nie było prawidłowo zapisywane w v1.17.1 - to zostało teraz naprawione. Administratorzy repeaterów powinni po aktualizacji sprawdzić, czy `radio.fem.rxgain` i `radio.rxgain` są skonfigurowane zgodnie z ich preferencjami.
Firmware companiona nie ma jeszcze możliwości konfiguracji tych ustawień, więc na razie będą używane wyłącznie wartości domyślne.

## Poprawka błędu transmisji na Heltec T096
Błąd transmisji na Heltec T096 okazał się być odczytem poza zakresem mapy pinów, spowodowanym ustawieniem `PIN_SPI1_MISO` na -1. Powodowało to, że pin włączający Tx modułu FEM przestawał działać. Zostało to naprawione, a przy okazji poprawiono też nieużywane piny na innych płytkach NRF52.
