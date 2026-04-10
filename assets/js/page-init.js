/**
 * page-init.js
 * Path: /assets/js/page-init.js
 *
 * Shared initialization for ALL pages:
 *   - Intersection Observer fade/zoom animations
 *   - Page loader hide logic
 *   - Form dropdown custom selects
 *   - Swiper slider configs for service/project/testimonial pages
 */

window.addEventListener('DOMContentLoaded', function () {

  // -- Intersection Observer – fade/zoom animations --
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
      elements.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  })();


  // -- Page loader --
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

    // Safety fallback
    setTimeout(hideLoader, 3000);
  })();


  // -- Form dropdown custom selects --
  (function () {
    var dropdowns = document.querySelectorAll('.formDropDown');
    dropdowns.forEach(function (dropdown) {
      var current = dropdown.querySelector('.formDropDown__current');
      var items = dropdown.querySelectorAll('.formDropDown__list-item');
      if (!current || !items.length) return;

      current.addEventListener('click', function () {
        dropdown.classList.toggle('active');
      });

      items.forEach(function (item) {
        item.addEventListener('click', function () {
          current.textContent = item.textContent;
          dropdown.classList.remove('active');
        });
      });

      document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });
    });
  })();


  // -- Swiper: Project sliders (for project1-single and similar pages) --
  if (typeof Swiper !== 'undefined') {
    // Single-service image slider
    var singleServiceEl = document.querySelector('.single-service-slider');
    if (singleServiceEl) {
      new Swiper('.single-service-slider', {
        loop: true,
        speed: 600,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.single-service-pagination', clickable: true }
      });
    }

    // Project slider
    var projectSliderEl = document.querySelector('.project-slider');
    if (projectSliderEl) {
      new Swiper('.project-slider', {
        loop: true,
        speed: 600,
        spaceBetween: 20,
        slidesPerView: 1,
        breakpoints: {
          576:  { slidesPerView: 1.2 },
          768:  { slidesPerView: 2 },
          992:  { slidesPerView: 2.5 },
          1200: { slidesPerView: 3 }
        },
        navigation: {
          nextEl: '.project-next',
          prevEl: '.project-prev'
        }
      });
    }

    // Testimonial slider
    var testimonialEl = document.querySelector('.testimonial-slider');
    if (testimonialEl) {
      new Swiper('.testimonial-slider', {
        loop: true,
        speed: 600,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.testimonial-pagination', clickable: true }
      });
    }
  }

}); // end DOMContentLoaded
