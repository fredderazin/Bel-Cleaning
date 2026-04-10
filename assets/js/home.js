/**
 * home.js
 * Path: /assets/js/home.js
 *
 * Home-page–specific Swiper initialization:
 *   - Hero slider (fade effect, autoplay)
 *   - Services slider (responsive breakpoints)
 *
 * Runs after page-init.js and swiper-bundle.min.js are loaded.
 */

window.addEventListener('DOMContentLoaded', function () {

  if (typeof Swiper === 'undefined') {
    console.warn('Swiper not loaded — skipping slider init.');
    // Ensure first slide is visible even without JS slider
    var firstSlide = document.querySelector('.hero-slider .swiper-slide .animate-slide');
    if (firstSlide) firstSlide.classList.add('is-visible');
    return;
  }

  // ── Hero slider ──────────────────────────────────────────────
  var heroSliderEl = document.querySelector('.hero-slider');
  if (heroSliderEl) {
    var heroSwiper = new Swiper('.hero-slider', {
      loop: true,
      effect: 'fade',
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      speed: 700,
      on: {
        init: function () { revealActiveSlide(this); },
        slideChangeTransitionStart: function () { revealActiveSlide(this); }
      }
    });

    function revealActiveSlide(swiper) {
      swiper.slides.forEach(function (slide) {
        var content = slide.querySelector('.animate-slide');
        if (content) content.classList.remove('is-visible');
      });

      var activeSlide = swiper.slides[swiper.activeIndex];
      var activeContent = activeSlide && activeSlide.querySelector('.animate-slide');
      if (activeContent) {
        requestAnimationFrame(function () {
          activeContent.classList.add('is-visible');
        });
      }
    }
  }

  // ── Services slider ──────────────────────────────────────────
  var servicesSliderEl = document.querySelector('.services-slider');
  if (servicesSliderEl) {
    // Destroy any existing instance before re-init
    if (servicesSliderEl.swiper && typeof servicesSliderEl.swiper.destroy === 'function') {
      servicesSliderEl.swiper.destroy(true, true);
    }

    new Swiper('.services-slider', {
      loop: true,
      speed: 700,
      spaceBetween: 20,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false
      },
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      breakpoints: {
        576:  { slidesPerView: 1.2, spaceBetween: 15 },
        768:  { slidesPerView: 2,   spaceBetween: 20 },
        992:  { slidesPerView: 2.5, spaceBetween: 20 },
        1200: { slidesPerView: 3,   spaceBetween: 20 }
      },
      navigation: {
        nextEl: '.services-next',
        prevEl: '.services-prev'
      },
      pagination: {
        el: '.services-pagination',
        clickable: true
      }
    });
  }

}); // end DOMContentLoaded
