/* enhance.js — loaded after script.js. Adds behaviour only; script.js is untouched. */
(()=>{
  // Whole project card opens its dialog (button stays the keyboard target)
  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('click',e=>{
      if(e.target.closest('a,button'))return;
      card.querySelector('.details-btn')?.click();
    });
  });

  // Filter buttons expose their state to assistive tech
  const filters=[...document.querySelectorAll('.filter')];
  const sync=()=>filters.forEach(b=>b.setAttribute('aria-pressed',String(b.classList.contains('active'))));
  filters.forEach(b=>b.addEventListener('click',sync));
  sync();

  // Escape closes the mobile menu
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape')return;
    const nav=document.querySelector('.nav'),btn=document.querySelector('.menu-toggle');
    if(nav?.classList.contains('open')){
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-label','Open navigation');
      btn.focus();
    }
  });

  // Contact form: send in place and show the result, instead of leaving the site
  const form=document.getElementById('contactForm');
  if(!form)return;
  const status=document.getElementById('formStatus');
  const btn=form.querySelector('button[type="submit"]');
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    status.className='form-status';
    status.textContent='Sending…';
    btn.disabled=true;
    try{
      const res=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      if(!res.ok)throw new Error(String(res.status));
      form.reset();
      status.classList.add('ok');
      status.textContent='Thanks — your message has been sent.';
    }catch{
      status.classList.add('err');
      status.textContent='The message could not be sent. Please try again, or contact me on LinkedIn.';
    }
    btn.disabled=false;
  });
})();
