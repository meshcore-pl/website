---
title: Aktualizacja aplikacji MeshCore 1.50.0
description: 25 września 2026 - wersja 1.50.0 aplikacji MeshCore, zdalne zarządzanie companionami przez CLI, lokalny wiersz poleceń i nowy ekran ustawień Wi-Fi.
createdAt: 25.09.2026
tags: [Lista zmian, Aplikacja]
---

# Aplikacja MeshCore v1.50.0 - zdalne CLI dla companionów
25 września 2026 ukazała się wersja **1.50.0** oficjalnej aplikacji MeshCore. Plik jest możliwy do pobrania pod linkiem [files.liamcottle.net/MeshCore/v1.50.0](https://files.liamcottle.net/MeshCore/v1.50.0).

## Lista zmian
- Dodano przycisk wiersza poleceń w szczegółach kontaktu companiona, umożliwiający zdalne zarządzanie innymi companionami
- Dodano uprawnienie zdalnego CLI na ekranie uprawnień kontaktu, pozwalające innym węzłom zdalnie zarządzać Twoim węzłem
- Dodano obsługę lokalnego wiersza poleceń companiona na ekranie ustawień - wymaga firmware companiona w wersji 1.18.0 lub nowszej
- Dodano możliwość importu i eksportu zakresów regionów w pliku konfiguracji companiona (JSON)
- Dodano nowy ekran ustawień Wi-Fi do konfiguracji SSID i hasła
- Na dole ekranu ustawień wyświetlany jest teraz aktualnie używany typ połączenia
- Dodano przycisk grupowania znaczników repeaterów na mapie narzędzia śledzenia trasy
- Zakresy regionów są teraz widoczne na liście kanałów, jeśli zostały skonfigurowane
- Eksport konfiguracji companiona zawiera teraz czas przechowywania wiadomości kanałowych
- Długie przytrzymanie przycisku ping ustawia teraz domyślny rozmiar hasha trasy dla wszystkich kolejnych pingów
- Protokół nie obsługuje śledzenia 3-bajtowych tras, dlatego aplikacja przy śledzeniu trasy do repeatera konwertuje je teraz na 2-bajtowe
- Komunikat o nieudanym pingu pokazuje teraz nazwę i prefiks repeatera
- Kody QR są teraz zawsze czarne na białym tle
- Naprawiono błąd, przez który wyświetlały się powiadomienia o danych CLI otrzymanych od innych companionów
- Naprawiono błąd, przez który klawisz nowej linii nie działał na niektórych urządzeniach z Androidem
- Naprawiono błąd, przez który aplikacja zawieszała się na GrapheneOS po wyświetleniu ekranu logowania do repeatera
- Naprawiono błąd, przez który pola wyszukiwania kontaktów i kanałów nie były czyszczone po ponownym połączeniu węzła
- Naprawiono błąd, przez który niektóre urządzenia ESP32 przekraczały limit czasu przy pobieraniu informacji o urządzeniu podczas łączenia przez USB w systemie Windows
- Zaktualizowano treść komunikatu o odblokowaniu zdalnego zarządzania na wszystkich urządzeniach, aby jasno wskazywała platformę

## Brakujące tłumaczenia
Z powodu chwilowej niedyspozycji nie udało się na czas przetłumaczyć części nowych tekstów w aplikacji. Do czasu uzupełnienia tłumaczeń będą one wyświetlane po angielsku.

| Tekst w aplikacji                                                              | Sugerowane tłumaczenie                                                  |
|--------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| WiFi Settings                                                                  | Ustawienia Wi-Fi                                                        |
| Enable WiFi                                                                    | Włącz Wi-Fi                                                             |
| When enabled, your companion node will connect to the configured WiFi network. | Po włączeniu Twój companion połączy się ze skonfigurowaną siecią Wi-Fi. |
| WiFi SSID                                                                      | SSID sieci Wi-Fi                                                        |
| WiFi Password                                                                  | Hasło Wi-Fi                                                             |
| WiFi Status                                                                    | Status Wi-Fi                                                            |
| WiFi IP Address                                                                | Adres IP Wi-Fi                                                          |
| Connection Info                                                                | Informacje o połączeniu                                                 |
| Please reboot your MeshCore device for changes to take effect.                 | Uruchom ponownie urządzenie MeshCore, aby zastosować zmiany.            |
