const chronoBtn = document.getElementById('chrono_btn');
const timerBtn = document.getElementById('timer_btn');
const chronoDiv = document.getElementById('chrono');
const timerDiv = document.getElementById('timer');
const body = document.body;

let chronoInterval;
let timerInterval;
let chronoSeconds = 0;
let timerTotalSeconds = 0;

function changeBackgroundColor(color) {
    body.style.backgroundColor = color;
}

chronoBtn.addEventListener('click', () => {
    chronoDiv.style.display = 'block';
    timerDiv.style.display = 'none';
    changeBackgroundColor('#b0b8ce');
    resetChrono();
});

timerBtn.addEventListener('click', () => {
    chronoDiv.style.display = 'none';
    timerDiv.style.display = 'block';
    changeBackgroundColor('#505a74');
    resetTimer();
});

function startChrono() {
    clearInterval(chronoInterval);
    chronoInterval = setInterval(() => {
        chronoSeconds++;
        const minutes = String(Math.floor(chronoSeconds / 60)).padStart(2, '0');
        const seconds = String(chronoSeconds % 60).padStart(2, '0');
        document.getElementById('chrono_min').textContent = minutes;
        document.getElementById('chrono_sec').textContent = seconds;
    }, 1000);
}

function pauseChrono() {
    clearInterval(chronoInterval);
}

function resetChrono() {
    clearInterval(chronoInterval);
    chronoSeconds = 0;
    document.getElementById('chrono_min').textContent = '00';
    document.getElementById('chrono_sec').textContent = '00';
}

function startTimer() {
    const timerMinInput = document.getElementById('timer_min');
    const timerSecInput = document.getElementById('timer_sec');
    const minutes = parseInt(timerMinInput.value) || 0;
    const seconds = parseInt(timerSecInput.value) || 0;
    timerTotalSeconds = minutes * 60 + seconds;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timerTotalSeconds <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            return;
        }

        timerTotalSeconds--;
        const timerMinutes = String(Math.floor(timerTotalSeconds / 60)).padStart(2, '0');
        const timerSeconds = String(timerTotalSeconds % 60).padStart(2, '0');

        timerMinInput.value = timerMinutes;
        timerSecInput.value = timerSeconds;
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer_min').value = '0';
    document.getElementById('timer_sec').value = '0';
}

document.getElementById('start_btn').addEventListener('click', () => {
    if (chronoDiv.style.display === 'block') {
        startChrono();
    } else {
        startTimer();
    }
});

document.getElementById('pause_btn').addEventListener('click', () => {
    if (chronoDiv.style.display === 'block') {
        pauseChrono();
    } else {
        pauseTimer();
    }
});

document.getElementById('reset_btn').addEventListener('click', () => {
    if (chronoDiv.style.display === 'block') {
        resetChrono();
    } else {
        resetTimer();
    }
});
