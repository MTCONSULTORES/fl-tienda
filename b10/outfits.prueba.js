/* FL · Bloque 10 (26-oct-2026): OUTFITS con los KITS de Tiendanube. Reemplaza a la app paga Shop the Look.
 * 1) INICIO: la sección «outfits» igual a la de la app (en el celu un look por vez; en la compu dos, cada uno con su tarjeta
 *    de prendas), con «% 10 OFF», precio, cuotas y transferencia. «COMPRAR OUTFIT» abre una ventanita para elegir el talle
 *    de cada prenda (ninguno viene marcado) y suma el KIT al carrito con un solo renglón y el 10% ya aplicado. Si destildan
 *    una prenda, se suma solo la otra (sin el 10%, como en la app).
 *    Los outfits salen de la categoría OUTFITS (/shop-the-look/): un kit nuevo en esa categoría aparece solo. Va primero lo
 *    que no está en ORDEN (lo más nuevo) y después ORDEN. Las prendas, talles y precios de cada kit se leen de su ficha.
 *    Mientras está prendido esconde la sección de la app; si no puede leer los outfits, la de la app queda como estaba.
 * 2) FICHA DEL KIT: Tiendanube deja cada prenda marcada en su primer talle (el jean en 36). Acá ninguno se ve marcado hasta
 *    que la persona elige, y si toca «Agregar» (o la barra fija del celu) sin elegir, se le pide el talle. «¿Me lo bancás?»
 *    no se muestra en los kits (no sabe de combos).
 * EN PRUEBA (PRUEBA = true): solo con ?flprueba (queda prendido al navegar; ?flprueba=0 lo apaga).
 * Va en GitHub (MTCONSULTORES/fl-tienda, b10/) y lo carga un cargador chico en el pie. ES5.
 */
(function () {
  if (window.FLB10) return;
  window.FLB10 = { v: '1.0.0' };
  var PRUEBA = true;
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
  var KITS = {};                                               // url -> promesa del kit
  function traer(url) {
    return fetch(url, { credentials: 'same-origin' }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); });
  }
  function talla(src, n) { return src ? src.replace(/-(50|100|240|320|480|640|1024)-0\.(webp|jpg|png)/, '-' + n + '-0.$2') : ''; }
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
    var tm = html.match(/<meta property="og:title" content="([^"]*)"/); k.nombre = tm ? decodificar(tm[1]) : '';
    var i = html.indexOf('LS.kit_components'), j = html.indexOf('LS.kit_combinations', i);
    var blk = i > -1 ? html.slice(i, j > -1 ? j : i + 60000) : '';
    var re = /index:\s*(\d+),\s*product_id:\s*(\d+),\s*kit_component_id:\s*(\d+),\s*name:\s*("(?:[^"\\]|\\.)*"),\s*quantity:\s*(\d+)[\s\S]*?variants:\s*(\[[\s\S]*?\])\s*\}/g, c;
    while ((c = re.exec(blk))) {
      try { k.comps.push({ idx: +c[1], pid: +c[2], kcid: +c[3], nombre: JSON.parse(c[4]), cant: +c[5], vars: JSON.parse(c[6]), props: [] }); } catch (e) { return null; }
    }
    if (k.comps.length < 2) return null;
    // fotos, links y propiedades (Talle / Color) de cada prenda: del desglose del kit
    var a = html.indexOf('data-component="kit-breakdown"'), b = html.indexOf('js-kit-selections', a);
    if (a > -1 && b > a) {
      var doc = new DOMParser().parseFromString('<div>' + html.slice(html.lastIndexOf('<div', a), b) + '"></div>', 'text/html');
      var lis = doc.querySelectorAll('[data-component="kit-breakdown.item"]');
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
    return k;
  }
  function hayVar(v) { return v && v.available !== false && (v.stock == null || +v.stock > 0); }
  function kit(url) {
    if (!KITS[url]) KITS[url] = traer(url).then(function (h) { var k = leerKit(h, url); if (!k) throw new Error('no es un kit'); return k; });
    KITS[url].catch(function () { delete KITS[url]; });
    return KITS[url];
  }

  /* ---------- la lista de outfits: la categoría OUTFITS ---------- */
  function outfits() {
    if (w.FLB10_LISTA) return Promise.resolve(w.FLB10_LISTA);   // solo para probar antes de publicar los kits
    var c = ss('flb10cat');
    if (c) { try { var o = JSON.parse(c); if (Date.now() - o.t < 6e5 && o.l.length) return Promise.resolve(o.l); } catch (e) {} }
    return traer(CAT).then(function (h) {
      var doc = new DOMParser().parseFromString(h, 'text/html'), l = [], vistos = {};
      [].forEach.call(doc.querySelectorAll('.js-item-product[data-product-id]'), function (it) {
        var id = +it.getAttribute('data-product-id'); if (vistos[id]) return; vistos[id] = 1;
        var a = it.querySelector('a[href*="/productos/"]'), cont = it.querySelector('[data-variants]'), im = it.querySelector('img'), v = {};
        try { v = JSON.parse(cont.getAttribute('data-variants'))[0] || {}; } catch (e) {}
        if (!a || v.available === false) return;                // como la app: si falta una prenda, el look no se muestra
        var src = im ? (mayor(im.getAttribute('data-srcset') || im.getAttribute('srcset')) || im.getAttribute('data-src') || im.getAttribute('src')) : '';
        var nom = (it.querySelector('.js-item-name') || a).textContent || a.getAttribute('title') || '';
        l.push({ id: id, url: a.getAttribute('href').replace(/^https?:\/\/[^/]+/, '').replace(/[?#].*$/, ''), nombre: nom.replace(/\s+/g, ' ').trim(),
          foto: talla(src, 640), precio: +v.price_number || 0, lista: +(v.compare_at_price_number || v.price_number) || 0 });
      });
      l.sort(function (x, y) { var a1 = ORDEN.indexOf(x.id), b1 = ORDEN.indexOf(y.id); return (a1 < 0 ? -1 : a1) - (b1 < 0 ? -1 : b1); });
      if (l.length) ss('flb10cat', JSON.stringify({ t: Date.now(), l: l }));
      return l;
    });
  }

  /* ---------- estilos ---------- */
  function estilos() {
    var F = 'font-family:"Plus Jakarta Sans",sans-serif;';
    css('flb10-css',
      '#flout{margin:40px 0;position:relative;overflow:hidden;color:#000;' + F + 'font-size:12px}#flout *{box-sizing:border-box}' +
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
      '#flout .ar svg{width:34px;height:34px}#flout .ar.iz{left:0}#flout .ar.de{right:0}#flout .ar[disabled]{opacity:.25;cursor:default}' +
      '#flout .cd{display:none}' +
      '@media (min-width:768px){' +
        '#flout .pista{height:600px}#flout .lk{width:300px;height:600px;max-width:none}#flout .ft{height:600px;aspect-ratio:auto}#flout .ft .bt,#flout .bd{display:none}' +
        '#flout .pc{display:none}#flout .cd{display:block;position:absolute;top:74px;width:330px;padding:10px;background:#fff;border-radius:16px;box-shadow:0 0 5px 1px rgba(0,0,0,.1);z-index:1}' +
        '#flout .sl .lk:first-child .cd{right:180px}#flout .sl .lk:last-child:not(:first-child) .cd{left:180px}#flout .sl .lk:only-child .cd{left:auto;right:180px}' +
        '#flout .pr2{display:flex;gap:10px;align-items:center;padding:5px;margin:10px 0;border-radius:16px;box-shadow:0 0 5px 1px rgba(0,0,0,.1);min-height:110px}' +
        '#flout .pr2 img{width:100px;height:100px;object-fit:cover;border-radius:16px;box-shadow:0 0 5px 1px rgba(0,0,0,.1);margin:0 5px 0 6px;flex:0 0 100px;max-width:none;background:#eee}' +
        '#flout .pr2 .in{display:flex;flex-direction:column;gap:5px;min-width:0}#flout .pr2 .n{font-size:13px;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px}' +
        '#flout .pr2 .p{display:flex;gap:5px;align-items:center;font-size:13px}#flout .pr2 .p b{font-weight:700}#flout .pr2 .p s{font-weight:300}' +
        '#flout .co{display:inline-block;width:80px;height:27px;padding:5px;font:400 13px Arial,sans-serif;text-transform:none;text-decoration:none;text-align:center;line-height:17px;border-radius:5%}' +
        '#flout .pr2.vac{background:linear-gradient(90deg,#f3f0ea,#fbfaf7,#f3f0ea);background-size:200% 100%;animation:flosk 1.2s infinite}' +
        '@keyframes flosk{to{background-position:-200% 0}}' +
        '#flout .ld{display:flex;flex-direction:column;align-items:center;gap:10px;margin:10px 0}#flout .ld .rw{gap:7px}#flout .ld .ls{font-size:15px;font-weight:400}#flout .ld .pr{font-size:17px;font-weight:400}#flout .ld .of{display:block}' +
        '#flout .ld .bt{height:40px;padding:0 15px;font-size:15px}' +
      '}' +
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
  function esCompu() { return w.matchMedia('(min-width:768px)').matches; }
  function inicio() {
    var app = d.getElementById('shop-the-look-container'), dest = d.querySelector('.section-featured-home');
    var ancla = app || dest; if (!ancla || d.getElementById('flout')) return;
    estilos();
    css('flb10-app', '#shop-the-look-container{display:none!important}');   // la de la app, escondida mientras está la nuestra
    var s = d.createElement('section'); s.id = 'flout'; s.setAttribute('aria-label', 'Outfits'); s.style.minHeight = esCompu() ? '600px' : '590px';
    ancla.parentNode.insertBefore(s, ancla);
    var cargo = false;
    function cargar() {
      if (cargo) return; cargo = true;
      outfits().then(function (l) {
        if (!l.length) throw new Error('sin outfits');
        dibujar(s, l); s.style.minHeight = '';
        ev('flb10_outfits_vistos', { looks: l.length });
      }).catch(function () {                                    // si falla: vuelve la de la app, como estaba
        s.parentNode && s.parentNode.removeChild(s);
        var st = d.getElementById('flb10-app'); if (st) st.parentNode.removeChild(st);
      });
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
  function dibujar(s, l) {
    var porSl = esCompu() ? 2 : 1, h = '', i;
    var porUrl = {}; l.forEach(function (o) { porUrl[o.url] = o; });
    for (i = 0; i < l.length; i += porSl) h += '<div class="sl">' + l.slice(i, i + porSl).map(tarjetaLook).join('') + '</div>';
    s.innerHTML = '<div class="pista">' + h + '</div><button type="button" class="ar iz" aria-label="Outfit anterior">' + FLECHA + '</button>' +
      '<button type="button" class="ar de" aria-label="Outfit siguiente" style="transform:scaleX(-1)">' + FLECHA + '</button>';
    var p = s.querySelector('.pista'), sls = s.querySelectorAll('.sl'), quieto = false, t = null;
    function actual() { return Math.round(p.scrollLeft / Math.max(1, p.clientWidth)); }
    function ir(n) { n = (n + sls.length) % sls.length; p.scrollTo({ left: n * p.clientWidth, behavior: 'smooth' }); }
    s.querySelector('.iz').onclick = function () { quieto = true; ir(actual() - 1); };
    s.querySelector('.de').onclick = function () { quieto = true; ir(actual() + 1); };
    function auto() { clearInterval(t); t = setInterval(function () { if (!quieto && !d.hidden && !d.getElementById('flomod')) ir(actual() + 1); }, AUTO_MS); }
    ['pointerdown', 'touchstart', 'wheel'].forEach(function (n) { p.addEventListener(n, function () { quieto = true; }, { passive: true }); });
    s.addEventListener('mouseenter', function () { quieto = true; }); s.addEventListener('mouseleave', function () { quieto = false; });
    auto();
    // en la compu cada tarjeta lista sus 2 prendas: se leen las del slide que se ve y el siguiente
    function prendas(n) {
      if (!esCompu() || !sls[n]) return;
      [].forEach.call(sls[n].querySelectorAll('.lk'), function (lk) {
        if (lk.__flp) return; lk.__flp = 1;
        kit(lk.getAttribute('data-url')).then(function (k) {
          lk.querySelector('.ps').innerHTML = k.comps.map(function (c) {
            return '<div class="pr2"><img alt="" loading="lazy" src="' + esc(c.foto) + '"><div class="in"><span class="n" title="' + esc(c.nombre) + '">' + esc(c.nombre) + '</span>' +
              '<div class="p"><b>' + plataCent(c.precio) + '</b>' + (c.lista > c.precio ? '<s>' + plataCent(c.lista) + '</s>' : '') + '</div>' +
              (c.link ? '<a class="co" href="' + esc(c.link) + '">Comprar</a>' : '') + '</div></div>';
          }).join('');
        }).catch(function () { lk.__flp = 0; });
      });
    }
    prendas(0); prendas(1);
    p.addEventListener('scroll', function () { var n = actual(); prendas(n); prendas(n + 1); }, { passive: true });
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.bt'); if (!b) return;
      e.preventDefault(); e.stopPropagation(); quieto = true;
      var lk = b.closest('.lk'); abrir(porUrl[lk.getAttribute('data-url')]);
    });
  }

  /* ---------- 2 · VENTANITA «COMPRAR OUTFIT» ---------- */
  function abrir(o) {
    estilos(); cerrar();
    var m = d.createElement('div'); m.id = 'flomod'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-label', o.nombre);
    m.innerHTML = '<div class="bx"><div class="hd"><b>' + esc(o.nombre) + '</b><button type="button" class="x" aria-label="Cerrar">×</button></div><div class="cu"><div class="cg">Cargando…</div></div></div>';
    d.body.appendChild(m); d.documentElement.classList.add('flomod-on');
    m.addEventListener('click', function (e) { if (e.target === m || (e.target.closest && e.target.closest('.x'))) cerrar(); });
    d.addEventListener('keydown', escTecla);
    ev('flb10_abrir', { outfit: o.nombre });
    kit(o.url).then(function (k) { if (d.getElementById('flomod') === m) armar(m, k); })
      .catch(function () { location.href = o.url; });          // si no se puede leer el kit, va a su ficha
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

  function arrancar() {
    var b = d.body;
    if (b.classList.contains('template-home')) inicio();
    if (b.classList.contains('template-product') && w.LS && w.LS.kit_id) fichaKit();
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', arrancar); else arrancar();
})();
