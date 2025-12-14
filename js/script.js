window.onload = loadStyle;

function _getPrefix() {
  // if the page is inside the pages/ folder we need "../" before css/ and assets/
  return window.location.pathname.includes('/pages/') ? '../' : '';
}

function loadStyle() {
  var stylesheet = document.getElementById('stylesheet');
  var toggleSwitch = document.getElementById('toggleSwitch');
  var linkedin = document.getElementById('linkedin');
  var github = document.getElementById('github');
  var favicon = document.getElementById('favicon');
  var style = localStorage.getItem('style');

  const prefix = _getPrefix();
  const cssPrefix = prefix + 'css/';
  const assetsPrefix = prefix + 'assets/';

  if (style === 'style2') {
    if (stylesheet) stylesheet.setAttribute('href', cssPrefix + 'style2.css');
    if (linkedin) linkedin.setAttribute('src', assetsPrefix + 'social/linkedin-black.png');
    if (github) github.setAttribute('src', assetsPrefix + 'social/github-black.png');
    if (favicon) favicon.setAttribute('href', assetsPrefix + 'favicon-light.png');
    if (toggleSwitch) toggleSwitch.checked = true;
  } else {
    if (stylesheet) stylesheet.setAttribute('href', cssPrefix + 'style1.css');
    if (linkedin) linkedin.setAttribute('src', assetsPrefix + 'social/linkedin.png');
    if (github) github.setAttribute('src', assetsPrefix + 'social/github.png');
    if (favicon) favicon.setAttribute('href', assetsPrefix + 'favicon-dark.png');
    if (toggleSwitch) toggleSwitch.checked = false;
  }

  if (toggleSwitch) toggleSwitch.addEventListener('change', toggleStyle);
}

function toggleStyle() {
  var stylesheet = document.getElementById('stylesheet');
  var toggleSwitch = document.getElementById('toggleSwitch');
  var linkedin = document.getElementById('linkedin');
  var github = document.getElementById('github');
  var favicon = document.getElementById('favicon');

  const prefix = _getPrefix();
  const cssPrefix = prefix + 'css/';
  const assetsPrefix = prefix + 'assets/';

  if (!toggleSwitch) return;

    if (toggleSwitch.checked) {
    if (stylesheet) stylesheet.setAttribute('href', cssPrefix + 'style2.css');
    if (linkedin) linkedin.setAttribute('src', assetsPrefix + 'social/linkedin-black.png');
    if (github) github.setAttribute('src', assetsPrefix + 'social/github-black.png');
    if (favicon) favicon.setAttribute('href', assetsPrefix + 'favicon-light.png');
    localStorage.setItem('style', 'style2');
  } else {
    if (stylesheet) stylesheet.setAttribute('href', cssPrefix + 'style1.css');
    if (linkedin) linkedin.setAttribute('src', assetsPrefix + 'social/linkedin.png');
    if (github) github.setAttribute('src', assetsPrefix + 'social/github.png');
    if (favicon) favicon.setAttribute('href', assetsPrefix + 'favicon-dark.png');
    localStorage.setItem('style', 'style1');
  }
}

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    const BREAKPOINT = 700;

    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', function (e) {
        e.stopPropagation(); // ensure click doesn't bubble to the document click handler
        const isOpen = nav.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // close when clicking any nav link
    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            nav.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // close when clicking outside the header/nav
    document.addEventListener('click', (e) => {
        const header = document.querySelector('.banner');
        if (!header.contains(e.target)) {
            nav.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // close menu if user resizes to desktop width
    window.addEventListener('resize', () => {
        if (window.innerWidth > BREAKPOINT) {
            nav.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});
