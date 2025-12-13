window.onload = loadStyle;

function loadStyle() {
    var stylesheet = document.getElementById('stylesheet');
    var toggleSwitch = document.getElementById('toggleSwitch');
    var linkedin = document.getElementById('linkedin');
    var github = document.getElementById('github');
    var favicon = document.getElementById('favicon');
    var style = localStorage.getItem('style');
    if (style === 'style2') {
        stylesheet.setAttribute('href', 'style2.css');
        stylesheet.href = 'style2.css';
        linkedin.setAttribute('src', 'assets/linkedin-black.png');
        github.setAttribute('src', 'assets/github-black.png');
        favicon.setAttribute('href', 'assets/favicon-light.png')
        toggleSwitch.checked = true;
    } else {
        stylesheet.setAttribute('href', 'style1.css');
        linkedin.setAttribute('src', 'assets/linkedin.png');
        github.setAttribute('src', 'assets/github.png');
        favicon.setAttribute('href', 'assets/favicon-dark.png')
        toggleSwitch.checked = false;
    }

    toggleSwitch.addEventListener('change', toggleStyle);
}

function toggleStyle() {
    var stylesheet = document.getElementById('stylesheet');
    var toggleSwitch = document.getElementById('toggleSwitch');
    var linkedin = document.getElementById('linkedin');
    var github = document.getElementById('github');
    if (toggleSwitch.checked) {
        stylesheet.setAttribute('href', 'style2.css');
        linkedin.setAttribute('src', 'assets/linkedin-black.png');
        github.setAttribute('src', 'assets/github-black.png');
        favicon.setAttribute('href', 'assets/favicon-light.png')
        localStorage.setItem('style', 'style2');
    } else {
        stylesheet.setAttribute('href', 'style1.css');
        linkedin.setAttribute('src', 'assets/linkedin.png');
        github.setAttribute('src', 'assets/github.png');
        favicon.setAttribute('href', 'assets/favicon-dark.png')
        localStorage.setItem('style', 'style1');
    }
}
