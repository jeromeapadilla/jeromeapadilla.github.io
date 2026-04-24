document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('[id^="info-transform"]');

    sections.forEach(section => {
        const nav = section.querySelector('nav');
        nav.addEventListener('click', function() {
            section.classList.toggle('visible');
        });
    });
});
