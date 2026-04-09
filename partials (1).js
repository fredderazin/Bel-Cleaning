/* /assets/js/partials.js
   Bel Cleaning – unified header + footer injection
   (c) 2025 Don Digital
*/
(function () {
  const onReady = (fn) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  };

  /* ---------------- HEADER ---------------- */
  const headerHTML = `
    <div class="overlay" id="overlay"></div>
    <header class="header" id="top-navbar">
      <div class="header-container">
        <a href="index.html" class="logo" aria-label="Home">
          <img src="assets/images/svg/logo.png" style="width:110px;height:80px;" alt="Bel Cleaning logo"/>
        </a>
        <button class="hamburger" id="hamburger" aria-label="Open menu" aria-controls="main-menu" aria-expanded="false">
          <img src="assets/images/svg/menu2.svg" class="menu-icon" alt="Open menu">
          <img src="assets/images/svg/close-icon.svg" alt="Close menu" class="close-icon">
        </button>
        <nav class="nav" id="main-menu" aria-label="Primary">
          <img class="dsad" src="assets/images/home/dsad.png" alt="Decorative">
          <div class="for-mobile-menu position-relative">
            <a href="index.html" class="mobile-logo" aria-label="Home">
              <img src="assets/images/svg/logo.svg" alt="Bel Cleaning logo (mobile)"/>
            </a>
            <ul class="menu">
              <li><a href="index.html">Home</a></li>
              <li class="dropdown">
                <a href="javascript:void(0);" class="submenu-toggle">Services
                  <img src="assets/images/svg/dropdown-arrow.svg" alt="" aria-hidden="true">
                </a>
                <ul class="submenu" hidden>
                  <li><a href="office-cleaning.html">Office & Facility Cleaning</a></li>
                  <li><a href="warehouse-cleaning.html">Warehouse Cleaning</a></li>
                  <li><a href="data-center-cleaning.html">Data Center Cleaning</a></li>
                  <li><a href="healthcare-cleaning.html">Healthcare Cleaning</a></li>
                  <li><a href="floor-cleaning.html">Floor Cleaning & Maintenance</a></li>
                  <li><a href="construction-cleaning.html">Construction Cleaning</a></li>
                </ul>
              </li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="commercial-cleaning-franchise.html">Franchise</a></li>
              <li><a href="commercial-cleaning-job.html">Careers</a></li>
              <li><a href="janitorial-commercial-cleaning-blog.html">Blogs</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div class="nav-actions">
            <div class="call">
              <div class="headphone-main">
                <img src="assets/images/svg/headphone-icon.svg" alt="" aria-hidden="true">
              </div>
              <div class="need-help-main">
                <p>Need Help Now?</p>
                <a href="tel:+16362455245">(636)-245-5245</a>
              </div>
            </div>
            <a href="get-quote.html" class="btn-quote get-quote-btn quote-trigger">Get A Quote
              <img src="assets/images/svg/cross-arrow.svg" alt="" aria-hidden="true">
            </a>
          </div>
        </nav>
      </div>
    </header>
  `;

  /* ---------------- FOOTER ---------------- */
  const footerHTML = `
    <footer>
      <div class="container">
        <!-- Working Hours + Quick Links -->
        <div class="row footer-row-quick">
          <div class="col-xxl-3 col-xl-3 col-lg-4 col-md-6">
            <h2 class="working-hours">Working Hours</h2>
            <div class="timing-hrw pt-0"><p>Mon - Fri</p><p>8:00 AM - 5:00 PM</p></div>
            <div class="timing-hrw"><p>Saturday</p><p>10:00 AM - 3:00 PM</p></div>
            <div class="timing-hrw border-0 pb-0"><p>Sunday</p><p>Closed</p></div>
          </div>

          <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 quicklinks-main">
            <div>
              <h2 class="working-hours">Our Services</h2>
              <ul>
                <li><a href="office-cleaning.html">Office & Facility Cleaning</a></li>
                <li><a href="warehouse-cleaning.html">Warehouse Cleaning</a></li>
                <li><a href="data-center-cleaning.html">Data Center Cleaning</a></li>
                <li><a href="healthcare-cleaning.html">Healthcare Cleaning</a></li>
                <li><a href="floor-cleaning.html">Floor Maintenance</a></li>
                <li><a href="construction-cleaning.html">Construction Cleaning</a></li>
              </ul>
            </div>
            <div>
              <h2 class="working-hours">Quick Links</h2>
              <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="commercial-cleaning-franchise.html">Franchise</a></li>
                <li><a href="commercial-cleaning-job.html">Careers</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="get-quote.html">Get Quote</a></li>
              </ul>
            </div>
          </div>

          <div class="col-xxl-4 col-xl-4 col-lg-4">
            <h2 class="working-hours">Instagram Posts</h2>
            <div class="footer-img-group">
              <a href="https://www.instagram.com/bel_cleaning" class="img-container">
                <img class="footer-imgs" src="assets/images/footer/footer-img1.jpg" alt="Instagram post 1">
                <div class="footer-img-overlay">
                  <img src="assets/images/svg/insta.svg" class="brand-instagram" alt="">
                </div>
              </a>
              <a href="https://www.instagram.com/bel_cleaning" class="img-container">
                <img class="footer-imgs" src="assets/images/footer/footer-img2.jpg" alt="Instagram post 2">
                <div class="footer-img-overlay">
                  <img src="assets/images/svg/insta.svg" class="brand-instagram" alt="">
                </div>
              </a>
              <a href="https://www.instagram.com/bel_cleaning" class="img-container">
                <img class="footer-imgs" src="assets/images/footer/footer-img3.jpg" alt="Instagram post 3">
                <div class="footer-img-overlay">
                  <img src="assets/images/svg/insta.svg" class="brand-instagram" alt="">
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Footer strip with logo, call, social -->
        <div class="media-logo-call-footer fade_up is-visible">
          <a href="index.html" class="footer-logo-link" aria-label="Bel Cleaning home">
            <img src="assets/images/svg/logo.png" alt="Bel Cleaning logo" width="110" height="80">
          </a>
          <div class="call-detl" aria-label="Call us now">
            <div class="img-main-call">
              <img src="assets/images/svg/callWhite.svg" alt="" aria-hidden="true">
            </div>
            <div>
              <p>CALL US NOW!</p>
              <a href="tel:+16362455245">(636)-245-5245</a>
            </div>
          </div>
          <div class="footer-med-icons-main" aria-label="Social links">
            <a href="https://www.facebook.com/belcleaningservices" class="footer-med-icons" aria-label="Facebook">
              <img src="assets/images/svg/facebook.svg" alt="facebook">
            </a>
            <a href="https://x.com/belcleaning" class="footer-med-icons" aria-label="X (Twitter)">
              <img src="assets/images/svg/twitter.svg" alt="twitter">
            </a>
            <a href="https://www.instagram.com/bel_cleaning" class="footer-med-icons" aria-label="Instagram">
              <img src="assets/images/svg/insta.svg" alt="instagram">
            </a>
            <a href="https://wa.me/16362455245" class="footer-med-icons" aria-label="WhatsApp">
              <img src="assets/images/svg/whatsapp.svg" alt="whatsapp">
            </a>
          </div>
        </div>
        
        <div 
  data-chat-widget 
  data-widget-id="69463c5700040436e66037f3" 
  data-location-id="zZZQS4gd9AKwVU3GSTKr"  > 
 </div> 
<script 
  src="https://widgets.leadconnectorhq.com/loader.js"  
  data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" 
 data-widget-id="69463c5700040436e66037f3"   > 
 </script>

        <script 
          src="https://widgets.leadconnectorhq.com/loader.js"  
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" 
         data-widget-id="69463c5700040436e66037f3"   > 
         </script>

        <!-- Copyright -->
        <div class="copyrights-main">
          <p>
            Copyright © <span id="year"></span> All Rights Reserved by
            <a href="https://dondigital.co" target="_blank" rel="noopener">Don Digital</a>
          </p>
          <p>
            <a href="privacy.html">Privacy Policy</a> |
            <a href="terms.html">Terms &amp; Conditions</a>
          </p>
        </div>
      </div>
    </footer>
  `;

  /* ---------------- INJECTION ---------------- */
  function injectPartials() {
    const headerMount = document.getElementById('site-header');
    const footerMount = document.getElementById('site-footer');
    if (headerMount) headerMount.innerHTML = headerHTML;
    if (footerMount) footerMount.innerHTML = footerHTML;
    setupNav();
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------- NAVIGATION SETUP ---------------- */
  function setupNav() {
    const header = document.getElementById('top-navbar');
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-menu');
    const overlay = document.getElementById('overlay');

    function openMenu() {
      nav.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      nav.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (hamburger) {
      hamburger.addEventListener('click', () => {
        nav.classList.contains('open') ? closeMenu() : openMenu();
      });
    }
    if (overlay) overlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

    // Submenu toggles
    document.querySelectorAll('.submenu-toggle').forEach(toggle => {
      const submenu = toggle.nextElementSibling;
      if (!submenu) return;
      toggle.addEventListener('click', e => {
        e.preventDefault();
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isOpen));
        submenu.hidden = isOpen;
      });
    });

    // Sticky header
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY || 0;
      if (!header) return;
      header.classList.toggle('is-sticky', y > 20);
      header.classList.toggle('hide-up', y > lastY && y > 120);
      lastY = y;
    });

    // Active link
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#main-menu a[href]').forEach(a => {
      if (a.getAttribute('href').endsWith(current)) a.classList.add('active');
    });
  }

  onReady(injectPartials);
})();
