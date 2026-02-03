// --- Seleksi Elemen DOM ---
const setupSection = document.getElementById('setup-section');
const gameSection = document.getElementById('game-section');
const maxInput = document.getElementById('max-input');
const startBtn = document.getElementById('start-btn');
const displayMax = document.getElementById('display-max');

const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const attemptsDisplay = document.getElementById('attempts-count');
const messageDisplay = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

// --- Variabel Game State ---
let targetNum;
let attempts = 0;
let maxNum;

// --- Event Listeners ---

// 1. Tombol Mulai Game
startBtn.addEventListener('click', () => {
  const maxVal = parseInt(maxInput.value);

  // Validasi input
  if (!maxVal || maxVal <= 0) {
    showMessage('Masukkan angka positif yang valid!', 'error');
    return;
  }

  // Set variabel
  maxNum = maxVal;
  targetNum = Math.floor(Math.random() * maxNum) + 1;
  attempts = 0;

  // Update UI
  displayMax.innerText = maxNum;
  attemptsDisplay.innerText = attempts;
  showMessage('');

  setupSection.classList.add('hidden');
  gameSection.classList.remove('hidden');

  console.log('Target:', targetNum);
});

// 2. Tombol Tebak
guessBtn.addEventListener('click', checkGuess);

guessInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

// 3. Tombol Reset
resetBtn.addEventListener('click', () => {
  window.location.reload();
});

// --- Fungsi Logika ---

function checkGuess() {
  const guess = parseInt(guessInput.value);

  // Validasi tebakan
  if (!guess) {
    showMessage('Isi dulu tebakannya!', 'error');
    return;
  }

  attempts++;
  attemptsDisplay.innerText = attempts;

  if (guess === targetNum) {
    showMessage(`🎉 Selamat! Kamu benar dalam ${attempts} percobaan!`, 'success');
    guessInput.disabled = true;
    guessBtn.classList.add('hidden');
    resetBtn.classList.remove('hidden');
  } else if (guess > targetNum) {
    showMessage('Terlalu tinggi! Coba lagi turunkan angkanya.', 'hint');
    guessInput.value = '';
    guessInput.focus();
  } else {
    showMessage('Terlalu rendah! Coba naikkan angkanya.', 'hint');
    guessInput.value = '';
    guessInput.focus();
  }
}

function showMessage(msg, type) {
  messageDisplay.innerText = msg;
  messageDisplay.className = 'message';
  if (type) messageDisplay.classList.add(type);
}
