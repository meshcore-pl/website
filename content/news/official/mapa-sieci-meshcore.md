---
title: Mapa sieci MeshCore
description: Recrof, twórca mapy internetowej MeshCore, opisuje historię jej powstania oraz najważniejsze funkcje - filtrowanie węzłów, wskaźnik świeżości, kod QR kontaktu i możliwość osadzenia mapy przez iframe.
createdAt: 04.04.2026
sourceUrl: https://blog.meshcore.io/2026/04/04/meshcore-map
tags: [Mapa, Poradnik]
---

# Mapa sieci MeshCore

## Historia powstania
Gdy MeshCore wystartował na początku 2025 roku, wykrywalność węzłów była sporym problemem - i właśnie stąd narodził się pomysł na internetową mapę MeshCore.
Główną inspiracją była [Meshtastic Map](https://meshtastic.liamcottle.net) Liama Cottle'a.
Pierwsza wersja została wydana w kwietniu 2025 roku i zaczęły napływać pierwsze węzły z Wielkiej Brytanii, Australii i Słowacji.
Liczba węzłów rosła bardzo szybko - pierwszy tysiąc węzłów osiągnęliśmy w ciągu miesiąca, latem przekroczyliśmy próg 5000, w grudniu 10 tysięcy, a obecnie mamy 30 tysięcy węzłów na całym świecie.

![Mapa MeshCore w maju 2025](https://blog.meshcore.io/assets/images/2026/04/04/map-may-2025.png)
_Tak wyglądała mapa w maju 2025 roku_

## Podstawowe założenia
Mapa powstała głównie po to, by wskazywać węzły infrastruktury - dzięki niej dokładnie wiesz, gdzie znajdują się inne przemienniki i jakich ustawień radiowych używają.
Z czasem funkcjonalność rozszerzono o statystyki węzłów, wyszukiwanie, filtrowanie oraz podstawowe monitorowanie kondycji sieci mesh.

## Warte uwagi funkcje
Poza oczywistym przeglądaniem mapy i wyszukiwaniem węzłów, dostępny jest rozbudowany filtr, bardzo przydatny przy wyszukiwaniu konkretnych węzłów:
- **Szukaj tylko w aktualnym widoku mapy** - przydatne, gdy szukasz konkretnego węzła lub prefiksu klucza publicznego w swojej okolicy
- **Pokaż tylko duplikaty** - wyświetla wyłącznie nazwy, które pojawiają się na mapie więcej niż raz, przydatne przy porządkowaniu mapy

---
![Otwarte menu filtra mapy](https://blog.meshcore.io/assets/images/2026/04/04/map-filter.png)
_Menu filtra otwiera się po kliknięciu ikony filtra_

### Świeżość węzła
Węzły aktualizowane przez [MeshCore Map Auto Uploader](https://github.com/recrof/map.meshcore.io-uploader) są oznaczone kolorami, dzięki czemu wiesz, który przemiennik/room serwer/czujnik był ostatnio słyszany:

| Kolor | Status | Znaczenie |
|-------|--------|-----------|
| Zielony | aktywne | Zaktualizowany w ciągu ostatnich 5 dni |
| Żółty | nieaktualne | Zaktualizowany w ciągu ostatnich 10 dni |
| Czerwony | stare | Zaktualizowany w ciągu ostatnich 20 dni |
| Czarny | wygasające | Brak aktualizacji od ponad 20 dni - wkrótce zostanie usunięty |
| Brak koloru | dodane ręcznie | Dodane ręcznie, nie przez automatyczny upload |

![Świeżość węzłów na mapie](https://blog.meshcore.io/assets/images/2026/04/04/map-freshness.png)
_Świeżość węzłów na mapie_

### Menu kontekstowe współrzędnych
Kliknięcie na współrzędne w dymku węzła otwiera małe menu kontekstowe z szybkimi linkami do otwarcia lokalizacji w OpenStreetMap, Google Maps lub Mapy.com, a także opcją skopiowania współrzędnych do schowka.

### Poziom przybliżenia grupowania
Domyślnie pobliskie znaczniki są grupowane w klastry, by mapa pozostała czytelna. Suwak **Poziom przybliżenia grupowania** w menu filtrów kontroluje, przy jakim poziomie przybliżenia znaczniki przestają się grupować i są wyświetlane osobno. Jeśli przeglądasz gęsto zabudowany obszar i chcesz zobaczyć wszystkie węzły osobno bez przybliżania mapy do maksimum, przesunięcie suwaka na niższą wartość rozwinie klastry wcześniej.

### Kod QR
Każdy dymek węzła wyświetla kod QR kodujący adres `meshcore://contact/add` z nazwą węzła, kluczem publicznym i typem. Zeskanowanie go w aplikacji mobilnej MeshCore dodaje węzeł bezpośrednio jako kontakt - bez ręcznego kopiowania kluczy.

![Otwarty dymek węzła z kodem QR](https://blog.meshcore.io/assets/images/2026/04/04/map-open-popup.png)
_Dymek węzła z kodem QR i pełnymi szczegółami_

### Linki do udostępniania
Mapa zapamiętuje Twoją aktualną pozycję oraz otwarty węzeł. Adres URL aktualizuje się w miarę przemieszczania się po mapie, a po otwarciu dymku węzła przełącza się na format `?public_key=...`. Taki URL możesz udostępnić bezpośrednio - każdy, kto go otworzy, trafi prosto do tego węzła z otwartym dymkiem.

Możesz też użyć tego adresu URL na własnej, regionalnej stronie za pomocą `<iframe>`, oto przykład:
```html
<iframe src="https://map.meshcore.io/?lat=47.8721&amp;lon=12.5903&amp;zoom=8" style="width:100%;aspect-ratio:3/2" frameborder="0" scrolling="no"></iframe>
```

## Dodawanie/usuwanie węzłów

### Dodawanie siebie (radio companion)
1. Otwórz aplikację MeshCore
2. Dotknij ikony menu **⋮** w prawym górnym rogu
3. Dotknij **Internet Map**
4. Dotknij ponownie **⋮** i wybierz **Add me to the Map**

![Dodawanie siebie do mapy](https://blog.meshcore.io/assets/images/2026/04/04/map-add-self.png)
_Dodawanie siebie do mapy_

### Dodawanie przemiennika lub room serwera
1. Otwórz zakładkę **Kontakty** w aplikacji MeshCore
2. Dotknij **⋮** obok przemiennika lub room serwera, który chcesz dodać
3. Dotknij **Share**, a następnie **Upload to Internet Map**

![Dodawanie przemiennika do mapy](https://blog.meshcore.io/assets/images/2026/04/04/map-add-repeater.png)
_Dodawanie przemiennika do mapy_

### Usuwanie węzła
Usunięcie węzła jest możliwe wyłącznie tym samym radiem companion (tym samym kluczem publicznym), którym węzeł został dodany.

1. Otwórz aplikację MeshCore
2. Dotknij ikony menu **⋮** w prawym górnym rogu
3. Dotknij **Internet Map**
4. Znajdź węzeł, który chcesz usunąć, dotknij go i wybierz **Delete Marker**

## Poza interfejsem
[MeshCore Map Auto Uploader](https://github.com/recrof/map.meshcore.io-uploader) pozwala automatycznie dodawać i aktualizować wszystkie przemienniki, room serwery i czujniki w momencie, gdy rozgłaszają advert. To główny powód, dla którego świeżość węzła widać po kolorze jego ikony.
