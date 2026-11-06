(()=>{
  // ── EmailJS ──────────────────────────────────────────────────────────────
  const EMAILJS_SERVICE  = "service_z26oxrk";
  const EMAILJS_TEMPLATE = "template_fqzldr8";
  const EMAILJS_KEY      = "zvSNCl__SwxCOV3Ls";

  // ── Project card click ───────────────────────────────────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a, button')) return;
      card.querySelector('.details-btn')?.click();
    });
  });

  // ── Filter accessibility ─────────────────────────────────────────────────
  const filters = [...document.querySelectorAll('.filter')];
  const sync = () => filters.forEach(b => b.setAttribute('aria-pressed', String(b.classList.contains('active'))));
  filters.forEach(b => b.addEventListener('click', sync));
  sync();

  // ── Escape closes mobile nav ─────────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const nav = document.querySelector('.nav'), btn = document.querySelector('.menu-toggle');
    if (nav?.classList.contains('open')) {
      nav.classList.remove('open');
      btn?.setAttribute('aria-expanded', 'false');
      btn?.focus();
    }
  });

  // ── Contact form ─────────────────────────────────────────────────────────
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const btn    = form?.querySelector('button[type="submit"]');
  if (!form) return;

  // Load EmailJS SDK
  const sdk = document.createElement('script');
  sdk.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
  sdk.onload = () => emailjs.init(EMAILJS_KEY);
  document.head.appendChild(sdk);

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Spam: reject if submitted in under 3 seconds (bot behaviour)
    if (Date.now() - formOpenedAt < 3000) {
      status.className = 'form-status err';
      status.textContent = 'Something went wrong. Please try again.';
      return;
    }

    status.className = 'form-status';
    status.textContent = 'Sending…';
    btn.disabled = true;

    // Map form fields to EmailJS template variables
    const params = {
      name:       form.name.value.trim(),
      from_email: form.email.value.trim(),
      subject:    form.subject.value.trim(),
      message:    form.message.value.trim(),
    };

    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, params);
      form.reset();
      formOpenedAt = Date.now(); // reset timer after successful send
      status.classList.add('ok');
      status.textContent = 'Thanks — your message has been sent.';
    } catch (err) {
      status.classList.add('err');
      status.textContent = 'Something went wrong. Please connect with me on LinkedIn.';
      console.error('EmailJS error:', err);
    }

    btn.disabled = false;
  });

  // Track when the form section comes into view (spam timing)
  let formOpenedAt = Date.now();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) formOpenedAt = Date.now(); });
  }, { threshold: 0.3 });
  observer.observe(form);

})();
