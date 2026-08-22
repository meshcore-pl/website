---
title: Filozofia projektu MeshCore
description: Scott Powell tłumaczy zasady, które stały u podstaw MeshCore - otwartość, decentralizację, oszczędność zasobów oraz sprawiedliwe wynagradzanie deweloperów.
createdAt: 1.03.2025
updatedAt: 22.08.2026
sourceUrl: https://blog.meshcore.io/2025/03/01/meshcore-philosophy
tags: [Społeczność]
---

# Otwartość i decentralizacja w rdzeniu MeshCore
![Filozofia projektu MeshCore](https://blog.meshcore.io/assets/images/2025/03/01/techphilosophybyGrok.jpg)

Szybki rozwój i wzrost popularności MeshCore naprawdę cieszy i mam nadzieję, że będzie kontynuowany.
Istnieje jednak ryzyko fragmentacji i rozłamów, jeśli niektóre z zasad stojących za projektem zostaną zagubione lub zignorowane.
Dlatego przygotowałem podsumowanie tego, co doprowadziło do obecnego kształtu projektu, oraz tego, dokąd - mam nadzieję - zmierza.

## Tło
Większość z Was zna już istniejące systemy mesh i frustracje, które są z nimi powszechnie związane.
Moim głównym problemem było pragnienie otwartego ekosystemu, z otwartym protokołem, w którym pojedyncze osoby mogłyby rozwijać własne komponenty (czy to oprogramowanie, sprzęt, dodatki itd.) przy maksymalnej interoperacyjności.
To po prostu nie było możliwe.

W tym kontekście warto wspomnieć też o Reticulum. Jest znacznie bardziej ambitny niż MeshCore i potrafi znacznie więcej, ale cierpi na kilka problemów, takich jak to, że jest niemal w całości oparty na Pythonie i nie został zaprojektowany z myślą o mikrokontrolerach.
Owszem, obsługuje je poprzez rozwiązania takie jak firmware RNode, ale wciąż jest znacznie „cięższy” niż MeshCore.

## Jak MeshCore odpowiada na te problemy?
Mając na uwadze te ograniczenia, zabrałem się za projektowanie czegoś nowego. Oto zasady, które się wyłoniły:
- Lekkość. Działa na bardzo skromnym sprzęcie
- Projekt zorientowany na LoRa, ale nieograniczony wyłącznie do LoRa (dowolne radio pakietowe) - czyli oszczędne rozmiary pakietów i bardzo zachowawcze podejście do czasu nadawania
- Przenośna, rdzeniowa biblioteka w C++, nieograniczona do Arduino. Rozszerzalna. Wiele środowisk wykonawczych
- Prywatność jako zasada fundamentalna (brak obowiązkowego ujawniania tożsamości, domyślne szyfrowanie)
- Decentralizacja. Brak jednego, centralnego organu administracyjnego czy korporacji ustalającej zasady i uprawnienia
- Niemonolityczny firmware. Firmware'y są specyficzne dla danej roli - robią jedną konkretną rzecz, nie więcej i nie mniej
- Ewoluujący, rozszerzalny protokół, z wiadomościami jako elementem rdzeniowym, interoperacyjny z możliwie największą liczbą firmware'ów. Elastyczny wobec zastosowań takich jak sieci czujników, a nawet w pełni prywatnych systemów z własnymi protokołami zbudowanymi na bazie protokołu rdzeniowego

## Podział pracy, praw i odpowiedzialności
Podobnie jak Reticulum, MeshCore jednoznacznie przenosi odpowiedzialność za trasowanie pakietów wyłącznie na przemienniki.
Węzły brzegowe, takie jak klienci czatu czy węzły czujnikowe, nie zaśmiecają eteru.
Przemienniki zwykle montowane są w dobrych, wyniesionych lokalizacjach i mają stałą pozycję.
Węzły brzegowe mogą się przemieszczać (rozszerzenia protokołu wspomagające i optymalizujące mobilne węzły są wciąż w fazie rozwoju).

Skoro to przemienniki wykonują „pracę” sieci mesh, administrator przemiennika ma prawo odrzucać lub zezwalać na dowolny ruch.
Może to być nieco kontrowersyjne albo postrzegane jako furtka do dyskryminacji ze strony administratorów przemienników, jednak prywatność wbudowana w protokół rdzeniowy celowo utrudnia takie działania.
Obecnie standardowy firmware przemiennika nie nakłada żadnych ograniczeń, ale może powstać wiele różnych firmware'ów przemienników - część z nich z rozszerzoną kontrolą administracyjną, np. ograniczaniem liczby żądań (rate-limiting), niestandardowym priorytetyzowaniem (lub karaniem) określonych typów pakietów czy obserwowanych wzorców użycia.

Uważam, że bardziej organiczna strategia eliminowania złych węzłów jest lepszym podejściem niż odgórnie narzucane zasady.
Dzięki większej liczbie opcji i wyborowi firmware'u poszczególne obszary czy sieci mesh same znajdą swoje rozwiązania problemów takich jak nasycenie kanału.
Mało prawdopodobne jest jedno rozwiązanie pasujące do każdej sieci mesh, w każdej jurysdykcji (choć dobre, rozsądne ustawienia domyślne bardzo pomagają ograniczyć chaos).

## Trasy
Ogólna strategia brzmi: „trasy bezpośrednie, kiedy to możliwe, flood jako rozwiązanie zapasowe”.
Każdy pakiet wysyłany jest albo w trybie flood, albo w trybie bezpośrednim (direct).
Aby pozostać oszczędnym, odkrywanie trasy „podpina się” pod zwykłe pakiety, takie jak wiadomości.
Gdy A nie ma trasy do B, wysłanie wiadomości odbywa się w trybie flood, a jeśli B zostanie znalezione, otrzymuje ono wiadomość razem z trasą w jednym pakiecie.
W kontekście wiadomości, potwierdzenie (Ack) razem z trasą są następnie zwracane do A.

Trasy są asymetryczne. B również musi odkryć trasę do A, a przykład z potwierdzeniem (Ack) również realizuje dwa zadania naraz: zwracając Ack razem z trasą wyjściową, sprawia, że A otrzymuje Ack, trasę wyjściową oraz trasę powrotną.
Jedynym narzutem pakietowym w tej wymianie jest trzeci, wyłącznie bezpośredni pakiet, który odsyła trasę powrotną z powrotem do B.
Po tej sekwencji zarówno A, jak i B przechowują bezpośrednie trasy (do drugiej strony) w swojej pamięci.

Efektem ubocznym tego jest to, że nadawcy mogą przechowywać trasy i samodzielnie wybierać, której użyć.
Aplikacja Liama idzie o krok dalej i pozwala ręcznie skonstruować trasę samodzielnie.
Jeśli jesteś administratorem zestawu przemienników i znasz optymalną trasę, może to być korzystne i skutkować mniejszą liczbą floodów.

## Flood stanie się „kosztowny”
Przyszłe skalowanie MeshCore wciąż pozostaje dużym znakiem zapytania.
Jestem ostrożnie optymistyczny co do jego wzrostu, ale myślę, że można bezpiecznie założyć, iż tryb flood stanie się tym, co nazywam „kosztownym”.
Najbardziej podstawową formą tego kosztu będzie czas - dotarcie floodu do celu będzie po prostu trwało dłużej (to zresztą już obecne zachowanie - firmware przemiennika nadaje coraz niższy priorytet pakietom flood pochodzącym od odległych nadawców).
Dla większości użytkowników i przypadków użycia to wystarczy, by zacząć szukać lepszych opcji.

Jedną z takich opcji jest korzystanie z relatywnie lokalnego room serwera.
Są one przeznaczone dla silnie lokalnych grup, jako proste tablice ogłoszeń (nie, nie są przeznaczone do skalowania na całą sieć mesh!).
Zwykle jednak starają się wymuszać ruch w trybie bezpośrednim, dzięki czemu ruch pozostaje lokalny.

## Nagroda i motywacja
Uważam też, że fundamentalnym prawem dewelopera jest otrzymywanie finansowej nagrody za swoją pracę.
Mgliste obietnice „nagradzania kontrybutorów” ze strony jakiejś nieprzejrzystej struktury korporacyjnej to, moim zdaniem, bzdura.
Dlatego zdecydowanie polecam model „Freemium”. To bezpośrednia nagroda dla osoby, która włożyła pracę.
Oznacza to również, że rozwój jest znacznie bardziej zrównoważony, a dopracowane doświadczenie użytkownika staje się normą - zamiast tygodniami błąkać się w piekle forów.

Wspaniała praca [Liama Cottle'a](https://liamcottle.com/) nad natywną aplikacją na Androida i iOS jest tego świetnym przykładem.
Włożył w to mnóstwo pracy, która naprawdę zasługuje na nagrodę.
Poza tym, w porównaniu do alternatywy - piekła forów i zmagań z nieznaną konfiguracją i narzędziami - czy kilka dolarów to nie jest cena warta uwolnienia się od tego? :-)

Bezpośrednia pochwała i wsparcie finansowe od osób korzystających z Twoich produktów są bardzo satysfakcjonujące.
To jednak niełatwa droga! Utrzymanie się z czegoś takiego jest wyjątkowo trudne.

Istnieje też potencjał na partnerstwa z producentami sprzętu. To jednak dużo bardziej skomplikowany temat.
Praca nad konsumenckimi zestawami, wysoko zoptymalizowanymi lub dopracowanymi pod konkretny sprzęt, może być korzystna, a jeśli faktycznie powstaną, to do uczestników będzie należało wypracowanie sprawiedliwego podziału zysków.
Wszystko, co skierowane jest do zwykłego konsumenta, jest wyjątkowo trudne - wymaga mnóstwo testów i dopracowania, by trafić na rynek.
Mam nadzieję, że produkty konsumenckie kompatybilne z MeshCore w końcu powstaną, ale będzie to trudna droga.

## Plany na przyszłość
Podsumowując, kilka uwag na temat przyszłych kierunków:
- Interakcja administratora przemiennika i room serwera trafi do aplikacji Liama
- Więcej narzędzi diagnostycznych dla planujących sieć, takich jak pakiety Trace z SNR
- Ogólne poszerzanie obsługi urządzeń: prace nad dopracowaniem wsparcia dla T1000e, więcej ról dla T1114 itd.
- Prace nad standaryzacją telemetrii danych z czujników
