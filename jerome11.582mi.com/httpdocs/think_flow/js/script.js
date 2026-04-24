document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const closeMenu = document.getElementById("close-menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
        menuToggle.classList.toggle("menu-open");
    });

    closeMenu.addEventListener("click", function () {
        menu.classList.remove("active");
        menuToggle.classList.remove("menu-open");
    });
});

//waves:

document.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const footerWave = document.querySelector(".footer-wave");
    const headerWave = document.querySelector(".header-wave");

    // Adjust the wave position based on scroll
    if (footerWave) {
        footerWave.style.transform = `translateX(${scrollPosition * 0.5}px)`;
    }
    if (headerWave) {
        headerWave.style.transform = `translateX(${scrollPosition * 0.5}px)`;
    }
});

//text

