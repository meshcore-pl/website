---
title: Presety EU/UK Narrow - zalecana konfiguracja radia
description: Zalecany preset EU/UK Narrow dla sieci MeshCore w Polsce - ustawienia radia, interwały advertów, podwójne potwierdzenia i oznaczenia repeaterów off-grid.
canonical: /dokumentacja/meshcore/aktualne-presety
createdAt: 25.07.2026
updatedAt: 3.08.2026
---

# Presety i konfiguracja radia w sieci MeshCore {toc: Presety i konfiguracja}
Konfigurujesz swojego companiona albo stawiasz dopiero repeater? Trzymaj się presetu **EU/UK Narrow** - to on jest dziś przyjętym standardem ogólnopolskiej sieci.

> [!IMPORTANT]
> Niestety nie wszędzie tak jest. [MeshCore Południe](https://meshcoresouth.pl) - obejmujące Bielsko-Białą, Śląsk i Małopolskę - postawiło na własny preset (`SF6` zamiast `SF8`, reszta parametrów zgodna z EU/UK Narrow). Stawia na gęstość i szybszą wymianę pakietów w miastach kosztem zasięgu. To świadoma decyzja, nie chaos - ale niekompatybilność utrudnia spięcie się we wspólną, ogólnopolską infrastrukturę.
> Jeśli planujesz uruchomić własny repeater, postaw właśnie na `EU/UK Narrow`. Im więcej urządzeń na wspólnym presecie, tym silniejsza sieć dla wszystkich.

> [!NOTE]
> Jeśli zegar repeatera wyprzedza czas rzeczywisty, użyj `clkreboot`, a po restarcie zsynchronizuj go ponownie z poziomu aplikacji.

> [!TIP]
> Trzymasz na sieci bota? Nie stawiaj go na `Public` ani `#test`. Stwórz mu dedykowany kanał (np. `#botwarszawa`), żeby nie zaśmiecał głównych kanałów.

## Dokładne ustawienia

| Parametr                        | Wartość       |
|---------------------------------|---------------|
| Częstotliwość (frequency)       | `869,618 MHz` |
| Szerokość pasma (bandwidth, BW) | `62,5 kHz`    |
| Współczynnik rozpraszania (SF)  | `8`           |
| Współczynnik kodowania (CR)     | `8`           |

Zależy Ci na odrobinę większej prędkości transmisji? Zmień samo `CR` na `5`, reszta zostaje bez zmian.
Oba warianty są ze sobą kompatybilne - urządzenie na `CR8` bez problemu nawiąże kontakt z urządzeniem na `CR5` i odwrotnie.

## Oznaczenia repeaterów
Masz solidnego, w pełni off-gridowego repeatera (zasilanego z panelu słonecznego i akumulatora, postawionego na stałe)? Dopisz mu na końcu nazwy gwiazdkę lub emotkę słońca, np. `Mój Solarny Repeater ☀️`.
Dzięki temu każdy, kto zerknie na mapę, od razu zobaczy, ile urządzeń przetrwa lokalną awarię zasilania.

## Higiena sieci

### Rozgłoszenia (adverty)
Im gęściej obstawiona okolica, tym łatwiej zapchać sieć samymi advertami. Dlatego dla Warszawy zalecane są dłuższe odstępy niż dla reszty kraju:

| Obszar       | Advert 0-hop                          | Advert do wszystkich    |
|--------------|---------------------------------------|-------------------------|
| Warszawa     | wyłączone                             | nie mniej niż 12 godzin |
| Reszta kraju | nie mniej niż 3 godziny lub wyłączone | nie mniej niż 7 godzin  |

Czym są w ogóle adverty? Zobacz [Wprowadzenie > Podstawowe pojęcia](https://meshcorepolska.org/dokumentacja/meshcore/wprowadzenie#podstawowe-pojecia).

### Komendy CLI
Poniższe komendy (dla repeaterów, room serwerów i room-peaterów) pomagają utrzymać sieć w dobrej kondycji. Wymagane oprogramowanie: `1.14+`.

```mccli
set path.hash.mode 1          # dłuższe prefiksy (2 bajty) dla advertów - kosztem maks. 32 hopów flood (domyślnie 64)
set loop.detect minimal       # ograniczenie błądzenia pakietów w pętli
set advert.interval 0         # wyłącz interwał advertów 0-hop
set agc.reset.interval 480    # reset AGC co 8 min (480 s) - ogranicza dryft czułości
set dutycycle 10              # duty cycle 10% (firmware 1.15+)
```

Więcej o wielobajtowych skrótach trasy i wykrywaniu pętli przeczytasz we wpisie [Usprawnienia diagnostyki trasy](https://meshcorepolska.org/aktualnosci/oprogramowanie/usprawnienia-diagnostyki-trasy), o dutycycle w [Wprowadzenie > Legalność i duty cycle](https://meshcorepolska.org/dokumentacja/meshcore/wprowadzenie#legalnosc-i-duty-cycle), a o filtrowaniu ruchu między regionami w [Regionalizacja wiadomości](https://meshcorepolska.org/dokumentacja/meshcore/regionalizacja-wiadomosci).

#### Mniejsze miasta (np. Piła, Racibórz, Zamość)
```mccli
set multi.acks 1              # zwielokrotnione potwierdzenia
set flood.advert.interval 7   # interwał advertów do wszystkich
```

#### Duże miasta (np. Warszawa, Poznań, Łódź)
```mccli
set multi.acks 0              # wyłączone - zalecane w dużych sieciach (wartość domyślna)
set flood.advert.interval 12  # interwał advertów do wszystkich
```

### 2 repeatery obok siebie?
Jeśli masz 2 repeatery obok siebie (np. jeden na antenie kierunkowej, a drugi na dookólnej), zmień kilka ustawień, żeby ograniczyć kolizje pakietów.

`flood.advert.interval` ustaw zgodnie z sekcją wyżej (zależnie od wielkości miejscowości).
Każdemu kolejnemu repeaterowi w tej samej lokalizacji dodaj do tej wartości `1`, żeby ich adverty do wszystkich przypadkowo nie wystrzeliły w dokładnie tym samym momencie.

`txdelay` i `direct.txdelay` to nie stały czas oczekiwania, tylko górna granica losowego opóźnienia. Dopuszczalny zakres to **0-2**.
Ustawienie np. `2 sekund` nie oznacza, że repeater odpowie dopiero po `2 sekundach` - opóźnienie zostanie wylosowane gdzieś w tym zakresie.
Domyślnie to **0.5** (`txdelay`) i **0.2** (`direct.txdelay`).
Każdemu kolejnemu repeaterowi w tej samej lokalizacji ustaw wyraźnie wyższą wartość niż poprzedniemu (w granicach 0-2) - inaczej oba mogą wylosować zbliżone opóźnienie i zderzyć się ze sobą.

#### Repeater 1
```mccli
set flood.advert.interval 7
set txdelay 0.5           # domyślna górna granica
set direct.txdelay 0.2    # domyślna górna granica
```

#### Repeater 2
```mccli
set flood.advert.interval 8
set txdelay 1.5           # wyraźnie wyżej niż repeater 1, w granicach 0-2
set direct.txdelay 1      # wyraźnie wyżej niż repeater 1, w granicach 0-2
```
