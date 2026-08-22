---
title: Domyślny zakres regionu (Default Scope)
description: Domyślny zakres (default scope) obejmuje teraz też wiadomości prywatne, logowania i zapytania - nawet w sieciach blokujących ruch bez zakresu.
createdAt: 17.04.2026
updatedAt: 22.08.2026
sourceUrl: https://blog.meshcore.io/2026/04/20/default-scope
tags: [Oprogramowanie, Aplikacja]
---

# Default Scope obejmuje teraz wiadomości prywatne
![Domyślny zakres regionu](https://blog.meshcore.io/assets/images/2026/04/17/banner.png)

> [!NOTE]
> Jeśli nie znasz jeszcze koncepcji regionów/zakresów, zajrzyj do [poprzedniego wpisu na blogu](https://meshcorepolska.org/aktualnosci/oprogramowanie/filtrowanie-regionow).

Od wydania firmware v1.12.0 możliwe jest obejmowanie zakresem wiadomości _kanałów grupowych_, ale wciąż istnieje kilka przeszkód w efektywniejszym korzystaniu z regionów - zwłaszcza dla sieci mesh takich jak w Niemczech, które próbują **zablokować ruch bez ustawionego zakresu** (czyli `region denyf *`).

W kolejnym wydaniu (v1.15.0) pojawi się nowa koncepcja „domyślnego zakresu” (default scope), zarówno dla węzłów companion, jak i repeaterów/room serwerów. Umożliwi to obejmowanie zakresem wiadomości prywatnych (DM), żądań logowania, żądań statystyk itd. (nawet w sieci mesh, w której zablokowano ruch flood bez zakresu).

## Aplikacja mobilna
[Aplikacja MeshCore](https://meshcore.io/#download) w wersji 1.43.0 będzie miała nowe ustawienie na ekranie **Ustawień eksperymentalnych**. Tutaj można ustawić nazwę domyślnego regionu zakresu.

![Domyślny zakres w ustawieniach eksperymentalnych aplikacji](https://blog.meshcore.io/assets/images/2026/04/17/app-default-scope.jpg)

Gdy jest ustawiony, WSZYSTKIE pakiety flood wysyłane przez companiona (np. adverty, wiadomości DM/logowania/żądania, gdy trasa jest nieznana) będą **objęte zakresem** tego regionu.

Zakres kanału grupowego, jeśli jest ustawiony, _nadpisuje_ domyślny zakres. Możesz więc nadal mieć (zwykle mniejszy) region/zakres dla poszczególnych kanałów.

## Administracja repeaterem i room serwerem
Od wersji v1.15.0 pojawi się nowa komenda CLI:

`region default {name | <null>}`

Ustawia podany region jako domyślny zakres lub czyści go, jeśli podasz `<null>`. Region jest automatycznie tworzony, jeśli nie znajduje się jeszcze na liście regionów. Dodatkowo automatycznie wykonywane jest niejawne `region save`!

Domyślny zakres stosowany jest wyłącznie do pakietów, które _powstają_ na repeaterze/room serwerze. Czyli tylko adverty dla repeatera. Adverty oraz posty roomu dla room serwera.

### Logowania/żądania/komendy i odpowiedzi
Od wersji v1.15.0 obowiązuje nowa zasada dla _odpowiedzi_. Powstają one na repeaterze/room serwerze, ale rządzą się taką zasadą:
- Jeśli zakres żądania da się rozwiązać (czyli region znajduje się na jego liście), odpowiedź używa tego samego zakresu
- W przeciwnym razie odpowiedź wysyłana jest bez zakresu

Dotyczy to też przypadku, gdy żądanie bez zakresu skutkuje odpowiedzią bez zakresu.

Na razie jest to _bezpieczniejsza_ opcja, zamiast domyślnego ustawiania odpowiedzi na domyślny zakres. W tym okresie przejściowym jest zbyt wiele sposobów, na które administrator repeatera mógłby strzelić sobie w stopę i zablokować się poza własnym repeaterem!

### Dodatkowo: nowa wartość domyślna dla „put”
Komenda CLI `region put ...` teraz domyślnie ustawia nowy region na „allow” dla ruchu flood. Nie musisz więc już dodatkowo wywoływać `region allowf ...`.

## Urządzenia samodzielne
Dla urządzeń obsługiwanych przez interfejs Ripple, takich jak T-Deck, kolejne wydanie (v9.6) będzie obsługiwać domyślny zakres. Na ekranie **Regiony** wystarczy wybrać zwykły region (lub „*”), a na ekranie szczegółów wybrać odpowiednie menu.

![Ustawianie domyślnego zakresu w szczegółach regionu](https://blog.meshcore.io/assets/images/2026/04/17/region-details-default-scope.png)

(Jeśli to konieczne, utwórz nowy region z głównej listy regionów, na potrzeby domyślnego zakresu)

Wracając do ekranu listy Regiony, obok bieżącego regionu domyślnego zakresu powinieneś zobaczyć oznaczenie `(S)`.

![Oznaczenie (S) przy domyślnym regionie na liście](https://blog.meshcore.io/assets/images/2026/04/17/region-list-default.png)

## FAQ
**Pytanie: Jako administrator repeatera, na co powinienem ustawić domyślny zakres?**

Zwykle powinien to być _duży_ region, np. Twoje miasto - lub jakikolwiek region, do którego chcesz ograniczyć np. adverty.

**Pytanie: Jako użytkownik aplikacji/czatu, na co powinienem ustawić domyślny zakres?**

Powinien to być _duży_ region, który bezpiecznie obejmie zarówno Ciebie, jak i kontakt(y), z którymi chcesz prowadzić DM. Zarówno Twoje wiadomości, jak i zwracane potwierdzenia (ACK) będą objęte zakresem tego regionu.

**Pytanie: Zarządzam regionalnymi buildami firmware MeshCore z najlepszymi ustawieniami domyślnymi dla danego regionu. Czy mogę skonfigurować niestandardowy domyślny region w moich buildach?**

Tak. W odpowiednich plikach .ini wystarczy dodać do `build_flags`: `-D DEFAULT_FLOOD_SCOPE_NAME='" .. "'` (z nazwą w cudzysłowie).
