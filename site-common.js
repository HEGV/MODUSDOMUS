/* Shared, dependency-free helpers for Modus Domus. */
(() => {
  'use strict';
  const languages = ['hr', 'en', 'de'];
  const storageKey = 'modusDomusLanguage';
  const validLanguage = value => languages.includes(value);
  function getLanguage() {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (validLanguage(requested)) return requested;
    try {
      const saved = localStorage.getItem(storageKey);
      if (validLanguage(saved)) return saved;
    } catch (_) { /* The website also works when storage is unavailable. */ }
    return 'hr';
  }

  const ui = {
    hr: {
      skip: 'Preskoči na sadržaj', language: 'Odabir jezika', home: 'Modus Domus početna',
      navigation: 'Glavna navigacija', menuOpen: 'Otvori izbornik', menuClose: 'Zatvori izbornik',
      scroll: 'Pomakni se prema dolje', kitchens: 'Otvori galeriju kuhinja',
      rooms: 'Otvori galeriju soba i ormara', living: 'Otvori galeriju dnevnih prostora',
      categories: 'Kategorije galerije', imageDialog: 'Povećani prikaz projekta', close: 'Zatvori',
      subject: 'Upit za ponudu',
      homeTitle: 'Modus Domus | Dizajn i izrada namještaja', galleryTitle: 'Galerija | Modus Domus',
      homeDescription: 'Modus Domus – dizajn i izrada namještaja po mjeri u Hrvatskoj, Europskoj uniji i Švicarskoj.',
      galleryDescription: 'Galerija radova Modus Domus – sobe i ormari, kuhinje i moderni dnevni prostori.'
    },
    en: {
      skip: 'Skip to content', language: 'Choose language', home: 'Modus Domus home',
      navigation: 'Main navigation', menuOpen: 'Open menu', menuClose: 'Close menu',
      scroll: 'Scroll down', kitchens: 'Open kitchen gallery', rooms: 'Open bedroom and wardrobe gallery',
      living: 'Open living space gallery', categories: 'Gallery categories', imageDialog: 'Enlarged project image',
      close: 'Close', subject: 'Request for a quote', homeTitle: 'Modus Domus | Custom furniture design and production',
      galleryTitle: 'Gallery | Modus Domus',
      homeDescription: 'Modus Domus – custom furniture design and production in Croatia, the European Union and Switzerland.',
      galleryDescription: 'Modus Domus project gallery – bedrooms and wardrobes, kitchens and modern living spaces.'
    },
    de: {
      skip: 'Zum Inhalt springen', language: 'Sprache wählen', home: 'Modus Domus Startseite',
      navigation: 'Hauptnavigation', menuOpen: 'Menü öffnen', menuClose: 'Menü schliessen',
      scroll: 'Nach unten scrollen', kitchens: 'Küchengalerie öffnen', rooms: 'Galerie für Schlafzimmer und Schränke öffnen',
      living: 'Galerie für Wohnbereiche öffnen', categories: 'Galeriekategorien', imageDialog: 'Vergrössertes Projektbild',
      close: 'Schliessen', subject: 'Anfrage für ein Angebot', homeTitle: 'Modus Domus | Planung und Fertigung von Möbeln nach Mass',
      galleryTitle: 'Galerie | Modus Domus',
      homeDescription: 'Modus Domus – Planung und Fertigung von Möbeln nach Mass in Kroatien, der Europäischen Union und der Schweiz.',
      galleryDescription: 'Projektgalerie von Modus Domus – Schlafzimmer und Schränke, Küchen und moderne Wohnbereiche.'
    }
  };
  const imageLabels = {
    'sobe-1.jpg': ['Ormar po mjeri', 'Custom wardrobe', 'Schrank nach Mass'],
    'sobe-2.jpg': ['Ugradbeni ormar', 'Built-in wardrobe', 'Einbauschrank'],
    'sobe-3.jpg': ['Klizni ormar', 'Sliding-door wardrobe', 'Schiebetürenschrank'],
    'sobe-4.jpg': ['Soba i ormar po mjeri', 'Bedroom and custom wardrobe', 'Zimmer und Schrank nach Mass'],
    'sobe-6.jpg': ['Unutrašnjost garderobnog ormara', 'Wardrobe interior', 'Innenraum eines Kleiderschranks'],
    'sobe-7.jpg': ['Ormar i ormarić za ulazni prostor', 'Hallway wardrobe and cabinet', 'Schrank und Kommode im Eingangsbereich'],
    'sobe-8.jpg': ['Ugradbeni ormar u spavaćoj sobi', 'Built-in bedroom wardrobe', 'Einbauschrank im Schlafzimmer'],
    'sobe-9.jpg': ['Moderan ormar po mjeri', 'Modern custom wardrobe', 'Moderner Schrank nach Mass'],
    'kuhinja-1.jpg': ['Moderna kuhinja', 'Modern kitchen', 'Moderne Küche'],
    'kuhinja-2.jpg': ['Kutna kuhinja', 'Corner kitchen', 'Eckküche'],
    'kuhinja-3.jpg': ['Kuhinja s poluotokom', 'Kitchen with peninsula', 'Küche mit Halbinsel'],
    'kuhinja-4.jpg': ['Kompaktna kuhinja', 'Compact kitchen', 'Kompakte Küche'],
    'kuhinja-5.jpg': ['Linearna kuhinja po mjeri', 'Custom fitted kitchen run', 'Küchenzeile nach Mass'],
    'dnevni-1.jpg': ['Moderan TV zid', 'Modern TV wall', 'Moderne TV-Wand'],
    'dnevni-2.jpg': ['TV element po mjeri', 'Custom TV unit', 'TV-Möbel nach Mass'],
    'dnevni-3.jpg': ['Dnevni prostor s drvenim detaljima', 'Living space with wood details', 'Wohnbereich mit Holzdetails'],
    'dnevni-4.jpg': ['Kompletan dnevni prostor', 'Complete living space', 'Kompletter Wohnbereich'],
    'dnevni-5.jpg': ['Zidni element za dnevni boravak', 'Living room wall unit', 'Wandelement für das Wohnzimmer']
  };

  function applyLanguage(language, translations, attribute) {
    const lang = validLanguage(language) ? language : 'hr';
    const dictionary = translations[lang] || translations.hr;
    document.documentElement.lang = lang;
    document.querySelectorAll(`[${attribute}]`).forEach(element => {
      const value = dictionary[element.getAttribute(attribute)];
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-lang]').forEach(button => {
      const selected = button.dataset.lang === lang;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-ui]').forEach(element => {
      const value = ui[lang][element.dataset.ui];
      if (value) element.textContent = value;
    });
    document.querySelectorAll('[data-ui-label]').forEach(element => {
      const value = ui[lang][element.dataset.uiLabel];
      if (value) element.setAttribute('aria-label', value);
    });
    document.querySelectorAll('img[src]').forEach(img => {
      const file = img.getAttribute('src').split('/').pop();
      if (imageLabels[file]) img.alt = imageLabels[file][languages.indexOf(lang)];
    });
    const isGallery = Boolean(document.querySelector('.gallery-hero'));
    const title = ui[lang][isGallery ? 'galleryTitle' : 'homeTitle'];
    const description = ui[lang][isGallery ? 'galleryDescription' : 'homeDescription'];
    document.title = title;
    document.querySelectorAll('meta[name="description"], meta[property="og:description"]').forEach(meta => meta.content = description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = title;
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
      if (link.getAttribute('href').includes('?subject=')) {
        link.href = 'mailto:krunoslav.hegedic@gmail.com?subject=' + encodeURIComponent(ui[lang].subject);
      }
    });
    // Keep navigation and copied links in the selected language.
    document.querySelectorAll('a[href]').forEach(link => {
      const raw = link.getAttribute('href');
      if (raw.startsWith('#')) return;
      const url = new URL(raw, window.location.href);
      if (url.origin === window.location.origin && /(?:\/|\/index\.html|\/galerija\.html)$/.test(url.pathname)) {
        url.searchParams.set('lang', lang);
        link.setAttribute('href', url.pathname + url.search + url.hash);
      }
    });
    try { localStorage.setItem(storageKey, lang); } catch (_) { /* Optional preference. */ }
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (_) { /* Local file previews may disallow history updates. */ }
    return lang;
  }

  function reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  const header = document.querySelector('.site-header, .gallery-header');
  function measureHeader() {
    if (header) document.documentElement.style.setProperty('--header-height', Math.ceil(header.getBoundingClientRect().height) + 'px');
  }
  measureHeader();
  if (header && 'ResizeObserver' in window) new ResizeObserver(measureHeader).observe(header);
  window.addEventListener('resize', measureHeader, { passive: true });
  window.MD = Object.freeze({ getLanguage, applyLanguage, reducedMotion, validLanguage, ui });
})();
