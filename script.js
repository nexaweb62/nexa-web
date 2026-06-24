/* =========================================================
   NEXA WEB — SCRIPT
   0. Traductions (i18n FR / EN)
   1. Thème clair / sombre
   1b. Simulateur de vue mobile/desktop
   2. Menu mobile (burger)
   3. Fermeture du menu au clic sur un lien
   3b. Barre de progression au scroll
   3c. Particules canvas (hero)
   4. Animations au scroll (fade-in)
   4b. Compteur animé (section stats)
   4c. Accordéon FAQ
   4d3. Bouton retour en haut
   5. Préremplissage du champ "Type de projet" (devis.html ?formule=...)
   5d. Calculateur de prix interactif (tarifs.html)
   5e. Préremplissage du devis depuis le calculateur de prix (devis.html ?calcType=...)
   6. Formulaires (contact.html, devis.html) via EmailJS
   7. Avis clients (index.html) via Formspree
   8. Popup téléphone (header, footer, section contact)
   8b. Popup email (topbar)
   8c. Popup réalisations (aperçu projet en iframe)
   9. Popup offre de lancement (index.html)
   9b. Popup de sortie (exit intent, index.html)
   ========================================================= */

const EMAILJS_PUBLIC_KEY = '0CJOZVh0vzQKV26v5';
const EMAILJS_SERVICE_ID = 'service_nexaweb';
const EMAILJS_TEMPLATE_ID = 'template_x66s6ig';

/* ---------- 0. Traductions (i18n FR / EN) ---------- */
const LANG_STORAGE_KEY = 'nexaweb-lang';

const TRANSLATIONS = {
  fr: {
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.serviceVitrine': 'Sites vitrines',
    'nav.serviceEcommerce': 'E-commerce',
    'nav.serviceSeo': 'Référencement SEO',
    'nav.appointment': 'Rendez-vous',
    'nav.why': 'Pourquoi nous',
    'nav.projects': 'Réalisations',
    'nav.reviews': 'Avis',
    'nav.pricing': 'Tarifs',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'header.quoteBtn': 'Devis gratuit',

    'footer.address': 'Carvin, Hauts-de-France',
    'footer.legal': 'Mentions légales',
    'footer.tagline': 'Des sites internet sur-mesure pour les artisans et TPE des Hauts-de-France.',
    'footer.quickLinks': 'Liens rapides',
    'footer.legalTitle': 'Légal',
    'footer.cgv': 'CGV',
    'footer.cookiesPolicy': 'Politique cookies',
    'footer.contactTitle': 'Contact',
    'footer.copyright': '© 2025 Nexa Web — Tous droits réservés — Carvin (62)',

    'phoneModal.title': 'Comment voulez-vous nous contacter ?',
    'phoneModal.call': '📞 Appeler maintenant',
    'phoneModal.appointment': '📅 Prendre un rendez-vous',

    'emailModal.title': 'Comment pouvons-nous vous aider ?',
    'emailModal.devisBtn': '📋 Demander un devis',

    'welcomePopup.title': 'Offre de lancement !',
    'welcomePopup.text': "Pour tout projet signé avant le 31 juillet 2026, bénéficiez d'1 mois de maintenance offert ! Soit 29€ offerts",
    'welcomePopup.cta': "J'en profite !",
    'welcomePopup.dismiss': 'Non merci',
    'exitPopup.title': 'Attendez ! 🎁',
    'exitPopup.text': 'Obtenez votre devis gratuit en 24h — Sans engagement',
    'exitPopup.cta': 'Demander mon devis gratuit',

    'whatsapp.tooltip': 'Discutez avec nous sur WhatsApp !',
    'chatbot.welcome': "Bonjour ! Je suis l'assistant Nexa Web 👋 Comment puis-je vous aider ?",
    'chatbot.error': 'Une erreur est survenue. Contactez-nous au 06 98 84 01 94 ou au 06 41 46 78 98',

    'hero.tag': 'Création de sites internet pour TPE/PME',
    'hero.titlePart1': 'Votre entreprise mérite un site qui lui ',
    'hero.titleAccent': 'ressemble',
    'hero.subtitle': 'Nexa Web conçoit des sites internet modernes, rapides et sur-mesure pour les artisans, commerçants et petites entreprises — basé à Carvin, à votre service partout en France.',
    'hero.btnQuote': 'Demander un devis gratuit',
    'hero.btnProjects': 'Voir nos réalisations',
    'hero.badge1': 'Site sécurisé SSL',
    'hero.badge2': 'Garantie 30 jours',
    'hero.badge3': 'Réponse sous 24h',

    'engagements.title': "J'applique 4 engagements à votre projet web",
    'engagements.item1.title': 'Rapidité',
    'engagements.item1.text': 'Votre site livré en 5 à 15 jours selon la formule. Pas de délais interminables, on respecte les deadlines.',
    'engagements.item2.title': 'Rentabilité',
    'engagements.item2.text': "Investir dans un site Nexa Web c'est investir dans votre chiffre d'affaires. Je conçois des outils qui génèrent des demandes de devis et transforment vos visiteurs en clients.",
    'engagements.item3.title': 'Visibilité',
    'engagements.item3.text': "Être sur internet ne suffit pas : encore faut-il être trouvé. J'optimise votre référencement local (SEO) pour que vous apparaissiez en première page sur Google.",
    'engagements.item4.title': 'Sur-mesure',
    'engagements.item4.text': "Chaque secteur a ses codes et ses clients. Je ne vends pas de templates génériques. Je construis votre site en fonction de votre business.",

    'services.tag': 'Nos services',
    'services.title': 'Des solutions web adaptées à votre activité',
    'services.subtitle': "Du premier site internet à la refonte complète, Nexa Web vous accompagne avec une offre claire et adaptée aux besoins des petites entreprises.",
    'services.card1.title': 'Site vitrine',
    'services.card1.text': 'Un site clair et professionnel pour présenter votre activité, vos services et vos coordonnées, et donner confiance à vos visiteurs.',
    'services.card2.title': 'Site e-commerce',
    'services.card2.text': 'Une boutique en ligne simple à gérer, sécurisée et pensée pour convertir vos visiteurs en clients, où que vous soyez basé.',
    'services.card3.title': 'Refonte de site existant',
    'services.card3.text': "Votre site est dépassé ou peu efficace ? On le modernise : design actuel, vitesse de chargement et expérience mobile optimisée.",
    'services.card4.title': 'Référencement SEO',
    'services.card4.text': 'Une structure et un contenu optimisés pour être mieux référencé sur Google et être trouvé par de nouveaux clients près de chez vous.',

    'why.tag': 'Pourquoi nous',
    'why.title': 'Une jeune agence, des engagements clairs',
    'why.subtitle': 'Pas de jargon ni de promesses creuses : juste un travail sérieux, transparent et taillé pour les besoins des petites structures.',
    'why.card1.title': 'Rapidité de livraison',
    'why.card1.text': 'Votre site en quelques jours à quelques semaines selon le projet, sans sacrifier la qualité ni le soin du détail.',
    'why.card2.title': 'Tarifs adaptés',
    'why.card2.text': 'Des formules pensées pour le budget réel des artisans, commerces et petites entreprises, sans coûts cachés.',
    'why.card3.title': 'Accompagnement personnalisé',
    'why.card3.text': 'Un interlocuteur unique à chaque étape, qui prend le temps de comprendre votre activité et vos besoins réels.',
    'why.card4.title': 'Design moderne sur-mesure',
    'why.card4.text': "Chaque site est conçu spécifiquement pour votre image de marque, pas à partir d'un modèle générique.",

    'stats.item1': 'Projets réalisés',
    'stats.item2': 'Clients satisfaits',
    'stats.item3': 'Délai moyen',
    'stats.item4': 'Expérience',

    'portfolio.tag': 'Réalisations',
    'portfolio.title': 'Quelques exemples de projets',
    'portfolio.subtitle': 'Activité encore jeune : voici des exemples représentatifs du type de sites que nous réalisons. Nos vrais projets clients viendront enrichir cette galerie.',
    'portfolio.card1.badge': 'Site vitrine',
    'portfolio.card1.sector': 'Boulangerie artisanale',
    'portfolio.card2.badge': 'Site vitrine',
    'portfolio.card2.sector': 'Mécanique automobile',
    'portfolio.card3.badge': 'E-commerce',
    'portfolio.card3.sector': 'Institut de beauté',
    'portfolio.card4.badge': 'Refonte',
    'portfolio.card4.sector': 'Conseil aux entreprises',
    'portfolio.card5.badge': 'Site vitrine',
    'portfolio.card5.sector': 'Restauration',
    'portfolio.card6.badge': 'Site vitrine',
    'portfolio.card6.sector': 'Plomberie & dépannage',
    'portfolio.link': 'Voir le projet →',

    'trust.tag': 'Ils nous font confiance',
    'trust.title': 'Ce que nos clients disent de nous',
    'trust.subtitle': 'Ils nous ont fait confiance et partagent leur expérience',
    'trust.card1.title': 'Garantie 30 jours',
    'trust.card1.text': 'Pas satisfait du résultat dans les 30 jours suivant la livraison ? On vous rembourse intégralement. Sans question, sans discussion.',
    'trust.card2.title': 'Devis gratuit sans engagement',
    'trust.card2.text': 'On échange sur votre projet, vous décidez ensuite. Aucune pression.',
    'trust.card3.title': 'Votre site vous appartient',
    'trust.card3.text': 'Vous gardez tous vos fichiers et votre domaine, même si on arrête de travailler ensemble.',
    'trust.cta': 'Discutons de votre projet',

    'reviews.tag': 'Avis clients',
    'reviews.title': 'Donnez votre avis',
    'reviews.subtitle': 'Vous avez travaillé avec Nexa Web ? Partagez votre expérience, elle sera publiée ici après validation.',
    'reviewForm.nameLabel': 'Prénom et nom',
    'reviewForm.namePlaceholder': 'Votre prénom et nom',
    'reviewForm.companyLabel': "Nom de l'entreprise",
    'reviewForm.companyPlaceholder': 'Nom de votre activité',
    'reviewForm.ratingLabel': 'Votre note',
    'reviewForm.messageLabel': 'Votre avis',
    'reviewForm.messagePlaceholder': 'Partagez votre expérience avec Nexa Web...',
    'reviewForm.submit': 'Envoyer mon avis',
    'reviews.empty': 'Soyez le premier à laisser un avis !',

    'faq.tag': 'Questions fréquentes',
    'faq.title': 'Vous avez des questions ?',
    'faq.q1': 'Combien coûte un site internet ?',
    'faq.a1': 'À partir de 490€ pour un site vitrine complet.',
    'faq.q2': 'Combien de temps pour créer mon site ?',
    'faq.a2': 'Entre 5 et 15 jours selon la complexité.',
    'faq.q3': 'Est-ce que mon site sera visible sur Google ?',
    'faq.a3': 'Oui, on optimise le SEO de base inclus.',
    'faq.q4': 'Puis-je modifier mon site après livraison ?',
    'faq.a4': 'Oui, avec la maintenance à 29€/mois.',
    'faq.q5': 'Proposez-vous une garantie ?',
    'faq.a5': 'Oui, garantie 30 jours satisfait ou remboursé.',
    'faq.q6': 'Vous déplacez-vous ?',
    'faq.a6': 'On travaille à distance, partout en France.',

    'testimonials.tag': 'Témoignages',
    'testimonials.title': 'Ils nous ont fait confiance',
    'testimonials.item1.meta': 'Carvin — Site vitrine',
    'testimonials.item1.text': 'Mon site vitrine a été livré en 5 jours, je suis ravie !',
    'testimonials.item2.meta': 'Lens — Site vitrine restaurant',
    'testimonials.item2.text': 'Super travail, mon restaurant a maintenant une belle présence en ligne.',
    'testimonials.item3.meta': 'Hénin-Beaumont — Refonte de site',
    'testimonials.item3.text': 'Très professionnel, je recommande sans hésiter.',

    'pricingBanner.tag': 'Tarifs',
    'pricingBanner.part1': 'Des tarifs simples, pensés pour les ',
    'pricingBanner.accent': 'petites entreprises',
    'pricingBanner.subtitle': 'Trois formules claires, sans coûts cachés. Chaque projet reste personnalisable selon vos besoins réels.',

    'calculator.tag': 'Calculateur',
    'calculator.title': 'Estimez le prix de votre projet',
    'calculator.subtitle': 'Répondez à 3 questions pour obtenir une estimation immédiate.',
    'calculator.q1': 'Type de site ?',
    'calculator.opt.vitrine': 'Vitrine',
    'calculator.opt.ecommerce': 'E-commerce',
    'calculator.opt.refonte': 'Refonte',
    'calculator.q2': 'Nombre de pages ?',
    'calculator.opt.pages1': '1 à 3',
    'calculator.opt.pages2': '4 à 7',
    'calculator.opt.pages3': '8 et plus',
    'calculator.q3': 'Délai souhaité ?',
    'calculator.opt.express': 'Express (5j)',
    'calculator.opt.normal': 'Normal (10j)',
    'calculator.opt.flexible': 'Flexible (15j)',
    'calculator.resultLabel': 'Prix estimé',
    'calculator.cta': 'Obtenir ce tarif',
    'pricing.priceLabel': 'À partir de',
    'pricing.cta': 'Demander un devis',
    'pricing.card1.name': 'Essentiel',
    'pricing.card1.tagline': 'Idéal pour démarrer en ligne',
    'pricing.card1.item1': "Site one-page jusqu'à 3 sections",
    'pricing.card1.item2': 'Design responsive (mobile / tablette)',
    'pricing.card1.item3': 'Formulaire de contact',
    'pricing.card1.item4': "Nom de domaine et hébergement offerts 1 an",
    'pricing.card1.item5': 'Livraison en 5 à 7 jours',
    'pricing.card2.badge': 'Populaire',
    'pricing.card2.name': 'Standard',
    'pricing.card2.tagline': 'Le plus choisi par nos clients',
    'pricing.card2.item1': "Site jusqu'à 5 pages",
    'pricing.card2.item2': 'Design sur-mesure adapté à votre image',
    'pricing.card2.item3': 'Optimisation SEO de base',
    'pricing.card2.item4': 'Formulaire de contact + liens réseaux sociaux',
    'pricing.card2.item5': "Nom de domaine et hébergement offerts 1 an",
    'pricing.card2.item6': 'Livraison en 10 à 15 jours',
    'pricing.card2.item7': '✓ Site installable sur mobile (PWA)',
    'pricing.card3.name': 'Premium',
    'pricing.card3.tagline': 'Pour les projets ambitieux',
    'pricing.card3.amount': 'Sur devis',
    'pricing.card3.item1': 'Site vitrine ou e-commerce complet',
    'pricing.card3.item2': 'Nombre de pages illimité',
    'pricing.card3.item3': 'SEO avancé et suivi de positionnement',
    'pricing.card3.item4': 'Back-office pour gérer votre contenu',
    'pricing.card3.item5': 'Accompagnement et support prioritaire',
    'pricing.card3.item6': 'Maintenance incluse pendant 3 mois',
    'pricing.card3.item7': '✓ PWA incluse',
    'pricing.card4.name': 'Maintenance & Mises à jour',
    'pricing.card4.tagline': 'Pour garder votre site au top',
    'pricing.card4.item1': 'Mises à jour du contenu (textes, photos, prix)',
    'pricing.card4.item2': 'Corrections et améliorations rapides',
    'pricing.card4.item3': 'Sauvegarde mensuelle de votre site',
    'pricing.card4.item4': 'Support prioritaire par téléphone et WhatsApp',
    'pricing.card4.item5': 'Rapport mensuel de performance',
    'pricing.card4.cta': 'Nous contacter',
    'pricing.note': 'Les tarifs affichés sont indicatifs et ajustés selon la complexité de votre projet. Un devis détaillé et gratuit vous est toujours communiqué avant toute mission.',
    'pricing.guaranteeBadge': '✅ Garantie 30 jours incluse',

    'contactBanner.tag': 'Contact',
    'contactBanner.part1': 'Parlons de votre ',
    'contactBanner.accent': 'projet',
    'contactBanner.subtitle': 'Décrivez-nous votre besoin, nous vous répondons rapidement avec un devis gratuit et sans engagement.',
    'form.nameLabel': 'Nom complet',
    'form.namePlaceholder': 'Votre nom',
    'form.emailLabel': 'Email',
    'form.emailPlaceholder': 'vous@exemple.com',
    'form.phoneLabel': 'Téléphone',
    'form.projectTypeLabel': 'Type de projet',
    'form.projectTypeDefault': 'Sélectionnez votre besoin',
    'form.projectType.vitrine': 'Site vitrine',
    'form.projectType.ecommerce': 'Site e-commerce',
    'form.projectType.refonte': 'Refonte de site existant',
    'form.projectType.seo': 'SEO / Visibilité Google',
    'form.projectType.autre': 'Autre',
    'form.messageLabel': 'Message',
    'contactForm.messagePlaceholder': "Décrivez votre projet en quelques lignes...",
    'contactForm.submit': 'Envoyer ma demande',
    'contactInfo.title': 'Coordonnées',
    'contactInfo.text': 'Une question, un projet en tête ? Contactez-nous directement, nous revenons vers vous sous 24 à 48h.',
    'contactInfo.emailLabel': 'Email',
    'contactInfo.phoneLabel': 'Téléphone',
    'contactInfo.zoneLabel': "Zone d'intervention",
    'contactInfo.zoneValue': 'Carvin, Hauts-de-France & toute la France (à distance)',

    'devisBanner.tag': 'Devis gratuit',
    'devisBanner.part1': 'Recevez votre devis ',
    'devisBanner.accent': 'gratuit',
    'devisBanner.part2': ' et sans engagement',
    'devisBanner.subtitle': 'Quelques infos sur votre projet nous suffisent pour vous proposer un devis adapté. Réponse sous 24 à 48h.',
    'form.companyLabel': "Nom de l'entreprise (optionnel)",
    'form.companyPlaceholder': 'Ex : Boulangerie Dupont',
    'form.projectType.optgroup': 'Formule tarifaire',
    'form.projectType.formuleEssentiel': 'Formule Essentiel',
    'form.projectType.formuleStandard': 'Formule Standard',
    'form.projectType.formulePremium': 'Formule Premium',
    'form.budgetLabel': 'Budget estimé',
    'form.budgetDefault': 'Choisissez une fourchette',
    'form.budget2': '500 € - 1000 €',
    'form.budget3': '1000 € - 2000 €',
    'form.budget4': 'Plus de 2000 €',
    'form.delaiLabel': 'Délai souhaité',
    'form.delaiDefault': 'Sélectionnez un délai',
    'form.delai1': 'Dès que possible',
    'form.delai2': 'Sous 1 mois',
    'form.delai3': '2 à 3 mois',
    'form.delai4': 'Pas urgent',
    'devisForm.namePlaceholder': 'Ex : Jean Dupont',
    'devisForm.emailPlaceholder': 'Ex : contact@monentreprise.fr',
    'devisForm.messageLabel': 'Décrivez votre projet',
    'devisForm.messagePlaceholder': "Quelques mots sur votre activité et ce que vous attendez de votre futur site...",
    'devisForm.submit': 'Recevoir mon devis gratuit',
    'devisForm.successMessage': 'Votre demande a bien été envoyée ! Nous vous contactons sous 24h.',
    'devisForm.calendlyPromo': "Profitez-en pour réserver votre appel découverte gratuit de 30 minutes !",
    'devisInfo.title': 'Comment ça marche ?',
    'devisInfo.text': "Pas de surprise, pas d'engagement : un échange simple pour cadrer votre projet et vous proposer le tarif le plus juste.",
    'devisInfo.step1Label': '1. Vous décrivez votre besoin',
    'devisInfo.step1Value': 'Quelques minutes pour remplir le formulaire ci-contre.',
    'devisInfo.step2Label': '2. Nous vous recontactons',
    'devisInfo.step2Value': 'Sous 24 à 48h, par téléphone ou par email.',
    'devisInfo.step3Label': '3. Vous recevez votre devis',
    'devisInfo.step3Value': 'Gratuit, détaillé et sans engagement de votre part.',

    'rdvBanner.tag': 'Rendez-vous gratuit',
    'rdvBanner.title': 'Parlons de votre projet',
    'rdvBanner.subtitle': 'Réservez un appel découverte gratuit de 30 minutes. On discute de votre projet, vos besoins et on vous propose la meilleure solution.',
    'rdv.feature1': 'Disponible Lundi au Vendredi',
    'rdv.feature2': '30 minutes chrono',
    'rdv.feature3': 'Sans engagement',
    'rdv.cta': 'Réserver mon appel gratuit',

    'project.backLink': '← Retour aux réalisations',
    'project.needTitle': 'Le besoin',
    'project.solutionTitle': 'Notre solution',
    'project.resultTitle': 'Le résultat',
    'project.infoTitle': 'Informations clés',
    'project.clientLabel': 'Client',
    'project.sectorLabel': 'Secteur',
    'project.typeLabel': 'Type de projet',
    'project.delayLabel': 'Délai de réalisation',
    'project.goalLabel': 'Objectif',
    'project.cta': 'Discuter de mon projet',

    'projectDubois.tag': 'Exemple de réalisation · Site vitrine',
    'projectDubois.subtitle': "Site vitrine pour un artisan menuisier : présentation du savoir-faire, galerie de réalisations et formulaire de devis en ligne.",
    'projectDubois.need': "L'Atelier Dubois Menuiserie ne disposait d'aucune présence en ligne. Les clients potentiels qui recherchaient un artisan menuisier dans leur secteur ne le trouvaient pas sur Google, au profit de concurrents mieux référencés. Les demandes de devis passaient uniquement par le bouche-à-oreille et le téléphone.",
    'projectDubois.solution': "Nexa Web a conçu un site vitrine one-page sobre et chaleureux, à l'image du métier : présentation de l'activité et du savoir-faire, galerie photo des réalisations (mobilier sur mesure, agencement intérieur, rénovation), et formulaire de demande de devis directement intégré. Le site a été optimisé pour le mobile et pour les recherches locales (« menuisier » + nom de la ville).",
    'projectDubois.result': "Le site a été livré en 6 jours. Il permet désormais à l'Atelier Dubois Menuiserie d'apparaître sur Google pour les recherches locales et de recevoir des demandes de devis qualifiées directement depuis le site, sans dépendre uniquement du bouche-à-oreille.",
    'projectDubois.sector': 'Artisanat / Menuiserie',
    'projectDubois.type': 'Site vitrine',
    'projectDubois.delay': '6 jours',
    'projectDubois.goal': 'Visibilité locale et demandes de devis',

    'projectLea.tag': 'Exemple de réalisation · E-commerce',
    'projectLea.subtitle': 'Boutique en ligne pour une marque de cosmétiques artisanaux : catalogue produits, paiement sécurisé et gestion simplifiée des commandes.',
    'projectLea.need': 'Léa Cosmétiques fabriquait et vendait ses produits artisanaux uniquement lors de marchés locaux et sur les réseaux sociaux. Sans boutique en ligne, impossible de vendre en dehors de ces événements, de gérer un catalogue propre ou d\'encaisser des paiements en toute sécurité.',
    'projectLea.solution': 'Nexa Web a développé une boutique en ligne complète : catalogue produits avec fiches détaillées et photos, panier et tunnel de commande simplifié, paiement en ligne sécurisé, et un espace de gestion permettant à Léa de suivre ses commandes et de mettre à jour ses produits sans compétence technique.',
    'projectLea.result': 'La boutique permet désormais de vendre 7j/7, au-delà des marchés locaux. La gestion des commandes est centralisée et simplifiée, et la marque dispose d\'une image plus professionnelle pour développer sa clientèle en ligne.',
    'projectLea.sector': 'Cosmétiques artisanaux',
    'projectLea.type': 'Site e-commerce',
    'projectLea.delay': '12 jours',
    'projectLea.goal': 'Vente en ligne et gestion des commandes',

    'projectMartin.tag': 'Exemple de réalisation · Refonte',
    'projectMartin.subtitle': "Refonte complète d'un site vieillissant pour un cabinet de conseil : nouveau design, meilleure lisibilité et site optimisé pour mobile.",
    'projectMartin.need': "Le Cabinet Martin & Associés disposait d'un site vieillissant, peu lisible et non adapté aux mobiles. Le design daté donnait une image peu rassurante par rapport au sérieux du cabinet, et la navigation rendait difficile l'accès aux informations essentielles pour les prospects.",
    'projectMartin.solution': "Nexa Web a entièrement repensé le site : nouveau design sobre et professionnel, structure de page clarifiée pour mettre en avant les domaines d'expertise et les coordonnées, et optimisation complète pour une navigation fluide sur mobile et tablette. Le contenu existant a été réorganisé pour gagner en lisibilité.",
    'projectMartin.result': 'Le cabinet dispose désormais d\'un site moderne et cohérent avec son image professionnelle, consultable confortablement sur tous les écrans, ce qui facilite la prise de contact pour les prospects.',
    'projectMartin.sector': 'Conseil aux entreprises',
    'projectMartin.type': 'Refonte de site existant',
    'projectMartin.delay': '9 jours',
    'projectMartin.goal': 'Modernisation et optimisation mobile',

    'feedback.sending': 'Envoi en cours...',
    'feedback.formSuccess': 'Votre demande a bien été envoyée ! Je vous contacte sous 24h.',
    'feedback.formError': "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous écrire directement à contact.nexaweb62@gmail.com.",
    'feedback.ratingRequired': 'Merci de sélectionner une note.',
    'feedback.reviewSuccess': 'Merci pour votre avis ! Il sera publié après vérification.',
    'feedback.reviewError': 'Une erreur est survenue. Merci de réessayer.',

    'form.fieldRequired': 'Ce champ est obligatoire',
    'form.fillAllRequired': 'Veuillez remplir tous les champs obligatoires',
    'form.recaptchaRequired': 'Veuillez cocher la case "Je ne suis pas un robot"'
  },
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.serviceVitrine': 'Showcase websites',
    'nav.serviceEcommerce': 'E-commerce',
    'nav.serviceSeo': 'SEO',
    'nav.appointment': 'Book a call',
    'nav.why': 'Why choose us',
    'nav.projects': 'Our projects',
    'nav.reviews': 'Reviews',
    'nav.pricing': 'Pricing',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'header.quoteBtn': 'Get a free quote',

    'footer.address': 'Carvin, Northern France',
    'footer.legal': 'Legal notice',
    'footer.tagline': 'Custom-built websites for craftspeople and small businesses in Northern France.',
    'footer.quickLinks': 'Quick links',
    'footer.legalTitle': 'Legal',
    'footer.cgv': 'Terms of sale',
    'footer.cookiesPolicy': 'Cookie policy',
    'footer.contactTitle': 'Contact',
    'footer.copyright': '© 2025 Nexa Web — All rights reserved — Carvin, France',

    'phoneModal.title': 'How would you like to contact us?',
    'phoneModal.call': '📞 Call now',
    'phoneModal.appointment': '📅 Book an appointment',

    'emailModal.title': 'How can we help you?',
    'emailModal.devisBtn': '📋 Request a quote',

    'welcomePopup.title': 'Launch offer!',
    'welcomePopup.text': "For any project signed before July 31, 2026, get 1 month of maintenance for free! That's €29 off",
    'welcomePopup.cta': "I'm interested!",
    'welcomePopup.dismiss': 'No thanks',
    'exitPopup.title': 'Wait! 🎁',
    'exitPopup.text': 'Get your free quote within 24h — No commitment',
    'exitPopup.cta': 'Request my free quote',

    'whatsapp.tooltip': 'Chat with us on WhatsApp!',
    'chatbot.welcome': "Hello! I'm the Nexa Web assistant 👋 How can I help you?",
    'chatbot.error': 'An error occurred. Contact us at 06 98 84 01 94 or 06 41 46 78 98',

    'hero.tag': 'Website creation for small businesses',
    'hero.titlePart1': 'Your business deserves a website that ',
    'hero.titleAccent': 'looks like you',
    'hero.subtitle': "Nexa Web designs modern, fast and tailor-made websites for craftsmen, shopkeepers and small businesses — based in Carvin, serving you all over France.",
    'hero.btnQuote': 'Get a free quote',
    'hero.btnProjects': 'See our projects',
    'hero.badge1': 'SSL secured website',
    'hero.badge2': '30-day guarantee',
    'hero.badge3': 'Response within 24h',

    'engagements.title': 'I bring 4 commitments to your web project',
    'engagements.item1.title': 'Speed',
    'engagements.item1.text': 'Your website delivered in 5 to 15 days depending on the package. No endless delays — deadlines are respected.',
    'engagements.item2.title': 'Profitability',
    'engagements.item2.text': 'Investing in a Nexa Web website means investing in your revenue. I design tools that generate quote requests and turn your visitors into customers.',
    'engagements.item3.title': 'Visibility',
    'engagements.item3.text': "Being online isn't enough — you also need to be found. I optimize your local SEO so you appear on the first page of Google.",
    'engagements.item4.title': 'Tailor-made',
    'engagements.item4.text': "Every industry has its own codes and customers. I don't sell generic templates. I build your website around your business.",

    'services.tag': 'Our services',
    'services.title': 'Web solutions adapted to your business',
    'services.subtitle': 'From your first website to a complete redesign, Nexa Web supports you with a clear offer suited to the needs of small businesses.',
    'services.card1.title': 'Showcase website',
    'services.card1.text': 'A clear, professional website to present your business, services and contact details, and build trust with your visitors.',
    'services.card2.title': 'E-commerce website',
    'services.card2.text': "An online store that's easy to manage, secure and designed to convert your visitors into customers, wherever you're based.",
    'services.card3.title': 'Website redesign',
    'services.card3.text': 'Is your website outdated or underperforming? We modernise it: current design, fast loading and an optimised mobile experience.',
    'services.card4.title': 'SEO',
    'services.card4.text': 'Structure and content optimised to rank better on Google and be found by new customers near you.',

    'why.tag': 'Why us',
    'why.title': 'A young agency, clear commitments',
    'why.subtitle': 'No jargon, no empty promises: just serious, transparent work tailored to the needs of small businesses.',
    'why.card1.title': 'Fast delivery',
    'why.card1.text': 'Your website ready in a few days to a few weeks depending on the project, without sacrificing quality or attention to detail.',
    'why.card2.title': 'Affordable pricing',
    'why.card2.text': 'Packages designed for the real budget of craftsmen, shops and small businesses, with no hidden costs.',
    'why.card3.title': 'Personalised support',
    'why.card3.text': 'A single point of contact at every stage, who takes the time to understand your business and your real needs.',
    'why.card4.title': 'Modern, tailor-made design',
    'why.card4.text': 'Every website is designed specifically for your brand image, not from a generic template.',

    'stats.item1': 'Projects delivered',
    'stats.item2': 'Happy clients',
    'stats.item3': 'Average turnaround',
    'stats.item4': 'Experience',

    'portfolio.tag': 'Our projects',
    'portfolio.title': 'A few project examples',
    'portfolio.subtitle': 'Still a young agency: here are representative examples of the type of websites we build. Our real client projects will enrich this gallery soon.',
    'portfolio.card1.badge': 'Showcase website',
    'portfolio.card1.sector': 'Artisan bakery',
    'portfolio.card2.badge': 'Showcase website',
    'portfolio.card2.sector': 'Car mechanics',
    'portfolio.card3.badge': 'E-commerce',
    'portfolio.card3.sector': 'Beauty salon',
    'portfolio.card4.badge': 'Redesign',
    'portfolio.card4.sector': 'Business consulting',
    'portfolio.card5.badge': 'Showcase website',
    'portfolio.card5.sector': 'Restaurant',
    'portfolio.card6.badge': 'Showcase website',
    'portfolio.card6.sector': 'Plumbing & repairs',
    'portfolio.link': 'View project →',

    'trust.tag': 'Trust & guarantees',
    'trust.title': 'What our clients say about us',
    'trust.subtitle': 'They trusted us and share their experience',
    'trust.card1.title': '30-day guarantee',
    'trust.card1.text': "Not happy with the result within 30 days of delivery? We refund you in full. No questions asked.",
    'trust.card2.title': 'Free, no-obligation quote',
    'trust.card2.text': 'We discuss your project, then you decide. No pressure.',
    'trust.card3.title': 'Your website belongs to you',
    'trust.card3.text': 'You keep all your files and your domain, even if we stop working together.',
    'trust.cta': "Let's talk about your project",

    'reviews.tag': 'Customer reviews',
    'reviews.title': 'Leave a review',
    'reviews.subtitle': 'Have you worked with Nexa Web? Share your experience, it will be published here after approval.',
    'reviewForm.nameLabel': 'First and last name',
    'reviewForm.namePlaceholder': 'Your first and last name',
    'reviewForm.companyLabel': 'Company name',
    'reviewForm.companyPlaceholder': 'Your business name',
    'reviewForm.ratingLabel': 'Your rating',
    'reviewForm.messageLabel': 'Your review',
    'reviewForm.messagePlaceholder': 'Share your experience with Nexa Web...',
    'reviewForm.submit': 'Submit my review',
    'reviews.empty': 'Be the first to leave a review!',

    'faq.tag': 'FAQ',
    'faq.title': 'Got questions?',
    'faq.q1': 'How much does a website cost?',
    'faq.a1': 'Starting from €490 for a complete showcase website.',
    'faq.q2': 'How long does it take to build my website?',
    'faq.a2': 'Between 5 and 15 days depending on complexity.',
    'faq.q3': 'Will my website be visible on Google?',
    'faq.a3': 'Yes, basic SEO optimization is included.',
    'faq.q4': 'Can I update my website after delivery?',
    'faq.a4': 'Yes, with the €29/month maintenance plan.',
    'faq.q5': 'Do you offer a guarantee?',
    'faq.a5': 'Yes, a 30-day money-back guarantee.',
    'faq.q6': 'Do you travel to clients?',
    'faq.a6': 'We work remotely, serving clients all over France.',

    'testimonials.tag': 'Testimonials',
    'testimonials.title': 'They trusted us',
    'testimonials.item1.meta': 'Carvin — Showcase website',
    'testimonials.item1.text': 'My showcase website was delivered in 5 days, I am delighted!',
    'testimonials.item2.meta': 'Lens — Restaurant website',
    'testimonials.item2.text': 'Great work, my restaurant now has a beautiful online presence.',
    'testimonials.item3.meta': 'Hénin-Beaumont — Website redesign',
    'testimonials.item3.text': 'Very professional, I recommend without hesitation.',

    'pricingBanner.tag': 'Pricing',
    'pricingBanner.part1': 'Simple pricing, designed for ',
    'pricingBanner.accent': 'small businesses',
    'pricingBanner.subtitle': 'Three clear packages, no hidden costs. Every project remains customisable to your real needs.',

    'calculator.tag': 'Calculator',
    'calculator.title': 'Estimate the price of your project',
    'calculator.subtitle': 'Answer 3 questions to get an instant estimate.',
    'calculator.q1': 'Type of website?',
    'calculator.opt.vitrine': 'Showcase',
    'calculator.opt.ecommerce': 'E-commerce',
    'calculator.opt.refonte': 'Redesign',
    'calculator.q2': 'Number of pages?',
    'calculator.opt.pages1': '1 to 3',
    'calculator.opt.pages2': '4 to 7',
    'calculator.opt.pages3': '8 or more',
    'calculator.q3': 'Desired turnaround?',
    'calculator.opt.express': 'Express (5d)',
    'calculator.opt.normal': 'Normal (10d)',
    'calculator.opt.flexible': 'Flexible (15d)',
    'calculator.resultLabel': 'Estimated price',
    'calculator.cta': 'Get this price',
    'pricing.priceLabel': 'Starting at',
    'pricing.cta': 'Request a quote',
    'pricing.card1.name': 'Essential',
    'pricing.card1.tagline': 'Ideal to get started online',
    'pricing.card1.item1': 'One-page website with up to 3 sections',
    'pricing.card1.item2': 'Responsive design (mobile / tablet)',
    'pricing.card1.item3': 'Contact form',
    'pricing.card1.item4': 'Domain name and hosting included for 1 year',
    'pricing.card1.item5': 'Delivered in 5 to 7 days',
    'pricing.card2.badge': 'Popular',
    'pricing.card2.name': 'Standard',
    'pricing.card2.tagline': 'Most chosen by our clients',
    'pricing.card2.item1': 'Website with up to 5 pages',
    'pricing.card2.item2': 'Tailor-made design matching your brand',
    'pricing.card2.item3': 'Basic SEO optimisation',
    'pricing.card2.item4': 'Contact form + social media links',
    'pricing.card2.item5': 'Domain name and hosting included for 1 year',
    'pricing.card2.item6': 'Delivered in 10 to 15 days',
    'pricing.card2.item7': '✓ Installable on mobile (PWA)',
    'pricing.card3.name': 'Premium',
    'pricing.card3.tagline': 'For ambitious projects',
    'pricing.card3.amount': 'Custom quote',
    'pricing.card3.item1': 'Full showcase or e-commerce website',
    'pricing.card3.item2': 'Unlimited number of pages',
    'pricing.card3.item3': 'Advanced SEO and ranking tracking',
    'pricing.card3.item4': 'Back-office to manage your content',
    'pricing.card3.item5': 'Dedicated, priority support',
    'pricing.card3.item6': 'Maintenance included for 3 months',
    'pricing.card3.item7': '✓ PWA included',
    'pricing.card4.name': 'Maintenance & Updates',
    'pricing.card4.tagline': 'To keep your website at its best',
    'pricing.card4.item1': 'Content updates (text, photos, prices)',
    'pricing.card4.item2': 'Quick fixes and improvements',
    'pricing.card4.item3': 'Monthly website backup',
    'pricing.card4.item4': 'Priority support by phone and WhatsApp',
    'pricing.card4.item5': 'Monthly performance report',
    'pricing.card4.cta': 'Contact us',
    'pricing.note': 'Displayed prices are indicative and adjusted according to the complexity of your project. A detailed, free quote is always provided before any work begins.',
    'pricing.guaranteeBadge': '✅ 30-day guarantee included',

    'contactBanner.tag': 'Contact',
    'contactBanner.part1': "Let's talk about your ",
    'contactBanner.accent': 'project',
    'contactBanner.subtitle': "Tell us about your needs, we'll get back to you quickly with a free, no-obligation quote.",
    'form.nameLabel': 'Full name',
    'form.namePlaceholder': 'Your name',
    'form.emailLabel': 'Email',
    'form.emailPlaceholder': 'you@example.com',
    'form.phoneLabel': 'Phone',
    'form.projectTypeLabel': 'Project type',
    'form.projectTypeDefault': 'Select your need',
    'form.projectType.vitrine': 'Showcase website',
    'form.projectType.ecommerce': 'E-commerce website',
    'form.projectType.refonte': 'Website redesign',
    'form.projectType.seo': 'SEO / Google visibility',
    'form.projectType.autre': 'Other',
    'form.messageLabel': 'Message',
    'contactForm.messagePlaceholder': 'Describe your project in a few lines...',
    'contactForm.submit': 'Send my request',
    'contactInfo.title': 'Contact details',
    'contactInfo.text': "A question, a project in mind? Contact us directly, we'll get back to you within 24 to 48 hours.",
    'contactInfo.emailLabel': 'Email',
    'contactInfo.phoneLabel': 'Phone',
    'contactInfo.zoneLabel': 'Service area',
    'contactInfo.zoneValue': 'Carvin, Northern France & all of France (remotely)',

    'devisBanner.tag': 'Free quote',
    'devisBanner.part1': 'Get your ',
    'devisBanner.accent': 'free',
    'devisBanner.part2': ' quote, no strings attached',
    'devisBanner.subtitle': 'A few details about your project are enough for us to offer you a tailored quote. Response within 24 to 48 hours.',
    'form.companyLabel': 'Company name (optional)',
    'form.companyPlaceholder': 'E.g.: Dupont Bakery',
    'form.projectType.optgroup': 'Pricing plan',
    'form.projectType.formuleEssentiel': 'Essential plan',
    'form.projectType.formuleStandard': 'Standard plan',
    'form.projectType.formulePremium': 'Premium plan',
    'form.budgetLabel': 'Estimated budget',
    'form.budgetDefault': 'Choose a range',
    'form.budget2': '€500 - €1000',
    'form.budget3': '€1000 - €2000',
    'form.budget4': 'More than €2000',
    'form.delaiLabel': 'Desired timeline',
    'form.delaiDefault': 'Select a timeline',
    'form.delai1': 'As soon as possible',
    'form.delai2': 'Within 1 month',
    'form.delai3': '2 to 3 months',
    'form.delai4': 'Not urgent',
    'devisForm.namePlaceholder': 'E.g.: John Smith',
    'devisForm.emailPlaceholder': 'E.g.: contact@yourcompany.com',
    'devisForm.messageLabel': 'Describe your project',
    'devisForm.messagePlaceholder': 'A few words about your business and what you expect from your future website...',
    'devisForm.submit': 'Get my free quote',
    'devisForm.successMessage': "Your request has been sent! We'll contact you within 24h.",
    'devisForm.calendlyPromo': 'While you wait, book your free 30-minute discovery call!',
    'devisInfo.title': 'How does it work?',
    'devisInfo.text': 'No surprises, no commitment: a simple conversation to scope your project and offer you the fairest price.',
    'devisInfo.step1Label': '1. You describe your need',
    'devisInfo.step1Value': 'A few minutes to fill out the form.',
    'devisInfo.step2Label': '2. We get back to you',
    'devisInfo.step2Value': 'Within 24 to 48 hours, by phone or email.',
    'devisInfo.step3Label': '3. You receive your quote',
    'devisInfo.step3Value': 'Free, detailed and with no obligation.',

    'rdvBanner.tag': 'Free appointment',
    'rdvBanner.title': "Let's talk about your project",
    'rdvBanner.subtitle': "Book a free 30-minute discovery call. We'll discuss your project, your needs, and find you the best solution.",
    'rdv.feature1': 'Available Monday to Friday',
    'rdv.feature2': '30 minutes sharp',
    'rdv.feature3': 'No commitment',
    'rdv.cta': 'Book a free call',

    'project.backLink': '← Back to projects',
    'project.needTitle': 'The need',
    'project.solutionTitle': 'Our solution',
    'project.resultTitle': 'The result',
    'project.infoTitle': 'Key information',
    'project.clientLabel': 'Client',
    'project.sectorLabel': 'Industry',
    'project.typeLabel': 'Project type',
    'project.delayLabel': 'Completion time',
    'project.goalLabel': 'Goal',
    'project.cta': 'Discuss my project',

    'projectDubois.tag': 'Project example · Showcase website',
    'projectDubois.subtitle': 'Showcase website for a carpenter: presentation of craftsmanship, project gallery and an online quote request form.',
    'projectDubois.need': "Atelier Dubois Menuiserie had no online presence at all. Potential customers looking for a carpenter in their area couldn't find it on Google, losing out to better-ranked competitors. Quote requests came only through word-of-mouth and phone calls.",
    'projectDubois.solution': "Nexa Web designed a warm, understated one-page showcase website that reflects the trade: presentation of the business and craftsmanship, a photo gallery of completed work (custom furniture, interior fitting, renovation), and an integrated quote request form. The site was optimised for mobile and for local search (\"carpenter\" + city name).",
    'projectDubois.result': 'The website was delivered in 6 days. Atelier Dubois Menuiserie now appears on Google for local searches and receives qualified quote requests directly through the site, without relying solely on word-of-mouth.',
    'projectDubois.sector': 'Craftsmanship / Carpentry',
    'projectDubois.type': 'Showcase website',
    'projectDubois.delay': '6 days',
    'projectDubois.goal': 'Local visibility and quote requests',

    'projectLea.tag': 'Project example · E-commerce',
    'projectLea.subtitle': 'Online store for a handmade cosmetics brand: product catalogue, secure payment and simplified order management.',
    'projectLea.need': 'Léa Cosmétiques made and sold its handmade products only at local markets and on social media. Without an online store, it was impossible to sell outside these events, manage a proper catalogue, or accept payments securely.',
    'projectLea.solution': "Nexa Web built a complete online store: product catalogue with detailed listings and photos, a simplified cart and checkout flow, secure online payment, and a management dashboard letting Léa track orders and update products with no technical skills required.",
    'projectLea.result': 'The store now allows sales 7 days a week, beyond local markets. Order management is centralised and simplified, and the brand has a more professional image to grow its online customer base.',
    'projectLea.sector': 'Handmade cosmetics',
    'projectLea.type': 'E-commerce website',
    'projectLea.delay': '12 days',
    'projectLea.goal': 'Online sales and order management',

    'projectMartin.tag': 'Project example · Redesign',
    'projectMartin.subtitle': 'Complete redesign of an outdated website for a consulting firm: new design, better readability and mobile-optimised site.',
    'projectMartin.need': "Cabinet Martin & Associés had an outdated, hard-to-read website that wasn't mobile-friendly. The dated design gave an unreliable impression compared to the firm's professionalism, and the navigation made it hard for prospects to find essential information.",
    'projectMartin.solution': "Nexa Web completely redesigned the website: a clean, professional new design, a clarified page structure highlighting the firm's areas of expertise and contact details, and full optimisation for smooth navigation on mobile and tablet. Existing content was reorganised for better readability.",
    'projectMartin.result': 'The firm now has a modern website consistent with its professional image, comfortably viewable on all screens, making it easier for prospects to get in touch.',
    'projectMartin.sector': 'Business consulting',
    'projectMartin.type': 'Website redesign',
    'projectMartin.delay': '9 days',
    'projectMartin.goal': 'Modernisation and mobile optimisation',

    'feedback.sending': 'Sending...',
    'feedback.formSuccess': "Your request has been sent! I'll contact you within 24h.",
    'feedback.formError': 'An error occurred while sending. Please try again or email us directly at contact.nexaweb62@gmail.com.',
    'feedback.ratingRequired': 'Please select a rating.',
    'feedback.reviewSuccess': 'Thank you for your review! It will be published after verification.',
    'feedback.reviewError': 'An error occurred. Please try again.',

    'form.fieldRequired': 'This field is required',
    'form.fillAllRequired': 'Please fill in all required fields',
    'form.recaptchaRequired': 'Please check the "I\'m not a robot" box'
  }
};

function getCurrentLang() {
  return localStorage.getItem(LANG_STORAGE_KEY) === 'en' ? 'en' : 'fr';
}

function t(key) {
  const lang = getCurrentLang();
  return TRANSLATIONS[lang][key] !== undefined ? TRANSLATIONS[lang][key] : TRANSLATIONS.fr[key];
}

function applyLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = t(el.getAttribute('data-i18n'));
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const value = t(el.getAttribute('data-i18n-placeholder'));
    if (value !== undefined) el.setAttribute('placeholder', value);
  });

  document.querySelectorAll('[data-i18n-optgroup-label]').forEach(el => {
    const value = t(el.getAttribute('data-i18n-optgroup-label'));
    if (value !== undefined) el.setAttribute('label', value);
  });

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    const flagEl = langToggle.querySelector('.lang-toggle__flag');
    const codeEl = langToggle.querySelector('.lang-toggle__code');
    if (lang === 'en') {
      flagEl.textContent = '🇬🇧';
      codeEl.textContent = 'EN';
      langToggle.setAttribute('aria-label', 'Passer en français');
    } else {
      flagEl.textContent = '🇫🇷';
      codeEl.textContent = 'FR';
      langToggle.setAttribute('aria-label', 'Switch to English');
    }
  }
}

/* ---------- 1. Thème clair / sombre ---------- */
const THEME_STORAGE_KEY = 'nexaweb-theme';

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

// Appliqué dès le chargement du script pour limiter le flash de thème par défaut.
applyTheme(localStorage.getItem(THEME_STORAGE_KEY));

document.addEventListener('DOMContentLoaded', () => {

  applyLanguage(getCurrentLang());

  const langToggle = document.getElementById('lang-toggle');

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const next = getCurrentLang() === 'fr' ? 'en' : 'fr';
      localStorage.setItem(LANG_STORAGE_KEY, next);
      applyLanguage(next);
    });
  }

  const themeToggle = document.getElementById('theme-toggle');

  function updateThemeToggleLabel(theme) {
    if (!themeToggle) return;
    themeToggle.setAttribute(
      'aria-label',
      theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'
    );
  }

  if (themeToggle) {
    updateThemeToggleLabel(localStorage.getItem(THEME_STORAGE_KEY));

    themeToggle.addEventListener('click', () => {
      const current = localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(THEME_STORAGE_KEY, next);
      updateThemeToggleLabel(next);
    });
  }

  /* ---------- 1b. Simulateur de vue mobile/desktop ---------- */
  const deviceToggle = document.getElementById('device-toggle');

  if (deviceToggle) {
    const deviceToggleIcon = deviceToggle.querySelector('.device-toggle__icon');

    deviceToggle.addEventListener('click', () => {
      const isPreview = document.documentElement.classList.toggle('device-preview');
      if (deviceToggleIcon) deviceToggleIcon.textContent = isPreview ? '📱' : '💻';
      deviceToggle.setAttribute(
        'aria-label',
        isPreview ? 'Revenir à la vue ordinateur' : 'Simuler la vue mobile'
      );
    });
  }

  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  /* ---------- 2. Menu mobile (burger) ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    burger.classList.toggle('is-active');
    burger.setAttribute('aria-expanded', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  /* ---------- 3. Fermeture du menu au clic sur un lien ---------- */
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.classList.remove('is-active');
      burger.setAttribute('aria-expanded', false);
      burger.setAttribute('aria-label', 'Ouvrir le menu');
    });
  });

  /* ---------- 3b. Barre de progression au scroll ---------- */
  const scrollProgressBar = document.getElementById('scroll-progress');

  if (scrollProgressBar) {
    function updateScrollProgress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      scrollProgressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
  }

  /* ---------- 3c. Particules canvas (hero) ---------- */
  const particlesCanvas = document.getElementById('hero-particles');

  if (particlesCanvas) {
    const particlesCtx = particlesCanvas.getContext('2d');
    const heroEl = particlesCanvas.closest('.hero');
    let particles = [];

    function resizeParticlesCanvas() {
      particlesCanvas.width = heroEl.offsetWidth;
      particlesCanvas.height = heroEl.offsetHeight;
    }

    function createParticles() {
      const count = Math.min(60, Math.floor((particlesCanvas.width * particlesCanvas.height) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * particlesCanvas.width,
        y: Math.random() * particlesCanvas.height,
        r: 1 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        o: 0.2 + Math.random() * 0.4
      }));
    }

    function drawParticles() {
      particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = particlesCanvas.width;
        if (p.x > particlesCanvas.width) p.x = 0;
        if (p.y < 0) p.y = particlesCanvas.height;
        if (p.y > particlesCanvas.height) p.y = 0;

        particlesCtx.beginPath();
        particlesCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        particlesCtx.fillStyle = `rgba(168, 85, 247, ${p.o})`;
        particlesCtx.fill();
      });

      if (document.visibilityState === 'visible') {
        requestAnimationFrame(drawParticles);
      }
    }

    resizeParticlesCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeParticlesCanvas();
      createParticles();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') drawParticles();
    });
  }

  /* ---------- 4. Animations au scroll (fade-in) ---------- */
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => observer.observe(el));

  /* ---------- 4b. Compteur animé (section stats) ---------- */
  const statCounts = document.querySelectorAll('.stat-item__count');

  if (statCounts.length) {
    const COUNT_DURATION_MS = 1500;

    function animateCount(el) {
      const target = Number(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const startTime = performance.now();

      function step(now) {
        const progress = Math.min((now - startTime) / COUNT_DURATION_MS, 1);
        const value = Math.round(target * progress);
        el.textContent = value + suffix;

        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statCounts.forEach(animateCount);
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });

    statsObserver.observe(document.getElementById('stats'));
  }

  /* ---------- 4c. Accordéon FAQ ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      faqItems.forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- 4d3. Bouton retour en haut ---------- */
  const scrollTopButton = document.getElementById('scroll-top-btn');

  if (scrollTopButton) {
    window.addEventListener('scroll', () => {
      scrollTopButton.classList.toggle('is-visible', window.scrollY > 400);
    });

    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 5. Préremplissage du champ "Type de projet" ---------- */
  const typeProjetSelect = document.getElementById('devis-type-projet');
  const formule = new URLSearchParams(window.location.search).get('formule');

  if (typeProjetSelect && formule) {
    const optionValue = `Formule ${formule}`;
    const matchingOption = Array.from(typeProjetSelect.options)
      .find(option => option.value === optionValue);

    if (matchingOption) {
      typeProjetSelect.value = optionValue;
    }
  }

  /* ---------- 5b. Préremplissage + masquage du champ "Budget estimé" ---------- */
  const BUDGET_BY_FORMULE = {
    Essentiel: '490€',
    Standard: '890€',
    Premium: 'Sur devis',
    Maintenance: '29€/mois'
  };

  const budgetSelect = document.getElementById('devis-budget');
  const budgetValue = formule && BUDGET_BY_FORMULE[formule];

  if (budgetSelect && budgetValue) {
    const presetOption = document.createElement('option');
    presetOption.value = budgetValue;
    presetOption.textContent = budgetValue;
    presetOption.selected = true;
    budgetSelect.appendChild(presetOption);
    budgetSelect.value = budgetValue;

    const budgetGroup = budgetSelect.closest('.form-group');
    if (budgetGroup) budgetGroup.style.display = 'none';
  }

  /* ---------- 5c. Masquage du champ "Budget estimé" selon le "Type de projet" choisi ---------- */
  if (typeProjetSelect && budgetSelect) {
    const FORMULES_SANS_BUDGET = ['Formule Essentiel', 'Formule Standard', 'Formule Premium'];
    const budgetGroupEl = budgetSelect.closest('.form-group');

    typeProjetSelect.addEventListener('change', () => {
      const hideBudget = FORMULES_SANS_BUDGET.includes(typeProjetSelect.value);
      if (budgetGroupEl) budgetGroupEl.style.display = hideBudget ? 'none' : '';
    });
  }

  /* ---------- 5d. Calculateur de prix interactif (tarifs.html) ---------- */
  const calculatorPriceEl = document.getElementById('calculator-price');

  if (calculatorPriceEl) {
    const calculatorGroups = document.querySelectorAll('.calculator__options');

    function updateCalculatorPrice() {
      let total = 0;
      calculatorGroups.forEach(group => {
        const active = group.querySelector('.calculator__option.is-active');
        if (active) total += Number(active.dataset.value);
      });
      calculatorPriceEl.textContent = total + ' €';
    }

    calculatorGroups.forEach(group => {
      group.querySelectorAll('.calculator__option').forEach(option => {
        option.addEventListener('click', () => {
          group.querySelectorAll('.calculator__option').forEach(btn => btn.classList.remove('is-active'));
          option.classList.add('is-active');
          updateCalculatorPrice();
        });
      });
    });

    updateCalculatorPrice();

    const calculatorCta = document.getElementById('calculator-cta');

    if (calculatorCta) {
      calculatorCta.addEventListener('click', (event) => {
        event.preventDefault();

        const typeBtn = document.querySelector('[data-calc-group="type"] .is-active');
        const pagesBtn = document.querySelector('[data-calc-group="pages"] .is-active');
        const delaiBtn = document.querySelector('[data-calc-group="delai"] .is-active');

        const params = new URLSearchParams({
          calcType: typeBtn ? typeBtn.dataset.typeKey : '',
          calcTypeLabel: typeBtn ? typeBtn.textContent.trim() : '',
          calcPages: pagesBtn ? pagesBtn.textContent.trim() : '',
          calcDelai: delaiBtn ? delaiBtn.textContent.trim() : '',
          calcPrix: calculatorPriceEl.textContent.replace('€', '').trim()
        });

        window.location.href = `devis.html?${params.toString()}#devis`;
      });
    }
  }

  /* ---------- 5e. Préremplissage du devis depuis le calculateur de prix (tarifs.html) ---------- */
  const calcParams = new URLSearchParams(window.location.search);
  const calcTypeKey = calcParams.get('calcType');

  if (typeProjetSelect && calcTypeKey) {
    const TYPE_KEY_TO_OPTION = {
      vitrine: 'Site vitrine',
      ecommerce: 'Site e-commerce',
      refonte: 'Refonte de site existant'
    };

    const mappedType = TYPE_KEY_TO_OPTION[calcTypeKey];
    if (mappedType) typeProjetSelect.value = mappedType;

    const calcPrix = Number(calcParams.get('calcPrix'));

    if (budgetSelect && !Number.isNaN(calcPrix)) {
      let calcBudgetValue;
      if (calcPrix < 1000) calcBudgetValue = '500 € - 1000 €';
      else if (calcPrix < 2000) calcBudgetValue = '1000 € - 2000 €';
      else calcBudgetValue = 'Plus de 2000 €';
      budgetSelect.value = calcBudgetValue;
    }

    const devisMessageEl = document.getElementById('devis-message');
    const calcTypeLabel = calcParams.get('calcTypeLabel') || '';
    const calcPages = calcParams.get('calcPages') || '';
    const calcDelai = calcParams.get('calcDelai') || '';

    if (devisMessageEl && !devisMessageEl.value) {
      devisMessageEl.value = `Bonjour, je souhaite un site ${calcTypeLabel} avec ${calcPages} pages en ${calcDelai}. Budget estimé : ${calcPrix}€`;
    }
  }

  /* ---------- 6. Formulaires (contact.html, devis.html) ---------- */
  function openCalendlyWithPromo() {
    const promoBanner = document.getElementById('calendly-promo-banner');
    if (promoBanner) promoBanner.hidden = false;

    if (typeof Calendly !== 'undefined') {
      Calendly.initPopupWidget({ url: 'https://calendly.com/contact-nexaweb62/30min' });
    }

    const observer = new MutationObserver(() => {
      if (!document.querySelector('.calendly-overlay')) {
        if (promoBanner) promoBanner.hidden = true;
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true });
  }

  document.querySelectorAll('.ajax-form').forEach(form => {
    const feedback = form.querySelector('.contact-form__feedback');
    const submitBtn = form.querySelector('.contact-form__submit');
    const errorBanner = form.querySelector('.form-error-banner:not(.recaptcha-error)');
    const recaptchaEl = form.querySelector('.g-recaptcha');
    const recaptchaError = form.querySelector('.recaptcha-error');
    const requiredFields = Array.from(form.querySelectorAll('[required]'));

    if (recaptchaEl && recaptchaError && recaptchaEl.dataset.callback) {
      window[recaptchaEl.dataset.callback] = () => { recaptchaError.hidden = true; };
    }

    function showFieldError(field) {
      field.classList.add('is-invalid');
      let errorEl = field.parentElement.querySelector('.field-error');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'field-error';
        errorEl.setAttribute('data-i18n', 'form.fieldRequired');
        field.insertAdjacentElement('afterend', errorEl);
      }
      errorEl.textContent = t('form.fieldRequired');
    }

    function clearFieldError(field) {
      field.classList.remove('is-invalid');
      const errorEl = field.parentElement.querySelector('.field-error');
      if (errorEl) errorEl.remove();
    }

    function validateRequiredFields() {
      let isValid = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          showFieldError(field);
        } else {
          clearFieldError(field);
        }
      });
      return isValid;
    }

    requiredFields.forEach(field => {
      field.addEventListener('input', () => clearFieldError(field));
      field.addEventListener('change', () => clearFieldError(field));
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!validateRequiredFields()) {
        if (errorBanner) errorBanner.hidden = false;
        requiredFields.find(field => field.classList.contains('is-invalid'))?.focus();
        return;
      }

      if (errorBanner) errorBanner.hidden = true;

      if (recaptchaEl) {
        const recaptchaResponse = typeof grecaptcha !== 'undefined' ? grecaptcha.getResponse() : '';
        if (!recaptchaResponse) {
          if (recaptchaError) recaptchaError.hidden = false;
          return;
        }
        if (recaptchaError) recaptchaError.hidden = true;
      }

      submitBtn.disabled = true;
      feedback.removeAttribute('data-state');
      feedback.textContent = t('feedback.sending');

      try {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

        feedback.dataset.state = 'success';
        feedback.textContent = form.id === 'devis-form' ? t('devisForm.successMessage') : t('feedback.formSuccess');
        form.reset();
        if (recaptchaEl && typeof grecaptcha !== 'undefined') grecaptcha.reset();

        if (form.id === 'devis-form') {
          setTimeout(() => openCalendlyWithPromo(), 2000);
        } else if (form.id === 'contact-form') {
          setTimeout(() => { window.location.href = 'merci.html'; }, 1500);
        }
      } catch (error) {
        feedback.dataset.state = 'error';
        feedback.textContent = t('feedback.formError');
      } finally {
        submitBtn.disabled = false;
      }
    });
  });

  /* ---------- 7. Avis clients (index.html) ---------- */
  const reviewForm = document.getElementById('review-form');

  if (reviewForm) {
    const stars = reviewForm.querySelectorAll('.star-rating__star');
    const noteInput = document.getElementById('review-note');
    const feedback = document.getElementById('review-form-feedback');
    const submitBtn = reviewForm.querySelector('.contact-form__submit');

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = Number(star.dataset.value);
        noteInput.value = value;

        stars.forEach(s => {
          const starValue = Number(s.dataset.value);
          s.classList.toggle('is-active', starValue <= value);
          s.setAttribute('aria-checked', starValue === value ? 'true' : 'false');
        });
      });
    });

    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!noteInput.value) {
        feedback.dataset.state = 'error';
        feedback.textContent = t('feedback.ratingRequired');
        return;
      }

      submitBtn.disabled = true;
      feedback.removeAttribute('data-state');
      feedback.textContent = t('feedback.sending');

      try {
        const response = await fetch(reviewForm.action, {
          method: 'POST',
          body: new FormData(reviewForm),
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) throw new Error('Réponse Formspree invalide');

        feedback.dataset.state = 'success';
        feedback.textContent = t('feedback.reviewSuccess');
        reviewForm.reset();
        stars.forEach(s => {
          s.classList.remove('is-active');
          s.setAttribute('aria-checked', 'false');
        });
      } catch (error) {
        feedback.dataset.state = 'error';
        feedback.textContent = t('feedback.reviewError');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  /* ---------- 8. Popup téléphone ---------- */
  const phoneModalOverlay = document.getElementById('phone-modal-overlay');

  if (phoneModalOverlay) {
    const closePhoneModalBtn = document.getElementById('phone-modal-close');
    const callBtn = document.getElementById('phone-modal-call');

    function openPhoneModal() {
      phoneModalOverlay.classList.add('is-open');
    }

    function closePhoneModal() {
      phoneModalOverlay.classList.remove('is-open');
    }

    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        openPhoneModal();
      });
    });

    closePhoneModalBtn.addEventListener('click', closePhoneModal);

    phoneModalOverlay.addEventListener('click', (event) => {
      if (event.target === phoneModalOverlay) closePhoneModal();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closePhoneModal();
    });

    callBtn.addEventListener('click', () => {
      window.location.href = 'tel:0698840194';
    });
  }

  /* ---------- 8b. Popup email (topbar) ---------- */
  const emailModalOverlay = document.getElementById('email-modal-overlay');

  if (emailModalOverlay) {
    const closeEmailModalBtn = document.getElementById('email-modal-close');
    const emailLink = document.getElementById('topbar-email-link');
    const emailDevisBtn = document.getElementById('email-modal-devis');

    function openEmailModal() {
      emailModalOverlay.classList.add('is-open');
    }

    function closeEmailModal() {
      emailModalOverlay.classList.remove('is-open');
    }

    if (emailLink) {
      emailLink.addEventListener('click', (event) => {
        event.preventDefault();
        openEmailModal();
      });
    }

    closeEmailModalBtn.addEventListener('click', closeEmailModal);

    emailModalOverlay.addEventListener('click', (event) => {
      if (event.target === emailModalOverlay) closeEmailModal();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeEmailModal();
    });

    if (emailDevisBtn) {
      emailDevisBtn.addEventListener('click', closeEmailModal);
    }
  }

  /* ---------- 8c. Popup réalisations (aperçu projet en iframe) ---------- */
  const projectModalOverlay = document.getElementById('project-modal-overlay');

  if (projectModalOverlay) {
    const closeProjectModalBtn = document.getElementById('project-modal-close');
    const projectModalIframe = document.getElementById('project-modal-iframe');
    const projectModalTitle = document.getElementById('project-modal-title');
    const projectTriggers = document.querySelectorAll('.project-modal-trigger');

    function openProjectModal(url, name) {
      projectModalIframe.src = url;
      projectModalTitle.textContent = name;
      projectModalOverlay.classList.add('is-open');
    }

    function closeProjectModal() {
      projectModalOverlay.classList.remove('is-open');
      projectModalIframe.src = '';
    }

    projectTriggers.forEach(trigger => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        openProjectModal(trigger.dataset.demoUrl, trigger.dataset.demoName);
      });
    });

    closeProjectModalBtn.addEventListener('click', closeProjectModal);

    projectModalOverlay.addEventListener('click', (event) => {
      if (event.target === projectModalOverlay) closeProjectModal();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeProjectModal();
    });
  }

  /* ---------- 9. Popup offre de lancement (index.html) ---------- */
  const welcomePopupOverlay = document.getElementById('welcome-popup-overlay');

  if (welcomePopupOverlay) {
    const WELCOME_POPUP_STORAGE_KEY = 'nexaweb-welcome-popup-dismissed-at';
    const WELCOME_POPUP_COOLDOWN_MS = 24 * 60 * 60 * 1000;

    const dismissedAt = Number(localStorage.getItem(WELCOME_POPUP_STORAGE_KEY));
    const alreadyDismissedRecently = dismissedAt && Date.now() - dismissedAt < WELCOME_POPUP_COOLDOWN_MS;

    function closeWelcomePopup() {
      welcomePopupOverlay.classList.remove('is-open');
      localStorage.setItem(WELCOME_POPUP_STORAGE_KEY, String(Date.now()));
    }

    if (!alreadyDismissedRecently) {
      setTimeout(() => {
        welcomePopupOverlay.classList.add('is-open');
      }, 5000);

      document.getElementById('welcome-popup-close').addEventListener('click', closeWelcomePopup);
      document.getElementById('welcome-popup-dismiss').addEventListener('click', closeWelcomePopup);
      document.getElementById('welcome-popup-cta').addEventListener('click', closeWelcomePopup);

      welcomePopupOverlay.addEventListener('click', (event) => {
        if (event.target === welcomePopupOverlay) closeWelcomePopup();
      });
    }
  }

  /* ---------- 9b. Popup de sortie (exit intent) ---------- */
  const exitPopupOverlay = document.getElementById('exit-popup-overlay');

  if (exitPopupOverlay) {
    const EXIT_POPUP_SESSION_KEY = 'nexaweb-exit-popup-shown';

    function closeExitPopup() {
      exitPopupOverlay.classList.remove('is-open');
    }

    if (!sessionStorage.getItem(EXIT_POPUP_SESSION_KEY)) {
      function handleExitIntent(event) {
        if (event.clientY <= 20) {
          exitPopupOverlay.classList.add('is-open');
          sessionStorage.setItem(EXIT_POPUP_SESSION_KEY, '1');
          document.removeEventListener('mousemove', handleExitIntent);
        }
      }

      setTimeout(() => {
        document.addEventListener('mousemove', handleExitIntent);
      }, 3000);

      document.getElementById('exit-popup-close').addEventListener('click', closeExitPopup);
      document.getElementById('exit-popup-cta').addEventListener('click', closeExitPopup);

      exitPopupOverlay.addEventListener('click', (event) => {
        if (event.target === exitPopupOverlay) closeExitPopup();
      });
    }
  }

});
