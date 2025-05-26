// Scroll animation handler
document.addEventListener('DOMContentLoaded', function() {
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }

    // Add visible class when in viewport
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    // Initialize
    function initAnimations() {
        // Mark project details as animate-on-scroll
        const projectDetails = document.querySelector('.project-details');
        if (projectDetails) {
            projectDetails.classList.add('animate-on-scroll');
            
            // Also mark all paragraphs and other elements
            const paragraphs = projectDetails.querySelectorAll('p');
            paragraphs.forEach(p => p.classList.add('animate-on-scroll'));
            
            const features = projectDetails.querySelectorAll('.project-features, .gallery');
            features.forEach(f => f.classList.add('animate-on-scroll'));
            
            const listItems = projectDetails.querySelectorAll('.project-features li');
            listItems.forEach(li => li.classList.add('animate-on-scroll'));
            
            const galleryItems = projectDetails.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => item.classList.add('animate-on-scroll'));
            
            const techBubbles = projectDetails.querySelectorAll('.tech-bubble');
            techBubbles.forEach(bubble => bubble.classList.add('animate-on-scroll'));
        }

        // Run once on load
        handleScrollAnimation();
    }

    // Initialize animations
    initAnimations();
    
    // Run on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Add hover effect for tech bubbles
    const techBubbles = document.querySelectorAll('.tech-bubble');
    techBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
        });
        
        bubble.addEventListener('mouseleave', function() {
            this.style.animation = 'floatBubble 4s ease-in-out infinite';
        });
    });

    // Lightbox Gallery Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    let currentImageIndex = 0;
    
    // Open lightbox with clicked image
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Navigation arrows
    prevArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    });
    
    nextArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateLightboxImage();
        }
    });
    
    function updateLightboxImage() {
        const img = galleryImages[currentImageIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.dataset.caption || img.alt;
    }
});