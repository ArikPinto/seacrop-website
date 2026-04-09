(function () {
  const styles = `
    #a11y-toggle {
      position: fixed;
      bottom: 24px;
      left: 24px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #0d9488;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 22px;
      z-index: 9999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    #a11y-panel {
      position: fixed;
      bottom: 84px;
      left: 24px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 12px;
      padding: 16px;
      z-index: 9999;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      display: none;
      min-width: 200px;
      font-family: sans-serif;
    }
    #a11y-panel h3 {
      margin: 0 0 12px;
      font-size: 14px;
      color: #333;
    }
    .a11y-btn {
      display: block;
      width: 100%;
      margin-bottom: 8px;
      padding: 8px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #f9f9f9;
      cursor: pointer;
      font-size: 13px;
      text-align: left;
    }
    .a11y-btn:hover { background: #f0fdfb; }
    .a11y-btn.active { background: #0d9488; color: white; border-color: #0d9488; }
    body.a11y-high-contrast { filter: contrast(1.5); }
    body.a11y-grayscale { filter: grayscale(1); }
    body.a11y-large-text * { font-size: 120% !important; }
    body.a11y-underline-links a { text-decoration: underline !important; }
    body.a11y-pause-animations * { animation: none !important; transition: none !important; }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  const toggle = document.createElement('button');
  toggle.id = 'a11y-toggle';
  toggle.setAttribute('aria-label', 'פתח תפריט נגישות');
  toggle.textContent = '♿';

  const panel = document.createElement('div');
  panel.id = 'a11y-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'אפשרויות נגישות');
  panel.innerHTML = `<h3>נגישות</h3>`;

  const options = [
    { label: '🔆 ניגודיות גבוהה', cls: 'a11y-high-contrast' },
    { label: '⬛ גווני אפור', cls: 'a11y-grayscale' },
    { label: '🔠 טקסט גדול', cls: 'a11y-large-text' },
    { label: '🔗 הדגשת קישורים', cls: 'a11y-underline-links' },
    { label: '⏸ עצור אנימציות', cls: 'a11y-pause-animations' },
  ];

  options.forEach(({ label, cls }) => {
    const btn = document.createElement('button');
    btn.className = 'a11y-btn';
    btn.textContent = label;
    btn.addEventListener('click', () => {
      document.body.classList.toggle(cls);
      btn.classList.toggle('active');
    });
    panel.appendChild(btn);
  });

  toggle.addEventListener('click', () => {
    const isOpen = panel.style.display === 'block';
    panel.style.display = isOpen ? 'none' : 'block';
    toggle.setAttribute('aria-expanded', !isOpen);
  });

  document.body.appendChild(toggle);
  document.body.appendChild(panel);
})();
