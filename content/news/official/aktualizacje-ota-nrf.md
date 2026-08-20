---
title: Aktualizacje OTA na urządzeniach nRF
description: Poradnik krok po kroku - jak zaktualizować firmware przemiennika lub room serwera na urządzeniach nRF przez OTA za pomocą nRF Device Firmware Update.
createdAt: 2.04.2026
sourceUrl: https://blog.meshcore.io/2026/04/02/nrf-ota-update
tags: [Poradnik, Oprogramowanie]
---

# Aktualizacje OTA na urządzeniach nRF
Aktualizacja firmware Twoich przemienników lub room serwerów jest bardzo prosta dla węzłów opartych o nRF.

![Aktualizacja OTA na urządzeniu nRF](https://blog.meshcore.io/assets/images/2026/04/02/nRF-DFU.webp)

## 1. Pobierz nowy plik .zip
Wejdź na [webflasher](https://flasher.meshcore.io), znajdź swoje urządzenie, wybierz rolę Repeater lub Room Server, a następnie najnowszą wersję.
W prawym dolnym rogu kliknij przycisk **Download**, a następnie wybierz plik .zip.

![Pobieranie pliku .zip z webflashera](https://blog.meshcore.io/assets/images/2026/04/02/nRF-zip-download.png)

Alternatywnie, wejdź na stronę [wydań na GitHubie](https://github.com/meshcore-dev/MeshCore/releases) i znajdź odpowiedni plik, np. [T114 Repeater](https://github.com/meshcore-dev/MeshCore/releases/download/repeater-v1.14.1/Heltec_t114_repeater-v1.14.1-467959c.zip).

## 2. Zaloguj się do przemiennika/room serwera
Za pomocą aplikacji mobilnej zaloguj się do swojego urządzenia.

![Logowanie do przemiennika w aplikacji MeshCore](https://blog.meshcore.io/assets/images/2026/04/01/app-repeater-login.png)

Następnie przełącz się na Wiersz poleceń (Command Line) i wpisz komendę `start ota`.

![Komenda start ota w wierszu poleceń](https://blog.meshcore.io/assets/images/2026/04/01/repeater-cli2.png)

Powinieneś zobaczyć odpowiedź podobną do:
```
OK - mac: FF:AA:BB ...
```

Alternatywnie możesz użyć samodzielnego urządzenia, takiego jak T-Deck z firmware Ripple, aby wpisać komendę `start ota`.

![Komenda start ota na samodzielnym urządzeniu](https://blog.meshcore.io/assets/images/2026/04/01/xiao-start-ota.jpg)

## 3. Połącz się za pomocą telefonu
Jeśli jeszcze jej nie masz, musisz zainstalować aplikację Nordic **nRF Device Firmware Update**, dostępną w [Google Play](https://play.google.com/store/apps/details?id=no.nordicsemi.android.dfu) oraz w [App Store](https://apps.apple.com/us/app/nrf-device-firmware-update/id1624454660).

### 3.1 Ustawienia aplikacji DFU
W aplikacji dotknij ikony **Settings** i zastosuj te zalecane zmiany:
- Packet receipts notification - **ON**
- Number of packets - **8**
- Request high MTU (tylko Android) - **OFF**
- Disable resume - **ON**
- Prepare object delay - **0 ms**
- Force scanning - **ON**

### 3.2 Rozpocznij aktualizację
W aplikacji wybierz pobrany plik .zip oraz urządzenie, a następnie naciśnij przycisk **start**.

![Rozpoczynanie aktualizacji w aplikacji nRF DFU](https://blog.meshcore.io/assets/images/2026/04/02/dfu-app.png)

I to wszystko!

## 4. Na koniec
Po zakończeniu wyloguj się i zaloguj ponownie (przez aplikację lub urządzenie samodzielne), a następnie sprawdź, czy zegar jest poprawny komendą **clock**. Jeśli jest błędny, po prostu wydaj komendę **clock sync**.

Warto też wpisać komendę **ver**, aby sprawdzić, czy wersja firmware faktycznie się zaktualizowała.

## Rozwiązywanie problemów
Jeśli aktualizacja się zatrzymała lub nie powiodła się, spróbuj wydać tę komendę z telefonu lub urządzenia samodzielnego:
```
reboot
```
A następnie spróbuj ponownie.
