---
title: Aktualizacja aplikacji MeshCore 1.45.0
description: 14 czerwca 2026 - wersja 1.45.0 aplikacji MeshCore, nowy interfejs wstępnej konfiguracji, wykrywanie regionów spoza kontaktów i poprawki stabilności.
createdAt: 14.06.2026
updatedAt: 22.08.2026
tags: [Lista zmian, Aplikacja]
---

# Aplikacja MeshCore v1.45.0 - nowy kreator konfiguracji
14 czerwca 2026 ukazała się wersja **1.45.0** oficjalnej aplikacji MeshCore. Plik jest możliwy do pobrania pod linkiem [files.liamcottle.net/MeshCore/v1.45.0](https://files.liamcottle.net/MeshCore/v1.45.0).

## Lista zmian
- Dodano nowy interfejs wprowadzający do wstępnej konfiguracji urządzenia
- Dodano obsługę wykrywania regionów od urządzeń spoza listy kontaktów w firmware v1.16.0+
- Dodano przycisk dodawania kontaktu, gdy lista kontaktów jest pusta
- Naprawiono błąd powodujący awarię aplikacji po jednoczesnym naciśnięciu obu przycisków w oknie dialogowym
- Naprawiono błąd, przez który kanał się nie ładował, jeśli firmware miało wiele kanałów z tym samym kluczem
- Naprawiono błąd, przez który mapa sąsiadów nie uwzględniała własnego repeatera podczas dopasowywania znaczników na mapie
- Naprawiono błąd, przez który dodanie aktualnej pozycji do wiadomości w rzeczywistości nie pobierało zaktualizowanej pozycji
- Naprawiono błąd, przez który filtrowanie listy wykrywania według rozmiaru skrótu trasy ignorowało filtr typu kontaktu
- Naprawiono błąd, przez który usługa działająca w tle (foreground service) na Androidzie mogła powodować awarię aplikacji
- Zaktualizowano ikonę zakładki kanałów - z symbolu sygnału na hashtag
- Zaktualizowano tłumaczenia
