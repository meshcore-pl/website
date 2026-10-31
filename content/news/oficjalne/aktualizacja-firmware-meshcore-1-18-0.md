---
title: Zmiany w firmware MeshCore 1.18.0 - BLE, Wi-Fi i CLI
description: BLE i Wi-Fi w jednym firmware MeshCore 1.18.0 ułatwiają zmianę sposobu połączenia. Wydanie wprowadza też CLI companiona, zdalne zarządzanie i telemetrię push.
createdAt: 15.10.2026
themeColor: '#21263d'
sourceUrl: https://blog.meshcore.io/2026/10/15/release-1-18-0
tags: [Lista zmian, Oprogramowanie]
---

# BLE i Wi-Fi w jednym firmware oraz CLI companiona w MeshCore 1.18.0
![MeshCore Firmware](https://blog.meshcore.io/assets/images/firmware_release.jpg)

15 października 2026 ukazało się wydanie oprogramowania **v1.18.0** dla MeshCore.
Najnowszy firmware pobierzesz z [flasher.meshcore.io](https://flasher.meshcore.io).

## Nowe funkcje
- Rozbudowano CLI companiona o obsługę Wi-Fi, m.in. komendy `wifi.enabled` i `wifi.status` ([#3357](https://github.com/meshcore-dev/MeshCore/pull/3357))
- CLI companiona - dodano `get wifi.pwd` ([#3458](https://github.com/meshcore-dev/MeshCore/pull/3458))
- Dodano CLI companiona, w tym nowy typ `TXT_TYPE_CLI_COMMAND (3)` ([#3298](https://github.com/meshcore-dev/MeshCore/pull/3298))
- CLI companiona - dodano komendy `reboot`, `poweroff` i `shutdown` ([#3442](https://github.com/meshcore-dev/MeshCore/pull/3442))
- Companion - ekran wykrywania węzłów ([#3279](https://github.com/meshcore-dev/MeshCore/pull/3279))
- Węzły czujnikowe - wysyłanie telemetrii push z obsługą subskrypcji i jej anulowania ([#3402](https://github.com/meshcore-dev/MeshCore/pull/3402))
- Companion - obsługa telemetrii push ([#3497](https://github.com/meshcore-dev/MeshCore/pull/3497))
- CLI companiona - nowa komenda `get/set tz.offset` ([#3329](https://github.com/meshcore-dev/MeshCore/pull/3329))

## Usprawnienia
- Thinknode M7 - wariant BLE obsługuje teraz Wi-Fi ([#3459](https://github.com/meshcore-dev/MeshCore/pull/3459))
- Przyspieszono synchronizację kanałów companiona ([#3249](https://github.com/meshcore-dev/MeshCore/pull/3249))
- MeshTracker X1 i T100 - szybsze wybudzanie i usypianie GPS ([#3525](https://github.com/meshcore-dev/MeshCore/pull/3525))
- Repeater - tryb `minimal` dla `loop.detect` jest teraz domyślny ([#3239](https://github.com/meshcore-dev/MeshCore/pull/3239))
- Tryb „ukrytego repeatera” - przy wyłączonym wysyłaniu pakietów ogłoszeniowych (advertów) repeater nie jest już wykrywalny ([#3538](https://github.com/meshcore-dev/MeshCore/pull/3538))
- Dodano obsługę modułów GPS RAK12500 i RAK12501 na RAK3401 ([#3268](https://github.com/meshcore-dev/MeshCore/pull/3268))
- T114 - wskaźnik ładowania w interfejsie companiona ([#3250](https://github.com/meshcore-dev/MeshCore/pull/3250))
- T-Beam-1W - sterowanie wentylatorem zależnie od temperatury ([#3371](https://github.com/meshcore-dev/MeshCore/pull/3371))
- Nowa komenda `gps diag` ([#3200](https://github.com/meshcore-dev/MeshCore/pull/3200))
- Usprawnienia GPS L76K ([#3201](https://github.com/meshcore-dev/MeshCore/pull/3201))
- Thinknode M6 - udostępniono stan zasilania zewnętrznego i ładowarki przez komendę `power` ([#3202](https://github.com/meshcore-dev/MeshCore/pull/3202))

## Nowo obsługiwane urządzenia
- Thinknode M8 ([#3180](https://github.com/meshcore-dev/MeshCore/pull/3180))
- WIO Tracker L1 1W ([#3248](https://github.com/meshcore-dev/MeshCore/pull/3248))
- Płytka Muzi Base (Duo + Uno + SuperIO) ([#3108](https://github.com/meshcore-dev/MeshCore/pull/3108))
- Thinknode M4 ([#3463](https://github.com/meshcore-dev/MeshCore/pull/3463))
- Waveshare ESP32-S3 LR1121 ([#3574](https://github.com/meshcore-dev/MeshCore/pull/3574))

## Poprawki błędów i pozostałe zmiany
- Naprawiono działanie wzmacniacza PA na RAK3401 przy braku GPS ([#3275](https://github.com/meshcore-dev/MeshCore/pull/3275))
- WIO Tracker L1 - usunięto opcję hibernacji z menu ([#3290](https://github.com/meshcore-dev/MeshCore/pull/3290))
- Dodano obsługę alternatywnych adresów I2C czujników Bosch BME680 i BME280 ([#3234](https://github.com/meshcore-dev/MeshCore/pull/3234))
- Poprawka companiona BLE dla Xiao C3 ([#3236](https://github.com/meshcore-dev/MeshCore/pull/3236))
- Companion - poprawka wielobajtowych tras w `CMD_SEND_RAW_DATA` ([#3235](https://github.com/meshcore-dev/MeshCore/pull/3235))
- Sterownik LR2021 - poprawka `setTxPower` ([#3218](https://github.com/meshcore-dev/MeshCore/pull/3218))
- Poprawiono moc nadawania Meshnology W12 ([#3319](https://github.com/meshcore-dev/MeshCore/pull/3319))
- LR2021 - poprawka `startReceive()` ([#3379](https://github.com/meshcore-dev/MeshCore/pull/3379))
- Poprawiono sprawdzanie granic danych kanałów grupowych ([#3386](https://github.com/meshcore-dev/MeshCore/pull/3386))
- Poprawiono sprawdzanie granic bufora komend ([#3395](https://github.com/meshcore-dev/MeshCore/pull/3395))
- Dodano walidację zakresu dla `set af` ([#3389](https://github.com/meshcore-dev/MeshCore/pull/3389))
- Poprawki konfiguracji zarządzania zasilaniem nRF52 ([#3002](https://github.com/meshcore-dev/MeshCore/pull/3002))
- Dodatkowe sprawdzanie wartości null i zakresów w menedżerze puli pakietów ([#3393](https://github.com/meshcore-dev/MeshCore/pull/3393))
- Thinknode M7 - wariant companiona z Ethernetem ([#3430](https://github.com/meshcore-dev/MeshCore/pull/3430))
- Dioda LED pozostaje zgaszona przed wyłączeniem zasilania ([#3449](https://github.com/meshcore-dev/MeshCore/pull/3449))
- Companion - przebudowano `AbstractUITask` ([#3431](https://github.com/meshcore-dev/MeshCore/pull/3431))
- Poprawki WIO E5 ([#3436](https://github.com/meshcore-dev/MeshCore/pull/3436))
- Thinknode M4 - piny kwarcu 32 kHz (LFXO) nie są już używane jako GPIO, poprawiono też nazwę OTA ([#3468](https://github.com/meshcore-dev/MeshCore/pull/3468))
- Poprawiono walidację `set agc.reset.interval` ([#3469](https://github.com/meshcore-dev/MeshCore/pull/3469))
- LR1121 - zmiany dotyczące przetwornicy DC-DC i inne usprawnienia ([#3464](https://github.com/meshcore-dev/MeshCore/pull/3464))
- Poprawki Heltec CT62 ([#3490](https://github.com/meshcore-dev/MeshCore/pull/3490))
- `MACThenDecrypt` odrzuca dane, których długość nie jest wielokrotnością rozmiaru bloku ([#1809](https://github.com/meshcore-dev/MeshCore/pull/1809))
- Zachowywanie czasu systemowego między restartami ([#1896](https://github.com/meshcore-dev/MeshCore/pull/1896))
- T-Echo Lite - wariant KISS USB ([#2472](https://github.com/meshcore-dev/MeshCore/pull/2472))
- ProMicro - dodano obsługę INA226 ([#3155](https://github.com/meshcore-dev/MeshCore/pull/3155))
- Poprawiono zegar Heltec T1 ([#3301](https://github.com/meshcore-dev/MeshCore/pull/3301))
- T1000-E - poprawka mapowania pinu zasilania czujnika ([#2065](https://github.com/meshcore-dev/MeshCore/pull/2065))
- GPS - odpytywanie przez maksymalnie 5 sekund w celu wykrycia zimnego startu ([#2838](https://github.com/meshcore-dev/MeshCore/pull/2838))
- Kod transportu 0 jest teraz traktowany tak samo jak brak zakresu (unscoped) ([#3568](https://github.com/meshcore-dev/MeshCore/pull/3568))
- Przekazywanie ACK w trybie bezpośrednim uwzględnia teraz skonfigurowane opóźnienie retransmisji, wcześniej wynoszące 0 ([#3573](https://github.com/meshcore-dev/MeshCore/pull/3573))
- Blokada rozruchu przy niskim napięciu jest teraz wyłączona na większości płytek nRF52 ([#2377](https://github.com/meshcore-dev/MeshCore/pull/2377))

## Firmware companiona z wieloma interfejsami (BLE + Wi-Fi)
Od początku projektu starano się utrzymać jak najmniejszy rozmiar firmware, aby MeshCore mógł działać także na urządzeniach o bardzo ograniczonych zasobach. Z tego powodu firmware companiona był dostępny w osobnych wariantach BLE, USB i Wi-Fi.

Pozwalało to ograniczyć zużycie RAM i pamięci flash, ale zmiana sposobu połączenia wymagała każdorazowego wgrania innego wariantu firmware.

W MeshCore v1.17.0, w [PR #3049](https://github.com/meshcore-dev/MeshCore/pull/3049), wprowadzono klasę `MultiSerialInterface`, dzięki której companion może przyjmować połączenia przez kilka interfejsów, np. BLE i Wi-Fi jednocześnie.

Zwiększa to zużycie RAM i pamięci flash, ale pozwala wybrać sposób połączenia w zależności od potrzeb, bez ponownego wgrywania firmware. Początkowo funkcję włączono wyłącznie dla Elecrow ThinkNode M7, który w jednym firmware obsługuje BLE, Wi-Fi i Ethernet.

W wersji **v1.18.0** rozszerzono tę obsługę na kolejne urządzenia:
- Heltec v3
- Heltec v4
- Heltec v4 r8
- Heltec Wireless Paper
- RAK3112
- Xiao S3
- Xiao S3 WIO

Użytkownicy tych płytek mogą teraz połączyć się przez BLE i skonfigurować dane sieci Wi-Fi w aplikacji MeshCore.

Niektóre urządzenia mają zbyt mało RAM, aby obsługiwać BLE i Wi-Fi jednocześnie. Nadal wymagają więc wyboru firmware dla konkretnego sposobu połączenia.

Programiści rozważają inne rozwiązania, m.in. zmianę stosu Bluetooth z Bluedroid na NimBLE. Taka zmiana znacznie ograniczyłaby zużycie RAM i mogłaby umożliwić jednoczesną obsługę BLE i Wi-Fi na części urządzeń z mniejszą ilością pamięci.

Aby zbudować własny firmware z BLE i Wi-Fi dla urządzenia ESP32, na którym ta funkcja nie została jeszcze włączona, dodaj `-D ENABLE_WIFI_INTERFACE` do `build_flags` oraz `+<helpers/wifi/*.cpp>` do `build_src_filter` w istniejącym wariancie BLE. Przykład znajdziesz w [PR #3591](https://github.com/meshcore-dev/MeshCore/pull/3591).

Warianty BLE + Wi-Fi nie obsługują obecnie połączenia USB z aplikacją, ponieważ port szeregowy jest używany do przesyłania logów diagnostycznych. Twórcy zamierzają wrócić do tej kwestii w jednej z przyszłych aktualizacji firmware.

## Ustawienia Wi-Fi w aplikacji MeshCore
Wraz z obsługą BLE i Wi-Fi jednocześnie pojawiła się możliwość konfiguracji sieci przez aplikację. Od wersji **MeshCore App v1.50.0** dostępna jest nowa sekcja **WiFi Settings** (Ustawienia Wi-Fi).

Pozwala połączyć się z companionem przez BLE i ustawić dane sieci Wi-Fi. Po ponownym uruchomieniu węzeł automatycznie połączy się z tą siecią.

![Ekran ustawień Wi-Fi w aplikacji MeshCore](/images/screens/aktualizacja-firmware-meshcore-1-18-0/wifi.jpg)

W innych aplikacjach dane sieci można skonfigurować za pomocą nowych komend CLI `set wifi.ssid` i `set wifi.pwd`. Więcej informacji znajdziesz w [PR #3357](https://github.com/meshcore-dev/MeshCore/pull/3357) i [PR #3458](https://github.com/meshcore-dev/MeshCore/pull/3458).

Programiści liczą, że te zmiany ułatwią korzystanie z MeshCore, i chcieliby udostępnić je także na kolejnych płytkach.

## Lokalne i zdalne zarządzanie companionem przez CLI
W firmware companiona MeshCore v1.18.0 wprowadzono nowy wiersz poleceń, podobny do CLI zdalnego zarządzania, znanego z repeaterów.

Przed wersją v1.18.0 każdej własnej komendzie dodawanej do firmware companiona trzeba było przydzielić nowy identyfikator w protokole komunikacji z aplikacją. Należało też zadbać, żeby nie kolidował z identyfikatorami używanymi w innych niestandardowych wersjach firmware. Stawało się to coraz bardziej uciążliwe, ponieważ nowe urządzenia producentów potrzebowały własnych komend do włączania i wyłączania konkretnych funkcji sprzętowych. Aplikacje obsługujące companiony również wymagały aktualizacji, aby udostępnić te funkcje.

Nowe CLI udostępnia companionom prosty, tekstowy wiersz poleceń, który można rozbudowywać o własne komendy. Dodanie kolejnej komendy do firmware nie wymaga już aktualizacji aplikacji.

Od wersji **MeshCore App v1.50.0** na ekranie ustawień dostępna jest nowa opcja **Wiersz poleceń** (Command Line).

![Przycisk wiersza poleceń na ekranie ustawień](/images/screens/aktualizacja-firmware-meshcore-1-18-0/ustawienia-cli.jpg)

Można stąd wysyłać komendy CLI do lokalnego companiona. Dostępne są również własne komendy zarejestrowane w nowej funkcji `handleCommand` klasy `MainBoard` w niestandardowym firmware.

![Wiersz poleceń lokalnego companiona](/images/screens/aktualizacja-firmware-meshcore-1-18-0/cli-companiona.jpg)

Wraz z nowym CLI wprowadzono również **zdalne zarządzanie companionami**. W uprawnieniach kontaktu dodano opcję **Zezwól na zdalne CLI** (Allow Remote CLI). Po jej włączeniu dany kontakt może wysyłać komendy CLI do Twojego companiona.

To bardzo wrażliwe uprawnienie - pozwala zarządzać ustawieniami radia, zmieniać nazwę węzła i zdalnie restartować urządzenie przez sieć mesh. Przyznawaj je rozważnie.

![Opcja „Zezwól na zdalne CLI” w uprawnieniach kontaktu](/images/screens/aktualizacja-firmware-meshcore-1-18-0/uprawnienia-cli.jpg)

Na ekranie szczegółów kontaktu, w sekcji **Dodatkowe narzędzia**, dodano przycisk **Wiersz poleceń**, który pozwala wysyłać komendy CLI do innych companionów przez sieć mesh. Odpowiedź otrzymasz tylko wtedy, gdy zdalny companion przyznał Twojemu węzłowi uprawnienie do zdalnego CLI.

![Przycisk wiersza poleceń w szczegółach kontaktu](/images/screens/aktualizacja-firmware-meshcore-1-18-0/kontakt-cli.jpg)

Zespół ma nadzieję, że nowe CLI ułatwi pracę nad własnymi projektami opartymi na MeshCore.
