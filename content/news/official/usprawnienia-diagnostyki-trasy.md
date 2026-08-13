---
title: Usprawnienia diagnostyki trasy
description: Firmware v1.14.0 wprowadza wielobajtowe skróty trasy i wykrywanie pętli (loop detection), zwiększając precyzję diagnostyki tras w MeshCore.
createdAt: 6.03.2026
sourceUrl: https://blog.meshcore.io/2026/03/06/path-diagnostics-improvements
tags: [Oprogramowanie]
---

# Usprawnienia diagnostyki trasy
Wraz z wydaniem firmware v1.14.0 pojawia się obsługa tzw. „wielobajtowych skrótów trasy” (multibyte path hashes).
Jednobajtowe prefiksy w trasach, oraz nieuniknione duplikaty, jakie występują w praktyce, od wielu miesięcy były źródłem frustracji, więc to wydanie powinno wielu osobom przynieść ulgę.

![Graf sieci mesh](https://blog.meshcore.io/assets/images/2026/03/06/meshgraph.png)

## Co to jest i jak działa?
Węzły źródłowe/nadawcze mogą teraz określić, czy pakiet flood powinien używać 1, 2 czy 3-bajtowych skrótów trasy (czyli prefiksów klucza publicznego).
Przemienniki na wersji v1.14.0 lub nowszej dopiszą wtedy własny identyfikator/skrót o podanym rozmiarze przed przekazaniem pakietu dalej. Ten schemat jest więc w pełni wstecznie kompatybilny - węzły źródłowe wciąż mogą wysyłać pakiety z 1-bajtowym skrótem trasy, które będą propagować się tak jak dotychczas.

Gdy węzeł otrzyma trasę i użyje jej w trybie bezpośrednim, cała trasa może być zakodowana w 1, 2 lub 3 bajtach.
Każdy węzeł nadający może obsługiwać mieszankę kontaktów/innych węzłów, gdzie trasy do każdego z nich są zakodowane w dowolny z powyższych sposobów. Obsługiwane jest więc stopniowe przechodzenie na te kodowania.

Zajmie to jednak trochę czasu, zanim wystarczająca liczba przemienników zaktualizuje się do v1.14.0. Jeśli starszy przemiennik odbierze pakiet ze skrótem trasy o rozmiarze 2 lub 3, po prostu go odrzuci.

## Zmiany w interfejsie Ripple
Główna zmiana pojawia się na ekranie **Optymalizuj** (Optimise).

![Ekran Optymalizuj w Ripple](https://blog.meshcore.io/assets/images/2026/03/06/newoptimise.png)

Domyślnie nowe ustawienie **Rozmiar skrótu trasy** (Path hash size) wynosi **1**. To ustawienie odziedziczone. Możesz ustawić je na 1, 2 lub 3. Każdy pakiet w trybie flood wysyłany przez Twoje urządzenie (np. adverty, wiadomości, żądania telemetrii itd.) będzie używał tego trybu/rozmiaru. Jeśli węzeł docelowy zostanie skutecznie osiągnięty i trasa zostanie zwrócona, użyje ona tego kodowania trasy, które zostanie zapisane do późniejszego użytku w trybie bezpośrednim.

Wchodząc na ekrany **Szczegóły wiadomości**, na przykład z czatów grupowych, szczegóły trasy wiadomości pokażą przeskoki trasy z większą precyzją (czyli _szerszymi_) skrótami trasy, dzięki czemu nazwy węzłów, na które się one rozwiązują, będą znacznie dokładniejsze.

Podobnie na ekranach **Szczegóły węzła** (z **Odkrywania**). Ekran szczegółów trasy advertu będzie miał dokładniejszy podział trasy/przeskoków.

Również mapa na ekranie głównym będzie pokazywać wektory tras z większą dokładnością.

> [!NOTE]
> Te zmiany pojawią się w wydaniu **v9.2**, które ukaże się w ciągu najbliższej doby.

## Zmiany w aplikacji na Androida/iOS
Liam [wydał wersję 1.41.0](https://meshcore.nz), która obsługuje już wielobajtowe skróty trasy.
Na razie globalne ustawienie znajduje się w **Ustawieniach eksperymentalnych**. Gdy więcej (lub większość) przemienników zacznie to obsługiwać, ustawienie zostanie przeniesione do głównego ekranu Ustawień.

![Ustawienie rozmiaru skrótu trasy w aplikacji](https://blog.meshcore.io/assets/images/2026/03/06/Screenshot_20260306_173818_MeshCore.png)

Możesz też ustawić tryb/rozmiar skrótu trasy _dla poszczególnych kontaktów_ podczas ręcznego ustawiania tras.

![Rozmiar skrótu trasy dla pojedynczego kontaktu](https://blog.meshcore.io/assets/images/2026/03/06/Screenshot_20260306_at_3.32.00pm.png)

Wszędzie tam, gdzie wyświetlana jest trasa, uwzględniany jest też rozmiar skrótu - np. w **RxLog**.

![Rozmiar skrótu trasy widoczny w RxLog](https://blog.meshcore.io/assets/images/2026/03/06/Screenshot_20260224_at_2.29.53_AM.png)

## Zmiany CLI dla przemiennika/room serwera/czujnika
Przemienniki zasadniczo tylko przekazują pakiet w trybie, w jakim dotarł, ale jest kilka sytuacji, w których przemiennik, room serwer lub czujnik może być węzłem _źródłowym_. Dla tych przypadków pojawia się nowe ustawienie, konfigurowane komendą CLI:

```
set path.hash.mode {0,1,2}
```

> [!NOTE]
> „Mode” to niskopoziomowe kodowanie (0..3), gdzie 0 -> 1 bajt (odziedziczone), 1 -> 2 bajty, 2 -> 3 bajty. **Tryb 3 jest obecnie zarezerwowany** na przyszłość. Niekoniecznie będzie to 4-bajtowe kodowanie trasy - 3 bajty powinny w zupełności wystarczyć, a „tryb 3” może okazać się czymś zupełnie nowym/innym (jeszcze niesprecyzowanym).

Dla przemienników, room serwerów i czujników, adverty w trybie flood będą używać tego ustawienia.

Dla room serwerów to ustawienie jest też używane, gdy room wysyła nowe/niezsynchronizowane wiadomości.

Dla węzłów czujnikowych to ustawienie jest też używane przy wysyłaniu wiadomości alarmowych do zarejestrowanych węzłów na liście ACL.

## Dodatkowo: wykrywanie pętli
Wraz z wydaniem firmware przemiennika v1.14.0 pojawia się też nowa funkcja _wykrywania pętli_ (loop detection). Z poziomu CLI można teraz odczytać/ustawić nowe ustawienie **loop.detect**. Może przyjmować jedną z wartości: **off, minimal, moderate** lub **strict**.

Domyślnie jest to **off**.

Gdy funkcja jest włączona, przemienniki będą teraz odrzucać pakiety flood, które wyglądają, jakby krążyły w pętli. Ostatnio zdarzało się to w niektórych sieciach mesh, gdy w sieci znajdował się choćby jeden „zepsuty” firmware przemiennika (prawdopodobnie jakiś fork lub niestandardowy firmware). Jeśli ładunek pakietu zostanie zmodyfikowany, a następnie przekazany dalej, ten sam pakiet może wywołać burzę pakietów, powtarzaną aż do maksymalnie 64 przeskoków.

Wykrywanie pętli powinno skutecznie temu przeciwdziałać.

Nowa logika wykrywania pętli wykorzystuje ustawienie (min, mod, strict) w połączeniu z rozmiarem skrótu trasy oraz tabelą przeglądową, by określić _maksymalną_ liczbę duplikatów identyfikatora/skrótu dozwoloną, zanim pakiet zostanie odrzucony.

![Tabela wykrywania pętli](https://blog.meshcore.io/assets/images/2026/03/06/loopdetect.png)

Tak więc jeśli ustawienie to loop.detect **minimal**, a odebrany zostanie pakiet z 1-bajtowym rozmiarem trasy, przemiennik sprawdzi, czy jego własny identyfikator/skrót już znajduje się w trasie. Jeśli jest już zakodowany **4** razy, pakiet zostanie odrzucony. Jeśli pakiet używa 2-bajtowego rozmiaru trasy, a identyfikator/skrót przemiennika jest już zakodowany **2** razy, pakiet zostaje odrzucony.

Ta nowa funkcja może więc być potencjalnie używana _zanim_ obsługa wielobajtowych skrótów trasy zyska szerokie wsparcie (czyli przy ustawieniu „minimal” może odrzucać pętle 1-bajtowe).
