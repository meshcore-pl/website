---
title: Heltec WiFi LoRa 32 V4 - pinmap i dokumentacja
description: Karta techniczna Heltec WiFi LoRa 32 V4 - mapa pinów (Header J2/J3, LoRa, GNSS), zasilanie i link do pełnej dokumentacji producenta.
canonical: /dokumentacja/schematy/heltec-wifi-lora-32-v4
createdAt: 21.08.2026
---

# Heltec WiFi LoRa 32 V4 - pinmap i dokumentacja {toc: Heltec WiFi LoRa 32 V4}
Najnowsza wersja popularnej płytki Heltec (Wi-Fi, Bluetooth, LoRa, wyświetlacz OLED 0,96", wzmacniacz LNA). Dobry wybór pod companiona.

<div class="docs-schematic">
	<a href="/pliki/schematy/obrazy/heltec-wifi-lora-32-v4-pinmap.jpg" data-lightbox aria-label="Powiększ mapę pinów Heltec WiFi LoRa 32 V4">
		<img src="/pliki/schematy/obrazy/heltec-wifi-lora-32-v4-pinmap.jpg" alt="Mapa pinów płytki Heltec WiFi LoRa 32 V4" width="1457" height="1079">
	</a>
</div>

Nagłówki `J2` i `J3` udostępniają GPIO, ADC oraz interfejsy szeregowe (SPI/I2C), a osobne złącze `LoRa` i pinout `GNSS` odpowiadają za moduł pozycjonowania. Kolory na diagramie oznaczają typ pinu: `Pin fizyczny`, `Zasilanie`, `GND`, `GPIO`, `ADC/DAC`, `SPI/I2C`, `Połączone` (zajęte przez podzespoły na płytce), `Inne` oraz `Podciąganie ↑/↓`.

> [!IMPORTANT]
> Ze względu na wbudowany wzmacniacz LNA, [noise floor (NF)](/dokumentacja/meshcore/noise-floor) na tej płytce jest zwykle gorszy (wyższy) niż na płytkach bez wzmacniacza - to normalne. Zwykle nie wpływa to jednak na jakość TX/RX ani realny zasięg.

> [!TIP]
> `ESP32` zużywa więcej energii niż moduły oparte na układach `nRF` (np. `RAK4630`/`RAK4631`, `XIAO nRF52840`). Warto to uwzględnić przy wyborze sprzętu do repeatera zasilanego bateryjnie.

[Pełna dokumentacja PDF (Heltec, Rev. 1.4, 16 stron)](/pliki/schematy/pdf/heltec-wifi-lora-32-v4-3-1-dokumentacja.pdf) - zawiera m.in. dokładny opis pinów, charakterystykę RF i wymiary fizyczne.

Nowsze wydania dokumentacji nie zawierają już pełnego schematu elektrycznego - został on wydzielony do osobnych plików per rewizja PCB:
- [Schemat elektryczny PDF - V4.3](/pliki/schematy/pdf/heltec-wifi-lora-32-v4-3-schemat.pdf)
- [Schemat elektryczny PDF - V4.2](/pliki/schematy/pdf/heltec-wifi-lora-32-v4-2-schemat.pdf)

## Historia zmian sprzętowych
Producent oznacza rewizje sprzętowe (nie mylić z rewizją samego dokumentu, czyli `Rev. 1.4` powyżej) osobnym numerem wersji na PCB - poniżej najważniejsze zmiany między kolejnymi wersjami płytki.

### V4.3.1 (aktualizacja z 25.02.2026) - różnice względem V4.2 {toc: V4.3.1 vs V4.2}
Największa zmiana dotyczy toru odbiorczego RX/LNA - reakcja na feedback użytkowników w kierunku większej elastyczności RF.
- Chip FEM zaktualizowany do `KCT8103L` - programowo można teraz włączać/wyłączać przejście sygnału RX przez LNA
- `GPIO5` - nowo przypisany jako pin sterujący FEM (wcześniej wolny)
- `GPIO46` - zwolniony, teraz dostępny do własnego użytku (wcześniej zajęty)
- Tranzystor ochrony przed odwrotną polaryzacją: `AO3400` → `SI2302`
- Zoptymalizowany pobór prądu ADC (niższy prąd w stanie spoczynku)
- Możliwość przełączenia anteny 2,4 GHz na złącze IPEX poprzez przelutowanie jednego rezystora 0 Ω
- Zoptymalizowany układ PCB (ścieżki zasilania, masa, ścieżki RF, rozmieszczenie UART i Flash) - lepsza stabilność i wydajność RF

> [!TIP]
> Producent zarezerwował na PCB (domyślnie niepopulowane) dwa miejsca pod filtr SAW w torze RX - `U10` przed stopniem LNA i `U11` za nim - z myślą o docelowej mocy wyjściowej ok. 1 W (30 dBm). Montaż filtra w `U10` wymaga usunięcia rezystora `R32` i wlutowania `R37`/`R38` (0 Ω, obudowa 0402); w `U11` - usunięcia `R30` i wlutowania `R35`/`R36`. Rekomendowane modele filtrów: `B39871B4377P810` (868 MHz) i `B39921B4344P810` (915 MHz).

### V4.0 (sprzedaż publiczna od 24.09.2025) - różnice względem V3 {toc: V4.0 vs V3}
- MCU: `ESP32-S3N8` → `ESP32-S3R2`
- Flash: 8 MB wbudowany → 16 MB zewnętrzny, dodatkowo 2 MB PSRAM
- Dodano złącze solarne `SH1.25-2P`
- Moc nadawania LoRa: 21±1 dBm → 28±1 dBm
- Antena 2,4 GHz: sprężynowa → FPC
- Usunięto `CP2102` (konwerter USB-UART)
- Dodano złącze GNSS `SH1.25-8Pin`
- Liczba pinów: 36 → 40 (więcej dostępnych GPIO)
- Ekran: lutowany na stałe → złącze B2B (można zdemontować)
- Piny: platerowanie srebrem → złotem (lepsza przewodność i odporność na utlenianie)
- Dodana plastikowa podstawka ekranu jako ochrona mechaniczna
