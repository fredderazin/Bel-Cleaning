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
    var elements = document.querySelectorAll('.fade_up, .fade_down, .fade_in, .zoom_in');
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
    // Single-service image slider (used on office-cleaning, house-cleaning, janitorial pages)
    var singleServiceEl = document.querySelector('.singleServicesSlider');
    if (singleServiceEl) {
      new Swiper('.singleServicesSlider', {
        loop: true,
        speed: 600,
        autoplay: { delay: 4000, disableOnInteraction: false }
      });
    }

    // Single-project slider (used on project1-single)
    var singleProjectEl = document.querySelector('.singleProject2');
    if (singleProjectEl) {
      new Swiper('.singleProject2', {
        loop: true,
        speed: 600,
        autoplay: { delay: 4000, disableOnInteraction: false }
      });
    }

    // Testimonial slider (used on team-details)
    var testimonialEl = document.querySelector('.testimonialSlider');
    if (testimonialEl) {
      new Swiper('.testimonialSlider', {
        loop: true,
        speed: 600,
        autoplay: { delay: 5000, disableOnInteraction: false },
        navigation: {
          nextEl: '.testimonial-next',
          prevEl: '.testimonial-prev'
        }
      });
    }
  }

}); // end DOMContentLoaded
