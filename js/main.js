/* ==========================================================================
   ER. Ruvana ANSARI - PORTFOLIO INTERACTIVITY & LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingEffect();
  initMobileMenu();
  initProjectFilters();
  initScrollAnimations();
  initContactForm();
  initVanillaTilt();
  initAiAssistant();
  initTimezoneWidget();
  initGithubDashboard();
  initTerminalMode();
});

/* --------------------------------------------------------------------------
   1. DARK / LIGHT THEME TOGGLE
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);
  
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(newTheme, themeIcon);
  });
}

function updateThemeIcon(theme, iconElement) {
  if (theme === 'light') {
    iconElement.className = 'fa-solid fa-moon';
  } else {
    iconElement.className = 'fa-solid fa-sun';
  }
}

/* --------------------------------------------------------------------------
   2. DYNAMIC TYPING EFFECT
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingText = document.getElementById('typingText');
  if (!typingText) return;
  
  const phrases = [
    'Full Stack Developer',
    'MERN Stack Engineer',
    'Web Developer @ Rakle IT Solution',
    'UI/UX & Web Innovator'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before starting new phrase
    }
    
    setTimeout(type, typingSpeed);
  }
  
  type();
}

/* --------------------------------------------------------------------------
   3. MOBILE NAVIGATION MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (!mobileToggle || !navLinks) return;
  
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('mobile-open')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
  });
}

/* --------------------------------------------------------------------------
   4. PROJECT FILTER TABS
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. SCROLL ANIMATIONS & SKILL BARS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Animate skill progress bars when visible
  const skillFills = document.querySelectorAll('.skill-level-fill');
  const observerOptions = { threshold: 0.3 };
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const level = fill.getAttribute('data-level');
        fill.style.width = level + '%';
        obs.unobserve(fill);
      }
    });
  }, observerOptions);
  
  skillFills.forEach(fill => observer.observe(fill));

  // Advanced scroll reveal animations
  const revealElements = document.querySelectorAll('.slide-up, .fade-in');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   6.5. VANILLA TILT ANIMATION
   -------------------------------------------------------------------------- */
function initVanillaTilt() {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.15,
      scale: 1.02
    });
  }
}

/* --------------------------------------------------------------------------
   6. CONTACT FORM HANDLING
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toastNotification');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      contactForm.reset();
      
      showToast('Message sent successfully! Thank you for reaching out, Er. Ruvana Ansari will reply soon.');
    }, 1500);
  });
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  
  toast.querySelector('.toast-message').textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* --------------------------------------------------------------------------
   8. PORTFOLIO AI ASSISTANT
   -------------------------------------------------------------------------- */
function initAiAssistant() {
  const assistant = document.getElementById('aiAssistant');
  const launcher = document.getElementById('aiLauncher');
  const closeButton = document.getElementById('aiClose');
  const panel = document.getElementById('aiChatPanel');
  const form = document.getElementById('aiChatForm');
  const input = document.getElementById('aiChatInput');
  const messages = document.getElementById('aiChatMessages');

  if (!assistant || !launcher || !panel || !form || !input || !messages) return;

  const responses = [
    {
      keywords: ['skill', 'technology', 'technologies', 'stack', 'tools', 'tech'],
      answer: 'Ruvana works across the MERN stack with React.js, Node.js, Express, MongoDB, SQL, JavaScript, Python, and Django. She also uses Git, Postman, Jira, Figma, and VS Code.'
    },
    {
      keywords: ['project', 'projects', 'work', 'built', 'portfolio'],
      answer: 'Her featured work includes EduaiQ, an AI-powered education platform; a School Management System; and a Dynamic Portfolio Builder. Open the Projects section to explore the details.'
    },
    {
      keywords: ['experience', 'career', 'job', 'rakle', 'company'],
      answer: 'Ruvana is a Web Developer at Rakle IT Solution in Noida. She builds full-stack applications, secure REST APIs, responsive interfaces, and collaborates in Agile teams.'
    },
    {
      keywords: ['available', 'availability', 'hire', 'hiring', 'freelance', 'opportunity'],
      answer: 'Yes, Ruvana is currently available for opportunities in Noida. Use the Contact section to start a conversation about a project or role.'
    },
    {
      keywords: ['contact', 'email', 'reach', 'message', 'linkedin', 'github'],
      answer: 'You can reach Ruvana through the Contact section, where you will find the email, LinkedIn, GitHub, and contact form options.'
    },
    {
      keywords: ['hello', 'hi', 'hey', 'who'],
      answer: 'Hello! I am Ruvana\'s portfolio assistant. Ask me about her skills, experience, projects, or availability.'
    }
  ];

  function setOpen(isOpen) {
    assistant.classList.toggle('is-open', isOpen);
    panel.setAttribute('aria-hidden', String(!isOpen));
    launcher.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) input.focus();
  }

  function addMessage(text, type) {
    const message = document.createElement('div');
    message.className = `ai-message ai-message-${type}`;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function getResponse(question) {
    const normalizedQuestion = question.toLowerCase();
    const match = responses.find(response => response.keywords.some(keyword => normalizedQuestion.includes(keyword)));
    return match ? match.answer : 'I can help with Ruvana\'s tech stack, projects, experience, availability, or contact details. Try asking about one of those.';
  }

  function askQuestion(question) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;
    addMessage(cleanQuestion, 'user');
    input.value = '';
    window.setTimeout(() => addMessage(getResponse(cleanQuestion), 'bot'), 350);
  }

  launcher.addEventListener('click', () => setOpen(!assistant.classList.contains('is-open')));
  closeButton?.addEventListener('click', () => setOpen(false));
  form.addEventListener('submit', event => {
    event.preventDefault();
    askQuestion(input.value);
  });
  assistant.querySelectorAll('[data-question]').forEach(button => {
    button.addEventListener('click', () => askQuestion(button.dataset.question));
  });
}

/* --------------------------------------------------------------------------
   9. SMART TIMEZONE WIDGET
   -------------------------------------------------------------------------- */
function initTimezoneWidget() {
  const myTimeEl = document.getElementById('myTime');
  const yourTimeEl = document.getElementById('yourTime');
  const tzStatus = document.getElementById('tzStatus');
  if (!myTimeEl || !yourTimeEl || !tzStatus) return;

  function updateTimes() {
    const now = new Date();
    
    // IST Time (Ruvana's Time)
    const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    myTimeEl.textContent = istTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Local Time (Recruiter's Time)
    yourTimeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Calculate overlap (Roughly assuming Ruvana works 9 AM to 10 PM IST for flexibility)
    const istHour = istTime.getHours();
    if (istHour >= 9 && istHour <= 22) {
      tzStatus.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> I am currently online and available to chat.';
    } else {
      tzStatus.innerHTML = '<i class="fa-solid fa-moon" style="color: #f59e0b;"></i> It is outside my core working hours, but I will reply within 12 hours.';
    }
  }

  updateTimes();
  setInterval(updateTimes, 60000); // Update every minute
}

/* --------------------------------------------------------------------------
   10. LIVE GITHUB DASHBOARD
   -------------------------------------------------------------------------- */
async function initGithubDashboard() {
  const ghName = document.getElementById('ghName');
  const ghUrl = document.getElementById('ghUrl');
  const ghRepos = document.getElementById('ghRepos');
  const ghFollowers = document.getElementById('ghFollowers');
  const ghRepoList = document.getElementById('ghRepoList');

  if (!ghName) return;

  const username = 'defunkt'; // Placeholder for demo purposes. Can be replaced with actual username.

  try {
    // Fetch User Profile
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error('GitHub API rate limit exceeded or user not found');
    const userData = await userRes.json();

    ghName.textContent = userData.name || userData.login;
    ghUrl.textContent = `@${userData.login}`;
    ghUrl.href = userData.html_url;
    ghRepos.textContent = userData.public_repos;
    ghFollowers.textContent = userData.followers;

    // Fetch Repos
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
    const reposData = await reposRes.json();

    ghRepoList.innerHTML = ''; // Clear loading text
    
    reposData.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'gh-repo-card';
      card.innerHTML = `
        <h4><a href="${repo.html_url}" target="_blank" style="color: var(--accent-cyan); text-decoration: none;">${repo.name}</a></h4>
        <p>${repo.description ? repo.description.substring(0, 60) + '...' : 'No description provided.'}</p>
        <div class="gh-repo-meta">
          <span><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
          <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
          ${repo.language ? `<span><i class="fa-solid fa-circle" style="font-size:0.6rem;color:var(--accent-purple);"></i> ${repo.language}</span>` : ''}
        </div>
      `;
      ghRepoList.appendChild(card);
    });

  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    ghRepoList.innerHTML = '<div style="text-align:center;width:100%;color:#ef4444;">Unable to load live GitHub data at the moment.</div>';
  }
}

/* --------------------------------------------------------------------------
   11. TERMINAL CLI (DEV MODE)
   -------------------------------------------------------------------------- */
function initTerminalMode() {
  const toggleBtn = document.getElementById('devModeToggle');
  const overlay = document.getElementById('terminalOverlay');
  const closeBtn = document.getElementById('termClose');
  const termInput = document.getElementById('termInput');
  const termBody = document.getElementById('terminalBody');

  if (!toggleBtn || !overlay) return;

  function toggleTerminal() {
    const isActive = overlay.classList.contains('is-active');
    if (isActive) {
      overlay.classList.remove('is-active');
      overlay.setAttribute('aria-hidden', 'true');
    } else {
      overlay.classList.add('is-active');
      overlay.setAttribute('aria-hidden', 'false');
      setTimeout(() => termInput.focus(), 100);
    }
  }

  toggleBtn.addEventListener('click', toggleTerminal);
  closeBtn.addEventListener('click', toggleTerminal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) toggleTerminal();
  });
  termBody.addEventListener('click', () => {
    termInput.focus();
  });

    const commands = {
      help: 'Available commands: about, skills, contact, clear, exit',
      about: 'I am Ruvana Ansari, a Full-Stack Web Developer (Python | React | FastAPI) based in Noida. Open to remote work globally.',
      skills: 'Python, Django, FastAPI, Node.js, React.js, PostgreSQL, MongoDB, MySQL, Tailwind CSS, Bootstrap.',
      contact: 'Phone: +91 9305988767 | Email: ruviansari144@gmail.com | LinkedIn: /in/ruvana',
    sudo: 'Nice try! But you do not have root privileges here.',
    clear: 'CLEAR',
    exit: 'EXIT'
  };

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInput.value.trim().toLowerCase();
      if (!val) return;

      // Echo command
      const echoLine = document.createElement('div');
      echoLine.className = 'term-prompt-line';
      echoLine.innerHTML = `<span class="term-prompt">Ruvana@dev:~$</span> <span>${val}</span>`;
      termBody.insertBefore(echoLine, termInput.parentElement);

      termInput.value = '';

      // Process command
      if (val === 'clear') {
        // Remove all lines except the first two welcome lines and the input line
        const lines = termBody.querySelectorAll('.term-line, .term-prompt-line:not(:last-child)');
        lines.forEach(l => l.remove());
      } else if (val === 'exit') {
        toggleTerminal();
      } else {
        const responseLine = document.createElement('div');
        responseLine.className = 'term-line';
        responseLine.innerHTML = commands[val] || `bash: ${val}: command not found. Type <span class="term-highlight">help</span>.`;
        termBody.insertBefore(responseLine, termInput.parentElement);
      }

      termBody.scrollTop = termBody.scrollHeight;
    }
  });
}

