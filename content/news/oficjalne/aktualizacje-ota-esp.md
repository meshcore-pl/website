---
title: Aktualizacje OTA na urządzeniach ESP32
description: Poradnik krok po kroku - jak zaktualizować firmware przemiennika lub room serwera na ESP32 przez OTA, bez kabla i przeflashowania od zera.
createdAt: 1.04.2026
updatedAt: 22.08.2026
sourceUrl: https://blog.meshcore.io/2026/04/01/esp-ota-update
tags: [Poradnik, Oprogramowanie]
---

# OTA na ESP32 - aktualizacja firmware bez kabla
Aktualizacja firmware Twoich przemienników lub room serwerów jest bardzo prosta dla węzłów opartych o ESP32.

## 1. Pobierz nowy plik .bin
Wejdź na [webflasher](https://flasher.meshcore.io), znajdź swoje urządzenie, wybierz rolę Repeater lub Room Server, a następnie najnowszą wersję.
W prawym dolnym rogu kliknij przycisk **Download**, a następnie wybierz drugi plik .bin (czyli _nie_ merged.bin!).

![Pobieranie pliku .bin z webflashera](https://blog.meshcore.io/assets/images/2026/04/01/flasher-download.jpeg)

Alternatywnie, wejdź na stronę [wydań na GitHubie](https://github.com/meshcore-dev/MeshCore/releases) i znajdź odpowiedni plik, np. [Heltec V3 Repeater](https://github.com/meshcore-dev/MeshCore/releases/download/repeater-v1.14.1/Heltec_v3_repeater-v1.14.1-467959c.bin).

> [!NOTE]
> Nie pobieraj pliku -merged.bin!

## 2. Zaloguj się do przemiennika/room serwera
Za pomocą aplikacji mobilnej zaloguj się do swojego urządzenia.

![Logowanie do przemiennika w aplikacji MeshCore](https://blog.meshcore.io/assets/images/2026/04/01/app-repeater-login.png)

Następnie przełącz się na Wiersz poleceń (Command Line) i wpisz komendę `start ota`.

![Komenda start ota w wierszu poleceń](https://blog.meshcore.io/assets/images/2026/04/01/repeater-cli2.png)

Powinieneś zobaczyć odpowiedź podobną do:
```
Started: http://192.168.4.1/update
```

Alternatywnie możesz użyć samodzielnego urządzenia, takiego jak T-Deck z firmware Ripple, aby wpisać komendę `start ota`.

![Komenda start ota na samodzielnym urządzeniu](https://blog.meshcore.io/assets/images/2026/04/01/xiao-start-ota.jpg)

## 3. Połącz się za pomocą laptopa lub telefonu
Urządzenie ESP32 powinno utworzyć punkt dostępu WiFi o nazwie **MeshCore-OTA**. Po prostu połącz się z nim za pomocą laptopa lub telefonu i przejdź pod adres URL wyświetlony w odpowiedzi wiersza poleceń (powyżej). Powinieneś zobaczyć stronę podobną do tej poniżej.

![Strona aktualizacji OTA](https://blog.meshcore.io/assets/images/2026/04/01/repeater-ota.png)

Zwróć uwagę na wyświetlony identyfikator, np. „MC Prime (Xiao C3)” - powinna to być nazwa (i typ MCU) węzła, który zamierzasz zaktualizować.

Kliknij przycisk **Choose file** i wybierz wcześniej pobrany plik .bin. Powinieneś wtedy zobaczyć pasek postępu.

![Pasek postępu aktualizacji OTA](https://blog.meshcore.io/assets/images/2026/04/01/ota-progress.png)

## 4. Na koniec
Po zakończeniu wyloguj się i zaloguj ponownie (przez aplikację lub urządzenie samodzielne), a następnie sprawdź, czy zegar jest poprawny komendą **clock**. Jeśli jest błędny, po prostu wydaj komendę **clock sync**.

Warto też wpisać komendę **ver**, aby sprawdzić, czy wersja firmware faktycznie się zaktualizowała.

## Rozwiązywanie problemów
Jeśli pasek postępu się zatrzymał lub coś poszło nie tak, spróbuj wydać tę komendę z telefonu lub urządzenia samodzielnego:
```
reboot
```
A następnie spróbuj ponownie.
