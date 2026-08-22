---
title: Ładowarka solarna CN3791 (MPPT) - schemat modułu
description: Schemat modułu ładowarki solarnej CN3791 (MPPT) - podłączenie panelu 6 V/9 V/12 V i akumulatora Li-ion/LiPo 3,7 V, typ złączy.
canonical: /dokumentacja/schematy/cn3791-mppt
createdAt: 21.08.2026
---

# Ładowarka solarna CN3791 (MPPT) - schemat modułu {toc: CN3791 MPPT}
Popularny, tani moduł ładowania z algorytmem MPPT (Maximum Power Point Tracking) - często stosowany w repeaterach zasilanych panelem słonecznym i akumulatorem Li-ion/LiPo 3,7 V (patrz [Role urządzeń](https://meshcorepolska.org/dokumentacja/meshcore/wprowadzenie#repeater-rpt)).

<div class="docs-schematic">
	<a href="/pliki/schematy/obrazy/cn3791-mppt-solar-charger.jpg" data-lightbox aria-label="Powiększ schemat podłączenia modułu CN3791 MPPT">
		<img src="/pliki/schematy/obrazy/cn3791-mppt-solar-charger.jpg" alt="Schemat podłączenia modułu ładowarki solarnej CN3791 MPPT" width="1483" height="1061">
	</a>
</div>

## Podłączenie
- Panel słoneczny (6 V / 9 V / 12 V): złącze `PH2.0-2P`, dwa równoległe wejścia solarne oznaczone `SOLAR IN`
- Akumulator Li-ion/Li-Po 3,7 V: złącze `PH2.0-2P`, wyjście `BAT` służy jednocześnie jako zasilanie dla podłączonego urządzenia

> [!CAUTION]
> Zawsze sprawdź polaryzację złączy przed podłączeniem - odwrotne podpięcie akumulatora może go trwale uszkodzić.
