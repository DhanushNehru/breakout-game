window.onload = function() {
    // Initialize the game
    if (typeof init === 'function') {
        init();
    }

    const themeToggle = document.getElementById('themeToggle');

    // Helper: update button icon + accessibility labels
    function updateThemeToggleButton(isLight) {
        if (!themeToggle) return;
        themeToggle.textContent = isLight ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
        themeToggle.setAttribute(
            'aria-label',
            isLight ? 'Switch to dark mode' : 'Switch to light mode'
        );
    }

    // Only run theme logic if themeToggle exists
    if (themeToggle) {
        // Restore saved theme from localStorage
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            updateThemeToggleButton(true);
        } else if (savedTheme === 'dark') {
            document.body.classList.remove('light-mode');
            updateThemeToggleButton(false);
        } else {
            // No preference saved — use system preference
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            document.body.classList.toggle('light-mode', prefersLight);
            updateThemeToggleButton(prefersLight);
        }

        // Handle button clicks to toggle theme
        themeToggle.onclick = function() {
            const isLight = !document.body.classList.contains('light-mode');
            document.body.classList.toggle('light-mode');
            updateThemeToggleButton(isLight);
            localStorage.setItem('theme', isLight ? 'light' : 'dark');

            // Redraw canvas immediately if a draw() function exists
            if (typeof draw === 'function') {
                draw();
            }
        };
    }
};
