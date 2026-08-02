---
title: LilyGo T-Watch S3 Plus
description: Firmware Ripple zyskuje wsparcie dla LilyGo T-Watch S3 Plus - programowalnego zegarka z GPS, radiem LoRa sx1262 i 1,5-calowym kolorowym ekranem dotykowym.
createdAt: 28.03.2026
tags: [Oprogramowanie, Sprzęt]
---

# LilyGo T-Watch S3 Plus
Dodałem właśnie obsługę [T-Watch S3 Plus](https://www.lilygo.cc/products/t-watch-s3-plus?bg_ref=cq3pUU7cD3).
To naszpikowany funkcjami, programowalny zegarek od LilyGo, z wbudowanym GPS, radiem LoRa sx1262 oraz 1,5-calowym kolorowym ekranem dotykowym.

![LilyGo T-Watch S3 Plus](https://blog.meshcore.io/assets/images/2026/03/28/twatchs3plus.jpg)

## Pobieranie
Firmware pobierzesz i zainstalujesz w jednym kroku, korzystając z tego [bezpośredniego linku](https://flasher.meshcore.io/ripple-lilygo-t-watch-s3-plus/) do celu w MeshCore Flasher.

## Nawigacja w interfejsie
Zegarek ma 3 fizyczne przyciski: jeden na lewym/górnym „ramieniu”, jeden na prawym górnym „ramieniu” oraz przycisk zasilania wzdłuż prawej krawędzi.

![Rozmieszczenie przycisków T-Watch S3 Plus](https://blog.meshcore.io/assets/images/2026/03/28/twatchhelp.png)

> [!NOTE]
> Prawy górny przycisk to przycisk RESET, który uruchamia ponowne uruchomienie urządzenia.

Nawigacja w interfejsie opiera się na kursorze - ciemnoszary wybór przesuwasz w górę/dół, dotykając górnego i dolnego obszaru ekranu (zgodnie z powyższym obrazkiem). Następnie dotknij prawej strony, aby wybrać, i lewej strony, aby wrócić do poprzedniego ekranu.

Niektóre ekrany wymagają klawisza ENTER do zatwierdzenia/zapisania/wysłania - robisz to krótkim wciśnięciem przycisku zasilania. Długie przytrzymanie (ok. 4 sekundy) wyłącza urządzenie.

Naciśnij lewy górny przycisk, aby włączyć/wyłączyć ekran.

## Tarcza zegarka / ekran blokady
Ekran automatycznie wyłącza się po okresie bezczynności, ale istnieje specjalny ekran blokady, który pojawia się, gdy urządzenie jest w trybie czuwania oraz gdy przechylisz nadgarstek, by spojrzeć na tarczę zegarka.

![Ekran blokady T-Watch S3 Plus](https://blog.meshcore.io/assets/images/2026/03/28/twatchlock.png)

## Ogólny przewodnik
Interfejs T-Watch S3 przypomina w większości inne urządzenia z serii Ultra, takie jak T-Deck, więc po szczegóły zajrzyj do [ogólnego przewodnika użytkownika](https://buymeacoffee.com/ripplebiz/ultra-v7-7-guide-meshcore-users).

## Tryb dla dzieci
T-Watch świetnie sprawdza się jako lokalizator dla dzieci dzięki trybowi dla dzieci (Kid Mode) w interfejsie Ripple. Urządzenie można zablokować tak, by wyświetlane były wyłącznie kontakty przyjazne dzieciom, bez możliwości kontaktu z obcymi. Zobacz [ten artykuł](https://blog.meshcore.io/2025/10/02/kid-mode), by dowiedzieć się, jak to działa.

![Tryb dla dzieci na T-Watch S3 Plus](https://blog.meshcore.io/assets/images/2026/03/28/twatchkidmode.png)

## Nowość: własne tarcze zegarka
Wersja 9.3 firmware wprowadza kilka miłych możliwości personalizacji tarczy zegarka/ekranu blokady.

Możesz teraz ustawić preferencję **Wyświetlacz** na **Cyfrowy** lub **Analogowy**. W obu przypadkach możesz wgrać własny obraz tła w formacie PNG! Dla opcji analogowej potrzebujesz obrazu _bez wskazówek_, ponieważ wskazówka godzinowa i minutowa są renderowane na wierzchu tego tła.

![Wybór własnej tarczy zegarka](https://blog.meshcore.io/assets/images/2026/03/28/custom-watchfaces.jpg)

Aby dostosować tło cyfrowej tarczy, po prostu umieść w katalogu głównym plik PNG 240x240 o nazwie **default-face.png**.

Aby dostosować tło analogowej tarczy, po prostu umieść w katalogu głównym plik PNG 240x240 o nazwie **analog-face.png**.

## Nowość: mapy
Wersja v9.3 potrafi już obsłużyć _niektóre_ kafelki mapy i wyświetlić je w widoku mapy.

![Mapa na T-Watch S3 Plus](https://blog.meshcore.io/assets/images/2026/03/28/twatch-maps.png)

## Firmware „LittleFS”
Firmware v9.3 ma teraz dwa warianty: odziedziczony, dla tych, którzy chcą po prostu zaktualizować urządzenie i _nie_ korzystać z tarcz zegarka ani map, oraz wariant „-LFS”.

Wariant -LFS używa innego schematu partycji, więc jeśli wgrasz go na obecny firmware, _stracisz swoje ustawienia_. Gdy jednak już masz ten wariant, kolejne aktualizacje można bezpiecznie wgrywać bez utraty danych.

Ten nowy wariant wydziela partycję LittleFS o rozmiarze około 14 MB. Możesz więc umieścić na niej kafelki mapy do mniej więcej tego rozmiaru. To dość ograniczona przestrzeń, ale powinna wystarczyć na pewien podzbiór lokalnej geografii dla kilku poziomów przybliżenia.

Zajrzyj do [FAQ o pobieraniu kafelków map](https://docs.meshcore.io/faq/?h=maps#47-q-how-do-i-get-maps-on-t-deck).

## Kopiowanie plików do LittleFS
Istnieje wygodne narzędzie online o nazwie [ESPConnect](https://thelastoutpostworkshop.github.io/ESPConnect), które ułatwia podłączenie T-Watch przez USB do komputera, a następnie dodawanie/modyfikowanie/usuwanie plików w partycji LittleFS.

Wystarczy kliknąć przycisk **CONNECT** u góry, wybrać port połączenia USB, a następnie kliknąć zakładkę **LittleFS Tools**.

![Zakładka LittleFS Tools w ESPConnect](https://blog.meshcore.io/assets/images/2026/03/28/espconnect-littlefs.png)

Musisz uzbroić się w cierpliwość, bo narzędzie wykona _pełny odczyt_ partycji, ale po jego zakończeniu poprosi Cię o kliknięcie **BACKUP** (co jest bardzo przydatne) - zapisze wtedy całą partycję do pliku .bin.

Zobaczysz wtedy różne pliki/foldery w systemie plików. Wystarczy przeciągnąć i upuścić pliki, takie jak „analog-face.png”, aby dodać je do zegarka. To samo możesz zrobić z kafelkami mapy - po prostu przeciągnij i upuść cały przygotowany na komputerze folder „tiles”.

> [!NOTE]
> Zobaczysz to ostrzeżenie, jeśli przekroczysz limit rozmiaru.

![Ostrzeżenie o przekroczonym limicie rozmiaru w ESPConnect](https://blog.meshcore.io/assets/images/2026/03/28/espconnect-full.png)

Po dodaniu/usunięciu plików/folderów powinieneś zobaczyć pomarańczowe ostrzeżenie **Unsaved changes**, a po wprowadzeniu wszystkich potrzebnych zmian wystarczy kliknąć niebieski przycisk **SAVE TO FLASH**.

![Przycisk SAVE TO FLASH w ESPConnect](https://blog.meshcore.io/assets/images/2026/03/28/espconnect-save.png)

Ponownie, uzbrój się w cierpliwość, bo narzędzie zapisuje całą partycję z powrotem na zegarek. Po zakończeniu po prostu odłącz zegarek i naciśnij przycisk Reset na prawym górnym „ramieniu” zegarka.
