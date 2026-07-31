# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

Strona [meshcorepolska.org](https://meshcorepolska.org), czyli polska społeczność sieci mesh MeshCore. Express 5 + EJS (SSR), CommonJS, Node >= 20.12. Cała treść strony i komunikaty są po polsku. Licencja PolyForm Noncommercial 1.0.0.

## Uruchamianie

```
node index.js
```

Wymaga pliku `.env` (wzór w `.env.example`; ładowany przez `process.loadEnvFile()`, nie dotenv). Zmienne: `NODE_ENV`, `DOMAIN`, `PORT`, `DISCORD_INVITE_CODE`, `MAP_DOMAIN`, `TCPDATA_HOST`, `TCPDATA_PORT`, `MAILER_HOST`, `MAILER_PORT`, `MAILER_AUTH_USER`, `MAILER_AUTH_PASSWD`. `DOMAIN` to pełny adres strony z protokołem, bez ukośnika na końcu; przypisywany raz przy starcie do `app.locals.domain` i stamtąd widoczny we wszystkich widokach (canonicale, tagi OG). `MAP_DOMAIN` to bazowy adres `mapa.meshcorepolska.org` (bez ukośnika na końcu; w dev wskazuje na lokalną instancję), przypisywany do `app.locals.mapDomain` i wstrzykiwany do `window.MAP_DOMAIN` inline-scriptem w `views/index.ejs` - `public/js/index.js` (statyczny plik, nie EJS) czyta go stamtąd, bo sam nie ma dostępu do zmiennych serwerowych. `TCPDATA_HOST`/`TCPDATA_PORT` wskazują na wewnętrzny, closed-source serwis TCP (patrz `services/tcpClient.js` niżej) - ich brak powoduje `process.exit(1)` już przy imporcie modułu. `MAILER_*` to dane SMTP używane przez `services/mailer.js` do wysyłki maili z formularza kontaktowego.

- Brak kroku budowania. Frontend to czysty CSS i JS serwowane bezpośrednio z `public/`.
- Brak testów (`package.json` nie ma skryptu `test`).
- Lint: `npx eslint .` (flat config w `eslint.config.mjs`; eslint nie jest w devDependencies).
- Produkcja: PM2, aplikacja nazywa się `mcwww` (`ecosystem.config.js`). Deploy: `npm run update` (pull + `npm ci --omit=dev` + `pm2 restart mcwww`). Serwer po starcie wysyła `process.send('ready')` (PM2 `wait_ready`).
- `services/IndexNow.js` to samodzielny skrypt (nie route) do ręcznego zgłaszania URL-i z `public/sitemap.xml` do IndexNow; wymaga pliku klucza w `public/`.
- `services/axios.js` to współdzielona instancja axios z ustawionym `User-Agent` (na podstawie `package.json`) i timeoutem 15s - importować zamiast `require('axios')` bezpośrednio.

## Architektura

`index.js` składa całość: helmet (bez CSP), `express.static('public')`, morgan, rate limiter (tylko w produkcji), timeout, potem routery i obsługa błędów. `app.locals.domain` ustawiany raz przy starcie.

- `routes/Pages.js`: strony statyczne. `/` renderuje `views/index.ejs`, `/discord` przekierowuje na zaproszenie Discord (celowo `discord.com/invite` zamiast `discord.gg`, żeby uniknąć łańcucha przekierowań).
- `routes/Contact.js`: formularz kontaktowy (`GET /kontakt`, `POST /api/v1/kontakt`). Ta sama funkcja renderująca obsługuje zarówno pełny render EJS (`views/contact.ejs`), jak i odpowiedź JSON, w zależności od nagłówka `Accept: application/json` żądania (frontend, `public/js/contact.js`, wysyła fetch z tym nagłówkiem, żeby uniknąć przeładowania strony). Walidacja: honeypot (pole `website`), długość pól, `@sefinek/email-validator` + weryfikacja MX, oraz sprawdzenie przez `services/tcpClient.js`, czy domena maila jest tymczasowa/blacklistowana. Po sukcesie wysyła dwa maile przez `services/mailer.js` - do administratora i potwierdzenie do nadawcy (jako odpowiedź w tym samym wątku, `inReplyTo`/`references`). Podlega dedykowanemu rate limiterowi (`middlewares/ratelimit.js`, `limiter.contactForm`) montowanemu w `index.js` bezpośrednio przed `ContactRouter` - w przeciwieństwie do `limiter.global`, ten limiter działa również w dev (nie jest owinięty w `if (isProd)`).
- `services/mailer.js`: cienki wrapper na `nodemailer`, transport SMTP budowany z `MAILER_*`.
- `services/tcpClient.js`: trzyma jedno, długożyjące połączenie TCP (z auto-reconnectem i exponential backoff) do wewnętrznego, closed-source serwisu (`TCPDATA_HOST`/`TCPDATA_PORT`), niezwiązanego z tym repozytorium. Komunikacja to proste komendy tekstowe z dopisanym ID żądania (`command|reqId\n`), dopasowywanie odpowiedzi po `__reqId` w zwróconym JSON-ie. Udostępnia więcej metod (`geoCheck`, `checkGoodBot`, `checkForbiddenWords`, `checkWeakPassword`, `checkNSFW`, `getDominantColors`, `ipCheck`, `getStats`) niż obecnie wykorzystuje ta strona - w tym repo używane jest wyłącznie `checkTempEmail` (przez `routes/Contact.js`). Każda metoda zwraca `null` przy braku połączenia, timeout (6s) lub błędzie - wywołujący musi to obsłużyć, funkcje nigdy nie rzucają.
- `utils/schema.js`: buduje JSON-LD (`@graph` z `Organization`/`WebSite` zawsze, opcjonalnie `BreadcrumbList`/`FAQPage`/`TechArticle`). Wystawione jako `app.locals.buildSchema`, wołane bezpośrednio z widoków EJS.
- `utils/pluralizePolish.js`: wybiera poprawną formę odmiany rzeczownika po liczebniku wg polskiej gramatyki (`one`/`few`/`many`). Wystawione jako `app.locals.pluralizePolish`, używane w widokach (np. sekcja „Sieć w liczbach”).
- Brak własnego API - `public/js/index.js` fetchuje statystyki repeaterów **bezpośrednio z przeglądarki** pod `${window.MAP_DOMAIN}/api/v1/repeater-stats` (bez backendowego proxy; `window.MAP_DOMAIN` wstrzykiwane inline-scriptem w `views/index.ejs` z `app.locals.mapDomain`/`MAP_DOMAIN` z `.env` - patrz sekcja o zmiennych środowiskowych wyżej). Ten endpoint ma `Access-Control-Allow-Origin` ustawiony po stronie `mapa.meshcorepolska.org`, patrz jej `routes/Api.js`. Tam liczone jest wszystko: `services/nodes.js`, `getStats()`, z danych trzymanych w pamięci procesu tamtej aplikacji, cache'owane w pamięci aż do kolejnego odświeżenia węzłów (nie liczone na nowo przy każdym żądaniu). Odpowiedź zawiera `total`/`active` (repeatery, dla widgetu w hero), `nodes` (wszystkie węzły łącznie), `types` (podział client/repeater/roomServer/sensor), `status` (podział repeaterów wg świeżości `updated_date`: `recent` < 5 dni, `stale` < 10, `old` < 20, `extinct` >= 20, `none` = węzeł dodany ręcznie / `source[0] !== 'u'` - te same progi co w `mapa.meshcorepolska.org/public/js/map.js`, `getNodeUpdateStatus`) oraz `lastRefreshedAt` (kiedy `mapa.meshcorepolska.org` ostatnio pobrała dane z upstreamu, `null` dopóki tamten proces nie wykona własnego pierwszego odświeżenia). Zasila zarówno pigułki statystyk w hero, jak i sekcję „Sieć w liczbach” (`.section--network` w `views/index.ejs`) z kartami liczb i segmentowym paskiem zdrowia sieci. Odpowiedź mapy ma `Cache-Control: public, max-age=60` (cache po stronie przeglądarki, nie ma tu już cache'a serwerowego).
- `utils/renderError.js`: wszystkie błędy (404/429/500/503) renderują `views/error.ejs` z polskim komunikatem; `title`/`description` liczone są w samym widoku na podstawie `status`, bez `canonical` (strony błędów nie mają linku kanonicznego).
- Widoki: `views/includes/header.ejs` przyjmuje płaskie pola `title`, `description`, opcjonalne `keywords`, `noindex`, `canonical` (ścieżka względna, np. `/dokumentacja`; brak = brak `<link rel="canonical">`), `css` (nazwa lub tablica nazw arkuszy w `public/css`) oraz `page` używane jako `data-page` na `<body>`. `domain` pochodzi z `app.locals` (ustawiony raz w `index.js`, widoczny automatycznie wszędzie, bez przeliczania na każdy request). Dane są statyczne albo liczone bezpośrednio w wywołaniu `include`; wyjątkiem jest `routes/Docs.js` dla pojedynczej strony dokumentacji, gdzie `title` i `description` muszą zostać policzone w trasie (bo trafiają też do odpowiedzi JSON używanej przez `docs-router.js`), a `canonical` pochodzi wprost z frontmattera danej strony (`page.canonical`).
- `public/js/mesh-map.js`: animowana mapa Polski na canvasie w hero (kontur kraju z geoBoundaries uproszczony do 300 punktów, deterministyczny PRNG z seedem, graf węzłów z gwarancją spójności, krawędzie testowane na przecięcie z granicą). Zmiana układu siatki = zmiana seeda w `mulberry32(...)`.
- `public/js/index.js`: pobiera statystyki repeaterów i odsłania widget w hero strony głównej.
- `public/js/contact.js`: obsługa formularza kontaktowego - wysyła `POST /api/v1/kontakt` przez `fetch` z `Accept: application/json`, żeby dostać JSON zamiast pełnego renderu, i podmienia stan formularza bez przeładowania strony.
- `public/js/lightbox.js`: powiększanie obrazów w overlayu; podpina się pod każdy link `a[data-lightbox]`.
- `public/js/nav.js`: zachowanie nagłówka (cień przy scrollu, mobilne menu).

### System dokumentacji (`/dokumentacja`)

Treść dokumentacji jest plikami Markdown, renderowanymi server-side, z SPA-podobną nawigacją po stronie klienta.

- `content/docs.js`: statyczna struktura grup i stron (slug, title, icon, description dla każdej grupy; slug/title dla każdej strony). To jedyne źródło prawdy o tym, jakie strony istnieją i w jakiej kolejności.
- `content/docs/<grupa>/<slug>.md`: treść stron, frontmatter (`title`, `description`, `canonical`, `createdAt`, opcjonalnie `updatedAt`) + Markdown. `canonical` to pełna ścieżka względna (np. `/dokumentacja/meshcore/wprowadzenie`), `createdAt`/`updatedAt` w formacie `DD.MM.RRRR`. Każda strona wpisana w `content/docs.js` musi mieć odpowiadający plik `.md`, inaczej `services/docs.js` wyrzuci błąd przy starcie (pliki są czytane synchronicznie raz, przy imporcie modułu).
- `services/docs.js`: wczytuje i parsuje wszystkie strony przy starcie procesu (`marked` + `frontmatter-md`), buduje spis treści (h2/h3) i cache'uje wynik w pamięci (`Map`). Nagłówkom nadaje `id` (slugified, z obsługą polskich znaków diakrytycznych) do kotwiczenia w TOC. Liczy też datę ostatniej modyfikacji (`updatedAt` albo `createdAt`) per strona i per grupa (`group.lastModified`) oraz globalnie (`exports.lastModified`) - `routes/Docs.js` używa tego do nagłówka `Last-Modified`. Zmiana treści `.md` wymaga restartu procesu, nie ma hot reloadu.
- `routes/Docs.js`: trzy trasy - indeks, grupa, pojedyncza strona. Indeks i grupa to zawsze pełny render EJS. Tylko trasa pojedynczej strony (`/dokumentacja/:group/:slug`) potrafi odpowiedzieć na dwa sposoby: pełny render EJS albo JSON z wyrenderowanym fragmentem HTML (gdy request ma nagłówek `X-Docs-Fetch: 1`) - używane przez router kliencki do podmiany treści bez przeładowania strony.
- `public/js/docs-router.js`: ładowany wyłącznie na stronach dokumentów, przechwytuje kliknięcia w linki prowadzące do innych stron dokumentów (`/dokumentacja/:group/:slug`), robi `fetch` z `X-Docs-Fetch: 1`, podmienia `#docs-view` i metadane (title, canonical, OG) bez pełnego przeładowania. Linki do indeksu czy strony grupy nie są przechwytywane - to zwykła nawigacja przeglądarki. Zarządza cyklem życia modułów stron przez `public/js/lib/page.js` (rejestr `init`/`destroy` per moduł, żeby np. listenery scrolla z poprzedniej strony nie zostały po nawigacji).
- `public/js/docs.js`: logika strony treści dokumentacji (podświetlanie bloków kodu, aktywna pozycja w spisie treści przy scrollu, płynne przewijanie do kotwic). Rejestruje się przez `definePage()` z `lib/page.js`, więc `docs-router.js` woła jego `init`/`destroy` przy każdej nawigacji SPA.
- Pliki `public/js/docs.js`, `docs-router.js`, `lib/page.js` to moduły ES (`import`/`export`, `type="module"` w EJS), inne skrypty w `public/js` są zwykłymi skryptami globalnymi ładowanymi z `defer`.

## Styl kodu

- Tabulatory, pojedyncze cudzysłowy, średniki, `prefer-const`, przecinki końcowe w wieloliniowych tablicach/obiektach (patrz `eslint.config.mjs`).
- Nie dodawaj komentarzy w kodzie, właściciel utrzymuje kod bez komentarzy.
- Nie używaj znaku — (pauzy) w plikach zapisywanych do repo.
- Backend (`routes/`, `services/`, `middlewares/`, `utils/`) to CommonJS (`require`/`module.exports`). `public/js` to skrypty przeglądarkowe: większość to globalne IIFE-podobne skrypty bez modułów, ale pliki związane z dokumentacją (`docs.js`, `docs-router.js`, `lib/page.js`) są modułami ES.
