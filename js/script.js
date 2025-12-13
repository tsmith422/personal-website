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
    if (linkedin) linkedin.setAttribute('src', assetsPrefix + 'linkedin-black.png');
    if (github) github.setAttribute('src', assetsPrefix + 'github-black.png');
    if (favicon) favicon.setAttribute('href', assetsPrefix + 'favicon-light.png');
    if (toggleSwitch) toggleSwitch.checked = true;
  } else {
    if (stylesheet) stylesheet.setAttribute('href', cssPrefix + 'style1.css');
    if (linkedin) linkedin.setAttribute('src', assetsPrefix + 'linkedin.png');
    if (github) github.setAttribute('src', assetsPrefix + 'github.png');
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
    if (linkedin) linkedin.setAttribute('src', assetsPrefix + 'linkedin-black.png');
    if (github) github.setAttribute('src', assetsPrefix + 'github-black.png');
    if (favicon) favicon.setAttribute('href', assetsPrefix + 'favicon-light.png');
    localStorage.setItem('style', 'style2');
  } else {
    if (stylesheet) stylesheet.setAttribute('href', cssPrefix + 'style1.css');
    if (linkedin) linkedin.setAttribute('src', assetsPrefix + 'linkedin.png');
    if (github) github.setAttribute('src', assetsPrefix + 'github.png');
    if (favicon) favicon.setAttribute('href', assetsPrefix + 'favicon-dark.png');
    localStorage.setItem('style', 'style1');
  }
}
