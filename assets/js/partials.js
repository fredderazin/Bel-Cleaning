/* /assets/js/partials.js
   Bel Cleaning – unified header, footer & sidebar injection via fetch
   (c) 2025 Don Digital
*/
(function () {
  'use strict';

  function onReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  /**
   * Fetch an HTML partial file and inject it into a mount point.
   * After injection, execute any <script> tags within the partial
   * (innerHTML does not execute scripts automatically).
   */
  function injectPartial(mountId, partialPath) {
    var mount = document.getElementById(mountId);
    if (!mount) return Promise.resolve();

    return fetch(partialPath, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error(partialPath + ' ' + res.status);
        return res.text();
      })
      .then(function (html) {
        mount.innerHTML = html;
        // Execute <script> tags inside injected HTML
        var scripts = mount.querySelectorAll('script');
        scripts.forEach(function (oldScript) {
          var newScript = document.createElement('script');
          // Copy attributes (src, data-*, etc.)
          Array.from(oldScript.attributes).forEach(function (attr) {
            newScript.setAttribute(attr.name, attr.value);
          });
          // Copy inline script content
          if (!oldScript.src && oldScript.textContent) {
            newScript.textContent = oldScript.textContent;
          }
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
      })
      .catch(function (err) {
        console.error('Partial injection failed:', err);
      });
  }

  onReady(function () {
    // Load header, footer and sidebar partials in parallel
    var tasks = [];

    if (document.getElementById('site-header')) {
      tasks.push(injectPartial('site-header', '/assets/includes/header.html'));
    }
    if (document.getElementById('site-footer')) {
      tasks.push(injectPartial('site-footer', '/assets/includes/footer.html'));
    }
    if (document.getElementById('site-sidebar')) {
      tasks.push(injectPartial('site-sidebar', '/assets/includes/sidebar.html'));
    }

    Promise.all(tasks);
  });
})();
