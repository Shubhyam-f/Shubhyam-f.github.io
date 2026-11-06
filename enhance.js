(()=>{
  // Google Apps Script Web App Endpoint
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx77yl5HxlxCX82tlS2AbC96u4IWX4oTeQMMzdAkjtLgclPY_UQvu-n36_s8rh_bhdO/exec";

  // Card click interaction
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a, button')) return;
      card.querySelector('.details-btn')?.click();
    });
  });

  // Filter accessibility sync
  const filters = [...document.querySelectorAll('.filter')];
  const sync = () => filters.forEach(b => b.setAttribute('aria-pressed', String(b.classList.contains('active'))));
  filters.forEach(b => b.addEventListener('click', sync));
  sync();

  // Escape key closes mobile navigation
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const nav = document.querySelector('.nav'), btn = document.querySelector('.menu-toggle');
    if (nav?.classList.contains('open')) {
      nav.classList.remove('open');
      btn?.setAttribute('aria-expanded', 'false');
      btn?.focus();
    }
  });

  // Form submission handler
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');
  const btn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = 'Sending…';
    btn.disabled = true;

    // Package data as standard form URL-encoded data to bypass CORS issues
    const formData = new URLSearchParams();
    formData.append("name", form.name.value.trim());
    formData.append("email", form.email.value.trim());
    formData.append("subject", form.subject.value.trim());
    formData.append("message", form.message.value.trim());

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        // Send as a standard form submission
        body: formData 
      });

      form.reset();
      status.classList.add('ok');
      status.textContent = 'Thanks! Your message has been sent.';
    } catch (err) {
      status.classList.add('err');
      status.textContent = 'Something went wrong. Please connect with me on LinkedIn.';
    }
    btn.disabled = false;
  });
})();
