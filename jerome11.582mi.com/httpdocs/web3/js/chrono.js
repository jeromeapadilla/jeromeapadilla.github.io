// Global Variables
let chronoMode = true;
let min = 0;
let sec = 0;
let interval = null;

// DOM Elements
const chronoMin = document.getElementById("chrono_min");
const chronoSec = document.getElementById("chrono_sec");
const timerMin = document.getElementById("timer_min");
const timerSec = document.getElementById("timer_sec");

const secondHand = document.getElementById("second_hand");
const minuteHand = document.getElementById("minute_hand");

// Switch Mode
document.getElementById("chrono_btn").addEventListener("click", function() {
    chronoMode = true;
    document.getElementById("chrono").style.display = "block";
    document.getElementById("timer").style.display = "none";
});

document.getElementById("timer_btn").addEventListener("click", function() {
    chronoMode = false;
    document.getElementById("chrono").style.display = "none";
    document.getElementById("timer").style.display = "block";
});

// Ticker Function
function ticker() {
    if (chronoMode) {
        if (sec === 59) {
            sec = 0;
            min++;
        } else {
            sec++;
        }
    } else {
        if (sec === 0 && min === 0) {
            clearInterval(interval);
            alert("Time's up!");
            return;
        }
        if (sec === 0) {
            sec = 59;
            min--;
        } else {
            sec--;
        }
    }
    updateDisplay();
    rotateHands();
}

// Update Display
function updateDisplay() {
    chronoMin.textContent = min < 10 ? '0' + min : min;
    chronoSec.textContent = sec < 10 ? '0' + sec : sec;

    timerMin.value = min;
    timerSec.value = sec;
}

// Start Button
document.getElementById("start_btn").addEventListener("click", function() {
    if (!interval) {
        if (!chronoMode) {
            min = parseInt(timerMin.value, 10);
            sec = parseInt(timerSec.value, 10);
        }
        interval = setInterval(ticker, 1000);
    }
});

// Pause Button
document.getElementById("pause_btn").addEventListener("click", function() {
    clearInterval(interval);
    interval = null;
});

// Reset Button
document.getElementById("reset_btn").addEventListener("click", function() {
    min = 0;
    sec = 0;
    clearInterval(interval);
    interval = null;
    updateDisplay();
    rotateHands(); // Reset analogue clock hands as well
});

// Rotate clock hands based on time
function rotateHands() {
    const secRotation = sec * 6; // Each second is 6 degrees (360deg/60sec)
    const minRotation = min * 6; // Each minute is 6 degrees (360deg/60min)
    
    // Apply the rotations to the second and minute hands
    secondHand.style.transform = `rotate(${secRotation}deg)`;
    minuteHand.style.transform = `rotate(${minRotation}deg)`;
}
