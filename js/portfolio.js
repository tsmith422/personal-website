// Generates portfolio project cards and handles filtering/click behaviour
(function () {
  const projects = [
    {
      id: 'rev-bot',
      title: 'Rev Bot',
      thumb: '../assets/projects/discord-log.png',
      category: 'school',
      short: 'Discord bot to automate role assignment using Google Sheets API',
      url: '#'
    },
    {
      id: 'wordle-javafx',
      title: 'Wordle (JavaFX)',
      thumb: '../assets/projects/wordle1.png',
      category: 'personal',
      short: 'A Wordle-like game built in Java using JavaFX and SceneBuilder',
      url: '#'
    },
    {
      id: 'datathon-2023',
      title: '2023 Datathon',
      thumb: '../assets/projects/data2.png',
      category: 'school',
      short: 'Keras model and data cleanup to predict patient outcomes',
      url: '#'
    }
  ];

  function _getPrefix() {
    return window.location.pathname.includes('/pages/') ? '../' : '';
  }

  function buildCard(p) {
    const a = document.createElement('a');
    a.className = 'project-card';
    a.href = p.url || '#';
    a.setAttribute('data-category', p.category);
    a.setAttribute('aria-label', p.title + ' — ' + p.short);

    const imgWrap = document.createElement('div');
    imgWrap.className = 'project-thumb';
    const img = document.createElement('img');
    // make image path robust to pages/ prefix
    const prefix = _getPrefix();
    img.src = (p.thumb && p.thumb.startsWith('../')) ? p.thumb : prefix + p.thumb.replace(/^\.\//, '');
    img.alt = p.title + ' thumbnail';
    img.loading = 'lazy';
    imgWrap.appendChild(img);

    const meta = document.createElement('div');
    meta.className = 'project-meta';
    const h3 = document.createElement('h3');
    h3.textContent = p.title;
    const pdesc = document.createElement('p');
    pdesc.textContent = p.short;

    const tag = document.createElement('span');
    tag.className = 'project-tag ' + p.category;
    tag.textContent = p.category.charAt(0).toUpperCase() + p.category.slice(1);

    meta.appendChild(h3);
    meta.appendChild(pdesc);
    meta.appendChild(tag);

    a.appendChild(imgWrap);
    a.appendChild(meta);

    return a;
  }

  function render(filter) {
    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = '';
    const list = projects.filter(p => filter === 'all' ? true : p.category === filter);
    if (!list.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'No projects found.';
      grid.appendChild(empty);
      return;
    }
    list.forEach(p => grid.appendChild(buildCard(p)));
  }

  function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const f = this.getAttribute('data-filter');
        render(f);
      });
    });
  }

  function init() {
    initFilters();
    render('all');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // also re-run after includes load in case content injected later
  window.addEventListener('includes:loaded', () => { setTimeout(init, 20); });
})();
