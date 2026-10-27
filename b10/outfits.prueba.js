/* FL · Bloque 10 (26-oct-2026): OUTFITS con los KITS de Tiendanube. Reemplaza a la app paga Shop the Look.
 * 1) INICIO: la sección «outfits» igual a la de la app, justo debajo de BEST SELLER (con los mismos 3 tamaños que la app: celu
 *    hasta 600 px un look por vez; de 601 a 980 un look con su tarjeta de prendas; desde 981 dos looks, cada uno con su tarjeta;
 *    si cambia el ancho de la ventana se vuelve a armar), con «% 10 OFF», precio, cuotas y transferencia. «COMPRAR OUTFIT» abre una ventanita para elegir el talle
 *    de cada prenda (ninguno viene marcado) y suma el KIT al carrito con un solo renglón y el 10% ya aplicado. Si destildan
 *    una prenda, se suma solo la otra (sin el 10%, como en la app).
 *    Los outfits salen de la categoría OUTFITS (/shop-the-look/): un kit nuevo en esa categoría aparece solo. Va primero lo
 *    que no está en ORDEN (lo más nuevo) y después ORDEN. Las prendas, talles y precios de cada kit se leen de su ficha.
 *    Mientras está prendido esconde la sección de la app; si no puede leer los outfits, la de la app queda como estaba.
 * 2) FICHA DEL KIT: Tiendanube deja cada prenda marcada en su primer talle (el jean en 36). Acá ninguno se ve marcado hasta
 *    que la persona elige, y si toca «Agregar» (o la barra fija del celu) sin elegir, se le pide el talle. «¿Me lo bancás?»
 *    no se muestra en los kits (no sabe de combos).
 * 3) LISTAS: el «Comprar» rápido de un kit en categorías/búsqueda abre la misma ventanita (no agrega el primer talle).
 * 4) FICHA DE UNA PRENDA: si la prenda está en uno o más outfits, debajo del botón de compra va «Llevá el conjunto completo y
 *    ahorrá 10%» igual al de la app: pasa sola cada 5 s por las prendas de esos outfits y «COMPRAR OUTFIT» abre la ventanita.
 * 5) SIN STOCK O CON UNA PRENDA OCULTA, EL OUTFIT NO SE MUESTRA (como la app): ni en el inicio, ni en OUTFITS, ni en las fichas,
 *    ni en las listas. Sin stock: Tiendanube ya marca el kit «Sin stock». Prenda oculta: Tiendanube lo SIGUE VENDIENDO (probado
 *    el 27-oct); la única marca es que esa prenda queda sin link en el desglose del kit → en la ficha del kit queda «Sin stock».
 *    Cuando vuelve el stock o se vuelve a mostrar la prenda, el outfit vuelve solo (lo leído se guarda 10 min). La ventanita
 *    siempre lee la ficha del kit en el momento: si ya no se puede, dice «no disponible» y no deja comprar.
 *    Qué prendas están en qué outfits se recuerda 1 h en el navegador (un outfit NUEVO puede tardar hasta 1 h en salir en las fichas
 *    de sus prendas; en el inicio y en OUTFITS sale enseguida).
 * PRUEBA = true: solo con ?flprueba (queda prendido al navegar; ?flprueba=0 lo apaga). Hoy: PARA TODOS (false).
 * Va en GitHub (MTCONSULTORES/fl-tienda, b10/) y lo carga un cargador chico en el pie. ES5.
 */
(function () {
  if (window.FLB10) return;
  window.FLB10 = { v: '1.1.0' }; window.FLB10T = function () { return { leerKit: leerKit, traerKit: traerKit, revisar: revisar, guardados: guardados, indice: indice, lista: lista, KITS: KITS, abrir: abrir, vendible: vendible, kitVisto: kitVisto, MEM: MEM }; };   // v1.0.0 (26-oct): PARA TODOS · v1.0.1 (27-oct): la sección va debajo de BEST SELLER · v1.0.2: 40 px de aire abajo, como la app
                                   // v1.1.0 (27-oct): cuadro en las fichas de prendas, outfits sin stock / con prenda oculta afuera, compu igual a la app
  var PRUEBA = false;
  var CAT = '/shop-the-look/';                                   // categoría OUTFITS
  // ruffy, billymandy, iverson, slacked, ivory, abyss, roma (el mismo orden que tenía la app)
  var ORDEN = [376849170, 376896224, 376896865, 376897181, 376897506, 376897781, 376898061];
  var BORDO = '#4E0A06', PCT_TRANSF = 20, CUOTAS = 6, AUTO_MS = 5000;
  var d = document, w = window;

  function ss(k, v) {
    try {
      if (v === undefined) return sessionStorage.getItem(k);
      if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v);
    } catch (e) { return null; }
    return null;
  }
  if (PRUEBA) {
    var mp = /[?&]flprueba(=([^&#]*))?(&|$)/.exec(location.search);
    if (mp && mp[2] === '0') ss('flb10', null); else if (mp) ss('flb10', '1');
    if (!ss('flb10')) return;
  }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function css(id, t) { if (d.getElementById(id)) return; var s = d.createElement('style'); s.id = id; s.textContent = t; d.head.appendChild(s); }
  function decodificar(s) { var t = d.createElement('textarea'); t.innerHTML = s; return t.value; }
  function miles(n) { var s = String(n), o = ''; while (s.length > 3) { o = '.' + s.slice(-3) + o; s = s.slice(0, -3); } return s + o; }
  function plataCent(x) {                                      // «$ 122.926,50» (como la app en el precio del look)
    var c = Math.round(x * 100), e = Math.floor(c / 100), r = c % 100;
    return '$ ' + miles(e) + ',' + (r < 10 ? '0' : '') + r;
  }
  function plata(x) {                                          // «$ 20.487» (como el bloque de precios del pie)
    var s = null;
    try { if (w.LS && typeof w.LS.formatToCurrency === 'function') s = w.LS.formatToCurrency(x); } catch (e) { s = null; }
    if (typeof s !== 'string' || !/\d/.test(s)) s = '$ ' + miles(Math.floor(Math.round(x * 100) / 100)) + ',00';
    return s.replace(/,\d+$/, '');
  }
  function ev(n, p) { try { if (typeof w.gtag === 'function') w.gtag('event', n, p || {}); } catch (e) {} }
  var TARJ = '<svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="#000" stroke-width="1.6"/><path d="M2 9.5h20" stroke="#000" stroke-width="2.2"/><path d="M5 15h6" stroke="#000" stroke-width="1.4"/></svg>';
  function preciosHTML(p) {                                    // cuotas + transferencia, igual que el bloque de precios (FLP)
    return '<div class="flo-cu">En <strong>' + CUOTAS + '</strong> cuotas sin interés de <strong>' + plata(p / CUOTAS) + '</strong> con ' + TARJ + '</div>' +
      '<div class="flo-tr"><b>' + plata(p - p * PCT_TRANSF / 100) + '</b> por Transferencia</div>';
  }

  /* ---------- leer un kit desde su ficha ---------- */
  var KITS = {};                                               // url -> promesa del kit (de esta página)
  var GUARDA = 'flb10kits', T_KIT = 6e5;                       // lo leído de cada kit se guarda 10 min, como la lista
  var TOPE = 10000;                                            // ningún pedido espera más de 10 s (si se cuelga, se sigue como si fallara)
  function pedir(url) {
    var ac = w.AbortController ? new w.AbortController() : null, op = { credentials: 'same-origin' };
    if (ac) op.signal = ac.signal;
    return { ac: ac, p: fetch(url, op).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r; }) };
  }
  function conTope(p, ac) {
    return new Promise(function (ok, mal) {
      var t = setTimeout(function () { try { if (ac) ac.abort(); } catch (e) {} mal(new Error('tiempo')); }, TOPE);
      p.then(function (x) { clearTimeout(t); ok(x); }, function (e) { clearTimeout(t); mal(e); });
    });
  }
  function traer(url) { var q = pedir(url); return conTope(q.p.then(function (r) { return r.text(); }), q.ac); }
  // De la ficha del kit alcanza el principio (≈ la quinta parte): se deja de bajar apenas termina el desglose de las prendas.
  var M1 = 'data-component="kit-breakdown"', M2 = 'js-kit-selections';
  function traerKit(url) {
    var q = pedir(url);
    return conTope(q.p.then(function (r) {
      if (!r.body || !r.body.getReader || !w.TextDecoder) return r.text();
      var rd = r.body.getReader(), dec = new w.TextDecoder(), html = '', a = -1, desde = 0;
      return new Promise(function (ok, mal) {
        function seguir() {
          rd.read().then(function (x) {
            if (x.done) { ok(html + dec.decode()); return; }
            html += dec.decode(x.value, { stream: true });
            if (a < 0) a = html.indexOf(M1, Math.max(0, desde - M1.length));
            if (a > -1 && html.indexOf(M2, Math.max(a, desde - M2.length)) > -1) {
              try { var c = rd.cancel(); if (c && c.then) c.then(null, function () {}); } catch (e) {}
              ok(html); return;
            }
            desde = html.length; seguir();
          }, mal);
        }
        seguir();
      });
    }), q.ac);
  }
  function talla(src, n) { return src ? src.replace(/-(50|100|240|320|480|640|1024)-(0|1024)\.(webp|jpg|png)/, '-' + n + '-0.$3') : ''; }
  function mayor(srcset) {                                     // la foto más grande de un srcset
    var best = '', bw = 0;
    String(srcset || '').split(',').forEach(function (p) { var m = p.trim().match(/^(\S+)\s+(\d+)w$/); if (m && +m[2] > bw) { bw = +m[2]; best = m[1]; } });
    return best;
  }
  function leerKit(html, url) {
    var m = html.match(/LS\.kit_id\s*=\s*(\d+)/); if (!m) return null;
    var k = { id: +m[1], url: url, comps: [] };
    var pm = html.match(/LS\.kit_discount_percent\s*=\s*([\d.]+)/); k.pct = pm ? +pm[1] : 0;
    var dv = html.match(/id="single-product"[^>]*data-variants="([^"]*)"/);
    try { var v0 = JSON.parse(decodificar(dv[1]))[0]; k.precio = +v0.price_number; k.lista = +(v0.compare_at_price_number || v0.price_number); k.hay = v0.available !== false; } catch (e) { return null; }
    var tm = html.match(/<title>([^<]*)<\/title>/); k.nombre = tm ? decodificar(tm[1]).replace(/\s+-\s+Comprar en .*$/, '').trim() : '';   // los kits no traen og:title
    var i = html.indexOf('LS.kit_components'), j = html.indexOf('LS.kit_combinations', i);
    var blk = i > -1 ? html.slice(i, j > -1 ? j : i + 60000) : '';
    var re = /index:\s*(\d+),\s*product_id:\s*(\d+),\s*kit_component_id:\s*(\d+),\s*name:\s*("(?:[^"\\]|\\.)*"),\s*quantity:\s*(\d+)[\s\S]*?variants:\s*(\[[\s\S]*?\])\s*\}/g, c;
    while ((c = re.exec(blk))) {
      try { k.comps.push({ idx: +c[1], pid: +c[2], kcid: +c[3], nombre: JSON.parse(c[4]), cant: +c[5], vars: JSON.parse(c[6]), props: [] }); } catch (e) { return null; }
    }
    if (k.comps.length < 2) return null;
    // fotos, links y propiedades (Talle / Color) de cada prenda: del desglose del kit
    var a = html.indexOf(M1), b = html.indexOf(M2, a), lis = [];
    if (a > -1 && b > a) {
      var doc = new DOMParser().parseFromString('<div>' + html.slice(html.lastIndexOf('<div', a), b) + '"></div>', 'text/html');
      lis = doc.querySelectorAll('[data-component="kit-breakdown.item"]');
      for (var x = 0; x < lis.length && x < k.comps.length; x++) {
        var co = k.comps[x], li = lis[x], ln = li.querySelector('a[href]'), im = li.querySelector('img');
        co.link = ln ? ln.getAttribute('href') : '';
        co.foto = im ? talla(mayor(im.getAttribute('srcset') || im.getAttribute('data-srcset')), 480) : '';
        var gs = li.querySelectorAll('[data-component="kit-breakdown.item-variation-group"]');
        for (var g = 0; g < gs.length; g++) {
          var sel = gs[g].querySelector('select'), lab = sel ? sel.getAttribute('aria-label') : '';
          var ops = sel ? [].map.call(sel.querySelectorAll('option'), function (o) { return o.value; }) : [];
          co.props.push({ id: sel ? +sel.getAttribute('data-variation-id') : g, nombre: lab || 'Talle', ops: ops });
        }
      }
    }
    k.comps.forEach(function (co) {
      if (!co.props.length) co.props.push({ id: 0, nombre: 'Talle', ops: co.vars.map(function (v) { return v.option0; }).filter(function (o, i, s) { return o && s.indexOf(o) === i; }) });
      var v = co.vars.filter(hayVar)[0] || co.vars[0] || {};
      co.precio = +v.price || 0; co.lista = +(v.compare_at_price || v.price) || 0;
      if (co.link) co.link = co.link.replace(/^https?:\/\/[^/]+/, '');
    });
    // ¿se puede mostrar? Sin stock: Tiendanube marca el kit (y la prenda queda sin talles disponibles). Prenda OCULTA: Tiendanube
    // lo sigue vendiendo y la deja sin link en el desglose. Solo cuenta si otra prenda SÍ tiene link (si ninguna lo tuviera sería un
    // cambio del tema, no prendas ocultas: no se esconde nada).
    var conLink = k.comps.filter(function (co) { return co.link; }).length;
    k.oculta = lis.length === k.comps.length && conLink > 0 && conLink < k.comps.length;
    // ninguna con link: o están TODAS ocultas o el tema dejó de poner links. Se decide al usarlo (vendible), según si otro kit
    // leído hace poco sí los traía.
    k.sinLinks = lis.length > 0 && lis.length === k.comps.length && conLink === 0;
    if (conLink) ss(LINKS, String(Date.now()));
    k.agotada = k.comps.some(function (co) { return !co.vars.some(hayVar); });
    k.ok = k.hay && !k.agotada && !k.oculta;
    return k;
  }
  // En LS.kit_components una prenda con stock INFINITO viene con stock 0 y available true: manda «available».
  function hayVar(v) { return !!v && v.available !== false; }
  var LINKS = 'flb10ln', NOKIT = 'no es un kit';
  function temaConLinks() { var t = +ss(LINKS) || 0; return Date.now() - t < T_KIT && Date.now() >= t; }
  // ¿se puede mostrar y vender? (con stock, sin prendas ocultas)
  function vendible(k) { return !!k && k.ok !== false && !(k.sinLinks && temaConLinks()); }
  // La promesa queda en KITS solo mientras el pedido está en camino: la ventanita, que llama a kit(), siempre lee la ficha de nuevo.
  function kit(url) {
    if (!KITS[url]) {
      var p = traerKit(url).then(function (h) {
        var k = leerKit(h, url);
        if (!k) { marcarMalo(url); throw new Error(NOKIT); }
        guardar(k); return k;
      });
      var soltar = function () { if (KITS[url] === p) delete KITS[url]; };
      KITS[url] = p; p.then(soltar, soltar);
    }
    return KITS[url];
  }
  var MEM = {};                                                // lo mismo que se guarda, en memoria (por si el navegador no deja guardar)
  function guardados() { try { var o = JSON.parse(ss(GUARDA) || 'null'); if (o && o.k) return o; } catch (e) {} return { k: {} }; }
  function anotar(url, e) { MEM[url] = e; var o = guardados(); o.k[url] = e; ss(GUARDA, JSON.stringify(o)); }
  function guardar(k) { anotar(k.url, { t: Date.now(), k: k }); }
  function marcarMalo(url) { anotar(url, { t: Date.now(), malo: 1 }); }
  function reciente(e) { return !!e && Date.now() - e.t < T_KIT && Date.now() >= e.t; }
  function fresco(e) { return reciente(e) && !!e.k; }
  // para MOSTRAR: lo leído hace menos de 10 min (así no se baja cada ficha en cada página) o, si no hay, la ficha.
  // Una página de OUTFITS que no es un kit (un producto común puesto ahí) no se vuelve a bajar por 10 min.
  function kitVisto(url) {
    var e = MEM[url] || guardados().k[url];
    if (reciente(e) && e.malo) return Promise.reject(new Error(NOKIT));
    return fresco(e) ? Promise.resolve(e.k) : kit(url);
  }
  // los outfits que se pueden mostrar: los de la lista sin los que tienen una prenda oculta o agotada (si uno no se puede leer, queda)
  function revisar(l) {
    return Promise.all(l.map(function (o) { return kitVisto(o.url).then(null, function () { return null; }); }))
      .then(function (ks) { return l.filter(function (o, i) { return !ks[i] || vendible(ks[i]); }); });
  }

  /* ---------- la lista de outfits: la categoría OUTFITS ---------- */
  // l = los que tienen stock (para mostrar) · f = los que están sin stock (para reconocerlos en otras listas y en las fichas)
  function lista() {
    if (w.FLB10_LISTA) return Promise.resolve({ l: w.FLB10_LISTA, f: [] });   // solo para probar antes de publicar los kits
    var c = ss('flb10cat');
    if (c) { try { var o = JSON.parse(c); if (Date.now() - o.t < 6e5 && Date.now() >= o.t && o.l.length) return Promise.resolve({ l: o.l, f: o.f || [] }); } catch (e) {} }
    return traer(CAT).then(function (h) {
      var doc = new DOMParser().parseFromString(h, 'text/html'), l = [], f = [], vistos = {};
      [].forEach.call(doc.querySelectorAll('.js-item-product[data-product-id]'), function (it) {
        var id = +it.getAttribute('data-product-id'); if (!id || vistos[id]) return; vistos[id] = 1;
        var a = it.querySelector('a[href*="/productos/"]'), cont = it.querySelector('[data-variants]'), im = it.querySelector('img'), v = {};
        try { v = JSON.parse(cont.getAttribute('data-variants'))[0] || {}; } catch (e) {}
        if (!a) return;
        var url = a.getAttribute('href').replace(/^https?:\/\/[^/]+/, '').replace(/[?#].*$/, '');
        if (v.available === false) { f.push({ id: id, url: url }); return; }   // como la app: si falta una prenda, el look no se muestra
        var src = im ? (mayor(im.getAttribute('data-srcset') || im.getAttribute('srcset')) || im.getAttribute('data-src') || im.getAttribute('src')) : '';
        var nom = (it.querySelector('.js-item-name') || a).textContent || a.getAttribute('title') || '';
        l.push({ id: id, url: url, nombre: nom.replace(/\s+/g, ' ').trim(),
          foto: talla(src, 640), precio: +v.price_number || 0, lista: +(v.compare_at_price_number || v.price_number) || 0 });
      });
      l.sort(function (x, y) { var a1 = ORDEN.indexOf(x.id), b1 = ORDEN.indexOf(y.id); return (a1 < 0 ? -1 : a1) - (b1 < 0 ? -1 : b1); });
      if (l.length) ss('flb10cat', JSON.stringify({ t: Date.now(), l: l, f: f }));
      return { l: l, f: f };
    });
  }
  function outfits() { return lista().then(function (x) { return x.l; }); }

  // Qué prendas están en qué outfits, guardado 1 h en el navegador: así la ficha de una prenda que no está en ningún outfit no baja nada,
  // y la de una que sí está baja solo sus outfits (para ver stock y prendas ocultas, eso sí con lo leído en los últimos 10 min).
  var INDICE = 'flb10idx', T_IDX = 36e5;
  function ls(k, v) {
    try { if (v === undefined) return w.localStorage.getItem(k); w.localStorage.setItem(k, v); } catch (e) {}
    return null;
  }
  function indiceGuardado() {
    try { var o = JSON.parse(ls(INDICE) || 'null'); if (o && o.m && Date.now() - o.t < T_IDX && Date.now() >= o.t) return o.m; } catch (e) {}
    return null;
  }
  function indice() {
    var g = indiceGuardado(); if (g) return Promise.resolve(g);
    return lista().then(function (x) {
      var us = x.l.concat(x.f).map(function (o) { return o.url; });
      return Promise.all(us.map(function (u) { return kitVisto(u).then(null, function (er) { return er && er.message === NOKIT ? NOKIT : null; }); }));
    }).then(function (ks) {
      var m = {}, todos = true;
      ks.forEach(function (k) {
        if (k === NOKIT) return;                                // no es un outfit: no cuenta (y no impide guardar el índice)
        if (!k) { todos = false; return; }
        k.comps.forEach(function (c) { if (!m[c.pid]) m[c.pid] = []; if (m[c.pid].indexOf(k.url) < 0) m[c.pid].push(k.url); });
      });
      if (todos && ks.length) ls(INDICE, JSON.stringify({ t: Date.now(), m: m }));   // si alguno no se pudo leer, la próxima vez se arma de nuevo
      return m;
    });
  }

  /* ---------- estilos ---------- */
  function estilos() {
    var F = 'font-family:"Plus Jakarta Sans",sans-serif;';
    css('flb10-css',
      // Aire como la app: 40 px debajo (el tema pone margin:0!important a las secciones del inicio; el #id le gana).
      // Arriba no hace falta: BEST SELLER ya deja su espacio. Si no está BEST SELLER, .flo-ar pone los 40 px arriba.
      '#flout{margin:0 0 40px!important;position:relative;overflow:hidden;color:#000;' + F + 'font-size:12px}#flout.flo-ar{margin-top:40px!important}#flout *{box-sizing:border-box}' +
      '#flout .pista{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;scroll-behavior:smooth}#flout .pista::-webkit-scrollbar{display:none}' +
      '#flout .sl{flex:0 0 100%;scroll-snap-align:center;display:flex;justify-content:center;align-items:center;gap:20px}' +
      '#flout .lk{position:relative;display:flex;flex-direction:column;align-items:center;width:338px;max-width:90vw}' +
      '#flout .ft{position:relative;width:100%;aspect-ratio:338/421;border-radius:16px;overflow:hidden;background:#e9e4dc;display:block}' +
      '#flout .ft img{width:100%;height:100%;object-fit:cover;display:block;max-width:none}' +
      '#flout .bd{position:absolute;top:27px;left:17px;background:#fff;color:' + BORDO + ';font-weight:700;font-size:12px;border-radius:15px;padding:8px 15px;line-height:1.25}' +
      '#flout .bt,#flout .co{background:' + BORDO + ';color:#fff;border:0;border-radius:4px;font:400 12px Arial,sans-serif;text-transform:uppercase;cursor:pointer}' +
      '#flout .ft .bt{position:absolute;left:50%;bottom:24px;transform:translateX(-50%);height:35px;padding:0 13px;white-space:nowrap}' +
      '#flout .pc{width:100%;padding:10px 0 0;text-align:center}#flout .nm{display:block;font-size:12px;margin:0 0 4px}' +
      '#flout .rw{display:flex;justify-content:center;align-items:baseline;gap:8px;flex-wrap:wrap}#flout .pr{font-size:20px;font-weight:600}#flout .ls{font-size:15px;font-weight:500;text-decoration:line-through}' +
      '#flout .of{display:none;font-size:16px;font-weight:700;color:' + BORDO + '}' +
      '.flo-cu{display:flex;align-items:center;gap:3px;flex-wrap:wrap;justify-content:center;font-size:12px;margin-top:8px}.flo-cu svg{margin-left:2px}' +
      '.flo-tr{display:table;margin:4px auto 0;background:' + BORDO + ';color:#fff;font-weight:700;border-radius:4px;padding:5px;text-transform:uppercase;font-size:17px}' +
      '#flout .ar{position:absolute;top:0;bottom:0;margin:auto;height:40px;width:46px;background:none;border:0;cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center;color:#000}' +
      '#flout .ar svg{width:34px;height:34px;opacity:.7}#flout .ar.iz{left:0}#flout .ar.de{right:0}#flout .ar[disabled]{opacity:.25;cursor:default}' +
      '#flout .cd{display:none}' +
      // compu y tablet desde 601 px, como la app (de 601 a 980 un look por vez con su tarjeta; desde 981, dos)
      '@media (min-width:601px){' +
        '#flout .pista{height:600px}#flout .lk{width:300px;height:600px;max-width:none}#flout .ft{height:600px;aspect-ratio:auto}#flout .ft .bt,#flout .bd{display:none}' +
        // la tarjeta va centrada en alto, como en la app (con 2 prendas queda a 73 px; con 3 también entra); con más de 3, lista de 400 px con scroll
        '#flout .pc{display:none}#flout .cd{display:block;position:absolute;top:50%;transform:translateY(-50%);width:330px;padding:10px;background:#fff;border-radius:16px;box-shadow:0 0 5px 1px rgba(0,0,0,.1);z-index:1}' +
        '#flout .ps.mu{max-height:400px;overflow-y:auto}' +
        '#flout .sl .lk:first-child .cd{right:180px}#flout .sl .lk:last-child:not(:first-child) .cd{left:180px}#flout .sl .lk:only-child .cd{left:auto;right:180px}' +
        // la tarjetita de cada prenda, medida contra la de la app: 110 px + 5 de aire + 1 de borde gris = 122 px de alto
        // (.ps encierra los márgenes: debajo de la última prenda quedan 20 px hasta los precios, como en la app)
        '#flout .ps{display:flow-root}#flout .pr2{box-sizing:content-box;display:flex;gap:10px;align-items:center;padding:5px;margin:10px 0;border:1px solid #ddd;border-radius:16px;box-shadow:0 0 5px 1px rgba(0,0,0,.1);height:110px}' +
        '#flout .pr2 img{width:100px;height:100px;object-fit:cover;border-radius:16px;box-shadow:0 0 5px 1px rgba(0,0,0,.1);margin:0 5px 0 6px;flex:0 0 100px;max-width:none;background:#eee}' +
        '#flout .pr2 .in{display:flex;flex-direction:column;gap:5px;min-width:0}#flout .pr2 .n{font-size:13px;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:120px}' +
        '#flout .pr2 .p{display:flex;gap:5px;align-items:center;font-size:13px}#flout .pr2 .p b{font-weight:700}#flout .pr2 .p s{font-weight:300;opacity:.5;margin-right:5px}' +
        '#flout .co{display:inline-block;width:80px;padding:5px;font:400 13.3333px "Plus Jakarta Sans",sans-serif;text-transform:none;text-decoration:none;text-align:center;line-height:normal;border-radius:5%}' +
        '#flout .co:hover{background:#fff;color:' + BORDO + '}' +
        '#flout .pr2.vac{background:linear-gradient(90deg,#f3f0ea,#fbfaf7,#f3f0ea);background-size:200% 100%;animation:flosk 1.2s infinite}' +
        '@keyframes flosk{to{background-position:-200% 0}}' +
        '#flout .ld{display:flex;flex-direction:column;align-items:center;gap:10px;margin:10px 0}#flout .ld .rw{gap:5px}#flout .ld .ls{font-size:15px;font-weight:400;opacity:.5;margin-right:7px}#flout .ld .pr{font-size:17px;font-weight:400}#flout .ld .of{display:block}' +
        '#flout .ld .bt{height:40px;padding:0 15px;font-size:15px}' +
      '}' +
      // de 601 a 719 px el look (300) y su tarjeta (que sobresale 210 a la izquierda) no entran centrados: se corre lo justo
      '@media (min-width:601px) and (max-width:719px){#flout .sl .lk:only-child{margin-left:calc(720px - 100vw)}}' +
      // ventanita del outfit
      '#flomod{position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:16px;color:#000;' + F + 'font-size:13px}' +
      '#flomod *{box-sizing:border-box}#flomod .bx{background:#F2EDE4;border-radius:12px;width:100%;max-width:660px;max-height:calc(100dvh - 32px);max-height:92vh;overflow-y:auto;overscroll-behavior:contain;padding:20px}' +
      '#flomod .hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}#flomod .hd b{font-size:14px;text-transform:uppercase}' +
      '#flomod .x{background:none;border:0;font-size:26px;line-height:1;cursor:pointer;padding:0 4px;color:#000}' +
      '#flomod .it{display:flex;align-items:center;gap:14px;background:#fff;border-radius:10px;padding:10px;margin:0 0 10px;border:1px solid #e7e0d4}' +
      '#flomod .it.off{opacity:.45}#flomod .it input[type=checkbox]{width:18px;height:18px;accent-color:#000;flex:0 0 18px;margin:0}' +
      '#flomod .it img{width:72px;height:72px;object-fit:cover;border-radius:8px;flex:0 0 72px;max-width:none;background:#eee}' +
      '#flomod .in{flex:1;min-width:0}#flomod .in .n{font-weight:800;text-transform:uppercase;font-size:13px;line-height:1.25}' +
      '#flomod .in .p{margin:3px 0 6px;font-size:14px}#flomod .in .p s{opacity:.6;margin-right:6px;font-size:12px}' +
      '#flomod select{font-weight:600;font-size:13px;' + F + 'border:1.5px solid #111;border-radius:6px;padding:7px 28px 7px 9px;background:#fff;color:#111;margin:0 6px 4px 0;max-width:100%}' +
      '#flomod select.mal{border-color:' + BORDO + ';box-shadow:0 0 0 2px rgba(78,10,6,.25);animation:flshk2 .45s}' +
      '@keyframes flshk2{0%,100%{transform:none}25%{transform:translateX(-5px)}50%{transform:translateX(5px)}75%{transform:translateX(-3px)}}' +
      '#flomod .av{display:none;color:' + BORDO + ';font-weight:700;font-size:12px}#flomod .it.dijo .av{display:block}' +
      '#flomod .tt{text-align:center;margin-top:6px}#flomod .tt .of{color:' + BORDO + ';font-weight:800;font-size:14px}' +
      '#flomod .tt .tot{font-size:16px;margin:2px 0}#flomod .tt .tot b{font-size:20px;font-weight:700}#flomod .tt .tot s{opacity:.6;margin-left:6px;font-size:14px}' +
      '#flomod .ag{display:block;margin:14px auto 0;background:' + BORDO + ';color:#fff;border:0;border-radius:4px;font:700 14px Arial,sans-serif;letter-spacing:.04em;text-transform:uppercase;padding:13px 22px;cursor:pointer;min-width:220px}' +
      '#flomod .ag[disabled]{background:#999;cursor:default}#flomod .er{color:' + BORDO + ';text-align:center;font-weight:700;margin-top:8px}' +
      '#flomod .cg{text-align:center;padding:40px 0;font-weight:700}' +
      '@media (max-width:767px){#flomod{align-items:flex-end;padding:0}#flomod .bx{border-radius:16px 16px 0 0;max-height:calc(100dvh - 40px);max-height:90vh;padding:16px 14px calc(18px + env(safe-area-inset-bottom,0px))}}' +
      'html.flomod-on{overflow:hidden}');
  }

  /* ---------- 1 · INICIO ---------- */
  var FLECHA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  // los 3 tamaños de la app: 0 = celu (hasta 600 px) · 1 = un look por vez con su tarjeta (601 a 980) · 2 = dos looks (más de 980;
  // la app decide con innerWidth > 980)
  function modo() { return w.matchMedia('(min-width:981px)').matches ? 2 : w.matchMedia('(min-width:601px)').matches ? 1 : 0; }
  function alCambiarAncho(fn) {
    ['(min-width:601px)', '(min-width:981px)'].forEach(function (q) {
      var m = w.matchMedia(q);
      if (m.addEventListener) m.addEventListener('change', fn); else if (m.addListener) m.addListener(fn);
    });
  }
  // La sección de productos «BEST SELLER» del inicio: por su título y, si lo cambian, la de productos en oferta del tema.
  function bestSeller() {
    var secs = d.querySelectorAll('.section-featured-home'), i, h;
    for (i = 0; i < secs.length; i++) { h = secs[i].querySelector('h1,h2,h3,h4'); if (h && /best\s*seller/i.test(h.textContent)) return secs[i]; }
    var o = d.querySelector('.js-products-sale-container');
    return o && o.closest ? o.closest('.section-featured-home') : null;
  }
  function inicio() {
    if (d.getElementById('flout')) return;
    var best = bestSeller(), app = d.getElementById('shop-the-look-container'), dest = d.querySelector('.section-featured-home');
    var ancla = app || dest; if (!best && !ancla) return;
    estilos();
    css('flb10-app', '#shop-the-look-container{display:none!important}');   // la de la app, escondida mientras está la nuestra
    var s = d.createElement('section'); s.id = 'flout'; s.setAttribute('aria-label', 'Outfits'); s.style.minHeight = modo() ? '600px' : '590px';
    if (best) best.parentNode.insertBefore(s, best.nextSibling);   // justo DEBAJO de BEST SELLER (pedido de Facundo, 27-oct)
    else { s.classList.add('flo-ar'); ancla.parentNode.insertBefore(s, ancla); }
    var cargo = false;
    function sacar() { clearInterval(s.__t); if (s.parentNode) s.parentNode.removeChild(s); }
    function quitar() {                                         // si falla: vuelve la de la app, como estaba
      sacar();
      var st = d.getElementById('flb10-app'); if (st) st.parentNode.removeChild(st);
    }
    function cargar() {
      if (cargo) return; cargo = true;
      outfits().then(function (l) {
        if (!l.length) throw new Error('sin outfits');
        dibujar(s, l); s.style.minHeight = '';
        ev('flb10_outfits_vistos', { looks: l.length });
        // los que tienen una prenda oculta o agotada se sacan apenas se sabe (casi nunca pasa: no se espera para dibujar).
        // Si no queda ninguno, no hay sección (como en las fichas): no vuelve la de la app, que mostraría esos mismos looks.
        revisar(l).then(function (l2) {
          if (l2.length === l.length || !s.parentNode) return;
          if (l2.length) dibujar(s, l2); else sacar();
        }).catch(quitar);
      }).catch(quitar);
    }
    if ('IntersectionObserver' in w) {
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); cargar(); } }, { rootMargin: '800px 0px' });
      io.observe(s);
    } else cargar();
  }
  function tarjetaLook(o) {
    var pct = o.lista > o.precio ? Math.round((1 - o.precio / o.lista) * 100) : 0;
    return '<div class="lk" data-url="' + esc(o.url) + '">' +
      '<a class="ft" href="' + esc(o.url) + '"><img alt="' + esc(o.nombre) + '" loading="lazy" src="' + esc(o.foto) + '">' +
      (pct ? '<span class="bd">% ' + pct + ' OFF</span>' : '') + '<button type="button" class="bt">Comprar outfit</button></a>' +
      '<div class="pc"><span class="nm">' + esc(o.nombre) + '</span><div class="rw"><span class="pr">' + plataCent(o.precio) + '</span>' +
      (pct ? '<span class="ls">' + plataCent(o.lista) + '</span>' : '') + '</div>' + preciosHTML(o.precio) + '</div>' +
      '<div class="cd"><div class="ps"><div class="pr2 vac"></div><div class="pr2 vac"></div></div>' +
      '<div class="ld"><div class="rw">' + (pct ? '<span class="ls">' + plataCent(o.lista) + '</span>' : '') + '<span class="pr">' + plataCent(o.precio) + '</span>' +
      (pct ? '<span class="of">(' + pct + '% OFF)</span>' : '') + '</div><div>' + preciosHTML(o.precio) + '</div><button type="button" class="bt">Comprar outfit</button></div></div>' +
      '</div>';
  }
  // Se puede llamar de nuevo (cambió el ancho de la ventana o se sacó un outfit): el estado vive en la sección (s.__…).
  function dibujar(s, l) {
    // el look que se estaba viendo (se anota al moverse, con la medida de ese momento), para no volver al primero
    var m = modo(), porSl = m === 2 ? 2 : 1, h = '', i, visto = s.__visto;
    s.__l = l; s.__modo = m; s.__porUrl = {}; l.forEach(function (o) { s.__porUrl[o.url] = o; });
    for (i = 0; i < l.length; i += porSl) h += '<div class="sl">' + l.slice(i, i + porSl).map(tarjetaLook).join('') + '</div>';
    s.innerHTML = '<div class="pista">' + h + '</div><button type="button" class="ar iz" aria-label="Outfit anterior">' + FLECHA + '</button>' +
      '<button type="button" class="ar de" aria-label="Outfit siguiente" style="transform:scaleX(-1)">' + FLECHA + '</button>';
    var p = s.querySelector('.pista'), sls = s.querySelectorAll('.sl');
    if (visto) for (i = 0; i < l.length; i++) {
      if (l[i].url === visto) { p.style.scrollBehavior = 'auto'; p.scrollLeft = Math.floor(i / porSl) * p.clientWidth; p.style.scrollBehavior = ''; break; }
    }
    function actual() { return Math.round(p.scrollLeft / Math.max(1, p.clientWidth)); }
    function ir(n) { n = (n + sls.length) % sls.length; p.scrollTo({ left: n * p.clientWidth, behavior: 'smooth' }); }
    s.querySelector('.iz').onclick = function () { s.__q = true; ir(actual() - 1); };
    s.querySelector('.de').onclick = function () { s.__q = true; ir(actual() + 1); };
    clearInterval(s.__t);
    s.__t = setInterval(function () { if (!s.__q && !d.hidden && !d.getElementById('flomod')) ir(actual() + 1); }, AUTO_MS);
    ['pointerdown', 'touchstart', 'wheel'].forEach(function (n) { p.addEventListener(n, function () { s.__q = true; }, { passive: true }); });
    // con tarjeta (601 px o más) cada una lista sus prendas: se leen las del slide que se ve y el siguiente
    function prendas(n) {
      if (!m || !sls[n]) return;
      [].forEach.call(sls[n].querySelectorAll('.lk'), function (lk) {
        if (lk.__flp) return; lk.__flp = 1;
        kitVisto(lk.getAttribute('data-url')).then(function (k) {
          var ps = lk.querySelector('.ps'); ps.classList.toggle('mu', k.comps.length > 3);
          ps.innerHTML = k.comps.map(function (c) {
            return '<div class="pr2"><img alt="" loading="lazy" src="' + esc(c.foto) + '"><div class="in"><span class="n" title="' + esc(c.nombre) + '">' + esc(c.nombre) + '</span>' +
              '<div class="p"><b>' + plataCent(c.precio) + '</b>' + (c.lista > c.precio ? '<s>' + plataCent(c.lista) + '</s>' : '') + '</div>' +
              (c.link ? '<a class="co" href="' + esc(c.link) + '">Comprar</a>' : '') + '</div></div>';
          }).join('');
        }).catch(function () {                                  // sin los cuadros grises: la tarjeta queda con precio y botón
          lk.__flp = 0; var ps = lk.querySelector('.ps'); if (ps) ps.innerHTML = '';
        });
      });
    }
    prendas(0); prendas(1);
    p.addEventListener('scroll', function () {
      var n = actual(), lk = sls[n] && sls[n].querySelector('.lk');
      // el look que se está viendo (para un redibujo); mientras cambia el ancho y todavía no se rearmó, la medida no sirve
      if (lk && modo() === m) s.__visto = lk.getAttribute('data-url');
      prendas(n); prendas(n + 1);
    }, { passive: true });
    if (s.__fl) return;                                       // lo que sigue va una sola vez por sección
    s.__fl = 1;
    s.addEventListener('mouseenter', function () { s.__q = true; }); s.addEventListener('mouseleave', function () { s.__q = false; });
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.bt'); if (!b) return;
      e.preventDefault(); e.stopPropagation(); s.__q = true;
      var lk = b.closest('.lk'), o = lk && s.__porUrl[lk.getAttribute('data-url')]; if (o) abrir({ url: o.url, nombre: o.nombre, desde: 'inicio' });
    });
    // si la página se abrió con la ventana angosta y después se agrandó (o al revés), se vuelve a armar con el tamaño nuevo
    alCambiarAncho(function () { if (s.parentNode && s.__l && modo() !== s.__modo) dibujar(s, s.__l); });
  }

  /* ---------- 2 · VENTANITA «COMPRAR OUTFIT» ---------- */
  function abrir(o) {
    estilos(); cerrar();
    var m = d.createElement('div'); m.id = 'flomod'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-label', o.nombre);
    m.innerHTML = '<div class="bx"><div class="hd"><b>' + esc(o.nombre) + '</b><button type="button" class="x" aria-label="Cerrar">×</button></div><div class="cu"><div class="cg">Cargando…</div></div></div>';
    d.body.appendChild(m); d.documentElement.classList.add('flomod-on');
    m.addEventListener('click', function (e) { if (e.target === m || (e.target.closest && e.target.closest('.x'))) cerrar(); });
    d.addEventListener('keydown', escTecla);
    ev('flb10_abrir', { outfit: o.nombre, desde: o.desde || 'lista' });
    kit(o.url).then(function (k) {
      if (d.getElementById('flomod') !== m) return;
      // la ficha recién leída manda: con una prenda oculta o agotada no se puede comprar (aunque se haya visto con datos de hace un rato)
      if (!vendible(k)) {
        m.querySelector('.cu').innerHTML = '<div class="cg">Este outfit no está disponible por ahora.</div>';
        ev('flb10_no_disponible', { outfit: k.nombre || o.nombre, oculta: k.oculta ? 1 : 0 });
        return;
      }
      armar(m, k);
    }).catch(function () { if (d.getElementById('flomod') === m) location.href = o.url; });   // si no se puede leer, va a su ficha (si sigue abierta)
  }
  function escTecla(e) { if (e.key === 'Escape') cerrar(); }
  function cerrar() {
    var m = d.getElementById('flomod'); if (m) m.parentNode.removeChild(m);
    d.documentElement.classList.remove('flomod-on'); d.removeEventListener('keydown', escTecla);
  }
  function armar(m, k) {
    var cu = m.querySelector('.cu'), h = '';
    k.comps.forEach(function (c, i) {
      h += '<div class="it" data-i="' + i + '"><input type="checkbox" checked aria-label="Llevar ' + esc(c.nombre) + '">' +
        '<img alt="" src="' + esc(c.foto) + '"><div class="in"><div class="n">' + esc(c.nombre) + '</div>' +
        '<div class="p">' + (c.lista > c.precio ? '<s>' + plataCent(c.lista) + '</s>' : '') + plataCent(c.precio) + '</div>' +
        c.props.map(function (p, j) {
          var uno = p.ops.length === 1;
          return '<select data-j="' + j + '" aria-label="' + esc(p.nombre) + '">' + (uno ? '' : '<option value="" selected disabled>' + esc(p.nombre) + '</option>') +
            p.ops.map(function (op) { return '<option value="' + esc(op) + '"' + (uno ? ' selected' : '') + '>' + esc(op) + '</option>'; }).join('') + '</select>';
        }).join('') + '<div class="av">👆 Elegí tu ' + esc((c.props[0] || {}).nombre || 'talle').toLowerCase() + '</div></div></div>';
    });
    h += '<div class="tt"></div><button type="button" class="ag">Agregar al carrito</button><div class="er" hidden></div>';
    cu.innerHTML = h;
    var its = cu.querySelectorAll('.it'), tt = cu.querySelector('.tt'), ag = cu.querySelector('.ag'), er = cu.querySelector('.er');
    function elegido(i) { return [].map.call(its[i].querySelectorAll('select'), function (s) { return s.value; }); }
    function variante(c, vals) {                               // la variante de la prenda para lo elegido (o null)
      for (var x = 0; x < c.vars.length; x++) {
        var v = c.vars[x], ok = true;
        c.props.forEach(function (p, j) { if (v['option' + p.id] !== vals[j]) ok = false; });
        if (ok) return v;
      }
      return null;
    }
    function marcarStock() {                                   // los talles agotados se ven y no se pueden elegir
      k.comps.forEach(function (c, i) {
        var sels = its[i].querySelectorAll('select'), vals = elegido(i);
        [].forEach.call(sels, function (s, j) {
          [].forEach.call(s.options, function (op) {
            if (!op.value) return;
            var hay = c.vars.some(function (v) {
              if (!hayVar(v) || v['option' + c.props[j].id] !== op.value) return false;
              return c.props.every(function (p, q) { return q === j || !vals[q] || v['option' + p.id] === vals[q]; });
            });
            op.disabled = !hay; op.textContent = op.value + (hay ? '' : ' (sin stock)');
            if (!hay && s.value === op.value) s.value = s.options[0].value === '' ? '' : s.value;
          });
        });
      });
    }
    function lleva() { return [].map.call(its, function (it) { return it.querySelector('input').checked; }); }
    function total() {
      var ll = lleva(), n = ll.filter(Boolean).length, html = '';
      [].forEach.call(its, function (it, i) { it.classList.toggle('off', !ll[i]); });
      if (n === k.comps.length) {
        html = (k.pct ? '<div class="of">-' + k.pct + '% OFF</div>' : '') + '<div class="tot">Total <b>' + plataCent(k.precio) + '</b>' + (k.lista > k.precio ? '<s>' + plataCent(k.lista) + '</s>' : '') + '</div>' + preciosHTML(k.precio);
      } else if (n) {
        var t = 0; k.comps.forEach(function (c, i) { if (ll[i]) t += c.precio; });
        html = '<div class="tot">Total <b>' + plataCent(t) + '</b></div>' + preciosHTML(t);
      }
      tt.innerHTML = html; ag.disabled = !n; er.hidden = true;
    }
    [].forEach.call(its, function (it) {
      it.querySelector('input').addEventListener('change', total);
      [].forEach.call(it.querySelectorAll('select'), function (s) { s.addEventListener('change', function () { s.classList.remove('mal'); it.classList.remove('dijo'); marcarStock(); }); });
    });
    marcarStock(); total();
    ag.addEventListener('click', function () {
      var ll = lleva(), falta = null, vs = [];
      k.comps.forEach(function (c, i) {
        if (!ll[i]) { vs.push(null); return; }
        var vals = elegido(i), v = vals.indexOf('') === -1 ? variante(c, vals) : null;
        if (!v && !falta) falta = i;
        vs.push(v);
      });
      if (falta !== null) {
        var it = its[falta], s0 = [].filter.call(it.querySelectorAll('select'), function (s) { return !s.value; })[0] || it.querySelector('select');
        it.classList.add('dijo'); if (s0) { s0.classList.remove('mal'); void s0.offsetWidth; s0.classList.add('mal'); }
        try { it.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {}
        return;
      }
      if (vs.some(function (v) { return v && !hayVar(v); })) { er.textContent = 'Ese talle se agotó. Elegí otro.'; er.hidden = false; return; }
      var fd = new FormData(), todo = ll.every(Boolean);
      if (todo) {
        fd.append('add_to_cart', k.id);
        fd.append('kit_selections', JSON.stringify(k.comps.map(function (c, i) { return { kit_component_id: c.kcid, variant_id: vs[i].id || vs[i].variant_id, quantity: c.cant }; })));
      } else {
        var i1 = ll.indexOf(true), c1 = k.comps[i1], v1 = vs[i1];
        fd.append('add_to_cart', c1.pid);
        c1.props.forEach(function (p) { fd.append('variation[' + p.id + ']', v1['option' + p.id]); });
      }
      fd.append('quantity', '1'); fd.append('add_to_cart_enhanced', '1');
      ag.disabled = true; ag.textContent = 'Agregando…';
      var x = new XMLHttpRequest();
      x.open('POST', '/comprar/', true); x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      x.onload = function () {
        var j = null; try { j = JSON.parse(x.responseText); } catch (e) {}
        if (!(j && j.success)) { ag.disabled = false; ag.textContent = 'Agregar al carrito'; er.textContent = 'No se pudo agregar. Probá de nuevo o elegí otro talle.'; er.hidden = false; return; }
        ev('flb10_agregar', { outfit: k.nombre, completo: todo ? 1 : 0, valor: todo ? k.precio : k.comps[ll.indexOf(true)].precio });
        ag.textContent = '¡Listo! ✓';
        setTimeout(function () { cerrar(); carritoActualizado(j); }, 450);
      };
      x.onerror = function () { ag.disabled = false; ag.textContent = 'Agregar al carrito'; er.textContent = 'Sin conexión. Probá de nuevo.'; er.hidden = false; };
      x.send(fd);
    });
  }
  // igual que la app: refresca el carrito del tema con la respuesta y lo abre (si algo falla, va a la página del carrito)
  function carritoActualizado(j) {
    if (location.pathname.indexOf('/comprar') === 0) { location.reload(); return; }
    try {
      var $ = w.jQueryNuvem || w.jQuery;
      w.LS.updateCartEnhanced(j.cart, false, function () {}, j.html_cart_items);
      if (w.LS.refreshTotals) w.LS.refreshTotals(j);
      if (w.LS.freeShippingLabelUpdate) w.LS.freeShippingLabelUpdate(j.free_shipping, true);
      if (w.LS.changeQuantity && j.item) w.LS.changeQuantity(j.item.id, j.item.quantity, true);
      if ($) { $('.js-empty-ajax-cart').hide(); $('.js-visible-on-cart-filled').show(); $('.js-total-promotions').show(); $('.js-fulfillment-info').show(); }
      var a = d.querySelector('[data-toggle="#modal-cart"]');
      if (!a) throw new Error('sin carrito');
      a.click();
    } catch (e) { location.href = '/comprar/'; }
  }

  /* ---------- 3 · FICHA DEL KIT: ningún talle marcado hasta que lo eligen ---------- */
  var AVISO = 'Elegí tu talle';
  function fichaKit() {
    var f = d.getElementById('product_form') || (d.querySelector('.js-kit-selections') || {}).form;
    if (!f || !d.querySelector('[data-component="kit-breakdown"]')) return;
    d.body.classList.add('flkit');
    css('flb10-ficha', 'body.flkit #flbanca{display:none!important}' +
      '.flk-av{display:none;margin:6px 0 0;color:' + BORDO + ';font-weight:700;font-size:13px}.flk-pend.flk-dijo .flk-av{display:block}' +
      '.flk-pend.flk-dijo .js-kit-component-variant{border-color:' + BORDO + '!important}' +
      '.flk-avisar .js-kit-component-variant{animation:flkshk .45s ease}' +
      '@keyframes flkshk{0%,100%{transform:none}20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}' +
      '@media (prefers-reduced-motion:reduce){.flk-avisar .js-kit-component-variant{animation:none}}');
    // una prenda OCULTA (Tiendanube igual vende el kit; esa prenda queda sin link): el kit queda «Sin stock», como cuando falta stock.
    // Si NINGUNA tiene link, cuenta como «todas ocultas» solo si otro kit visto hace poco sí traía links (si no, sería el tema).
    var lis = d.querySelectorAll('[data-component="kit-breakdown.item"]');
    var conLink = [].filter.call(lis, function (li) { return li.querySelector('a[href*="/productos/"]'); }).length;
    if (conLink) ss(LINKS, String(Date.now()));
    if (lis.length > 1 && (conLink > 0 ? conLink < lis.length : temaConLinks())) { sinStock(f); return; }
    var gs = [].slice.call(f.querySelectorAll('[data-component="kit-breakdown.item-variation-group"]')).filter(function (g) { return g.querySelectorAll('.js-kit-component-variant').length > 1; });
    if (!gs.length) return;
    // el «marcado» de Tiendanube se tapa (sin sacarle la clase: su cuenta de la combinación sigue intacta)
    var b0 = gs[0].querySelector('.js-kit-component-variant:not(.selected)'), cs = b0 && w.getComputedStyle(b0);
    if (cs) css('flb10-sinmarca', '.flk-pend .js-kit-component-variant.selected{border-color:' + cs.borderColor + '!important;background:' + cs.backgroundColor + '!important;color:' + cs.color + '!important;box-shadow:none!important;font-weight:' + cs.fontWeight + '!important;outline:0!important}');
    gs.forEach(function (g) {
      g.classList.add('flk-pend');
      var l = g.querySelector('label.d-inline-block') || g.querySelector('label'), nom = (l ? l.textContent : 'talle').trim().toLowerCase();
      var av = d.createElement('div'); av.className = 'flk-av'; av.setAttribute('role', 'alert'); av.textContent = '👆 Elegí ' + (nom === 'talle' ? 'tu talle' : 'el ' + nom) + ' para seguir';
      g.appendChild(av);
    });
    function pendientes() { return gs.filter(function (g) { return g.classList.contains('flk-pend'); }); }
    function boton() { return f.querySelector('.js-addtocart:not(.js-addtocart-placeholder)'); }
    function texto() {
      var b = boton(); if (!b) return;
      if (pendientes().length) { if (!b.disabled && b.value !== AVISO) { b.__flTxt = b.value; b.value = AVISO; } }
      else if (b.value === AVISO) b.value = b.__flTxt || 'Agregar al carrito';
    }
    function avisar() {
      var g = pendientes()[0]; if (!g) return;
      g.classList.add('flk-dijo'); g.classList.remove('flk-avisar'); void g.offsetWidth; g.classList.add('flk-avisar');
      var r = g.getBoundingClientRect();
      if (r.top < 80 || r.bottom > innerHeight - 100) {
        try { g.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) { g.scrollIntoView(); }
        setTimeout(function () { var r2 = g.getBoundingClientRect(); if (r2.bottom < 0 || r2.top > innerHeight) g.scrollIntoView({ block: 'center' }); }, 900);
      }
    }
    d.addEventListener('click', function (e) {
      var t = e.target; if (!t || !t.closest) return;
      var v = t.closest('.js-kit-component-variant');
      if (v) { var g = v.closest('[data-component="kit-breakdown.item-variation-group"]'); if (g) g.classList.remove('flk-pend', 'flk-dijo', 'flk-avisar'); setTimeout(texto, 50); return; }
      var a = t.closest('.js-addtocart'); if (!a || (a.form || a.closest('form')) !== f) return;
      if (pendientes().length) { e.preventDefault(); e.stopImmediatePropagation(); avisar(); }
    }, true);
    d.addEventListener('submit', function (e) { if (e.target === f && pendientes().length) { e.preventDefault(); e.stopImmediatePropagation(); avisar(); } }, true);
    texto(); setInterval(texto, 700);
  }
  // el botón como lo deja Tiendanube cuando el kit no tiene stock (clase «nostock», «Sin stock», apagado), y sin poder comprarlo
  function sinStock(f) {
    d.body.classList.add('flkit-no');
    ev('flb10_kit_prenda_oculta', { kit: w.LS && w.LS.kit_id });
    function apagar() {
      [].forEach.call(f.querySelectorAll('.js-addtocart:not(.js-addtocart-placeholder)'), function (b) {
        if (!b.disabled) b.disabled = true;
        if (b.value !== 'Sin stock') b.value = 'Sin stock';
        if (b.classList.contains('cart')) b.classList.remove('cart');
        if (!b.classList.contains('nostock')) b.classList.add('nostock');
      });
    }
    function frenar(e) { e.preventDefault(); e.stopImmediatePropagation(); apagar(); }
    d.addEventListener('click', function (e) {
      var a = e.target && e.target.closest && e.target.closest('.js-addtocart');
      if (a && (a.form || a.closest('form')) === f) frenar(e);
    }, true);
    d.addEventListener('submit', function (e) { if (e.target === f) frenar(e); }, true);
    apagar(); setInterval(apagar, 700);
  }

  /* ---------- 4 · FICHA DE UNA PRENDA: «Llevá el conjunto completo y ahorrá 10%», igual al cuadro de la app ---------- */
  // Medido contra la app (27-oct) en el celu (375) y en la compu (1024): título 14 px (12 en el celu), caja con borde gris de 8 px de
  // radio, foto 85 px (75), nombre 20 px en mayúsculas, precio 15 px (13) con el tachado 12 px (10), botón bordó de 35 px (33).
  // Pasa sola cada 5 s por TODAS las prendas de los outfits que tienen esta prenda (en el orden de los outfits, como la app).
  var CHEV_IZ = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>';
  var CHEV_DE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>';
  function estilosConjunto() {
    css('flb10-conj',
      '#flconj{color:#000;line-height:normal}#flconj *{box-sizing:border-box}' +
      '#flconj .ti{margin:10px 0;font-size:14px;line-height:normal}#flconj .ti b{font-weight:700;color:' + BORDO + '}' +
      // la caja mide su propio ancho (como la app): con 360 px o menos de contenido el botón va a su renglón, a la derecha
      '#flconj .cj{position:relative;padding:17px;border:1px solid #d3d3d3;border-radius:8px;box-shadow:0 1px 4.8px 0 rgba(0,0,0,.15);container-type:inline-size}' +
      '#flconj .it{margin:0 15px;display:flex;align-items:center;gap:15px}' +
      // el fundido es de la foto, el nombre y el precio; el botón queda fijo (como la app)
      '#flconj .fo,#flconj .nm,#flconj .ps{transition:opacity .5s ease-in-out}#flconj .it.fu .fo,#flconj .it.fu .nm,#flconj .it.fu .ps{opacity:0}' +
      '#flconj .fo{flex:0 0 auto;display:block;line-height:0}#flconj .fo img{width:85px;height:85px;border-radius:8px;object-fit:cover;display:block;max-width:none;background:#eee}' +
      '#flconj .in{display:flex;flex-direction:column;justify-content:center;align-self:stretch;gap:10px;width:100%;min-width:0;overflow:hidden}' +
      '#flconj .nm{display:block;font-size:20px;font-weight:600;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;color:#000;text-decoration:none;line-height:normal}' +
      '#flconj .pb{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap}' +
      '#flconj .ps{white-space:nowrap}#flconj .ps s{font-size:12px;font-weight:300;margin-right:5px;color:#000}#flconj .ps b{font-size:15px;font-weight:600;color:#000}' +
      '#flconj .bt{width:fit-content;height:35px;padding:0 15px;border:0;border-radius:4px;background:' + BORDO + ';color:#fff;font:400 12px Arial,sans-serif;text-transform:uppercase;cursor:pointer;white-space:nowrap}' +
      '#flconj .ch{position:absolute;top:33%;transform:translateY(-50%);z-index:2;width:40px;height:34px;padding:0;margin:0;background:none;border:0;color:#000;cursor:pointer;display:flex;align-items:center;justify-content:center}' +
      '#flconj .ch svg{width:28px;height:28px;display:block}#flconj .ch.iz{left:0}#flconj .ch.de{right:0}' +
      '@media (max-width:980px){#flconj .ch{top:45%}}' +
      '@media (max-width:600px){#flconj .ti{font-size:12px}#flconj .it{gap:10px}#flconj .fo img{width:75px;height:75px}' +
        '#flconj .ps s{font-size:10px}#flconj .ps b{font-size:13px}#flconj .bt{height:33px;font-size:13px;padding:0 5px}}' +
      '@container (max-width:420px){#flconj .pb{gap:8px}}' +
      '@container (max-width:360px){#flconj .bw{display:flex;width:100%}#flconj .bt{margin-left:auto}}' +
      // navegadores sin esas reglas (Safari de iOS 15): en el celu, igual el botón a la derecha y con su aire
      '@supports not (container-type:inline-size){@media (max-width:600px){#flconj .pb{gap:8px}#flconj .bw{margin-left:auto}}}' +
      '@container (max-width:290px){#flconj .nm{font-size:17px}#flconj .ps s{font-size:10px}#flconj .ps b{font-size:13px}}' +
      '@media (prefers-reduced-motion:reduce){#flconj .fo,#flconj .nm,#flconj .ps{transition:none}}');
  }
  function volverApp() { var st = d.getElementById('flb10-app'); if (st) st.parentNode.removeChild(st); }
  // las urls de OUTFITS (con y sin stock) si la lista se leyó hace menos de 10 min; si no, null
  function catGuardada() {
    try {
      var o = JSON.parse(ss('flb10cat') || 'null');
      if (o && o.l && Date.now() - o.t < 6e5 && Date.now() >= o.t) return o.l.concat(o.f || []).map(function (x) { return x.url; });
    } catch (e) {}
    return null;
  }
  // ¿a la prenda de esta ficha le queda algún talle? (lo que dice la ficha recién cargada, más nuevo que lo guardado)
  function prendaConStock() {
    var sp = d.getElementById('single-product');
    try { return JSON.parse(sp.getAttribute('data-variants')).some(function (v) { return v.available !== false; }); } catch (e) { return true; }
  }
  function conjunto() {
    var f = d.getElementById('product_form'), pid = w.LS && w.LS.product ? +w.LS.product.id : 0;
    if (!f || !pid || d.getElementById('flconj')) return;
    // si el navegador no deja guardar, no se arma nada (cada ficha volvería a bajar todos los outfits); la app, si está, queda
    ls('flb10p', '1'); if (ls('flb10p') !== '1') return;
    // con el índice ya guardado se sabe enseguida si esta prenda está en un outfit: el cuadro de la app se esconde de entrada
    // (así no aparece y desaparece). Si después algo falla, vuelve.
    var g0 = indiceGuardado(), escondio = false;
    if (g0 && g0[pid] && !d.getElementById('flb10-app')) { css('flb10-app', '#shop-the-look-container{display:none!important}'); escondio = true; }
    var empezo = false;
    function cargar() {
      if (empezo) return; empezo = true;
      indice().then(function (m) {                              // solo los outfits que tienen esta prenda
        return Promise.all((m[pid] || []).map(function (u) { return kitVisto(u).then(null, function () { return null; }); }));
      }).then(function (ks) {
        var mios = ks.filter(function (k) { return k && k.comps.some(function (c) { return c.pid === pid; }); });
        var cat = catGuardada();                                // si se sacó de OUTFITS hace poco, ya no cuenta (el índice dura 1 h)
        if (cat) mios = mios.filter(function (k) { return cat.indexOf(k.url) > -1; });
        if (!mios.length) { if (escondio) volverApp(); return; }   // la prenda no está en ningún outfit
        css('flb10-app', '#shop-the-look-container{display:none!important}');   // el de la app (mientras siga instalada)
        if (!prendaConStock()) return;                          // esta prenda se agotó: sus outfits no se pueden llevar
        mios = mios.filter(vendible);                           // sin stock o con una prenda oculta: no se muestra
        if (mios.length) armarConjunto(f, mios);
      }).catch(function () { if (escondio && !d.getElementById('flconj')) volverApp(); });   // si algo falla, la app (si está) como estaba
    }
    // no compite con la carga de la ficha: arranca cuando terminó (o a los 4 s)
    if (d.readyState === 'complete') cargar(); else { w.addEventListener('load', cargar); setTimeout(cargar, 4000); }
  }
  function armarConjunto(f, ks) {
    if (d.getElementById('flconj')) return;
    estilosConjunto();
    var items = [];
    ks.forEach(function (k) { k.comps.forEach(function (c) { items.push({ k: k, c: c }); }); });
    var box = d.createElement('div'); box.id = 'flconj';
    box.innerHTML = '<div class="ti"></div><div class="cj" role="group" aria-roledescription="carrusel" aria-label="Outfits con esta prenda">' +
      '<button type="button" class="ch iz" aria-label="Prenda anterior">' + CHEV_IZ + '</button><div class="it" aria-live="off"></div>' +
      '<button type="button" class="ch de" aria-label="Prenda siguiente">' + CHEV_DE + '</button></div>';
    // donde estaba el de la app: debajo del botón de compra (y de las opiniones), antes de «Medios de pago» / «Medios de envío».
    // En compu el bloque 2 ya los sacó del formulario y dejó una marca «flb2» en su lugar: va antes de esa marca, así al girar
    // una tablet (cuando el bloque 2 los devuelve) sigue arriba de ellos.
    var ref = null;
    [].some.call(f.childNodes, function (c) {
      if ((c.nodeType === 1 && (c.id === 'product-shipping-container' || c.classList.contains('js-accordion-container'))) || (c.nodeType === 8 && c.nodeValue === 'flb2')) { ref = c; return true; }
      return false;
    });
    f.insertBefore(box, ref);
    var ti = box.querySelector('.ti'), it = box.querySelector('.it'), n = 0, va = 0, t = null, quieto = false, cambio = null;
    var lento = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function pintar() {
      var x = items[n], c = x.c, k = x.k, ln = c.link || k.url;
      ti.innerHTML = k.pct ? 'Llevá el conjunto completo y ahorrá <b>' + k.pct + '%</b>' : 'Llevá el conjunto completo';
      it.innerHTML = '<a class="fo" href="' + esc(ln) + '"><img alt="' + esc(c.nombre) + '" src="' + esc(talla(c.foto, 240)) + '"></a>' +
        '<div class="in"><a class="nm" href="' + esc(ln) + '" title="' + esc(c.nombre) + '">' + esc(c.nombre) + '</a>' +
        '<div class="pb"><div class="ps">' + (c.lista > c.precio ? '<s>' + plataCent(c.lista) + '</s>' : '') + '<b>' + plataCent(c.precio) + '</b></div>' +
        '<div class="bw"><button type="button" class="bt">Comprar outfit</button></div></div></div>';
    }
    // va = la prenda a la que se está yendo (con dos toques rápidos se cuenta desde ahí, no desde la que todavía se ve)
    function ir(i) {                                            // se apaga, cambia y se prende (medio segundo, como la app)
      clearTimeout(cambio);
      va = (i + items.length) % items.length;
      if (lento) { n = va; pintar(); return; }
      it.classList.add('fu');
      // void offsetWidth: los elementos nuevos arrancan apagados y se prenden en medio segundo (si no, aparecen de golpe)
      cambio = setTimeout(function () { n = va; pintar(); void it.offsetWidth; it.classList.remove('fu'); }, 500);
    }
    function auto() {
      clearInterval(t);
      if (lento || items.length < 2) return;
      t = setInterval(function () { if (!quieto && !d.hidden && !d.getElementById('flomod')) ir(va + 1); }, AUTO_MS);
    }
    // cuando pasa sola no se anuncia (el lector de pantalla no lo lee cada 5 s); con las flechas, sí
    function aMano(i) { it.setAttribute('aria-live', 'polite'); ir(i); auto(); }
    box.querySelector('.iz').onclick = function () { aMano(va - 1); };
    box.querySelector('.de').onclick = function () { aMano(va + 1); };
    box.addEventListener('mouseenter', function () { quieto = true; }); box.addEventListener('mouseleave', function () { quieto = false; });
    box.addEventListener('focusin', function () { quieto = true; });   // con el teclado adentro no cambia sola (no se pierde el foco)
    box.addEventListener('focusout', function (e) { if (!e.relatedTarget || !box.contains(e.relatedTarget)) quieto = false; });
    it.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.bt'); if (!b) return;
      e.preventDefault(); e.stopPropagation();
      var k = items[n].k; abrir({ url: k.url, nombre: k.nombre, desde: 'ficha' });
    });
    pintar(); auto();
    ev('flb10_conjunto_visto', { prendas: items.length, outfits: ks.length });
  }

  /* ---------- 5 · OUTFITS SIN STOCK O CON UNA PRENDA OCULTA: no se muestran en las listas ---------- */
  // Página OUTFITS: se revisa cada kit. Otras listas (búsqueda, relacionados): con lo que ya se sabe (sin bajar nada).
  function noVa(it) { if (!it.classList.contains('flo-no')) it.classList.add('flo-no'); }
  function disponible(it) {
    var cont = it.querySelector('[data-variants]'), v = {};
    try { v = JSON.parse(cont.getAttribute('data-variants'))[0] || {}; } catch (e) {}
    return v.available !== false;
  }
  function urlDe(it) { var a = it.querySelector('a[href*="/productos/"]'); return a ? a.getAttribute('href').replace(/^https?:\/\/[^/]+/, '').replace(/[?#].*$/, '') : ''; }
  function limpiarListas() {
    var its = d.querySelectorAll('.js-item-product[data-product-id]'); if (!its.length) return;
    css('flb10-no', '.js-item-product.flo-no{display:none!important}');
    var enOutfits = enCat(), ids = idsKit(), malos = {}, g = guardados().k;
    Object.keys(g).forEach(function (u) { if (fresco(g[u]) && !vendible(g[u].k)) malos[g[u].k.id] = 1; });
    [].forEach.call(its, function (it) {
      var id = +it.getAttribute('data-product-id');
      if (!id) return;                                          // el molde vacío de la compra rápida del tema
      if (!enOutfits && ids.indexOf(id) < 0 && !malos[id]) return;   // no es un outfit: no se toca
      if (malos[id] || !disponible(it)) { noVa(it); return; }
      if (enOutfits && urlDe(it)) kitVisto(urlDe(it)).then(function (k) { if (!vendible(k)) noVa(it); }, function () {});
    });
  }

  /* ---------- 6 · LISTAS (categorías, búsqueda, relacionados): el botón rápido de un kit abre la ventanita ---------- */
  // El «Comprar» rápido de la grilla no sabe elegir el talle de cada prenda: en un kit agregaría el primero (el 36).
  function idsKit() {                                         // los outfits conocidos: los de ORDEN y los de la lista guardada (con y sin stock)
    var ids = ORDEN.slice();
    try {
      var o = JSON.parse(ss('flb10cat') || '{"l":[]}');
      o.l.concat(o.f || []).forEach(function (x) { if (ids.indexOf(x.id) < 0) ids.push(x.id); });
    } catch (e) {}
    return ids;
  }
  // la página OUTFITS, con o sin la barra del final (el menú y el pie llevan a /shop-the-look sin barra)
  function enCat() { return location.pathname.replace(/\/?$/, '/').indexOf(CAT) === 0; }
  function listas() {
    d.addEventListener('click', function (e) {
      var t = e.target; if (!t || !t.closest) return;
      var it = t.closest('.js-item-product[data-product-id]'); if (!it) return;
      var b = t.closest('.js-addtocart, .js-quickshop-modal-open, [data-component="product-list-item.add-to-cart"], .js-open-quickshop, .js-quickshop-link');
      if (!b || idsKit().indexOf(+it.getAttribute('data-product-id')) < 0) return;
      var a = it.querySelector('a[href*="/productos/"]'); if (!a) return;
      e.preventDefault(); e.stopImmediatePropagation();
      var nom = ((it.querySelector('.js-item-name') || a).textContent || '').replace(/\s+/g, ' ').trim();
      abrir({ url: a.getAttribute('href').replace(/^https?:\/\/[^/]+/, '').replace(/[?#].*$/, ''), nombre: nom });
    }, true);
  }

  function arrancar() {
    var b = d.body;
    if (b.classList.contains('template-home')) inicio();
    if (b.classList.contains('template-product')) { if (w.LS && w.LS.kit_id) fichaKit(); else conjunto(); }
    // la página de outfits (/shop-the-look/): si ya muestra los kits, se esconde la grilla de la app
    if (enCat() && d.querySelector('.js-item-product[data-product-id]')) css('flb10-app', '#shop-the-look-container{display:none!important}');
    limpiarListas();
    if (d.readyState !== 'complete') w.addEventListener('load', limpiarListas);   // grillas que el tema arma después
    listas();
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', arrancar); else arrancar();
})();
