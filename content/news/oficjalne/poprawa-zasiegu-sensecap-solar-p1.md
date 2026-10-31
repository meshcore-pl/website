---
title: SenseCAP Solar Node P1-Pro - jak poprawić zasięg MeshCore?
description: Jak poprawić zasięg SenseCAP Solar Node P1-Pro? Poradnik Seeed Studio o lokalizacji, wymianie anteny, aktualizacji firmware i testach repeatera.
createdAt: 20.10.2026
themeColor: '#95ab62'
sourceUrl: https://blog.meshcore.io/2026/10/20/boost-sensecap-solar
tags: [Poradnik, Sprzęt]
---

# Jak poprawić zasięg i sprawdzić repeater SenseCAP Solar Node P1-Pro?
![SenseCAP Solar Node P1-Pro](https://blog.meshcore.io/assets/images/2026/10/20/image.png)

[Solar Node P1-Pro](https://www.seeedstudio.com/SenseCAP-Solar-Node-P1-Pro-for-MeshCore-p-6741.html?sensecap_affiliate=lLZqP0c&referring_service=blog.meshcore.io) to wydajny, off-gridowy repeater, który zwykle spełnia wszystkie potrzeby związane z niezawodnym zasięgiem sieci mesh LoRa. Możesz też zamontować antenę o odpowiednio większym zysku, aby jeszcze bardziej poprawić jego osiągi.

Ten poradnik krok po kroku pokaże, jak poprawić działanie anteny i jak sprawdzić, czy Twój Solar Node P1-Pro działa prawidłowo.

## Jak poprawić zasięg
Antena dołączona do Solar Node P1-Pro jest dobrana specjalnie do tego urządzenia. W naszych testach pozwalała osiągnąć około 9 km na otwartym terenie przy bezpośredniej widoczności.

Zanim wymienisz antenę, istnieje kilka prostszych sposobów na poprawę rzeczywistego zasięgu.

![Otwarta lokalizacja](https://blog.meshcore.io/assets/images/2026/10/20/image-8.png)

**Wybierz bardziej otwarte miejsce**

LoRa działa najlepiej, gdy między węzłami jest jak najmniej przeszkód. Budynki, wzgórza, gęste drzewa i metalowe konstrukcje osłabiają sygnał.

Jeśli to możliwe, zainstaluj P1-Pro na otwartej przestrzeni i unikaj umieszczania go za ścianami, w metalowych obudowach lub bardzo blisko dużych metalowych obiektów.

![Wysokość montażu](https://blog.meshcore.io/assets/images/2026/10/20/image-1.png)

**Zamontuj węzeł wyżej**

Wysokość montażu ma duży wpływ na zasięg.

Zamontowanie P1-Pro na dachu, maszcie, balkonie lub w innym wyższym miejscu ogranicza zasłanianie przez pobliskie budynki i teren i daje antenie czystszą drogę do innych węzłów.

W niektórych środowiskach samo przeniesienie węzła o kilka metrów wyżej potrafi zauważalnie poprawić łącze.

**Zadbaj o bezpośrednią widoczność**

Przy łączach na większe odległości staraj się, aby trasa między węzłami była jak najbardziej wolna od przeszkód.

Miejsce może wyglądać na mapie na bliskie, ale wzgórza, budynki lub gęsta roślinność między dwoma węzłami nadal mogą znacząco skrócić użyteczny dystans.

Przy testowaniu maksymalnego zasięgu lepiej zacząć od dwóch lokalizacji z dobrą widocznością.

**Zwróć uwagę na ustawienie anteny**

Podczas normalnego użytkowania trzymaj antenę w pionie, zwłaszcza jeśli anteny w pozostałych węzłach też mają polaryzację pionową.

Unikaj przykładania anteny bezpośrednio do metalowych powierzchni lub montowania jej bardzo blisko dużych metalowych konstrukcji.

Czasem nawet niewielka zmiana pozycji montażu może poprawić sygnał.

**Wymień antenę, aby zwiększyć zasięg**

Jeśli miejsce montażu zostało już zoptymalizowane, a nadal chcesz poprawić zasięg, kolejnym krokiem jest wymiana anteny.

Antena z włókna szklanego o odpowiednim zysku może zapewnić lepsze działanie w stałych, zewnętrznych instalacjach repeaterów. W takim przypadku trzeba też zmienić złącze anteny na typ N i zabezpieczyć odsłonięty kabel RF na potrzeby długotrwałej pracy na zewnątrz.

## Przygotuj z wyprzedzeniem
- Osłona na wiązkę kabli lub rurka ochronna odporna na UV, do zabezpieczenia zewnętrznych kabli SMA.
- [Adapter RP-SMA na N-type](https://www.seeedstudio.com/RF-Cable-RP-SMA-Male-to-N-Type-SMA-Female-300mm.html?sensecap_affiliate=lLZqP0c&referring_service=blog.meshcore.io), do podłączenia wydajnych anten.
- [Antena z włókna szklanego 868-915 MHz](https://s.click.aliexpress.com/e/_c3GtNzkN)

### Modernizacja sprzętu
**Zamontuj tak, jak na zdjęciu**

![Montaż anteny](https://blog.meshcore.io/assets/images/2026/10/20/image-2.png)

Dołączony uchwyt ma również odpowiednie miejsca montażowe dla anteny z włókna szklanego.

![Uchwyt z anteną](https://blog.meshcore.io/assets/images/2026/10/20/image-4.png)

Przed demontażem lub obsługą złączy SMA wyłącz zasilanie węzła. Przed użyciem siły sprawdź też orientację złącza. Dokręcając adapter, upewnij się, że złącze siedzi pewnie. Luźne złącze RF może pogorszyć osiągi.

## Budowa wewnętrzna Solar Node P1-Pro
![Budowa wewnętrzna Solar Node P1-Pro](https://blog.meshcore.io/assets/images/2026/10/20/image-3.png)

## Aktualizacja firmware Solar Node P1-Pro
Firmware zaktualizujesz łatwo przez [MeshCore Flasher](https://flasher.meshcore.io/seeed-studio-sensecap-solar-node-p1/repeater/), wykonując poniższe kroki:

1. Podłącz SenseCAP do komputera przez port USB-C.
2. Otwórz stronę [MeshCore Flasher](https://flasher.meshcore.io) i wybierz pozycję urządzenia SenseCAP Solar.
3. Wejdź w tryb DFU i zamontuj urządzenie jako dysk wymienny.
4. Wybierz najnowszą wersję firmware MeshCore i wgraj ją.
5. Po zakończeniu aktualizacji połącz się z urządzeniem przez USB i użyj [config.meshcore.io](https://config.meshcore.io), aby ustawić lokalizację, region radiowy, hasła admina/gościa oraz ustawienia zasilania.

> [!NOTE]
> Wgranie firmware repeatera wyłącza funkcję Bluetooth w węźle. Repeatery MeshCore można konfigurować przez USB na [config.meshcore.io](https://config.meshcore.io) lub za pomocą narzędzia do zdalnego zarządzania w aplikacji MeshCore. Wybierz właściwy region radiowy (np. 869 MHz dla Europy) i ustaw moc nadawania oraz coding rate zgodnie z lokalnymi przepisami.

## Parowanie i zarządzanie w aplikacji mobilnej MeshCore
Gdy repeater ukończy aktualizację firmware i konfigurację, a na urządzeniu companion włączony jest Bluetooth, companion może wykryć repeater dzięki krótkozasięgowej emisji. Jest ona wysyłana po włączeniu zasilania repeatera lub po naciśnięciu przycisku użytkownika.

![Parowanie w aplikacji MeshCore](https://blog.meshcore.io/assets/images/2026/10/20/image-6.png)

Do aplikacji możesz zalogować się jako gość lub admin (jeśli podczas konfiguracji przez USB ustawiono hasło admina). Dostęp gościa daje dane telemetryczne i podstawowe narzędzia. Dostęp admina odblokowuje wiersz poleceń i wszystkie ustawienia.

## Weryfikacja nadawania i przekazywania pakietów przez repeater MeshCore
Ta metoda sprawdza głównie trzy rzeczy:

1. Czy repeater odbiera pakiety?
2. Czy repeater poprawnie nadaje pakiety?
3. Czy repeater faktycznie przekazuje dane dalej?

### Sprawdź podstawowe ustawienia
Podłącz repeater przez port szeregowy USB i wykonaj:

```
ver
board
get radio
get tx
get repeat
```

![Wynik podstawowych komend](https://blog.meshcore.io/assets/images/2026/10/20/image-7.png)

Kluczowa rzecz do sprawdzenia:

```
get repeat
```

Odpowiedź:

```
on
```

Upewnij się też, że częstotliwość, szerokość pasma (Bandwidth), SF i CR repeatera i companiona są dokładnie takie same.
Jeśli urządzenie to obsługuje, możesz sprawdzić również:

```
get radio.rxgain
```

Zwykle wynik to:

```
on
```

---

### Test odbioru (RX) repeatera
Najpierw wyczyść statystyki:

```
clear stats
stats-radio
stats-packets
```

![Statystyki przed testem](https://blog.meshcore.io/assets/images/2026/10/20/image-9.png)

Następnie poproś pobliski companion o wysłanie 3-5 wiadomości kanałowych pod rząd.
Sprawdź ponownie:

```
stats-radio
stats-packets
```

![Statystyki po teście](https://blog.meshcore.io/assets/images/2026/10/20/image-5.png)

Zwróć uwagę na:

```
recv
flood_rx
rx_air_secs
last_rssi
last_snr
recv_errors
```

Jeśli:

```
recv ↑
flood_rx ↑
rx_air_secs ↑
```

oznacza to, że repeater prawidłowo odbiera dane LoRa.
Jeśli po wysłaniu wielu pakietów te wartości w ogóle się nie zmieniają, sprawdź najpierw:

- parametry radiowe,
- antenę,
- RX Gain,
- SX1262 / tor RF.

---

### Weryfikacja nadawania (TX) repeatera
Wykonaj:

```
clear stats
advert.zerohop
```

Następnie sprawdź:

```
stats-radio
stats-packets
```

Normalnie powinieneś zobaczyć:

```
sent ↑
tx_air_secs ↑
```

Jednocześnie pobliskie companiony powinny odebrać advert repeatera.
Jeśli statystyki pokazują, że advert został wysłany, ale pobliskie urządzenia w ogóle go nie odbierają, skup się na sprawdzeniu:

- PA / FEM,
- przełącznika RF,
- anteny,
- częstotliwości nadawania,
- mocy TX.

---

### Sprawdź, czy repeater faktycznie przekazuje pakiety
Włącz log pakietów:

```
clear stats
log erase
log start
```

Następnie poproś Companiona A o wysłanie kilku wiadomości.

Po zakończeniu testu wykonaj:

```
log stop
log
stats-packets
```

Sprawdź, czy w logach są wpisy:

```
RX ...
TX ...
```

Jeśli podczas tego samego testu pojawiają się zarówno RX, jak i następujące po nim TX, oznacza to, że repeater przekazał dane po ich odebraniu.
Jeśli widzisz:

```
RX ...
TX FAIL!
```

odbiór działa poprawnie, ale nadawanie kończy się niepowodzeniem.

Uwaga:

```
liczba RX ≠ liczba TX
```

To normalne. MeshCore nie wysyła ponownie każdego odebranego pakietu - duplikaty, limit przeskoków (hop), wykrywanie pętli i inne warunki mogą uniemożliwić przekazanie.

---

### Zalecane komendy testowe
Przy właściwym sprawdzaniu możesz po prostu wykonać poniższy zestaw:

```
ver
board
get radio
get tx
get repeat

clear stats
log erase
log start

stats-radio
stats-packets
```

Poproś Companiona o wysłanie 3-5 pakietów, a następnie:

```
stats-radio
stats-packets

log stop
log
```

Końcowy test aktywnego TX:

```
advert.zerohop
stats-radio
stats-packets
```

---

### Końcowe kryteria oceny
Najważniejsze są te cztery punkty:

```
1. flood_rx / recv rośnie
2. RX pojawia się w logu
3. TX pojawia się w logu, a flood_tx / sent rośnie
4. Drugi Companion faktycznie odbiera wiadomość
```

Jeśli wszystkie cztery warunki są spełnione, możesz uznać, że odbiór, nadawanie i przekazywanie w repeaterze działają prawidłowo.

## FAQ

### Dlaczego mój P1-Pro nie osiąga 9 km?
Wynik 9 km zmierzono na otwartym terenie z dobrą widocznością. Nie należy traktować go jako gwarantowanego dystansu komunikacji.

Budynki, wzgórza, drzewa, wysokość montażu, ustawienie anteny, zakłócenia, a nawet samo położenie węzła wpływają na rzeczywisty zasięg.

Jeśli zasięg jest znacznie krótszy od oczekiwanego, zalecamy najpierw powtórzyć test na otwartej przestrzeni, zanim wymienisz jakikolwiek sprzęt.

### Czy montaż P1-Pro wyżej poprawia zasięg?
Zwykle tak.

W komunikacji LoRa na duże odległości bardzo ważne jest ograniczenie przeszkód. Zamontowanie węzła na dachu, maszcie, wzgórzu lub w innym wyższym miejscu często znacząco poprawia zasięg.

W wielu przypadkach zmiana miejsca montażu daje większą różnicę niż sama wymiana anteny.

### Czy mogę użyć anteny o większym zysku?
Tak, o ile antena obsługuje właściwe pasmo LoRa i ma odpowiednie złącze.

Większy zysk anteny nie oznacza jednak automatycznie większego zasięgu. Nadal liczą się wysokość montażu, bezpośrednia widoczność, straty w kablu i otoczenie.

Upewnij się też, że ostateczna konfiguracja RF jest zgodna z przepisami dotyczącymi mocy nadawania i anten obowiązującymi w Twoim regionie.

### Dlaczego sygnał pogorszył się po wymianie anteny?
Sprawdź najpierw częstotliwość anteny, typ złącza, adapter i kabel RF.

Długi lub kiepskiej jakości kabel koncentryczny może wprowadzać dodatkowe straty. Luźne złącza również mogą pogarszać osiągi RF.

Jeśli to możliwe, porównaj oryginalną i nową antenę dokładnie w tym samym miejscu i przy tej samej orientacji.

### Czy antena powinna być zamontowana pionowo?
W większości typowych instalacji tak.

Jeśli pozostałe węzły również używają anten zamontowanych pionowo, trzymanie anteny P1-Pro w pionie zwykle daje bardziej spójne wyniki.

Unikaj przykładania anteny bezpośrednio do metalowych powierzchni lub montowania jej bardzo blisko dużych metalowych konstrukcji.

### Jak szybko sprawdzić, czy repeater nadaje?
W MeshCore możesz ręcznie użyć opcji **Send Advert**.

Wymusza to nadanie pakietu LoRa przez Solar Node. Następnie powinieneś zobaczyć krótkie mignięcie diody TX, a pobliskie urządzenia MeshCore powinny odebrać advert.

### Dioda TX nie miga, gdy inny węzeł wysyła wiadomość. Czy repeater jest zepsuty?
Niekoniecznie.

Dioda TX informuje tylko, że sam Solar Node nadaje dane LoRa. To nie jest wskaźnik odbioru (RX).

Repeater MeshCore nie retransmituje też każdego odebranego pakietu. Jeśli Solar Node odbierze pakiet, ale nie musi go przekazywać ani na niego odpowiadać, nie będzie nadawania, a więc dioda TX nie mignie.

Dlatego nie należy oceniać samą diodą TX, czy repeater działa prawidłowo.

### Dlaczego P1-Pro odbiera odległe węzły, a inne węzły go nie słyszą?
Zwykle oznacza to, że warunki łącza w górę i w dół nie są takie same.

Sprawdź najpierw antenę i złącze RF, a potem przetestuj z oryginalną anteną w otwartym miejscu. Sprawdź też, czy ustawiono właściwy region LoRa i czy urządzenie faktycznie nadaje.

Testowanie dwóch urządzeń na znanym dystansie i stopniowe zwiększanie odległości jest zwykle łatwiejsze niż szukanie przyczyn bezpośrednio w dużej sieci mesh.

### Czy dodanie kolejnego repeatera zawsze poprawia zasięg?
Nie zawsze.

Repeater jest najbardziej przydatny, gdy stoi w miejscu, z którego dobrze komunikuje się z obiema stronami sieci.

Dodanie kolejnego repeatera w słabej lokalizacji może nie poprawić łącza w dużym stopniu. W większości przypadków jeden dobrze umiejscowiony repeater na wysokim, otwartym terenie jest bardziej użyteczny niż kilka repeaterów ukrytych za budynkami lub rzeźbą terenu.

### Czy mogę zamontować P1-Pro w pudełku?
Sam P1-Pro jest zaprojektowany do pracy na zewnątrz, więc zwykle nie ma potrzeby umieszczać całego urządzenia w dodatkowej obudowie.

Jeśli używasz dodatkowej obudowy, unikaj metalowych obudów wokół anteny LoRa. Metal może znacząco pogorszyć osiągi RF.

Jeśli używana jest antena zewnętrzna, umieść ją poza obudową.

## Linki do zakupu
- [Solar Node P1-Pro](https://www.seeedstudio.com/SenseCAP-Solar-Node-P1-Pro-for-MeshCore-p-6741.html?sensecap_affiliate=lLZqP0c&referring_service=blog.meshcore.io)
- [Adapter RP-SMA na N-type](https://www.seeedstudio.com/RF-Cable-RP-SMA-Male-to-N-Type-SMA-Female-300mm.html?sensecap_affiliate=lLZqP0c&referring_service=blog.meshcore.io)
- [Antena z włókna szklanego 868-915 MHz](https://s.click.aliexpress.com/e/_c3GtNzkN)
