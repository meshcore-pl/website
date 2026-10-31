---
title: Tryb repeat companiona na Wio Tracker L1 Pro
description: Jak włączyć tryb repeat companiona na Wio Tracker L1 Pro? Poradnik Seeed Studio z testem terenowym i wskazówkami dla tymczasowej instalacji.
createdAt: 23.10.2026
themeColor: '#cadac9'
sourceUrl: https://blog.meshcore.io/2026/10/23/repeat-mode-tracker-l1-pro
tags: [Poradnik, Sprzęt]
---

# Jak włączyć i przetestować tryb repeat na Wio Tracker L1 Pro?
Gdy grupa na wędrówce rozciąga się poza bezpośredni zasięg radiowy, urządzenie znajdujące się pomiędzy skrajnymi osobami może pomóc w przekazywaniu wiadomości. Ten poradnik pokazuje, jak włączyć tryb repeat companiona (Companion Repeat Mode) na [Wio Tracker L1 Pro](https://www.seeedstudio.com/Wio-Tracker-L1-Pro-for-Meshcore-p-6717.html?sensecap_affiliate=lLZqP0c&referring_service=blog.meshcore.io), sprawdzić, czy przekazywanie działa, i wykorzystać wyniki testu terenowego z trzema urządzeniami do zaplanowania tymczasowej instalacji.

## Jak pomaga tryb repeat companiona
Podczas wędrówki grupa potrafi się rozciągnąć - część osób idzie z przodu, a inne zostają z tyłu. Jeśli urządzenia na początku i na końcu nie mogą już wymieniać wiadomości bezpośrednio, a w pobliżu nie ma repeatera, jak utrzymać łączność w grupie?

MeshCore domyślnie nie pozwala urządzeniom Companion przekazywać pakietów dalej. W niektórych sytuacjach off-grid tryb repeat companiona pozwala urządzeniu przejąć tymczasową rolę przekaźnika. Zabraliśmy w teren trzy urządzenia L1 Pro, aby sprawdzić, jak taka konfiguracja działa - i co warto wziąć pod uwagę, zanim się na niej oprzesz.

![Trzy urządzenia Wio Tracker L1 Pro](https://blog.meshcore.io/assets/images/2026/10/24/image%205.png)

Wio Tracker L1 Pro łączy w jednym przenośnym urządzeniu wbudowany akumulator 2000 mAh, wyświetlacz OLED, antenę i ochronną obudowę. Można go nosić w kieszeni lub przypiąć do plecaka smyczą albo haczykiem. Wyświetlacz przydaje się do sprawdzania stanu urządzenia, a wbudowany akumulator sprawia, że L1 Pro nadaje się do kilkugodzinnego testu w terenie. Szczegóły produktu znajdziesz w [przeglądzie serii Wio Tracker L1](https://wiki.seeedstudio.com/wio_tracker_l1_node/?sensecap_affiliate=lLZqP0c&referring_service=blog.meshcore.io).

![Wio Tracker L1 Pro](https://blog.meshcore.io/assets/images/2026/10/24/image%202.png)

## Włączanie trybu repeat companiona
W tej konfiguracji A i C to dwa skrajne urządzenia, a B to urządzenie pomiędzy nimi, które będzie przekazywać wiadomości. Aby włączyć Repeat Mode na B, wykonaj poniższe kroki:

1. Ustaw wszystkie uczestniczące urządzenia na to samo, obsługiwane ustawienie radiowe off-grid.
2. Połącz aplikację MeshCore z urządzeniem B i otwórz jego ustawienia radiowe.
3. Włącz **Repeat Mode**.
4. Zapisz ustawienie i zostaw B włączone pomiędzy A i C.

![Włączanie Repeat Mode w aplikacji](https://blog.meshcore.io/assets/images/2026/10/24/image%203.png)

Jeśli aplikacja ostrzeże, że wybrana częstotliwość nie obsługuje Repeat Mode, wybierz obsługiwane ustawienie off-grid, które jest dozwolone w Twojej lokalizacji. MeshCore ogranicza tryb repeat companiona do wybranych konfiguracji off-grid, aby przenośne urządzenia klienckie nie generowały niepotrzebnego ruchu przekazującego w publicznej sieci mesh.

**W naszej konfiguracji B nadal korzystało z firmware Companion** - Repeat Mode włączyliśmy przez aplikację, bez ponownego wgrywania firmware dedykowanego repeatera. Po zapisaniu ustawienia urządzenie samo zajmowało się przekazywaniem.

## Co zaobserwowaliśmy w terenie
Następnie przetestowaliśmy tę konfigurację na zewnątrz, aby sprawdzić, jak połączenie z telefonem i umiejscowienie przekaźnika wpływają na dostarczanie wiadomości. Podczas testu wszystkie trzy urządzenia działały na tej samej wersji firmware Companion i korzystały z opisanych wyżej ustawień radiowych. Przed testem wymieniły się advertami i zostały dodane jako kontakty. Wybraliśmy ustawienie off-grid obsługiwane przez aplikację i firmware oraz potwierdziliśmy, że wybrana częstotliwość jest odpowiednia dla miejsca testu.

Odległości w linii prostej wynosiły około **4 km z A do B** i **4 km z B do C**. W testach 1-3 urządzenie B pozostawało w tym samym miejscu, otoczone drzewami.

![Schemat testu terenowego](https://blog.meshcore.io/assets/images/2026/10/24/image%204.png)

W teście 4 urządzenia A i C zostały na miejscu, a B przeniesiono mniej więcej prostopadle do linii A-C, w wyżej położone, bardziej otwarte miejsce. Odległości A-B i B-C pozostały w przybliżeniu bez zmian.

![Wyniki testów](https://blog.meshcore.io/assets/images/2026/10/24/image%201.png)

W każdej rundzie wysyłaliśmy z A do C dziesięć krótkich wiadomości:

Wyniki pokazują, że B nadal przekazywało wiadomości po rozłączeniu telefonu. Przeniesienie B w wyższe, bardziej otwarte miejsce zwiększyło skuteczność dostarczania z **4/10 do 8/10**, mimo w przybliżeniu niezmienionych odległości. W tym teście poprawa położenia przekaźnika znacząco wpłynęła na niezawodność komunikacji.

## Praktyczne wskazówki dla tymczasowej instalacji
Wyniki z terenu pokazują, jak wiele może zmienić umiejscowienie przekaźnika. Zanim użyjesz tej konfiguracji na wyjeździe, sprawdź poniższe.

1. **Uzgodnij ustawienie radiowe, zanim stracisz zasięg.** Wszystkie węzły w grupie muszą używać zgodnych ustawień. Wybierz obsługiwaną konfigurację off-grid, która jest legalna w Twoim regionie, i przetestuj ją przed wyjazdem.
2. **Postaw przekaźnik tam, gdzie słyszy obie strony.** Urządzenie w plecaku może być ekranowane przez ciało użytkownika lub otaczające materiały. Spróbuj przypiąć B na zewnątrz plecaka, trzymać antenę w pionie albo umieścić je wyżej i nieruchomo. Zmieniaj jedną rzecz naraz, aby wiedzieć, co faktycznie pomogło.
3. **Pilnuj zużycia baterii.** L1 Pro ma wbudowany akumulator 2000 mAh, ale rzeczywisty czas pracy zależy od użytkowania i warunków. Zanotuj poziom baterii przed każdym testem i po nim, a na dłuższe wyjścia zabierz powerbank. Nie zakładaj, że companion dorówna czasem pracy dedykowanego, zoptymalizowanego pod kątem energii repeatera.

## Kiedy użyć dedykowanego repeatera
Tryb repeat companiona jest przydatny, gdy grupa na wędrówce, zespół terenowy lub tymczasowe wydarzenie plenerowe potrzebuje szybkiego przekaźnika, a nie ma dostępnego stałego repeatera. Może też pomóc zespołom zmapować zasięg, zanim zdecydują, gdzie zainstalować dedykowane repeatery.

![Wio Tracker L1 Pro w terenie](https://blog.meshcore.io/assets/images/2026/10/24/image.png)

**To nie jest zamiennik dobrze umiejscowionego, stale zasilanego repeatera.** Przenośny węzeł może się przemieścić, rozładować lub opuścić trasę, na której potrzebują go inni użytkownicy. Do stałego obszaru zasięgu lub długoterminowej publicznej sieci mesh używaj infrastruktury zaprojektowanej do tej roli. L1 Pro może zostać w kieszeni jako Companion podczas zwykłego użytkowania - i stać się tymczasowym przekaźnikiem, gdy grupa wyjdzie poza istniejący zasięg MeshCore.
