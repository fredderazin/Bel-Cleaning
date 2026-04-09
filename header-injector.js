// assets/js/header-injector.js
(function(){
  const host = document.getElementById('site-header');
  if(!host) return;

  async function injectHeader(){
    try{
      const res = await fetch('assets/partials/header.html', { cache: 'no-cache' });
      if(!res.ok) throw new Error('HTTP ' + res.status);
      host.innerHTML = await res.text();
      wireHeader();
    }catch(e){
      console.warn('Header inject failed:', e);
      host.innerHTML =
        '<header class="header"><div class="header-container"><a class="logo" href="index.html"><img src="assets/images/svg/logo.svg" alt="Bel Cleaning"></a></div></header>';
    }
  }

  function wireHeader(){
    const body = document.body;
    const nav  = document.getElementById('main-menu');
    const ham  = document.getElementById('hamburger');
    const ovl  = document.getElementById('overlay');

    function openNav(){
      nav && nav.classList.add('open');
      body.style.overflow = 'hidden';
      ovl && ovl.classList.add('show');
      ham && ham.setAttribute('aria-expanded','true');
    }
    function closeNav(){
      nav && nav.classList.remove('open');
      body.style.overflow = '';
      ovl && ovl.classList.remove('show');
      ham && ham.setAttribute('aria-expanded','false');
    }

    ham && ham.addEventListener('click', e => {
      e.preventDefault();
      nav && nav.classList.contains('open') ? closeNav() : openNav();
    });

    ovl && ovl.addEventListener('click', closeNav);

    // Mobile dropdown toggles
    document.querySelectorAll('.menu > .dropdown > a').forEach(a => {
      a.addEventListener('click', e => {
        if (window.matchMedia('(max-width: 991px)').matches) {
          e.preventDefault();
          const li = a.parentElement;
          li.classList.toggle('show');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }
})();
