---
title: Filtrowanie regionów
description: Filtrowanie regionów trafia do MeshCore - firmware przemiennika, Ripple i aplikacja Liama pozwalają ograniczać zasięg wiadomości kanałowych do regionu.
createdAt: 20.01.2026
sourceUrl: https://blog.meshcore.io/2026/01/20/region-filtering
tags: [Oprogramowanie, Aplikacja]
---

# Filtrowanie regionów
Wreszcie wszystkie elementy układanki trafiają na swoje miejsce - filtrowanie regionów jest już dostępne.
Poprzedziło je kilka kluczowych zmian w kodzie, które musiały pojawić się wcześniej, by zapewnić odpowiednie wsparcie - między innymi obsługa kodów transportowych w nagłówkach pakietów, a ostatnio, wraz z wydaniem firmware przemiennika v1.10.0, konfiguracja regionów i właściwa logika filtrowania.

Ostatnim elementem układanki jest obsługa po stronie urządzeń klienckich oraz interfejs, który (miejmy nadzieję) jest wygodny w obsłudze.
Firmware Ripple z graficznym interfejsem jest już gotowy, podobnie jak zmiany w aplikacji Liama.

![Filtrowanie regionów w MeshCore](https://blog.meshcore.io/assets/images/2026/01/20/image_2.jpg)

## Aktualizacja: 25 stycznia 2026
Po dyskusjach oraz ze względu na pewne zamieszanie między #kanałami a #regionami, zdecydowano się zrezygnować z wymogu prefiksu „#”.
Nazwy regionów będą więc zwykłymi ciągami alfanumerycznymi (i „-”), bez prefiksu #.

Dla zachowania wstecznej kompatybilności, nazwy będą _wewnętrznie_ nadal poprzedzone znakiem „#”, ale w żadnym interfejsie klienckim ani w linii poleceń zasadniczo nie zobaczysz już wzmianek o prefiksie „#”.
Kolejne wydanie firmware (v1.12.0), a następnie firmware Ripple i aplikacja Liama, będą miały zmieniony interfejs bez wymogu prefiksu „#”.

## Aktualizacja: 20 lutego 2026
Pojawiło się pewne zamieszanie wokół regionu-wieloznacznika „*” i żałuję, że nazwałem go w ten sposób.
Z perspektywy czasu powinienem był nazwać go „?” albo regionem _null_.
W kolejnej dokumentacji proszę czytać to właśnie w ten sposób - to jest region null.

## Interfejs Ripple
Najpierw musisz zdefiniować nazwy regionów na nowym ekranie **Regiony** (z menu profilu sieciowego).

![Ekran Regiony w Ripple](https://blog.meshcore.io/assets/images/2026/01/20/regionsscreen.jpg)

Możesz zrobić to ręcznie z poziomu menu **Dodaj nowy**, ale fajną nową funkcją firmware przemiennika v1.12.0 (kolejne wydanie) jest obsługa nowych typów żądań, w tym automatyczne wykrywanie regionów w Twojej okolicy!
Aby z tego skorzystać, wybierz menu **Skanuj lokalnie**.

![Menu Skanuj lokalnie](https://blog.meshcore.io/assets/images/2026/01/20/regionsscan.jpg)

Wykorzystuje ono nowe żądanie typu Discover, na które odpowiadają wszystkie przemienniki w zasięgu, przesyłając listę regionów, jakie są skonfigurowane do obsługi.
Wyniki są następnie zestawiane, a jeśli któryś z nich nie znajduje się na liście Twojego urządzenia, zostaniesz zapytany, czy chcesz go dodać.

![Propozycja dodania znalezionego regionu](https://blog.meshcore.io/assets/images/2026/01/20/regionaddfound.jpg)

Gdy masz już zdefiniowane regiony, wchodząc na dowolny ekran czatu kanału grupowego, możesz skorzystać z nowego menu **Ustaw zakres** (Set Scope), aby wybrać, do jakiego regionu chcesz ograniczyć _wysyłane_ wiadomości (odbierać wiadomości nadal możesz z dowolnego miejsca w sieci mesh).

![Menu Ustaw zakres na ekranie kanału](https://blog.meshcore.io/assets/images/2026/01/20/channelsetscope.jpg)

Preferencja zakresu jest zapisywana osobno dla każdego kanału grupowego i można ją zmieniać w dowolnym momencie.

## Aplikacja mobilna
Liam opublikował już [wersję 1.38.0 aplikacji MeshCore](https://play.google.com/store/apps/details?id=com.liamcottle.meshcore.android), która ma nowe menu **Ustaw zakres regionu** na ekranie czatu kanału grupowego.

![Menu Ustaw zakres regionu w aplikacji mobilnej](https://blog.meshcore.io/assets/images/2026/01/20/Screenshot_20260120_at_1.02.54pm.png)

Ekran wyboru i zarządzania regionami powinien być bardzo intuicyjny.
Po dodaniu regionu i jego wybraniu, pasek tytułowy czatu kanału zmienia się, pokazując, do jakiego regionu ograniczone są Twoje wiadomości.

![Pasek tytułowy czatu z wybranym regionem](https://blog.meshcore.io/assets/images/2026/01/20/Screenshot_20260120_at_1.03.12pm.png)

## Co dalej
Pierwszy krok należy do administratorów przemienników.
Będzie to wymagało dyskusji na forach, z których korzystacie (albo nawet przez samą sieć mesh!), by dojść do konsensusu, jak podzielić swój obszar geograficzny.
Nazwy regionów muszą być _dokładne_ - jakakolwiek literówka będzie traktowana jako zupełnie inny region! Obowiązuje kilka zasad dotyczących nazw:

- maksymalnie 29 _bajtów_ (UTF-8)
- wyłącznie małe znaki alfanumeryczne oraz „-” (myślnik)
- dla danej sieci mesh nazwy regionów muszą być unikalne

Każdy przemiennik może obsługiwać wiele regionów, więc możesz mieć super-regiony obejmujące np. całe województwo, z mniejszymi podregionami powiatowymi.
Hierarchia regionów może sięgać dowolnie głęboko.

![Przykładowa hierarchia regionów](https://blog.meshcore.io/assets/images/2026/01/20/exampleregions.png)

Dla przykładu: większy region zaznaczony na czerwono mógłby nazywać się **sample-city**, zielony podregion **sample-west**, a pomarańczowy podregion **sample-east**.
Administratorzy przemienników musieliby wtedy dodać różne nazwy regionów do konfiguracji każdego przemiennika (można to zrobić zdalnie).

Dla obszarów granicznych, jak w środku, rozsądnie jest uwzględnić _oba_ regiony. Przemienniki **E** i **F** skonfigurowałyby więc: **sample-city, sample-east, sample-west**.

Przemienniki **A, B** i **C** skonfigurowałyby: **sample-city, sample-west**.

Przemienniki **I, G** i **H** skonfigurowałyby: **sample-city, sample-east**.

A odosobniony przemiennik **D** miałby tylko: **sample-city**.

Zajrzyj do [dokumentacji poleceń CLI przemiennika](https://docs.meshcore.io/cli_commands), do sekcji zarządzania regionami.
Aby zdefiniować region, wydaj komendę „**region put ..**”, a następnie „**region allowf ...**”, by zezwolić na pakiety flood dla tego regionu.
I nie zapomnij o „**region save**” na koniec! Musisz to zrobić tylko raz (lub za każdym razem, gdy zmieniają się regiony).

Zwykli użytkownicy urządzeń klienckich będą musieli poczekać, aż ta konfiguracja przemienników się rozpowszechni, po czym będą mogli postąpić zgodnie z krokami opisanymi powyżej - albo automatycznie wykryć regiony w swojej okolicy, albo dodać je ręcznie.

## FAQ
**Pytanie: Jako administrator przemiennika, jeśli skonfiguruję jakieś regiony, czy oznacza to, że wiadomości przestaną docierać?**

Nie. Domyślnie większość aplikacji klienckich wysyła wiadomości kanałowe z użyciem regionu _null_ („*”). To ustawienie odziedziczone, oznaczające, że wiadomość (obecnie) trafi wszędzie.

**Pytanie: Co się dzieje, gdy nadawca ustawi region zakresu, a wciąż jest wielu przemienników bez skonfigurowanych regionów?**

Od wersji v1.10.0 obowiązuje podstawowa reguła filtrowania, która (w takim przypadku) _nie_ przekaże dalej pakietów flood z ustawionym zakresem, jeśli w konfiguracji przemiennika nie ma pasującego regionu. Odziedziczone pakiety flood (jak opisano powyżej) nadal będą przekazywane. Jeśli jednak w danym obszarze wciąż działają przemienniki sprzed wersji v1.10.0, pakiety flood z ustawionym zakresem będą „przeciekać” do innych regionów.

**Pytanie: Czy można zablokować odziedziczone pakiety flood (czyli bez ustawionego zakresu)?**

Tak. Odziedziczone pakiety flood (czyli bez dołączonego kodu transportowego zakresu) są dopasowywane do regionu _null_, a administratorzy przemienników mogą również zmienić uprawnienia tego regionu. UWAGA: na tym etapie nie jest to zalecane, ale z poziomu linii poleceń można wydać komendę „region denyf *”, która zablokuje przekazywanie odziedziczonych pakietów flood. W takim przypadku nadawcy byliby zmuszeni _zawsze_ ustawiać zakres dla każdego pakietu flood. To może w przyszłości stać się wymogiem.

**Pytanie: Jak wyświetlić wszystkie regiony skonfigurowane na moim przemienniku?**

Obecnie można to zrobić wyłącznie przez połączenie USB i konsolę/CLI. Wynikowa lista może być zbyt długa, by przesłać ją przez LoRa w zdalnym CLI. Mamy nadzieję, że w niedalekiej przyszłości pojawi się na to lepszy sposób. Na razie pozostają wyłącznie zdalne komendy CLI **get/put/allowf/denyf/remove**.
