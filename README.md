# Modus Domus – web stranica

## Glavne datoteke
- `index.html` – početna stranica
- `galerija.html` – zasebna galerija radova
- `style.css` – izgled početne stranice
- `gallery.css` – izgled galerije
- `script.js` – jezici i funkcije početne stranice
- `gallery.js` – jezici i povećani prikaz fotografija
- `assets/` – logo, fotografije usluga i galerija

## Objavljivanje na GitHub Pages
Sve datoteke i cijelu mapu `assets` prenesite u glavni direktorij repozitorija.
Datoteka `index.html` mora biti direktno u glavnom direktoriju.

## Kasnije izmjene
- Tekstovi početne stranice: `index.html` i `script.js`
- Tekstovi galerije: `galerija.html` i `gallery.js`
- Fotografije galerije: `assets/gallery`
- Fotografije usluga: `assets/services`

- WhatsApp gumbi koriste poveznicu wa.me (na mobitelu otvara aplikaciju, na računalu WhatsApp Web).

## Verzija 10
Naslovne fotografije u dijelu Naše usluge zamijenjene su novim slikama. Fotografije su prilagođene širokim karticama tako da je cijeli motiv vidljiv bez rastezanja.

## Mobilni prikaz i galerija
- Statistika je na mobitelu prikazana kompaktnije.
- Kartice „Kako radimo“ su na mobitelu raspoređene 2 × 2 i zauzimaju manje prostora.
- Uklonjena je duplicirana fotografija kliznog ormara iz kategorije „Sobe i ormari po mjeri“.

## Verzija 13
- Privremeni kontakt e-mail: `krunoslav.hegedic@gmail.com`.
- Uklonjene su poslovne e-mail adrese na `@domus-modus.hr`.
- Provjeren je vidljivi naziv brenda: `Modus Domus`.

## Verzija 14 (22.11.2026)
- Hrvatski je uvijek zadani jezik: `https://modusdomus.hr/` uvijek se otvara na hrvatskom. Engleski i njemački samo preko `?lang=en` / `?lang=de` (izbor se više ne pamti u pregledniku).
- Uklonjena fotografija `dnevni-4.jpg` (sadržavala je tuđi vodeni žig).
- Fotografije u formatu WebP s JPEG rezervom; naslovna i fotografije usluga u više veličina za mobitel i računalo. Početna stranica: oko 0,4–0,6 MB umjesto 1,6 MB.
- Font Manrope smanjen na potrebne znakove (hrvatski, njemački, engleski).
- Nova stranica `404.html`, slika za dijeljenje `assets/og-modus-domus.jpg` (1200 × 630), strukturirani podaci (JSON-LD), `og:locale`.
- Plutajući WhatsApp gumb skriven je dok je vidljiv naslovni dio (više ne prekriva tekst na mobitelu).
- Bolji kontrast i veće površine za dodir; uklonjen neiskorišteni CSS.

### Nove datoteke slika
- Naslovna: `assets/hero-interior-960/1600/2000.webp`, rezerva `assets/hero-interior-1600.jpg`
- Usluge: `assets/services/<naziv>-900.webp`, `-1800.webp`, rezerva `-1200.jpg`
- Galerija: uz svaki `.jpg` postoji `.webp` istog naziva. Kod dodavanja nove fotografije spremite obje verzije.
