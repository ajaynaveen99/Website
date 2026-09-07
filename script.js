/* ============================================================
   Navachetana Foundation — shared behaviour
   1. Mobile navigation toggle
   2. Entry pop-up (shown once per browser session)
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Entry pop-up ---------- */
  var popup = document.getElementById('entry-popup');
  if (!popup) return;

  var KEY = 'ncf-popup-seen';

  function hide() {
    popup.classList.remove('show');
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* private mode */ }
  }

  var seen = false;
  try { seen = sessionStorage.getItem(KEY) === '1'; } catch (e) { /* private mode */ }

  if (!seen) {
    window.setTimeout(function () { popup.classList.add('show'); }, 1200);
  }

  popup.addEventListener('click', function (e) {
    if (e.target === popup || e.target.closest('[data-popup-close]')) hide();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popup.classList.contains('show')) hide();
  });
})();
