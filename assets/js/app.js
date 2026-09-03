/* =============================================================
   Cuaderno de Guardia — motor del sitio
   Sin build: carga ficheros .md de /contenido y los renderiza.
   ============================================================= */
(() => {
  'use strict';

  const CONTENT_DIR = 'contenido';
  const DEFAULT_PAGE = 'inicio';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const el = {
    doc:     $('#doc'),
    nav:     $('#nav'),
    toc:     $('#toc'),
    crumbs:  $('#crumbs'),
    pager:   $('#pager'),
    search:  $('#search'),
    results: $('#searchResults'),
    sidebar: $('#sidebar'),
    scrim:   $('#scrim'),
    toTop:   $('#toTop'),
    ghLink:  $('#ghLink'),
  };

  /** Estado global */
  const state = {
    titulo: 'Apuntes',
    nav: [],        // grupos del menú
    flat: [],       // páginas en orden lineal (para prev/next)
    index: null,    // índice de búsqueda (perezoso)
    indexing: null, // promesa en curso
    cache: new Map(),
  };

  /* ---------------------------------------------------------
     Utilidades
     --------------------------------------------------------- */

  const slug = (str) =>
    str.toLowerCase()
       .normalize('NFD').replace(/[̀-ͯ]/g, '')
       .replace(/[^a-z0-9\s-]/g, '')
       .trim().replace(/\s+/g, '-');

  const esc = (s) => s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const norm = (s) =>
    s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  /** Separa el frontmatter YAML sencillo del cuerpo Markdown. */
  function parseFrontmatter(raw) {
    const meta = {};
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!m) return { meta, body: raw };
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^\s*([\w-]+)\s*:\s*(.*)$/);
      if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
    }
    return { meta, body: raw.slice(m[0].length) };
  }

  /* ---------------------------------------------------------
     Tema
     --------------------------------------------------------- */

  const setTheme = (t) => {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('apuntes-tema', t); } catch (_) {}
  };

  (function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem('apuntes-tema'); } catch (_) {}
    if (!saved) saved = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    setTheme(saved);
  })();

  $('#themeToggle').addEventListener('click', () => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  /* ---------------------------------------------------------
     Menú lateral
     --------------------------------------------------------- */

  async function loadNav() {
    const res = await fetch(`${CONTENT_DIR}/nav.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error('No se pudo cargar nav.json');
    const data = await res.json();

    state.nav = data.grupos || [];
    state.flat = state.nav.flatMap((g) =>
      g.paginas.map((p) => ({ ...p, grupo: g.titulo })));

    if (data.repo) {
      el.ghLink.href = data.repo;
      el.ghLink.hidden = false;
    }
    if (data.titulo) {
      state.titulo = data.titulo;
      $('.brand-text').textContent = data.titulo;
      document.title = data.titulo;
    }

    el.nav.innerHTML = state.nav.map((g) => {
      const id = slug(g.titulo);
      return `
      <div class="nav-group" data-grupo="${id}">
        <button type="button" class="nav-label" aria-expanded="true" aria-controls="grupo-${id}">
          <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          <span class="nav-label-txt">${esc(g.titulo)}</span>
          <span class="nav-rule" aria-hidden="true"></span>
          ${g.contador === false ? "" : `<span class="nav-count">${g.paginas.length}</span>`}
        </button>
        <div class="nav-items" id="grupo-${id}"><div>
          ${g.paginas.map((p) => `
            <a href="#/${p.ruta}" data-ruta="${p.ruta}">
              <span class="nav-ico" aria-hidden="true">${p.icono || '•'}</span>
              <span>${esc(p.titulo)}</span>
            </a>`).join('')}
        </div></div>
      </div>`;
    }).join('');

    // Estado inicial sin animación, para que no "salte" al cargar.
    const estado = leerEstadoMenu();
    el.nav.classList.add('sin-transicion');
    $$('.nav-group', el.nav).forEach((grupo) => {
      plegarGrupo(grupo, estado[grupo.dataset.grupo] !== false, false);
      grupo.querySelector('.nav-label').addEventListener('click', () => {
        plegarGrupo(grupo, grupo.classList.contains('cerrado'));
      });
    });
    requestAnimationFrame(() => el.nav.classList.remove('sin-transicion'));
  }

  /* --- Apartados desplegables del menú --- */

  function leerEstadoMenu() {
    try { return JSON.parse(localStorage.getItem('apuntes-menu') || '{}'); }
    catch (_) { return {}; }
  }

  function plegarGrupo(grupo, abierto, persistir = true) {
    if (!grupo) return;
    grupo.classList.toggle('cerrado', !abierto);
    grupo.querySelector('.nav-label').setAttribute('aria-expanded', String(abierto));
    // `inert` evita que el tabulador entre en un apartado plegado.
    grupo.querySelector('.nav-items').inert = !abierto;
    if (!persistir) return;
    try {
      const estado = leerEstadoMenu();
      estado[grupo.dataset.grupo] = abierto;
      localStorage.setItem('apuntes-menu', JSON.stringify(estado));
    } catch (_) {}
  }

  function markActive(ruta) {
    $$('#nav a').forEach((a) => a.classList.toggle('active', a.dataset.ruta === ruta));
    // El apartado de la página actual se abre siempre, aunque estuviera plegado.
    const activo = $('#nav a.active');
    if (activo) plegarGrupo(activo.closest('.nav-group'), true);
  }

  /* ---------------------------------------------------------
     Post-proceso del HTML renderizado
     --------------------------------------------------------- */

  /** Avisos estilo GitHub: > [!NOTE] / [!TIP] / [!WARNING] / [!CAUTION] / [!IMPORTANT] / [!DESCARGO] */
  const CALLOUTS = {
    NOTE:      { cls: 'note',    label: 'Nota',     ico: 'ℹ️' },
    TIP:       { cls: 'tip',     label: 'Truco',    ico: '💡' },
    WARNING:   { cls: 'warning', label: 'Cuidado',  ico: '⚠️' },
    DESCARGO:  { cls: 'warning', label: 'Descargo de responsabilidad', ico: '⚠️' },
    CAUTION:   { cls: 'danger',  label: 'Atención', ico: '🛑' },
    IMPORTANT: { cls: 'info',    label: 'Importante', ico: '📌' },
  };

  function transformCallouts(root) {
    $$('blockquote', root).forEach((bq) => {
      const first = bq.firstElementChild;
      if (!first) return;
      const m = first.textContent.match(/^\[!(\w+)\]\s*/);
      if (!m) return;
      const conf = CALLOUTS[m[1].toUpperCase()];
      if (!conf) return;

      first.innerHTML = first.innerHTML.replace(/^\s*\[!\w+\]\s*(<br\s*\/?>)?\s*/i, '');
      const box = document.createElement('div');
      box.className = `callout ${conf.cls}`;
      box.innerHTML = `<p class="callout-title"><span aria-hidden="true">${conf.ico}</span>${conf.label}</p>`;
      while (bq.firstChild) box.appendChild(bq.firstChild);
      if (!first.textContent.trim()) first.remove();
      bq.replaceWith(box);
    });
  }

  /** Envuelve tablas para que hagan scroll horizontal en móvil. */
  function wrapTables(root) {
    $$('table', root).forEach((t) => {
      const w = document.createElement('div');
      w.className = 'table-wrap';
      t.replaceWith(w);
      w.appendChild(t);
    });
  }

  /** Botón de copiar en cada bloque de código. */
  function addCopyButtons(root) {
    $$('pre', root).forEach((pre) => {
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.textContent = 'copiar';
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(pre.querySelector('code')?.innerText ?? pre.innerText);
          btn.textContent = 'copiado';
        } catch (_) {
          btn.textContent = 'error';
        }
        setTimeout(() => { btn.textContent = 'copiar'; }, 1600);
      });
      pre.appendChild(btn);
    });
  }

  /** Ids + ancla de enlace permanente en los títulos. */
  function addHeadingAnchors(root) {
    const seen = new Set();
    $$('h2, h3', root).forEach((h) => {
      let id = h.id || slug(h.textContent);
      let n = 2;
      while (seen.has(id)) id = `${slug(h.textContent)}-${n++}`;
      seen.add(id);
      h.id = id;
      const a = document.createElement('a');
      a.className = 'anchor';
      a.href = `${location.hash.split('#').slice(0, 2).join('#')}#${id}`;
      a.textContent = '#';
      a.setAttribute('aria-label', 'Enlace a esta sección');
      h.appendChild(a);
    });
  }

  /** Enlaces externos: nueva pestaña. */
  function externalLinks(root) {
    $$('a[href^="http"]', root).forEach((a) => {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
  }

  /**
   * Convierte cada bloque `### Titulo` en una tarjeta de herramienta.
   * La primera línea de la ficha, si sólo contiene `código` y enlaces,
   * se transforma en etiquetas (gratis / pago / enlace).
   */
  function buildToolCards(root) {
    const cards = [];
    let current = null;

    [...root.children].forEach((node) => {
      if (node.tagName === 'H3') {
        current = { head: node, body: [] };
        cards.push(current);
      } else if (current && /^(H1|H2)$/.test(node.tagName)) {
        current = null;
      } else if (current) {
        current.body.push(node);
      }
    });

    cards.forEach(({ head, body }) => {
      const card = document.createElement('div');
      card.className = 'tool-card';
      head.replaceWith(card);
      card.appendChild(head);
      body.forEach((n) => card.appendChild(n));

      const meta = card.querySelector('h3 + p');
      if (!meta) return;
      const kids = [...meta.childNodes].filter(
        (n) => !(n.nodeType === 3 && !n.textContent.trim().replace(/[·|,]/g, '')));
      const onlyTags = kids.length && kids.every(
        (n) => n.nodeType === 1 && (n.tagName === 'CODE' || n.tagName === 'A'));
      if (!onlyTags) return;

      meta.className = 'tool-meta';
      kids.forEach((n) => {
        if (n.tagName === 'CODE') {
          const span = document.createElement('span');
          const t = norm(n.textContent);
          span.className = 'tag' +
            (/gratis|free|libre|open|abierto/.test(t) ? ' free' : '') +
            (/pago|paid|comercial|freemium|licencia/.test(t) ? ' paid' : '');
          span.textContent = n.textContent;
          n.replaceWith(span);
        } else {
          n.classList.add('tag', 'link');
        }
      });
      [...meta.childNodes].forEach((n) => { if (n.nodeType === 3) n.remove(); });
    });
  }

  /* ---------------------------------------------------------
     Tabla de contenidos + scrollspy
     --------------------------------------------------------- */

  function buildToc() {
    const heads = $$('#doc h2, #doc h3');
    if (heads.length < 2) { el.toc.innerHTML = ''; return; }

    el.toc.innerHTML = `<p class="toc-title">En esta página</p>` +
      heads.map((h) => {
        const text = h.textContent.replace(/#$/, '').trim();
        return `<a href="#${h.id}" class="lvl-${h.tagName[1]}" data-id="${h.id}">${esc(text)}</a>`;
      }).join('');

    $$('#toc a').forEach((a) => a.addEventListener('click', (ev) => {
      ev.preventDefault();
      document.getElementById(a.dataset.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `${location.hash.split('#').slice(0, 2).join('#')}#${a.dataset.id}`);
    }));

    spy(heads);
  }

  let observer = null;
  function spy(heads) {
    observer?.disconnect();
    const links = new Map($$('#toc a').map((a) => [a.dataset.id, a]));
    const visible = new Set();

    observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id));
      const first = heads.find((h) => visible.has(h.id));
      links.forEach((a) => a.classList.remove('active'));
      if (first) links.get(first.id)?.classList.add('active');
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });

    heads.forEach((h) => observer.observe(h));
  }

  /* ---------------------------------------------------------
     Router
     --------------------------------------------------------- */

  const rutaActual = () => {
    const raw = location.hash.replace(/^#\/?/, '');
    const [ruta] = raw.split('#');
    return ruta || DEFAULT_PAGE;
  };

  async function fetchDoc(ruta) {
    if (state.cache.has(ruta)) return state.cache.get(ruta);
    const res = await fetch(`${CONTENT_DIR}/${ruta}.md`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`404 · ${ruta}.md`);
    const parsed = parseFrontmatter(await res.text());
    state.cache.set(ruta, parsed);
    return parsed;
  }

  function renderCrumbs(ruta) {
    const page = state.flat.find((p) => p.ruta === ruta);
    // En la portada las migas sobran: dirían "Inicio / Empezar aquí / Inicio".
    if (!page || ruta === DEFAULT_PAGE) { el.crumbs.innerHTML = ''; return; }
    el.crumbs.innerHTML = `<div class="crumbs">
      <a href="#/${DEFAULT_PAGE}">Inicio</a>
      <span class="sep">/</span><span>${esc(page.grupo)}</span>
      <span class="sep">/</span><span>${esc(page.titulo)}</span>
    </div>`;
  }

  function renderPager(ruta) {
    const i = state.flat.findIndex((p) => p.ruta === ruta);
    if (i < 0) { el.pager.innerHTML = ''; return; }
    const prev = state.flat[i - 1];
    const next = state.flat[i + 1];
    el.pager.innerHTML =
      (prev ? `<a class="prev" href="#/${prev.ruta}"><small>← Anterior</small><b>${esc(prev.titulo)}</b></a>` : '<span></span>') +
      (next ? `<a class="next" href="#/${next.ruta}"><small>Siguiente →</small><b>${esc(next.titulo)}</b></a>` : '<span></span>');
  }

  async function router() {
    const raw = location.hash.replace(/^#\/?/, '');
    const ruta = rutaActual();
    const frag = raw.split('#')[1];

    markActive(ruta);
    closeNav();
    el.doc.innerHTML = '<div class="loader">Cargando…</div>';

    let parsed;
    try {
      parsed = await fetchDoc(ruta);
    } catch (err) {
      el.doc.innerHTML = `
        <h1>Página no encontrada</h1>
        <p class="subtitle">No existe <code>${esc(ruta)}.md</code> dentro de <code>${CONTENT_DIR}/</code>.</p>
        <p>Puede que el enlace esté mal escrito o que esa nota aún esté por escribir.
           Vuelve al <a href="#/${DEFAULT_PAGE}">índice</a> o usa el buscador de arriba.</p>`;
      el.toc.innerHTML = ''; el.pager.innerHTML = ''; el.crumbs.innerHTML = '';
      document.title = `No encontrado · ${state.titulo}`;
      return;
    }

    const { meta, body } = parsed;
    el.doc.innerHTML = marked.parse(body);

    // Subtítulo: primer párrafo si el frontmatter lo pide.
    if (meta.subtitulo) {
      const p = el.doc.querySelector('h1 + p');
      if (p) p.classList.add('subtitle');
    }

    if (meta.tarjetas === 'true' || meta.tarjetas === 'si') buildToolCards(el.doc);
    transformCallouts(el.doc);
    wrapTables(el.doc);
    addHeadingAnchors(el.doc);
    addCopyButtons(el.doc);
    externalLinks(el.doc);

    renderCrumbs(ruta);
    renderPager(ruta);
    buildToc();

    const page = state.flat.find((p) => p.ruta === ruta);
    document.title = `${page ? page.titulo : meta.titulo || 'Apuntes'} · ${state.titulo}`;

    if (frag) {
      setTimeout(() => document.getElementById(frag)?.scrollIntoView({ block: 'start' }), 40);
    } else {
      window.scrollTo({ top: 0 });
    }
  }

  /* ---------------------------------------------------------
     Búsqueda
     --------------------------------------------------------- */

  async function buildIndex() {
    if (state.index) return state.index;
    if (state.indexing) return state.indexing;

    state.indexing = Promise.all(state.flat.map(async (p) => {
      let body = '';
      try { body = (await fetchDoc(p.ruta)).body; } catch (_) {}
      const secciones = [];
      let actual = { titulo: p.titulo, id: '', texto: '' };

      for (const line of body.split(/\r?\n/)) {
        const h = line.match(/^(#{2,3})\s+(.*)$/);
        if (h) {
          if (actual.texto.trim()) secciones.push(actual);
          const t = h[2].replace(/[*`]/g, '').trim();
          actual = { titulo: t, id: slug(t), texto: '' };
        } else {
          // Se quitan las etiquetas HTML embebidas (tarjetas de portada) para
          // que no ensucien los fragmentos de resultado.
          actual.texto += line
            .replace(/<[^>]*>/g, ' ')
            .replace(/^[#>\-*\s]+/, '')
            .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
            .replace(/[*_`|]/g, '') + ' ';
        }
      }
      if (actual.texto.trim()) secciones.push(actual);

      return secciones.map((s) => ({
        ruta: p.ruta,
        pagina: p.titulo,
        grupo: p.grupo,
        titulo: s.titulo,
        id: s.id,
        texto: s.texto.replace(/\s+/g, ' ').trim(),
        n_titulo: norm(s.titulo),
        n_texto: norm(s.texto),
      }));
    })).then((all) => {
      state.index = all.flat();
      return state.index;
    });

    return state.indexing;
  }

  function buscar(q, idx) {
    const n = norm(q.trim());
    if (n.length < 2) return [];
    const terms = n.split(/\s+/);

    return idx.map((s) => {
      let score = 0;
      for (const t of terms) {
        if (s.n_titulo === t) score += 60;
        else if (s.n_titulo.startsWith(t)) score += 40;
        else if (s.n_titulo.includes(t)) score += 25;
        if (norm(s.pagina).includes(t)) score += 6;
        const hits = s.n_texto.split(t).length - 1;
        if (hits) score += Math.min(hits, 5) * 3;
      }
      return { s, score };
    })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((r) => r.s);
  }

  function snippet(texto, q) {
    const n = norm(texto);
    const t = norm(q.trim().split(/\s+/)[0]);
    const i = n.indexOf(t);
    if (i < 0) return esc(texto.slice(0, 130));
    const from = Math.max(0, i - 45);
    const cut = texto.slice(from, from + 150);
    return (from ? '…' : '') + esc(cut).replace(
      new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark>$1</mark>');
  }

  function pintarResultados(q, res) {
    if (!q.trim()) { el.results.hidden = true; return; }
    el.results.hidden = false;
    if (!res.length) {
      el.results.innerHTML = `<p class="sr-empty">Sin resultados para <b>${esc(q)}</b></p>`;
      return;
    }
    el.results.innerHTML = res.map((s, i) => `
      <a class="sr-item${i === 0 ? ' is-active' : ''}" href="#/${s.ruta}${s.id ? '#' + s.id : ''}">
        <span class="sr-crumb">${esc(s.grupo)} · ${esc(s.pagina)}</span>
        <span class="sr-title">${esc(s.titulo)}</span>
        <span class="sr-snip">${snippet(s.texto, q)}</span>
      </a>`).join('');
  }

  let tmr = null;
  el.search.addEventListener('input', () => {
    clearTimeout(tmr);
    const q = el.search.value;
    if (!q.trim()) { el.results.hidden = true; return; }
    tmr = setTimeout(async () => {
      el.results.hidden = false;
      el.results.innerHTML = '<p class="sr-empty">Buscando…</p>';
      const idx = await buildIndex();
      pintarResultados(q, buscar(q, idx));
    }, 130);
  });

  el.search.addEventListener('focus', () => { buildIndex(); });

  el.search.addEventListener('keydown', (ev) => {
    const items = $$('.sr-item', el.results);
    const i = items.findIndex((a) => a.classList.contains('is-active'));

    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      ev.preventDefault();
      if (!items.length) return;
      const next = ev.key === 'ArrowDown'
        ? Math.min(i + 1, items.length - 1)
        : Math.max(i - 1, 0);
      items.forEach((a) => a.classList.remove('is-active'));
      items[next].classList.add('is-active');
      items[next].scrollIntoView({ block: 'nearest' });
    } else if (ev.key === 'Enter') {
      if (items[i < 0 ? 0 : i]) {
        ev.preventDefault();
        location.hash = items[i < 0 ? 0 : i].getAttribute('href');
        cerrarBusqueda();
      }
    } else if (ev.key === 'Escape') {
      cerrarBusqueda();
    }
  });

  function cerrarBusqueda() {
    el.results.hidden = true;
    el.search.value = '';
    el.search.blur();
  }

  document.addEventListener('click', (ev) => {
    if (!ev.target.closest('.search-wrap')) el.results.hidden = true;
    if (ev.target.closest('.sr-item')) cerrarBusqueda();
  });

  document.addEventListener('keydown', (ev) => {
    const escribiendo = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
    if (ev.key === '/' && !escribiendo) { ev.preventDefault(); el.search.focus(); }
    if (ev.key === 'k' && (ev.ctrlKey || ev.metaKey)) { ev.preventDefault(); el.search.focus(); }
    if (ev.key === 'Escape') { el.results.hidden = true; closeNav(); }
  });

  /* ---------------------------------------------------------
     Menú móvil, volver arriba
     --------------------------------------------------------- */

  const navToggle = $('#navToggle');
  function openNav() {
    el.sidebar.classList.add('open');
    el.scrim.hidden = false;
    navToggle.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    el.sidebar.classList.remove('open');
    el.scrim.hidden = true;
    navToggle.setAttribute('aria-expanded', 'false');
  }
  navToggle.addEventListener('click', () =>
    el.sidebar.classList.contains('open') ? closeNav() : openNav());
  el.scrim.addEventListener('click', closeNav);

  el.toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  addEventListener('scroll', () => { el.toTop.hidden = scrollY < 500; }, { passive: true });

  /* ---------------------------------------------------------
     Arranque
     --------------------------------------------------------- */

  marked.setOptions({ gfm: true, breaks: false });

  addEventListener('hashchange', router);

  loadNav()
    .then(() => {
      if (!location.hash) location.replace(`#/${DEFAULT_PAGE}`);
      return router();
    })
    .catch((err) => {
      el.doc.innerHTML = `
        <h1>No se pudo arrancar el sitio</h1>
        <p class="subtitle">${esc(err.message)}</p>
        <p>Si estás abriendo <code>index.html</code> con doble clic, el navegador bloquea la carga
           de los ficheros Markdown (política <code>file://</code>). Levanta un servidor local:</p>
        <pre><code>npx serve .</code></pre>
        <p>y abre <code>http://localhost:3000</code>.</p>`;
    });
})();
