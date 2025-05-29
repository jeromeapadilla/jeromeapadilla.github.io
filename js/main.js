document.addEventListener("DOMContentLoaded", function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(255, 255, 255, 0.96)";
            navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.9)";
            navbar.style.boxShadow = "none";
        }
    });

    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                toggleButton.classList.remove("active");
                navLinks.classList.remove("active");
            }

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

    // Animate elements on load
    const animateElements = () => {
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
    };

    setTimeout(animateElements, 300);

    // Social links animation
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.animation = `floatSocial 3s ease-in-out ${index * 0.2}s infinite`;
        }, 1000);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        // Toggle the active class on both the button and the menu
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle body overflow when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});

// Add to main.js
document.addEventListener('DOMContentLoaded', function() {
    const cursorTrailer = document.createElement('div');
    cursorTrailer.classList.add('cursor-trailer');
    document.body.appendChild(cursorTrailer);
    
    document.addEventListener('mousemove', e => {
        cursorTrailer.style.left = `${e.pageX}px`;
        cursorTrailer.style.top = `${e.pageY}px`;
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 0 20px rgba(112, 133, 227, 0.3)';
        card.style.transition = 'box-shadow 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});

// Enhanced filtering functionality
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-link');
    const activeCountElement = document.querySelector('.active-count');
    const totalCountElement = document.querySelector('.total-count');

    // Set total count
    totalCountElement.textContent = projectCards.length;

    // Initialize with all projects visible
    updateActiveCount('all');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.dataset.filter;

            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter projects with animation
            filterProjects(filter);

            // Update counter
            updateActiveCount(filter);
        });
    });

    function filterProjects(filter) {
        projectCards.forEach((card, index) => {
            if (filter === 'all' || card.classList.contains(filter)) {
                // Show matching card with animation
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, 300);
                }, index * 50);
            } else {
                // Hide non-matching card with animation
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }, index * 50);
            }
        });
    }

    function updateActiveCount(filter) {
        const matchingCards = filter === 'all'
            ? document.querySelectorAll('.project-card-link')
            : document.querySelectorAll(`.project-card-link.${filter}`);

        const target = matchingCards.length;
        const activeCount = activeCountElement;
        let current = parseInt(activeCount.textContent) || 0;
        const increment = target > current ? 1 : -1;

        if (current === target) {
            activeCount.textContent = target;
            return;
        }

        const updateCounter = () => {
            current += increment;
            activeCount.textContent = current;

            if ((increment === 1 && current < target) ||
                (increment === -1 && current > target)) {
                requestAnimationFrame(updateCounter);
            }
        };

        updateCounter();
    }
}

// Language switching functionality
function setupLanguageSwitching() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlElement = document.documentElement;
    
    // Set initial language from localStorage or default to English
    const currentLang = localStorage.getItem('language') || 'en';
    htmlElement.lang = currentLang;
    
    // Update button states
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Translate the page
    translatePage(currentLang);
    
    // Add click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const newLang = this.dataset.lang;
            if (newLang === currentLang) return;
            
            // Update UI
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Save preference
            localStorage.setItem('language', newLang);
            htmlElement.lang = newLang;
            
            // Translate the page
            translatePage(newLang);
        });
    });
}

function translatePage(lang) {
    // Get all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Special cases for elements without data-translate
    const specialElements = {
        'hero-subtitle': 'Programmer | Graphic Designer | Multimedia',
        'hero-title': 'Coding and Creativity',
        '.hero-description': 'hero-description',
        '.skills-container h3': 'Technical Skills',
        '.skill-category h4': ['Web Development', 'Programming', 'Design Tools'],
        '.btn': 'View Projects',
        '.section-title': ['About Me', 'My Work', 'Let\'s Connect'],
        '.category-title': ['Web Development', 'Programming', 'Graphic Design'],
        '.contact-text': 'contact-text',
        '.nav-link': ['About', 'Work', 'Contact', 'Resume']
    };
    
    // Handle these special cases
    for (const selector in specialElements) {
        const elements = document.querySelectorAll(selector);
        const translationKey = specialElements[selector];
        
        elements.forEach((el, index) => {
            let key;
            if (Array.isArray(translationKey)) {
                key = translationKey[index];
            } else {
                key = translationKey;
            }
            
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    }
}

// Call this when DOM is loaded
document.addEventListener('DOMContentLoaded', setupLanguageSwitching);  

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', setupProjectFilters);


// Add this to your existing DOMContentLoaded event listener
document.querySelectorAll('.skill').forEach(skill => {
    const level = skill.getAttribute('data-level');
    skill.style.setProperty('--skill-level', `${level}%`);
    
    // Create the progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'skill-progress';
    skill.appendChild(progressBar);
    
    // Animate it
    setTimeout(() => {
        progressBar.style.width = `${level}%`;
    }, 100);
});

// Add this to your main.js
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Add this to your existing JavaScript
function initializeProgressBars() {
    document.querySelectorAll('.progress-fill').forEach(bar => {
        // Get the width from the style attribute
        const targetWidth = bar.getAttribute('style')?.match(/width:\s*(\d+%)/)?.[1] || '0%';
        
        // Reset to 0 for animation
        bar.style.width = '0';
        
        // Animate to target width
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
}

// Call this when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProgressBars();
    
    // Also initialize when filtering projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Wait for filter animation to complete
            setTimeout(initializeProgressBars, 500);
        });
    });
});

// Add this to your main.js
document.addEventListener('DOMContentLoaded', function() {
    // Animate progress bars
    document.querySelectorAll('.animate-progress').forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 300);
    });

    // Animate log entries
    const logEntries = document.querySelectorAll('.log-entry');
    logEntries.forEach((entry, index) => {
        setTimeout(() => {
            entry.classList.add('animate');
        }, index * 200);
    });

    // Add hover effect to status badges
    document.querySelectorAll('.status-badge').forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'scale(1.1)';
        });
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'scale(1)';
        });
    });
});