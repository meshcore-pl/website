---
title: Seeed XIAO nRF52840 - pinout
description: Pinout płytki Seeed Studio XIAO nRF52840 - piny GPIO/ADC/SPI/I2C od strony górnej oraz układ zarządzania baterią (BAT+/BAT-, SWD) od spodu.
canonical: /dokumentacja/schematy/xiao-nrf52840
createdAt: 21.08.2026
updatedAt: 22.08.2026
---

# Pinout i zarządzanie baterią na XIAO nRF52840 {toc: XIAO nRF52840}
Miniaturowa płytka z MCU `nRF52840` (BLE) od Seeed Studio, wykorzystywana w niewielkich, autorskich konstrukcjach.

<div class="docs-schematic-row">
	<div class="docs-schematic docs-schematic--transparent">
		<a href="/pliki/schematy/obrazy/xiao-nrf52840-pinout-przod.png" data-lightbox aria-label="Powiększ pinout XIAO nRF52840 od góry">
			<img src="/pliki/schematy/obrazy/xiao-nrf52840-pinout-przod.png" alt="Pinout płytki XIAO nRF52840 od góry" width="1942" height="1030" data-transparent>
		</a>
		<p class="docs-img-caption">Widok od góry - GPIO, ADC, SPI, I2C, UART, RGB LED</p>
	</div>
	<div class="docs-schematic docs-schematic--transparent">
		<a href="/pliki/schematy/obrazy/xiao-nrf52840-pinout-tyl.png" data-lightbox aria-label="Powiększ pinout XIAO nRF52840 od spodu">
			<img src="/pliki/schematy/obrazy/xiao-nrf52840-pinout-tyl.png" alt="Pinout płytki XIAO nRF52840 od spodu" width="2047" height="1143" data-transparent>
		</a>
		<p class="docs-img-caption">Widok od spodu - SWD, BAT+/BAT-, NFC</p>
	</div>
</div>

## Zarządzanie baterią
Logika ładowania sterowana jest przez cztery piny:
- `P0.31` / `32` (`VBAT_ADC`) - wejście analogowe do pomiaru napięcia baterii
- `P0.14` / `14` (`READ_EN`) - stan niski włącza odczyt, a wysoki oszczędzanie energii
- `P0.13` / `22` (`CHG_CTRL`) - stan niski oznacza szybkie ładowanie (100 mA), a wysoki standardowe (50 mA)
- `P0.17` (`CHG_STAT`) - stan niski oznacza ładowanie, a wysoki pełną baterię lub bezczynność

> [!NOTE]
> Numeracja pinów zależy od użytego rdzenia w Arduino IDE - format na diagramie to `Mbed Core / Non-Mbed Core`.
