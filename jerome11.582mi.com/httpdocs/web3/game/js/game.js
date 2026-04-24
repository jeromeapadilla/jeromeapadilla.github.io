// Create the canvas
var cvs = document.createElement("canvas");
var ctx = cvs.getContext("2d");
cvs.width = document.documentElement.clientWidth;
cvs.height = document.documentElement.clientHeight;
document.querySelector("#gameBox").appendChild(cvs);

// Load sprites
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.src = "images/grass3.png";
bgImage.onload = function () {
    bgReady = true;
};

// Load directional dog images
var dogImages = {
    up: { image: new Image(), ready: false },
    down: { image: new Image(), ready: false },
    left: { image: new Image(), ready: false },
    right: { image: new Image(), ready: false }
};

dogImages.up.image.src = "images/dog_up.png";
dogImages.up.image.onload = function () { dogImages.up.ready = true; };

dogImages.down.image.src = "images/dog_down.png";
dogImages.down.image.onload = function () { dogImages.down.ready = true; };

dogImages.left.image.src = "images/dog_left.png";
dogImages.left.image.onload = function () { dogImages.left.ready = true; };

dogImages.right.image.src = "images/dog_right.png";
dogImages.right.image.onload = function () { dogImages.right.ready = true; };

// Animal control officer image
var officerReady = false;
var officerImage = new Image();
officerImage.src = "images/officer.png";
officerImage.onload = function () {
    officerReady = true;
};

// Bone image
var boneReady = false;
var boneImage = new Image();
boneImage.src = "images/bone3.png";
boneImage.onload = function () {
    boneReady = true;
};

// Win and Game Over images
var winImage = new Image();
winImage.src = "images/won.png";
var overImage = new Image();
overImage.src = "images/gameover1.png";

// Game objects
var dog = {
    speed: 5,
    width: 96,
    height: 96,
    health: 100,
    direction: "down" // Initial direction
};

var bones = [
    { width: 30, height: 30 },
    { width: 30, height: 30 },
    { width: 30, height: 30 }
];

var officers = [
    { width: 70, height: 50 },
    { width: 70, height: 50 }
];

let pFrames = 4; // Dog spritesheet frames
var currentFrame = 0;
var gameOver = false;
var timeLimit = 60; // Time limit in seconds
var timer = timeLimit;

// Audio elements for game sounds
var sounds = {
    win: new Audio("win.mp3"),
    over: new Audio("sad.mp3"),
    boneSound: new Audio("bark.mp3")
};

// Preload sound files
Object.values(sounds).forEach(sound => {
    sound.volume = 1; // Set volume (0.0 to 1.0)
});

// Velocity variables
var vX = 0;
var vY = 0;

// Handle keyboard controls
addEventListener("keydown", function (e) {
    if (e.keyCode == 38) { // Up
        dog.direction = "up";
        vX = 0; 
        vY = -dog.speed; 
    }
    if (e.keyCode == 37) { // Left
        dog.direction = "left";
        vX = -dog.speed; 
        vY = 0; 
    }
    if (e.keyCode == 40) { // Down
        dog.direction = "down";
        vX = 0; 
        vY = dog.speed; 
    }
    if (e.keyCode == 39) { // Right
        dog.direction = "right";
        vX = dog.speed; 
        vY = 0; 
    }
    if (e.keyCode == 32) { // Stop
        vX = 0; 
        vY = 0; 
    }
}, false);

// Initialize game state
var init = function () {
    dog.x = (cvs.width - dog.width) / 2;
    dog.y = (cvs.height - dog.height) / 2;

    // Place bones and officers at random locations
    for (var i in bones) {
        bones[i].x = Math.random() * (cvs.width - bones[i].width);
        bones[i].y = Math.random() * (cvs.height - bones[i].height);
    }

    for (var i in officers) {
        officers[i].x = Math.random() * (cvs.width - officers[i].width);
        officers[i].y = Math.random() * (cvs.height - officers[i].height);
    }

    gameOver = false;
    timer = timeLimit;
};

// Game loop
var main = function () {
    if (checkWin()) {
        if (winImage) {
            ctx.drawImage(winImage, (cvs.width - winImage.width) / 2, (cvs.height - winImage.height) / 2);
            if (sounds.win.paused) {
                sounds.win.currentTime = 0; // Reset sound
                sounds.win.play();
            }
        }
    } else if (gameOver) {
        if (overImage) {
            ctx.drawImage(overImage, (cvs.width - overImage.width) / 2, (cvs.height - overImage.height) / 2);
            if (sounds.over.paused) {
                sounds.over.currentTime = 0; // Reset sound
                sounds.over.play();
            }
        }
    } else {
        update();
        render();
        window.requestAnimationFrame(main);
    }
};

// Update game state
var update = function () {
    // Update dog position with bounds check
    if (dog.x + vX >= 0 && dog.x + vX <= cvs.width - dog.width) dog.x += vX;
    if (dog.y + vY >= 0 && dog.y + vY <= cvs.height - dog.height) dog.y += vY;

    // Check collisions with bones
    for (var i in bones) {
        if (checkCollision(dog, bones[i])) {
            bones.splice(i, 1);
            sounds.boneSound.currentTime = 0; // Reset sound
            sounds.boneSound.play();
        }
    }

    // Check collisions with officers
    for (var i in officers) {
        if (checkCollision(dog, officers[i])) {
            dog.health -= 20;
            if (dog.health <= 0) gameOver = true;
        }
    }

    // Update timer
    timer -= 1 / 60;
    if (timer <= 0) gameOver = true;
};

// Render game elements
var render = function () {
    if (bgReady) ctx.drawImage(bgImage, 0, 0, cvs.width, cvs.height); // Draw background

    if (boneReady) bones.forEach(bone => ctx.drawImage(boneImage, bone.x, bone.y, bone.width, bone.height)); // Draw bones
    if (officerReady) officers.forEach(officer => ctx.drawImage(officerImage, officer.x, officer.y, officer.width, officer.height)); // Draw officers

    // Draw the dog based on direction
    if (dog.direction === "up" && dogImages.up.ready) {
        ctx.drawImage(dogImages.up.image, dog.x, dog.y, dog.width, dog.height);
    } else if (dog.direction === "down" && dogImages.down.ready) {
        ctx.drawImage(dogImages.down.image, dog.x, dog.y, dog.width, dog.height);
    } else if (dog.direction === "left" && dogImages.left.ready) {
        ctx.drawImage(dogImages.left.image, dog.x, dog.y, dog.width, dog.height);
    } else if (dog.direction === "right" && dogImages.right.ready) {
        ctx.drawImage(dogImages.right.image, dog.x, dog.y, dog.width, dog.height);
    }

    // Draw HUD
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.fillText("Bones left: " + bones.length, 32, 32);
    ctx.fillText("Health: " + dog.health, 32, 64);
    ctx.fillText("Time: " + Math.ceil(timer), 32, 96);
};

// Check collisions
var checkCollision = function (obj1, obj2) {
    return obj1.x < (obj2.x + obj2.width) && (obj1.x + obj1.width) > obj2.x && obj1.y < (obj2.y + obj2.height) && (obj1.y + obj1.height) > obj2.y;
};

// Check win condition
var checkWin = function () {
    return bones.length === 0;
};

// Start the game
init();
window.requestAnimationFrame(main);
