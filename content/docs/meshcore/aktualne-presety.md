---
title: Presety i konfiguracja
description: Zalecany preset EU/UK Narrow dla ogólnopolskiej sieci MeshCore - dokładne ustawienia radia, interwały adwertów, podwójne potwierdzenia i oznaczenia repeaterów off-grid.
canonical: /dokumentacja/meshcore/aktualne-presety
createdAt: 25.07.2026
updatedAt: 1.08.2026
---

# Presety i konfiguracja
Konfigurujesz swojego companiona albo stawiasz dopiero repeater? Trzymaj się presetu **EU/UK Narrow** - to on jest dziś przyjętym standardem ogólnopolskiej sieci.

> [!IMPORTANT]
> Niestety nie wszędzie tak jest. <a href="https://meshcoresouth.pl" target="_blank" rel="noopener nofollow">MeshCore Południe</a> - obejmujące Bielsko-Białą, Śląsk i Małopolskę - postawiło na własny preset (`SF6` zamiast `SF8`, reszta parametrów zgodna z EU/UK Narrow), stawiając na gęstość i szybszą wymianę pakietów w miastach kosztem zasięgu. To świadoma decyzja, nie chaos, ale niekompatybilność utrudnia spięcie się we wspólną, ogólnopolską infrastrukturę.
> Jeśli planujesz uruchomić własny repeater, postaw właśnie na `EU/UK Narrow`. Im więcej urządzeń na wspólnym presecie, tym silniejsza sieć dla wszystkich.

## Dokładne ustawienia

| Parametr                        | Wartość       |
|---------------------------------|---------------|
| Częstotliwość (frequency)       | `869,618 MHz` |
| Szerokość pasma (bandwidth, BW) | `62,5 kHz`    |
| Współczynnik rozpraszania (SF)  | `8`           |
| Współczynnik kodowania (CR)     | `8`           |

Zależy Ci na odrobinę większej prędkości transmisji? Zmień samo `CR` na `5`, reszta zostaje bez zmian.
Oba warianty są ze sobą kompatybilne - urządzenie na `CR8` bez problemu nawiąże kontakt z urządzeniem na `CR5` i odwrotnie.

## Inne zalecane ustawienia (dla repeaterów i room serwerów)

### Rozgłoszenia (adverty)
Im gęściej obstawiona okolica, tym łatwiej zapchać sieć samymi advertami - dlatego dla Warszawy zalecane są dłuższe odstępy niż dla reszty kraju:

| Obszar       | Advert 0-hop                          | Advert do wszystkich   |
|--------------|---------------------------------------|------------------------|
| Warszawa     | nie mniej niż 4 godziny lub wyłączone | nie mniej niż 9 godzin |
| Reszta kraju | nie mniej niż 2 godziny lub wyłączone | nie mniej niż 6 godzin |

Czym są w ogóle adverty? Zobacz [Wprowadzenie > Podstawowe pojęcia](https://meshcorepolska.org/dokumentacja/meshcore/wprowadzenie#podstawowe-pojecia).

### Oznaczenia repeaterów
Masz solidnego, w pełni off-gridowego repeatera - zasilanego z panelu słonecznego i akumulatora, postawionego na stałe, a nie tymczasowo czy testowo? Dopisz mu na końcu nazwy gwiazdkę lub emotkę słońca, np. `Mój Solarny Repeater ☀️`.
Dzięki temu każdy, kto zerknie na mapę, od razu zobaczy, ile urządzeń przetrwa lokalną awarię zasilania.
