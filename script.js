// === 0. MATRIX RAIN EFFECT (FON REJIMIDAGI EFFEKT) ===
const canvas = document.getElementById('matrixCanvas');
const ctxCanvas = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = '0123456789ABCDEFCYBERPULSE';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctxCanvas.fillStyle = 'rgba(11, 15, 25, 0.08)';
  ctxCanvas.fillRect(0, 0, canvas.width, canvas.height);

  ctxCanvas.fillStyle = '#00f2fe';
  ctxCanvas.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctxCanvas.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 33);

// === 1. Web Audio API Ovoz Effektlari ===
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(freq, type = 'sine', duration = 0.2) {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// Audio Pad tugmalari Event Handleri
document.querySelectorAll('.sound-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const freq = parseFloat(btn.dataset.freq);
    playSound(freq, 'triangle', 0.3);
  });
});

// === 2. SPA Navigatsiya va Sahifalarga O'tish ===
const navLinks = document.querySelectorAll('.nav-link');
const pageSections = document.querySelectorAll('.page-section');
const pageTitle = document.getElementById('pageTitle');
const pageSub = document.getElementById('pageSub');

const pageTitles = {
  'overview-page': { title: 'Umumiy Panel', sub: 'Tizim holati va umumiy analitika' },
  'tasks-page': { title: 'Vazifalar Menejeri', sub: 'Kunlik reja va topshiriqlaringiz ro\'yxati' },
  'audio-page': { title: 'Futuristic Audio Pad', sub: 'Interaktiv audio sintezator va tovushlar' },
  'notes-page': { title: 'Tezkor Qaydlar', sub: 'Xotirada avtomatik saqlanuvchi qaydlar' },
  'crypto-page': { title: 'Valyuta & Kripto', sub: 'USD, UZS, EUR va Bitcoin hisob-kitobi' },
  'pomodoro-page': { title: 'Pomodoro Taymer', sub: 'Samarali mehnat va tanaffus vaqti' },
  'game-page': { title: 'Cyber Clicker Game', sub: 'Ochko to\'plang va reaksiyangizni oshiring' },
  'calc-page': { title: 'Cyber Calculator', sub: 'Tezkor hisob-kitoblar vositasi' },
  'cyber-sec-page': { title: 'Cyber Security Lab', sub: 'Xavfsiz parollar va kalitlar generatori' },
  'weather-page': { title: 'Ob-havo & Koinot', sub: 'Kosmik monitoring va interaktiv ma\'lumotlar' }
};

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    playSound(523.25, 'sine', 0.1);

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const targetId = link.getAttribute('data-target');
    pageSections.forEach(page => {
      page.classList.remove('active-page');
      if (page.id === targetId) {
        page.classList.add('active-page');
      }
    });

    if (pageTitles[targetId]) {
      pageTitle.innerHTML = `${pageTitles[targetId].title} <span class="glow-text">CyberPulse OS</span>`;
      pageSub.textContent = pageTitles[targetId].sub;
    }
  });
});

// === 3. Theme Switcher ===
document.querySelectorAll('.theme-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    playSound(600, 'sine', 0.1);
    const color = dot.dataset.color;
    document.documentElement.style.setProperty('--accent-cyan', color);
  });
});

// === 4. Dinamik Soat va CPU Simulyatori ===
function updateClock() {
  const now = new Date();
  document.getElementById('currentTime').textContent = now.toLocaleTimeString('uz-UZ');
}
setInterval(updateClock, 1000);
updateClock();

setInterval(() => {
  const cpuVal = Math.floor(Math.random() * 30) + 30;
  document.getElementById('cpuVal').textContent = `${cpuVal}%`;
}, 3000);

// === 5. Chart.js Analitika Grafik ===
const ctx = document.getElementById('analyticsChart').getContext('2d');
let analyticsChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [{
      label: 'Tizim Faolligi',
      data: [30, 45, 60, 80, 65, 90],
      borderColor: '#00f2fe',
      backgroundColor: 'rgba(0, 242, 254, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
    }
  }
});

document.getElementById('refreshChartBtn').addEventListener('click', () => {
  playSound(523.25, 'sine', 0.15);
  analyticsChart.data.datasets[0].data = Array.from({ length: 6 }, () => Math.floor(Math.random() * 60) + 30);
  analyticsChart.update();
});

// === 6. Vazifalar Tizimi ===
let tasks = JSON.parse(localStorage.getItem('cyber_tasks')) || [
  { id: 1, text: 'Frontend UI-ni yakunlash', completed: true },
  { id: 2, text: 'SPA sahifalar o\'tishini sozlash', completed: false }
];

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const completedCountEl = document.getElementById('completedTaskCount');

function saveAndRenderTasks() {
  localStorage.setItem('cyber_tasks', JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  let completedCount = 0;

  tasks.forEach(task => {
    if (task.completed) completedCount++;

    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="check-btn" onclick="toggleTask(${task.id})"><i class="fa-solid fa-circle-check"></i></button>
        <button class="delete-btn" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    taskList.appendChild(li);
  });

  completedCountEl.textContent = completedCount;
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  playSound(659.25, 'sine', 0.15);
  tasks.push({ id: Date.now(), text, completed: false });
  taskInput.value = '';
  saveAndRenderTasks();
});

window.toggleTask = function(id) {
  playSound(440, 'sine', 0.1);
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  saveAndRenderTasks();
};

window.deleteTask = function(id) {
  playSound(220, 'sawtooth', 0.15);
  tasks = tasks.filter(t => t.id !== id);
  saveAndRenderTasks();
};

renderTasks();

// === 7. Qaydlar Daftari ===
const notesArea = document.getElementById('notesArea');
const saveStatus = document.getElementById('saveStatus');

notesArea.value = localStorage.getItem('cyber_notes') || '';

let timeoutId;
notesArea.addEventListener('input', () => {
  clearTimeout(timeoutId);
  saveStatus.classList.remove('show');

  timeoutId = setTimeout(() => {
    localStorage.setItem('cyber_notes', notesArea.value);
    saveStatus.classList.add('show');
    setTimeout(() => saveStatus.classList.remove('show'), 2000);
  }, 600);
});

// === 8. Valyuta & Kripto Konverteri ===
const usdInput = document.getElementById('usdInput');
const uzsRes = document.getElementById('uzsRes');
const eurRes = document.getElementById('eurRes');
const btcRes = document.getElementById('btcRes');

function updateConverter() {
  const val = parseFloat(usdInput.value) || 0;
  uzsRes.textContent = (val * 12800).toLocaleString('uz-UZ') + ' UZS';
  eurRes.textContent = (val * 0.92).toFixed(2) + ' EUR';
  btcRes.textContent = (val * 0.000015).toFixed(6) + ' BTC';
}
usdInput.addEventListener('input', updateConverter);

// === 9. Pomodoro Taymer ===
let pomoTime = 25 * 60;
let pomoInterval = null;
const pomoDisplay = document.getElementById('pomoDisplay');

function updatePomoDisplay() {
  const mins = Math.floor(pomoTime / 60);
  const secs = pomoTime % 60;
  pomoDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

document.getElementById('startPomoBtn').addEventListener('click', () => {
  playSound(659.25, 'sine', 0.1);
  if (pomoInterval) return;
  pomoInterval = setInterval(() => {
    if (pomoTime > 0) {
      pomoTime--;
      updatePomoDisplay();
    } else {
      clearInterval(pomoInterval);
      pomoInterval = null;
      playSound(880, 'sine', 0.5);
      alert('Pomodoro vaqti tugadi! Tanaffus qiling.');
    }
  }, 1000);
});

document.getElementById('pausePomoBtn').addEventListener('click', () => {
  playSound(440, 'sine', 0.1);
  clearInterval(pomoInterval);
  pomoInterval = null;
});

document.getElementById('resetPomoBtn').addEventListener('click', () => {
  playSound(330, 'sine', 0.1);
  clearInterval(pomoInterval);
  pomoInterval = null;
  pomoTime = 25 * 60;
  updatePomoDisplay();
});

updatePomoDisplay();

// === 10. Cyber Clicker Game Logikasi ===
let clickScore = 0;
let clickLevel = 1;
const clickBtn = document.getElementById('cyberClickBtn');
const clickScoreEl = document.getElementById('clickScore');
const clickLevelEl = document.getElementById('clickLevel');

clickBtn.addEventListener('click', () => {
  clickScore++;
  playSound(400 + (clickScore * 10), 'triangle', 0.1);
  clickScoreEl.textContent = clickScore;

  if (clickScore % 10 === 0) {
    clickLevel++;
    clickLevelEl.textContent = clickLevel;
    playSound(800, 'sine', 0.2);
  }
});

// === 11. Cyber Calculator Logikasi ===
const calcDisplay = document.getElementById('calcDisplay');

window.calcAppend = function(val) {
  playSound(500, 'sine', 0.05);
  if (calcDisplay.value === '0') calcDisplay.value = '';
  calcDisplay.value += val;
};

window.calcClear = function() {
  playSound(300, 'sine', 0.08);
  calcDisplay.value = '0';
};

window.calcEquals = function() {
  try {
    playSound(700, 'sine', 0.15);
    calcDisplay.value = eval(calcDisplay.value);
  } catch (e) {
    calcDisplay.value = 'Xato!';
    setTimeout(() => calcDisplay.value = '0', 1500);
  }
};

// === 12. YANGI - Password Generator Logikasi ===
const genPassBtn = document.getElementById('genPassBtn');
const passLength = document.getElementById('passLength');
const passOutput = document.getElementById('passOutput');

genPassBtn.addEventListener('click', () => {
  playSound(750, 'square', 0.12);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
  let res = '';
  const len = parseInt(passLength.value);
  for (let i = 0; i < len; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  passOutput.textContent = res;
});
// ============================================================
// script.js OXIRIGA QO'SHING (mavjud kodga tegmang)
// ============================================================

// === 13. YANGI - Terminal sahifasi sarlavhasi ===
pageTitles['terminal-page'] = {
  title: 'Cyber Terminal',
  sub: 'Buyruqlar orqali tizimni boshqaring'
};

// === 14. YANGI - Matrix ON/OFF va To'liq ekran ===
const matrixToggleBtn = document.getElementById('matrixToggleBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

function setMatrix(on) {
  canvas.style.visibility = on ? 'visible' : 'hidden';
  matrixToggleBtn.classList.toggle('off', !on);
  matrixToggleBtn.innerHTML = on
    ? '<i class="fa-solid fa-eye"></i>'
    : '<i class="fa-solid fa-eye-slash"></i>';
  localStorage.setItem('cyber_matrix', on ? '1' : '0');
}

setMatrix(localStorage.getItem('cyber_matrix') !== '0');

matrixToggleBtn.addEventListener('click', () => {
  playSound(600, 'sine', 0.1);
  setMatrix(canvas.style.visibility === 'hidden');
});

fullscreenBtn.addEventListener('click', () => {
  playSound(500, 'sine', 0.1);
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener('fullscreenchange', () => {
  fullscreenBtn.innerHTML = document.fullscreenElement
    ? '<i class="fa-solid fa-compress"></i>'
    : '<i class="fa-solid fa-expand"></i>';
});

// === 15. YANGI - Jonli Tizim Loglari ===
const logList = document.getElementById('logList');
const clearLogBtn = document.getElementById('clearLogBtn');

const logMessages = [
  { t: 'ok', m: 'Tarmoq ulanishi barqaror' },
  { t: 'ok', m: 'Xavfsizlik skaneri: tahdid topilmadi' },
  { t: '', m: 'Kesh tozalandi' },
  { t: 'warn', m: 'CPU harorati biroz oshdi' },
  { t: '', m: 'Fon sinxronizatsiyasi yakunlandi' },
  { t: 'ok', m: 'Zaxira nusxa muvaffaqiyatli saqlandi' },
  { t: 'error', m: 'Vaqtinchalik ulanish xatosi (qayta urinildi)' },
  { t: '', m: 'Yangi sessiya boshlandi' },
  { t: 'warn', m: 'RAM yuklamasi 70% dan oshdi' }
];

function addLog(type, message) {
  const li = document.createElement('li');
  li.className = `log-item ${type}`;

  const time = document.createElement('span');
  time.className = 'log-time';
  time.textContent = `[${new Date().toLocaleTimeString('uz-UZ')}]`;

  const msg = document.createElement('span');
  msg.textContent = message;

  li.append(time, msg);
  logList.prepend(li);

  while (logList.children.length > 12) {
    logList.removeChild(logList.lastChild);
  }
}

addLog('ok', 'CyberPulse OS ishga tushdi');

setInterval(() => {
  const item = logMessages[Math.floor(Math.random() * logMessages.length)];
  addLog(item.t, item.m);
}, 4000);

clearLogBtn.addEventListener('click', () => {
  playSound(300, 'sine', 0.08);
  logList.innerHTML = '';
});

// === 16. YANGI - Cyber Terminal ===
const termInput = document.getElementById('termInput');
const termOutput = document.getElementById('termOutput');
const terminalBox = document.getElementById('terminalBox');

const termHistory = [];
let termHistoryIndex = 0;

function termPrint(text, cls = '') {
  const div = document.createElement('div');
  if (cls) div.className = cls;
  div.textContent = text;
  termOutput.appendChild(div);
  terminalBox.scrollTop = terminalBox.scrollHeight;
}

const themeColors = {
  cyan: '#00f2fe',
  purple: '#7000ff',
  green: '#00e676',
  orange: '#ff9100'
};

const termCommands = {
  help() {
    termPrint(
      'Mavjud buyruqlar:\n' +
      '  help            - yordam\n' +
      '  time / date     - vaqt va sana\n' +
      '  whoami          - foydalanuvchi\n' +
      '  echo <matn>     - matnni chiqarish\n' +
      '  theme <rang>    - cyan | purple | green | orange\n' +
      '  pass [uzunlik]  - tasodifiy parol (8-32)\n' +
      '  roll            - 1 dan 100 gacha tasodifiy son\n' +
      '  tasks           - vazifalar holati\n' +
      '  matrix          - matrix effektini yoqish/o\'chirish\n' +
      '  clear           - ekranni tozalash',
      'term-info'
    );
  },
  time() { termPrint(new Date().toLocaleTimeString('uz-UZ'), 'term-ok'); },
  date() { termPrint(new Date().toLocaleDateString('uz-UZ'), 'term-ok'); },
  whoami() { termPrint('dasturchi@cyberpulse-os', 'term-ok'); },
  echo(args) { termPrint(args.join(' ')); },
  theme(args) {
    const color = themeColors[(args[0] || '').toLowerCase()];
    if (!color) {
      termPrint('Foydalanish: theme cyan|purple|green|orange', 'term-err');
      return;
    }
    document.documentElement.style.setProperty('--accent-cyan', color);
    termPrint(`Mavzu o'zgartirildi: ${args[0]}`, 'term-ok');
  },
  pass(args) {
    const len = Math.min(32, Math.max(8, parseInt(args[0]) || 16));
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    let res = '';
    arr.forEach(n => { res += chars[n % chars.length]; });
    termPrint(res, 'term-ok');
  },
  roll() { termPrint(`Natija: ${Math.floor(Math.random() * 100) + 1}`, 'term-ok'); },
  tasks() {
    const done = tasks.filter(t => t.completed).length;
    termPrint(`Jami: ${tasks.length} | Bajarilgan: ${done} | Qolgan: ${tasks.length - done}`, 'term-info');
  },
  matrix() {
    setMatrix(canvas.style.visibility === 'hidden');
    termPrint('Matrix effekti almashtirildi', 'term-ok');
  },
  clear() { termOutput.innerHTML = ''; }
};

termPrint("CyberPulse Terminal v1.0 — 'help' deb yozing", 'term-info');

termInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const raw = termInput.value.trim();
    termInput.value = '';
    if (!raw) return;

    playSound(500, 'square', 0.04);
    termHistory.push(raw);
    termHistoryIndex = termHistory.length;
    termPrint(`dev@cyberpulse:~$ ${raw}`, 'term-cmd');

    const [cmd, ...args] = raw.split(/\s+/);
    const fn = termCommands[cmd.toLowerCase()];
    if (fn) {
      fn(args);
    } else {
      termPrint(`Noma'lum buyruq: ${cmd}. 'help' deb yozing`, 'term-err');
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (termHistoryIndex > 0) {
      termHistoryIndex--;
      termInput.value = termHistory[termHistoryIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (termHistoryIndex < termHistory.length - 1) {
      termHistoryIndex++;
      termInput.value = termHistory[termHistoryIndex];
    } else {
      termHistoryIndex = termHistory.length;
      termInput.value = '';
    }
  }
});

terminalBox.addEventListener('click', () => termInput.focus());
// ============================================================
// script.js OXIRIGA QO'SHING (2-qism, mavjud kodga tegmang)
// ============================================================

// === 17. YANGI - Toast bildirishnomalar ===
const toastWrap = document.getElementById('toastWrap');

function showToast(message, type = 'info') {
  if (!toastWrap) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastWrap.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// === 18. YANGI - Ovozni o'chirish/yoqish (mavjud playSound ni o'rab oladi) ===
let soundMuted = localStorage.getItem('cyber_muted') === '1';
const originalPlaySound = playSound;
playSound = function (...args) {
  if (!soundMuted) originalPlaySound(...args);
};

const soundToggleBtn = document.getElementById('soundToggleBtn');

function renderSoundBtn() {
  if (!soundToggleBtn) return;
  soundToggleBtn.classList.toggle('off', soundMuted);
  soundToggleBtn.innerHTML = soundMuted
    ? '<i class="fa-solid fa-volume-xmark"></i>'
    : '<i class="fa-solid fa-volume-high"></i>';
}

renderSoundBtn();

if (soundToggleBtn) {
  soundToggleBtn.addEventListener('click', () => {
    soundMuted = !soundMuted;
    localStorage.setItem('cyber_muted', soundMuted ? '1' : '0');
    renderSoundBtn();
    playSound(600, 'sine', 0.1);
    showToast(soundMuted ? 'Ovoz o\'chirildi' : 'Ovoz yoqildi');
  });
}

// === 19. YANGI - Klaviatura: Alt + 1..9, 0 orqali sahifalar almashtirish ===
document.addEventListener('keydown', (e) => {
  if (!e.altKey || e.ctrlKey || e.metaKey) return;
  const match = /^Digit([0-9])$/.exec(e.code);
  if (!match) return;
  const digit = parseInt(match[1]);
  const index = digit === 0 ? 9 : digit - 1;
  if (navLinks[index]) {
    e.preventDefault();
    navLinks[index].click();
  }
});

// === 20. YANGI - Vazifalar: filtr, hisoblagich, tozalash ===
const filterBtns = document.querySelectorAll('.filter-btn');
const tasksLeftEl = document.getElementById('tasksLeft');
const clearDoneBtn = document.getElementById('clearDoneBtn');
let activeTaskFilter = 'all';

function applyTaskFilter() {
  let left = 0;
  taskList.querySelectorAll('.task-item').forEach(li => {
    const done = li.classList.contains('completed');
    if (!done) left++;
    const show =
      activeTaskFilter === 'all' ||
      (activeTaskFilter === 'active' && !done) ||
      (activeTaskFilter === 'done' && done);
    li.style.display = show ? '' : 'none';
  });
  if (tasksLeftEl) tasksLeftEl.textContent = left;
}

// Mavjud renderTasks() ro'yxatni qayta chizganda filtr avtomatik qayta qo'llanadi
new MutationObserver(applyTaskFilter).observe(taskList, { childList: true });

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    playSound(480, 'sine', 0.08);
    activeTaskFilter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.toggle('active', b === btn));
    applyTaskFilter();
  });
});

if (clearDoneBtn) {
  clearDoneBtn.addEventListener('click', () => {
    const doneCount = tasks.filter(t => t.completed).length;
    if (!doneCount) {
      showToast('Bajarilgan vazifa yo\'q', 'error');
      return;
    }
    playSound(250, 'sawtooth', 0.12);
    tasks = tasks.filter(t => !t.completed);
    saveAndRenderTasks();
    showToast(`${doneCount} ta vazifa tozalandi`, 'success');
  });
}

applyTaskFilter();

// === 21. YANGI - Qaydlar: hisoblagich, yuklab olish, tozalash ===
const notesCountEl = document.getElementById('notesCount');
const downloadNotesBtn = document.getElementById('downloadNotesBtn');
const clearNotesBtn = document.getElementById('clearNotesBtn');

function updateNotesCount() {
  const text = notesArea.value;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  if (notesCountEl) notesCountEl.textContent = `${words} so'z · ${text.length} belgi`;
}

notesArea.addEventListener('input', updateNotesCount);
updateNotesCount();

if (downloadNotesBtn) {
  downloadNotesBtn.addEventListener('click', () => {
    if (!notesArea.value.trim()) {
      showToast('Qaydlar bo\'sh', 'error');
      return;
    }
    playSound(600, 'sine', 0.1);
    const blob = new Blob([notesArea.value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qaydlar-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Qaydlar yuklab olindi', 'success');
  });
}

if (clearNotesBtn) {
  clearNotesBtn.addEventListener('click', () => {
    if (!notesArea.value) return;
    if (!confirm('Barcha qaydlar o\'chirilsinmi?')) return;
    playSound(250, 'sawtooth', 0.12);
    notesArea.value = '';
    notesArea.dispatchEvent(new Event('input')); // mavjud avto-saqlash ishga tushadi
    showToast('Qaydlar tozalandi', 'success');
  });
}

// === 22. YANGI - Pomodoro: vaqt presetlari, sessiya hisobi, sarlavhada taymer ===
let pomoPresetMin = 25;
const presetBtns = document.querySelectorAll('.preset-btn');
const pomoSessionsEl = document.getElementById('pomoSessions');

presetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    playSound(550, 'sine', 0.1);
    pomoPresetMin = parseInt(btn.dataset.min);
    clearInterval(pomoInterval);
    pomoInterval = null;
    pomoTime = pomoPresetMin * 60;
    updatePomoDisplay();
    presetBtns.forEach(b => b.classList.toggle('active', b === btn));
  });
});

// Mavjud "Qayta o'rnatish" 25 daqiqaga qaytaradi, bu esa tanlangan presetga qaytaradi
document.getElementById('resetPomoBtn').addEventListener('click', () => {
  pomoTime = pomoPresetMin * 60;
  updatePomoDisplay();
});

function getPomoStats() {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const saved = JSON.parse(localStorage.getItem('cyber_pomo'));
    if (saved && saved.date === today) return saved;
  } catch (e) {}
  return { date: today, count: 0 };
}

function renderPomoStats() {
  if (pomoSessionsEl) pomoSessionsEl.textContent = getPomoStats().count;
}

renderPomoStats();

new MutationObserver(() => {
  const text = pomoDisplay.textContent;
  document.title = pomoInterval ? `${text} — CyberPulse OS` : 'CyberPulse OS — Ultimate Futuristic Dashboard';

  if (text === '00:00' && pomoInterval) {
    const stats = getPomoStats();
    stats.count++;
    localStorage.setItem('cyber_pomo', JSON.stringify(stats));
    renderPomoStats();
    showToast('Sessiya yakunlandi! Tanaffus qiling', 'success');
  }
}).observe(pomoDisplay, { childList: true, characterData: true, subtree: true });

// === 23. YANGI - Cyber Game: rekord, yutuqlar, qayta boshlash ===
const clickBestEl = document.getElementById('clickBest');
const resetClickBtn = document.getElementById('resetClickBtn');
let clickBest = parseInt(localStorage.getItem('cyber_click_best')) || 0;
if (clickBestEl) clickBestEl.textContent = clickBest;

const achievements = [
  { n: 10, m: '🔰 Yangi boshlovchi: 10 ochko' },
  { n: 50, m: '⚡ Tezkor barmoq: 50 ochko' },
  { n: 100, m: '🔥 Yuzlik klubi: 100 ochko' },
  { n: 250, m: '🚀 Kiber usta: 250 ochko' },
  { n: 500, m: '👑 Afsona: 500 ochko' },
  { n: 1000, m: '🏆 Cheksizlik: 1000 ochko' }
];

clickBtn.addEventListener('click', () => {
  if (clickScore > clickBest) {
    clickBest = clickScore;
    localStorage.setItem('cyber_click_best', clickBest);
    if (clickBestEl) clickBestEl.textContent = clickBest;
  }
  const ach = achievements.find(a => a.n === clickScore);
  if (ach) showToast(ach.m, 'success');
});

if (resetClickBtn) {
  resetClickBtn.addEventListener('click', () => {
    playSound(330, 'sine', 0.1);
    clickScore = 0;
    clickLevel = 1;
    clickScoreEl.textContent = clickScore;
    clickLevelEl.textContent = clickLevel;
  });
}

// === 24. YANGI - Kalkulyator: nuqta, qavs, o'chirish va klaviatura ===
window.calcDot = function () {
  const v = calcDisplay.value;
  const lastNum = v.split(/[+\-*/(]/).pop();
  if (lastNum.includes('.')) return;
  playSound(500, 'sine', 0.05);
  calcDisplay.value = (lastNum === '' || /[+\-*/(]$/.test(v)) ? v + '0.' : v + '.';
};

window.calcBack = function () {
  playSound(350, 'sine', 0.05);
  const v = calcDisplay.value;
  calcDisplay.value = v.length > 1 ? v.slice(0, -1) : '0';
};

document.addEventListener('keydown', (e) => {
  if (!document.getElementById('calc-page').classList.contains('active-page')) return;
  const active = document.activeElement;
  if (active && (active.tagName === 'TEXTAREA' || (active.tagName === 'INPUT' && active.id !== 'calcDisplay'))) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  if (/^[0-9+\-*/()]$/.test(e.key)) {
    e.preventDefault();
    calcAppend(e.key);
  } else if (e.key === '.' || e.key === ',') {
    e.preventDefault();
    calcDot();
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    calcEquals();
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    calcBack();
  } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
    calcClear();
  }
});

// === 25. YANGI - Parol kuchi o'lchagichi va nusxalash ===
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');
const copyPassBtn = document.getElementById('copyPassBtn');

function evaluatePassword() {
  if (!strengthFill) return;
  const p = passOutput.textContent;

  if (!p || /^\*+$/.test(p)) {
    strengthFill.style.width = '0';
    strengthText.textContent = '—';
    return;
  }

  let pool = 0;
  if (/[a-z]/.test(p)) pool += 26;
  if (/[A-Z]/.test(p)) pool += 26;
  if (/\d/.test(p)) pool += 10;
  if (/[^A-Za-z0-9]/.test(p)) pool += 32;

  const bits = Math.round(p.length * Math.log2(pool));
  let level = 'weak';
  let label = 'Zaif';
  if (bits >= 110) { level = 'ultra'; label = 'Juda kuchli'; }
  else if (bits >= 80) { level = 'strong'; label = 'Kuchli'; }
  else if (bits >= 50) { level = 'mid'; label = 'O\'rtacha'; }

  strengthFill.className = `strength-fill ${level}`;
  strengthFill.style.width = `${Math.min(100, Math.round((bits / 130) * 100))}%`;
  strengthText.textContent = `${label} (~${bits} bit)`;
}

new MutationObserver(evaluatePassword).observe(passOutput, {
  childList: true,
  characterData: true,
  subtree: true
});

if (copyPassBtn) {
  copyPassBtn.addEventListener('click', () => {
    const p = passOutput.textContent;
    if (!p || /^\*+$/.test(p)) {
      showToast('Avval parol yarating', 'error');
      return;
    }
    playSound(700, 'sine', 0.1);
    navigator.clipboard.writeText(p)
      .then(() => showToast('Parol nusxalandi', 'success'))
      .catch(() => showToast('Nusxalab bo\'lmadi', 'error'));
  });
}