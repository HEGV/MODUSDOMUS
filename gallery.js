const galleryTranslations={
  hr:{back:"← Povratak na početnu",kicker:"ODABRANI RADOVI",title:"Galerija namještaja po mjeri",intro:"Odaberite kategoriju. Fotografije su prikazane bez rastezanja i nepotrebnog rezanja.",filterAll:"Svi radovi",filterRooms:"Sobe i ormari",filterKitchens:"Kuhinje",filterLiving:"Dnevni prostori",rooms:"Sobe i ormari po mjeri",kitchens:"Kuhinje po mjeri",living:"Moderni dnevni prostori",ctaTitle:"Imate ideju za svoj prostor?",cta:"Kontaktirajte nas →"},
  en:{back:"← Back to home",kicker:"SELECTED WORK",title:"Custom furniture gallery",intro:"Choose a category. Photos are shown without stretching or unnecessary cropping.",filterAll:"All projects",filterRooms:"Bedrooms and wardrobes",filterKitchens:"Kitchens",filterLiving:"Living spaces",rooms:"Bedrooms and custom wardrobes",kitchens:"Custom kitchens",living:"Modern living spaces",ctaTitle:"Do you have an idea for your space?",cta:"Contact us →"},
  de:{back:"← Zurück zur Startseite",kicker:"AUSGEWÄHLTE ARBEITEN",title:"Galerie für Möbel nach Mass",intro:"Wählen Sie eine Kategorie. Die Fotos werden ohne Verzerrung oder unnötigen Beschnitt gezeigt.",filterAll:"Alle Arbeiten",filterRooms:"Schlafzimmer und Schränke",filterKitchens:"Küchen",filterLiving:"Wohnbereiche",rooms:"Schlafzimmer und Einbauschränke",kitchens:"Küchen nach Mass",living:"Moderne Wohnbereiche",ctaTitle:"Sie haben eine Idee für Ihren Raum?",cta:"Kontaktieren Sie uns →"}
};

const langButtons = document.querySelectorAll('.gallery-lang');
langButtons.forEach(button => button.addEventListener('click', () => setGalleryLanguage(button.dataset.lang)));
function setGalleryLanguage(lang) {
  MD.applyLanguage(lang, galleryTranslations, 'data-g18n');
}
setGalleryLanguage(MD.getLanguage());

const lightbox = document.getElementById('galleryLightbox');
const lightboxImg = lightbox.querySelector('img');
const closeButton = lightbox.querySelector('.gallery-lightbox-close');
let opener = null;
let scrollPosition = 0;
let originalBodyStyle = null;

function closeLightbox() {
  if (lightbox.open) lightbox.close();
}
document.querySelectorAll('[data-full]').forEach(button => {
  button.addEventListener('click', () => {
    // Older browsers still allow viewing the original image.
    if (typeof lightbox.showModal !== 'function') {
      window.location.assign(button.dataset.full);
      return;
    }
    opener = button;
    lightboxImg.src = button.dataset.full;
    lightboxImg.alt = button.querySelector('img').alt;
    scrollPosition = window.scrollY;
    originalBodyStyle = document.body.getAttribute('style');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    lightbox.showModal();
    closeButton.focus({ preventScroll: true });
  });
});
closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener('close', () => {
  lightboxImg.removeAttribute('src');
  if (originalBodyStyle === null) document.body.removeAttribute('style');
  else document.body.setAttribute('style', originalBodyStyle);
  const previousScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, scrollPosition);
  document.documentElement.style.scrollBehavior = previousScrollBehavior;
  if (opener && opener.isConnected) opener.focus({ preventScroll: true });
  opener = null;
});

const gallerySections = document.querySelectorAll('.gallery-section[data-category]');
const filterButtons = document.querySelectorAll('.gallery-filter-button');
function currentGalleryFilter() {
  const value = window.location.hash.slice(1);
  return ['sobe', 'kuhinje', 'dnevni'].includes(value) ? value : 'all';
}
function applyGalleryFilter(filter) {
  gallerySections.forEach(section => {
    const hidden = filter !== 'all' && section.dataset.category !== filter;
    section.hidden = hidden;
    section.classList.toggle('is-hidden', hidden);
  });
  filterButtons.forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    const hash = filter === 'all' ? '' : '#' + filter;
    // Update without the native jump to a section; Back restores the filter.
    if (window.location.hash !== hash) {
      history.pushState(null, '', window.location.pathname + window.location.search + hash);
    }
    applyGalleryFilter(filter);
    window.scrollTo({ top: 0, behavior: MD.reducedMotion() ? 'auto' : 'smooth' });
  });
});
window.addEventListener('popstate', () => applyGalleryFilter(currentGalleryFilter()));
window.addEventListener('hashchange', () => applyGalleryFilter(currentGalleryFilter()));
applyGalleryFilter(currentGalleryFilter());
