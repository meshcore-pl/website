---
title: Regionalizacja wiadomości w MeshCore
description: Jak działa regionalizacja wiadomości kanałowych w MeshCore (firmware 1.10+) - konfiguracja CLI, ustawianie zakresu w aplikacji i schemat regionów w Polsce.
canonical: /dokumentacja/meshcore/regionalizacja-wiadomosci
createdAt: 3.08.2026
updatedAt: 2.10.2026
---

# Regionalizacja wiadomości - filtrowanie kanałów w MeshCore {toc: Regionalizacja wiadomości}

> [!IMPORTANT]
> Ten dokument jest obecnie w trakcie tworzenia.

Masz duży ruch i czujesz, że kanał `Public` zaczyna pękać w szwach od wiadomości z drugiego końca Polski (a przy sprzyjającej propagacji nawet Europy)?
Regionalizacja pozwala temu zaradzić - filtruje, które repeatery przekazują dalej wiadomości kanałowe, dzięki czemu sieć się odciąża, a chaos maleje. Filtrowanie regionów działa od firmware **1.10**, a opisana niżej komenda `region def` wymaga **1.16+**.

> [!TIP]
> Nie chcesz składać komend ręcznie? [Generator regionów](https://meshcorepolska.org/generator-regionow) przygotuje komendy CLI dla repeatera i listę kanałów do ustawienia w aplikacji.

## Jak to działa
Repeater decyduje o przekazaniu wiadomości na podstawie swojej listy regionów:

| Konfiguracja repeatera        | Wiadomość bez regionu | Wiadomość z regionem `pl-zp` |
|-------------------------------|-----------------------|------------------------------|
| brak regionów (domyślnie)     | przekazuje            | odrzuca                      |
| `pl-zp` zezwolony (`allowf`)  | przekazuje            | przekazuje                   |
| `pl-zp` zablokowany (`denyf`) | przekazuje            | odrzuca                      |
| brak `pl-zp` na liście        | przekazuje            | odrzuca                      |

Wiadomość z regionem dociera więc tylko tak daleko, jak sięga łańcuch repeaterów z tym regionem - jeden nieskonfigurowany repeater po drodze przerywa ten łańcuch. Dlatego konfigurację zaczyna się od repeaterów, a dopiero potem ustawia regiony na companionie.

> [!NOTE]
> - Regionem oznacza się kanał - jeden kanał może mieć maksymalnie jeden region. Wiadomości prywatne i adverty obejmuje dopiero [domyślny zakres](#domyslny-zakres).
> - Kanał `Public` powinien zostać globalny, bez regionu.
> - Ruch bez regionu (`*`) można zablokować komendą `region denyf *`, ale obecnie nie jest to zalecane. Łagodniejszą alternatywą (firmware 1.16+) jest ograniczenie jego zasięgu, np. `set flood.max.unscoped 3`.
> - Region to tylko etykieta, **nie** szyfrowanie.

Nazwa regionu to dowolna etykieta (kraj, województwo, miasto), ale musi być identyczna na wszystkich urządzeniach - każda literówka to zupełnie inny region. Stosuj tylko małe litery, cyfry i myślnik, bez prefiksu `#`, maksymalnie 29 bajtów. Wielkość liter ma znaczenie: `PL` i `pl` to dwa różne regiony.

## Schemat regionów wdrożony w Polsce {toc: Schemat regionów}
Społeczność przyjęła hierarchię regionów opartą o krótkie kody. Każdy region ma odpowiadający mu kanał hashtagowy:

| Poziom     | Region            | Kanał           | Region nadrzędny                 |
|------------|-------------------|-----------------|----------------------------------|
| Krajowy    | `pl`              | `#polska`       | brak (najwyższy)                 |
| Wojewódzki | `pl-<kod>`        | `#<kod>`        | `pl`                             |
| Miejski    | `pl-<kod miasta>` | `#<kod miasta>` | `pl-<kod>` (swojego województwa) |

Kody województw:

| Kod  | Województwo        | Kod  | Województwo         |
|------|--------------------|------|---------------------|
| `ds` | dolnośląskie       | `pk` | podkarpackie        |
| `kp` | kujawsko-pomorskie | `pd` | podlaskie           |
| `ld` | łódzkie            | `pm` | pomorskie           |
| `lb` | lubuskie           | `sk` | świętokrzyskie      |
| `lu` | lubelskie          | `sl` | śląskie             |
| `ma` | małopolskie        | `wn` | warmińsko-mazurskie |
| `mz` | mazowieckie        | `wp` | wielkopolskie       |
| `op` | opolskie           | `zp` | zachodniopomorskie  |

Regiony miejskie mają tylko duże miasta i aglomeracje z dużym zagęszczeniem urządzeń, np. Toruń/Grudziądz, Bydgoszcz, Częstochowa, Łódź, Olsztyn, Poznań/Gniezno, Trójmiasto i Warszawa.

## Konfiguracja repeatera
Przykład dla repeatera w województwie zachodniopomorskim:

```mccli
region def pl pl-zp
region save
```

Każda kolejna nazwa w `region def` trafia pod poprzednią, więc `pl-zp` zostaje podregionem `pl`.

Jeśli repeater stoi przy granicy i sięga do sąsiedniego województwa (np. wlkp.), możesz dodać jego region: `region def pl pl-zp|pl pl-wp`. Fragment `|pl` wraca do `pl`, więc `pl-wp` nie trafi pod `pl-zp`.

Komenda `region` pokaże wtedy drzewo regionów (`F` oznacza, że przekazywanie jest włączone):
```
*^ F
 pl F
  pl-zp F
  pl-wp F
```

Pozostałe komendy:
```mccli
region allowf pl-zp    # zezwala na przekazywanie regionu
region denyf pl-zp     # blokuje przekazywanie regionu
region remove pl-zp    # usuwa region (najpierw jego regiony podrzędne)
```

Region dodany przez `region def` jest od razu zezwolony, więc `region allowf` przyda się tylko do odblokowania regionu po `denyf`. Pełny opis komend znajdziesz w [dokumentacji CLI](https://docs.meshcorepolska.org/cli_commands).

Od aplikacji **1.39.0** regionami zarządzisz też bez CLI: w zdalnym zarządzaniu repeaterem **Ustawienia → Zarządzaj regionami** (zmiany zatwierdź „ptaszkiem”).

## Konfiguracja companiona (w aplikacji) {toc: Konfiguracja companiona}
1. Dołącz do kanałów swojego regionu: **Dodaj kanał → Dołącz do kanału hashtagowego**, np. `#polska` i `#zp`.
2. W każdym kanale ustaw zakres: **3 kropki → Ustaw zakres regionu** i wybierz region z listy (nowy dodasz przyciskiem „+”), np. `pl` dla `#polska` i `pl-zp` dla `#zp`.
3. Zakres usuniesz w tym samym miejscu: **3 kropki → Wyczyść zakres**.

Opcja **Wykryj regiony** (aplikacja 1.39.0+) odpytuje najbliższe repeatery (0 hop) o zezwolone regiony i pozwala dodać je z listy. Działa też dla repeaterów spoza kontaktów (aplikacja 1.45.0+, repeater z firmware 1.16.0+).

Nowsze wersje aplikacji dodały też: zakres regionu w kodzie QR kanału (1.47.0), w eksporcie i imporcie konfiguracji (1.48.0), wyświetlanie regionu przy odebranych wiadomościach (1.49.0) oraz na liście kanałów (1.50.0).

## Domyślny zakres {toc: Domyślny zakres}
Region można nadać także pakietom spoza kanałów - wiadomościom prywatnym (DM), advertom i żądaniom.

> [!WARNING]
> Pakiety z zakresem przekazują tylko repeatery, które mają ten region - repeatery bez żadnych regionów je odrzucają. Ustaw domyślny zakres dopiero wtedy, gdy repeatery w Twojej okolicy mają już region `pl`, inaczej Twoje DM-y i adverty mogą nigdzie nie dotrzeć.

**Companion:** główny ekran **Ustawień** (aplikacja 1.49.0+). Obejmuje wszystkie pakiety flood wysyłane przez companiona, a zakres ustawiony na kanale ma pierwszeństwo. Wybierz duży region obejmujący Ciebie i osoby, z którymi piszesz - w Polsce `pl`. Zbyt wąski region sprawi, że Twoje DM-y i potwierdzenia (ACK) nie wyjdą poza jego granice.

**Repeater / room serwer:**
```mccli
region default         # pokazuje obecny domyślny zakres
region default pl      # ustawia domyślny zakres i od razu go zapisuje
region default <null>  # czyści domyślny zakres
```

Obejmuje tylko pakiety tworzone przez samo urządzenie: adverty repeatera oraz adverty i posty room serwera. Odpowiedzi na żądania dostają zakres żądania, a jeśli nie da się go ustalić, wychodzą bez zakresu. Od aplikacji 1.49.0 ustawisz to też w zdalnym zarządzaniu repeaterem, na ekranie ustawień sieciowych.
