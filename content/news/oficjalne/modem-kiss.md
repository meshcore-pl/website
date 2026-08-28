---
title: Modem KISS
description: Wprowadzenie do roli firmware KISS Modem w MeshCore - czym jest protokół KISS, dla kogo przeznaczona jest ta rola radiowa oraz jak ją flashować przy budowie bramek i własnych narzędzi.
createdAt: 27.08.2026
sourceUrl: https://blog.meshcore.io/2026/08/27/kiss-modem-intro
tags: [Oprogramowanie, Narzędzia]
---

# Modem KISS
![Modem KISS](https://blog.meshcore.io/assets/images/2026/08/27/kiss-modem-hero.png)

Czym jest rola firmware KISS Modem, czym nie jest i dla kogo została pomyślana.

Od wersji v1.16.0 flasher oferuje rolę KISS Modem dla większości płytek (selektor ról nazywa ją „KISS Radio Modem”), a sądząc po pytaniach na Discordzie, sama nazwa sporo osób myli. Oto krótkie wyjaśnienie.

To ten sam firmware MeshCore i to samo radio pod spodem. Zmienia się tylko sposób komunikacji z płytką: zamiast aplikacji otwiera się port szeregowy i komunikuje się protokołem KISS - starym, bardzo prostym protokołem, którego amatorskie modemy pakietowe (TNC) używają od dekad. Radio zostaje na płytce, natomiast cała logika decydująca o tym, co wysłać i co zrobić z tym, co przyjdzie z powrotem, działa na komputerze podłączonym po drugiej stronie kabla. W efekcie powstaje coś bliższego dongle'owi LoRa dla MeshCore niż pełnoprawnemu węzłowi sieci.

![Kto steruje modemem KISS](https://blog.meshcore.io/assets/images/2026/08/27/kiss-modem-brains.png)

## Dla kogo jest przeznaczona
Większości osób ta rola nie będzie potrzebna. Jeśli celem jest wysyłanie wiadomości z telefonu, naturalnym wyborem pozostaje firmware companion razem z aplikacją.

Modem KISS jest przeznaczony dla osób budujących bramki albo usługi na porządnym komputerze. OpenHop (dawniej pyMC) to najbardziej oczywisty przykład - potrafi używać modemu KISS jako swojego radia.

Nie musi to być jednak żaden „porządny” sprzęt. Autor artykułu opisuje własnego Commodore 64 rozmawiającego w sieci mesh właśnie przez taki modem, podłączonego przez port użytkownika przy 600 bodach - to mniej więcej granica możliwości fabrycznych procedur szeregowych KERNAL-a. C64 buduje pakiety i rysuje ekran, a modem zajmuje się LoRa i AES.

![C64 czekający na modem](https://blog.meshcore.io/assets/images/2026/08/27/mc64-waiting-for-modem.png)

Rola przydaje się też, gdy chce się pogrzebać w pakietach MeshCore z poziomu laptopa w dowolnym języku, bez flashowania osobnego firmware'u pod każdy pomysł (firmware companion też potrafi przekazać surowe pakiety, a od wersji 1.16 również je wysyłać, ale tutaj dostaje się całe radio bez niczego pomiędzy).

## Czym jest KISS?
Keep It Simple, Stupid. To sposób ramkowania, który amatorskie radio pakietowe wykorzystuje w komunikacji między komputerem a TNC od lat 80. MeshCore go nie wymyślił - zapożyczył, bo jest prosty i biblioteki obsługujące go istnieją w niemal każdym języku programowania.

Najprościej można to sobie wyobrazić tak: KISS jest kopertą, a pakiet MeshCore listem w środku.

![Koperta KISS](https://blog.meshcore.io/assets/images/2026/08/27/kiss-envelope.png)

Bajt C0 na każdym końcu, bajt typu i pakiet pomiędzy nimi. Dlatego dokumentacja protokołu wspomina, że dowolny klient KISS (Direwolf, APRSdroid i inne) może sterować modemem - chętnie wypchnie przez radio surowe ramki. Nie oznacza to jednak, że trafiają one do sieci mesh - taki klient potrafi otworzyć kopertę, ale zawartość nic dla niego nie znaczy, a sieć mesh również nic nie zrobi z tego, co od niego dostanie.

Poza standardowym KISS firmware dokłada rozszerzenia specyficzne dla MeshCore (ustawienia radia, raporty sygnału, stan baterii, kryptografię) przez dedykowaną komendę KISS, którą zwykłe klienty po prostu ignorują.

## Co robi płytka
Całkiem sporo - po prostu nie zajmuje się żadną logiką sieci mesh. Wysyła i odbiera surowe pakiety MeshCore przez LoRa. Odebrane pakiety trafiają na łącze szeregowe dokładnie takie, jakie przyszły z eteru, z dołączonym do każdego raportem sygnału (RSSI i SNR) - a to oprogramowanie po stronie hosta decyduje, co dalej z nimi zrobić.

Host konfiguruje radio: częstotliwość, szerokość pasma, spreading factor, coding rate oraz moc nadawania. Można też odpytać płytkę o napięcie baterii, poziom szumów, liczniki pakietów i dostępne czujniki, a ona oszacuje, ile czasu zająłby dany pakiet w powietrzu przy aktualnych ustawieniach. Pełną listę możliwości opisuje dokumentacja protokołu.

Żadne ustawienia radia nie przetrwają restartu - poza parą kluczy płytki nic nie jest zapisywane na stałe, więc oprogramowanie hosta konfiguruje radio od nowa przy każdym połączeniu.

Płytka nasłuchuje przed nadawaniem, dzięki czemu nie zagłusza cudzego ruchu, i obsługuje jeden pakiet naraz - informuje, kiedy pakiet został wysłany, i odmawia przyjęcia kolejnego, dopóki to nie nastąpi.

Każda płytka ma własną parę kluczy, generowaną przy pierwszym uruchomieniu i przechowywaną we flashu. Klucza prywatnego nie da się odczytać, więc jeśli tożsamość płytki ma funkcjonować w sieci mesh, to ona sama musi podpisywać dane i wykonywać wymianę kluczy na żądanie hosta. Potrafi też szyfrować, deszyfrować i weryfikować przy użyciu kluczy dostarczonych z zewnątrz. Można też pominąć to wszystko - płytka wysyła dowolne bajty, które dostanie, bez ich sprawdzania, więc host trzymający własną parę kluczy jest w stanie budować prawidłowe pakiety, nigdy nie dotykając kryptografii płytki. Właśnie tak działa OpenHop. Wspomniany wcześniej C64 idzie w zupełnie drugą stronę - nie ma mocy obliczeniowej na AES, więc każdą wiadomość oddaje modemowi do zaszyfrowania lub odszyfrowania.

Czego brakuje: trasowania, przekazywania (repeat), czatu, room serwera. To wszystko pozostaje po stronie hosta.

## Flashowanie
Flashowanie wygląda dokładnie tak samo jak w przypadku każdej innej roli.

1. Wejdź na [flasher.meshcore.io](https://flasher.meshcore.io)
2. Wybierz swoją płytkę
3. Wybierz rolę KISS Radio Modem
4. Flashuj
5. Otwórz port szeregowy płytki przy 115200 bodach, 8N1, z poziomu oprogramowania mówiącego w MeshCore

![Rola KISS we flasherze](https://blog.meshcore.io/assets/images/2026/08/27/flasher-kiss-role.png)

To właśnie krok 5. wymaga prawdziwej pracy. Na niemal każdej płytce ten port szeregowy pokrywa się z portem USB. Istnieje opcja kompilacji (`KISS_UART_RX` i `KISS_UART_TX`) pozwalająca przenieść komunikację na gołe piny UART, przydatna np. przy podłączaniu płytki bezpośrednio do złącza Raspberry Pi, ale wymaga to samodzielnego zbudowania firmware'u.

Osoby, które nie chcą pisać obsługi strony szeregowej od zera, mogą sięgnąć po gotowe rozwiązanie w OpenHop. Dla chcących zrobić to samodzielnie, dokumentacja [protokołu modemu KISS](https://docs.meshcore.io/kiss_modem_protocol) opisuje stronę szeregową, a strona [formatu pakietów](https://docs.meshcore.io/packet_format) - zawartość samych ramek.

## Od czego zacząć
- Flasher: [https://flasher.meshcore.io](https://flasher.meshcore.io)
- Dokumentacja protokołu: [https://docs.meshcore.io/kiss_modem_protocol](https://docs.meshcore.io/kiss_modem_protocol)
- Format pakietów: [https://docs.meshcore.io/packet_format](https://docs.meshcore.io/packet_format)
- OpenHop: [https://github.com/openhop-dev/openhop_repeater](https://github.com/openhop-dev/openhop_repeater)

Jeśli komuś uda się coś na tym uruchomić, warto pochwalić się tym na [Discordzie](https://meshcore.gg).
