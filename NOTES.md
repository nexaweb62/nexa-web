# Nexa Web — Notes du projet

Site vitrine statique (HTML/CSS/JS, sans framework ni build) pour Nexa Web, agence de création de
sites internet basée à Carvin (Hauts-de-France). Dernière mise à jour de ce document : 2026-06-24.

## Infos site

- **Site en ligne** : [nexaaweb.com](https://nexaaweb.com) (nom exact confirmé par le client, pas une coquille)
- **Hébergement** : Netlify — `earnest-shortbread-152019.netlify.app`
- **Domaine** : acheté chez OVH (`nexaaweb.com`), pointé vers Netlify
- **Dossier local** : `C:\Users\ahmou\Documents\nexa-web`

## Structure du site

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil — hero, engagements (timeline), services, pourquoi nous, réalisations, garanties + avis |
| `tarifs.html` | Grille tarifaire (Essentiel / Standard / Premium / Maintenance) |
| `contact.html` | Formulaire de contact |
| `devis.html` | Formulaire de demande de devis (reCAPTCHA v2 + relance Calendly après envoi) |
| `rendez-vous.html` | Réservation d'un appel découverte (Calendly) |
| `projet-atelier-dubois.html` | Étude de cas — site vitrine artisan (orpheline : plus liée depuis `index.html`) |
| `projet-boutique-lea.html` | Étude de cas — e-commerce (orpheline : plus liée depuis `index.html`) |
| `projet-cabinet-martin.html` | Étude de cas — refonte de site (orpheline : plus liée depuis `index.html`) |
| `style.css` | Feuille de style unique, toutes pages |
| `script.js` | i18n, thème clair/sombre, menu, validation formulaires, popups, timeline, reCAPTCHA |
| `chatbot.js` | Widget de chat (appelle le proxy Cloudflare, aucune clé API côté client) |
| `cloudflare-worker.js` | Code du proxy à déployer manuellement sur Cloudflare Workers (non servi par le site) |
| `favicon.svg` / `favicon.ico` | Favicon actuel — cercle noir, "N" blanc + "W" violet `#6366f1` (lien `<head>` ajouté sur `index.html` uniquement). À remplacer par un logo "NW" dédié (voir À FAIRE) |

## Services connectés

| Service | Usage | Identifiants |
|---|---|---|
| **EmailJS** | Envoi des formulaires contact + devis | Service ID `service_nexaweb`, Template ID `template_x66s6ig`, Public Key `0CJOZVh0vzQKV26v5` (en clair dans `script.js` — normal, c'est une clé publique faite pour être exposée côté client) |
| **Formspree** | Formulaire d'avis clients (`index.html`) | ID `xgojwqyo` → endpoint `https://formspree.io/f/xgojwqyo` |
| **Calendly** | Prise de RDV (page rendez-vous, popups téléphone/email, relance après devis) | `https://calendly.com/contact-nexaweb62/30min` |
| **Cloudflare Workers** | Proxy du chatbot, détient la clé Anthropic côté serveur | `https://shy-art-5483.contact-nexaweb62.workers.dev` |
| **Anthropic API** | Modèle utilisé par le chatbot | `claude-haiku-4-5-20251001`, max_tokens 300, prompt système FR ou EN selon la langue du site |
| **Google reCAPTCHA v2** | Anti-spam sur le formulaire de devis (`devis.html`) | Clé de site `6LfxLi4tAAAAAAPSSlHxBoHxaHdTv4sBru9wcSTp` (clé publique, sans risque à exposer) |
| **WhatsApp** | Bouton de chat direct | `https://wa.me/33698840194` |
| **Google Analytics** | Mesure d'audience du site | Compte créé sur analytics.google.com avec `contact.nexaweb62@gmail.com` — Measurement ID `G-XXXXXXXXXX` à compléter dans `index.html` |
| **Google Business Profile** | Fiche établissement (Google Maps / Recherche) | En cours de vérification — courrier postal de validation à recevoir |
| **PayPal Business** | Facturation clients et réception de virements bancaires | Compte `contact.nexaweb62@gmail.com` |
| **PWA** | Site installable sur mobile/desktop, mise en cache des fichiers principaux | `manifest.json` et `sw.js` ajoutés à la racine du projet |

## Clés / identifiants — sécurité

⚠️ **Aucune clé secrète n'est stockée dans ce dépôt.**

- **`ANTHROPIC_API_KEY`** : n'existe dans aucun fichier du projet. Configurée comme variable
  d'environnement **chiffrée** sur le dashboard Cloudflare (Worker → Settings → Variables →
  `ANTHROPIC_API_KEY`, case "Encrypt" cochée). `cloudflare-worker.js` y fait seulement référence via
  `env.ANTHROPIC_API_KEY`.
- **`EMAILJS_PUBLIC_KEY`** et **clé de site reCAPTCHA** : publiques par design, sans risque à exposer
  côté client.
- Pas de clé API Formspree, Calendly ou WhatsApp à gérer (intégrations sans authentification côté
  client).
- ⚠️ Le reCAPTCHA n'est validé que **côté client** (JS bloque l'envoi si la case n'est pas cochée) :
  il n'y a pas de vérification côté serveur du token via l'API Google `siteverify`. Un utilisateur
  techniquement averti pourrait contourner ce blocage. Acceptable pour filtrer le spam basique, pas
  une protection robuste.

## URLs importantes

- **Domaine de production** : `https://nexaaweb.com`
- **Worker Cloudflare (proxy chatbot)** : `https://shy-art-5483.contact-nexaweb62.workers.dev`
  — son `ALLOWED_ORIGIN` est restreint à `https://nexaaweb.com` ; tester en local (`file://`,
  `localhost`) déclenche un blocage CORS normal, pas un bug.
- **Calendly** : `https://calendly.com/contact-nexaweb62/30min`
- **Formspree (avis)** : `https://formspree.io/f/xgojwqyo`
- **Email de contact** : `contact.nexaweb62@gmail.com`
- **Téléphones** : 06 98 84 01 94 / 06 41 46 78 98

## Ce qui est fait

- Site complet avec toutes les sections (accueil, timeline "4 engagements", services, pourquoi nous,
  réalisations, garanties + avis, tarifs, contact, devis, rendez-vous)
- Chatbot IA fonctionnel et bilingue (proxy Cloudflare, clé Anthropic côté serveur)
- Formulaire de contact via EmailJS, avec validation des champs obligatoires
- Formulaire de devis via EmailJS : préremplissage du budget selon la formule choisie, reCAPTCHA v2,
  message de succès suivi de l'ouverture automatique du popup Calendly avec bandeau incitatif
- Section avis clients via Formspree (`index.html`) + avis publiés en dur (Imad/PROXYSERV, Karim
  Benali/KB Plomberie & Chauffage, Lucie Fontaine/Cabinet LF Conseil), avec avatars colorés à
  initiales
- Section "Ce que nos clients disent de nous" : 3 cartes de garantie + les mêmes 3 avis clients
  (étoiles dorées), sous le même style que la section Avis
- Prise de RDV Calendly (page dédiée `rendez-vous.html` + déclenché depuis plusieurs popups)
- Mode sombre/clair (toggle sur les 8 pages)
- Sélecteur de langue FR/EN (i18n complet, `data-i18n` partout, persistance `localStorage`)
- Bouton WhatsApp flottant
- Popup offre de lancement (`index.html`)
- Popup téléphone (clic sur un numéro de la topbar/footer → choix appeler / prendre RDV)
- Popup email (clic sur l'email de la topbar → demander un devis / prendre RDV)
- Timeline verticale "4 engagements" (`index.html`, entre le hero et les services) — ligne et points
  violets, alternance gauche/droite, responsive
- Section Réalisations : 6 cartes avec maquettes de sites **simulées en CSS** (Boulangerie Dupont,
  Garage Martin Auto, Institut Beauté Zen, Cabinet Leroy Conseil, Restaurant Le Terroir, Plombier
  Express 62) — à remplacer par de vraies maquettes (voir À FAIRE)
- Double numéro de téléphone partout, avec popup de choix
- Garantie 30 jours (carte dédiée + badge vert sur les cartes tarifaires)
- Localisation de la topbar cliquable → ouvre Google Maps dans un nouvel onglet
- **GitHub** connecté (repo : [github.com/nexaweb62/nexa-web](https://github.com/nexaweb62/nexa-web))
- **Auto-déploiement Netlify** via GitHub (push sur `main` = mise en ligne automatique)
- 6 pages démo de projets fictifs avec aperçu en modale (remplace les maquettes simulées en CSS)
- Bannière cookies RGPD
- Compteur animé (10+ projets réalisés, 100% clients satisfaits, 7 jours délai moyen, 1 an d'expérience)
- Section FAQ en accordéon (6 questions/réponses)
- Page 404 personnalisée (`404.html`)
- SEO amélioré (title, meta description, keywords, Open Graph, balise canonical)
- Bouton flottant de retour en haut de page
- Mentions légales / CGV / politique RGPD (`mentions-legales.html`)
- `sitemap.xml` soumis à Google Search Console
- Favicon avec logo "NW" dédié
- PWA installable sur mobile (`manifest.json` + `sw.js`)
- Tarifs mis à jour (mention PWA ajoutée aux formules Standard et Premium)
- Formulaire de devis : options de budget estimé nettoyées (500-1000€, 1000-2000€, +2000€)

## À faire

- Finaliser **Google Analytics** (ajouter le Measurement ID `G-XXXXXXXXXX` dans `index.html` une fois le compte validé)
- Finir la vérification de **Google Business Profile** (en attente du courrier postal)
- Ajouter de **vraies captures Screely.com** dans la section Réalisations, à la place des 6 démos fictives actuelles
- Page de remerciement (`merci.html`), animations au scroll renforcées, footer complet, blog (2 articles), modèle de contrat client

## Points en attente / à surveiller

- Le **Worker Cloudflare déployé** doit toujours être manuellement mis à jour (copier-coller le
  contenu de `cloudflare-worker.js`) à chaque modification du fichier local — contrairement au reste
  du site, il n'est pas couvert par l'auto-déploiement Netlify/GitHub.
- Les 3 anciennes pages d'étude de cas (`projet-*.html`) ne sont plus liées depuis `index.html` mais
  existent toujours sur le site (accessibles par URL directe).
- Pas de tests automatisés ni de CI : toutes les vérifications faites sur ce projet l'ont été
  manuellement via un serveur local + Playwright (navigateur headless), à la demande.
