/* FL Indumentaria · bloque 13 · CYBER MONDAY 2, 3 y 4 de noviembre de 2026 (opción 1: negro arriba, prendas en crema).
   Lo carga el cargador del pie (cargador-b13.html) SOLO del lun 2-nov 00:00 al jue 5-nov 00:00 (Argentina) o con ?flcyber.
   El cargador ya dejó puestos, antes de que se pinte la página, la clase «cy» en <html> (de ella cuelgan las reglas del
   CSS avanzado) y los colores del encabezado. El CSS reserva con :before/:after del carrusel el lugar del banner y del
   reloj; acá se ponen los de verdad (.cy-hero adentro del carrusel, #cy-reloj debajo) y, en el mismo momento, «cy-ok»
   en <html> saca la reserva: misma altura, nada salta.
   Además: la letra mono, los números del reloj, los mensajes de la barra de arriba, la cinta cruzada y «CYBER MONDAY» en
   la barra de categorías de la compu. Los precios por transferencia y las cucardas los pinta el sello (FLP v1.0.11).
   Lo que agrega lleva data-flp="cy": el sello (FLP) mira todo el body y así no recorre la página de nuevo por esto.
   El reloj cambia SOLO el texto de los números (nodeValue), nunca el HTML. ES5. */
(function (w, d) {
  if (w.FLB13) return;
  var F = w.FLB13 = { v: '1.1.0', err: [] };     // 1.1.0 (30-oct): ENVÍO GRATIS para todos en el Cyber (tarjetas y ficha)
  var INICIO = Date.UTC(2026, 10, 2, 3), FIN = Date.UTC(2026, 10, 5, 3);     // lun 2-nov 00:00 → jue 5-nov 00:00 (AR)
  var BARRA = ['Cyber Monday · 2, 3 y 4 de noviembre', 'Hasta 30% OFF por transferencia',
    'Envío gratis a todo el país', '3 y 6 cuotas sin interés'];   // en el Cyber el envío es gratis en TODA la web
  var CINTA_NEGRA = ['Cyber Monday', 'Hasta 30% OFF', 'Abonando por transferencia'];
  var CINTA_ROJA = ['Envío gratis a todo el país', '2, 3 y 4 de noviembre', '3 y 6 cuotas sin interés'];
  var IR = '/productos/';
  // los GIF del banner están al lado de este archivo, en el mismo commit de jsDelivr
  var cs0 = d.currentScript, AQUI = (cs0 && cs0.src ? cs0.src : '').replace(/[^\/]*$/, '');

  // ?flcyberhora=2026-11-04T15:47 finge la hora (solo para probar el reloj)
  var mh = /[?&]flcyberhora=([^&#]+)/.exec(location.search), DESFASE = 0;
  if (mh) { var fh = Date.parse(decodeURIComponent(mh[1]) + (/[zZ]|[+-]\d\d:?\d\d$/.test(mh[1]) ? '' : '-03:00')); if (!isNaN(fh)) DESFASE = fh - new Date().getTime(); }
  function ahora() { return new Date().getTime() + DESFASE; }
  function anotar(e) { if (F.err.length < 10) F.err.push(String(e)); }
  function dos(n) { return (n < 10 ? '0' : '') + n; }

  function letra() {
    if (d.getElementById('cy-mono')) return;
    var l = d.createElement('link'); l.id = 'cy-mono'; l.rel = 'stylesheet'; l.setAttribute('data-flp', 'cy');
    l.href = 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;700&display=swap';
    (d.head || d.documentElement).appendChild(l);
  }

  /* ---------- inicio: banner + reloj en el lugar reservado por el CSS ---------- */
  function inicio() {
    var x = d.querySelector('section.section-slider-home');
    if (!x || !AQUI) return;
    if (!x.querySelector('.cy-hero')) {
      x.insertAdjacentHTML('beforeend', '<a class="cy-hero" data-flp="cy" href="' + IR + '"><picture>' +
        '<source media="(min-width:768px)" srcset="' + AQUI + 'cyber-compu.gif">' +
        '<img src="' + AQUI + 'cyber-celu.gif" width="800" height="1000" fetchpriority="high" ' +
        'alt="Cyber Monday: hasta 30% OFF abonando por transferencia y envío gratis a todo el país"></picture></a>');
      x.querySelector('.cy-hero').onclick = function () { marcar('banner'); };
    }
    if (!d.getElementById('cy-reloj')) x.insertAdjacentHTML('afterend', '<section id="cy-reloj" data-flp="cy"></section>');
    reloj();
    d.documentElement.classList.add('cy-ok');
  }

  /* ---------- reloj ---------- */
  var nums = null;
  function reloj() {
    var r = d.getElementById('cy-reloj');
    if (!r) return;
    if (!r.getAttribute('data-cy')) {
      r.setAttribute('data-cy', '1');
      var u = function (k, t) { return '<span class="u"><b data-u="' + k + '">00</b><small>' + t + '</small></span>'; };
      var dp = '<span class="dp">:</span>';
      r.innerHTML = '<a href="' + IR + '" data-flp="cy"><span class="et"><i class="cy-sq"></i><span class="t">CYBER MONDAY · TERMINA EN</span></span>' +
        '<span class="caja"><i class="q q1"></i><i class="q q2"></i><i class="q q3"></i><i class="q q4"></i>' +
        u('d', 'DÍAS') + dp + u('h', 'HORAS') + dp + u('m', 'MIN') + dp + u('s', 'SEG') + '</span>' +
        '<span class="pie" style="display:block">Hasta el <b>miércoles 4 a las 23:59</b> · precios ya rebajados</span></a>';
      nums = r.querySelectorAll('b[data-u]');
      r.querySelector('a').onclick = function () { marcar('reloj'); };
    }
    var ya = ahora(), antes = ya < INICIO, hasta = antes ? INICIO : FIN;
    var q = Math.max(0, Math.floor((hasta - ya) / 1000));
    var v = { d: Math.floor(q / 86400), h: Math.floor(q % 86400 / 3600), m: Math.floor(q % 3600 / 60), s: q % 60 };
    for (var i = 0; i < nums.length; i++) {
      var b = nums[i], t = dos(v[b.getAttribute('data-u')]);
      if (b.firstChild.nodeValue !== t) b.firstChild.nodeValue = t;
    }
    var et = r.querySelector('.et .t'), pie = r.querySelector('.pie');
    var titulo = antes ? 'CYBER MONDAY · EMPIEZA EN' : (q < 86400 ? 'CYBER MONDAY · ÚLTIMO DÍA' : 'CYBER MONDAY · TERMINA EN');
    if (et.firstChild.nodeValue !== titulo) et.firstChild.nodeValue = titulo;
    var p = antes ? 'Arranca el <b>lunes 2 a las 00:00</b>' : 'Hasta el <b>miércoles 4 a las 23:59</b> · precios ya rebajados';
    if (pie.getAttribute('data-p') !== p) { pie.setAttribute('data-p', p); pie.innerHTML = p; }
  }

  /* ---------- barra de arriba: los 4 mensajes del Cyber (el bloque 1 ya no los toca: data-flba) ---------- */
  function barra() {
    var cs = d.querySelectorAll('.js-adbar .js-adbar-text-container');
    for (var i = 0; i < cs.length; i++) {
      var c = cs[i];
      if (c.getAttribute('data-cy')) continue;
      var ms = c.querySelectorAll('.adbar-message');
      if (!ms.length) continue;
      c.setAttribute('data-cy', '1');
      for (var k = 0; k < Math.max(ms.length, BARRA.length); k++) {
        var m = ms[k];
        if (k >= BARRA.length) { m.parentNode.removeChild(m); continue; }
        if (!m) { m = ms[0].cloneNode(false); c.appendChild(m); }
        m.textContent = BARRA[k];
        m.setAttribute('data-flba', 'cy'); m.setAttribute('data-flp', 'cy');
      }
    }
    if (cs.length) velocidad();
  }
  // igual que el tema (y que el bloque 1): 5 s cada 300 px de cinta; +20 s en compu si da menos de 40
  function velocidad() {
    var an = d.querySelector('.js-adbar-animated'), c = d.querySelector('.js-adbar-text-container');
    if (!an || !c || !/marquee/.test(an.style.animation)) return;
    var s = 5 * c.offsetWidth / 300;
    if (w.innerWidth > 768 && s < 40) s += 20;
    if (Math.abs(parseFloat(an.style.animationDuration) - s) > .5) an.style.animationDuration = s + 's';
  }

  /* ---------- cinta cruzada del inicio (la arma Tag Manager): 4 vueltas iguales, como la original ---------- */
  function tira(l) { var u = ''; for (var i = 0; i < l.length; i++) u += '<span>' + l[i] + '</span><em>■</em>'; return u + u + u + u; }
  function cinta() {
    var c = d.getElementById('flcinta');
    if (!c || c.getAttribute('data-cy')) return !!c;
    var t1 = c.querySelector('.t1 .r'), t2 = c.querySelector('.t2 .r');
    if (!t1 || !t2) return false;
    c.setAttribute('data-cy', '1');
    t1.innerHTML = tira(CINTA_NEGRA); t2.innerHTML = tira(CINTA_ROJA);
    var ts = c.querySelectorAll('.t');
    for (var i = 0; i < ts.length; i++) ts[i].onclick = function () { marcar('cinta'); location.href = IR; };
    return true;
  }

  /* ---------- compu: «■ CYBER MONDAY» primero en la barra de categorías (la arma el bloque 1) ---------- */
  function categorias() {
    var b = d.getElementById('flb1cat');
    if (!b) return false;
    if (b.querySelector('.cy-m')) return true;
    var a0 = b.querySelector('a[href]');
    if (!a0) return false;
    var a = a0.cloneNode(false);
    a.className = (a0.className || '').replace(/(^|\s)ws(\s|$)/g, ' ') + ' cy-m'; a.href = IR; a.removeAttribute('target');
    a.setAttribute('data-flp', 'cy');
    a.innerHTML = '<i class="cy-sq"></i>CYBER MONDAY';
    a.onclick = function () { marcar('categorias'); };
    a0.parentNode.insertBefore(a, a0);
    return true;
  }

  /* ---------- ENVÍO GRATIS (en el Cyber es para toda la web) ----------
     Tarjetas (opción B, elegida el 30-oct): bloque negro con «ENVÍO GRATIS» en rojo debajo del precio por transferencia.
     Lo dibuja el CSS avanzado (:after del precio, sale junto con él y no salta nada); acá solo se le pone el camión de
     fondo. Ficha: el renglón gris del tema (.js-free-shipping-message) pasa a ser el bloque negro como el del banner; su
     alto ya lo reserva el CSS avanzado y acá se pone adentro el camión y los textos. */
  var CAMION_SVG = '<svg viewBox="0 0 64 40" width="44" height="28" fill="none" stroke="#F2EDE4" stroke-width="3.6" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M3 6h36v24H3zM39 14h12l9 9v7H39z"/><circle cx="14" cy="31" r="5" fill="#E3311D" stroke="#E3311D"/>' +
    '<circle cx="48" cy="31" r="5" fill="#E3311D" stroke="#E3311D"/></svg>';
  var CAMION_URL = 'url("data:image/svg+xml,' + encodeURIComponent(CAMION_SVG.replace(' width="44" height="28"', ' xmlns="http://www.w3.org/2000/svg"')) + '")';
  function estilos() {
    if (d.getElementById('cy-css')) return;
    var s = d.createElement('style'); s.id = 'cy-css'; s.setAttribute('data-flp', 'cy');
    s.textContent = 'html.cy .js-item-product .js-item-price-container:after{background-image:' + CAMION_URL + '}' +
      'html.cy .cy-egf-caja{display:flex;align-items:center;min-height:66px;margin:12px 0 18px;padding:11px 12px;box-sizing:border-box;' +
      'background:#0B0B0B;box-shadow:inset 0 3px 0 #E3311D}';
    (d.head || d.documentElement).appendChild(s);
  }
  var ENVIO_FICHA = '<span class="cy-egf" data-flp="cy">' + CAMION_SVG + '<span class="tx"><span class="g">ENVÍO GRATIS</span>' +
    '<span class="c">A todo el país · <b>hasta el miércoles 4</b></span></span></span>';
  function envioFicha() {
    if (!w.LS || !w.LS.product) return;
    if (d.querySelector('.cy-egf')) return;
    var m = d.querySelector('.free-shipping-message.js-free-shipping-message');   // el renglón de abajo del precio (hay otro en el formulario)
    if (m) { m.insertAdjacentHTML('beforeend', ENVIO_FICHA); return; }
    var h = d.querySelector('[data-flp="precios-ficha"]');                 // si el tema no trae el renglón: debajo del precio
    if (h) h.insertAdjacentHTML('afterend', '<div class="cy-egf-caja" data-flp="cy">' + ENVIO_FICHA + '</div>');
  }

  function marcar(donde) { try { if (w.gtag) w.gtag('event', 'flb13_' + donde); } catch (e) { anotar(e); } }

  function pasar() {
    try { reloj(); } catch (e1) { anotar(e1); }
    try { envioFicha(); } catch (e6) { anotar(e6); }
    try { barra(); } catch (e2) { anotar(e2); }
    var listo = true;
    try { if (!cinta() && d.querySelector('.section-slider-home')) listo = false; } catch (e3) { anotar(e3); }
    try { if (!categorias() && w.innerWidth >= 768) listo = false; } catch (e4) { anotar(e4); }
    return listo;
  }

  try { letra(); } catch (e0) { anotar(e0); }
  try { estilos(); } catch (e7) { anotar(e7); }
  try { inicio(); } catch (e5) { anotar(e5); d.documentElement.classList.add('cy-ok'); }
  // la cinta (Tag Manager) y la barra de categorías (bloque 1) llegan después: se miran los cambios hasta 20 s
  var t = 0, obs = null;
  if (!pasar() && w.MutationObserver && d.body) {
    obs = new MutationObserver(function () {
      if (t) return;
      t = setTimeout(function () { t = 0; if (pasar() && obs) { obs.disconnect(); obs = null; } }, 80);
    });
    obs.observe(d.body, { childList: true, subtree: true });
    setTimeout(function () { if (obs) { obs.disconnect(); obs = null; } }, 20000);
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', function () { pasar(); velocidad(); });
  w.addEventListener('load', velocidad);
  // cada segundo: el reloj y, en la ficha, el bloque de envío gratis por si el tema rehízo su renglón (al cambiar de talle)
  setInterval(function () { try { reloj(); envioFicha(); } catch (e) { anotar(e); } }, 1000);
})(window, document);
