window.onload = function() {
    init();
};

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.onclick = function() {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            themeToggle.textContent = '☀️';
            themeToggle.setAttribute('aria-pressed', 'true');
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        } else {
            themeToggle.textContent = '🌙';
            themeToggle.setAttribute('aria-pressed', 'false');
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        }
    };
    // Restore theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    // const themeToggle = document.getElementById('themeToggle'); // Removed redundant redeclaration
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeToggle) updateThemeToggleButton(true);
    } else {
        document.body.classList.remove('light-mode');
        if (themeToggle) updateThemeToggleButton(false);
    }
    init();
};

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.onclick = function() {
        const isLight = !document.body.classList.contains('light-mode');
        document.body.classList.toggle('light-mode');
        updateThemeToggleButton(isLight);
        // Persist theme preference
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    };
}

// Helper to update button state
function updateThemeToggleButton(isLight) {
    if (isLight) {
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-pressed', 'true');
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-pressed', 'false');
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
}