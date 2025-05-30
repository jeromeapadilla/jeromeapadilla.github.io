document.addEventListener("DOMContentLoaded", function () {
    setupNavbarScrollEffect();
    setupSmoothScrolling();
    setupMenuToggle();
    setupCursorTrailer();
    setupProjectFilters();
    setupLanguageSwitching();
    initializeSkillBars();
    animateProgressBarsOnScroll();
    initializeProgressLogs();
    setupCountdown();
    animateElementsOnLoad();
    setupSocialLinksAnimation();
});

// Navbar scroll effect
function setupNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(255, 255, 255, 0.96)";
            navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.9)";
            navbar.style.boxShadow = "none";
        }
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offset = window.innerWidth <= 768 ? 70 : 80;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Menu toggle functionality
function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Cursor trailer effect
function setupCursorTrailer() {
    const cursorTrailer = document.createElement('div');
    cursorTrailer.classList.add('cursor-trailer');
    document.body.appendChild(cursorTrailer);

    document.addEventListener('mousemove', e => {
        cursorTrailer.style.left = `${e.pageX}px`;
        cursorTrailer.style.top = `${e.pageY}px`;
    });
}

// Project filtering functionality
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-link');
    const activeCountElement = document.querySelector('.active-count');
    const totalCountElement = document.querySelector('.total-count');

    if (!filterButtons.length || !projectCards.length) return;

    totalCountElement.textContent = projectCards.length;
    updateActiveCount('all');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.dataset.filter;
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProjects(filter);
            updateActiveCount(filter);
        });
    });

    function filterProjects(filter) {
        projectCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    }

    function updateActiveCount(filter) {
        const matchingCards = filter === 'all'
            ? document.querySelectorAll('.project-card-link')
            : document.querySelectorAll(`.project-card-link.${filter}`);
        activeCountElement.textContent = matchingCards.length;
    }
}

// Language switching functionality
function setupLanguageSwitching() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlElement = document.documentElement;

    if (!langButtons.length) return;

    const currentLang = localStorage.getItem('language') || 'en';
    htmlElement.lang = currentLang;

    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    translatePage(currentLang);

    langButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const newLang = this.dataset.lang;
            if (newLang === currentLang) return;

            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            localStorage.setItem('language', newLang);
            htmlElement.lang = newLang;
            translatePage(newLang);
        });
    });
}

// Skill bars initialization
function initializeSkillBars() {
    document.querySelectorAll('.skill').forEach(skill => {
        const level = skill.getAttribute('data-level');
        skill.style.setProperty('--skill-level', `${level}%`);

        const progressBar = document.createElement('div');
        progressBar.className = 'skill-progress';
        skill.appendChild(progressBar);

        setTimeout(() => {
            progressBar.style.width = `${level}%`;
        }, 100);
    });
}

// Progress bars animation on scroll
function animateProgressBarsOnScroll() {
    const progressBars = document.querySelectorAll('.progress-fill');

    if (!progressBars.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    progressBars.forEach(bar => observer.observe(bar));
}

// Initialize progress logs animation
function initializeProgressLogs() {
    const logEntries = document.querySelectorAll('.log-entry');
    logEntries.forEach((entry, index) => {
        setTimeout(() => {
            entry.classList.add('animate');
        }, index * 200);
    });

    document.querySelectorAll('.status-badge').forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'scale(1.1)';
        });
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'scale(1)';
        });
    });
}

// Countdown functionality
function setupCountdown() {
    const countdownElements = document.querySelectorAll('.countdown');

    countdownElements.forEach(element => {
        const deadline = new Date(element.getAttribute('data-deadline'));
        const now = new Date();
        const diffTime = deadline - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
            element.textContent = `${deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} (${diffDays} days remaining)`;
            element.classList.add(diffDays <= 7 ? 'deadline-near' : 'deadline-far');
        } else {
            element.textContent = deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            element.style.color = '#95a5a6';
            element.style.background = 'rgba(149, 165, 166, 0.1)';
        }
    });
}

// Animate elements on load
function animateElementsOnLoad() {
    const elements = document.querySelectorAll(
        '.hero-title, .hero-description, .btn, .social-link, .hero-image, .section-title, .about-image, .project-card, .about-text p, .contact-text, .email-link'
    );

    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = el.classList.contains('hero-image')
                ? 'translateY(-50%) scale(1)'
                : 'translateY(0)';
        }, index * 100);
    });
}

// Social links animation
function setupSocialLinksAnimation() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.animation = `floatSocial 3s ease-in-out ${index * 0.2}s infinite`;
        }, 1000);
    });
}

// Tags animation on scroll
function animateToolTags() {
    const logEntries = document.querySelectorAll('.log-entry');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    logEntries.forEach(entry => observer.observe(entry));
}

// Call this in your DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
    // ... your existing code ...
    animateToolTags();
});

// update for tools in projects:

// Add this to your existing main.js
function animateProjectTools() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('active');
        });
        
        // Optional: Remove active class when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.classList.remove('active');
        });
    });
}

// Call this in your DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
    // ... your existing code ...
    animateProjectTools();
});