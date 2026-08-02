---
title: Instalacja bootloadera OTAFix
description: Poradnik krok po kroku, jak zainstalować bootloader OTAFix na urządzeniach nRF - szybsze i pewniejsze aktualizacje firmware przez OTA/BLE.
createdAt: 06.04.2026
tags: [Poradnik, Firmware]
---

# Instalacja bootloadera OTAFix
![Bootloader OTAFix](https://blog.meshcore.io/assets/images/2026/04/06/otafix-banner.jpg)

## Geneza
Gdy zaczynałem przygodę z MeshCore, zauważyłem, że urządzenia nRF52 potrafią wykonywać aktualizacje OTA przez BLE, co oczywiście jest świetną funkcją, gdy trzeba zaktualizować przemiennik zamontowany na dachu.

Niestety, rzadko udawało mi się to uruchomić bez problemów. Jeśli miałeś szczęście i użyłeś odpowiednich ustawień, mogło to zadziałać na RAK4631, ale na urządzeniach ProMicro w zasadzie nigdy nie działało. To skłoniło mnie do przekopania GitHuba, gdzie znalazłem kilka starych, zapomnianych PR-ów naprawiających część tych problemów.

Ponieważ nie doczekały się uwagi w oficjalnym repozytorium Adafruit na GitHubie, postanowiłem zrobić forka bootloadera i samodzielnie wprowadzić te poprawki.

## Instalacja bootloadera OTAFIX na urządzeniach nRF52
Dla najlepszego doświadczenia aktualizacji OTA na nRF52 zalecane jest zaktualizowanie urządzenia do bootloadera **OTAFIX**. Ta wersja obejmuje:

- Automatyczny powrót do trybu OTA DFU, jeśli aktualizacja się nie powiedzie
- Znacznie szybsze tempo aktualizacji OTA
- Dodatkowe usprawnienia jakości życia dla niektórych urządzeń, np. możliwość wejścia w tryb OTA DFU przez przytrzymanie przycisku podczas resetu

## 1. Wejdź w tryb UF2 DFU
Najpierw przełącz urządzenie w tryb **UF2 DFU**.

Dla większości urządzeń nRF52:
- Podłącz urządzenie do komputera
- Szybko naciśnij przycisk reset dwukrotnie (dwa razy w ciągu 0,5 sekundy)
- Powinien pojawić się dysk USB UF2 - jego nazwa różni się w zależności od urządzenia

Niektóre urządzenia wymagają innej metody - zobacz [uwagi](#uwagi-dla-konkretnych-urzadzen) na końcu tego poradnika.

## 2. Sprawdź obecny bootloader (opcjonalne, ale zalecane)
Ten krok jest ważny dla urządzeń takich jak **Seeed Studio XIAO nRF52840**, które często są sprzedawane z wariantem bootloadera **SENSE**.

Aby sprawdzić:
1. Wejdź w tryb UF2 DFU
2. Otwórz plik `INFO_UF2.TXT` na zamontowanym dysku

Ten plik zawiera informacje o aktualnym bootloaderze.

**Przykład:**
Jeśli plik pokazuje: `Board-ID: nRF52840-SeeedXiaoSense-v1`, musisz zainstalować wariant ***SENSE***.

## 3. Pobierz bootloader OTAFIX
Bootloader OTAFIX możesz teraz pobrać bezpośrednio ze strony MeshCore Flasher!
Wejdź na [https://flasher.meshcore.io](https://flasher.meshcore.io)

- Wybierz swoje urządzenie
- Wybierz **Repeater**
- Link do pobrania bootloadera OTAFIX pojawi się w wyróżnionym banerze, plik będzie nazywał się `update-xxxx.uf2`

![Baner pobierania bootloadera OTAFIX we flasherze](https://blog.meshcore.io/assets/images/2026/04/06/flasher_banner_grab.webp)

Alternatywnie bootloader OTAFIX jest też dostępny na oficjalnej stronie.
Wejdź na:
[https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX/releases](https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX/releases)

Pobierz właściwy plik UF2 dla swojego urządzenia z sekcji **Assets**.

- Pliki nazywają się np.: `update-xxxx.uf2`
- Może być konieczne kliknięcie **„Show more”**, by zobaczyć wszystkie dostępne pliki

**Przykład:**
Dla wariantu Seeed Xiao Sense, o którym mowa wyżej, pobierzesz `update-xiao_nrf52840_ble_sense_bootloader-0.9.2-OTAFIX2.1-BP1.2_nosd.uf2`

## 4. Zainstaluj bootloader
- Przeciągnij i upuść plik `update-xxxx.uf2` na dysk UF2
- Urządzenie automatycznie:
  - Zaktualizuje bootloader
  - Zrestartuje się po zakończeniu

## 5. Zweryfikuj aktualizację
1. Ponownie wejdź w tryb UF2 DFU
2. Ponownie otwórz `INFO_UF2.TXT`

Linia z wersją powinna teraz zawierać **OTAFIX**.

![Zainstalowany bootloader OTAFIX widoczny w INFO_UF2.TXT](https://blog.meshcore.io/assets/images/2026/04/06/otafix_installed.webp)

## Uwagi dla konkretnych urządzeń

### Tryb DFU na T1000-e
Aby wejść w tryb DFU:
1. Podłącz magnetyczny kabel USB
2. Przytrzymaj przycisk
3. Szybko odłącz i podłącz ponownie kabel dwukrotnie

Materiał wideo: [https://www.youtube.com/shorts/D6uo93-RcaY](https://www.youtube.com/shorts/D6uo93-RcaY)

### Tryb DFU na ThinkNode M3
Aby wejść w tryb DFU:
1. Podłącz magnetyczny kabel USB
2. Przytrzymaj przycisk przez ok. 25-30 sekund
