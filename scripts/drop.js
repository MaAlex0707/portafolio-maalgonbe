/* ── Dropdown Diseño ── */
var dropbtn = document.querySelector('.dropbtn');
var dropContent = document.querySelector('.dropdown-content');

dropbtn.addEventListener('click', function (e) {
  e.stopPropagation();
  dropContent.classList.toggle('show');
});

document.addEventListener('click', function () {
  dropContent.classList.remove('show');
});


const form = document.getElementById('contactForm');
const msg  = document.getElementById('formMsg');
const btn  = document.getElementById('submitBtn');
const SEND_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Enviando…';
    try {
      const res = await fetch(form.action, {
        method: 'POST', body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        msg.className = 'contact-msg success';
        msg.textContent = '¡Mensaje enviado! Te responderé pronto 🎉';
        form.reset();
      } else { throw new Error(); }
    } catch {
      msg.className = 'contact-msg error';
      msg.textContent = 'Hubo un error. Intenta de nuevo o escríbeme directamente.';
    }
    btn.disabled = false;
    btn.innerHTML = SEND_SVG + ' Enviar mensaje';
  });



