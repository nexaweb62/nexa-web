/* =========================================================
   NEXA WEB — Bannière de consentement aux cookies
   Script autonome, partagé par index.html et les pages demo-*.html
   ========================================================= */
(function () {
  var STORAGE_KEY = 'nexaweb-cookie-consent';

  if (localStorage.getItem(STORAGE_KEY)) return;

  function init() {
    var style = document.createElement('style');
    style.textContent =
      '.cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:99999;' +
      'background:#16161f;border-top:2px solid #a855f7;padding:20px 28px;' +
      'display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;' +
      'font-family:"Inter",sans-serif;color:#f5f5f5;' +
      'transform:translateY(100%);transition:transform .4s ease;' +
      'box-shadow:0 -10px 40px rgba(0,0,0,.4);}' +
      '.cookie-banner.is-visible{transform:translateY(0);}' +
      '.cookie-banner__text{flex:1;min-width:240px;font-size:.92rem;line-height:1.5;color:#d4d4dc;margin:0;}' +
      '.cookie-banner__text a{color:#c084fc;text-decoration:underline;}' +
      '.cookie-banner__actions{display:flex;gap:12px;flex-shrink:0;}' +
      '.cookie-banner__btn{padding:11px 24px;border-radius:999px;font-size:.88rem;font-weight:600;' +
      'cursor:pointer;border:none;font-family:inherit;transition:transform .2s ease,opacity .2s ease;}' +
      '.cookie-banner__btn:hover{transform:translateY(-2px);}' +
      '.cookie-banner__btn--accept{background:#a855f7;color:#fff;}' +
      '.cookie-banner__btn--decline{background:transparent;color:#f5f5f5;border:1px solid #3a3a47;}' +
      '@media (max-width:700px){.cookie-banner{flex-direction:column;align-items:stretch;text-align:center;}' +
      '.cookie-banner__actions{justify-content:center;}}';
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Consentement aux cookies');
    banner.innerHTML =
      '<p class="cookie-banner__text">Nous utilisons des cookies pour améliorer votre expérience. ' +
      'En continuant, vous acceptez notre <a href="mentions-legales.html#confidentialite">politique de confidentialité</a>.</p>' +
      '<div class="cookie-banner__actions">' +
      '<button type="button" class="cookie-banner__btn cookie-banner__btn--decline" data-cookie-action="decline">Refuser</button>' +
      '<button type="button" class="cookie-banner__btn cookie-banner__btn--accept" data-cookie-action="accept">Tout accepter</button>' +
      '</div>';

    document.body.appendChild(banner);

    function hideBanner(choice) {
      localStorage.setItem(STORAGE_KEY, choice);
      banner.classList.remove('is-visible');
      setTimeout(function () { banner.remove(); }, 400);
    }

    banner.querySelector('[data-cookie-action="accept"]').addEventListener('click', function () {
      hideBanner('accepted');
    });
    banner.querySelector('[data-cookie-action="decline"]').addEventListener('click', function () {
      hideBanner('declined');
    });

    setTimeout(function () {
      banner.classList.add('is-visible');
    }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
