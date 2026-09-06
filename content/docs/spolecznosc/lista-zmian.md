---
title: Lista zmian meshcorepolska.org
description: Historia aktualizacji strony meshcorepolska.org, wersja po wersji - nowe funkcje, poprawki i zmiany w kodzie oraz treści.
canonical: /dokumentacja/spolecznosc/lista-zmian
createdAt: 2.08.2026
updatedAt: 6.09.2026
---

# Lista zmian na stronie meshcorepolska.org {toc: Lista zmian}
Poniżej znajdziesz listę zmian wprowadzanych na stronie meshcorepolska.org.  
Zmiany dla `mapa.meshcorepolska.org` znajdziesz osobno - pod ikoną `i` w prawym dolnym rogu tamtej strony, przycisk `Lista zmian`.

> [!NOTE]
> Jeśli po aktualizacji strona nie wyświetla się poprawnie, wykonaj twarde odświeżenie kombinacją `CTRL + F5`.

## v1.7.1
1. Dodano plik [llms.txt](https://meshcorepolska.org/llms.txt) z zasadami dla agentów AI oraz link „Instrukcje AI” w stopce strony. Większość agentów go i tak ignoruje ze względu na prompt injection, ale niech sobie będzie.
2. Zmieniono drugi przycisk w sekcji hero z „Serwer Discord” na „Oficjalna dokumentacja”, prowadzący do [docs.meshcorepolska.org](https://docs.meshcorepolska.org).
3. Dodano podpowiedzi (atrybut `title`) do linków w menu nawigacyjnym oraz przycisków w sekcji hero.
4. Zwiększono szerokość paska nawigacji, treści stron i stopki.
5. Zwiększono szerokość treści artykułów w Aktualnościach.
6. Dodano wpis [docs.meshcorepolska.org - spolszczona dokumentacja](https://meshcorepolska.org/aktualnosci/spolecznosc/docs-meshcorepolska-org) w Aktualnościach.

## v1.7.0
1. Dodano nową podstronę [Statystyki](https://meshcorepolska.org/statystyki) - codzienna historia sieci MeshCore w Polsce (łączna liczba urządzeń, repeaterów, room serwerów i companionów) w formie wykresu, z wyborem zakresu (30 dni, 90 dni, 180 dni, rok, wszystkie).
2. Dodano link do Statystyk w menu nawigacyjnym.
3. Dodano wpis [Modem KISS](https://meshcorepolska.org/aktualnosci/oprogramowanie/modem-kiss) w Aktualnościach.
4. Rozszerzono stronę [Nasze logo](https://meshcorepolska.org/dokumentacja/spolecznosc/nasze-logo) o komplet faviconek do pobrania.
5. Ujednolicono zapis „room serwer” i „room-peater” w dokumentacji i ciekawostkach.
6. Zaktualizowano zależności backendu do najnowszej wersji.
7. Różne drobne poprawki.

## v1.6.0
1. Dodano nową sekcję na stronie głównej.
2. Różne poprawki na stronie głównej.
3. Dodano losowe ciekawostki („Czy wiesz, że...?”) na dole `/dokumentacja` i `/aktualnosci`.
4. Dodano przycisk „Szybki start” w `/dokumentacja`, prowadzący do sekcji „Od zera do pierwszej wiadomości”.
5. Nagłówki sekcji na stronie głównej można teraz kliknąć, aby skopiować bezpośredni link do danej sekcji.
6. Dodano wpis [Aktualizacja aplikacji MeshCore 1.49.0](https://meshcorepolska.org/aktualnosci/lista-zmian/aktualizacja-aplikacji-meshcore-1-49-0) w Aktualnościach.
7. Poprawiono pod SEO nagłówki w Aktualnościach i Dokumentacji - H1 nie jest już duplikatem tytułu strony.
8. Dodano [Politykę prywatności](https://meshcorepolska.org/polityka-prywatnosci).
9. Dodano link Oficjalna dokumentacja w stopce strony.
10. Zaktualizowano komplet favicon i ikon PWA. Zmieniono logo w stopce na nowy wordmark MeshCore Polska.
11. Ikona Discorda w dokumentacji to teraz grafika wektorowa (SVG) zamiast PNG.
12. Zwiększono limity ochrony formularza kontaktowego i ogólnego ruchu przed nadużyciami.
13. Poprawiono spójność tła na stronie głównej.
14. Różne poprawki.

## v1.5.0
1. Dodano nową grupę [Schematy](https://meshcorepolska.org/dokumentacja/schematy) w dokumentacji.
2. Drobne poprawki w wyglądzie stron z dokumentacją.
3. Drobne poprawki w treści witryny.
4. Zaktualizowano zależności backendu do najnowszej wersji.
5. Inne poprawki i ulepszenia.

## v1.4.1
1. Dodano wpis „[MeshCore Firmware v1.17.0](https://meshcorepolska.org/aktualnosci/lista-zmian/aktualizacja-firmware-meshcore-1-17-0)” w Aktualnościach.
2. Dodano `sourceUrl` dla `content/news/oficjalne/**` - plakietka źródła przy wpisie prowadzi teraz do oryginału na blog.meshcore.io.
3. Poprawiono styl (hover) plakietki źródła na stronie wpisu aktualności.
4. ~~Wewnętrzne linki do Discorda prowadzą teraz bezpośrednio pod docelowy adres zaproszenia, zamiast przez przekierowujący `/discord` (poprawa SEO - mniej łańcuchów przekierowań).~~
5. Dodano brakujący atrybut `alt` dla obrazka w lightboxie.
6. Poprawiono długość ponad 20 meta opisów oraz 4 zbyt długich tytułów stron (Aktualności, Dokumentacja).

## v1.4.0
1. Dodano podstronę Aktualności (`/aktualnosci`) z newsami i changelogami MeshCore.
2. Dodano zabezpieczenie captcha (Cloudflare Turnstile) w formularzu kontaktowym (`/kontakt`).
3. Dodano nowe treści w dokumentacji.
4. Odświeżony wygląd strony - m.in. nowe efekty tła i kart.

## v1.3.0
1. Dodano podstronę Kontakt (`/kontakt`).
2. Rozbudowano dokumentację o nowe treści oraz dodano i poprawiono część obrazków.
3. Dodano sekcję `Sieć w liczbach` na stronie głównej.
4. Drobne poprawki treści, jakości strony i kodu.
