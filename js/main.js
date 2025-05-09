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

    // Mobile menu toggle
    const toggleButton = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navLinkItems = document.querySelectorAll(".nav-link");

    if (toggleButton && navLinks) {
        toggleButton.addEventListener("click", () => {
            // Toggle active states
            toggleButton.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Close menu when clicking a link
        navLinkItems.forEach(link => {
            link.addEventListener("click", () => {
                toggleButton.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

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