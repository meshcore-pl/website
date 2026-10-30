---
title: Regionalizacja wiadomości w MeshCore
description: Jak działa regionalizacja wiadomości kanałowych w MeshCore - konfiguracja CLI, ustawianie zakresu w aplikacji i schemat regionów w Polsce.
canonical: /dokumentacja/meshcore/regionalizacja-wiadomosci
createdAt: 3.08.2026
updatedAt: 30.10.2026
---

# Regionalizacja wiadomości - filtrowanie kanałów w MeshCore {toc: Regionalizacja wiadomości}

> [!IMPORTANT]
> Nazwy regionów wynikają z ustaleń społeczności i mogą różnić się między obszarami. Ten dokument jest obecnie w trakcie tworzenia.

Masz duży ruch i czujesz, że kanał `Public` zaczyna pękać w szwach od wiadomości z drugiego końca Polski (a przy sprzyjającej propagacji nawet Europy)?
Regionalizacja pozwala temu zaradzić - filtruje, które repeatery przekazują dalej wiadomości kanałowe, dzięki czemu sieć się odciąża, a chaos maleje.

> [!TIP]
> Nie chcesz składać komend ręcznie? [Generator regionów](https://meshcorepolska.org/generator-regionow) przygotuje komendy CLI dla repeatera i listę kanałów do ustawienia w aplikacji.


## Jak to działa
Repeater decyduje o przekazaniu wiadomości na podstawie swojej listy regionów:

| Konfiguracja repeatera        | Wiadomość bez regionu | Wiadomość z regionem `pl-zp` |
| ----------------------------- | --------------------- | ---------------------------- |
| brak regionów (domyślnie)     | przekazuje            | odrzuca                      |
| `pl-zp` zezwolony (`allowf`)  | przekazuje            | przekazuje                   |
| `pl-zp` zablokowany (`denyf`) | przekazuje            | odrzuca                      |
| brak `pl-zp` na liście        | przekazuje            | odrzuca                      |

Wiadomość z regionem dociera więc tylko tak daleko, jak sięga łańcuch repeaterów obsługujących ten region - jeden nieskonfigurowany repeater po drodze może przerwać ten łańcuch. Dlatego konfigurację zaczyna się od repeaterów, a dopiero potem ustawia regiony na companionie.

> [!NOTE]
> - Regionem oznacza się kanał - jeden kanał może mieć maksymalnie jeden region. Wiadomości prywatne i adverty obejmuje dopiero [domyślny zakres](#domyslny-zakres).
> - Kanał `Public` jest domyślnie dostępny bez regionu. Część użytkowników stosuje jednak zakres `pl`, a lokalnie bywają też inne (np. `wlkp`, `pl-mz`, `zachod`). Nie należy zakładać, że całe województwo korzysta z identycznych ustawień.
> - Ruch bez regionu (`*`) można zablokować komendą `region denyf *`, ale obecnie nie jest to zalecane. Łagodniejszą alternatywą (firmware 1.16+) jest ograniczenie jego zasięgu, np. `set flood.max.unscoped 3`.
> - Region to tylko etykieta, **nie** szyfrowanie.

Nazwa regionu to uzgodniona przez społeczność etykieta (kraj, województwo, miasto), która musi być identyczna na wszystkich urządzeniach - każda literówka to zupełnie inny region. Stosuj tylko małe litery, cyfry i myślnik, bez prefiksu `#`, maksymalnie 29 bajtów. Wielkość liter ma znaczenie: `PL` i `pl` to dwa różne regiony.


## Schemat regionów wdrożony w Polsce {toc: Schemat regionów}
Region krajowy to `pl`, a pod nim znajdują się regiony wojewódzkie.
Ich nazwy w większości pochodzą z literowych kodów [ISO 3166-2:PL](https://pl.wikipedia.org/wiki/ISO_3166-2:PL#Kody_przed_26_listopada_2018) sprzed 26 listopada 2018 r., zapisanych małymi literami, np. `pl-zp`.
Wyjątkiem w opisanych konfiguracjach jest Wielkopolska, gdzie funkcjonuje region `wlkp` zamiast `pl-wp`.

| Obszar              | Region (scope) | Kanały                         |
|---------------------|----------------|--------------------------------|
| Polska              | `pl`           | `#polska`                      |
| Dolnośląskie        | `pl-ds`        | `#dolnoslaskie`, `#ds-test`    |
| Kujawsko-pomorskie  | `pl-kp`        | `#kp`                          |
| Lubelskie           | `pl-lu`        | `#lubelskie`, `#lublin`        |
| Lubuskie            | `pl-lb`        | `#lubuskie`                    |
| Łódzkie             | `pl-ld`        | `#lodzkie`                     |
| Małopolskie         | `pl-ma`        | `#malopolskie`, `#krakow`      |
| Mazowieckie         | `pl-mz`        | `#mazowsze`, `#bot`            |
| Opolskie            | `pl-op`        | `#opolskie`                    |
| Podkarpackie        | `pl-pk`        | `#podkarpackie`, `#testing`    |
| Podlaskie           | `pl-pd`        | `#podlaskie`                   |
| Pomorskie           | `pl-pm`        | `#pm`                          |
| Śląskie             | `pl-sl`        | `#slaskie`, `#botslaskie`      |
| Świętokrzyskie      | `pl-sk`        | `#swietokrzyskie`, `#kielce`   |
| Warmińsko-mazurskie | `pl-wn`        | `#warminsko-mazurskie`         |
| Wielkopolskie       | `wlkp`         | `#wlkp`, `#poznan`, `#weather` |
| Zachodniopomorskie  | `pl-zp`        | `#zachodniopomorskie`          |

Kanały `#test`, `#bot` i `#info` często są używane bez regionu, jednak lokalnie mogą mieć ustalony zakres:
- Wielkopolska: `#test` i `#info` mogą korzystać z regionu `wlkp`.
- Warszawa: `#bot` i `#test` mogą korzystać z regionu `waw`, a `#bot` także z `pl-mz`.
- Trójmiasto: `#bot` może korzystać z lokalnego regionu `gdn`.
- Śląskie: `#botslaskie` korzysta z regionu `pl-sl`.
- Dolnośląskie: `#ds-test` korzysta z regionu `pl-ds`.

### Dodatkowe regiony lokalne

| Obszar        | Region (scope) | Region nadrzędny | Kanały                   |
| ------------- | -------------- | ---------------- | ------------------------ |
| Bydgoszcz     | `bzg`          | `pl-kp`          | `#bydgoszcz`             |
| Warszawa      | `waw`          | `pl-mz`          | `#warszawa`              |
| Rzeszów       | `pl-rze`       | `pl-pk`          | `#rzeszow`               |
| Wrocław       | `wro`          | `pl-ds`          | `#wroclaw`, `#wroc-tech` |
| Zielona Góra  | `zgora`        | `pl-lb`          | brak danych              |
| Zachód Polski | `zachod`       | `pl`             | `#zachod`, `#szczecin`   |
| Łódź          | `ldz`          | `pl-ld`          | `#lodz`                  |
| Trójmiasto    | `gdn`          | `pl-pm`          | `#pomorskie`, `#bot`     |

Regiony lokalne mają własne nazwy, zwykle bez prefiksu `pl-`. Rzeszów korzysta z regionu `pl-rze`, podrzędnego wobec `pl-pk`. Wspólny region `zachod` jest stosowany w konfiguracjach Dolnośląskiego, Lubuskiego, Wielkopolskiego i Zachodniopomorskiego. Podana hierarchia określa proponowane relacje nadrzędne - samo dodanie regionu nie przypisuje go automatycznie do województwa.

Nazwy kanałów miejskich nie zawsze oznaczają osobny region miejski: `#krakow` korzysta z `pl-ma`, `#lublin` z `pl-lu`, `#kielce` z `pl-sk`, a `#poznan` z `wlkp`.


## Konfiguracja repeatera
Przykład dla repeatera w województwie zachodniopomorskim (firmware 1.16+):

```mccli
region def pl pl-zp
region save
region
```

Komenda `region def` tworzy hierarchię regionów. Każda kolejna nazwa trafia pod poprzednią, więc `pl-zp` zostaje podregionem `pl`.
Nowe regiony mają automatycznie zezwolenie na przekazywanie wiadomości (flood). `region save` zapisuje konfigurację, a `region` wyświetla aktualne drzewo regionów. Oczekiwany wynik:

```text
*^ F
 pl F
  pl-zp F
```

Litera `F` oznacza zezwolenie na przekazywanie wiadomości. Znak `^` wskazuje region home.

Komenda `region def` nie usuwa istniejących regionów. Jeśli region już istnieje, może zmienić jego położenie w hierarchii. Przed zmianami sprawdź aktualną konfigurację poleceniem `region`.

> [!TIP]
> Nie musisz ręcznie tworzyć hierarchii. [Generator regionów](https://meshcorepolska.org/generator-regionow) przygotuje odpowiednie komendy dla Twojego województwa, sąsiednich obszarów i wybranego regionu lokalnego.


## Konfiguracja companiona (w aplikacji) {toc: Konfiguracja companiona}
1. Dołącz do kanałów swojego regionu: **Dodaj kanał → Dołącz do kanału hashtagowego**, np. `#polska` i `#zachodniopomorskie`.
2. W każdym kanale ustaw zakres: **3 kropki → Ustaw zakres regionu** i wybierz region z listy (nowy dodasz przyciskiem "+"), np. `pl` dla `#polska` i `pl-zp` dla `#zachodniopomorskie`.
3. Zakres usuniesz w tym samym miejscu: **3 kropki → Wyczyść zakres**.

Opcja **Wykryj regiony** odpytuje najbliższe repeatery (0 hop) o zezwolone regiony i pozwala dodać je z listy. Działa również dla repeaterów spoza kontaktów.
Funkcja bywa jednak zawodna - czasami nie wykrywa regionów dostępnych na pobliskich repeaterach.

Pamiętaj, że nazwa kanału i jego region to dwa osobne ustawienia. Kanał `#test` bez zakresu nie jest tym samym co `#test` z zakresem `wlkp`. Użytkownicy muszą mieć zgodne ustawienia, aby komunikować się w zamierzonym regionie.


## Domyślny zakres {toc: Domyślny zakres}
Region można nadać także pakietom spoza kanałów - wiadomościom prywatnym (DM), advertom i żądaniom.

> [!WARNING]
> Pakiety z określonym zakresem przekazują repeatery, których konfiguracja zezwala na przekazywanie tego regionu. Repeatery bez odpowiedniej konfiguracji mogą przerwać dalsze rozgłaszanie wiadomości.
> Ustaw domyślny zakres dopiero wtedy, gdy repeatery w Twojej okolicy mają już region `pl`, inaczej Twoje wiadomości prywatne i adverty mogą nigdzie nie dotrzeć.

### Companion
Główny ekran **Ustawień**. Obejmuje wszystkie pakiety flood wysyłane przez companiona, a zakres ustawiony na kanale ma pierwszeństwo.
Wybierz duży region obejmujący Ciebie i osoby, z którymi piszesz - w Polsce `pl`. Zbyt wąski region sprawi, że wiadomości na PW i potwierdzenia (ACK) nie wyjdą poza jego granice.

### Repeater / room serwer
Sprawdzenie obecnego domyślnego zakresu:

```mccli
region default
```

Ustawienie domyślnego zakresu (zmiana zostaje automatycznie zapisana):

```mccli
region default pl
```

Wyczyszczenie domyślnego zakresu:

```mccli
region default <null>
```

Obejmuje tylko pakiety tworzone przez samo urządzenie: adverty repeatera oraz adverty i posty room serwera. Odpowiedzi na żądania dostają zakres żądania, a jeśli nie da się go ustalić, wychodzą bez zakresu.

Ustawienie domyślnego zakresu na `pl` nie jest obowiązkowe. Przed jego włączeniem upewnij się, że okoliczne repeatery obsługują ten region, a lokalna społeczność stosuje taki schemat.
