---
title: Wprowadzenie do MeshCore - pojęcia i przepisy
tocTitle: Wprowadzenie
description: Słownik pojęć MeshCore (preset, SF, CR, advert), role urządzeń (Companion, Repeater, Room Serwer, Room-Peater) oraz zasady legalnego nadawania w paśmie 868-869 MHz - limity ERP i duty cycle 10%.
canonical: /dokumentacja/meshcore/wprowadzenie
createdAt: 13.07.2026
updatedAt: 3.08.2026
---

# Wprowadzenie do MeshCore: pojęcia, role urządzeń i legalne nadawanie
Dziękujemy za zainteresowanie tematem! Prosimy pamiętać, iż dokumentacja jest nadal w trakcie prac. Sama domena `meshcorepolska.org` nie ma jeszcze nawet dwóch miesięcy.
Witryna wraz z dokumentacją jest open source - kod źródłowy znajdziesz na [GitHubie](https://github.com/meshcore-pl/website). Zapraszamy was wszystkich na [naszą grupę na Discordzie](https://meshcorepolska.org/discord).

> [!WARNING]
> Nigdy nie ustawiaj dokładnej lokalizacji swojego repeatera na [mapie](https://mapa.meshcorepolska.org)!
> Raczej nie chcesz, żeby cały świat znał dokładne położenie Twojego urządzenia.
> Zwykle są one montowane na dachach, balkonach lub masztach w ogrodzie, dlatego precyzyjny punkt na publicznej mapie może naprowadzić intruza wprost na Twoją posiadłość.
> Podawaj pozycję z odchyleniem rzędu kilkuset metrów od rzeczywistego miejsca - to w zupełności wystarczy do orientacyjnego przedstawienia pokrycia sieci.

> [!IMPORTANT]
> Oficjalna strona internetowa projektu MeshCore to tylko i wyłącznie [meshcore.io](https://meshcore.io), nie [meshcore.co.uk](https://meshcore.co.uk)!

> [!NOTE]
> W planach mamy serwis [meshcoreprofiles.com](https://meshcoreprofiles.com), który połączy publiczne profile operatorów z mapą węzłów MeshCore z całego świata.
> Więcej informacji znajdziesz [w tym dokumencie](https://meshcorepolska.org/dokumentacja/meshcore/profile-meshcore).

## Podstawowe pojęcia
Niektóre polskie określenia zostały przyjęte przez naszą społeczność. Nazwy w kolumnie Pojęcie są zgodne z tłumaczeniem używanym w polskiej wersji aplikacji MeshCore.
Nie znajdziesz więc tutaj żadnej rozbieżności ani nie pomylisz się przy czymkolwiek.

| Pojęcie                        | Nazwa angielska         | Co oznacza?                                                                                                                                                                  |
|--------------------------------|:------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Preset                         |                         | Gotowy zestaw ustawień radia, m.in. częstotliwość, szerokość pasma, SF i CR. Urządzenia muszą korzystać z tego samego presetu, aby się ze sobą komunikować.                  |
| Współczynnik rozpraszania (SF) | Spreading Factor        | Wyższa wartość ułatwia odbiór słabszego sygnału, ale wydłuża czas nadawania.                                                                                                 |
| Współczynnik kodowania (CR)    | Coding Rate             | Określa ilość danych dodawanych w celu korekcji błędów. Większa odporność oznacza dłuższy czas nadawania.                                                                    |
| RX                             | Receive                 | Odbieranie pakietów radiowych przez urządzenie.                                                                                                                              |
| TX                             | Transmit                | Wysyłanie (nadawanie) pakietów przez urządzenie.                                                                                                                             |
| Duty cycle                     |                         | Maksymalny procent czasu w ciągu godziny, w jakim urządzenie może nadawać. Patrz [Legalność i duty cycle](#legalnosc-i-duty-cycle) niżej.                                    |
| Companion                      |                         | Urządzenie LoRa, które łączy się z telefonem lub komputerem przez Bluetooth lub USB. Służy do wysyłania i odbierania wiadomości.                                             |
| Repeater (RPT)                 |                         | Węzeł (tzw. przekaźnik), który przekazuje dalej odebrane pakiety w eter i zwiększa zasięg sieci.                                                                             |
| Room Serwer (RS)               |                         | Osobny firmware, zwykle używany do grupowych rozmów lokalnych. Przechowuje historię wiadomości i udostępnia ją użytkownikom po połączeniu.                                   |
| Advert                         |                         | Pakiet rozgłoszeniowy zawierający informacje o urządzeniu. Po jego odebraniu urządzenie pojawi się na liście kontaktów.                                                      |
| Advert 0-hop                   | Advert Zero Hop         | Advert lokalny, który dociera tylko do urządzeń znajdujących się w bezpośrednim zasięgu radiowym. Repeatery nie przekazują go dalej.                                         |
| Advert do wszystkich           | Flood Routed            | Advert rozsyłany przez sieć i przekazywany dalej przez repeatery. Dzięki temu może dotrzeć również do urządzeń poza bezpośrednim zasięgiem.                                  |
| Antena dookólna (360°)         | Omnidirectional Antenna | Antena nadająca i odbierająca sygnał we wszystkich kierunkach wokół siebie.                                                                                                  |
| Antena kierunkowa              | Directional Antenna     | Antena skupiająca sygnał w wybranym kierunku. Wymaga odpowiedniego ustawienia. [Czytaj więcej](https://meshcorepolska.org/dokumentacja/meshcore/anteny#kierunkowosc-anteny). |

> [!NOTE]
> Przejdź do dokumentu [Presety i konfiguracja](https://meshcorepolska.org/dokumentacja/meshcore/aktualne-presety), aby dowiedzieć się więcej na temat ustawień radiowych oraz poprawnej konfiguracji.

## Role urządzeń
O roli urządzenia decyduje oprogramowanie (firmware), nie sama płytka. Ten sam sprzęt (np. Heltec V4) może pracować jako `companion`, `repeater`, `room serwer` albo `room-peater`.

### Companion (Kompan)
- Urządzenie osobiste. Parujesz je z telefonem lub komputerem przez Bluetooth albo USB, a następnie za jego pośrednictwem wysyłasz i odbierasz wiadomości.
- Jeżeli przez pewien czas aplikacja będzie wyłączona lub połączenie Bluetooth zostanie zerwane, wiadomości będą zapisywane w buforze. Ma on określony limit, po jego przekroczeniu najstarsze wiadomości zostaną nadpisywane. Po ponownym połączeniu się ze swoim companionem uzyskasz wgląd w to, co działo się podczas Twojej nieobecności.
- Companion samodzielnie nie przekazuje dalej wiadomości innych użytkowników. Aby komunikacja mogła wykroczyć poza bezpośredni zasięg radiowy, w pobliżu musi znajdować się repeater lub Room-Peater.

### Repeater (RPT)
- Jego jedyne zadanie to rozszerzanie zasięgu sieci. Przyjmuje pakiety i przekazuje je dalej. Nie buforuje wiadomości, nie prowadzi żadnej historii i nie zarządza kanałami.
- Bluetooth jest w nim celowo wyłączony - dostęp masz tylko przez USB albo zdalnie z poziomu samej sieci. Takie rozwiązanie pomaga oszczędzać energię.
- Wybierz dla niego dobrze widoczny, wyniesiony punkt z osobnym źródłem zasilania (np. ogniwa Li-Ion 18650 + panel słoneczny) i solidną anteną - zobacz [Wszystko o antenach](https://meshcorepolska.org/dokumentacja/meshcore/anteny).

### Room serwer (RS)
- Pełni rolę lokalnej tablicy ogłoszeń dla wiadomości grupowych. Na liście kontaktów widnieje jak zwykłe urządzenie, przechowuje historię wiadomości i pokazuje je po podaniu hasła.
- Jedno urządzenie obsługuje tylko jeden kanał - każdy działa niezależnie. Tak jak w repeaterze, Bluetooth jest domyślnie wyłączony.
- Prywatność takiego serwera zależy wyłącznie od ciebie - dopóki nie zmienisz domyślnego hasła, dołączy do niego każdy.

### Room-peater
- Room-Peater to repeater i room serwer - połączony w jednym urządzeniu i jednym firmware. Jednocześnie przechowuje wiadomości grupowe i przekazuje pakiety w eterze dalej.
- Wygodne rozwiązanie tam, gdzie nie ma sensu stawiać dwóch osobnych urządzeń, ale w gęściej obstawionej okolicy lepiej rozdzielić te funkcje. Room-peater dzieli jeden budżet duty cycle między obie role naraz.

### Companion + repeat mode
To wariant, w którym companion dodatkowo przekazuje cudze wiadomości, czyli częściowo zachowuje się jak repeater. Działa to wyłącznie pod bardzo restrykcyjnymi limitami:

| Pasmo   | Częstotliwość | ERP               | Duty cycle       |
|---------|---------------|-------------------|------------------|
| 868 MHz | `869,000 MHz` | do 25 mW (14 dBm) | 0,1%/h (3,6 s/h) |
| 433 MHz | `433,000 MHz` | do 10 mW (10 dBm) | bez limitu       |

W praktyce raczej rzadko ma to realne zastosowanie.

### Zmiana roli
Zmiana roli to w zdecydowanej większości przypadków przeflashowanie urządzenia innym firmware.
Wyjątkiem jest przełączanie między room serwerem a room-peaterem. Wystarczy komenda CLI, bez ponownego flashowania:
```mccli
set repeat on   # włącza tryb room-peater
set repeat off  # wraca do room serwera
```

### Domyślne hasła
Zaraz po sflashowaniu firmware, repeater i room serwer mają ustawione fabryczne hasła:
- konto administratora: `password`
- konto gościa: `hello`

Hasło gościa możesz zostawić bez zmian - jest to wyłącznie telemetria, np. temperatura, napięcie i tak dalej.

> [!CAUTION]
> Hasła administracyjne należy natychmiast zmienić w trakcie pierwszej konfiguracji!

## Legalność i duty cycle
`869,40-869,65 MHz` jest pasmem bezlicencyjnym (SRD: Short Range Device), a nie amatorskim. Nie potrzebujesz więc licencji krótkofalarskiej, żeby korzystać z MeshCore (869,618 MHz).

- Limit mocy to `500 mW ERP` (27 dBm)
- Limit duty cycle to **10%** (maksymalnie około 6 minut nadawania na godzinę)

Domyślny duty cycle dla repeaterów po sflashowaniu firmware to `50%`. To pięć razy więcej niż dopuszcza prawo dla tego zakresu. Ustaw na `10%` komendą CLI:
```mccli
set dutycycle 10
```

### Czy 10% duty cycle nie ogranicza za bardzo sieci?
Do komunikacji tekstowej w zupełności to wystarczy. Realny czas nadawania pojedynczego pakietu to zwykle od kilkuset milisekund do 1,6 sekundy (zależnie od długości wiadomości).
Poniżej znajdziesz zmierzone wartości naszym domyślnym presecie `EU/UK Narrow`:

| Pakiet                                                    | Companion | Repeater (+1 hop) |
|-----------------------------------------------------------|-----------|-------------------|
| Advert 0-hop                                              | 1167 ms   | -                 |
| Advert do wszystkich                                      | 1167 ms   | 1183 ms           |
| Wiadomość „h” (1 znak)                                    | 517 ms    | 533 ms            |
| Wiadomość z pangramem „The quick brown fox...” (43 znaki) | 800 ms    | 817 ms            |
| Wiadomość Lorem ipsum (135 znaków, limit)                 | 1583 ms   | 1600 ms           |

~ Źródło: [MeshCore Packet Capture | LoRa 869.618 MHz · 62.5 kHz · SF8 · CR8 | Airtime](https://www.youtube.com/watch?v=mbBEsTQGjNI) autorstwa Sefinek

Nawet najdłuższy z tych pakietów, trwający około 1,6 sekundy, zmieściłby się teoretycznie około 225 razy w budżecie 6 minut nadawania na godzinę.
Należy jednak pamiętać, że każdy repeater nadaje cały pakiet ponownie. Wartość 16-17 ms widoczna w pomiarach oznacza jedynie wzrost długości retransmitowanego pakietu, wynikający między innymi z dodania informacji o trasie.

W typowej sieci większym ograniczeniem niż sam limit duty cycle może być skalowalność.
Repeater przekazuje nie tylko wiadomości, lecz także pakiety rozgłoszeniowe (flood routed), które odbiera od urządzeń znajdujących się w jego zasięgu.
Dlatego przy dużym zagęszczeniu repeaterów nie warto uruchamiać kolejnego, jeśli nie poprawi on zasięgu ani nie połączy odseparowanych obszarów.
W takim scenariuszu dodatkowy repeater będzie tylko niepotrzebnie zwiększał liczbę retransmisji oraz potencjalnie powodował kolizje pakietów w eterze.

Warto również pamiętać, że MeshCore posiada także system kolejek TX: 32 sloty dla RPT i RS oraz 16 dla companiona. Gdy kolejka się zapełni, pakiety po prostu czekają na swoją kolej.

### Moc nadajnika i zysk anteny
Pamiętaj, że liczy się moc promieniowana (ERP), nie moc samego modułu. Zysk anteny (zobacz [listę anten](https://meshcorepolska.org/dokumentacja/meshcore/anteny)) dolicza się do mocy nadajnika.
Antena kierunkowa z wysokim zyskiem, ustawiona na maksymalną moc, łatwo przekroczy limit.

### Jak obliczyć ERP?
`moc nadajnika w dBm` + `zysk anteny w dBi` - `2,15 dB`. Ta poprawka wynika z różnicy między:
- izotropem (dBi, punkt teoretyczny promieniujący równomiernie)
- anteną dipolową (dBd), do której odnosi się ERP

Pamiętaj, że dB to skala logarytmiczna.
W tym wzorze najpierw sumujesz wartości w dB (moc nadajnika, zysk anteny, straty), dopiero na końcu odczytujesz sumę w mW - nie sumuje się osobno wartości w mW na każdym etapie.

| dBm                                | mW                                      |
|------------------------------------|-----------------------------------------|
| <span class="is-legal">20</span>   | <span class="is-legal">100,0</span>     |
| <span class="is-legal">21</span>   | <span class="is-legal">125,9</span>     |
| <span class="is-legal">22</span>   | <span class="is-legal">158,5</span>     |
| <span class="is-legal">23</span>   | <span class="is-legal">199,5</span>     |
| <span class="is-legal">24</span>   | <span class="is-legal">251,2</span>     |
| <span class="is-legal">25</span>   | <span class="is-legal">316,2</span>     |
| <span class="is-legal">26</span>   | <span class="is-legal">398,1</span>     |
| <span class="is-legal">27</span>   | <span class="is-legal">501,2</span>     |
| <span class="is-illegal">28</span> | <span class="is-illegal">631,0</span>   |
| <span class="is-illegal">29</span> | <span class="is-illegal">794,3</span>   |
| <span class="is-illegal">30</span> | <span class="is-illegal">1 000,0</span> |
| <span class="is-illegal">31</span> | <span class="is-illegal">1 258,9</span> |
| <span class="is-illegal">32</span> | <span class="is-illegal">1 584,9</span> |
| <span class="is-illegal">33</span> | <span class="is-illegal">1 995,3</span> |
| <span class="is-illegal">34</span> | <span class="is-illegal">2 511,9</span> |
| <span class="is-illegal">35</span> | <span class="is-illegal">3 162,3</span> |
| <span class="is-illegal">36</span> | <span class="is-illegal">3 981,1</span> |

27 dBm to prawie dokładnie 500 mW, dlatego jest jeszcze legalne. Każde złącze, przejściówka, kabel antenowy czy filtr pasmowy wprowadzają stratę, więc realny budżet mocy rzadko wychodzi równo.

**Scenariusz:** moduł nadający `20 dBm` z anteną `ATK-10` (`12,8 dBi` z [listy anten](https://meshcorepolska.org/dokumentacja/meshcore/anteny))  
**Obliczenie:** 20 + 12,8 - 2,15 = 30,65 dBm  
**Werdykt:** około `1161 mW` - ponad dwa razy więcej niż dozwolone `500 mW`. Nielegalne.
