# meshcorepolska.org 🌍
Backend oraz frontend strony www [meshcorepolska.org](https://meshcorepolska.org).

## Współtworzenie
Jeśli chcesz dołożyć swoją cegiełkę do tego projektu, albo po prostu poprawić/ulepszyć dokumentację, śmiało zachęcamy do tego!
[Dokumentacja](https://meshcorepolska.org/dokumentacja) jest dostępna w folderze [content/docs](content/docs).

## Uruchomienie strony
1. Sklonuj to repozytorium.
   ```bash
   git clone https://github.com/meshcore-pl/website meshcorepolska.org
   ```
2. Przejdź do sklonowanego folderu i zainstaluj zależności.
   ```bash
   cd meshcorepolska.org && npm install
   ```
3. Utwórz plik konfiguracyjny na podstawie wzoru `.env.example`.
   ```bash
   cp .env.example .env
   ```
4. Uzupełnij zmienne środowiskowe w pliku `.env`.
   ```bash
   nano .env
   ```
5. Uruchom aplikację. `CTRL^C` aby zakończyć.
   ```bash
   node .
   ```

## Licencja
Kod źródłowy tej witryny jest udostępniany na licencji **PolyForm Noncommercial License 1.0.0**.
Dozwolone jest używanie, kopiowanie, modyfikowanie oraz rozpowszechnianie kodu wyłącznie w celach niekomercyjnych.
Zabronione jest wykorzystywanie projektu, jego kodu lub zmodyfikowanych wersji w celu osiągania korzyści majątkowych, świadczenia płatnych usług, sprzedaży, reklamy lub innej działalności komercyjnej.
