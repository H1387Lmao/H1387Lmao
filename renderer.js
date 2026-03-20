(function () {
  function hexRgba(hex, a) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const cfg = PAGE_CONFIG;

    document.documentElement.style.setProperty('--accent', cfg.accentColor);

    document.title = cfg.title + ' - H1387Lmao';
    document.getElementById('hero-title').textContent = cfg.title;
    document.getElementById('hero-subtitle').textContent = cfg.subtitle;
    document.getElementById('gh-header-link').href = cfg.githubUrl;

    document.querySelector('.page-hero-divider').style.background =
      `linear-gradient(90deg, ${cfg.accentColor}, #22d3ee)`;

    const container = document.getElementById('components');

    cfg.components.forEach(function (comp, i) {
      const wrap = document.createElement('div');
      wrap.className = 'component';
      wrap.style.animationDelay = (0.18 + i * 0.09) + 's';

      if (comp.type === 'Text') {
        const card = document.createElement('div');
        card.className = 'glass-card';
        const md = document.createElement('div');
        md.className = 'md';
        md.innerHTML = marked.parse(comp.content || '');
        card.appendChild(md);
        wrap.appendChild(card);

      } else if (comp.type === 'Photo') {
        const align = comp.align || 'center';
        const outer = document.createElement('div');
        outer.className = 'photo-' + align;

        const inner = document.createElement('div');
        inner.className = 'photo-wrap';

        const img = document.createElement('img');
        img.src = comp.url;
        img.alt = comp.caption || '';
        img.loading = 'lazy';
        inner.appendChild(img);

        if (comp.caption) {
          const cap = document.createElement('span');
          cap.className = 'photo-caption';
          cap.textContent = comp.caption;
          inner.appendChild(cap);
        }

        outer.appendChild(inner);
        wrap.appendChild(outer);

      } else if (comp.type === 'ButtonLink') {
        const uid = 'btn-' + i;
        const style = document.createElement('style');
        const bg = hexRgba(comp.color, 0.13);
        const bgHov = comp.color;
        const border = hexRgba(comp.color, 0.38);
        const glow = hexRgba(comp.color, 0.32);
        style.textContent = `
            .${uid} {
              background: ${bg};
              border-color: ${border};
              color: ${comp.color};
            }
            .${uid}:hover {
              background: ${bgHov} !important;
              color: #fff !important;
              border-color: ${bgHov} !important;
              box-shadow: 0 8px 28px ${glow};
            }
          `;
        document.head.appendChild(style);

        const prev = container.lastElementChild;
        let row;
        if (prev && prev.classList.contains('btn-row-wrap')) {
          row = prev.querySelector('.btn-row');
        } else {
          const rowWrap = document.createElement('div');
          rowWrap.className = 'component btn-row-wrap';
          rowWrap.style.animationDelay = (0.18 + i * 0.09) + 's';
          row = document.createElement('div');
          row.className = 'btn-row';
          rowWrap.appendChild(row);
          container.appendChild(rowWrap);
        }

        const a = document.createElement('a');
        a.href = comp.url;
        a.className = 'btn-link ' + uid;
        a.textContent = comp.label;

        if (!comp.url.startsWith('index') && !comp.url.startsWith('.') && !comp.url.startsWith('#')) {
          a.target = '_blank';
        }
        row.appendChild(a);
        return;
      }

      container.appendChild(wrap);
    });
  });
})();