const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const closeMenu = () => { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Åpne meny'); mobileNav.hidden = true; };
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Lukk meny' : 'Åpne meny');
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const services = {
  support: { title: 'Support & brukerstøtte', description: 'Når noe stopper opp, trenger dere noen som tar tak. Vi hjelper med daglige IT-problemer og finner ut hva som skal til for å komme videre.', points: ['Hjelp på telefon og med avtalt fjernstyring', 'Feilsøking på PC, Mac og Linux', 'Praktisk hjelp med e-post, programmer og tilkoblinger', 'Oppmøte på kontoret etter avtale'] },
  drift: { title: 'IT-drift & vedlikehold', description: 'Vi skaper oversikt over miljøet deres og avtaler en konkret plan for oppfølging. Slik blir det enklere å vedlikeholde utstyret og planlegge endringer.', points: ['Oppsett og administrasjon av arbeidsmaskiner', 'Avtalte oppdateringer og vedlikeholdsrutiner', 'Dokumentasjon av utstyr, tilganger og leverandører', 'Oppfølging av sikkerhetskopiering etter avtale'] },
  sky: { title: 'Microsoft 365 & Azure', description: 'Gode skytjenester skal gjøre det enklere å jobbe sammen. Vi hjelper med oppsett, administrasjon og bruk, med omfang tilpasset bedriften.', points: ['E-post, Teams, SharePoint og Microsoft 365', 'Brukerkontoer, tilganger og enhetsoppsett', 'Kartlegging og oppsett av Azure-miljøer', 'Planlagt flytting og endringer etter eget tilbud'] },
  nettverk: { title: 'Nettverk & Wi-Fi', description: 'Et nettverk skal passe lokalene og jobben dere gjør. Vi kartlegger dagens løsning, finner flaskehalser og hjelper med et ryddig oppsett.', points: ['Oppsett og feilsøking av nettverk og trådløs dekning', 'Tilkobling av arbeidsplasser og nettverksutstyr', 'Ryddig dokumentasjon av konfigurasjon', 'Kontakt med internettleverandør ved behov'] },
  utstyr: { title: 'Innkjøp & klargjøring', description: 'Vi hjelper dere å velge riktig utstyr og gjøre det klart til bruk. Innkjøpsarbeid, maskinvare og oppsett avtales og prises før bestilling.', points: ['Behovsvurdering og valg av PC, Mac og tilbehør', 'Innkjøpsbistand og koordinering av levering', 'Installasjon av programmer og brukerkontoer', 'Klargjøring og overlevering til medarbeideren'] },
  kontor: { title: 'Print, skann & møterom', description: 'Alt det praktiske på kontoret må også fungere. Vi hjelper med å få utstyr koblet opp og i bruk, og samarbeider med produsentens serviceapparat når det er nødvendig.', points: ['Oppsett av printere og skann til e-post', 'Håndskannere og etikettprintere etter kartlegging', 'Tilkobling av skjermer, TV-er og smartboards', 'Oppsett og feilsøking av møteromsutstyr'] }
};
const serviceDialog = document.querySelector('#service-dialog');
const privacyDialog = document.querySelector('#privacy-dialog');
let activeService = '';
const openDialog = dialog => { dialog.showModal(); document.body.classList.add('dialog-open'); };
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  activeService = button.dataset.service;
  const item = services[activeService];
  document.querySelector('#dialog-title').textContent = item.title;
  document.querySelector('#dialog-description').textContent = item.description;
  document.querySelector('#dialog-list').replaceChildren(...item.points.map(point => {
    const li = document.createElement('li');
    const check = document.createElement('span'); check.textContent = '✓'; check.setAttribute('aria-hidden', 'true');
    li.append(check, document.createTextNode(point)); return li;
  }));
  openDialog(serviceDialog);
}));
const interest = document.querySelector('#interest');
document.querySelector('#dialog-contact').addEventListener('click', () => {
  const mapping = { support: 'Support', drift: 'IT-avtale', sky: 'Sky', nettverk: 'Annet', utstyr: 'Utstyr', kontor: 'Utstyr' };
  interest.value = mapping[activeService]; serviceDialog.close();
});
document.querySelector('[data-open-privacy]').addEventListener('click', () => openDialog(privacyDialog));
[serviceDialog, privacyDialog].forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

const users = document.querySelector('#users');
const format = value => new Intl.NumberFormat('nb-NO').format(value);
const updatePrice = () => {
  const count = Math.min(50, Math.max(1, Number(users.value) || 1));
  users.value = count;
  document.querySelector('#user-count').value = String(count);
  document.querySelector('#monthly-price').textContent = format(Math.max(3990, 1990 + count * 299));
  document.querySelector('#breakdown-users').textContent = String(count);
  document.querySelector('#users-price').textContent = `${format(count * 299)} kr`;
  document.querySelector('#minimum-notice').hidden = 1990 + count * 299 >= 3990;
  document.querySelector('#decrease-users').disabled = count === 1;
  document.querySelector('#increase-users').disabled = count === 50;
  users.setAttribute('aria-valuetext', `${count} PC-brukere, ${format(Math.max(3990, 1990 + count * 299))} kroner per måned`);
};
users.addEventListener('input', updatePrice);
document.querySelector('#decrease-users').addEventListener('click', () => { users.value = Number(users.value) - 1; updatePrice(); });
document.querySelector('#increase-users').addEventListener('click', () => { users.value = Number(users.value) + 1; updatePrice(); });
document.querySelector('#price-contact').addEventListener('click', () => {
  interest.value = 'IT-avtale';
  const message = document.querySelector('#message');
  if (!message.value.trim()) message.value = `Hei! Vi ønsker en prat om IT-avtale for omtrent ${users.value} PC-brukere.`;
});
updatePrice();

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const feedback = document.querySelector('#form-feedback');
  feedback.textContent = 'Sånn vil det fungere! I den ferdige løsningen sendes forespørselen til Driftslaget. Dette er en demo — ingenting er sendt eller lagret.';
  feedback.hidden = false; feedback.focus({ preventScroll: true });
  feedback.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
});
document.querySelector('#year').textContent = String(new Date().getFullYear());

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .05 });
  document.documentElement.classList.add('js-motion');
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
