// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    // Debugging: Log when DOM is loaded
    console.log('DOM fully loaded and parsed');
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Debugging: Log found elements
    console.log('Lightbox elements:', {
        lightbox,
        lightboxImage,
        lightboxCaption,
        closeLightbox,
        prevArrow,
        nextArrow,
        galleryItems: galleryItems.length
    });

    if (!lightbox || !lightboxImage || !lightboxCaption || !closeLightbox || !prevArrow || !nextArrow) {
        console.error('One or more lightbox elements are missing!');
        return;
    }

    if (galleryItems.length === 0) {
        console.error('No gallery items found!');
        return;
    }
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map((item, index) => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        
        if (!img || !caption) {
            console.error(`Missing image or caption in gallery item ${index}`);
            return null;
        }
        
        return {
            src: img.src,
            caption: caption.textContent
        };
    }).filter(Boolean); // Filter out any null entries
    
    if (images.length === 0) {
        console.error('No valid images found in gallery!');
        return;
    }

    console.log('Collected images:', images);
    
    function updateLightbox() {
        console.log('Updating lightbox to index:', currentImageIndex);
        lightboxImage.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].caption;
    }
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.style.cursor = 'pointer'; // Visual feedback that it's clickable
        item.addEventListener('click', (e) => {
            console.log('Gallery item clicked:', index);
            currentImageIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', (e) => {
        console.log('Closing lightbox');
        e.stopPropagation();
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            console.log('Clicked outside - closing lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Navigation arrows
    prevArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Previous arrow clicked');
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
    });
    
    nextArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Next arrow clicked');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        console.log('Key pressed:', e.key);
        switch(e.key) {
            case 'Escape':
                console.log('Closing lightbox via Escape key');
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
                break;
            case 'ArrowLeft':
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateLightbox();
                break;
            case 'ArrowRight':
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateLightbox();
                break;
        }
    });

    console.log('Lightbox initialization complete');
});