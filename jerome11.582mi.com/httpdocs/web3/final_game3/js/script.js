const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const status = document.getElementById("status");

const keys = {};
let currentLevel = 0;

// Load sword, enemy, goal, and hero images
const swordImage = new Image();
swordImage.src = "./sword-01-removebg-preview.png"; // Replace with the path to your sword PNG image

const enemyImage = new Image();
enemyImage.src = "./monster.png"; // Replace with your enemy image path

const goalImage = new Image();
goalImage.src = "./goal.png"; // Replace with your goal image path

const heroImage = new Image();
heroImage.src = "./right.png"; // Replace with your hero image path

// Timer variables
let timer = 30; // Initial countdown time for level 1
let timerInterval;

// Define levels
const levels = [
  {
    player: { x: 50, y: 300, width: 60, height: 60, hasSword: false },
    sword: { x: 200, y: 300, width: 40, height: 40, pickedUp: false },
    enemy: { x: 500, y: 300, width: 60, height: 60, color: "#ff0000", defeated: false },
    goal: { x: 750, y: 300, width: 60, height: 60, color: "#0000ff" },
    status: "Status: Explore the area and defeat the enemy!",
    time: 20
  },
  {
    player: { x: 50, y: 300, width: 60, height: 60, hasSword: false },
    sword: { x: 150, y: 200, width: 40, height: 40, pickedUp: false },
    enemy: { x: 550, y: 250, width: 80, height: 80, color: "#ff0000", defeated: false },
    goal: { x: 750, y: 100, width: 60, height: 60, color: "#0000ff" },
    status: "Status: This enemy is stronger. Pick up the sword and fight!",
    time: 30
  },
  {
    player: { x: 50, y: 300, width: 60, height: 60, hasSword: false },
    sword: { x: 300, y: 100, width: 40, height: 40, pickedUp: false },
    enemy: { x: 600, y: 300, width: 100, height: 100, color: "#ff0000", defeated: false },
    goal: { x: 750, y: 50, width: 60, height: 60, color: "#0000ff" },
    status: "Status: Final boss awaits. Defeat it to complete your quest!",
    time: 25
  },
];

// Initialize the current level state
let levelState = JSON.parse(JSON.stringify(levels[currentLevel]));

// Draw objects on the canvas
function drawRect(obj, image) {
  if (!obj.pickedUp && !obj.defeated) {
    if (image) {
      ctx.drawImage(image, obj.x, obj.y, obj.width, obj.height); // Draw the image if provided
    } else {
      ctx.fillStyle = obj.color;
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height); // Otherwise, draw a rectangle
    }
  }
}

// Update the game state
function update() {
  const { player, sword, enemy, goal } = levelState;

  // Player movement
  if (keys["ArrowUp"] && player.y > 0) player.y -= 5;
  if (keys["ArrowDown"] && player.y < canvas.height - player.height) player.y += 5;
  if (keys["ArrowLeft"] && player.x > 0) player.x -= 5;
  if (keys["ArrowRight"] && player.x < canvas.width - player.width) player.x += 5;

  // Interactions
  if (keys["e"] || keys["E"]) {
    if (!sword.pickedUp && collision(player, sword)) {
      sword.pickedUp = true;
      player.hasSword = true;
      status.textContent = "Status: You picked up a sword!";
    }

    if (player.hasSword && collision(player, enemy)) {
      enemy.defeated = true;
      status.textContent = "Status: You defeated the enemy!";
    }

    if (enemy.defeated && collision(player, goal)) {
      status.textContent = "Status: Level complete!";
      nextLevel();
    }
  }

  // Check if the timer reached zero (game over)
  if (timer <= 0) {
    status.textContent = "Game Over! Time's up!";
    clearInterval(timerInterval);  // Stop the timer
    return; // End the game loop
  }
}

// Move to the next level
function nextLevel() {
  currentLevel++;

  // Stop the timer if we complete the game or reach the final level
  clearInterval(timerInterval);

  if (currentLevel < levels.length) {
    levelState = JSON.parse(JSON.stringify(levels[currentLevel]));
    status.textContent = levels[currentLevel].status;
    resetTimer(); // Reset the timer for the new level
  } else {
    status.textContent = "Congratulations! You completed all levels!";
    // Timer should be stopped, no need to restart it
  }
}

// Reset the timer for the new level
function resetTimer() {
  timer = levelState.time; // Set timer for the current level
  startTimer(); // Restart the timer
}

// Check for collision
function collision(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

// Draw the game frame
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawRect(levelState.player, heroImage);     // Hero image will be used for the player
  drawRect(levelState.sword, swordImage);     // Sword image will be used
  drawRect(levelState.enemy, enemyImage);     // Enemy image will be used
  drawRect(levelState.goal, goalImage);       // Goal image will be used
  
  // Display the timer on the screen with white font
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";  // Change font color to white
  ctx.fillText("Time: " + timer, 10, 30); // Display remaining time
}

// Main game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Listen for keyboard events
window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Start the game
function startGame() {
  document.getElementById("menu").style.display = "none"; // Hide the menu
  document.getElementById("game-container").style.display = "block"; // Show game container
  document.getElementById("instructions").style.display = "none"; // Hide instructions
  levelState = JSON.parse(JSON.stringify(levels[currentLevel]));
  status.textContent = levels[currentLevel].status;
  startTimer(); // Start the timer when the game starts
  gameLoop();
}

// Start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--; // Decrease the timer by 1 each second
    }
  }, 1000);
}


function showInstructions() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("instructions-container").style.display = "block";
}


function backToMenu() {
  document.getElementById("instructions-container").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

function backToMenuFromGame() {
  clearInterval(timerInterval); // Stop the timer
  document.getElementById("game-container").style.display = "none"; // Hide the game container
  document.getElementById("menu").style.display = "block"; // Show the main menu
}

function downloadPackage() {
  const link = document.createElement("a");
  link.href = "./Package.zip";  // Path to your ZIP file
  link.download = "package.zip"; // Name of the downloaded file
  link.click(); // Trigger the download
}


