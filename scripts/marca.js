/* ── Hamburger ── */
  document.getElementById('hamburger').addEventListener('click', () =>
    document.getElementById('mobileMenu').classList.toggle('open'));

  /* ══════════════════════════════════════════════
     VISOR DEL MANUAL DE MARCA — lógica completa
     ══════════════════════════════════════════════ */
  const slides      = Array.from(document.querySelectorAll('.bv-slide'));
  const totalPages  = slides.length;          // 30
  let   current     = 0;                      // índice actual (0-based)

  const pageInfo    = document.getElementById('bvPageInfo');
  const counter     = document.getElementById('bvCounter');
  const btnPrev     = document.getElementById('bvBtnPrev');
  const btnNext     = document.getElementById('bvBtnNext');
  const arrowPrev   = document.getElementById('bvPrev');
  const arrowNext   = document.getElementById('bvNext');
  const thumbsEl    = document.getElementById('bvThumbs');

  /* ── Genera las miniaturas dinámicamente ── */
  slides.forEach((slide, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'bv-thumb' + (i === 0 ? ' active' : '');
    thumb.dataset.index = i;

    /* Si el slide tiene una imagen real, úsala como miniatura */
    const img = slide.querySelector('img');
    if (img && img.src && !img.src.endsWith('/')) {
      const tImg = document.createElement('img');
      tImg.src = img.src; tImg.alt = `Pág ${i+1}`;
      thumb.appendChild(tImg);
    } else {
      /* Placeholder de miniatura */
      const ph = document.createElement('div');
      ph.className = 'bv-thumb-ph';
      ph.textContent = `${i + 1}`;
      thumb.appendChild(ph);
    }

    thumb.addEventListener('click', () => goTo(i));
    thumbsEl.appendChild(thumb);
  });

  /* ── Función principal: ir a página ── */
  function goTo(idx) {
    slides[current].classList.remove('active');
    document.querySelectorAll('.bv-thumb')[current].classList.remove('active');

    current = Math.max(0, Math.min(idx, totalPages - 1));

    slides[current].classList.add('active');
    const thumbItems = document.querySelectorAll('.bv-thumb');
    thumbItems[current].classList.add('active');
    /* Scroll automático a la miniatura activa */
    thumbItems[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    /* Actualiza textos */
    pageInfo.textContent  = `Página ${current + 1} de ${totalPages}`;
    counter.textContent   = `${current + 1} / ${totalPages}`;

    /* Estado de botones */
    btnPrev.disabled  = arrowPrev.disabled = (current === 0);
    btnNext.disabled  = arrowNext.disabled = (current === totalPages - 1);
  }

  /* Estado inicial */
  goTo(0);

  /* ── Eventos de navegación ── */
  btnPrev.addEventListener('click',  () => goTo(current - 1));
  btnNext.addEventListener('click',  () => goTo(current + 1));
  arrowPrev.addEventListener('click',() => goTo(current - 1));
  arrowNext.addEventListener('click',() => goTo(current + 1));

  /* ── Teclado: ← y → ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  /* ── Swipe en móvil ── */
  let touchStartX = 0;
  document.getElementById('bvStage').addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  document.getElementById('bvStage').addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? goTo(current + 1) : goTo(current - 1);
  });