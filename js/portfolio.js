// Generates portfolio project cards and handles filtering/click behaviour
(function () {
    const projects = [
        {
            id: 'reel-guard',
            title: 'ReelGuard',
            thumb: '../assets/projects/reel-guard/extension.png',
            category: 'academic',
            short: 'Chrome extension designed to reduce doomscrolling',
            url: './projects/reel-guard.html'
        },
        {
            id: 'capstone',
            title: 'LanlVIEW',
            thumb: '../assets/projects/capstone/full-table.png',
            category: 'academic',
            short: 'Data acquisition GUI for remote data collection',
            url: './projects/capstone.html'
        },
        {
            id: 'cadets-web-app',
            title: 'Singing Cadets Web Application',
            thumb: '../assets/projects/cadets-web-app/members.png',
            category: 'academic',
            short: 'Member Management application for the Texas A&M Singing Cadets',
            url: '#'
        },
        // {
        //     id: 'ray-tracer',
        //     title: 'Ray Tracer',
        //     thumb: '../assets/projects/ray-tracer/rays.png',
        //     category: 'academic',
        //     short: 'C++ ray tracer built with OpenGL',
        //     url: '#'
        // },
        // {
        //     id: 'free-look-world',
        //     title: 'Free-Look World',
        //     thumb: '../assets/projects/free-look-world/example.png',
        //     category: 'academic',
        //     short: 'C++ 3D world with a free-look camera',
        //     url: '#'
        // },
        {
            id: 'panda-express-pos',
            title: 'Panda Express POS',
            thumb: '../assets/projects/panda-express-pos/customer.png',
            category: 'academic',
            short: 'Point-of-sale system for the Panda Express menu',
            url: '#'
        }
        // {
        //     id: 'rev-bot',
        //     title: 'Rev Bot',
        //     thumb: '../assets/projects/rev-bot/discord-log.png',
        //     category: 'personal',
        //     short: 'Discord bot that automates role assignment with Google Sheets',
        //     url: './projects/project-template.html'
        // },
        // {
        //     id: 'wordle-javafx',
        //     title: 'Wordle (JavaFX)',
        //     thumb: '../assets/projects/wordle/example.png',
        //     category: 'academic',
        //     short: 'Wordle-inspired game built with Java and JavaFX',
        //     url: '#'
        // },
        // {
        //     id: 'datathon-2023',
        //     title: '2023 Datathon',
        //     thumb: '../assets/projects/datathon-2023/crowd.png',
        //     category: 'personal',
        //     short: 'Keras model and data cleanup to predict patient outcomes',
        //     url: '#'
        // },
        // {
        //     id: 'desmos',
        //     title: 'Desmos',
        //     thumb: '../assets/projects/desmos/folder.png',
        //     category: 'personal',
        //     short: 'How I used Desmos to help me visualize and understand math concepts',
        //     url: '#'
        // },
        // {
        //     id: 'zanzibar',
        //     title: 'Zanzibar',
        //     thumb: '../assets/projects/zanzibar/title.png',
        //     category: 'academic',
        //     short: 'Turning the Zanzibar dice game into an interactive Python experience',
        //     url: '#'
        // },
        // {
        //     id: 'maze-game',
        //     title: 'Maze Game',
        //     thumb: '../assets/projects/maze-game/example.png',
        //     category: 'academic',
        //     short: 'My first JavaScript project: combining sound, graphics, and user interaction',
        //     url: '#'
        // },
        // {
        //     id: 'bubble-blaster',
        //     title: 'Bubble Blaster',
        //     thumb: '../assets/projects/bubble-blaster/example.png',
        //     category: 'academic',
        //     short: 'A simple Scratch 2D Shooter where you shoot bubbles created from parsing bitstrings',
        //     url: '#'
        // }
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
