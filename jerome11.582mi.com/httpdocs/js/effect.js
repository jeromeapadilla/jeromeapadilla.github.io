document.addEventListener("DOMContentLoaded", function() {
    var characters = document.querySelectorAll('.character');
    var animationAdded = false;

    function checkVisibility() {
        var scrollPosition = window.scrollY;

        characters.forEach(function(character) {
            var elementPosition = character.getBoundingClientRect().top;

            if (scrollPosition > elementPosition && !animationAdded) {
                character.classList.add('visible');
                animationAdded = true;
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Check on initial load
});
