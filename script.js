const content = window.GEO_CONTENT || {};
const directions = content.directions?.items || [];
const projects = content.projects || window.GEO_PROJECTS || [];
const grid = document.getElementById('projectGrid');


let photoViewer = null;
let photoViewerState = {
  open: false,
  images: [],
  index: 0,
  title: '',
  lastFocus: null
};

function setupPhotoViewer() {
  if (photoViewer) return photoViewer;

  const labels = content.photoViewer || {};
  const overlay = document.createElement('div');
  overlay.className = 'photo-viewer';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', labels.dialogLabel || 'Просмотр фотографии');

  const stage = document.createElement('div');
  stage.className = 'photo-viewer-stage';

  const frame = document.createElement('figure');
  frame.className = 'photo-viewer-frame';

  const image = document.createElement('img');
  image.className = 'photo-viewer-image';
  image.alt = '';
  image.draggable = false;

  const caption = document.createElement('figcaption');
  caption.className = 'photo-viewer-caption';
  const captionTitle = document.createElement('span');
  captionTitle.className = 'photo-viewer-title';
  const counter = document.createElement('span');
  counter.className = 'photo-viewer-counter';
  caption.append(captionTitle, counter);

  frame.append(image, caption);

  const makeButton = (className, text, ariaLabel) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = text;
    button.setAttribute('aria-label', ariaLabel);
    return button;
  };

  const close = makeButton('photo-viewer-close', '×', labels.close || 'Закрыть фотографию');
  const prev = makeButton('photo-viewer-nav photo-viewer-prev', '←', labels.previous || 'Предыдущее фото');
  const next = makeButton('photo-viewer-nav photo-viewer-next', '→', labels.next || 'Следующее фото');

  stage.append(frame, close, prev, next);
  overlay.appendChild(stage);
  document.body.appendChild(overlay);

  const move = (step) => {
    if (!photoViewerState.open || photoViewerState.images.length < 2) return;
    photoViewerState.index = (photoViewerState.index + step + photoViewerState.images.length) % photoViewerState.images.length;
    updatePhotoViewer();
  };

  const closeViewer = () => {
    if (!photoViewerState.open) return;
    photoViewerState.open = false;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('photo-viewer-open');
    image.removeAttribute('src');
    const focusTarget = photoViewerState.lastFocus;
    photoViewerState.lastFocus = null;
    if (focusTarget && typeof focusTarget.focus === 'function') focusTarget.focus({ preventScroll: true });
  };

  close.addEventListener('click', closeViewer);
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target === stage) closeViewer();
  });

  document.addEventListener('keydown', (event) => {
    if (!photoViewerState.open) return;
    if (event.key === 'Escape') closeViewer();
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
  });

  let touchStartX = 0;
  let touchStartY = 0;
  image.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    if (!touch) return;
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });
  image.addEventListener('touchend', (event) => {
    if (photoViewerState.images.length < 2) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy) * 1.15) move(dx > 0 ? -1 : 1);
  }, { passive: true });

  image.addEventListener('error', () => {
    if (!photoViewerState.open || !photoViewerState.images.length) return;
    photoViewerState.images.splice(photoViewerState.index, 1);
    if (!photoViewerState.images.length) {
      closeViewer();
      return;
    }
    photoViewerState.index %= photoViewerState.images.length;
    updatePhotoViewer();
  });

  photoViewer = { overlay, stage, frame, image, captionTitle, counter, close, prev, next, move, closeViewer };
  return photoViewer;
}

function updatePhotoViewer() {
  const viewer = setupPhotoViewer();
  const labels = content.photoViewer || {};
  const total = photoViewerState.images.length;
  if (!total) return;

  const index = ((photoViewerState.index % total) + total) % total;
  photoViewerState.index = index;
  const src = photoViewerState.images[index];

  viewer.image.src = src;
  viewer.image.alt = `${photoViewerState.title || labels.photo || 'Фото'} — ${labels.photo || 'фото'} ${index + 1}`;
  viewer.captionTitle.textContent = photoViewerState.title || labels.photo || 'Фото';
  viewer.counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  viewer.prev.hidden = total < 2;
  viewer.next.hidden = total < 2;
}

function openPhotoViewer(project, images, startIndex = 0, trigger = null) {
  const cleanImages = images.filter(src => typeof src === 'string' && src.trim());
  if (!cleanImages.length) return;

  const viewer = setupPhotoViewer();
  photoViewerState = {
    open: true,
    images: cleanImages,
    index: Math.min(Math.max(startIndex, 0), cleanImages.length - 1),
    title: project.title || '',
    lastFocus: trigger || document.activeElement
  };

  updatePhotoViewer();
  document.body.classList.add('photo-viewer-open');
  viewer.overlay.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => viewer.overlay.classList.add('is-open'));
  viewer.close.focus({ preventScroll: true });
}

const setText = (id, value = '') => {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
};

const setHtml = (id, value = '') => {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value;
};

function directionRange() {
  const configured = content.directions?.range;
  if (configured && String(configured).toLowerCase() !== 'auto') return configured;
  if (!directions.length) return '';
  return `${directions[0].number}—${directions[directions.length - 1].number}`;
}

function categoryLabel(category) {
  return directions.find(item => item.category === category)?.title || category || '';
}

function renderPageContent() {
  if (content.meta?.title) document.title = content.meta.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && content.meta?.description) metaDescription.content = content.meta.description;

  setText('siteBrand', content.topbar?.brand);
  setText('siteCoordinates', content.topbar?.coordinates);
  setText('eyebrowLeft', content.hero?.eyebrowLeft);
  setText('eyebrowRight', content.hero?.eyebrowRight);
  setHtml('heroTitle', content.hero?.titleHtml);
  setText('heroDescription', content.hero?.description);
  setText('aboutLabel', content.hero?.aboutLabel);
  setText('aboutText', content.hero?.aboutText);
  setText('contactsLabel', content.hero?.contactsLabel);
  setText('levelLeft', content.hero?.levelLeft);
  setText('levelRight', content.hero?.levelRight);

  setText('directionsTitle', content.directions?.title);
  setText('directionsRange', directionRange());
  setText('directionsArchiveLink', content.directions?.archiveLink);

  const directionsList = document.getElementById('directionsList');
  if (directionsList) {
    directionsList.innerHTML = '';
    directions.forEach(item => {
      const li = document.createElement('li');
      const number = document.createElement('span');
      number.className = 'num';
      number.textContent = item.number;
      const text = document.createElement('div');
      const title = document.createElement('b');
      title.textContent = item.title;
      const details = document.createElement('small');
      details.textContent = item.details;
      text.append(title, details);
      li.append(number, text);
      directionsList.appendChild(li);
    });
  }

  const tickerTrack = document.getElementById('tickerTrack');
  if (tickerTrack) {
    const tickerText = `${(content.ticker || []).join(' — ')} —`;
    tickerTrack.innerHTML = '';
    for (let i = 0; i < 2; i += 1) {
      const group = document.createElement('div');
      group.className = 'ticker-group';
      group.textContent = tickerText;
      tickerTrack.appendChild(group);
    }
  }

  setText('expertiseNumber', content.expertise?.number);
  setText('expertiseKicker', content.expertise?.kicker);
  setHtml('expertiseTitle', content.expertise?.titleHtml);
  setText('expertiseDescription', content.expertise?.description);
  setText('skillsCode', content.expertise?.skillsCode);
  setText('skillsTitle', content.expertise?.skillsTitle);
  setText('instrumentsCode', content.expertise?.instrumentsCode);
  setText('instrumentsTitle', content.expertise?.instrumentsTitle);

  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) {
    skillsGrid.innerHTML = '';
    (content.expertise?.skills || []).forEach(skill => {
      const article = document.createElement('article');
      const number = document.createElement('span');
      number.textContent = skill.number;
      const title = document.createElement('h3');
      title.textContent = skill.title;
      const text = document.createElement('p');
      text.textContent = skill.text;
      article.append(number, title, text);
      skillsGrid.appendChild(article);
    });
  }

  const instrumentsList = document.getElementById('instrumentsList');
  if (instrumentsList) {
    instrumentsList.innerHTML = '';
    (content.expertise?.instruments || []).forEach(tool => {
      const article = document.createElement('article');
      const number = document.createElement('span');
      number.className = 'tool-no';
      number.textContent = tool.number;
      const titleWrap = document.createElement('div');
      const type = document.createElement('small');
      type.textContent = tool.type;
      const title = document.createElement('h3');
      title.textContent = tool.title;
      titleWrap.append(type, title);
      const text = document.createElement('p');
      text.append(document.createTextNode(tool.text || ''));
      if (tool.accent) {
        text.append(document.createElement('br'));
        const accent = document.createElement('b');
        accent.textContent = tool.accent;
        text.append(accent);
      }
      article.append(number, titleWrap, text);
      instrumentsList.appendChild(article);
    });
  }

  setText('archiveNumber', content.archive?.number);
  setText('archiveKicker', content.archive?.kicker);
  setHtml('archiveTitle', content.archive?.titleHtml);
  setText('archiveDescription', content.archive?.description);

  const contactsGrid = document.getElementById('contactsGrid');
  if (contactsGrid) {
    contactsGrid.innerHTML = '';
    (content.contacts || []).forEach(contact => {
      const a = document.createElement('a');
      a.href = contact.href || '#';
      if (contact.external) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
      const label = document.createElement('small');
      label.textContent = contact.label;
      const value = document.createElement('b');
      value.textContent = contact.value;
      const arrow = document.createElement('i');
      arrow.textContent = '↗';
      a.append(label, value, arrow);
      contactsGrid.appendChild(a);
    });
  }

  setText('footerBrand', content.footer?.brand);
  const footerLinks = document.getElementById('footerLinks');
  if (footerLinks) {
    footerLinks.innerHTML = '';
    const contacts = content.contacts || [];
    const footerDefs = [
      { contact: contacts.find(c => c.key === 'telegram'), text: content.footer?.telegram },
      { contact: contacts.find(c => c.key === 'email'), text: content.footer?.mail },
      { contact: contacts.find(c => c.key === 'phone'), text: content.footer?.phone }
    ];
    footerDefs.forEach(({ contact, text }) => {
      if (!contact || !text) return;
      const a = document.createElement('a');
      a.href = contact.href;
      a.textContent = text;
      if (contact.external) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
      footerLinks.appendChild(a);
    });
    const topLink = document.createElement('a');
    topLink.href = '#top';
    topLink.textContent = content.footer?.top || '↑';
    footerLinks.appendChild(topLink);
  }
}

function createProjectMedia(project) {
  const media = document.createElement('div');
  media.className = 'project-media';

  const label = document.createElement('span');
  label.className = 'project-label';
  label.textContent = project.categoryLabel || categoryLabel(project.category);
  media.appendChild(label);

  const legacyImage = project.image ? [project.image] : [];
  const images = (Array.isArray(project.images) ? project.images : legacyImage)
    .filter(src => typeof src === 'string' && src.trim());

  if (!images.length) {
    media.classList.add('no-image');
    return media;
  }

  const collage = document.createElement('div');
  collage.className = `project-photo-grid layout-${project.photoLayout || 'auto'}`;
  media.appendChild(collage);

  const syncCountClass = () => {
    const count = collage.querySelectorAll('.project-photo').length;
    media.classList.remove('photos-1', 'photos-2', 'photos-3', 'photos-4', 'photos-many');
    media.classList.add(count > 4 ? 'photos-many' : `photos-${Math.max(count, 1)}`);
    if (count === 0) {
      collage.remove();
      media.classList.add('no-image');
    } else {
      media.classList.remove('no-image');
    }
  };

  images.forEach((src, index) => {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'project-photo';
    cell.setAttribute('aria-label', `${content.photoViewer?.open || 'Открыть фото'}: ${project.title}, ${index + 1}`);
    cell.title = content.photoViewer?.open || 'Открыть фото';

    const img = document.createElement('img');
    img.src = src;
    img.alt = `${project.title} — фото ${index + 1}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
      cell.remove();
      syncCountClass();
    });

    cell.addEventListener('click', () => {
      const availableCells = Array.from(collage.querySelectorAll('.project-photo'));
      const availableImages = availableCells
        .map(item => item.querySelector('img')?.getAttribute('src'))
        .filter(Boolean);
      const currentIndex = Math.max(0, availableCells.indexOf(cell));
      openPhotoViewer(project, availableImages, currentIndex, cell);
    });

    cell.appendChild(img);
    collage.appendChild(cell);
  });

  syncCountClass();
  return media;
}

function renderProjects(filter = 'all') {
  if (!grid) return;
  const list = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  grid.innerHTML = '';

  list.forEach(project => {
    const article = document.createElement('article');
    article.className = 'project';
    article.dataset.category = project.category || '';

    const media = createProjectMedia(project);
    const body = document.createElement('div');
    body.className = 'project-body';

    const info = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = project.title || '';
    const details = document.createElement('p');
    details.append(document.createTextNode(project.location || ''));
    if (project.task) {
      details.append(document.createElement('br'));
      details.append(document.createTextNode(project.task));
    }
    info.append(title, details);

    const code = document.createElement('div');
    code.className = 'project-code';
    code.textContent = project.code || '';

    body.append(info, code);
    article.append(media, body);
    grid.appendChild(article);
  });
}

function renderFilters() {
  const row = document.getElementById('filterRow');
  if (!row) return;
  row.innerHTML = '';

  const filters = [
    { category: 'all', title: content.archive?.allFilter || 'Все' },
    ...directions
      .filter(item => item.category)
      .filter((item, index, array) => array.findIndex(other => other.category === item.category) === index)
      .map(item => ({ category: item.category, title: item.title }))
  ];

  filters.forEach((filter, index) => {
    const button = document.createElement('button');
    button.className = `filter${index === 0 ? ' is-active' : ''}`;
    button.type = 'button';
    button.dataset.filter = filter.category;
    button.textContent = filter.title;
    button.addEventListener('click', () => {
      row.querySelectorAll('.filter').forEach(b => b.classList.remove('is-active'));
      button.classList.add('is-active');
      renderProjects(filter.category);
    });
    row.appendChild(button);
  });
}

renderPageContent();
renderFilters();
renderProjects();

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// REV.06 — сетка нитей тахеометра + лазер + красно-зелёное кольцо
(() => {
  // На сенсорных устройствах оставляем стандартный курсор/касания.
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'survey-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = `
    <div class="survey-reticle">
      <span class="reticle-ring"></span>
      <span class="reticle-axis reticle-axis-h"></span>
      <span class="reticle-axis reticle-axis-v"></span>
      <span class="reticle-ticks reticle-ticks-h"></span>
      <span class="reticle-ticks reticle-ticks-v"></span>
      <span class="reticle-center"></span>
    </div>
    <span class="survey-status-ring"></span>
    <span class="laser-dot"></span>
    <span class="laser-wave"></span>
  `;
  document.body.appendChild(cursor);
  document.documentElement.classList.add('has-survey-cursor');

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let targetX = x;
  let targetY = y;
  let rafId = null;
  let laserTimer = null;
  let ringTimer = null;

  const render = () => {
    x += (targetX - x) * 0.72;
    y += (targetY - y) * 0.72;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    rafId = requestAnimationFrame(render);
  };

  const start = () => {
    if (!rafId) rafId = requestAnimationFrame(render);
  };

  document.addEventListener('mousemove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    cursor.classList.add('is-visible');
    start();
  }, { passive: true });

  document.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
  document.addEventListener('mouseenter', () => cursor.classList.add('is-visible'));

  const flashLaser = () => {
    clearTimeout(laserTimer);
    cursor.classList.remove('laser-active');
    void cursor.offsetWidth;
    cursor.classList.add('laser-active');
    laserTimer = setTimeout(() => cursor.classList.remove('laser-active'), 360);
  };

  const flashStatusRing = () => {
    clearTimeout(ringTimer);
    cursor.classList.remove('ring-active');
    void cursor.offsetWidth;
    cursor.classList.add('ring-active');
    ringTimer = setTimeout(() => cursor.classList.remove('ring-active'), 760);
  };

  // Левая кнопка: короткая красная лазерная вспышка.
  // Правая кнопка: сразу при нажатии моргает двухцветное кольцо.
  document.addEventListener('mousedown', (event) => {
    if (event.button === 0) flashLaser();
    if (event.button === 2) flashStatusRing();
  });

  // Контекстное меню отключаем, чтобы правый клик оставался частью интерфейса сайта.
  document.addEventListener('contextmenu', (event) => event.preventDefault());

  const interactiveSelector = 'a, button, input, textarea, select, [role="button"]';
  document.addEventListener('mouseover', (event) => {
    cursor.classList.toggle('over-control', Boolean(event.target.closest(interactiveSelector)));
  });

  window.addEventListener('blur', () => cursor.classList.remove('is-visible'));
})();
