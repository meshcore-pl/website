---
title: Tryb off-grid (client repeat)
description: Firmware Ripple wprowadza tryb off-grid (client repeat) - urządzenia klienckie mogą pełnić funkcję przemiennika poza publiczną siecią mesh.
createdAt: 13.02.2026
sourceUrl: https://blog.meshcore.io/2026/02/13/off-grid-client-repeat-mode
tags: [Oprogramowanie]
---

# Tryb off-grid (client repeat)
Kolejna wersja firmware Ripple MeshCore będzie (wreszcie) obsługiwać tryb off-grid, znany też jako tryb „client repeat”.
Wiele osób o to prosiło, ale to coś, co trzeba było zrobić bardzo ostrożnie - to jeden z dużych błędów, jaki popełnił Meshtastic, i nie chcemy go powtórzyć.

![Tryb off-grid w MeshCore](https://blog.meshcore.io/assets/images/2026/02/13/offgridmode.jpg)

Jedną z wyraźnych cech MeshCore, i jednym z kluczy do jego skalowalności, jest to, że klienci _nie przekazują pakietów dalej_! Istnieje jednak kilka bardzo uzasadnionych przypadków użycia, w których urządzenia klienckie działające jednocześnie jako przemienniki mogłyby pomóc - jednym z nich jest sytuacja, gdy jesteśmy poza zasięgiem publicznych sieci mesh, na odludziu (czyli _off-grid_).

Aby te przypadki użycia pozostały wyraźnie odseparowane, wciąż trwają prace nad wypracowaniem konsensusu w sprawie zarezerwowania zakresu częstotliwości wyłącznie do użytku off-grid (czyli poza publiczną siecią mesh). Dzięki temu nikt przypadkiem nie zostawi włączonego radia i nie wróci do publicznej sieci mesh, mieszając w trasach.

> [!NOTE]
> Liam dodaje tę funkcję również do aplikacji mobilnej, więc będzie można używać w tym schemacie także radiowych companionów. Interfejs, jaki przygotuje, prawdopodobnie będzie się mocno różnił od tego, co powstało w Ripple.

## Jak to skonfigurować
Zdecydowałem się umieścić tryb off-grid w ramach nowej funkcji _regionów_.
W firmware rdzeniowym istnieje koncepcja „regionu domowego” (home region), która obecnie nie jest wykorzystywana, i pomyślałem, że to naturalne miejsce, by się w nią wpiąć.
Rozważałem też, że w przyszłości niektóre regiony mogłyby mieć własne, niestandardowe ustawienia radia LoRa, a nawet być oznaczone jako specjalny region ESP-NOW (na przykład).
Tak więc przełączenie „regionu domowego” może też przełączyć radio na inne ustawienia.

Na ekranie **Zarządzaj regionami** (Manage Regions), po wybraniu „Nowy...”, zostaniesz teraz zapytany o _typ regionu_.

![Wybór typu nowego regionu](https://blog.meshcore.io/assets/images/2026/02/13/newoffgridregion.png)

Regiony „zwykłe” to te obecnie używane z funkcją „Ustaw zakres”. Pozostałe dwa typy pozwalają teraz również zdefiniować niestandardowe ustawienia radia, ale typ „Off-grid” włącza tryb client repeat. Dodatkowo, typ Off-grid pozwala wybierać wyłącznie spośród kilku zarezerwowanych częstotliwości*, podczas gdy trzeci typ pozwala podać dowolną częstotliwość (ale _nie_ włącza trybu client repeat).

- Te częstotliwości są wciąż w trakcie ustalania/finalizowania

## Przełączanie regionu domowego
Na ekranie głównym, dotknięcie lewego górnego rogu od zawsze służyło do przełączania profili sieciowych (jeśli masz zdefiniowanych kilka profili).
Zostało to teraz rozszerzone, by wyświetlać również zdefiniowane regiony, pod danym profilem sieciowym.

![Przełączanie na region z ekranu głównego](https://blog.meshcore.io/assets/images/2026/02/13/switchtoregion.png)

Regiony, które mają też niestandardowe ustawienia radia, będą oznaczone symbolem **(*)**. Wystarczy wybrać region i to wszystko. Ustawienie regionu domowego zostaje zapisane, a radio przełącza się na niestandardowe ustawienia.

Aby wrócić do publicznej sieci mesh, wystarczy wybrać profil sieciowy (np. biały „MeshCore.915” wspomniany wyżej).

## Interfejs na T-Pager
Interfejs na T-Pager jest nieco inny ze względu na brak ekranu dotykowego.
Na liście Regiony, aktualny region domowy jest teraz wyświetlany na pomarańczowo.

![Lista regionów na T-Pager](https://blog.meshcore.io/assets/images/2026/02/13/tpagerregions.png)

Aby przełączyć region domowy, przewiń do niego i wybierz go, co przeniesie Cię do nowego ekranu szczegółów regionu.

![Ekran szczegółów regionu na T-Pager](https://blog.meshcore.io/assets/images/2026/02/13/tpagerregiondetails.png)

Następnie wybierz menu „**Ustaw jako domowy**” (Set as Home). Aby wrócić do publicznej sieci mesh, wybierz region-wieloznacznik (*), a następnie menu Ustaw jako domowy.

## Podsumowanie
Wybranie jednego ze „zwykłych” regionów jako domowego obecnie nie ma żadnego efektu, ale w przyszłości możliwe będą optymalizacje, jeśli urządzenie zna zarówno Twój aktualny region, jak i region odbiorcy. To jednak nie zostało jeszcze zdefiniowane.

Mamy nadzieję, że tryb off-grid pomoże MeshCore zyskać popularność w zastosowaniach takich jak poszukiwania i ratownictwo (Search And Rescue). Byłoby świetnie zobaczyć go w akcji w służbach ratowniczych.
