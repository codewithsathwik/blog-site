let currentCategory = 'all';
    let currentSearch = '';

    function toggleTheme() {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      document.getElementById('theme-icon').textContent = isDark ? '🌙' : '☀️';
    }

    function setSection(cat, btn) {
      currentCategory = cat;
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.pill').forEach(p => p.className = 'pill');
      const pilMap = { all: 'active-all', tech: 'active-tech', personal: 'active-personal' };
      const pills = document.querySelectorAll('.pill');
      const idx = { all: 0, tech: 1, personal: 2 };
      pills[idx[cat]].classList.add(pilMap[cat]);
      applyFilters();
    }

    function setPill(cat, btn) {
      currentCategory = cat;
      document.querySelectorAll('.pill').forEach(p => p.className = 'pill');
      const pilMap = { all: 'active-all', tech: 'active-tech', personal: 'active-personal' };
      btn.classList.add(pilMap[cat]);
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      const navIdx = { all: 0, tech: 1, personal: 2 };
      document.querySelectorAll('.nav-btn')[navIdx[cat]].classList.add('active');
      applyFilters();
    }

    function filterSearch(val) {
      currentSearch = val.toLowerCase().trim();
      applyFilters();
    }

    function applyFilters() {
      const cards = document.querySelectorAll('.card:not(#empty-state)');
      let visibleCount = 0;
      cards.forEach(card => {
        const cat = card.dataset.category;
        const title = (card.dataset.title || '').toLowerCase();
        const catMatch = currentCategory === 'all' || cat === currentCategory;
        const searchMatch = !currentSearch || title.includes(currentSearch);
        const visible = catMatch && searchMatch;
        card.style.display = visible ? '' : 'none';
        if (visible) visibleCount++;
      });
      document.getElementById('empty-state').style.display = visibleCount === 0 ? '' : 'none';
    }

    // Hide empty state if real cards exist
    window.addEventListener('DOMContentLoaded', () => applyFilters());