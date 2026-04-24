// 2d transform.js

//console.log('2d transform.js loaded');

//create a selector
let car = document.querySelector("#car");

car.addEventListener('click', function(event) {
    //console.log(this.id);
    this.classList.toggle('move-right');
})

//message

let infoSections = document.querySelectorAll('article section nav');

infoSections.forEach(function(element){
    element.addEventListener('click', toggleInfo);
})

function toggleInfo(event){
    //console.log('toggleInfo');
    this.parentNode.classList.toggle('visible');
}

