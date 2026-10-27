# Driftslaget

Ferdig responsiv presentasjonsmockup for Driftslaget. Ren HTML, CSS og JavaScript uten installasjon av avhengigheter eller byggesteg.

## Lokal visning

Krever Node.js 20 eller nyere. Kjør `npm run dev` og åpne `http://127.0.0.1:4173`.

`dist/index.html` kan også åpnes direkte. Alle bilder, fonter, stiler og JavaScript følger prosjektet. Statiske webhotell kan bruke `dist/` direkte som publiseringsmappe.

## Innhold og funksjoner

- Mobilmeny, tjenestedialoger, FAQ og kontaktskjema med HTML-validering.
- Priskalkulator: maks(3 990, 1 990 + 299 × antall brukere). Support 1 090 kr/time separat. Alle priser er veiledende konseptpriser eks. mva.
- Kontaktskjema sender og lagrer ingenting. Demoen viser en lokal bekreftelse.
- Ingen cookies, analyseverktøy eller eksterne nettverkskall i selve siden.
- Redusert bevegelse, tastaturnavigasjon, fokusmarkering og semantiske HTML-elementer.
- Egen AI-generert logo og to AI-genererte illustrasjonsfotografier. Avbildede personer er ikke grunnleggere eller faktiske kunder.

## Før faktisk lansering

Bekreft tjenester, priser, åpningstider og kontaktinformasjon. Koble skjema til en valgt mottaker med passende spamvern og personverntekst. Fjern `noindex, nofollow` først når siden skal indekseres. Kontroller rettigheter til navn og domene. Ingen kundereferanser, sertifiseringer eller partnerstatus er oppdiktet i konseptet.

## Filer

- `dist/`: komplett nettsted, klart til statisk hosting.
- `brand/`: originale genererte PNG-filer og bildeprompter.
- `scripts/serve.mjs`: liten lokal forhåndsvisningsserver.
- `.openai/hosting.json`: privat Sites-forhåndsvisning.

Font: Manrope, distribuert med SIL Open Font License. Se `dist/assets/OFL.txt`.
