(function () {
  // ---- NAV ----
  var isHome = location.pathname === '/' || location.pathname === '/index.html';
  var pfx = isHome ? '' : '/';
  var onBlog = location.pathname.startsWith('/blog');

  var navEl = document.querySelector('.nav');
  if (navEl) {
    navEl.innerHTML =
      '<div class="nav-inner">' +
      (isHome
        ? '<div class="wordmark">Imago<b>.</b></div>'
        : '<a href="/" class="wordmark">Imago<b>.</b></a>') +
      '<div class="nav-links">' +
      '<a href="' + pfx + '#what">What we do</a>' +
      '<a href="' + pfx + '#why">Why Imago</a>' +
      '<a href="' + pfx + '#work">How we work</a>' +
      '<a href="/blog/"' + (onBlog ? ' class="active"' : '') + '>Blog</a>' +
      '<a href="#" class="nav-cta intake-trigger">Get in touch</a>' +
      '</div></div>';
  }

  if (isHome && navEl) {
    var heroMark = document.querySelector('.hero-mark');
    if (heroMark) {
      new IntersectionObserver(function (entries) {
        navEl.classList.toggle('show', !entries[0].isIntersecting);
      }, { threshold: 0, rootMargin: '-12px 0px 0px 0px' }).observe(heroMark);
    }
  }

  // ---- MODAL HTML ----
  document.body.insertAdjacentHTML('beforeend', [
    '<div class="modal-backdrop" id="intakeBackdrop" aria-hidden="true"></div>',
    '<div class="modal-wrap" id="intakeModal" role="dialog" aria-modal="true" aria-labelledby="intakeTitle" hidden>',
    '<div class="modal-card" id="intakeCard">',
    '<div class="modal-head"><span class="eyebrow">Start the conversation</span><button class="modal-close" id="intakeClose" aria-label="Close">&times;</button></div>',
    '<div class="modal-progress" aria-hidden="true"><div class="mp-track"><span class="mp-dot active" id="mpDot1"></span><span class="mp-line"></span><span class="mp-dot" id="mpDot2"></span></div><span class="mp-label" id="mpLabel">Step 1 of 2</span></div>',
    '<form id="intakeForm" novalidate>',
    '<input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">',
    '<div id="intakeStep1">',
    '<h2 class="modal-title" id="intakeTitle">Tell us about yourself.</h2>',
    '<p class="modal-sub">A few details so we can come prepared.</p>',
    '<div class="f-row">',
    '<div class="fld"><label class="fld-label" for="if_fname">First name <span class="req" aria-hidden="true">*</span></label><input type="text" id="if_fname" name="first_name" autocomplete="given-name" required placeholder="Jane"><span class="fld-err">Please enter your first name.</span></div>',
    '<div class="fld"><label class="fld-label" for="if_lname">Last name <span class="req" aria-hidden="true">*</span></label><input type="text" id="if_lname" name="last_name" autocomplete="family-name" required placeholder="Smith"><span class="fld-err">Please enter your last name.</span></div>',
    '</div>',
    '<div class="fld"><label class="fld-label" for="if_email">Work email <span class="req" aria-hidden="true">*</span></label><input type="email" id="if_email" name="email" autocomplete="email" required placeholder="jane@yourcompany.com"><span class="fld-err">Please enter a valid work email.</span></div>',
    '<div class="fld"><label class="fld-label" for="if_company">Company <span class="req" aria-hidden="true">*</span></label><input type="text" id="if_company" name="company" autocomplete="organization" required placeholder="Acme Corp"><span class="fld-err">Please enter your company name.</span></div>',
    '<div class="modal-foot"><button type="button" class="btn" id="toStep2">Next <span class="btn-arrow">→</span></button></div>',
    '</div>',
    '<div id="intakeStep2" hidden>',
    '<h2 class="modal-title">About your company.</h2>',
    '<p class="modal-sub">Help us understand your world before we meet.</p>',
    '<div class="f-row">',
    '<div class="fld"><label class="fld-label" for="if_role">Your role / title <span class="req" aria-hidden="true">*</span></label><input type="text" id="if_role" name="role" autocomplete="organization-title" required placeholder="Operations Manager"><span class="fld-err">Please enter your role.</span></div>',
    '<div class="fld"><label class="fld-label" for="if_size">Company size <span class="req" aria-hidden="true">*</span></label><select id="if_size" name="company_size" required><option value="">Select…</option><option value="Under 50">Under 50 employees</option><option value="50–200">50–200 employees</option><option value="200–1,000">200–1,000 employees</option><option value="1,000+">1,000+ employees</option></select><span class="fld-err">Please select a company size.</span></div>',
    '</div>',
    '<div class="fld"><label class="fld-label" for="if_industry">Industry <span class="req" aria-hidden="true">*</span></label><select id="if_industry" name="industry" required><option value="">Select…</option><option value="Manufacturing">Manufacturing</option><option value="Logistics &amp; Distribution">Logistics &amp; Distribution</option><option value="Professional Services">Professional Services</option><option value="Construction &amp; Real Estate">Construction &amp; Real Estate</option><option value="Healthcare">Healthcare</option><option value="Retail &amp; E-commerce">Retail &amp; E-commerce</option><option value="Food &amp; Beverage">Food &amp; Beverage</option><option value="Other">Other</option></select><span class="fld-err">Please select an industry.</span></div>',
    '<div class="fld"><label class="fld-label" for="if_challenge">What\'s your biggest operational challenge? <span class="fld-opt">(optional)</span></label><textarea id="if_challenge" name="challenge" rows="3" placeholder="e.g. too much manual work, slow approvals, disconnected systems…"></textarea></div>',
    '<div class="fld"><label class="fld-label" for="if_source">How did you hear about Imago? <span class="fld-opt">(optional)</span></label><select id="if_source" name="source"><option value="">Select…</option><option value="LinkedIn">LinkedIn</option><option value="Referral">Referral / word of mouth</option><option value="Google search">Google search</option><option value="Event or conference">Event or conference</option><option value="Other">Other</option></select></div>',
    '<div class="modal-foot modal-foot-2col"><button type="button" class="btn-ghost" id="toStep1">← Back</button><button type="submit" class="btn" id="intakeSubmit">Get in touch <span class="btn-arrow">→</span></button></div>',
    '</div>',
    '<div id="intakeDone" hidden><div class="modal-success"><div class="modal-check">✓</div><h2 class="modal-title" style="margin-bottom:12px;">We\'ll be in touch.</h2><p class="modal-sub" style="margin-bottom:0;">Thanks for reaching out. We\'ll review your message and come back to you within one business day.</p><button type="button" class="btn intake-close-btn" style="margin-top:28px;">Close</button></div></div>',
    '</form></div></div>',
  ].join(''));

  // ---- MODAL JS ----
  var INTAKE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxk8jz47dWn2cgPKlWahnZzW1KZ3ScCawBL7kRJx-TYUllGnn79wfxyfm8w17HtbJyDQA/exec';
  var intakeOpenTime = 0;

  function openIntake() {
    var modal = document.getElementById('intakeModal');
    var backdrop = document.getElementById('intakeBackdrop');
    modal.hidden = false;
    backdrop.classList.add('open');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { modal.classList.add('open'); });
    });
    document.getElementById('if_fname').focus();
    intakeOpenTime = Date.now();
    var scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + scrollY + 'px';
    document.body.style.width = '100%';
    document.body.dataset.scrollY = scrollY;
  }

  function closeIntake() {
    var modal = document.getElementById('intakeModal');
    var backdrop = document.getElementById('intakeBackdrop');
    modal.classList.remove('open');
    backdrop.classList.remove('open');
    setTimeout(function () { modal.hidden = true; }, 380);
    var scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, scrollY);
    document.documentElement.style.scrollBehavior = '';
  }

  document.querySelectorAll('.intake-trigger').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); openIntake(); });
  });
  document.getElementById('intakeClose').addEventListener('click', closeIntake);
  document.querySelectorAll('.intake-close-btn').forEach(function (el) {
    el.addEventListener('click', closeIntake);
  });
  document.getElementById('intakeBackdrop').addEventListener('click', closeIntake);
  document.getElementById('intakeModal').addEventListener('click', function (e) {
    if (e.target === this) closeIntake();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !document.getElementById('intakeModal').hidden) closeIntake();
  });

  document.getElementById('intakeModal').addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusable = Array.from(this.querySelectorAll(
      'button:not([disabled]), input:not([tabindex="-1"]), select, textarea'
    )).filter(function (el) { return !el.closest('[hidden]'); });
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  function validateField(el) {
    var fld = el.closest('.fld');
    if (!fld) return true;
    var ok = el.required
      ? (el.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim()) : el.value.trim().length > 0)
      : true;
    fld.classList.toggle('err', !ok);
    return ok;
  }

  function validateFields(ids) {
    return ids.map(function (id) { return validateField(document.getElementById(id)); }).every(Boolean);
  }

  document.getElementById('toStep2').addEventListener('click', function () {
    if (!validateFields(['if_fname', 'if_lname', 'if_email', 'if_company'])) return;
    document.getElementById('intakeStep1').hidden = true;
    document.getElementById('intakeStep2').hidden = false;
    document.getElementById('mpDot2').classList.add('active');
    document.getElementById('mpLabel').textContent = 'Step 2 of 2';
    document.getElementById('intakeModal').scrollTop = 0;
    document.getElementById('if_role').focus();
  });

  document.getElementById('toStep1').addEventListener('click', function () {
    document.getElementById('intakeStep2').hidden = true;
    document.getElementById('intakeStep1').hidden = false;
    document.getElementById('mpDot2').classList.remove('active');
    document.getElementById('mpLabel').textContent = 'Step 1 of 2';
    document.getElementById('intakeModal').scrollTop = 0;
  });

  document.getElementById('intakeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateFields(['if_role', 'if_size', 'if_industry'])) return;
    var honeypot = this.querySelector('[name="_gotcha"]');
    if (honeypot && honeypot.value) return;
    if (Date.now() - intakeOpenTime < 2800) return;
    var btn = document.getElementById('intakeSubmit');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    var params = new URLSearchParams();
    this.querySelectorAll('input:not([name="_gotcha"]):not([tabindex="-1"]), select, textarea').forEach(function (f) {
      if (f.name) params.set(f.name, f.value);
    });
    fetch(INTAKE_ENDPOINT, { method: 'POST', mode: 'no-cors', body: params });
    document.getElementById('intakeStep2').hidden = true;
    document.getElementById('intakeDone').hidden = false;
    document.getElementById('mpDot1').classList.remove('active');
    document.getElementById('mpDot2').classList.remove('active');
    document.getElementById('intakeModal').scrollTop = 0;
  });
})();
