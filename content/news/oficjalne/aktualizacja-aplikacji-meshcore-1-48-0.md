---
title: Aktualizacja aplikacji MeshCore 1.48.0
description: 15 sierpnia 2026 - wersja 1.48.0 aplikacji MeshCore, powiadomienia push w wersji web, przeglądanie regionów repeaterów i nowe wymagania systemowe.
createdAt: 15.08.2026
updatedAt: 22.08.2026
tags: [Lista zmian, Aplikacja]
---

# Aplikacja MeshCore v1.48.0 - powiadomienia push na web
15 sierpnia 2026 ukazała się wersja **1.48.0** oficjalnej aplikacji MeshCore. Plik jest możliwy do pobrania pod linkiem [files.liamcottle.net/MeshCore/v1.48.0](https://files.liamcottle.net/MeshCore/v1.48.0).

## Lista zmian
- Dodano możliwość przeglądania regionów wykrytych repeaterów
- Dodano możliwość ponownego wysyłania poprzednich komend CLI z menu długiego przytrzymania
- Dodano przycisk wznawiania istniejącej sesji zamiast wymagania logowania do repeatera za każdym razem
- Dodano obsługę powiadomień push w wersji webowej - należy włączyć uprawnienia w ustawieniach przeglądarki
- Dodano opcję kopiowania kontaktów i kanałów jako linku do schowka z ekranu udostępniania
- Dodano możliwość pokazywania/ukrywania konkretnych sekcji kanałów telemetrii
- Cała telemetria jest teraz wyświetlana na jednej stronie, usunięto rozwijaną listę kanałów telemetrii
- Telemetria mocy pokazuje teraz również moc obliczoną na podstawie napięcia i natężenia, jeśli różni się ona od wartości z telemetrii mocy
- Naciśnięcie przycisku wstecz podczas przeglądania kart kanałów lub mapy na ekranie głównym przenosi teraz do karty kontaktów
- Plik eksportu konfiguracji zawiera teraz zakres kanału, który jest stosowany podczas importowania pliku konfiguracji
- Wyłączono autokorektę w polu wprowadzania wiersza poleceń
- Etykiety znaczników na mapie skracają teraz duże liczby grup
- Poprawiono wydajność ładowania mapy internetowej
- Zaktualizowano Fluttera z wersji 3.29.0 do 3.44.9
- Zaktualizowano wewnętrzne biblioteki w celu zapewnienia zgodności z nowymi politykami Apple/Google
- Naprawiono błąd, przez który tekst kopiowany do schowka nie korzystał z przetłumaczonego ciągu znaków
- Naprawiono błąd, przez który przycisk dodawania kontaktu na ekranie wykrywania nie korzystał z przetłumaczonego ciągu znaków
- Naprawiono błąd, przez który przewijanie na końcu listy warstw zasięgu anteny powodowało przybliżenie mapy w wersji webowej

> [!NOTE]
> Z powodu wymagań Apple wymagane jest teraz iOS 15+ oraz macOS 12+.  
> Z powodu wymagań Google wymagany jest teraz także Android 7+.
