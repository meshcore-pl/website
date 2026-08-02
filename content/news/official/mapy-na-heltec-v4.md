---
title: Ripple v9.4 dla Heltec V4
description: Firmware Ripple v9.4 wprowadza obsługę kafelków mapy dla zestawu rozszerzającego Heltec V4 Expansion Kit.
createdAt: 05.04.2026
tags: [Oprogramowanie, Sprzęt]
---

# Ripple v9.4 dla Heltec V4
Dodałem obsługę kafelków mapy dla [Heltec V4 Expansion Kit](https://heltec.org/project/wifi-lora-32-v4-expansion-housing).

![Ripple na Heltec V4 z kafelkami mapy](https://blog.meshcore.io/assets/images/2026/04/05/HeltecV4-preview.png)

## Pobieranie
Firmware pobierzesz i zainstalujesz w jednym kroku, korzystając z tego [bezpośredniego linku](https://flasher.meshcore.io/ripple-heltec-v4-expansion-kit-touch/) do celu w MeshCore Flasher.

> [!NOTE]
> Istnieją teraz dwa warianty firmware: jeden dla dotychczasowych użytkowników, którzy nie potrzebują obsługi kafelków mapy, oraz nowy wariant „LittleFS” z obsługą kafelków mapy.

> [!WARNING]
> Wariant LittleFS używa innego schematu partycji pamięci flash i po przełączeniu się na niego stracisz wszystkie swoje ustawienia. Gdy jednak już masz ten wariant, kolejne aktualizacje można bezpiecznie wgrywać bez utraty ustawień.

## Ogólny przewodnik
Interfejs Heltec V4 przypomina w większości inne urządzenia z serii Ultra, takie jak T-Deck, więc po szczegóły zajrzyj do [ogólnego przewodnika użytkownika](https://buymeacoffee.com/ripplebiz/ultra-v7-7-guide-meshcore-users).

## Firmware „LittleFS”
Ten nowy wariant wydziela partycję LittleFS o rozmiarze około 14 MB. Możesz więc umieścić na niej kafelki mapy do mniej więcej tego rozmiaru. To dość ograniczona przestrzeń, ale powinna wystarczyć na pewien podzbiór lokalnej geografii dla kilku poziomów przybliżenia.

Zajrzyj do [FAQ o pobieraniu kafelków map](https://docs.meshcore.io/faq/?h=maps#47-q-how-do-i-get-maps-on-t-deck).

## Kopiowanie plików do LittleFS
Istnieje wygodne narzędzie online o nazwie [ESPConnect](https://thelastoutpostworkshop.github.io/ESPConnect), które ułatwia podłączenie Heltec V4 przez USB do komputera, a następnie dodawanie/modyfikowanie/usuwanie plików w partycji LittleFS.

Wystarczy kliknąć przycisk **CONNECT** u góry, wybrać port połączenia USB, a następnie kliknąć zakładkę **LittleFS Tools**.

![Zakładka LittleFS Tools w ESPConnect](https://blog.meshcore.io/assets/images/2026/03/28/espconnect-littlefs.png)

Musisz uzbroić się w cierpliwość, bo narzędzie wykona _pełny odczyt_ partycji, ale po jego zakończeniu poprosi Cię o kliknięcie **BACKUP** (co jest bardzo przydatne) - zapisze wtedy całą partycję do pliku .bin.

Zobaczysz wtedy różne pliki/foldery w systemie plików. Dla kafelków mapy po prostu przeciągnij i upuść cały przygotowany na komputerze folder „tiles”.

> [!NOTE]
> Zobaczysz to ostrzeżenie, jeśli przekroczysz limit rozmiaru.

![Ostrzeżenie o przekroczonym limicie rozmiaru w ESPConnect](https://blog.meshcore.io/assets/images/2026/03/28/espconnect-full.png)

Po dodaniu/usunięciu plików/folderów powinieneś zobaczyć pomarańczowe ostrzeżenie **Unsaved changes**, a po wprowadzeniu wszystkich potrzebnych zmian wystarczy kliknąć niebieski przycisk **SAVE TO FLASH**.

![Przycisk SAVE TO FLASH w ESPConnect](https://blog.meshcore.io/assets/images/2026/03/28/espconnect-save.png)

Ponownie, uzbrój się w cierpliwość, bo narzędzie zapisuje całą partycję z powrotem na urządzenie. Po zakończeniu po prostu odłącz urządzenie i naciśnij na nim przycisk Reset.
