---
title: Regionalizacja wiadomości - filtrowanie kanałów w MeshCore
description: Jak działa regionalizacja wiadomości kanałowych w MeshCore (firmware 1.10+), konfiguracja CLI na repeaterze, ustawianie zakresu regionu w aplikacji oraz realny schemat regionów wdrożony w Polsce (pl, pl-<województwo>).
canonical: /dokumentacja/meshcore/regionalizacja-wiadomosci
createdAt: 03.08.2026
---

# Regionalizacja wiadomości - filtrowanie kanałów w MeshCore {toc: Regionalizacja wiadomości}

> [!IMPORTANT]
> Ten dokument jest obecnie w trakcie tworzenia.

Masz gęstą okolicę i czujesz, że `Public` zaczyna pękać w szwach od wiadomości z drugiego końca Polski (a przy sprzyjającej propagacji nawet Europy)?
Regionalizacja pozwala temu zaradzić - filtruje, które repeatery przekazują dalej wiadomości kanałowe, dzięki czemu sieć się odciąża, a chaos maleje. Wymagany firmware **1.10+**.

> [!NOTE]
> Zwykła regionalizacja obejmuje tylko wiadomości na kanałach - nie wiadomości prywatne ani adverty. Od firmware **1.15+** da się to rozszerzyć przez domyślny zakres, patrz [sekcja niżej](#domyslny-zakres).

## Jak to działa na repeaterze
- Brak dodanych regionów → repeater ignoruje regiony i przekazuje wszystko, niezależnie od ustawionego regionu wiadomości.
- Region ustawiony na `deny` → nie przekazuje wiadomości z tym regionem, ale nadal przekazuje te bez regionu.
- Region ustawiony na `allow` → przekazuje wiadomości z tym regionem (i nadal te bez regionu).

Domyślnie wiadomości bez przypisanego regionu (tzw. region null, `*`) zawsze przechodzą - administrator może to zmienić komendą `region denyf *`, ale obecnie nie jest to zalecane. Kanał `Public` powinien pozostać globalny (bez regionu).

Region to dowolna etykieta (kraj, województwo, miasto, dzielnica, grupa) - kluczowa jest spójność nazw między wszystkimi urządzeniami w danym obszarze. Wielkość liter ma znaczenie!
Jeden kanał to maksymalnie jeden region.

> [!IMPORTANT]
> Konfigurację zacznij od repeaterów - pominięcie jednego przerywa łańcuch przekazywania. Dopiero potem skonfiguruj companiona.

## Komendy dla repeaterów
```mccli
region                 # sprawdź konfigurację
region put miasto      # zdefiniuj nazwę regionu
region allowf miasto   # przekazuj ten region
region denyf zlemiasto # blokuj region (opcjonalnie)
region remove miasto   # usuń region
region save            # zapisz
reboot                 # uruchom ponownie płytkę
```

Trzy popularne typy konfiguracji (to tylko nazewnictwo używane przez społeczność - komendy są identyczne):
- **BACKBONE** (brzegowy, duży zasięg) - dodaj po kolei kilka głównych regionów (miast) jako `allowf`.
- **CITY** (miejski) - region miasta oraz regiony dzielnic, wszystkie jako `allowf`.
- **LOCAL** (lokalny, bez nadrzędnego obszaru) - jeden region jako `allowf`.

> [!NOTE]
> Od firmware **1.15+** nowo dodany region jest domyślnie `allow flood` (potwierdzenie „OK - (flood allowed)”) - `region allowf` nie zawsze jest już potrzebne.

Po każdej konfiguracji zsynchronizuj czas: `clock sync` (UTC +1h zimą / +2h latem). Jeśli zegar wyprzedza czas rzeczywisty: `clkreboot`, restart, a potem ponowna synchronizacja.

> [!TIP]
> Od aplikacji **1.39.0** zarządzanie regionami jest też dostępne bez CLI: **Ustawienia → Zarządzaj regionami**, z opcjami zezwolenia lub zablokowania regionu (odpowiedniki `region allowf`/`region denyf`) - zmiany trzeba zatwierdzić „ptaszkiem” na repeaterze.

## Przypisywanie regionu do kanału (w aplikacji) {toc: Przypisywanie regionu}
Ustawianie: **Kanały → wybrany kanał → 3 kropki na górze → Ustaw zakres regionu** → (jeśli region nie istnieje: „+”, podaj nazwę, zatwierdź) → wybierz region z listy.
Czyszczenie: **Kanały → kanał → Ustaw zakres regionu → 3 kropki na górze → Wyczyść zakres**.

Wiadomość globalna (bez regionu) nie jest filtrowana przez `allowf`/`denyf` i dotrze do wszystkich w zasięgu. Regionalizacja to tylko etykietowanie, **nie** szyfrowanie.

> [!TIP]
> Od wersji **1.39.0** dostępna jest opcja **Wykryj regiony** - odpytuje najbliższe repeatery (0 hop) o dostępne, zezwolone regiony. Możesz je dodać z listy.

## Schemat regionów wdrożony w Polsce {toc: Schemat regionów}
Społeczność przyjęła dwupoziomową hierarchię regionów opartą o krótkie kody.

| Poziom     | Region     | Kanał     | Opis                                                         |
|------------|------------|-----------|--------------------------------------------------------------|
| Krajowy    | `pl`       | `#polska` | Najwyższy poziom, wspólny dla całego kraju.                  |
| Wojewódzki | `pl-<kod>` | `#<kod>`  | Podpięty pod region krajowy, osobny dla każdego województwa. |

### Kody województw
2-literowe, zgodne ze standardowymi skrótami województw:

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

Duże miasta i aglomeracje o dużym zagęszczeniu urządzeń dostają dodatkowo własny, osobny region (bardziej lokalny niż wojewódzki, żeby odciążyć ruch w centrum) - np. Toruń/Grudziądz i okolice, Bydgoszcz, Częstochowa, Łódź, Olsztyn, Poznań/Gniezno, Trójmiasto, Warszawa.
Każdy działa jako oddzielny region z własnym kodem, analogicznie do wzorca: `pl-<kod miasta>` (region), `#<kod miasta>` (kanał).

### Przykładowa pełna konfiguracja (woj. zachodniopomorskie) {toc: Przykładowa konfiguracja}
Region krajowy i wojewódzki naraz:
```mccli
region put pl
region allowf pl
region put pl-zp
region allowf pl-zp
region save
reboot
clock sync
```

**W aplikacji:** dodaj kanały `#polska` i `#zp` (Dodaj kanał → Dołącz do kanału hashtagowego), a następnie w każdym z nich ustaw zakres regionu odpowiednio na `pl` (dla `#polska`) i `pl-zp` (dla `#zp`).

## Domyślny zakres {toc: Domyślny zakres}
Od firmware **1.15+** możesz rozszerzyć regionalizację poza kanały - na wiadomości prywatne (DM), żądania logowania i żądania statystyk, nawet w sieci, która blokuje ruch bez ustawionego zakresu.

**Na repeaterze/room serwerze:**
```mccli
region default nazwa   # ustaw domyślny zakres (tworzy region, jeśli trzeba, i zapisuje automatycznie)
region default <null>  # wyczyść domyślny zakres
```
Obejmuje wyłącznie pakiety powstające na tym urządzeniu - adverty dla repeatera, adverty i posty dla room serwera. Odpowiedzi na żądania dziedziczą zakres żądania, jeśli da się go rozwiązać, w przeciwnym razie wychodzą bez zakresu - to bezpieczniejsza opcja na czas przejściowy.

**W aplikacji (companion):** od wersji **1.43.0** - Ustawienia eksperymentalne → nazwa domyślnego regionu zakresu. Obejmuje wtedy wszystkie pakiety flood wysyłane przez companiona (adverty, DM-y, żądania) o nieznanej trasie. Zakres pojedynczego kanału, jeśli ustawiony, nadpisuje domyślny zakres.
