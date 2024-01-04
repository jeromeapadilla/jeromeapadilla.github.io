document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header-title');
    
    header.addEventListener('click', function() {
        const currentSize = window.getComputedStyle(header, null).getPropertyValue('font-size');
        const newSize = (parseFloat(currentSize) + 2) + 'px';
        header.style.fontSize = newSize;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const titleElement = document.querySelector(".header-title");
    const cursorElement = document.querySelector(".typing-cursor");
  
    setTimeout(function() {
      titleElement.classList.remove("typing-cursor");
      cursorElement.style.display = "none";
    }, 3500);
  });