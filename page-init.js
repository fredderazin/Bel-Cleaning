/**
 * page-init.js
 * Path: /assets/js/page-init.js
 *
 * Shared initialization for ALL pages:
 *   - Intersection Observer fade/zoom animations
 *   - Page loader hide logic
 *   - GSAP + ScrollMagic image parallax
 *
 * Page-specific Swiper configs live in their own files (e.g. home.js)
 */

window.addEventListener('DOMContentLoaded', function () {

  // ── Intersection Observer – fade/zoom animations ────────────
  (function () {
    var elements = document.querySelectorAll('.fade_up, .fade_in, .zoom_in');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
      });

      elements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback for very old browsers
      elements.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  })();


  // ── Page loader ─────────────────────────────────────────────
  (function () {
    var pageLoader = document.querySelector('.page-loader');

    function hideLoader() {
      if (pageLoader) pageLoader.classList.add('hide');
    }

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
    }

    // Safety fallback — never block UI for more than 3s
    setTimeout(hideLoader, 3000);
  })();


  // ── GSAP + ScrollMagic image parallax ───────────────────────
  if (typeof ScrollMagic !== 'undefined' && typeof gsap !== 'undefined') {
    try {
      var controller = new ScrollMagic.Controller();
      var imageSlides = document.querySelectorAll('.image');

      imageSlides.forEach(function (slideEl) {
        var img = slideEl.querySelector('img');
        if (!img) return;

        new ScrollMagic.Scene({
          triggerElement: slideEl,
          duration: '150%',
          triggerHook: 'onEnter'
        })
          .on('enter', function () {
            gsap.to(img, { duration: 1, scale: 1.6, ease: 'none' });
          })
          .on('leave', function () {
            gsap.to(img, { duration: 0.3, scale: 1, ease: 'none' });
          })
          .addTo(controller);
      });
    } catch (e) {
      console.error('ScrollMagic/GSAP init error:', e);
    }
  }

}); // end DOMContentLoaded
