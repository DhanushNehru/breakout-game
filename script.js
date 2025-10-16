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
}