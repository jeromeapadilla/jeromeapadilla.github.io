// Animation on scroll
        document.addEventListener('DOMContentLoaded', function() {
            // Animate elements when they come into view
            const animateOnScroll = function() {
                const elements = document.querySelectorAll('.animate__animated');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    
                    if(elementPosition < screenPosition) {
                        element.style.opacity = '1';
                        element.classList.add(element.getAttribute('class').split('animate__animated ')[1].split(' ')[0]);
                    }
                });
            };
            
            // Run once on load
            animateOnScroll();
            
            // Run on scroll
            window.addEventListener('scroll', animateOnScroll);
            
            // Floating animation for tech bubbles
            const techBubbles = document.querySelectorAll('.tech-bubble');
            techBubbles.forEach((bubble, index) => {
                // Random delay for staggered animation
                bubble.style.animationDelay = `${index * 0.2}s`;
                
                // Add hover effect
                bubble.addEventListener('mouseover', function() {
                    this.style.transform = 'translateY(-8px) scale(1.1)';
                    this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                });
                
                bubble.addEventListener('mouseout', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                });
            });
            
            // Project link animation
            const projectLink = document.querySelector('.project-link');
            projectLink.addEventListener('mouseover', function() {
                this.classList.add('animate__pulse');
            });
            
            projectLink.addEventListener('mouseout', function() {
                this.classList.remove('animate__pulse');
            });
        });