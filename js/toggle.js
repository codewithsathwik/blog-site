function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('theme-icon').textContent = isDark ? '🌙' : '☀️';
}

window.addEventListener('scroll', () => {
    const pct = Math.min(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100
    );
    document.getElementById('progress').style.width = pct + '%';
});