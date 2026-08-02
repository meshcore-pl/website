---
title: Tryb dla dzieci i zdalna administracja
description: Firmware Ripple w wersji 7.11 wprowadza zdalną administrację urządzeniami T-Deck, T-Deck Pro, T-Watch S3 Plus i T-Pager, a wraz z nią pierwszą funkcję - tryb dla dzieci (Kid Mode), ograniczający ekran główny do wybranych kontaktów, tagi kontaktów oraz obsługę kanału grupowego.
createdAt: 02.10.2025
tags: [Oprogramowanie, Poradnik]
---

# Tryb dla dzieci i zdalna administracja
Najnowsze firmware (v7.11) dla T-Deck, T-Deck Pro, T-Watch S3 Plus i T-Pager ma teraz możliwość zdalnego administrowania, a pierwszą funkcją jest **tryb dla dzieci** (Kid Mode).

![Ekran główny w trybie dla dzieci](https://blog.meshcore.io/assets/images/2025/10/02/kidmodehome.png)

## Tryb dla dzieci
Gdy urządzenie zostanie przełączone w ten tryb, ekran główny zmienia się na system kafelków.
Możliwe są wtedy wyłącznie rozmowy prywatne (DM) z zapisanymi kontaktami.
Wszystkie pozostałe funkcje (ustawienia, odkrywanie, czat publiczny itd.) są zablokowane.
Dzięki temu urządzenie jest bardzo proste w obsłudze dla dziecka, a jednocześnie znacznie bezpieczniejsze, bo masz pewność, że rozmawia wyłącznie z zatwierdzonymi kontaktami.

## Zdalna administracja
W menu ekranu głównego na _urządzeniu dziecka_, w ekranie **Bezpieczeństwo**, pojawiło się nowe ustawienie.

![Ustawienie zdalnej administracji](https://blog.meshcore.io/assets/images/2025/10/02/remoteadminprefix.png)

Możesz tu ustawić prefiks wiadomości, którego urządzenie będzie nasłuchiwać (od dowolnego skonfigurowanego kontaktu).
Ustaw więc coś bardzo tajnego, czego **normalnie nie wpisujesz**.
Gdy wyślesz wiadomość do administrowanego urządzenia, zaczynającą się od tego prefiksu, reszta tekstu zostanie zinterpretowana jako _komenda administracyjna_.
Na przykład, jeśli ustawisz prefiks administratora na "#mum777", możesz włączać i wyłączać tryb dla dzieci w ten sposób:

```
#mum777 kid on
#mum777 kid off
```

Zobaczysz, że ekran główny administrowanego urządzenia zmieni się natychmiast.

I to w zasadzie wszystko. Prosto i przyjemnie.

## Nowość (v7.14+) - tagi
Możesz teraz dodawać własne tagi do kontaktów, dzięki czemu precyzyjniej wybierzesz, które kontakty pojawią się w 4 kafelkach.
Zrobisz to w nowym ekranie „Tagi kontaktów”.

![Ekran Tagi kontaktów](https://blog.meshcore.io/assets/images/2025/10/02/contacttagsedit.png)

Ustaw jeden tag jako „Rodzina” (zwykle), a następnie na dole wybierz ten tag jako dodatkowy filtr ekranu głównego (Extra Home filter).
Naciśnij ENTER, aby zapisać konfigurację.
Po skonfigurowaniu przejdź do ekranu szczegółów węzła dla wybranych kontaktów, a następnie wybierz menu „Tagi/Notatki...”.

![Ekran Tagi/Notatki dla kontaktu](https://blog.meshcore.io/assets/images/2025/10/02/contactnotes.png)

Tam możesz na przykład ustawić tag „Rodzina” na WŁ. i opcjonalnie dodać dowolną notatkę.
Następnie naciśnij ENTER, aby zapisać.
Ten kontakt zostanie wtedy uwzględniony przy budowaniu 4 kafelków trybu dla dzieci.
(UWAGA: użytych zostanie tylko pierwszych 4 kontaktów z tym tagiem)

## Nowość (v7.14+) - kanał grupowy
Jeśli skonfigurujesz mniej niż 4 kontakty, możesz teraz opcjonalnie dodać kanał grupowy, ale nie może to być kanał #1, który jest domyślnie traktowany jako kanał „Publiczny”.
Jeśli więc włączysz kanał #2 i nazwiesz go np. „Rodzina”, jeden z kafelków zostanie przeznaczony na ten kanał grupowy.

## Lista kontrolna
Przygotowując urządzenie dziecka do trybu dla dzieci, warto najpierw zrobić kilka rzeczy.
- (v7.13 lub starsze) - Najpierw dodaj do kontaktów maksymalnie **cztery** kontakty (z ekranu Odkrywanie). Tylko pierwsze cztery zostaną wyświetlone jako kafelki ekranu głównego
- (v7.13 lub starsze) - Wejdź w menu profilu sieciowego, wybierz kanał #1 (zwykle jest to kanał **Publiczny**), wybierz menu **Wyłącz**, a następnie naciśnij ENTER, aby zapisać. Czat publiczny powinien być WYŁĄCZONY
- Sprawdź, czy **strefa czasowa** jest ustawiona poprawnie
- Zalecane: wyłącz **znaczniki czasu** w menu ekranu głównego. Mogłyby rozpraszać dziecko
- **WAŻNE:** w profilu sieciowym wybierz **Uprawnienia**, a następnie ustaw opcję telemetrii na Base+GPS. Dzięki temu będziesz mógł uzyskać pozycję GPS urządzenia dziecka przez standardowy mechanizm telemetrii
- **WAŻNE:** w profilu sieciowym wybierz **Tożsamość**, a następnie wyłącz **Auto Advert**

## Plany na przyszłość
Zdalna administracja otwiera wiele możliwości. Kolejne komendy z pewnością pojawią się w najbliższej przyszłości, na przykład:
- zdalne włączanie i wyłączanie GPS (domyślnie WŁ., ale czasem warto zdalnie oszczędzić baterię)
- zdalne czyszczenie pamięci/zawartości urządzenia
