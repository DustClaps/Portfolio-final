document.addEventListener('DOMContentLoaded', () => {
  /* GESTION DU CURSEUR */
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if(cursor) cursor.style.transform = `translate3d(${mouseX - 12}px, ${mouseY - 12}px, 0)`;
  });

  function tick() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    if(cursorRing) cursorRing.style.transform = `translate3d(${ringX - 22}px, ${ringY - 22}px, 0)`;
    requestAnimationFrame(tick);
  }
  tick();

  const interactives = 'button, a, [data-modal], .project-card, .filter-btn';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => { if(cursor) cursor.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { if(cursor) cursor.classList.remove('hover'); });
  });

  /* BULLES D'ARRIÈRE-PLAN */
  const bubbleLayer = document.getElementById('bubbleLayer');
  function spawnBubble() {
    if (!bubbleLayer || document.hidden) return;
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random() * 50 + 15;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${Math.random() * 100}vw`;
    b.style.animationDuration = `${Math.random() * 8 + 6}s`;
    bubbleLayer.appendChild(b);
    setTimeout(() => b.remove(), 14000);
  }
  setInterval(spawnBubble, 2000);

  /* FENÊTRES MODALES */
  const overlay = document.getElementById('overlay');
  const modals  = document.querySelectorAll('.aero-window');

  function openModal(id) {
    closeAll();
    const m = document.getElementById('modal-' + id);
    if (!m) return;
    m.classList.add('active');
    if(overlay) overlay.classList.add('active');
  }

  function closeAll() {
    modals.forEach(m => m.classList.remove('active'));
    if(overlay) overlay.classList.remove('active');
  }

  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      openModal(el.dataset.modal);
    });
  });

  document.querySelectorAll('.win-btn.close').forEach(b => b.addEventListener('click', closeAll));
  if(overlay) overlay.addEventListener('click', closeAll);
});