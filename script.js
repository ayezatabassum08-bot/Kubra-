/* ---------- Entrance ---------- */
const intro = document.getElementById('intro');
document.getElementById('enterBtn').addEventListener('click', () => {
  intro.classList.add('hide');
  document.querySelectorAll('#hero .fade-in').forEach((el, i) => setTimeout(() => el.classList.add('visible'), 200 + i * 180));
});

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('section .fade-in').forEach(el => { if (!el.closest('#hero')) io.observe(el); });

/* ---------- Countdown to 24 Nov 2026 ---------- */
const target = new Date(2026, 10, 24, 0, 0, 0);
function tick() {
  const diff = target - new Date();
  const msg = document.getElementById('cd-msg');
  if (diff <= 0) {
    ['cd-d','cd-h','cd-m','cd-s'].forEach(id => document.getElementById(id).textContent = '00');
    msg.textContent = 'Today is your day, Kubra!';
    return;
  }
  const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
  document.getElementById('cd-d').textContent = String(d).padStart(2, '0');
  document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
  document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
  msg.textContent = 'Counting down to your 21st birthday';
}
tick(); setInterval(tick, 1000);

/* ---------- Particles (glowing sparkles) ---------- */
const pCanvas = document.getElementById('particles'), pctx = pCanvas.getContext('2d');
let W, H;
function resize() { W = pCanvas.width = innerWidth; H = pCanvas.height = innerHeight; }
resize(); addEventListener('resize', resize);
const sparkles = Array.from({ length: 70 }, () => ({
  x: Math.random() * innerWidth, y: Math.random() * innerHeight,
  r: Math.random() * 2 + 0.5, vy: Math.random() * 0.4 + 0.1,
  a: Math.random(), da: (Math.random() * 0.02) + 0.005
}));
function drawSparkles() {
  pctx.clearRect(0, 0, W, H);
  sparkles.forEach(s => {
    s.a += s.da; s.y -= s.vy;
    if (s.y < -5) { s.y = H + 5; s.x = Math.random() * W; }
    const alpha = 0.3 + Math.abs(Math.sin(s.a)) * 0.7;
    pctx.beginPath();
    pctx.fillStyle = `rgba(247,231,198,${alpha})`;
    pctx.shadowBlur = 10; pctx.shadowColor = '#f7e7c6';
    pctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    pctx.fill();
  });
  requestAnimationFrame(drawSparkles);
}
drawSparkles();

/* ---------- Floating petals and hearts ---------- */
for (let i = 0; i < 18; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.animationDuration = (9 + Math.random() * 9) + 's';
  p.style.animationDelay = (-Math.random() * 15) + 's';
  document.body.appendChild(p);
}
for (let i = 0; i < 12; i++) {
  const h = document.createElement('div');
  h.className = 'heart-float';
  h.textContent = '\u2665';
  h.style.left = Math.random() * 100 + 'vw';
  h.style.animationDuration = (12 + Math.random() * 10) + 's';
  h.style.animationDelay = (-Math.random() * 20) + 's';
  document.body.appendChild(h);
}

/* ---------- Slideshow ---------- */
const slides = document.querySelectorAll('#slideshow img');
const captions = ['My favourite person in every frame.', 'Grace, strength and a heart of gold.'];
let cur = 0;
setInterval(() => {
  slides[cur].classList.remove('active');
  cur = (cur + 1) % slides.length;
  slides[cur].classList.add('active');
  document.getElementById('slideCaption').textContent = captions[cur];
}, 3800);

/* ---------- 21 Duas ---------- */
const duas = [
  { theme: 'Health and Long Life', ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ', en: 'O Allah, I ask You for well-being in this world and the Hereafter.', ur: 'اے اللہ! میں تجھ سے دنیا اور آخرت میں عافیت کا سوال کرتی ہوں۔' },
  { theme: 'Happiness', ar: 'رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ', en: 'My Lord, I am in need of whatever good You send down to me. (Surah al-Qasas 28:24)', ur: 'اے میرے رب! جو بھلائی تو میری طرف اتارے، میں اُس کی محتاج ہوں۔' },
  { theme: 'Success', ar: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي', en: 'My Lord, expand for me my chest and ease for me my task. (Surah Taha 20:25-26)', ur: 'اے میرے رب! میرا سینہ کھول دے اور میرا کام آسان فرما۔' },
  { theme: 'Halal Rizq', ar: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ', en: 'O Allah, suffice me with what You have made lawful over what You have made unlawful, and enrich me by Your bounty over all others.', ur: 'اے اللہ! مجھے اپنے حلال سے حرام سے بے نیاز کر دے، اور اپنے فضل سے اپنے سوا سب سے بے نیاز کر دے۔' },
  { theme: 'Protection from the Evil Eye', ar: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ', en: 'I seek refuge in the perfect words of Allah from every devil, every harmful creature, and every envious eye.', ur: 'میں اللہ کے کامل کلمات کی پناہ مانگتی ہوں ہر شیطان اور زہریلے جانور سے، اور ہر نظر بد سے۔' },
  { theme: 'Peace of Heart', ar: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', en: 'Allah is sufficient for us, and He is the best Disposer of affairs. (Surah Aal-e-Imran 3:173)', ur: 'ہمیں اللہ کافی ہے اور وہ کیا ہی اچھا کارساز ہے۔' },
  { theme: 'Acceptance of Duas', ar: 'رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ', en: 'Our Lord, accept from us. Indeed, You are the All-Hearing, the All-Knowing. (Surah al-Baqarah 2:127)', ur: 'اے ہمارے رب! ہم سے قبول فرما، بے شک تو ہی سننے والا، جاننے والا ہے۔' },
  { theme: 'A Beautiful Destiny', ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', en: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire. (Surah al-Baqarah 2:201)', ur: 'اے ہمارے رب! ہمیں دنیا میں بھلائی دے اور آخرت میں بھلائی، اور ہمیں آگ کے عذاب سے بچا۔' },
  { theme: 'Family Happiness', ar: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا', en: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us leaders of the righteous. (Surah al-Furqan 25:74)', ur: 'اے ہمارے رب! ہمیں ہمارے جیون ساتھیوں اور اولاد سے آنکھوں کی ٹھنڈک عطا فرما، اور ہمیں متقیوں کا پیشوا بنا۔' },
  { theme: 'Good Health for Loved Ones', ar: 'رَبِّ إِنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ', en: 'My Lord, adversity has touched me, and You are the Most Merciful of the merciful. (Surah al-Anbiya 21:83)', ur: 'اے میرے رب! مجھے تکلیف پہنچی ہے اور تو سب رحم کرنے والوں سے بڑھ کر رحم کرنے والا ہے۔' },
  { theme: 'Knowledge and Wisdom', ar: 'رَبِّ زِدْنِي عِلْمًا', en: 'My Lord, increase me in knowledge. (Surah Taha 20:114)', ur: 'اے میرے رب! میرا علم بڑھا دے۔' },
  { theme: 'Strong Imaan', ar: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ', en: 'O Turner of hearts, make my heart firm upon Your religion.', ur: 'اے دلوں کو پھیرنے والے! میرے دل کو اپنے دین پر ثابت قدم رکھ۔' },
  { theme: 'Forgiveness', ar: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ', en: 'My Lord, forgive me and my parents and the believers on the Day the account is established. (Surah Ibrahim 14:41)', ur: 'اے میرے رب! مجھے، میرے والدین کو اور سب مومنوں کو اُس دن بخش دینا جب حساب قائم ہوگا۔' },
  { theme: 'Protection from Difficulties', ar: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ', en: 'Allah is sufficient for me. There is no god but He. Upon Him I rely, and He is the Lord of the Mighty Throne. (Surah al-Tawbah 9:129)', ur: 'مجھے اللہ کافی ہے، اُس کے سوا کوئی معبود نہیں، میں اُسی پر بھروسا کرتی ہوں اور وہی عرشِ عظیم کا رب ہے۔' },
  { theme: 'Success in Studies and Career', ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا', en: 'O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.', ur: 'اے اللہ! میں تجھ سے نفع دینے والے علم، پاکیزہ رزق اور قبول ہونے والے عمل کا سوال کرتی ہوں۔' },
  { theme: 'Good People and Sincere Relationships', ar: 'وَاصْبِرْ نَفْسَكَ مَعَ الَّذِينَ يَدْعُونَ رَبَّهُم بِالْغَدَاةِ وَالْعَشِيِّ يُرِيدُونَ وَجْهَهُ', en: 'Keep yourself patient with those who call upon their Lord morning and evening, seeking His face. (Surah al-Kahf 18:28)', ur: 'اپنے آپ کو اُن لوگوں کے ساتھ جمائے رکھ جو صبح و شام اپنے رب کو پکارتے ہیں اور اُسی کی رضا چاہتے ہیں۔' },
  { theme: 'Barakah in Life', ar: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا', en: 'O Allah, bless for us what You have provided us.', ur: 'اے اللہ! جو رزق تو نے ہمیں دیا ہے اُس میں برکت عطا فرما۔' },
  { theme: 'Beautiful Character', ar: 'اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الْأَخْلَاقِ لَا يَهْدِي لِأَحْسَنِهَا إِلَّا أَنْتَ، وَاصْرِفْ عَنِّي سَيِّئَهَا', en: 'O Allah, guide me to the best of character; none guides to the best of it but You, and turn away from me the worst of it.', ur: 'اے اللہ! مجھے بہترین اخلاق کی ہدایت دے، بہترین اخلاق کی طرف تیرے سوا کوئی ہدایت نہیں دے سکتا، اور مجھ سے بد اخلاقی دور فرما۔' },
  { theme: 'Fulfilment of Dreams', ar: 'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا', en: 'Our Lord, grant us mercy from Yourself and prepare for us right guidance in our affair. (Surah al-Kahf 18:10)', ur: 'اے ہمارے رب! ہمیں اپنی طرف سے رحمت عطا فرما اور ہمارے کام میں ہمارے لیے نیک راہ آسان فرما۔' },
  { theme: 'Jannat-ul-Firdous', ar: 'فَإِذَا سَأَلْتُمُ اللَّهَ فَاسْأَلُوهُ الْفِرْدَوْسَ', en: 'When you ask Allah, ask Him for Al-Firdaws, the highest level of Paradise. (Hadith, Sahih al-Bukhari)', ur: 'جب تم اللہ سے مانگو تو جنت الفردوس مانگو۔' },
  { theme: 'Allah\u2019s Mercy and Protection', ar: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ', en: 'Allah — there is no deity except Him, the Ever-Living, the Sustainer of all. (Ayat al-Kursi, Surah al-Baqarah 2:255)', ur: 'اللہ کے سوا کوئی معبود نہیں، وہ زندہ ہے اور سب کو تھامنے والا ہے۔' }
];
const duasGrid = document.getElementById('duasGrid');
duas.forEach((d, i) => {
  const card = document.createElement('article');
  card.className = 'dua-card fade-in';
  card.innerHTML = `
    <div class="dua-num">Dua ${i + 1}</div>
    <h3 class="dua-theme">${d.theme}</h3>
    <p class="dua-ar">${d.ar}</p>
    <p class="dua-en">${d.en}</p>
    <p class="dua-ur">${d.ur}</p>
    <p class="dua-ameen">Ameen.</p>`;
  duasGrid.appendChild(card);
  io.observe(card);
});

/* ---------- Gift box ---------- */
const gift = document.getElementById('gift');
function openGift() {
  gift.classList.add('open');
  setTimeout(() => document.getElementById('hiddenLetter').classList.add('show'), 700);
  burstHearts();
}
gift.addEventListener('click', openGift);
gift.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openGift(); });

/* ---------- Cake with 21 candles ---------- */
const candlesEl = document.getElementById('candles');
for (let i = 0; i < 21; i++) {
  const c = document.createElement('div');
  c.className = 'candle';
  c.innerHTML = '<div class="flame"></div>';
  candlesEl.appendChild(c);
}
let candlesOut = false;
document.getElementById('cake').addEventListener('click', () => {
  if (candlesOut) return;
  candlesOut = true;
  document.querySelectorAll('.flame').forEach(f => f.style.display = 'none');
  fullConfetti(4000);
});

/* ---------- Confetti ---------- */
const cCanvas = document.getElementById('confetti-canvas'), cctx = cCanvas.getContext('2d');
function sizeConfetti() { cCanvas.width = innerWidth; cCanvas.height = innerHeight; }
sizeConfetti(); addEventListener('resize', sizeConfetti);
let confetti = [];
const colors = ['#f7e7c6', '#d4af6a', '#f4c7cf', '#e0708a', '#fdf8f0', '#b8923f'];
function makePiece(fromTop) {
  return {
    x: Math.random() * cCanvas.width,
    y: fromTop ? -20 : Math.random() * cCanvas.height,
    w: Math.random() * 9 + 5, h: Math.random() * 6 + 4,
    vx: (Math.random() - 0.5) * 3, vy: Math.random() * 3 + 2,
    rot: Math.random() * 360, vr: (Math.random() - 0.5) * 12,
    c: colors[Math.floor(Math.random() * colors.length)]
  };
}
function fullConfetti(duration) {
  const end = Date.now() + duration;
  const timer = setInterval(() => {
    for (let i = 0; i < 10; i++) confetti.push(makePiece(true));
    if (Date.now() > end) clearInterval(timer);
  }, 60);
}
function burstHearts() {
  const r = gift.getBoundingClientRect();
  for (let i = 0; i < 30; i++) {
    const h = document.createElement('div');
    h.textContent = '\u2665';
    h.style.cssText = `position:fixed;left:${r.left + r.width / 2}px;top:${r.top}px;color:#f4c7cf;font-size:${14 + Math.random() * 18}px;pointer-events:none;z-index:9998;transition:transform 1.6s ease-out, opacity 1.6s;`;
    document.body.appendChild(h);
    requestAnimationFrame(() => {
      h.style.transform = `translate(${(Math.random() - 0.5) * 300}px, ${-150 - Math.random() * 250}px) rotate(${Math.random() * 360}deg)`;
      h.style.opacity = '0';
    });
    setTimeout(() => h.remove(), 1700);
  }
}
document.getElementById('confettiBtn').addEventListener('click', () => {
  fullConfetti(5000);
  burstHearts();
});
function drawConfetti() {
  cctx.clearRect(0, 0, cCanvas.width, cCanvas.height);
  confetti.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.vy += 0.03;
    cctx.save();
    cctx.translate(p.x, p.y);
    cctx.rotate(p.rot * Math.PI / 180);
    cctx.fillStyle = p.c;
    cctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    cctx.restore();
  });
  confetti = confetti.filter(p => p.y < cCanvas.height + 30);
  requestAnimationFrame(drawConfetti);
}
drawConfetti();

/* ---------- Soft romantic background music (optional, synthesized, never autoplays) ---------- */
const musicBtn = document.getElementById('musicBtn');
let audioCtx = null, musicTimer = null, musicOn = false;
const notes = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 293.66, 349.23];
function playNote(freq, when, dur) {
  const o = audioCtx.createOscillator(), g = audioCtx.createGain(), f = audioCtx.createBiquadFilter();
  o.type = 'sine'; o.frequency.value = freq;
  f.type = 'lowpass'; f.frequency.value = 1200;
  g.gain.setValueAtTime(0, when);
  g.gain.linearRampToValueAtTime(0.09, when + 0.6);
  g.gain.linearRampToValueAtTime(0, when + dur);
  o.connect(f); f.connect(g); g.connect(audioCtx.destination);
  o.start(when); o.stop(when + dur + 0.1);
}
function startMusic() {
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  let step = 0;
  const loop = () => {
    const t = audioCtx.currentTime + 0.05;
    playNote(notes[step % notes.length] / 2, t, 2.6);
    playNote(notes[(step + 2) % notes.length], t + 0.6, 2.2);
    step++;
  };
  loop();
  musicTimer = setInterval(loop, 1400);
}
function stopMusic() { clearInterval(musicTimer); musicTimer = null; if (audioCtx) audioCtx.suspend(); }
musicBtn.addEventListener('click', () => {
  musicOn = !musicOn;
  if (musicOn) {
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    if (!musicTimer) startMusic();
    musicBtn.innerHTML = '&#10074;&#10074;';
    musicBtn.classList.add('playing');
    musicBtn.setAttribute('aria-label', 'Pause background music');
  } else {
    stopMusic();
    musicBtn.innerHTML = '&#9835;';
    musicBtn.classList.remove('playing');
    musicBtn.setAttribute('aria-label', 'Play background music');
  }
});

/* ---------- Scroll to surprise ---------- */
document.getElementById('openSurprise').addEventListener('click', () => {
  document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
});
