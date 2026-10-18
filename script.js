(() => {
  'use strict';
  const poems = window.POEMS || [];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const storage = { get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }, set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } } };
  const saved = new Set(storage.get('poetry-saved-v1', []).filter(id => poems.some(poem => poem.id === id)));
  const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let userMotionOff = storage.get('poetry-motion-off', false);
  let readerMotionOff = storage.get('poetry-scene-motion-off', false);
  let activeFilter = 'all';
  let current = 0;
  let previousFocus = null;
  let previousHash = '';
  let motionContext;
  let typingTimer;
  let toastTimer;
  const reader = $('#poem-reader');
  const atmosphere = window.PoemAtmosphere ? new window.PoemAtmosphere(reader, $('#reader-scene')) : null;
  const pad = number => String(number).padStart(2, '0');
  const prettyMood = mood => ({ ishq: 'Ishq / Love', yaadein: 'Yaadein / Memories', kaash: 'Kaash / What if' })[mood];
  const reduced = () => systemMotion.matches || userMotionOff;

  function message(text) {
    clearTimeout(toastTimer);
    const toast = $('#toast');
    const host = reader.open ? reader : document.body;
    if (toast.parentNode !== host) host.append(toast);
    $('#toast').textContent = text;
    $('#toast').classList.add('show');
    toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 2800);
  }

  function renderList() {
    const list = $('#poem-list');
    const fragment = document.createDocumentFragment();
    poems.forEach((poem, index) => {
      const row = document.createElement('article');
      row.className = 'poem-row';
      row.dataset.id = poem.id;
      row.dataset.mood = poem.mood;
      row.id = `entry-${poem.id}`;
      const button = document.createElement('button');
      button.className = 'poem-open';
      button.type = 'button';
      button.dataset.openPoem = poem.id;
      button.setAttribute('aria-label', `Read ${poem.title}, ${prettyMood(poem.mood)}`);
      const number = document.createElement('span');
      number.className = 'poem-number';
      number.textContent = pad(index + 1);
      const description = document.createElement('div');
      description.className = 'poem-description';
      const title = document.createElement('h3');
      title.textContent = poem.title;
      const savedMark = document.createElement('span');
      savedMark.className = 'saved-mark';
      savedMark.textContent = 'SAVED';
      savedMark.hidden = !saved.has(poem.id);
      title.append(savedMark);
      const firstLine = document.createElement('p');
      firstLine.className = 'poem-first-line';
      firstLine.lang = 'hi-Latn';
      firstLine.textContent = poem.lines[0];
      description.append(title, firstLine);
      const meta = document.createElement('span');
      meta.className = 'poem-meta';
      const mood = document.createElement('span');
      mood.className = 'mood';
      mood.textContent = poem.mood;
      const length = document.createElement('span');
      length.textContent = `${poem.lines.length} LINES`;
      meta.append(mood, length);
      const arrow = document.createElement('span');
      arrow.className = 'poem-arrow';
      arrow.textContent = '↗';
      arrow.setAttribute('aria-hidden', 'true');
      button.append(number, description, meta, arrow);
      row.append(button);
      fragment.append(row);
    });
    list.replaceChildren(fragment);
    updateSavedCount();
    filterPoems();
  }

  function updateSavedCount() { $('#saved-count').textContent = saved.size; }
  function filterPoems() {
    const query = $('#poem-search').value.trim().toLocaleLowerCase();
    let count = 0;
    $$('.poem-row').forEach(row => {
      const poem = poems.find(item => item.id === row.dataset.id);
      const matchesMood = activeFilter === 'all' || activeFilter === poem.mood || (activeFilter === 'saved' && saved.has(poem.id));
      const matchesText = `${poem.title} ${poem.mood} ${poem.lines.join(' ')}`.toLocaleLowerCase().includes(query);
      row.hidden = !(matchesMood && matchesText);
      if (!row.hidden) count++;
    });
    $('#empty-state').hidden = count > 0;
    $('#empty-message').textContent = activeFilter === 'saved' && !saved.size ? 'A little space for the poems you keep.' : 'No poems here just yet. Try another feeling.';
    $('#results-status').textContent = `${count} ${count === 1 ? 'poem' : 'poems'} shown.`;
    window.ScrollTrigger?.refresh();
  }

  function showPoem(index, changeHash = true) {
    current = (index + poems.length) % poems.length;
    const poem = poems[current];
    $('#reader-count').textContent = `${pad(current + 1)} / ${pad(poems.length)}`;
    $('#reader-title').textContent = poem.title;
    $('#reader-mood').textContent = prettyMood(poem.mood);
    const fragment = document.createDocumentFragment();
    poem.lines.forEach(line => { const p = document.createElement('p'); p.textContent = line; fragment.append(p); });
    $('#reader-lines').replaceChildren(fragment);
    updateSaveButton();
    $('#copy-poem').textContent = 'Copy poem';
    if (!reader.open) {
      previousFocus = document.activeElement;
      previousHash = location.hash.startsWith('#poem-') ? '#collection' : location.hash;
      reader.showModal();
      document.body.classList.add('reader-open');
    }
    atmosphere?.render(poem.id, reduced() || readerMotionOff);
    atmosphere?.pause(document.hidden);
    syncReaderMotion(false);
    reader.scrollTop = 0;
    $('#reader-title').focus({ preventScroll: true });
    if (changeHash) history.replaceState(null, '', `#poem-${poem.id}`);
    document.title = `${poem.title} — Harshit Sati`;
  }

  function closePoem() { if (reader.open) reader.close(); }
  function syncReaderMotion(rebuild = true) {
    const off = reduced() || readerMotionOff;
    $('#reader-motion').setAttribute('aria-pressed', String(!off));
    $('#reader-motion').setAttribute('aria-label', systemMotion.matches ? 'Background motion follows your reduced motion preference' : `${off ? 'Resume' : 'Pause'} background motion`);
    $('#reader-motion-label').textContent = off ? 'Motion off' : 'Motion on';
    if (rebuild && reader.open) {
      atmosphere?.setMotion(off);
      atmosphere?.pause(document.hidden);
    }
  }
  function updateSaveButton() {
    const isSaved = saved.has(poems[current].id);
    $('#save-poem').setAttribute('aria-pressed', String(isSaved));
    $('#save-poem').textContent = isSaved ? 'Saved to your collection ✓' : 'Save this poem';
  }

  document.addEventListener('click', event => {
    const opener = event.target.closest('[data-open-poem]');
    if (opener) { const index = poems.findIndex(poem => poem.id === opener.dataset.openPoem); if (index >= 0) showPoem(index); }
  });
  $('#close-reader').addEventListener('click', closePoem);
  reader.addEventListener('click', event => {
    if (event.target !== reader) return;
    const rect = reader.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closePoem();
  });
  reader.addEventListener('close', () => {
    atmosphere?.clear();
    $('#toast').classList.remove('show');
    document.body.append($('#toast'));
    document.body.classList.remove('reader-open');
    history.replaceState(null, '', previousHash || location.pathname + location.search);
    document.title = 'Some things inside my head — Harshit Sati';
    previousFocus?.focus({ preventScroll: true });
  });
  $('#previous-poem').addEventListener('click', () => showPoem(current - 1));
  $('#next-poem').addEventListener('click', () => showPoem(current + 1));
  $('#reader-motion').addEventListener('click', () => {
    if (systemMotion.matches) { message('Your device’s reduced motion preference keeps this scene still.'); return; }
    const wasOff = reduced() || readerMotionOff;
    readerMotionOff = !wasOff;
    storage.set('poetry-scene-motion-off', readerMotionOff);
    if (wasOff && userMotionOff) {
      userMotionOff = false;
      storage.set('poetry-motion-off', false);
      setupMotion();
    } else syncReaderMotion();
  });
  reader.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPoem(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPoem(current + 1); }
  });
  $('#reader-theme').addEventListener('click', () => {
    const paper = reader.classList.toggle('paper');
    $('#reader-theme').setAttribute('aria-pressed', String(paper));
    $('#reader-theme').setAttribute('aria-label', `Switch reader to ${paper ? 'night' : 'paper'} background`);
    storage.set('poetry-paper-reader', paper);
  });
  if (storage.get('poetry-paper-reader', false)) $('#reader-theme').click();
  $('#save-poem').addEventListener('click', () => {
    const id = poems[current].id;
    if (saved.has(id)) saved.delete(id); else saved.add(id);
    const persisted = storage.set('poetry-saved-v1', [...saved]);
    updateSaveButton();
    updateSavedCount();
    const mark = $(`#entry-${id} .saved-mark`);
    if (mark) mark.hidden = !saved.has(id);
    filterPoems();
    message(persisted ? (saved.has(id) ? 'A little feeling, kept for later.' : 'Poem removed from saved.') : 'Saved for this visit. Browser storage is unavailable.');
  });
  $('#copy-poem').addEventListener('click', async () => {
    const poem = poems[current];
    const text = `${poem.title}\nby Harshit Sati\n\n${poem.lines.join('\n')}`;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      message('The words are yours to carry. Copied.');
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents($('#reader-lines'));
      selection.removeAllRanges(); selection.addRange(range);
      message('Poem selected. Use your device’s Copy command.');
    }
  });
  $$('.filter').forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    $$('.filter').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    filterPoems();
  }));
  $('#poem-search').addEventListener('input', filterPoems);
  $('#clear-filters').addEventListener('click', () => { $('#poem-search').value = ''; $('[data-filter=all]').click(); });
  $('#random-poem').addEventListener('click', () => showPoem(Math.floor(Math.random() * poems.length)));
  $('#year').textContent = new Date().getFullYear();

  const scatter = $('.scatter-text');
  const scatterOriginal = scatter.textContent;
  scatter.setAttribute('aria-label', scatterOriginal);
  scatter.replaceChildren(...[...scatterOriginal].map(char => {
    const span = document.createElement('span'); span.className = 'scatter-letter'; span.textContent = char; span.setAttribute('aria-hidden', 'true'); return span;
  }));

  function startTyping() {
    clearTimeout(typingTimer);
    const words = ['mohobatt aur yaadein.', 'khwaab aur haqeeqat.', 'tum aur meri kalam.'];
    const output = $('#typed-thought');
    if (reduced()) { output.textContent = words[0]; return; }
    let word = 0, letter = words[0].length, erasing = true;
    output.textContent = words[0];
    function type() {
      if (document.hidden || reader.open || !$('.prologue').matches(':not([hidden])')) { typingTimer = setTimeout(type, 1000); return; }
      if (erasing) { letter--; output.textContent = words[word].slice(0, letter); if (letter <= 0) { erasing = false; word = (word + 1) % words.length; } }
      else { letter++; output.textContent = words[word].slice(0, letter); if (letter >= words[word].length) { erasing = true; typingTimer = setTimeout(type, 2600); return; } }
      typingTimer = setTimeout(type, erasing ? 34 : 90);
    }
    typingTimer = setTimeout(type, 2500);
  }

  function setupMotion() {
    motionContext?.revert();
    const off = reduced();
    document.body.dataset.motion = off ? 'off' : 'on';
    $('#motion-toggle').setAttribute('aria-pressed', String(off));
    $('#motion-toggle').setAttribute('aria-label', systemMotion.matches ? 'Animations follow your device’s reduced motion setting' : `Turn ${off ? 'on' : 'off'} animations`);
    $('#motion-label').textContent = off ? 'Motion off' : 'Motion on';
    startTyping();
    syncReaderMotion();
    if (!window.gsap || !window.ScrollTrigger) return;
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);
    motionContext = gsap.matchMedia();
    motionContext.add({ desktop: '(min-width: 761px)', mobile: '(max-width: 760px)' }, context => {
      gsap.to('.page-progress span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 0, end: 'max', scrub: true } });
      if (off) return;
      const desktop = context.conditions.desktop;
      if (scrollY < 80) {
        gsap.from('h1>span', { y: 35, opacity: .45, duration: 1.1, stagger: .13, ease: 'power3.out', clearProps: 'all' });
        gsap.from('.hero-eyebrow,.hero-subtitle,.enter-link', { y: 12, opacity: .3, duration: 1.2, stagger: .1, ease: 'power2.out', clearProps: 'all' });
      }
      gsap.to('.hero-image', { yPercent: 12, scale: 1.07, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } });
      gsap.to('.hero-note', { y: -55, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .5 } });
      gsap.from('.flower-art', { y: 70, rotation: -9, transformOrigin: '50% 100%', ease: 'none', scrollTrigger: { trigger: '.featured', start: 'top bottom', end: 'bottom center', scrub: .8 } });
      const path = $('.flower-stem');
      const length = path.getTotalLength();
      gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.featured', start: 'top 75%', end: 'bottom 85%', scrub: .5 } });
      gsap.to('.rooftop-image', { scale: 1, yPercent: -4, ease: 'none', scrollTrigger: { trigger: '.rooftop', start: 'top bottom', end: 'bottom top', scrub: .8 } });
      /* Adapted from Skiper UI Skiper31 CharacterV1: distance from center controls
         character x/rotateX, settling with scroll. GSAP port, not the React component.
         Free with attribution. Author @gurvinder-singh02. https://skiper-ui.com/v1/skiper31 */
      const letters = $$('.scatter-letter');
      const center = Math.floor(letters.length / 2);
      gsap.from(letters, { x: i => (i - center) * (desktop ? 5 : 1.7), rotationX: i => (i - center) * 7, y: i => Math.abs(i - center) * 1.5, ease: 'none', scrollTrigger: { trigger: '.rooftop', start: 'top 65%', end: 'top 8%', scrub: .65 } });
    });
    ScrollTrigger.refresh();
  }
  $('#motion-toggle').addEventListener('click', () => {
    if (systemMotion.matches) { message('Your device’s reduced motion preference is active.'); return; }
    userMotionOff = !userMotionOff;
    storage.set('poetry-motion-off', userMotionOff);
    setupMotion();
  });
  systemMotion.addEventListener('change', setupMotion);
  document.addEventListener('visibilitychange', () => atmosphere?.pause(document.hidden));
  window.addEventListener('pagehide', () => { clearTimeout(typingTimer); motionContext?.revert(); atmosphere?.pause(true); });
  window.addEventListener('pageshow', event => { if (event.persisted) setupMotion(); });
  function openFromHash() {
    if (!location.hash.startsWith('#poem-')) { if (reader.open) closePoem(); return; }
    const id = location.hash.slice(6);
    const index = poems.findIndex(poem => poem.id === id);
    if (index >= 0) showPoem(index, false);
  }
  window.addEventListener('hashchange', openFromHash);
  renderList();
  setupMotion();
  openFromHash();
  document.fonts.ready.then(() => window.ScrollTrigger?.refresh());
  window.addEventListener('load', () => window.ScrollTrigger?.refresh(), { once: true });
})();
