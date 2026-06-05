/* ══════════════════════════════════════════════
   MODELADO.JS — visor 3D con model-viewer
   ══════════════════════════════════════════════ */
 
(function () {
 
  const modal      = document.getElementById('modelModal');
  const label      = document.getElementById('modelLabel');
  const closeBtn   = document.getElementById('closeModal');
  const viewerSlot = document.getElementById('viewerSlot');
  const loadingEl  = document.getElementById('viewerLoading');
 
  document.getElementById('hamburger').addEventListener('click', () =>
    document.getElementById('mobileMenu').classList.toggle('open')
  );
 
  function openModal(src, name) {
    modal.style.display = 'flex';
    label.textContent = name;
 
    loadingEl.classList.remove('hidden');
    const old = viewerSlot.querySelector('model-viewer');
    if (old) old.remove();
 
    const mv = document.createElement('model-viewer');
    mv.setAttribute('src', src);
    mv.setAttribute('auto-rotate', '');
    mv.setAttribute('camera-controls', '');
    mv.setAttribute('shadow-intensity', '1');
    mv.setAttribute('exposure', '1');
    mv.setAttribute('environment-image', 'neutral');
    mv.setAttribute('alt', name);
    mv.style.cssText = 'width:100%;height:100%;display:block;background-color:#111e28;--progress-bar-color:#f5e97a;';
 
    mv.addEventListener('load', () => {
      loadingEl.classList.add('hidden');
 
      /* Corregir transparencia: recorrer materiales y forzar OPAQUE */
      try {
        (mv.model?.materials ?? []).forEach(mat => {
          mat.setAlphaMode('OPAQUE');
          const pbr = mat.pbrMetallicRoughness;
          if (pbr?.baseColorFactor) {
            const [r, g, b] = pbr.baseColorFactor;
            pbr.setBaseColorFactor([r, g, b, 1.0]);
          }
        });
      } catch(e) {}
    });
 
    viewerSlot.appendChild(mv);
  }
 
  function closeModal() {
    modal.style.display = 'none';
    label.textContent = '';
    const mv = viewerSlot.querySelector('model-viewer');
    if (mv) mv.remove();
    loadingEl.classList.remove('hidden');
  }
 
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
  });
 
  document.querySelectorAll('.gal-card[data-model]').forEach(card => {
    card.addEventListener('click', () => {
      openModal(card.getAttribute('data-model'), card.getAttribute('data-name') || '');
    });
  });
 
})();

// ── Hamburger ──
  document.getElementById('hamburger').addEventListener('click', () =>
    document.getElementById('mobileMenu').classList.toggle('open'));
 
  // ── Lightbox ──
  const cards = Array.from(document.querySelectorAll('.gal-card'));
  const overlay = document.getElementById('lbOverlay');
  const lbImg   = document.getElementById('lbImg');
  const lbTitle = document.getElementById('lbTitle');
  const lbTool  = document.getElementById('lbTool');
  const lbDesc  = document.getElementById('lbDesc');
  const lbCnt   = document.getElementById('lbCounter');
  const lbPrev  = document.getElementById('lbPrev');
  const lbNext  = document.getElementById('lbNext');
  let current   = 0;
 
  function openLb(index) {
    current = index;
    updateLb();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
 
  function closeLb() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
 
  function updateLb() {
    const card  = cards[current];
    const img   = card.querySelector('.gal-ph img');
    const title = card.querySelector('.ov-title');
    const tool  = card.querySelector('.ov-tool');
    const desc  = card.querySelector('.ov-desc');
    lbImg.src   = img ? img.src : '';
    lbImg.alt   = img ? img.alt : '';
    lbTitle.textContent = title ? title.textContent : '';
    lbTool.textContent  = tool  ? tool.textContent  : '';
    lbDesc.textContent  = desc  ? desc.textContent  : '';
    lbCnt.textContent   = `${current + 1} / ${cards.length}`;
    lbPrev.disabled = current === 0;
    lbNext.disabled = current === cards.length - 1;
  }
 
  // Abrir al hacer click en la card
  cards.forEach((card, i) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => openLb(i));
  });
 
  document.getElementById('lbClose').addEventListener('click', closeLb);
  lbPrev.addEventListener('click', () => { if (current > 0) { current--; updateLb(); } });
  lbNext.addEventListener('click', () => { if (current < cards.length - 1) { current++; updateLb(); } });
 
  // Cerrar con clic en fondo oscuro
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLb(); });
 
  // Navegar con teclado
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLb();
    if (e.key === 'ArrowLeft'  && current > 0)                current--, updateLb();
    if (e.key === 'ArrowRight' && current < cards.length - 1) current++, updateLb();
  });