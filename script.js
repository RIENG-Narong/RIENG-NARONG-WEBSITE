/* ==========================================================================
   1. NAVBAR SCROLL STATE + MOBILE TOGGLE
   ========================================================================== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backToTop.classList.toggle('show', window.scrollY > 500);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ==========================================================================
   2. ACTIVE NAV HIGHLIGHT ON SCROLL
   ========================================================================== */
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(sec => navObserver.observe(sec));

/* ==========================================================================
   3. TYPING EFFECT (HERO TITLE)
   ========================================================================== */
const typedTextEl = document.getElementById('typedText');
const phrases = [
  'System Network Administration & Cybersecurity Student',
  'Aspiring Linux & Network Administrator',
  'Future Cybersecurity Professional'
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    charIdx++;
    typedTextEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIdx--;
    typedTextEl.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 55);
}
typeLoop();

/* ==========================================================================
   4. SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
const revealEls = document.querySelectorAll('.reveal, .reveal-zoom');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* ==========================================================================
   5. SKILL BARS FILL ON VIEW
   ========================================================================== */
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.skill-bar-fill');
      const level = entry.target.dataset.level;
      requestAnimationFrame(() => { fill.style.width = level + '%'; });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillCards.forEach(card => skillObserver.observe(card));

/* ==========================================================================
   6. PROJECT CARDS (DATA-DRIVEN) + MODAL
   ========================================================================== */
const projects = [
  {
    icon: 'fa-server',
    title: 'Linux Server Administration',
    desc: 'Configuring and hardening a Linux server: users, permissions, services, and firewall rules.',
    tags: ['Linux', 'Bash', 'iptables'],
    full: 'Set up a Linux server from scratch: user/group management, SSH hardening, service configuration (Apache/Nginx), and firewall rules with iptables/ufw. Focus on the Principle of Least Privilege throughout.'
  },
  {
    icon: 'fa-network-wired',
    title: 'Network Configuration',
    desc: 'Designing and configuring a small routed/switched topology in Cisco Packet Tracer.',
    tags: ['Cisco', 'VLAN', 'Routing'],
    full: 'Built a multi-VLAN topology with inter-VLAN routing, static and dynamic routing (OSPF), and basic port security across switches and routers using Cisco Packet Tracer and GNS3.'
  },
  {
    icon: 'fa-users-gear',
    title: 'Active Directory Deployment',
    desc: 'Deploying a Windows Server domain with AD DS, OUs, GPOs, and user policies.',
    tags: ['Windows Server', 'AD DS', 'GPO'],
    full: 'Deployed Active Directory Domain Services on Windows Server, structured Organizational Units, and applied Group Policy Objects to enforce password and access policies for lab users.'
  },
  {
    icon: 'fa-database',
    title: 'Database Management System',
    desc: 'Designing a relational schema and practicing SQL queries, backups, and access control.',
    tags: ['SQL', 'Schema Design', 'Backups'],
    full: 'Designed a normalized relational schema, practiced CRUD operations and joins, and implemented role-based access control and backup/restore procedures.'
  },
  {
    icon: 'fa-shield-halved',
    title: 'Cybersecurity Lab',
    desc: 'Hands-on lab covering vulnerability scanning, basic hardening, and log analysis.',
    tags: ['Security', 'Hardening', 'Logs'],
    full: 'Practiced vulnerability scanning on lab VMs, applied hardening baselines, and reviewed system/firewall logs to detect suspicious activity — reinforcing defense-in-depth concepts.'
  },
  {
    icon: 'fa-cloud',
    title: 'Cloud Infrastructure Project',
    desc: 'Exploring virtual machines, storage, and basic networking in a cloud environment.',
    tags: ['Cloud', 'VMs', 'Virtual Networking'],
    full: 'Provisioned virtual machines and virtual networks in a cloud sandbox, exploring identity/access basics and cost-aware resource management.'
  }
];

const projectsGrid = document.getElementById('projectsGrid');
projects.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'project-card reveal';
  card.style.setProperty('--i', i);
  card.innerHTML = `
    <div class="project-thumb"><i class="fa-solid ${p.icon}"></i></div>
    <div class="project-body">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <a href="#" class="project-link view-details" data-idx="${i}" aria-label="View details for ${p.title}">View Details <i class="fa-solid fa-arrow-right"></i></a>
    </div>`;
  projectsGrid.appendChild(card);
  revealObserver.observe(card);
});

const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTags = document.getElementById('modalTags');
const modalClose = document.getElementById('modalClose');

projectsGrid.addEventListener('click', (e) => {
  const link = e.target.closest('.view-details');
  if (!link) return;
  e.preventDefault();
  const p = projects[link.dataset.idx];
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.full;
  modalTags.innerHTML = p.tags.map(t => `<span>${t}</span>`).join('');
  modalOverlay.classList.add('open');
});
modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove('open'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modalOverlay.classList.remove('open'); });

/* ==========================================================================
   7. ANIMATED COUNTERS
   ========================================================================== */
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ==========================================================================
   8. CONTACT FORM VALIDATION
   ========================================================================== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function setFieldError(fieldId, invalid) {
  document.getElementById(fieldId).classList.toggle('invalid', invalid);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const message = document.getElementById('msgInput').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let valid = true;
  if (name.length < 2) { setFieldError('nameField', true); valid = false; } else setFieldError('nameField', false);
  if (!emailRegex.test(email)) { setFieldError('emailField', true); valid = false; } else setFieldError('emailField', false);
  if (message.length < 10) { setFieldError('msgField', true); valid = false; } else setFieldError('msgField', false);

  if (!valid) {
    formStatus.className = 'form-status show';
    formStatus.style.background = 'rgba(248,113,113,.08)';
    formStatus.style.color = '#f87171';
    formStatus.style.border = '1px solid rgba(248,113,113,.3)';
    formStatus.textContent = 'Please fix the highlighted fields.';
    return;
  }

  formStatus.className = 'form-status show ok';
  formStatus.textContent = `Thanks, ${name}! Your message has been captured locally (no backend is connected in this demo).`;
  contactForm.reset();
});

/* ==========================================================================
   9. BACK TO TOP
   ========================================================================== */
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ==========================================================================
   10. DOWNLOAD CV BUTTON (placeholder behavior)
   ========================================================================== */
document.getElementById('downloadCvBtn').addEventListener('click', (e) => {
  e.preventDefault();
  alert('CV file not yet attached. Replace the #downloadCvBtn link href with your CV PDF path.');
});
