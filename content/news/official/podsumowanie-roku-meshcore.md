---
title: Podsumowanie roku MeshCore
description: Scott Powell podsumowuje pierwszy rok MeshCore - od pierwszej wiadomości między Bobem a Alice, po kamienie milowe i ducha społeczności.
createdAt: 12.12.2025
sourceUrl: https://blog.meshcore.io/2025/12/12/the-year-in-review
tags: [Społeczność]
---

# Podsumowanie roku MeshCore
![Podsumowanie roku MeshCore](https://blog.meshcore.io/assets/images/2025/12/12/year_in_review.jpg)

Cóż, ale to był rok! MeshCore ma już niemal rok, więc pomyślałem, że to dobry moment, by spojrzeć wstecz na ten pierwszy, megaudany rok i przypomnieć sobie kamienie milowe, które udało nam się pokonać.

## Po prostu to zrób
Podczas sezonu świąteczno-noworocznego 2024/2025 postanowiłem się zaszyć, odłożyć telefon na bok (w przenośni) i zmusić się do napisania pierwszej wersji roboczej biblioteki MeshCore w C++.
Miałem zapiski na papierze z poprzednich miesięcy i wydawało mi się, że mam działający pomysł.
Nie wszystko było przemyślane do końca, ale zauważyłem, że samo próbowanie zakodowania pomysłu czasem odkrywa rozwiązanie (i/lub wady tego pomysłu).
Nie wiem, czy to zjawisko ma jakąś nazwę, ale zawsze znajdowałem w tym procesie odrobinę magii.
Ku mojemu zaskoczeniu, gdy pisałem pierwszy kod, bardzo wiele rzeczy po prostu się ułożyło.

## Bob i Alice
Pierwsze wiadomości MeshCore zostały wysłane między Bobem a Alice na początku stycznia.

![Pierwsza wiadomość między Bobem a Alice](https://blog.meshcore.io/assets/images/2025/12/12/bob_and_alice.png)

Były to dwie płytki Heltec V3 z uruchomioną aplikacją terminalową „Simple Secure Chat”, z dwoma otwartymi monitorami portu szeregowego.
Nie istniał jeszcze żaden kod do zarządzania kontaktami, więc Bob i Alice byli dwiema zaszytymi na sztywno tożsamościami z parami kluczy.

## Ten Brytyjczyk, Andy Kirby
W ciągu 2024 roku rozmawiałem od czasu do czasu z Andym o różnych tematach związanych z siecią mesh, napomykając o nowym systemie, który mógłby powstać.
Na szczęście Andy naprawdę rzucił się na możliwość testowania MeshCore i był pierwszym prawdziwym testerem w warunkach rzeczywistych.

![Andy Kirby, pierwszy tester MeshCore](https://blog.meshcore.io/assets/images/2025/12/12/andy_photos.jpg)

## Wspólnymi siłami
Andy opublikował kilka wczesnych filmów na YouTube, jeszcze gdy system dopiero raczkował, i zrobiły one niemałe wrażenie.
Dyskusje toczyły się na jego serwerze Discord, gdzie miał już sporą grupę entuzjastów sieci mesh dyskutujących o różnych sprawach, więc niemal od razu pojawiło się grono osób chętnych, by dać MeshCore szansę.

Nie pamiętam dokładnych dat, ale dość szybko wykrystalizował się rdzeń zespołu:
- Andy Kirby - pierwotny tester, promotor na YouTube, zaangażowanie w społeczność, brytyjska strona
- Rastislav Vysoky, który napisał pierwszego klienta webowego, mapę MeshCore, webflashera i niemal samodzielnie obsługiwał wsparcie techniczne
- Liam Cottle, który był już mocno zaangażowany w projekt Reticulum, dołączył i napisał jeszcze lepszego klienta webowego, po czym w ekspresowym tempie stworzył natywnego klienta mobilnego we Flutterze

Przez około sześć miesięcy to był cały rdzeń zespołu, dopóki Florent de Lamotte nie został poproszony o dołączenie po swojej niestrudzonej pracy nad integracjami mc-cli opartymi na Pythonie.

## Kamienie milowe
Jest oszałamiająca ilość rzeczy do przypomnienia, ale pomyślałem, że kilka ogólnych statystyk może być interesujących:
- Wydania na GitHubie: **23** (od v1.0.0 do v1.11.0)
- Commity w Gicie (bez mergów): **1453**
- Liczba obsługiwanych płytek: **60+**
- Kontrybutorzy repozytorium: **69**
  - Top 8: fdlamotte, recrof, oltaco, liamcottle, jquatier, jbrazio, 446564 (ded), cod3doomy
- Węzły przesłane do mapy MeshCore: **10 625** (stan na 11 grudnia)

Od czasu powstania [Lets Mesh Analyzer](https://analyzer.letsme.sh/stats) i węzłów obserwujących, mamy wgląd w rzeczywiste użycie sieci mesh MeshCore na całym świecie.
Kilka aktualnych statystyk:
- Unikalne pakiety dziennie: **~80 tys.**
- Unikalne aktywne węzły dziennie: **~4,5 tys.**
- Unikalne wiadomości publiczne dziennie: **~4,4 tys.**
- Łączny ruch dziennie w bajtach: **~52 miliony**

## Bolączki
W ciągu tego pierwszego roku pojawiło się kilka bolesnych problemów, które wymagały mnóstwa wysiłku, by je rozwiązać:
- Deaf-gate - tak nazwaliśmy tajemniczy nawyk przemienników do „głuchnięcia” w pozornie losowych momentach. Problem ten opierał się wyjaśnieniu przez wiele miesięcy. Ostatecznie okazało się, że to usterka AGC (automatycznej regulacji wzmocnienia), wymagająca wymuszonego resetu modułów LoRa. Nadanie tymczasowo usuwało problem, ale ponieważ MeshCore jest oszczędny w nadawaniu, czasem przemiennik pozostawał „głuchy” godzinami. Ostatecznym obejściem stała się komenda `set agc.reset.interval ...`
- Uszkodzenia pakietów - tylko w bardzo wczesnych miesiącach, gdy błędnie założyłem, że nie potrzebujemy sprzętowych sum CRC
- Rozłączenia iOS i BLE - odwieczny cierń w boku Liama przez cały ten rok
- Uszkodzenia Little-(F)FS - plaga dotykająca wszystkich użytkowników nRF52. Tajemnicze sytuacje niskiego poboru mocy, rozłączenia BLE i uszkodzone bloki LFS. Dzięki niesamowitej pracy Taco i systemowi ExtraFS problem ten został ograniczony (choć czasem wciąż daje o sobie znać)
- Usterki room serwera - zajęło zdecydowanie za długo, by zidentyfikować trzy naprawdę poważne błędy w firmware room serwera. To trochę smutne, bo mocno utrudniło to adopcję roomów, i wciąż trochę boli, bo ich użycie jest relatywnie rzadkie
- T1000e - przez większość roku był trapiony problemami: usterki LR11xx, głuchota, zawieszenia, uszkodzenia LFS itd. Na szczęście te problemy są już w dużej mierze rozwiązane
- CAD i kolizje pakietów - to zajęło kilka podejść, by zrobić to dobrze. Było chyba około 3 głównych implementacji CAD, które testowaliśmy, i (niespodzianka, niespodzianka) najprostsza okazała się najlepsza

## Oś czasu
Obraz wart jest tysiąca commitów. :-) Oto większość najważniejszych wydarzeń 2025 roku.

![Oś czasu wydarzeń MeshCore w 2025 roku](https://blog.meshcore.io/assets/images/2025/12/12/timeline.png)

Męczące jest samo patrzenie na to. Uff.
Marzec był naprawdę szalonym miesiącem - Liam i ja wypuszczaliśmy funkcje i aktualizacje w oszałamiającym tempie (przepraszamy, jeśli czegoś, nad czym pracowałeś/przyczyniłeś się, nie ma na tym wykresie - jego przygotowanie zajęło godziny przeglądania logów Gita i notatek wydań).

Nie mam pojęcia, jak będzie wyglądał 2026 rok! Będzie ciekawie porównać wykresy pod koniec przyszłego roku.

## Duch MeshCore
Coś, co naprawdę mnie wzrusza, to jak wiele osób podjęło wyzwanie w swoich okolicach - czy to szerząc informacje, czy faktycznie rozbudowując sieć, budując i wdrażając przemienniki.
W wielu kluczowych regionach spoczywało to czasem na barkach garstki osób, które wspinały się na góry, drzewa i wieże, by zbudować szkielet sieci.

W moim własnym stanie Victoria w Australii, w ciągu zaledwie ostatnich dwóch miesięcy nastąpił ogromny wzrost sieci mesh i teraz wiadomości docierają na setki kilometrów, obejmując około połowę stanu.
To w dużej mierze zasługa garstki odważnych dusz (np. @silentlightning), które znalazły kluczowe szczyty gór i połączyły to wszystko w całość.
Przyznaję, że nigdy nie spodziewałem się, że sieć mesh sięgnie dalej niż tylko metropolitalny Melbourne. Cieszę się, że się myliłem. :-)

Widać też bardzo pomysłowego ducha w przerabianiu niedrogiego sprzętu na domowe konstrukcje przemienników.
Jest mnóstwo przerobionych solarnych lamp powodziowych, które sprawdzają się zaskakująco dobrze, a tutaj w Melbourne krąży żart, że nie jesteś prawdziwym MeshCorowcem, dopóki nie masz masztu z tyczki basenowej z Bunnings.
Sprzedaż tyczek basenowych w tym roku poszybowała w górę.

![Domowe konstrukcje przemienników społeczności](https://blog.meshcore.io/assets/images/2025/12/12/montage2.png)

Więc wszystkim dobrym, wolnościowym ludziom tam na zewnątrz - chylę czoła. Dobra robota!

## Dalej...
W ciągu zaledwie roku udało nam się to osiągnąć.

![Mapa świata z węzłami MeshCore](https://blog.meshcore.io/assets/images/2025/12/12/worldmap.png)

Nie przestawajmy rozświetlać świata.

_z wyrazami szacunku, Scott Powell_
