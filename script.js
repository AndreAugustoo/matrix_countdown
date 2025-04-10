let interval = null;
let isRunning = false;

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

function getTotalSeconds() {
    const h = Math.min(parseInt(hoursInput.value) || 0, 99);
    const m = Math.min(parseInt(minutesInput.value) || 0, 59);
    const s = Math.min(parseInt(secondsInput.value) || 0, 59);
    return h * 3600 + m * 60 + s;
}

function updateInputsFromTotal(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    hoursInput.value = String(h).padStart(2, '0');
    minutesInput.value = String(m).padStart(2, '0');
    secondsInput.value = String(s).padStart(2, '0');
}

function startTimer() {
    if (isRunning) return;

    let totalSeconds = getTotalSeconds();
    if (totalSeconds < 0) return;

    isRunning = true;

    interval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(interval);
            isRunning = false;
            return;
        }
        totalSeconds--;
        updateInputsFromTotal(totalSeconds);
    }, 1000);
}

function pauseTimer() {
    clearInterval(interval);
    isRunning = false;
}

function resetTimer() {
    pauseTimer();
    hoursInput.value = "00";
    minutesInput.value = "00";
    secondsInput.value = "00";
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}
