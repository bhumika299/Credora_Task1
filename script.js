let startTime = 0;
let interval;
let running = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

startBtn.addEventListener('click', () => {
  if (!running) {
    running = true;
    startTime = Date.now() - (startTime || 0);
    interval = setInterval(updateDisplay, 10);
  }
});

stopBtn.addEventListener('click', () => {
  running = false;
  clearInterval(interval);
});

resetBtn.addEventListener('click', () => {
  running = false;
  clearInterval(interval);
  startTime = 0;
  display.textContent = '00:00:00.00';
  setCircleProgress(0);
});

function updateDisplay() {
  const elapsed = Date.now() - startTime;

  const ms = Math.floor((elapsed % 1000) / 10);
  const sec = Math.floor((elapsed / 1000) % 60);
  const min = Math.floor((elapsed / (1000 * 60)) % 60);
  const hr = Math.floor(elapsed / (1000 * 60 * 60));

  display.textContent =
    `${pad(hr)}:${pad(min)}:${pad(sec)}.${pad(ms)}`;

  const totalSec = hr * 3600 + min * 60 + sec + ms / 100;
  const maxSec = 60;
  const progress = Math.min(totalSec / maxSec, 1);
  setCircleProgress(progress);
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function setCircleProgress(progress) {
  const offset = circumference - progress * circumference;
  circle.style.strokeDashoffset = offset;
}
