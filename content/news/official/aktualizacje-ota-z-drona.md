---
title: Aktualizacje OTA za pomocą drona
description: Recrof pokazuje, jak zaktualizować firmware trudno dostępnych przemienników opartych o nRF52 za pomocą drona i niewielkiego modułu Xiao nRF52840.
createdAt: 22.06.2026
sourceUrl: https://blog.meshcore.io/2026/06/22/drone-ota
tags: [Poradnik, Oprogramowanie]
---

# Aktualizacje OTA za pomocą drona
_Aktualizacja OTA trudno dostępnych przemienników opartych o nRF52 za pomocą drona_

W miarę jak dodawaliśmy coraz więcej przemienników do naszej lokalnej sieci mesh na Słowacji, odkryliśmy, że nie zawsze da się fizycznie dotrzeć do niektórych lokalizacji przemienników wystarczająco często.
Stopniowo radziliśmy sobie z tym problemem lepiej, eksperymentując z różnymi podejściami.
Zbudowałem [własną aplikację nrf dfu działającą na systemach desktopowych](https://github.com/recrof/nrf_dfu_py), dzięki czemu można używać [zewnętrznych adapterów Bluetooth ze złączami RP-SMA i antenami kierunkowymi](https://github.com/recrof/nrf_dfu_py/tree/main/adapter-antenna-buying-tips).

![Aktualizacja lokalnego przemiennika z uConsole, adapterem BLE dużej mocy i anteną kierunkową](https://blog.meshcore.io/assets/images/2026/06/22/nrf_dfu_py.jpg)

Mój kolega lucidnx zaczął eksperymentować z `nrf_dfu_py` i stworzył [cały framework do aktualizowania dronem](https://github.com/lucidnx/meshcore-drone-updater). To rozwiązanie działa dobrze, ale podejście z rpi zero nie jest trywialne w konfiguracji, wymaga dodatkowego majsterkowania i jest trudne w użyciu i debugowaniu. Dlatego zdecydowałem się zbudować bardziej przyjazną dla użytkownika wersję, tak by dron nie musiał dźwigać na sobie całej płytki z Linuksem.

![Starsza wersja aktualizatora dronowego - z Raspberry Pi Zero 2W i sporym pakietem baterii, łącznie 70 g ładunku](https://blog.meshcore.io/assets/images/2026/06/22/rpi_drone.jpg)

## Gwiazda tego odcinka
Xiao nRF52840 łączy w sobie idealną kombinację cech potrzebnych do bardzo małego, energooszczędnego aktualizatora przemienników: MCU nRF jest energooszczędny, ma 2 MB wbudowanej pamięci flash oraz w pełni funkcjonalny kontroler USB. Zainspirowany bootloaderem Arduino z trybem UF2, zdecydowałem się użyć zewnętrznej pamięci flash 2 MB jako pamięci masowej z prawdziwym systemem plików FAT12, dzięki czemu nawet telefonem możesz skopiować plik firmware, skonfigurować aktualizator i przejrzeć log aktualizacji - bardzo przydatne w terenie.

![DJI Neo2 z aktualizatorem Xiao nRF52840 i baterią Li-Ion 250 mAh, łącznie 7,5 g ładunku](https://blog.meshcore.io/assets/images/2026/06/22/xiao_drone.jpg)

## Jak skonfigurować i używać aktualizatora
Upewnij się, że przemiennik, który chcesz zaktualizować, używa [bootloadera OTAFIX autorstwa oltaco](https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX/releases/) w wersji co najmniej 2.1 lub nowszej.

Firmware pobierzesz ze [strony wydań projektu](https://github.com/recrof/xiao_nrf52_updater/releases). Obsługiwane są 2 płytki: Xiao nRF52840 oraz RAK3401/RAK4631 z modułem zewnętrznej pamięci flash RAK15001. Skupimy się na Xiao, bo dla większości czytelników będzie łatwiejszy do zdobycia.

1. Pobierz `updater-xiao_nrf52840-vX.X.uf2`
2. Podłącz Xiao do komputera przez USB
3. Kliknij dwukrotnie mały przycisk reset obok portu USB - być może będziesz musiał użyć paznokcia
4. Skopiuj `updater-xiao_nrf52840-vX.X.uf2` na nowo otwarty dysk USB
5. Xiao zrestartuje się (możesz zobaczyć błąd o nieudanym transferze - zignoruj go)
6. Zobaczysz nowy, pusty dysk USB o nazwie **„XIAO DFU”**
7. Skopiuj plik [config.txt](https://raw.githubusercontent.com/recrof/xiao_nrf52_updater/refs/heads/main/config.txt) na ten dysk USB
8. Otwórz `config.txt` w edytorze tekstu
9. Ustaw `ble_name` na nazwę OTA używaną przez Twój przemiennik, oto kilka przykładów:
   - `4631 | 3401` dla płytek opartych o RAK - obejmuje zarówno RAK4631, jak i RAK3401 1W
   - `SENSECAP | SCAP` dla Seeed SenseCap Solar P1
   - `XIAO` dla przemiennika opartego o XIAO NRF52 (tak, możesz zaktualizować Xiao swoim Xiao!)
   - `T114` dla Heltec T114
   - `ProMicro | PROM` dla płytek opartych o FakeTec / Promicro
10. (opcjonalnie) ustaw dowolne parametry konfiguracji, ale wartości domyślne są już dobrze dobrane
11. [Pobierz](https://flasher.meshcore.io/) i skopiuj plik **zip** z firmware, który chcesz wgrać na swój przemiennik
12. Zdecyduj, jak chcesz zasilić płytkę Xiao... polecam przylutować przewody baterii do [padów baterii](https://files.seeedstudio.com/wiki/XIAO-BLE/XIAO_nRF52840_back_pinout.png), ale możesz też improwizować z zasilaniem USB, jeśli wolisz
13. Przymocuj Xiao do drona, wyślij komendę `start ota` do swojego przemiennika i upewnij się, że Xiao mruga na niebiesko - to oznacza, że jest gotowy do flashowania Twojego przemiennika
14. Podleć jak najbliżej celu - transfer rozpocznie się, gdy tylko aktualizator wykryje `ble_name` z minimalnym (lub lepszym) `rssi`
15. Regularnie pinguj swój przemiennik przez LoRa - poinformuje Cię, czy proces się rozpoczął, a po kilku minutach zacznie znów być osiągalny
16. Odbierz drona i spójrz na kolor diody LED na Xiao - jeśli jest ZIELONA, aktualizacja się powiodła, jeśli CZERWONA, nie powiodła się. Jeśli wciąż miga na niebiesko, oznacza to, że aktualizacja się nawet nie rozpoczęła - `ble_name` nie było ustawione poprawnie, `rssi` było zbyt słabe, albo `start ota` się nie powiodło
17. (opcjonalnie) możesz zajrzeć do pliku `log.txt` na dysku USB Xiao - powinien zawierać przebieg procesu aktualizacji ze znacznikami czasu względem uruchomienia. Możesz zobaczyć, jak wygląda [log udanej aktualizacji](https://blog.meshcore.io/assets/images/2026/06/22/success.log)

Daj nam znać, czy ten poradnik pomógł Ci zaktualizować odległe przemienniki! Śmiało zadawaj pytania w komentarzach albo na naszym [Discordzie](https://discord.com/channels/1495203904898728149/1509594396482601121).
