/* ══════════════════════════════════════════════════════════════════
   LIGHTBOX — ilustraciones.html · concept.html
   Archivo: Scripts/lightbox.js
   ══════════════════════════════════════════════════════════════════ */
 
document.addEventListener('DOMContentLoaded', function () {
 
  /* ── Hamburger ── */
  document.getElementById('hamburger').addEventListener('click', function () {
    document.getElementById('mobileMenu').classList.toggle('open');
  });
 
  /* ── Referencias al DOM del lightbox ── */
  var overlay = document.getElementById('lbOverlay');
  var lbImg   = document.getElementById('lbImg');
  var lbTitle = document.getElementById('lbTitle');
  var lbTool  = document.getElementById('lbTool');
  var lbCnt   = document.getElementById('lbCounter');
  var lbPrev  = document.getElementById('lbPrev');
  var lbNext  = document.getElementById('lbNext');
  var lbClose = document.getElementById('lbClose');
 
  /* ── Recoger cards: funciona en ilustraciones (.gal-card) y concept (.proj-card) ── */
  var cards = Array.from(document.querySelectorAll('.gal-card, .proj-card'));
  var current = 0;
 
  cards.forEach(function (card, i) {
    /* La imagen puede estar en .gal-ph img o .proj-ph img */
    var img   = card.querySelector('.gal-ph img, .proj-ph img');
    var title = card.querySelector('.ov-title');
    var tool  = card.querySelector('.ov-tool');
 
    card.dataset.lbSrc   = img   ? img.getAttribute('src')  : '';
    card.dataset.lbAlt   = img   ? (img.getAttribute('alt') || '') : '';
    card.dataset.lbTitle = title ? title.textContent.trim() : '';
    card.dataset.lbTool  = tool  ? tool.textContent.trim()  : '';
 
    card.style.cursor = 'pointer';
    card.addEventListener('click', function () { openLb(i); });
  });
 
  /* ── Abrir lightbox en la imagen i ── */
  function openLb(index) {
    current = index;
    updateLb();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }
 
  /* ── Cerrar lightbox ── */
  function closeLb() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
 
  /* ── Actualizar imagen e info ── */
  function updateLb() {
    var card = cards[current];
    lbImg.setAttribute('src', card.dataset.lbSrc);
    lbImg.setAttribute('alt', card.dataset.lbAlt);
    lbTitle.textContent = card.dataset.lbTitle;
    lbTool.textContent  = card.dataset.lbTool;
    lbCnt.textContent   = (current + 1) + ' / ' + cards.length;
    lbPrev.disabled = (current === 0);
    lbNext.disabled = (current === cards.length - 1);
  }
 
  /* ── Botones ── */
  lbClose.addEventListener('click', function (e) {
    e.stopPropagation();
    closeLb();
  });
 
  lbPrev.addEventListener('click', function (e) {
    e.stopPropagation();
    if (current > 0) { current--; updateLb(); }
  });
 
  lbNext.addEventListener('click', function (e) {
    e.stopPropagation();
    if (current < cards.length - 1) { current++; updateLb(); }
  });
 
  /* ── Cerrar al hacer clic en el fondo oscuro ── */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) { closeLb(); }
  });
 
  /* ── Navegación por teclado ── */
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') { closeLb(); }
    if (e.key === 'ArrowLeft'  && current > 0)                { current--; updateLb(); }
    if (e.key === 'ArrowRight' && current < cards.length - 1) { current++; updateLb(); }
  });
 
});