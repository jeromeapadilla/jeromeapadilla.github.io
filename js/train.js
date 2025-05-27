document.addEventListener('DOMContentLoaded', function() {
    // Scroll animation handler
    function handleScrollAnimation() {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
        
        if (isVisible) {
          element.classList.add('visible');
        }
      });
    }
  
    // Initialize animations
    function initAnimations() {
      const sections = [
        '.project-overview',
        '.project-features',
        '.project-tech',
        '.project-challenges',
        '.project-gallery',
        '.features-list li',
        '.tech-bubble',
        '.gallery-item'
      ];
      
      sections.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.classList.add('animate-on-scroll');
        });
      });
  
      handleScrollAnimation();
    }
  
    // Initialize and set up scroll listener
    initAnimations();
    window.addEventListener('scroll', handleScrollAnimation);
  
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    const galleryImages = document.querySelectorAll('.gallery-image');
    let currentImageIndex = 0;
  
    function updateLightboxImage() {
      const img = galleryImages[currentImageIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = img.dataset.caption || img.alt;
    }
  
    // Event listeners
    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  
    closeLightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
  
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  
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
  });

  // Add to your existing lightbox JS
// Touch events for mobile navigation
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

lightbox.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, false);

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left - next
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
  }
  if (touchEndX > touchStartX + 50) {
    // Swipe right - previous
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
  }
}

// Make arrows more visible on mobile
function updateArrowVisibility() {
  if (window.innerWidth <= 768) {
    prevArrow.style.display = 'flex';
    nextArrow.style.display = 'flex';
  }
}

// Call this on lightbox open
updateArrowVisibility();
window.addEventListener('resize', updateArrowVisibility);