---
title: Wprowadzenie do pyMC
description: Poznaj pyMC - implementację protokołu MeshCore w Pythonie, uruchamianą na Linuksie, wraz z konsolą pymc_console i rekomendowanym, kompatybilnym sprzętem.
createdAt: 12.05.2026
sourceUrl: https://blog.meshcore.io/2026/05/12/pymc-intro
tags: [Narzędzia]
---

# Wprowadzenie do pyMC
![Pokój kontrolny pyMC](https://blog.meshcore.io/assets/images/2026/05/12/control-room.png)

Czym jest pyMC? W swojej istocie pyMC to implementacja stosu kompatybilnego z MeshCore, napisana w Pythonie.
Zaprojektowana została do działania na systemach opartych na Linuksie i łączenia wbudowanych radiów LoRa z usługami działającymi na wyższym poziomie.
Zaczęło się jako sposób na lepsze zrozumienie protokołu MeshCore, ale dość szybko stało się czymś bardziej użytecznym: wielokrotnego użytku biblioteką rdzeniową do budowania elastycznej infrastruktury mesh opartej na Linuksie. `pymc core` odpowiada za pracę na poziomie protokołu:

- Parsowanie i generowanie pakietów MeshCore
- Zarządzanie tożsamościami i adresowaniem
- Utrzymywanie zgodności w miarę ewolucji protokołu
- Obsługę interfejsów radiowych (SPI, KISS, USB-CH341)

Przy ponad 15 obsługiwanych obecnie płytkach i wielu kolejnych w fazie rozwoju, system wyrósł z prostego eksperymentu w praktyczny zestaw narzędzi do budowania i uruchamiania rozproszonej infrastruktury mesh.

Na bazie pyMC core działa `pymc repeater`, który zajmuje się stroną operacyjną:

- Przetwarzaniem pakietów
- Stosowaniem logiki trasowania i filtrowania
- Przekazywaniem ruchu dalej
- Obsługą usług takich jak room serwery, companiony oraz eksport danych obserwatora

Wbudowany firmware jest wydajny i dobrze dopasowany do dedykowanych urządzeń, ale działa w ścisłych ograniczeniach zasobów. Uruchomienie pyMC na Linuksie poszerza przestrzeń projektową: więcej mocy obliczeniowej, lepsze narzędzia, łatwiejsze debugowanie i głębszy wgląd w czasie rzeczywistym w zachowanie sieci mesh.

Kluczową decyzją projektową jest sposób obsługi tożsamości. Zamiast zakładać, że jeden fizyczny węzeł to jedna logiczna obecność, pyMC pozwala na istnienie wielu tożsamości na tym samym radiu.

W praktyce jedno urządzenie może przyjmować wiele ról. Może działać jako przemiennik, reprezentować różne logiczne punkty końcowe, albo hostować dodatkowe usługi - każda z własnym kontekstem.

Ta elastyczność pozwala, by `pymc repeater` ewoluował w stację bazową obsługującą wielu companionów jednocześnie. W tym momencie zachowuje się mniej jak zwykły przemiennik pakietów, a bardziej jak lekki hub wiadomości dla sieci mesh.

Inaczej mówiąc: pyMC daje MeshCore natywną powierzchnię działania na Linuksie. Może uruchamiać przemienniki, hostować usługi, zasilać analitykę lub wspierać zupełnie nowe aplikacje mesh - bez utraty kompatybilności z bazową warstwą radiową.

![Mapa w pyMC](https://blog.meshcore.io/assets/images/2026/05/12/image.pymc-map.webp)
![Statystyki w pyMC](https://blog.meshcore.io/assets/images/2026/05/12/image.pymc-stats.webp)
![Statystyki systemowe w pyMC](https://blog.meshcore.io/assets/images/2026/05/12/image.pymc-system-stats.webp)

## Gdzie mieści się pymc_console
Jednym z przykładów tej szerszej przestrzeni projektowej jest `pymc_console` - działający w przeglądarce dashboard zbudowany na bazie pymc repeater.

Tam, gdzie pyMC zajmuje się warstwą protokołu i przemiennika, `pymc_console` przekształca tę aktywność w coś, co faktycznie można zobaczyć i zrozumieć. Przepływ pakietów, stan radia, podłączone tożsamości, dane z obserwatora, wykorzystanie czasu antenowego oraz zachowanie sieci - wszystko to można wyświetlić w znacznie bardziej przystępnym interfejsie.

Ma to znaczenie, bo sieć mesh trudno jest ulepszać, jeśli jest niewidoczna. Gdy pakiety, trasy, jakość sygnału i wzorce wykorzystania stają się obserwowalne, przemiennik przestaje być zwykłym węzłem przekazującym - staje się lokalnym oknem na kondycję i zachowanie sieci mesh.

W tym sensie `pymc_console` to nie tyle osobny pomysł, co naturalne rozszerzenie architektury pyMC. Ten sam, natywny dla Linuksa fundament, który pozwala pyMC rozmawiać z radiami, umożliwia też budowanie analityki, dashboardów, doświadczeń companiona i nowych narzędzi wokół sieci mesh.

![Konsola pymc_console](https://blog.meshcore.io/assets/images/2026/05/12/image-console.webp)
![Mapa w pymc_console](https://blog.meshcore.io/assets/images/2026/05/12/image-console-map.webp)
![Companion w pymc_console](https://blog.meshcore.io/assets/images/2026/05/12/image-console-compan.webp)

Ciekawe jest nie tylko to, co pyMC robi dzisiaj, ale to, co umożliwia w praktyce.

Jeśli chcesz to zbadać, uruchomić samodzielnie albo śledzić rozwój projektu, wszystko, czego potrzebujesz na start, jest dostępne.

## Od czego zacząć
Kod źródłowy i instrukcje konfiguracji znajdziesz na [https://github.com/pyMC-dev](https://github.com/pyMC-dev/pyMC_Repeater#pymc_repeater)

Albo dołącz do nas na Discordzie pyMC: [https://discord.gg/hRjW9ha6m](https://discord.gg/hRjW9ha6m)

## Polecany sprzęt
Dla bezproblemowej konfiguracji pyMC polecam następujące, przetestowane i kompatybilne platformy sprzętowe. MeshToad i MeshTadpole świetnie sprawdzają się przy lekkich instalacjach, domowych labach i użytku biurkowym, natomiast PiMesh to doskonałe rozwiązanie oparte na Raspberry Pi do zastosowań infrastrukturalnych i bramkowych. Dla instalacji skupionych na roli przemiennika, UltraPeater Luckfox Pico Ultra HAT oferuje kompaktową i wydajną, dedykowaną platformę przemiennika.

- MeshToad V3 - [https://muzi.works/products/nullhop-meshtoad-v3](https://muzi.works/products/nullhop-meshtoad-v3)
- MeshTadpole SX1262 USB Stick - [https://www.elecrow.com/meshtadpole-sx1262-usb-stick.html](https://www.elecrow.com/meshtadpole-sx1262-usb-stick.html)
- PiMesh - [https://meshsmith.net/](https://meshsmith.net/)
- UltraPeater - [https://zindello.com.au/ultrapeater/](https://zindello.com.au/ultrapeater/)

![Polecany sprzęt pod pyMC](https://blog.meshcore.io/assets/images/2026/05/12/pymc-gear.jpeg)
