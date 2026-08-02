---
title: Wszystko o antenach
description: Porównanie popularnych anten do modułów LoRa 868 MHz pod companiony, repeatery i Bluetooth - zysk, zasięg i przewody.
canonical: /dokumentacja/meshcore/anteny
createdAt: 13.07.2026
updatedAt: 1.08.2026
---

# Wszystko o antenach
Anteny, których używamy lub używaliśmy, a do tego dobór przewodu, kierunkowość i to, kiedy w ogóle sięgnąć po filtr. Polecamy anteny od GIZONT-a. Nie wierz w podany zysk.

> [!WARNING]
> Nigdy nie nadawaj bez podłączonej anteny!
> Puste gniazdo antenowe nie ma dokąd oddać energii z nadajnika, przez co wraca ona do układu i może uszkodzić wyjście radiowe, często nieodwracalnie.
> Zawsze upewniaj się, że antena i jej przewód są prawidłowo zainstalowane, zanim włączysz lub zresetujesz urządzenie.

## Rodzaj złącza
Przed zakupem anteny i przewodu upewnij się, że oba mają ten sam standard (np. `SMA`, `RP-SMA` lub `N`) oraz komplementarne typy: złącze `Male (męskie)` musi łączyć się z `Female (żeńskim)`.
Szczególnie uważaj na popularny w sprzęcie sieciowym standard `RP-SMA`, gdzie gwint wygląda identycznie jak w zwykłym `SMA`, ale styk środkowy jest odwrócony. `RP-SMA Male` ma w środku gniazdo, a `RP-SMA Female` ma wystający pin.
Przykładowo, jeśli antena posiada złącze `RP-SMA Female` (z pinem w środku), nie podłączysz do niej zwykłego `SMA Male` ani drugiego `RP-SMA Female` - potrzebujesz przewodu zakończonego złączem `RP-SMA Male`.

<div class="docs-img-row">
	<div class="docs-img-row__item">
		<a href="/images/photos/sma-female-i-sma-male_new.jpg" target="_blank" rel="noopener" data-lightbox aria-label="Powiększ zdjęcie złącza SMA Female i SMA Male">
			<img src="/images/photos/sma-female-i-sma-male_new.jpg" alt="Złącze SMA Female obok złącza SMA Male" width="760" height="380" class="docs-img-row__hero">
		</a>
	</div>
	<div class="docs-img-row__item">
		<a href="/images/photos/schemat-zlaczy-sma-i-rp-sma.jpg" target="_blank" rel="noopener" data-lightbox aria-label="Powiększ schemat złączy SMA i RP-SMA">
			<img src="/images/photos/schemat-zlaczy-sma-i-rp-sma.jpg" alt="Schemat złączy SMA i RP-SMA - gniazdo i wtyk" width="340" height="340">
		</a>
		<p class="docs-img-caption">Źródło: <a href="https://download.kamami.pl/p562285-connection-diagram.jpg" target="_blank" rel="noopener nofollow">kamami.pl</a></p>
	</div>
</div>

## Pod companiony
1. [AliExpress](https://pl.aliexpress.com/item/1005004607615001.html) `(zysk 10 dBi)` - znakomita pod companiona, da się na niej sporo kilometrów wykręcić. Pamiętaj, aby wybrać wersję 868 MHz.
2. [AliExpress](https://pl.aliexpress.com/item/1005007308749444.html) `(zysk 10 dBi)` - zwykle nie ma potrzeby kupowania opcji z kablem. Przeczytaj informacje na samym dole.
3. [AliExpress](https://pl.aliexpress.com/item/1005001386195377.html) `(zysk 3-5 dBi)` - mały kikucik. Jeśli jesteś bardzo blisko jakiegokolwiek RPT, a z companionem i tak nie wychodzisz na dwór, wersja 5 cm lub 11 cm będzie w sam raz.

## Pod węzły (RPT i RS)
1. [AliExpress](https://pl.aliexpress.com/item/1005007463706065.html) `(zysk 8 dBi)` - znakomita pod RPT, wykręciliśmy na niej ponad 10 km (companion w aucie, antena nr 1 z listy powyżej). Istnieje jeszcze [taka podobna](https://pl.aliexpress.com/item/1005006109449349.html), aczkolwiek nie mieliśmy jej w łapach. Bierz wersję 55 cm. Napisz do sprzedającego, że chcesz biały kolor. Pod żadnym pozorem nie bierz czarnej. Biała lepiej odbija promienie słoneczne i mniej się nagrzewa.
2. [Allegro](https://allegro.pl/oferta/antena-dipol-atk-10-800-980-mhz-12-8-dbi-lte900-do-licznikow-energii-7339950391) `(ATK-10, zysk 12,8 dBi)` - znakomita antena kierunkowa. Pamiętaj, że ATK-10 nadaje też trochę na boki. Istnieje również ATK-20, która ma większy zysk, ale za to jest jeszcze większa.
    - [Allegro](https://allegro.pl/oferta/przewod-antenowy-gsm-wlan-lte-50-om-tri-lan-240-1m-8383105296) - koncentryk, około 35-45 cm powinno wystarczyć.
    - [Allegro](https://allegro.pl/oferta/wtyk-n-zaciskany-na-przewod-rf-5-tri-lan-240-h-155-zloty-18298610874) - wtyk N na koncentryk.
3. [AliExpress](https://pl.aliexpress.com/item/1005005869328733.html) `(zysk 7 dBi)` - mniejsza antena kierunkowa, jeśli np. przeszkadza Ci wielkość ATK-10. Ona również nadaje trochę na boki, ale mniej niż ATK-10 - zdecydowanie mniej wydajna.

## Pod Bluetooth (BLE)
1. [AliExpress](https://pl.aliexpress.com/item/1005009684416243.html) - taka w zupełności wystarczy, można wybrać długość przewodu. Najlepiej przykleić ją od spodu puszki.
2. [AliExpress](https://pl.aliexpress.com/item/1005008294463974.html) - plastikowa, w większości przypadków powinna być OK.

## Kierunkowość anteny
Antena kierunkowa (np. Yagi) to nie wskaźnik laserowy.
Niektóre osoby mogą myśleć, że kierunkowość oznacza wąski snop jak z lasera, a w praktyce bardziej przypomina to światło z latarki - szeroki stożek, który z odległością się rozszerza.
Do tego antena promieniuje też trochę do tyłu.

### Co oznacza Yagi?
[Yagi](https://pl.wikipedia.org/wiki/Antena_Yagi) to typ anteny kierunkowej, opracowanej przez Hidetsugu Yagiego i Shintarō Udę z Uniwersytetu Tohoku w Sendai w Japonii.
Antena tego typu skupia sygnał w określonym kierunku, dzięki czemu zapewnia większy zasięg i lepszą jakość odbioru niż anteny dookólne.
Jest często stosowana w telewizji (DVB-T), GSM oraz radiokomunikacji.


## Przewód antenowy
Nigdy nie używaj przewodu `RF1.13` (one mają czarną izolację). Więcej strat w TX niż pożytku. Zalecamy `RG178`.
Jest jeszcze lepsza wersja, czyli `RG316`. Natomiast Chińczycy nie produkują jednak takich kabli ze złączem `RF-1`, bo nie jest to standard.
Jeśli napiszesz do sprzedawcy na AliExpress, powinien zrobić Ci taki kabel na zamówienie.
`RF1.13` może się sprawdzić głównie w companionach - zwykle w ciasnych, dobrze zoptymalizowanych obudowach, gdzie łatwiej poprowadzić tak cienki przewód.

<a href="/images/photos/rg178-i-rf1.13_new.jpg" target="_blank" rel="noopener" data-lightbox aria-label="Powiększ zdjęcie porównania kabla RG178 i 1.13 Cable">
	<img src="/images/photos/rg178-i-rf1.13_new.jpg" alt="Porównanie kabla RG178 i 1.13 Cable" width="600" class="docs-img--center">
</a>

> [!CAUTION]
> Pigtail RG316 nie będzie zbyt elastyczny. W niektórych przypadkach złącze `RF-1` może samo odpiąć się od płytki. W każdym razie i tak zalecamy `RG178` - w większości przypadków nie ma sensu kombinować. Mimo wszystko, jeśli wybierzesz ten lepszy, musisz być świadomy tego, co robisz.

## Filtry BPF
Używaj ich wyłącznie wtedy, gdy masz bardzo wysoki NF. Więcej informacji na ich temat znajdziesz [tutaj](https://meshcorepolska.org/dokumentacja/meshcore/noise-floor#noise-floor---czym-jest).
