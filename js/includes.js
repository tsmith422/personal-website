// Simple client-side include loader for HTML partials
// Rewrites asset paths for pages in /pages/ and dispatches 'includes:loaded' when done
(async function () {
  function _getPrefix() {
    return window.location.pathname.includes('/pages/') ? '../' : '';
  }

  async function loadIncludes() {
    const nodes = document.querySelectorAll('[data-include]');
    if (!nodes.length) {
      // still notify others so scripts can proceed
      window.dispatchEvent(new Event('includes:loaded'));
      return;
    }

    const prefix = _getPrefix();

    await Promise.all(Array.from(nodes).map(async (el) => {
      const src = el.getAttribute('data-include');
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
        let text = await res.text();
        // fix relative asset paths that start with "assets/" inside partials
        text = text.replace(/(src|href)=("|')assets\//g, `$1=$2${prefix}assets/`);
        el.innerHTML = text;
        // execute any inline scripts inside the included fragment
        el.querySelectorAll('script').forEach(s => {
          const ns = document.createElement('script');
          if (s.src) ns.src = s.src;
          else ns.textContent = s.textContent;
          document.body.appendChild(ns);
        });
      } catch (err) {
        console.error('Include failed:', src, err);
      }
    }));

    window.dispatchEvent(new Event('includes:loaded'));
  }

  // run after DOM ready so placeholders exist
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadIncludes);
  else loadIncludes();
})();