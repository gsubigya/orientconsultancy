/* =====================================================================
   dashain-theme.js  —  TEMPORARY Dashain 2083 theme for Orient Consultancy
   ---------------------------------------------------------------------
   ADD:    <script src="dashain-theme.js" defer></script>   (inside <head>)
   REMOVE: delete that one line from each page (or set ENABLED = false).
   Active from START_DATE until END_DATE, then switches itself off.
   The theme shows instantly; music starts as soon as the browser allows.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------------- SETTINGS (edit these) ---------------- */
  var ENABLED    = true;
  var START_DATE = new Date('2026-10-09T00:00:00+05:45'); // starts 9 Oct 2026 (Nepal time)
  var END_DATE   = new Date('2026-10-28T00:00:00+05:45'); // off at midnight, so 27 Oct 2026 is the last full day
  var MUSIC_URL  = '';       // optional: 'audio/dashain.mp3'. Leave '' to use the built-in generated music
  var TINT_SITE  = true;     // true = recolor buttons/headings to Dashain red & gold
  var DEFAULT_VOLUME = 0.5;

  var nowMs = Date.now();
  if (!ENABLED || nowMs < START_DATE.getTime() || nowMs > END_DATE.getTime()) return;
  if (window.__dashainTheme) return;
  window.__dashainTheme = true;

  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SS = window.sessionStorage;
  function sget(k) { try { return SS.getItem('dz.' + k); } catch (e) { return null; } }
  function sset(k, v) { try { SS.setItem('dz.' + k, v); } catch (e) {} }

  /* ================= CSS ================= */
  var garland = "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="34" viewBox="0 0 120 34">' +
    '<path d="M0 3 Q30 13 60 3 T120 3" fill="none" stroke="#7a1d12" stroke-width="1.6"/>' +
    [[10,10,'#f59a1b'],[30,13,'#ffc233'],[50,10,'#f59a1b'],[70,8,'#ffc233'],[90,12,'#f59a1b'],[110,9,'#ffc233']]
      .map(function (f) {
        var x = f[0], y = f[1], c = f[2], s = '';
        for (var i = 0; i < 8; i++) s += '<ellipse cx="' + x + '" cy="' + (y + 7) + '" rx="2.6" ry="6" fill="' + c + '" transform="rotate(' + (i * 45) + ' ' + x + ' ' + (y + 7) + ')"/>';
        return s + '<circle cx="' + x + '" cy="' + (y + 7) + '" r="3" fill="#c8102e"/>';
      }).join('') + '</svg>');

  var css =
  (TINT_SITE ? ':root{--primary:#c8102e;--navy:#6e0f1c;--accent:#f59a1b;--tint:#fff8ee;--border:#f3dfc4;--page-bg:#fff6ea}' : '') +
  '.site-header::after{content:"";position:absolute;left:0;right:0;top:100%;height:34px;background:url("' + garland + '") repeat-x top left;pointer-events:none;z-index:2}' +
  '.dz-layer{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:60}' +
  /* kites */
  '.dz-kite{position:absolute;left:0;top:0;will-change:transform;animation:dz-fly var(--d) linear var(--delay) infinite}' +
  '.dz-kite svg{display:block;animation:dz-bob var(--b) ease-in-out infinite;transform-origin:50% 25%;filter:drop-shadow(0 3px 3px rgba(0,0,0,.18))}' +
  '@keyframes dz-fly{from{transform:translate(-20vw,var(--y0))}to{transform:translate(115vw,var(--y1))}}' +
  '@keyframes dz-bob{0%,100%{transform:rotate(-9deg)}50%{transform:rotate(9deg)}}' +
  /* petals */
  '.dz-petal{position:absolute;top:-30px;width:var(--s);height:calc(var(--s)*1.5);border-radius:70% 0 70% 0;background:var(--c);opacity:.85;animation:dz-fall var(--t) linear var(--delay) infinite}' +
  '@keyframes dz-fall{0%{transform:translate(0,-5vh) rotate(0)}50%{transform:translate(var(--sw),55vh) rotate(180deg)}100%{transform:translate(calc(var(--sw)*-.4),110vh) rotate(360deg)}}' +
  /* kalash + jamara + diya */
  '.dz-kalash{position:fixed;left:12px;bottom:6px;width:112px;z-index:61;pointer-events:none}' +
  '.dz-flame{transform-origin:50% 100%;animation:dz-flick 1.1s ease-in-out infinite alternate}' +
  '@keyframes dz-flick{from{transform:scale(1,.9) skewX(-3deg)}to{transform:scale(.92,1.08) skewX(3deg)}}' +
  /* Durga eyes badge */
  '.dz-eyes{position:fixed;right:14px;bottom:74px;width:150px;z-index:61;pointer-events:none;filter:drop-shadow(0 4px 10px rgba(110,15,28,.4))}' +
  '.dz-eye{transform-box:fill-box;transform-origin:center;animation:dz-blink 6s infinite}' +
  '.dz-pupil{transition:transform .12s ease-out;transform:translate(var(--px,0px),var(--py,0px))}' +
  '.dz-glow{animation:dz-glow 3s ease-in-out infinite alternate}' +
  '@keyframes dz-blink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.08)}}' +
  '@keyframes dz-glow{from{opacity:.35}to{opacity:.9}}' +
  /* player */
  '.dz-player{position:fixed;right:14px;bottom:14px;z-index:9000;display:flex;align-items:center;gap:8px;padding:6px 12px 6px 6px;border-radius:999px;background:linear-gradient(135deg,#8c0f20,#c8102e);color:#fff;box-shadow:0 8px 24px rgba(110,15,28,.45);font:600 13px/1 var(--font-body,Inter,Arial,sans-serif)}' +
  '.dz-player button{all:unset;cursor:pointer;width:38px;height:38px;border-radius:50%;background:#ffc233;display:grid;place-items:center;color:#6e0f1c}' +
  '.dz-player button:focus-visible{outline:3px solid #fff}' +
  '.dz-bars{display:flex;gap:2px;align-items:flex-end;height:16px}' +
  '.dz-bars i{width:3px;background:#6e0f1c;border-radius:2px;height:5px}' +
  '.dz-on .dz-bars i{animation:dz-eq .9s ease-in-out infinite alternate}' +
  '.dz-bars i:nth-child(2){animation-delay:.2s!important}.dz-bars i:nth-child(3){animation-delay:.4s!important}.dz-bars i:nth-child(4){animation-delay:.1s!important}' +
  '@keyframes dz-eq{from{height:4px}to{height:16px}}' +
  '.dz-player input{width:0;opacity:0;transition:width .25s,opacity .25s;accent-color:#ffc233}' +
  '.dz-player:hover input,.dz-player:focus-within input{width:70px;opacity:1}' +
  '.dz-hint{position:fixed;right:14px;bottom:66px;z-index:9001;background:#fff;color:#6e0f1c;padding:8px 12px;border-radius:12px;font:600 13px var(--font-body,Inter,Arial);box-shadow:0 8px 24px rgba(0,0,0,.2);display:none}' +
  '.dz-hint.show{display:block;animation:dz-pop .4s ease}' +
  '@keyframes dz-pop{from{transform:translateY(8px);opacity:0}to{transform:none;opacity:1}}' +
  '@media (max-width:700px){.dz-eyes{width:96px;bottom:68px}.dz-kalash{width:60px}.site-header::after{height:26px;background-size:90px 26px}}' +
  '@media (prefers-reduced-motion:reduce){.dz-kite,.dz-petal{animation:none!important}.dz-kite{transform:translate(70vw,20vh)}.dz-petal{display:none}}';

  var style = document.createElement('style');
  style.id = 'dashain-theme-css';
  style.textContent = css;
  document.head.appendChild(style);
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@700&display=swap';
  document.head.appendChild(font);

  /* ================= SVG builders ================= */
  function eyesSVG(p) {
    function eye(cx, flip) {
      var t = flip ? 'translate(' + (2 * 110) + ',0) scale(-1,1)' : '';
      return '<g transform="' + t + '">' +
        '<path d="M20 52 Q55 14 96 40 Q100 44 100 48 Q60 70 20 52Z" fill="url(#' + p + 'w)" stroke="#1b0b0b" stroke-width="4" stroke-linejoin="round"/>' +
        '<path d="M14 56 Q12 48 4 44 Q16 44 22 50" fill="#1b0b0b"/>' +                       /* kajal wing */
        '<g class="dz-eye"><clipPath id="' + p + 'c' + cx + '"><path d="M20 52 Q55 14 96 40 Q100 44 100 48 Q60 70 20 52Z"/></clipPath>' +
        '<g clip-path="url(#' + p + 'c' + cx + ')"><g class="dz-pupil"><circle cx="58" cy="44" r="19" fill="#3a1608"/><circle cx="58" cy="44" r="10" fill="#0b0302"/><circle cx="52" cy="38" r="4" fill="#fff" opacity=".9"/></g></g></g>' +
        '<path d="M16 54 Q55 8 100 42" fill="none" stroke="#1b0b0b" stroke-width="5.5" stroke-linecap="round"/>' + /* upper lid */
        '<path d="M18 22 Q58 -2 104 24" fill="none" stroke="#2a0e0e" stroke-width="6" stroke-linecap="round"/>' +  /* brow */
        '<path d="M26 14 Q58 -4 98 16" fill="none" stroke="#ffc233" stroke-width="1.6" stroke-dasharray="1 5" stroke-linecap="round"/>' +
        '</g>';
    }
    return '<svg viewBox="0 -10 220 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Maa Durga\'s eyes">' +
      '<defs><radialGradient id="' + p + 'w"><stop offset="0" stop-color="#fffdf5"/><stop offset="1" stop-color="#f4e2c4"/></radialGradient>' +
      '<radialGradient id="' + p + 'g"><stop offset="0" stop-color="#ffd36b"/><stop offset="1" stop-color="#ffd36b" stop-opacity="0"/></radialGradient></defs>' +
      '<ellipse class="dz-glow" cx="110" cy="40" rx="110" ry="46" fill="url(#' + p + 'g)"/>' +
      eye(1, false) + eye(2, true) +
      '<path d="M110 8 Q118 22 110 38 Q102 22 110 8Z" fill="#d4081f" stroke="#ffc233" stroke-width="2"/>' +   /* tika / third eye */
      '</svg>';
  }

  var kiteColors = [['#e11d2e', '#ffc233'], ['#f59a1b', '#c8102e'], ['#139fd6', '#fff3d6'], ['#2fa84f', '#ffc233'], ['#8e24aa', '#ffd36b'], ['#ffc233', '#c8102e']];
  function kiteSVG(a, b) {
    var tail = '';
    for (var i = 1; i <= 5; i++) tail += '<path d="M' + (50 + Math.sin(i) * 5) + ' ' + (88 + i * 14) + ' l-6 -5 l0 10z M' + (50 + Math.sin(i) * 5) + ' ' + (88 + i * 14) + ' l6 -5 l0 10z" fill="' + (i % 2 ? a : b) + '"/>';
    return '<svg width="64" height="150" viewBox="0 0 100 190" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M50 90 Q46 110 52 130 T50 176" fill="none" stroke="#7a1d12" stroke-width="1.4"/>' + tail +
      '<path d="M50 4 L92 44 L50 92 L8 44Z" fill="' + a + '"/>' +
      '<path d="M50 4 L92 44 L50 44Z" fill="' + b + '"/><path d="M8 44 L50 92 L50 44Z" fill="' + b + '"/>' +
      '<path d="M50 4 V92 M8 44 H92" stroke="#fff3d6" stroke-width="1.6" opacity=".8"/>' +
      '<path d="M50 4 L92 44 L50 92 L8 44Z" fill="none" stroke="#fff3d6" stroke-width="2"/></svg>';
  }

  var kalashSVG =
    '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<g stroke="#2e7d32" stroke-width="3" stroke-linecap="round">' +
    '<path d="M38 48 Q30 24 26 12 M44 48 Q42 22 42 6 M50 48 Q50 20 54 4 M56 48 Q60 22 66 8 M62 48 Q70 26 76 16 M34 50 Q24 34 16 28" stroke="#a6d608"/></g>' +
    '<ellipse cx="50" cy="52" rx="22" ry="7" fill="#b4592c"/>' +
    '<path d="M26 54 Q18 88 32 108 H68 Q82 88 74 54Z" fill="#d4691f"/>' +
    '<path d="M28 70 H72 M31 92 H69" stroke="#ffc233" stroke-width="3"/>' +
    '<circle cx="50" cy="82" r="7" fill="#c8102e"/>' +
    '<ellipse cx="50" cy="112" rx="30" ry="6" fill="#8c0f20"/>' +
    '<path d="M20 112 H80 L84 124 H16Z" fill="#b4592c"/>' +
    '<path d="M96 124 Q100 112 120 112 Q138 112 136 124Z" fill="#b4592c"/><rect x="104" y="118" width="24" height="4" fill="#ffc233"/>' +
    '<g class="dz-flame"><path d="M120 110 q-8 -10 0 -24 q8 14 0 24z" fill="#ffb100"/><path d="M120 108 q-3 -6 0 -13 q3 7 0 13z" fill="#fff3d6"/></g></svg>';

  /* ================= build layers (shown immediately) ================= */
  var body = document.body;
  var layer = document.createElement('div');
  layer.className = 'dz-layer';
  layer.setAttribute('aria-hidden', 'true');
  var html = '';
  var n = window.innerWidth < 700 ? 4 : 7, i;
  for (i = 0; i < n; i++) {
    var c = kiteColors[i % kiteColors.length];
    var y0 = 8 + ((i * 37) % 55), y1 = Math.max(4, y0 - 10 + ((i * 13) % 22));
    html += '<div class="dz-kite" style="--d:' + (30 + (i * 7) % 24) + 's;--b:' + (2.4 + (i % 3) * .7) + 's;--delay:-' + (i * 6.3) + 's;--y0:' + y0 + 'vh;--y1:' + y1 + 'vh;' +
      'width:' + (44 + (i % 3) * 12) + 'px">' + kiteSVG(c[0], c[1]) + '</div>';
  }
  var petalCols = ['#f59a1b', '#ffc233', '#e8590c', '#c8102e'];
  var pn = window.innerWidth < 700 ? 10 : 18;
  for (i = 0; i < pn; i++) {
    html += '<span class="dz-petal" style="left:' + ((i * 53) % 100) + '%;--s:' + (8 + (i % 4) * 3) + 'px;--c:' + petalCols[i % 4] +
      ';--t:' + (11 + (i * 3) % 9) + 's;--delay:-' + ((i * 1.7) % 14) + 's;--sw:' + ((i % 2 ? 1 : -1) * (30 + (i * 11) % 60)) + 'px"></span>';
  }
  layer.innerHTML = html;
  body.appendChild(layer);

  var kal = document.createElement('div');
  kal.className = 'dz-kalash';
  kal.setAttribute('aria-hidden', 'true');
  kal.innerHTML = kalashSVG;
  body.appendChild(kal);

  var eyes = document.createElement('div');
  eyes.className = 'dz-eyes';
  eyes.innerHTML = eyesSVG('s');
  body.appendChild(eyes);

  var raf = 0;
  if (!reduceMotion) {
    document.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var r = eyes.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        var d = Math.max(1, Math.hypot(dx, dy)), m = Math.min(7, d / 40);
        eyes.style.setProperty('--px', (dx / d * m).toFixed(1) + 'px');
        eyes.style.setProperty('--py', (dy / d * m * .6).toFixed(1) + 'px');
      });
    }, { passive: true });
  }

  /* ================= MUSIC ENGINE =================
     Position is derived from a wall-clock start time kept in sessionStorage, so when
     the next page loads the music continues from the same spot (no restart).        */
  var BPM = 112, STEP = 60 / BPM / 2, SCALE = [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25, 739.99, 880];
  var LOW = { a: 220, b: 246.94 };
  var BARS = [ // 8 steps per bar; digit=scale note (1=D4 … 9=A5), a/b = low A/B, '-' hold, '.' rest
    '3-454-3-', '2-3-1-2-', '3-456-54', '3-2-1---',
    '6-76-5-4', '5-45-3-4', '6-787-65', '4-3-21--',
    '3-454-3-', '2-3-5-3-', '3-456-54', '3-2-1-b-',
    '6-76-8-7', '6-5-4-5-', '6-787-65', '4-3-2-1-'];
  var TOTAL = BARS.length * 8, LOOP = TOTAL * STEP;
  var notes = []; // step -> {f, len}
  (function () {
    var s = BARS.join(''), k, j;
    for (k = 0; k < s.length; k++) {
      var ch = s[k];
      if (ch === '-' || ch === '.') continue;
      var f = LOW[ch] || SCALE[+ch - 1];
      for (j = k + 1; j < s.length && s[j] === '-'; j++);
      notes[k] = { f: f, len: j - k };
    }
  })();
  var MADAL = ['L', '.', 'H', 'L', 'L', '.', 'H', 'h'];

  var ctx, master, verb, noiseBuf, timer, nextIdx, nextTime, engineOn = false, drones = [];
  var audioEl, usingFile = !!MUSIC_URL;

  function nowPos() { return ((Date.now() - (+sget('t0') || Date.now())) / 1000); }

  function makeCtx() {
    if (ctx) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = vol();
    var comp = ctx.createDynamicsCompressor();
    master.connect(comp); comp.connect(ctx.destination);
    // simple generated reverb
    var len = ctx.sampleRate * 1.8, ir = ctx.createBuffer(2, len, ctx.sampleRate), ch, q;
    for (ch = 0; ch < 2; ch++) { var d = ir.getChannelData(ch); for (q = 0; q < len; q++) d[q] = (Math.random() * 2 - 1) * Math.pow(1 - q / len, 2.6); }
    verb = ctx.createConvolver(); verb.buffer = ir;
    var vg = ctx.createGain(); vg.gain.value = .35; verb.connect(vg); vg.connect(master);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    var nd = noiseBuf.getChannelData(0); for (q = 0; q < nd.length; q++) nd[q] = Math.random() * 2 - 1;
    ctx.onstatechange = function () { if (ctx.state === 'running' && wantPlay()) { startSynth(); hideHint(); } };
  }

  function env(g, t, a, peak, dur) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  }
  function flute(f, t, dur) {
    var o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(), g2 = ctx.createGain(), l = ctx.createOscillator(), lg = ctx.createGain();
    o.type = 'sine'; o2.type = 'sine';
    o.frequency.setValueAtTime(f * .975, t); o.frequency.exponentialRampToValueAtTime(f, t + .05);
    o2.frequency.setValueAtTime(f * 2 * .975, t); o2.frequency.exponentialRampToValueAtTime(f * 2, t + .05);
    l.frequency.value = 5.4; lg.gain.value = f * .006; l.connect(lg); lg.connect(o.frequency);
    g2.gain.value = .22; o2.connect(g2);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(.16, t + .06);
    g.gain.setValueAtTime(.14, t + Math.max(.07, dur - .12)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g2.connect(g); g.connect(master); g.connect(verb);
    var nz = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), ng = ctx.createGain();
    nz.buffer = noiseBuf; bp.type = 'bandpass'; bp.frequency.value = f * 3; bp.Q.value = 2; env(ng, t, .03, .012, Math.min(dur, .25));
    nz.connect(bp); bp.connect(ng); ng.connect(master);
    o.start(t); o2.start(t); l.start(t); nz.start(t);
    var end = t + dur + .05; o.stop(end); o2.stop(end); l.stop(end); nz.stop(t + .3);
  }
  function drum(kind, t) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    if (kind === 'L') { o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(65, t + .12); env(g, t, .004, .55, .32); }
    else { o.type = 'triangle'; o.frequency.setValueAtTime(kind === 'H' ? 420 : 360, t); o.frequency.exponentialRampToValueAtTime(260, t + .08); env(g, t, .002, kind === 'H' ? .3 : .15, .14); }
    o.connect(g); g.connect(master); o.start(t); o.stop(t + .4);
    if (kind !== 'L') { // slap
      var nz = ctx.createBufferSource(), hp = ctx.createBiquadFilter(), ng = ctx.createGain();
      nz.buffer = noiseBuf; hp.type = 'highpass'; hp.frequency.value = 2500; env(ng, t, .001, kind === 'H' ? .12 : .05, .05);
      nz.connect(hp); hp.connect(ng); ng.connect(master); nz.start(t); nz.stop(t + .08);
    }
  }
  function shaker(t, acc) {
    var nz = ctx.createBufferSource(), hp = ctx.createBiquadFilter(), g = ctx.createGain();
    nz.buffer = noiseBuf; hp.type = 'highpass'; hp.frequency.value = 6500; env(g, t, .004, acc ? .05 : .025, .07);
    nz.connect(hp); hp.connect(g); g.connect(master); nz.start(t); nz.stop(t + .1);
  }
  function bell(t) {
    [1, 2.76, 5.4].forEach(function (m, k) {
      var o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = 1174.66 * m; env(g, t, .002, .05 / (k + 1), 1.6);
      o.connect(g); g.connect(master); g.connect(verb); o.start(t); o.stop(t + 1.7);
    });
  }
  function startDrone() {
    stopDrone();
    [146.83, 220, 293.66].forEach(function (f, k) {
      var o = ctx.createOscillator(), lp = ctx.createBiquadFilter(), g = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = k * 4 - 4; lp.type = 'lowpass'; lp.frequency.value = 520;
      g.gain.setValueAtTime(0.0001, ctx.currentTime); g.gain.linearRampToValueAtTime(.022, ctx.currentTime + 2);
      o.connect(lp); lp.connect(g); g.connect(master); o.start(); drones.push({ o: o, g: g });
    });
  }
  function stopDrone() {
    drones.forEach(function (d) { try { d.g.gain.cancelScheduledValues(ctx.currentTime); d.g.gain.setTargetAtTime(0, ctx.currentTime, .15); d.o.stop(ctx.currentTime + .8); } catch (e) {} });
    drones = [];
  }
  function playStep(idx, t) {
    var i8 = idx % 8, nt = notes[idx];
    if (nt) flute(nt.f, t, Math.max(.18, nt.len * STEP * .96));
    var d = MADAL[i8]; if (d !== '.') drum(d, t);
    shaker(t, i8 % 2 === 0);
    if (idx % 16 === 0) bell(t);
  }
  function schedule() {
    while (nextTime < ctx.currentTime + .7) { playStep(nextIdx % TOTAL, nextTime); nextIdx++; nextTime += STEP; }
  }
  function startSynth() {
    if (engineOn || !ctx) return;
    engineOn = true;
    var pos = nowPos() % LOOP, idx = Math.ceil(pos / STEP);
    nextIdx = idx; nextTime = ctx.currentTime + (idx * STEP - pos) + .05;
    startDrone(); schedule(); timer = setInterval(schedule, 120);
    setUI(true);
  }
  function stopSynth() {
    if (!engineOn) return;
    engineOn = false; clearInterval(timer); stopDrone();
  }

  /* ---- mp3 mode ---- */
  function startFile() {
    if (!audioEl) { audioEl = new Audio(MUSIC_URL); audioEl.loop = true; audioEl.preload = 'auto'; audioEl.volume = vol(); }
    var go = function () {
      if (audioEl.duration) { try { audioEl.currentTime = nowPos() % audioEl.duration; } catch (e) {} }
      audioEl.play().then(function () { hideHint(); setUI(true); }).catch(function () { showHint(); });
    };
    if (audioEl.readyState >= 1) go(); else audioEl.addEventListener('loadedmetadata', go, { once: true });
  }

  /* ---- common controls ---- */
  function vol() { var v = parseFloat(sget('vol')); return isNaN(v) ? DEFAULT_VOLUME : v; }
  function wantPlay() { return sget('music') === 'on'; }

  function play() {
    sset('music', 'on');
    if (!sget('t0')) sset('t0', String(Date.now()));
    if (usingFile) { startFile(); return; }
    makeCtx(); if (!ctx) return;
    ctx.resume();
    if (ctx.state === 'running') startSynth();
    else setTimeout(function () { if (ctx.state !== 'running' && wantPlay()) showHint(); }, 350);
  }
  function pause() {
    sset('music', 'off');
    sset('pos', String(nowPos()));
    if (usingFile) { if (audioEl) audioEl.pause(); } else stopSynth();
    setUI(false); hideHint();
  }
  function resumeAfterPause() { sset('t0', String(Date.now() - (+sget('pos') || 0) * 1000)); play(); }

  /* ---- UI: player pill + hint ---- */
  var pill = document.createElement('div');
  pill.className = 'dz-player';
  pill.innerHTML = '<button type="button" aria-label="Toggle Dashain music" aria-pressed="false"><span class="dz-bars"><i></i><i></i><i></i><i></i></span></button>' +
    '<span>Dashain</span><input type="range" min="0" max="1" step="0.05" aria-label="Music volume">';
  body.appendChild(pill);
  var btn = pill.querySelector('button'), slider = pill.querySelector('input');
  slider.value = vol();
  var hint = document.createElement('div');
  hint.className = 'dz-hint'; hint.textContent = '🎶 Tap anywhere to start the music';
  body.appendChild(hint);

  function setUI(on) { pill.classList.toggle('dz-on', !!on); btn.setAttribute('aria-pressed', on ? 'true' : 'false'); }
  function showHint() { hint.classList.add('show'); }
  function hideHint() { hint.classList.remove('show'); }

  btn.addEventListener('click', function () {
    if (pill.classList.contains('dz-on')) pause(); else resumeAfterPause();
  });
  slider.addEventListener('input', function () {
    var v = +slider.value; sset('vol', String(v));
    if (master) master.gain.value = v; if (audioEl) audioEl.volume = v;
  });

  // Browsers block sound until the visitor taps/clicks/presses a key.
  // The first such action starts the music (scrolling/mouse-move do not count for browsers).
  function unlock(e) {
    if (e && e.target && pill.contains(e.target)) return; // the player button handles itself
    if (!wantPlay()) return;
    if (usingFile) { if (!audioEl || audioEl.paused) startFile(); }
    else { makeCtx(); if (ctx) { ctx.resume(); if (ctx.state === 'running') startSynth(); } }
    hideHint();
  }
  ['pointerdown', 'click', 'keydown', 'touchstart', 'touchend'].forEach(function (ev) {
    document.addEventListener(ev, unlock, { passive: true });
  });

  document.addEventListener('visibilitychange', function () {
    if (!wantPlay() || usingFile) return;
    if (document.hidden) { stopSynth(); if (ctx) ctx.suspend(); }
    else if (ctx) { ctx.resume().then(function () { if (wantPlay()) startSynth(); }); }
  });

  /* ================= start: theme is already visible; try to play music right away ================= */
  if (sget('music') === null) { sset('music', 'on'); sset('t0', String(Date.now())); }
  if (sget('music') === 'on') play();
})();
