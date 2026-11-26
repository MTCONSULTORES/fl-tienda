/* FL bloque 15 · COMPRA MÁS FÁCIL · v1.0.7 (26-nov-2026: Black Friday estilo Cyber: bf() apagado (el 15 % ya viene en el precio de cada prenda y no hay más descuento en el carrito) y 9 cuotas sin interés del 26-nov al 30-nov o con ?flcyber; v1.0.6 = 25-nov-2026: banner de las categorías con la foto del producto sin velo ni filtro, y en Bermudas la bermuda Waze; v1.0.5 = banner más claro, NO le gustó; v1.0.4 = el número de cada botón de talle cuenta solo las prendas que HAY; v1.0.3 = sin carteles «HAY TU 44» y SOLO las prendas que tienen tu talle; v1.0.2 = + Black Friday 25 al 30-nov, ver bf() más abajo) (ideas 1, 2 y 4 del análisis con Clarity del 19-nov-2026).
   OK de Facundo el 20-nov-2026 después de ver la página de prueba: «si me gustó, probémoslo, capaz esto hace que vendamos más».
   1) «Comprá sin bajar» (ficha, solo celu): barra fija desde el primer momento con el precio por transferencia, los talles
      como botones y el botón de agregar. La barra vieja de GTM (#flbarra) queda escondida mientras esta está.
   2) «Un solo cartel después de agregar» (todas las páginas, celu y compu): en vez del aviso del tema + la ventana de la
      fragancia + el «Fulano compró», una sola hoja con IR A PAGAR (total por transferencia y con tarjeta), SEGUIR MIRANDO,
      cuánto falta para el envío gratis y la fragancia con su botón SUMAR. IR A PAGAR va directo a la caja de Tiendanube.
   4) «La tienda en tu talle» (categorías y búsqueda): el talle se recuerda (localStorage flTalle) y se muestran SOLO las
      prendas que lo tienen disponible, sin ningún cartel (v1.0.3: antes «✓ HAY TU 42» en cada tarjeta, un aviso «N prendas no
      tienen tu 42 · verlas igual» y se colaban las de otro tipo de talle, como un jort S/M/L en Bermudas). Queda «Tu talle: 42 ·
      ver todo». Sin talle elegido, las que tienen la mitad o más de sus talles agotados van al final de cada tanda con
      «ÚLTIMOS TALLES». (v1.0.4: el número chico de cada botón de talle lo pone la tienda y cuenta también las prendas AGOTADAS
      en ese talle —37 en el 44 y se veían 33—; con un talle elegido se recuenta con lo que hay: las tarjetas cargadas + las
      páginas que faltan, ver contarTodo().)
   Y en el carrito: renglón «Pagando por transferencia: $X» debajo del total.
   Arreglo de paso: con una ventanita del tema abierta (compra rápida, menú) la franja de cookies se esconde; en el celu
   tapaba el botón «Agregar al carrito» de la compra rápida a quien entraba por primera vez.
   Cuentas: transferencia = 20 % menos sobre el total del carrito (Tiendanube lo aplica sobre todo: también sobre la fragancia
   a $19.000 y las prendas rebajadas; comprobado con 837 pedidos); cuotas = 6 sin interés (como el resto de la tienda);
   envío gratis = el monto que dice la barra de anuncios («Envío gratis superando $180.000»); si no lo dice, no se muestra.
   Apagarlo en un celu para comparar: ?flb15=0 (vuelve con ?flb15=1). Para medir: eventos de Clarity flb15_* y etiqueta flb15.
   ⚠️ IR A PAGAR no toca el «Iniciar compra» del tema: el evento «Finalizar la compra» de Clarity baja solo; medir con
   flb15_pagar + pedidos reales.
   ES5 a propósito (Safari viejos). No llamar CSS a ninguna variable (tapa window.CSS). */
(function (w, d) {
  if (w.FLB15) return;
  var V = '1.0.7';
  w.FLB15 = { v: V };
  try {
    var qs = w.location.search || '';
    if (/[?&]flb15=0/.test(qs)) w.sessionStorage.setItem('flb15off', '1');
    if (/[?&]flb15=1/.test(qs)) w.sessionStorage.removeItem('flb15off');
    if (w.sessionStorage.getItem('flb15off')) { w.FLB15.apagado = 1; return; }
  } catch (e) {}

  var TALLE_KEY = 'flTalle', TRANSF = 0.8, CUOTAS = 6;
  // v1.0.7: 9 cuotas sin interés en toda la web del jue 26-nov 00:00 al mar 1-dic 00:00 (Argentina), igual que el sello (FLP) y el bloque 13
  try { var t9 = Date.now(); if ((t9 >= Date.parse('2026-11-26T00:00:00-03:00') && t9 < Date.parse('2026-12-01T00:00:00-03:00')) || w.sessionStorage.getItem('flcyber') === '1') CUOTAS = 9; } catch (e9) {}
  // Black Friday 2026: viernes 27-nov 00:00 → martes 1-dic 00:00 (Argentina). Precios de lista subidos 11,12 %: la promoción del carrito
  // descuenta 10 % a todo, así que en la barra se muestra el precio CON el 10 % (y el de lista tachado). ?flbf lo prende para probar.
  function bf() {
    return false;   // v1.0.7 (26-nov): el Black Friday pasó al estilo Cyber: sin 10 % en el carrito
    if (w.FLBF) return !!w.FLBF.activa;
    var t = Date.now(), a = t >= Date.parse('2026-11-25T00:00:00-03:00') && t < Date.parse('2026-12-01T00:00:00-03:00');
    try { var q = w.location.search || ''; if (/[?&]flbf=0(?:&|$)/.test(q)) return a; if (/[?&]flbf(?:[=&]|$)/.test(q) || w.sessionStorage.getItem('flbf') === '1') a = true; } catch (e) {}
    return a;
  }

  /* ---------- utilidades ---------- */
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); }
  function coincide(el, s) { var f = el.matches || el.webkitMatchesSelector || el.msMatchesSelector; return f ? f.call(el, s) : false; }
  function cerca(el, s) { while (el && el.nodeType === 1) { if (coincide(el, s)) return el; el = el.parentNode; } return null; }
  function buscar(a, fn) { for (var i = 0; i < a.length; i++) if (fn(a[i], i)) return a[i]; return null; }
  function texto(el) { return el ? String(el.textContent || '').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '') : ''; }
  function plata(n) { n = Math.floor((+n || 0) + 1e-6); return '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function num(s) { s = String(s || '').replace(/[^\d,]/g, '').replace(/,\d*$/, ''); return +s || 0; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function marcar(ev) {
    try { if (typeof w.clarity === 'function') w.clarity('event', 'flb15_' + ev); } catch (e) {}
    try { (w.dataLayer = w.dataLayer || []).push({ event: 'flb15_' + ev }); } catch (e) {}
  }
  function tipoTalle(v) {
    v = String(v || '').replace(/^\s+|\s+$/g, '').toUpperCase();
    if (/^\d{2}$/.test(v) && +v >= 26 && +v <= 60) return 'abajo';
    if (/^(XXS|XS|S|M|L|XL|XXL|XXXL|2XL|3XL)$/.test(v)) return 'arriba';
    return null;
  }
  function normTalle(v) { return String(v || '').replace(/^\s+|\s+$/g, '').toUpperCase(); }
  function leerTalles() { try { var o = JSON.parse(w.localStorage.getItem(TALLE_KEY) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; } }
  function guardarTalle(v) {
    var t = tipoTalle(v); if (!t) return;
    var o = leerTalles(); o[t] = normTalle(v);
    try { w.localStorage.setItem(TALLE_KEY, JSON.stringify(o)); } catch (e) {}
  }
  function borrarTalle(t) { var o = leerTalles(); delete o[t]; try { w.localStorage.setItem(TALLE_KEY, JSON.stringify(o)); } catch (e) {} }
  function variantesDe(el) {
    var c = el && (coincide(el, '[data-variants]') ? el : $('[data-variants]', el));
    if (!c) return [];
    try { return JSON.parse(c.getAttribute('data-variants')) || []; } catch (e) { return []; }
  }
  function tallesDe(v, tipo) {
    var r = [], o = [v.option0, v.option1, v.option2];
    for (var i = 0; i < o.length; i++) if (o[i] && tipoTalle(o[i]) === tipo) r.push(normTalle(o[i]));
    return r;
  }
  function listo(fn) { if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', fn); else fn(); }
  function envioGratis() {
    var m = /env[ií]o gratis[^$]{0,40}\$\s?([\d.]{5,})/i.exec(texto($('.js-adbar') || $('[class*="adbar"]')));
    return m ? num(m[1]) : 0;
  }
  function raf(fn) { (w.requestAnimationFrame || function (f) { setTimeout(f, 16); })(fn); }

  /* ---------- estilos ---------- */
  var ESTILO = [
    ':root{--flb-bordo:#540c0c;--flb-crema:#f0ebe3;--flb-negro:#111;--flb-gris:#776b63;--flb-linea:#d8cfc4}',
    /* «hidden» pierde contra los display:flex de abajo: que siempre esconda */
    '#flb-barra [hidden],#flb-hoja [hidden]{display:none!important}',
    /* 1 · barra de compra */
    'body.flb-ficha #flbarra{display:none!important}',
    'body.flb-escribe #flb-barra{display:none!important}',
    'body.flb-ficha{padding-bottom:var(--flb-alto,180px)!important}',
    '#flb-barra{position:fixed;left:0;right:0;bottom:0;z-index:9995;background:var(--flb-crema);border-top:1px solid var(--flb-linea);box-shadow:0 -10px 24px -14px rgba(0,0,0,.45);padding:9px 14px 11px;padding-bottom:calc(11px + env(safe-area-inset-bottom,0px));font-family:inherit;color:var(--flb-negro);-webkit-tap-highlight-color:transparent}',
    '#flb-barra>*+*{margin-top:7px}',
    '#flb-barra .fila{display:flex;align-items:center;min-width:0;flex-wrap:wrap}',
    '#flb-barra .nm{font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0}',
    '#flb-barra .tp{background:var(--flb-bordo);color:#fff;font-weight:800;font-size:17px;line-height:1.1;padding:5px 9px;border-radius:3px;white-space:nowrap;margin:2px 8px 2px 0}',
    '#flb-barra .tp small{font-size:11px;font-weight:700;letter-spacing:.03em}',
    '#flb-barra .sub{font-size:10.5px;color:var(--flb-gris);line-height:1.25;white-space:nowrap}',
    '#flb-barra .sub s{margin-right:4px}',
    '#flb-barra .chips{display:flex;align-items:center;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:9px 0 1px}',
    '#flb-barra .chips::-webkit-scrollbar{display:none}',
    '#flb-barra .chips>*{margin-right:6px}',
    '#flb-barra .lab{font-size:10px;letter-spacing:.12em;font-weight:700;flex:none}',
    '#flb-barra .chip{position:relative;flex:none;min-width:38px;height:32px;padding:0 6px;border:1.5px solid var(--flb-negro);border-radius:3px;background:transparent;color:var(--flb-negro);font-weight:700;font-size:13px;line-height:1;font-family:inherit;display:flex;align-items:center;justify-content:center;cursor:pointer}',
    '#flb-barra .chip.on{background:var(--flb-negro);color:#fff}',
    '#flb-barra .chip.off{border-color:var(--flb-linea);color:#b3a79e;text-decoration:line-through}',
    '#flb-barra .chip.off.on{background:#d9cfc6;color:#6d625b}',
    '#flb-barra .chip .tu{position:absolute;top:-9px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);background:#f2c200;color:#111;font:800 7px/1 system-ui,-apple-system,sans-serif;letter-spacing:.06em;padding:2px 3px;border-radius:2px;white-space:nowrap}',
    '#flb-barra .qt{flex:none;font-size:11px;text-decoration:underline;color:var(--flb-negro);background:none;border:0;padding:0 2px;font-family:inherit;white-space:nowrap;cursor:pointer}',
    '#flb-barra .btn{-webkit-appearance:none;appearance:none;display:block;border:0;border-radius:3px;background:var(--flb-negro);color:#fff;font-weight:700;font-size:12.5px;line-height:1;font-family:inherit;letter-spacing:.16em;padding:14px 8px;text-transform:uppercase;width:100%;cursor:pointer;margin-left:0;margin-right:0}',
    '#flb-barra .btn.espera{background:#3b3532}',
    '#flb-barra .btn.avisa{background:#fff;color:var(--flb-negro);border:1.5px solid var(--flb-negro)}',
    '#flb-barra .msg{font-size:11px;color:var(--flb-bordo);font-weight:700}',
    '#flb-barra.sacude .chips{-webkit-animation:flbSac .4s;animation:flbSac .4s}',
    '@-webkit-keyframes flbSac{20%{-webkit-transform:translateX(-6px)}40%{-webkit-transform:translateX(6px)}60%{-webkit-transform:translateX(-4px)}80%{-webkit-transform:translateX(4px)}}',
    '@keyframes flbSac{20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}',
    'body.flb-ficha .js-notification-cookie-banner{bottom:var(--flb-alto,180px)!important;padding-top:6px!important;padding-bottom:6px!important;font-size:10.5px!important;line-height:1.3!important}',
    'body.flb-ficha .btn-whatsapp{bottom:calc(var(--flb-alto,180px) + 10px)!important;margin-bottom:0!important}',
    /* 2 · un solo cartel */
    'body.template-product [id^="funsales-popup"],body.template-product .funsales-popup-comprando-agora,body.template-cart [id^="funsales-popup"],body.template-cart .funsales-popup-comprando-agora{display:none!important}',
    'body.flb-silencio .js-alert-added-to-cart{display:none!important}',
    /* con una ventanita del tema abierta (compra rápida, menú, carrito) la franja de cookies tapaba su botón de abajo */
    'body.overflow-none .js-notification-cookie-banner{display:none!important}',
    'body.flb-silencio #js-cross-selling-modal,body.flb-silencio .js-modal-overlay[data-modal-id="#js-cross-selling-modal"]{display:none!important}',
    '#flb-velo{position:fixed;top:0;right:0;bottom:0;left:0;z-index:40005;background:rgba(17,17,17,.55);opacity:0;-webkit-transition:opacity .2s;transition:opacity .2s}',
    '#flb-hoja{position:fixed;left:0;right:0;bottom:0;z-index:40010;background:var(--flb-crema);color:var(--flb-negro);border-radius:14px 14px 0 0;padding:10px 16px 16px;padding-bottom:calc(16px + env(safe-area-inset-bottom,0px));-webkit-transform:translateY(105%);transform:translateY(105%);-webkit-transition:-webkit-transform .28s cubic-bezier(.2,.8,.2,1);transition:transform .28s cubic-bezier(.2,.8,.2,1);font-family:inherit;max-width:520px;margin:0 auto;box-sizing:border-box;max-height:92vh;overflow-y:auto}',
    '#flb-hoja>*+*{margin-top:10px}',
    '#flb-hoja.ve{-webkit-transform:none;transform:none}#flb-velo.ve{opacity:1}',
    '#flb-hoja .asa{width:38px;height:4px;border-radius:2px;background:var(--flb-linea);margin:0 auto 2px}',
    '#flb-hoja .ok{display:flex;align-items:center}',
    '#flb-hoja .ok img{width:54px;height:68px;object-fit:cover;border-radius:3px;background:#ddd;margin-right:12px;flex:none}',
    '#flb-hoja .ok b{display:block;color:var(--flb-bordo);font-size:13px;letter-spacing:.02em}',
    '#flb-hoja .ok span{font-size:13px}',
    '#flb-hoja .x{margin-left:auto;-ms-flex-item-align:start;align-self:flex-start;background:none;border:0;font-size:24px;line-height:1;padding:2px 4px;color:var(--flb-negro);cursor:pointer}',
    '#flb-hoja .pagar{-webkit-appearance:none;appearance:none;display:block;width:100%;border:0;border-radius:3px;background:var(--flb-bordo);color:#fff;padding:13px 10px 11px;font-family:inherit;text-align:center;cursor:pointer}',
    '#flb-hoja .pagar b{display:block;font-size:13.5px;letter-spacing:.14em}',
    '#flb-hoja .pagar span{display:block;font-size:12px;opacity:.92;margin-top:4px}',
    '#flb-hoja .seguir{-webkit-appearance:none;appearance:none;display:block;width:100%;background:transparent;border:1.5px solid var(--flb-negro);border-radius:3px;color:var(--flb-negro);font-weight:700;font-size:12px;line-height:1;font-family:inherit;letter-spacing:.16em;padding:12px;cursor:pointer}',
    '#flb-hoja .envio{font-size:12px}',
    '#flb-hoja .envio i{display:block;height:5px;border-radius:3px;background:var(--flb-linea);margin-top:5px;overflow:hidden}',
    '#flb-hoja .envio i em{display:block;height:100%;width:0;background:var(--flb-bordo);-webkit-transition:width .4s;transition:width .4s}',
    '#flb-hoja .ups{display:flex;align-items:center;border:1px solid var(--flb-linea);background:#fff;border-radius:4px;padding:8px 10px}',
    '#flb-hoja .ups img{width:42px;height:42px;object-fit:cover;border-radius:3px;margin-right:10px;flex:none}',
    '#flb-hoja .ups p{margin:0 10px 0 0;font-size:12px;line-height:1.35;flex:1;min-width:0}',
    '#flb-hoja .ups p b{color:var(--flb-bordo)}',
    '#flb-hoja .ups p s{color:var(--flb-gris);margin-left:3px}',
    '#flb-hoja .sumar{-webkit-appearance:none;appearance:none;flex:none;background:transparent;border:1.5px solid var(--flb-bordo);border-radius:3px;color:var(--flb-bordo);font-weight:700;font-size:11px;line-height:1;font-family:inherit;letter-spacing:.14em;padding:10px 12px;cursor:pointer;white-space:nowrap}',
    '#flb-hoja .sumar:active{background:var(--flb-bordo);color:#fff}',
    '#flb-hoja .ups .listo{flex:none;background:var(--flb-bordo);color:#fff;border-radius:3px;font-weight:700;font-size:11px;line-height:1;letter-spacing:.14em;padding:10px 12px;white-space:nowrap}',
    '@media (min-width:768px){#flb-hoja{left:50%;right:auto;bottom:auto;top:50%;width:440px;border-radius:10px;padding:14px 20px 20px;opacity:0;-webkit-transform:translate(-50%,-44%);transform:translate(-50%,-44%);-webkit-transition:opacity .2s,-webkit-transform .25s;transition:opacity .2s,transform .25s}#flb-hoja.ve{opacity:1;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}#flb-hoja .asa{display:none}}',
    /* carrito: total por transferencia */
    '.flb-transf{text-align:right;font-size:14px;margin-top:6px;color:var(--flb-negro)}',
    '.flb-transf b.v{background:var(--flb-bordo);color:#fff;padding:3px 7px;border-radius:3px;margin-left:4px;white-space:nowrap}',
    /* 4 · tu talle en categorías */
    '.flb-tall-on .tall .bt a{position:relative}',
    '.flb-tall-on .tall .bt a.flb-sel{background:#111!important;color:#fff!important;border-color:#111!important}',
    '.flb-tall-on .tall .bt a.flb-sel span{color:#f2c200!important}',
    '.flb-tall-on .tall .bt a.flb-cero{opacity:.4}',
    '#flb-tutalle{margin:10px 0 4px;font-size:12.5px;display:flex;flex-wrap:wrap;align-items:center;color:var(--flb-negro)}',
    '#flb-tutalle>*{margin:2px 10px 2px 0}',
    '#flb-tutalle b{background:#111;color:#fff;padding:3px 7px;border-radius:3px;letter-spacing:.06em}',
    '#flb-tutalle button{background:none;border:0;padding:0;text-decoration:underline;font:inherit;color:var(--flb-negro);cursor:pointer}',
    '#flb-strip{margin:12px 0 6px}',
    '#flb-strip .hd{font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;margin-bottom:6px}',
    '#flb-strip .bt{display:flex;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}',
    '#flb-strip .bt a{flex:none;min-width:42px;padding:8px 6px;margin-right:6px;border:2px solid #111;border-radius:4px;text-align:center;font-weight:800;color:#111;text-decoration:none}',
    '#flb-strip .bt a.flb-sel{background:#111;color:#fff}',
    '.js-item-product.flb-oculta{display:none!important}',
    '.flb-badge{position:absolute;left:6px;bottom:6px;z-index:5;background:#111;color:#fff;font:800 9.5px/1 system-ui,-apple-system,sans-serif;letter-spacing:.06em;padding:4px 6px;border-radius:2px;pointer-events:none}',
    '.flb-badge.poco{background:#fff;color:#540c0c;border:1px solid #540c0c}',
    /* 5 · banner de las categorías (lo arma el bloque 7 del pie): la foto del producto TAL CUAL, sin velo ni filtro (v1.0.6, pedido de
       Facundo 25-nov: «que se vea el producto directamente sin filtro, ni negro ni claro»). El bloque 7 le pone un velo negro (.74 a la
       izquierda, .5 abajo) encima de una foto que ya es oscura: se saca el velo. Probado aclararlo (v1.0.5: fondo gris + mezcla screen +
       brillo) y NO le gustó: queda lavado/feo. Solo queda una sombra suave detrás de las letras del título para que se lea sobre fotos claras. */
    '#flcatp .por:before{display:none!important}',
    '#flcatp h2{text-shadow:0 1px 10px rgba(0,0,0,.45)}'
  ].join('\n');

  /* banner de una categoría con la foto de un producto elegido a mano (por defecto el bloque 7 usa la del primer producto de la lista).
     Facundo 25-nov: en Bermudas, la bermuda Waze. Se carga la foto aparte y recién cuando está lista se cambia, para no dejar el banner vacío. */
  var BANNERS = {
    '/bermudas-mom/': {
      img: 'https://acdn-us.mitiendanube.com/stores/004/997/328/products/00c0c4bf-e4b2-4cb3-b862-45fa84429338-1bb71847767570bb6d17913861651090-1024-1024.webp',
      pos: '50% 28%'
    }
  };
  function bannerCategoria() {
    var cfg = BANNERS[(w.location.pathname || '').replace(/\/*$/, '/')]; if (!cfg || !w.Image) return;
    var n = 0;
    (function esperar() {
      var por = $('#flcatp .por');
      if (!por) { if (n++ < 40) setTimeout(esperar, 100); return; }
      var im = new w.Image();
      im.onload = function () { por.style.backgroundImage = 'url("' + cfg.img + '")'; por.style.backgroundPosition = cfg.pos; };
      im.src = cfg.img;
    })();
  }

  function ponerEstilos() {
    if ($('#flb15-css')) return;
    var s = d.createElement('style'); s.id = 'flb15-css'; s.appendChild(d.createTextNode(ESTILO));
    (d.head || d.documentElement).appendChild(s);
  }

  /* =========================================================
     IDEA 1 · Comprá sin bajar (ficha, celu)
     ========================================================= */
  var ficha = null;
  function formPrincipal() {
    var sp = $('#single-product');
    var f = sp ? $('.js-product-form', sp) : null;
    if (f) return f;
    return buscar($$('.js-product-form'), function (x) { return !cerca(x, '.js-item-product, .js-modal, #quickshop-modal, #js-cross-selling-modal'); });
  }
  function botonOriginal() { return ficha && ($('.js-addtocart:not(.js-addtocart-placeholder)', ficha.form) || $('.js-addtocart', ficha.form)); }
  function gruposDom() { return $$('.js-product-variants-group', ficha.form); }
  function anclaDe(g, op) {
    var el = gruposDom()[g.i]; if (!el) return null;
    return buscar($$('a.js-insta-variant', el), function (a) { return a.getAttribute('data-option') === op; });
  }

  function iniciarFicha() {
    if (w.innerWidth >= 768) return;
    var form = formPrincipal(); if (!form || $('#flb-barra')) return;
    // los OUTFITS (kits) eligen el talle de cada prenda en su propio cuadro: ahí queda la ficha como está
    if ($('[data-store="product-kit-components"], .js-kit-component-variant', form)) return;
    var cont = cerca(form, '[data-variants]') || $('[data-variants]', form);
    ficha = { form: form, vars: variantesDe(cont), nombre: texto($('#single-product h1') || $('h1')), sel: {}, grupos: [], t: 0 };
    $$('.js-product-variants-group', form).forEach(function (el, i) {
      var ops = $$('a.js-insta-variant', el).map(function (a) { return a.getAttribute('data-option'); });
      if (!ops.length) return;
      var lab = texto($('.form-label', el)).split(':')[0] || 'Talle';
      ficha.grupos.push({ i: i, id: el.getAttribute('data-variation-id') || String(i), lab: lab, opciones: ops, unica: ops.length === 1 });
    });
    // un grupo con una sola opción (un solo color, «Unico») se elige solo y no se muestra; el color que la ficha ya trae
    // marcado se respeta (el código de la tienda solo desmarca el TALLE)
    ficha.grupos.forEach(function (g) {
      if (g.unica) { ficha.sel[g.id] = g.opciones[0]; return; }
      if (buscar(g.opciones, tipoTalle)) return;
      var el = $$('.js-product-variants-group', form)[g.i], a = el && $('a.js-insta-variant.selected', el);
      if (a) ficha.sel[g.id] = a.getAttribute('data-option');
    });

    var b = d.createElement('div'); b.id = 'flb-barra';
    b.innerHTML = '<div class="fila"><span class="nm"></span></div>' +
      '<div class="fila"><span class="tp"></span><span class="sub"></span></div>' +
      '<div class="gr"></div><div class="msg" hidden></div>' +
      '<button type="button" class="btn">Elegí tu talle</button>';
    d.body.appendChild(b);
    d.body.className += ' flb-ficha';
    $('.nm', b).textContent = ficha.nombre;
    $('.btn', b).addEventListener('click', tocarBoton);
    pintarTodo();
    var medir = function () { if (b.isConnected !== false) d.documentElement.style.setProperty('--flb-alto', b.offsetHeight + 'px'); };
    ficha.medir = medir;
    medir();
    if (w.ResizeObserver) new w.ResizeObserver(medir).observe(b); else w.addEventListener('resize', medir);
    // con el teclado abierto (código postal, cantidad) la barra se esconde para no tapar lo que se escribe
    var esTexto = function (el) { return el && (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && !/^(submit|button|radio|checkbox|hidden|image|reset)$/i.test(el.type))); };
    d.addEventListener('focusin', function (e) { if (esTexto(e.target) && !cerca(e.target, '#flb-barra')) { d.body.className += ' flb-escribe'; } }, true);
    d.addEventListener('focusout', function () { setTimeout(function () { if (!esTexto(d.activeElement)) d.body.className = d.body.className.replace(/\s*\bflb-escribe\b/g, ''); }, 50); }, true);

    // si la persona elige el talle con los botones de la página (o con «¿Qué talle soy?»), la barra lo sigue
    form.addEventListener('click', function (e) {
      var a = cerca(e.target, 'a.js-insta-variant'); if (!a) return;
      var gi = gruposDom().indexOf(cerca(a, '.js-product-variants-group'));
      var g = buscar(ficha.grupos, function (x) { return x.i === gi; });
      if (g) { ficha.sel[g.id] = a.getAttribute('data-option'); repintarLuego(); }
    }, true);
    // si la página cambia el estado de los talles (stock según el color), repintar
    if (w.MutationObserver) new MutationObserver(repintarLuego).observe($('.js-product-variants', form) || form, { subtree: true, attributes: true, attributeFilter: ['class'] });
    // el código propio de la tienda desmarca el talle al cargar: las opciones únicas se marcan después; «¿Qué talle soy?» llega más tarde
    setTimeout(function () {
      ficha.grupos.forEach(function (g) { if (g.unica) { var a = anclaDe(g, g.opciones[0]); if (a && !/\bselected\b/.test(a.className)) a.click(); } });
      pintarTodo();
    }, 1200);
    setTimeout(pintarTodo, 3500);
  }

  function repintarLuego() { clearTimeout(ficha.t); ficha.t = setTimeout(pintarTodo, 60); }
  function pintarTodo() { try { pintarGrupos(); pintarPrecio(); pintarBoton(); if (ficha.medir) ficha.medir(); } catch (e) {} }
  function mensaje(t) { var m = $('#flb-barra .msg'); if (!m) return; m.textContent = t || ''; m.hidden = !t; if (ficha.medir) ficha.medir(); }
  function grupoTalle() { return buscar(ficha.grupos, function (g) { return !g.unica && buscar(g.opciones, tipoTalle); }) || null; }

  function pintarGrupos() {
    var cont = $('#flb-barra .gr'); if (!cont) return;
    var tus = leerTalles();
    // que la fila de talles no vuelva al principio cada vez que se repinta (jeans 36 a 52 no entran en el celu)
    var corrido = $$('.chips', cont).map(function (f) { return f.scrollLeft; });
    cont.innerHTML = '';
    var visibles = ficha.grupos.filter(function (g) { return !g.unica; });
    var gQt = grupoTalle() || visibles[visibles.length - 1];
    visibles.forEach(function (g) {
      var fila = d.createElement('div'); fila.className = 'chips';
      var lab = d.createElement('span'); lab.className = 'lab'; lab.textContent = g.lab.toUpperCase();
      fila.appendChild(lab);
      g.opciones.forEach(function (op) {
        var a = anclaDe(g, op);
        var sinStock = a && /\bbtn-variant-no-stock\b/.test(a.className);
        var c = d.createElement('button'); c.type = 'button';
        c.className = 'chip' + (sinStock ? ' off' : '') + (ficha.sel[g.id] === op ? ' on' : '');
        c.textContent = op;
        var t = tipoTalle(op);
        if (t && tus[t] && normTalle(op) === tus[t]) { var m = d.createElement('span'); m.className = 'tu'; m.textContent = 'TU TALLE'; c.appendChild(m); }
        c.addEventListener('click', function () { elegir(g, op); });
        fila.appendChild(c);
      });
      if (g === gQt) {
        var qt = $('#flb4 button');
        if (qt) {
          var q = d.createElement('button'); q.type = 'button'; q.className = 'qt'; q.textContent = '¿Qué talle soy?';
          q.addEventListener('click', function () { marcar('quetalle'); var x = $('#flb4 button'); if (x) x.click(); });
          fila.appendChild(q);
        }
      }
      cont.appendChild(fila);
    });
    $$('.chips', cont).forEach(function (f, i) { if (corrido[i]) f.scrollLeft = corrido[i]; });
  }

  function elegir(g, op) {
    ficha.sel[g.id] = op;
    var a = anclaDe(g, op);
    if (a) a.click();
    mensaje('');
    setTimeout(pintarTodo, 80);
  }

  function varianteElegida() {
    if (!ficha.grupos.length) return ficha.vars[0] || null;
    if (buscar(ficha.grupos, function (g) { return !ficha.sel[g.id]; })) return null;
    return buscar(ficha.vars, function (v) {
      return !buscar(ficha.grupos, function (g) { return String(v['option' + g.id]) !== String(ficha.sel[g.id]); });
    });
  }

  function pintarPrecio() {
    var tp = $('#flb-barra .tp'), sub = $('#flb-barra .sub');
    var v = varianteElegida() || buscar(ficha.vars, function (x) { return x.available; }) || ficha.vars[0];
    var p = v ? (+v.price_number || num(v.price_short)) : 0;
    if (!p) { tp.style.display = 'none'; sub.innerHTML = ''; return; }
    tp.style.display = '';
    var ca = +v.compare_at_price_number || num(v.compare_at_price_short);
    var tr = num(v.price_with_payment_discount_short); // el que calcula Tiendanube (sigue al panel si cambian el %)
    if (!tr || tr >= p) tr = p * TRANSF;
    if (bf()) { if (!(ca > p)) ca = p; p = Math.round(p * 0.9); tr = Math.round(p * TRANSF); }
    tp.innerHTML = plata(tr) + ' <small>POR TRANSFERENCIA</small>';
    sub.innerHTML = (ca > p ? '<s>' + plata(ca) + '</s>' : '') + plata(p) + ' con tarjeta<br>' + CUOTAS + ' cuotas sin interés de ' + plata(p / CUOTAS);
  }

  function anclaSinStock() {
    return !!buscar(ficha.grupos, function (g) { var a = ficha.sel[g.id] != null && anclaDe(g, ficha.sel[g.id]); return a && /\bbtn-variant-no-stock\b/.test(a.className); });
  }

  function pintarBoton() {
    var btn = $('#flb-barra .btn'); if (!btn) return;
    if (hoja.esperando) return;
    btn.className = 'btn';
    var faltan = ficha.grupos.filter(function (g) { return !ficha.sel[g.id]; });
    if (faltan.length) {
      var gT = grupoTalle();
      btn.textContent = faltan.length === 1 && faltan[0] !== gT ? 'Elegí ' + faltan[0].lab.toLowerCase() : 'Elegí tu talle';
      btn.className += ' espera'; return;
    }
    var v = varianteElegida(), g = grupoTalle();
    if ((v && !v.available) || anclaSinStock()) { btn.textContent = 'Avisame cuando vuelva'; btn.className += ' avisa'; return; }
    btn.textContent = 'Agregar' + (g ? ' · talle ' + ficha.sel[g.id] : ' al carrito');
  }

  function alertasVisibles() {
    return $$('.alert, .js-stock-alert, [class*="alert-"]', ficha.form).filter(function (e) { return e.offsetParent && texto(e); }).map(texto);
  }

  function tocarBoton() {
    var btn = $('#flb-barra .btn'), bar = $('#flb-barra');
    if (hoja.esperando) return;
    if (/\bespera\b/.test(btn.className)) {
      bar.className = ''; void bar.offsetWidth; bar.className = 'sacude';
      var falta = buscar(ficha.grupos, function (g) { return !ficha.sel[g.id]; });
      mensaje(falta && !buscar(falta.opciones, tipoTalle) ? '👆 Elegí ' + falta.lab.toLowerCase() : '👆 Tocá tu talle');
      return;
    }
    if (/\bavisa\b/.test(btn.className)) {
      marcar('avisame');
      var av = buscar($$('button, a, input[type=submit]'), function (e) { return /avis[aá]me/i.test(e.value || e.textContent) && e.offsetParent && !cerca(e, '#flb-barra'); });
      if (av) av.click(); else ficha.form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    var orig = botonOriginal(); if (!orig) return;
    // por las dudas, que los botones de la página muestren lo elegido (el código de la tienda los desmarca al cargar)
    ficha.grupos.forEach(function (g) { var a = anclaDe(g, ficha.sel[g.id]); if (a && !/\bselected\b/.test(a.className)) a.click(); });
    var g = grupoTalle(); if (g) guardarTalle(ficha.sel[g.id]);
    btn.textContent = 'Agregando…'; btn.className = 'btn espera';
    mensaje('');
    hoja.esperando = true;
    var turno = hoja.turno = (hoja.turno || 0) + 1, antes = alertasVisibles().join('|'), vueltas = 0;
    marcar('agregar');
    setTimeout(function () { orig.click(); }, 60);
    // si Tiendanube no pudo agregar (se agotó mientras miraba, etc.) avisa al lado del botón de la página, que en el celu
    // queda fuera de la vista: copiar ese aviso en la barra
    (function vigilar() {
      if (!hoja.esperando || hoja.turno !== turno) return;
      var nuevas = alertasVisibles().filter(function (t) { return antes.indexOf(t) < 0; });
      if (nuevas.length || ++vueltas > 20) {
        hoja.esperando = false; pintarBoton();
        if (nuevas.length) mensaje(nuevas[0]);
        return;
      }
      setTimeout(vigilar, 400);
    })();
  }

  /* =========================================================
     IDEA 2 · Un solo cartel después de agregar
     ========================================================= */
  var hoja = { esperando: false, abierta: false, cross: null, sumada: false };
  function vigilarAgregado() {
    var alerta = $('.js-alert-added-to-cart');
    if (!alerta || !w.MutationObserver) return;
    d.body.className += ' flb-silencio';
    var vista = false;
    new MutationObserver(function () {
      var vis = /\bnotification-visible\b/.test(alerta.className);
      if (!vis) { vista = false; return; }
      if (vista) return;
      vista = true;
      var nombre = texto($('.js-cart-notification-item-name', alerta));
      var variante = texto($('.js-cart-notification-item-variant', alerta));
      var img = $('.js-cart-notification-item-img', alerta);
      var src = img ? String(img.getAttribute('srcset') || img.getAttribute('data-srcset') || img.getAttribute('src') || '').split(' ')[0] : '';
      try {
        if (hoja.abierta && hoja.sumando && esLaOferta(nombre)) { hoja.sumando = false; hoja.sumada = true; marcar('fragancia_ok'); actualizarHoja(); }
        else abrirHoja({ nombre: nombre, variante: variante, img: src });
        setTimeout(function () { var c = $('.js-cart-notification-close', alerta); if (c) c.click(); }, 60);
      } catch (e) {
        // si algo falla, que se vea el aviso de siempre
        d.body.className = d.body.className.replace(/\s*\bflb-silencio\b/g, '');
        hoja.esperando = false;
      }
    }).observe(alerta, { attributes: true, attributeFilter: ['class'] });

    // la ventana de la fragancia (sale una sola vez por carrito): tomar sus datos y cerrarla sin que se vea
    var modal = $('#js-cross-selling-modal');
    if (modal) {
      var abierto = false;
      new MutationObserver(function () {
        var open = modal.style.display !== 'none';
        if (!open) { abierto = false; return; }
        if (abierto) return;
        abierto = true;
        tomarFragancia(modal, 0);
      }).observe(modal, { attributes: true, attributeFilter: ['style'] });
    }
    // al volver con «atrás» desde la caja, que no quede la hoja colgada
    w.addEventListener('pageshow', function (e) { if (e.persisted) cerrarHoja(true); });
  }

  function tomarFragancia(modal, n) {
    var c = $('.js-cross-selling-container', modal);
    if (!c && n < 25) return setTimeout(function () { tomarFragancia(modal, n + 1); }, 120);
    if (c) {
      var vs = [];
      try { vs = JSON.parse(c.getAttribute('data-variants') || '[]'); } catch (e) {}
      var v0 = vs[0] || {};
      var img = $('.js-cross-selling-product-image', c);
      hoja.cross = {
        id: c.getAttribute('data-product-id') || '',
        nombre: texto($('.js-cross-selling-product-name', c)),
        antes: v0.originalPriceInCents ? v0.originalPriceInCents / 100 : num(texto($('.js-cross-selling-original-price', c))),
        ahora: v0.promotionalPriceInCents ? v0.promotionalPriceInCents / 100 : num(texto($('.js-cross-selling-promo-price', c))),
        img: img ? (img.getAttribute('src') || img.getAttribute('data-src') || '') : '',
        hay: v0.isAvailable !== false && vs.length <= 1,
        boton: $('.js-cross-selling-add-to-cart', c)
      };
    }
    setTimeout(function () {
      var x = $('.js-modal-close', modal); if (x) x.click();
      d.body.className = d.body.className.replace(/\s*\boverflow-none\b/g, '');
      if (hoja.abierta) pintarUpsell();
    }, 80);
  }

  function esLaOferta(nombre) {
    var c = hoja.cross, n = String(nombre || '').toUpperCase();
    return c && c.nombre ? n === c.nombre.toUpperCase() : /FRAGANCIA/.test(n);
  }
  function ofertaEnCarrito() {
    var c = hoja.cross; if (!c) return false;
    try {
      return !!buscar(w.LS.cart.items, function (i) {
        return (c.id && i.product && String(i.product.id) === String(c.id)) || String(i.name || '').toUpperCase() === c.nombre.toUpperCase();
      });
    } catch (e) { return false; }
  }
  // base = productos con las promos ya aplicadas (fragancia a $19.000) y SIN envío: el 20 % va solo sobre eso
  // (comprobado en los pedidos: el envío no lleva descuento). total = lo que muestra el carrito (con envío si ya se calculó).
  function totalesCarrito(nodoTotal) {
    var base = 0, total = num(texto(nodoTotal || $('form.js-ajax-cart-panel .js-cart-total') || $('.js-ajax-cart-panel .js-cart-total')));
    try { base = (+w.LS.data.cart.total || 0) / 100; } catch (e) {}
    if (!base) base = total;
    if (!base) { try { base = (+w.LS.cart.subtotal || 0) / 100; } catch (e) {} }
    if (!total || total < base) total = base;
    return { base: base, total: total, transf: base * TRANSF + (total - base) };
  }

  function abrirHoja(dt) {
    hoja.esperando = false; hoja.sumada = false; hoja.sumando = false;
    if (ficha) pintarBoton();
    cerrarHoja(true);
    var velo = d.createElement('div'); velo.id = 'flb-velo';
    var h = d.createElement('div'); h.id = 'flb-hoja'; h.setAttribute('role', 'dialog'); h.setAttribute('aria-modal', 'true'); h.setAttribute('aria-label', 'Agregado al carrito');
    h.innerHTML = '<div class="asa"></div>' +
      '<div class="ok"><img alt=""><div><b>✓ Agregado al carrito</b><span class="it"></span></div><button class="x" type="button" aria-label="Cerrar">×</button></div>' +
      '<button type="button" class="pagar"><b>IR A PAGAR</b><span class="pt"></span></button>' +
      '<button type="button" class="seguir">SEGUIR MIRANDO</button>' +
      '<div class="envio" hidden><span class="et"></span><i><em></em></i></div>' +
      '<div class="ups" hidden></div>';
    var im = $('img', h); if (dt.img) im.src = dt.img; else im.parentNode.removeChild(im);
    var vr = String(dt.variante || '').split(/\s*,\s*/).join(' · ');
    $('.it', h).textContent = dt.nombre + (vr ? ' · ' + (/^(\d{2}|XXS|XS|S|M|L|XL|XXL|XXXL)(\s·|$)/i.test(vr) ? 'talle ' : '') + vr : '');
    d.body.appendChild(velo); d.body.appendChild(h);
    velo.addEventListener('click', function () { marcar('cerrar'); cerrarHoja(); });
    $('.x', h).addEventListener('click', function () { marcar('cerrar'); cerrarHoja(); });
    $('.seguir', h).addEventListener('click', function () { marcar('seguir'); cerrarHoja(); });
    $('.pagar', h).addEventListener('click', function () { irAPagar(this); });
    hoja.abierta = true;
    marcar('hoja');
    actualizarHoja();
    // el total del carrito se actualiza un instante después del aviso: repasar
    setTimeout(actualizarHoja, 400); setTimeout(actualizarHoja, 1300);
    raf(function () { raf(function () { velo.className = 've'; h.className = 've'; }); });
  }

  function actualizarHoja() {
    var h = $('#flb-hoja'); if (!h) return;
    var t = totalesCarrito();
    var pt = $('.pt', h);
    pt.textContent = t.total ? plata(t.transf) + ' por transferencia · ' + plata(t.total) + ' con tarjeta' : '20 % OFF pagando por transferencia';
    var eg = envioGratis(), env = $('.envio', h);
    if (bf() && w.FLBF && w.FLBF.carritoHTML) {
      env.hidden = true;
      var bx = $('.flbf-c', h), sub = w.FLBF.subtotal ? w.FLBF.subtotal() : t.base;
      if (!bx) { bx = d.createElement('div'); bx.className = 'flbf-c'; $('.seguir', h).parentNode.insertBefore(bx, $('.seguir', h).nextSibling); }
      if (sub) { bx.hidden = false; if (bx.getAttribute('data-sub') !== String(sub)) { bx.setAttribute('data-sub', String(sub)); bx.innerHTML = w.FLBF.carritoHTML(sub); } } else bx.hidden = true;
      pintarUpsell();
      return;
    }
    if (eg && t.base) {
      env.hidden = false;
      var falta = eg - t.base;
      $('.et', h).innerHTML = falta > 0 ? 'Te faltan <b>' + plata(falta) + '</b> para el envío gratis' : '<b>¡Llegaste al envío gratis!</b>';
      $('em', env).style.width = Math.min(100, t.base / eg * 100) + '%';
    } else env.hidden = true;
    pintarUpsell();
  }

  function pintarUpsell() {
    var u = $('#flb-hoja .ups'); if (!u) return;
    var c = hoja.cross;
    var nombre = esc(titulo((c && c.nombre) || 'Fragancia FL Signature'));
    var foto = c && c.img ? '<img alt="" src="' + esc(c.img) + '">' : '';
    if (hoja.sumada) {
      u.hidden = false;
      u.innerHTML = foto + '<p><b>' + nombre + '</b> sumada a tu pedido</p><span class="listo">✓ SUMADA</span>';
      return;
    }
    if (hoja.sumando) {   // mientras viaja el pedido no se vuelve a dibujar un botón activo (se sumaría dos veces)
      if (!$('.sumar', u)) { u.hidden = false; u.innerHTML = foto + '<p>Sumando <b>' + nombre + '</b>…</p><button type="button" class="sumar" disabled>SUMANDO…</button>'; }
      return;
    }
    // ya la tiene en el carrito (la sumó antes): no se ofrece otra
    if (!c || !c.hay || !c.boton || c.boton.isConnected === false || !c.ahora || ofertaEnCarrito()) { u.hidden = true; return; }
    u.hidden = false;
    u.innerHTML = foto + '<p>Sumá la <b>' + nombre + '</b> a ' + plata(c.ahora) + (c.antes > c.ahora ? '<s>' + plata(c.antes) + '</s>' : '') + '</p>' +
      '<button type="button" class="sumar">+ SUMAR</button>';
    $('.sumar', u).addEventListener('click', function () {
      var bt = this;
      if (bt.disabled || hoja.sumando) return;
      hoja.sumando = true;
      bt.disabled = true; bt.textContent = 'SUMANDO…';
      marcar('fragancia');
      c.boton.click();
      setTimeout(function () {
        if (!hoja.sumando) return;
        hoja.sumando = false;
        if (ofertaEnCarrito()) hoja.sumada = true;
        actualizarHoja();
      }, 5000);
    });
  }
  function titulo(s) { return String(s || '').toLowerCase().replace(/(^|\s)\S/g, function (m) { return m.toUpperCase(); }).replace(/\bFl\b/g, 'FL'); }

  function irAPagar(btn) {
    if (btn.disabled) return;
    btn.disabled = true;
    $('b', btn).textContent = 'YENDO A PAGAR…';
    marcar('pagar');
    // lo mismo que hace «Iniciar compra» del carrito: Tiendanube recibe go_to_checkout y manda a la caja
    try {
      var f = d.createElement('form'); f.method = 'post'; f.action = '/comprar/'; f.style.display = 'none';
      var i = d.createElement('input'); i.type = 'hidden'; i.name = 'go_to_checkout'; i.value = 'Iniciar Compra';
      f.appendChild(i); d.body.appendChild(f);
      setTimeout(function () { f.submit(); }, 120); // deja salir el evento de Clarity
    } catch (e) { w.location.href = '/comprar/'; }
    setTimeout(function () { btn.disabled = false; $('b', btn).textContent = 'IR A PAGAR'; }, 9000);
  }

  function cerrarHoja(rapido) {
    var h = $('#flb-hoja'), v = $('#flb-velo');
    hoja.abierta = false;
    if (!h && !v) return;
    var sacar = function () { if (h && h.parentNode) h.parentNode.removeChild(h); if (v && v.parentNode) v.parentNode.removeChild(v); };
    if (rapido) return sacar();
    if (h) h.className = ''; if (v) v.className = '';
    setTimeout(sacar, 300);
  }

  /* ---------- carrito: total por transferencia ---------- */
  function iniciarCarrito() {
    $$('.js-cart-total').forEach(function (tot) {
      var fila = cerca(tot, '.cart-total') || tot.parentNode;
      if (!fila || !fila.parentNode || $('.flb-transf', fila.parentNode)) return;
      var box = d.createElement('div'); box.className = 'flb-transf';
      fila.parentNode.insertBefore(box, fila.nextSibling);
      var pintar = function () {
        var t = totalesCarrito(tot);
        box.innerHTML = t.total ? 'Pagando por transferencia<b class="v">' + plata(t.transf) + '</b>' : '';
        box.style.display = t.total ? '' : 'none';
      };
      pintar();
      // al cambiar cantidades o calcular el envío el tema reescribe el total (y LS.data un instante antes o después)
      if (w.MutationObserver) new MutationObserver(function () { pintar(); setTimeout(pintar, 400); }).observe(tot, { childList: true, characterData: true, subtree: true });
    });
  }

  /* =========================================================
     IDEA 4 · La tienda en tu talle (categorías y búsqueda)
     ========================================================= */
  var cat = { tipo: null, grid: null };
  function iniciarCategoria() {
    if (/\/outfits\b/i.test(w.location.pathname)) return; // los conjuntos no tienen un talle solo
    if (/[?&]talle=/i.test(w.location.search)) return;     // ya viene filtrado por talle desde FILTRAR o un enlace: no filtrar dos veces
    cat.ordenElegido = /[?&]sort_by=/i.test(w.location.search);
    var grid = $('.js-product-table'); if (!grid || cat.grid) return;
    var cards = $$('.js-item-product', grid);
    var votos = { abajo: 0, arriba: 0 };
    cards.forEach(function (c) {
      variantesDe(c).slice(0, 6).forEach(function (v) {
        [v.option0, v.option1, v.option2].forEach(function (o) { var t = tipoTalle(o); if (t) votos[t]++; });
      });
    });
    if (!votos.abajo && !votos.arriba) return;
    cat.grid = grid;
    cat.tipo = votos.abajo >= votos.arriba ? 'abajo' : 'arriba';
    armarSelector(cards);
    procesar(cards, true);
    // tarjetas que llegan al bajar (la tienda carga de a tandas). Las que ya pasaron por acá tienen la marca flb15
    // (cuando se mueven al final también «llegan» de nuevo, y no hay que volver a procesarlas)
    if (w.MutationObserver) new MutationObserver(function (ms) {
      var nuevas = [];
      ms.forEach(function (m) { Array.prototype.forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1 && !n.flb15 && coincide(n, '.js-item-product')) nuevas.push(n); }); });
      if (nuevas.length) procesar(nuevas, true);
    }).observe(grid, { childList: true });
  }

  function talleDeBoton(a) { return normTalle(texto($('b', a) || a)); }

  function armarSelector(cards) {
    var existente = $('#flcatp .tall');
    var tus = leerTalles();
    if (existente) {
      d.documentElement.className += ' flb-tall-on';
      $$('.bt a', existente).forEach(function (a) {
        var v = talleDeBoton(a);
        if (tipoTalle(v) !== cat.tipo) { a.style.display = 'none'; return; }
        if (tus[cat.tipo] === v) a.className += ' flb-sel';
        a.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); tocarTalle(v); }, true);
      });
      var hd = $('.hd small', existente); if (hd) hd.textContent = '¿Qué talle usás? Lo recordamos';
      var info = d.createElement('div'); info.id = 'flb-tutalle'; existente.appendChild(info);
    } else {
      var set = {};
      cards.forEach(function (c) { variantesDe(c).forEach(function (v) { tallesDe(v, cat.tipo).forEach(function (t) { set[t] = 1; }); }); });
      var orden = cat.tipo === 'abajo' ? Object.keys(set).sort(function (a, b) { return a - b; }) : ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].filter(function (t) { return set[t]; });
      if (!orden.length) return;
      var s = d.createElement('div'); s.id = 'flb-strip';
      s.innerHTML = '<div class="hd">¿Qué talle usás? Lo recordamos</div><div class="bt"></div><div id="flb-tutalle"></div>';
      orden.forEach(function (t) {
        var a = d.createElement('a'); a.href = '#'; a.textContent = t; if (tus[cat.tipo] === t) a.className = 'flb-sel';
        a.addEventListener('click', function (e) { e.preventDefault(); tocarTalle(t); });
        $('.bt', s).appendChild(a);
      });
      cat.grid.parentNode.insertBefore(s, cat.grid);
    }
    pintarInfo();
  }

  function tocarTalle(v) {
    var tus = leerTalles();
    if (tus[cat.tipo] === v) borrarTalle(cat.tipo); else { guardarTalle(v); marcar('talle'); }
    var ahora = leerTalles()[cat.tipo];
    $$('#flcatp .tall .bt a, #flb-strip .bt a').forEach(function (a) {
      var on = talleDeBoton(a) === ahora;
      a.className = a.className.replace(/\s*\bflb-sel\b/g, '') + (on ? ' flb-sel' : '');
    });
    cat.pedidos = 0;
    procesar($$('.js-item-product', cat.grid), false);
  }

  // la tienda trae la tanda siguiente recién cuando la persona baja (evento scroll). Si con el talle elegido quedan pocas
  // a la vista, la página queda corta, nadie baja y no llegan más: se le avisa a la tienda que «bajó» (hasta 12 veces)
  function pedirMas() {
    if (!cat.grid || !leerTalles()[cat.tipo]) return;
    var vis = $$('.js-item-product', cat.grid).filter(function (c) { return !!c.offsetParent; }).length;
    if (vis >= 8 || (cat.pedidos || 0) >= 12) return;
    cat.pedidos = (cat.pedidos || 0) + 1;
    setTimeout(function () {
      try { var ev = d.createEvent('Event'); ev.initEvent('scroll', false, false); w.dispatchEvent(ev); } catch (e) {}
    }, 300);
  }

  // v1.0.4 · el número chico de cada botón de talle lo pone la tienda (su filtro) y cuenta también las prendas AGOTADAS en ese
  // talle: «44 · 37» y con el filtro se ven 33. Con un talle elegido se recuenta con lo que HAY: las tarjetas que ya están en
  // la página + las páginas que faltan (la misma categoría con ?page=N, de a una; se leen solo las tarjetas, no se ejecuta
  // nada de esas páginas). Una sola vez por visita. Si algo falla o la categoría pasa de 8 páginas (no se llega a contar
  // completa), quedan los números de la tienda.
  function disponiblesDe(card) {
    var r = {};
    variantesDe(card).forEach(function (v) {
      if (v.is_visible === false) return;
      tallesDe(v, cat.tipo).forEach(function (t) { r[t] = r[t] || !!v.available; });
    });
    return r;
  }
  function idDe(c) { return c.getAttribute('data-product-id') || c.getAttribute('data-component-value') || ''; }
  function pintarConteo() {
    if (!cat.conteo) return;
    $$('#flcatp .tall .bt a').forEach(function (a) {
      var s = $('span', a); if (!s) return;
      var n = cat.conteo[talleDeBoton(a)] || 0;
      s.textContent = String(n);
      a.className = a.className.replace(/\s*\bflb-cero\b/g, '') + (n ? '' : ' flb-cero');
    });
  }
  function contarTodo() {
    if (cat.contado || !cat.grid || !w.fetch || !w.DOMParser || !$('#flcatp .tall')) return;
    cat.contado = 1;
    // la tienda dice cuántas prendas tiene la categoría (LS.productsCount): si son muchas (más de 96 = 8 páginas) no se
    // piden páginas de más, quedan los números de la tienda; y se corta apenas se contaron todas
    var total = +((w.LS || {}).productsCount) || 0;
    if (total > 96) return;
    var vistos = {}, cuenta = {}, n = 1, cantidad = 0;
    var q = (w.location.search || '').replace(/^\?/, '').split('&').filter(function (x) { return x && !/^page=/i.test(x); });
    function terminar() { cat.conteo = cuenta; pintarConteo(); }
    function sumar(cards) {
      cards.forEach(function (c) {
        var id = idDe(c); if (!id || vistos[id]) return;
        vistos[id] = 1; cantidad++;
        var p = disponiblesDe(c);
        Object.keys(p).forEach(function (t) { if (p[t]) cuenta[t] = (cuenta[t] || 0) + 1; });
      });
    }
    function paso() {
      if (total && cantidad >= total) { terminar(); return; }
      if (++n > 8) return;
      w.fetch(w.location.pathname + '?' + q.concat('page=' + n).join('&'), { credentials: 'same-origin' }).then(function (r) {
        if (!r.ok) throw new Error('http ' + r.status);
        return r.text();
      }).then(function (t) {
        var cs = $$('.js-product-table .js-item-product', new w.DOMParser().parseFromString(t, 'text/html'));
        if (!cs.length) { terminar(); return; }
        sumar(cs); paso();
      }).then(null, function () {});
    }
    sumar($$('.js-item-product', cat.grid));
    paso();
  }

  function estadoCard(card, talle) {
    var todas = variantesDe(card);
    var vs = todas.filter(function (v) { return v.is_visible !== false; });
    var porTalle = {}, hayAlguno = false;
    vs.forEach(function (v) { tallesDe(v, cat.tipo).forEach(function (t) { hayAlguno = true; porTalle[t] = porTalle[t] || !!v.available; }); });
    // sinDatos = la tarjeta no trae variantes (no se puede saber su talle); aplica = trae talles de este tipo (números o letras)
    if (!hayAlguno) return { aplica: false, sinDatos: !todas.length };
    var claves = Object.keys(porTalle), agotados = claves.filter(function (t) { return !porTalle[t]; }).length;
    return { aplica: true, hay: talle ? !!porTalle[talle] : null, pocos: claves.length > 1 && agotados / claves.length >= 0.5 };
  }

  function procesar(cards, nuevas) {
    var talle = leerTalles()[cat.tipo] || null;
    var alFinal = [];
    cards.forEach(function (c) {
      c.flb15 = 1;
      c.className = c.className.replace(/\s*\bflb-oculta\b/g, '');
      var vieja = $('.flb-badge', c); if (vieja) vieja.parentNode.removeChild(vieja);
      var e = estadoCard(c, talle);
      if (talle) {
        // con tu talle elegido queda SOLO lo que lo tiene disponible y sin ningún cartel. Se esconde lo que no lo tiene:
        // agotado en ese talle, de otro tipo de talle (S/M/L en una categoría de números) o sin talles (v1.0.3, pedido de
        // Facundo 25-nov). Si la tarjeta no trae datos de variantes no se puede saber: se deja a la vista.
        if (!e.sinDatos && !(e.aplica && e.hay)) c.className += ' flb-oculta';
        return;
      }
      if (!e.aplica || !e.pocos) return;
      var img = $('.js-product-item-image-container', c) || $('.item-image', c) || c.firstElementChild;
      if (img && w.getComputedStyle(img).position === 'static') img.style.position = 'relative';
      var bd = d.createElement('span'); bd.className = 'flb-badge poco'; bd.textContent = 'ÚLTIMOS TALLES';
      if (img) img.appendChild(bd);
      alFinal.push(c);
    });
    // sin talle elegido: las que tienen la mitad o más agotada van al final de la tanda recién cargada
    if (alFinal.length && nuevas && !talle && !cat.ordenElegido) {
      var ult = cards[cards.length - 1];
      alFinal.forEach(function (c) { if (c !== ult && ult.parentNode) { ult.parentNode.insertBefore(c, ult.nextSibling); ult = c; } });
    }
    pintarInfo();
    pedirMas();
    if (talle && !cat.contado) setTimeout(contarTodo, 1200);
  }

  function pintarInfo() {
    var info = $('#flb-tutalle'); if (!info || !cat.grid) return;
    var talle = leerTalles()[cat.tipo];
    if (!talle) { info.innerHTML = '<span>Tocá tu talle y te mostramos solo lo que hay.</span>'; return; }
    // v1.0.3: sin «mostrando lo que hay en tu X» ni aviso «N prendas no tienen… verlas igual»; queda el talle y la salida
    info.innerHTML = '<span>Tu talle: <b>' + esc(talle) + '</b></span><button type="button">ver todo</button>';
    $('button', info).addEventListener('click', function () { tocarTalle(talle); });
  }

  /* ---------- arranque ---------- */
  function intentar(fn) { try { fn(); } catch (e) { try { if (w.console) w.console.warn('FLB15', e); } catch (x) {} } }
  listo(function () {
    if (!d.body) return;
    ponerEstilos();
    try { if (typeof w.clarity === 'function') w.clarity('set', 'flb15', V); } catch (e) {}
    var t = (w.LS && w.LS.template) || '', bc = d.body.className;
    intentar(vigilarAgregado);
    if (t === 'product' || /\btemplate-product\b/.test(bc)) intentar(iniciarFicha);
    if (t === 'cart' || /\btemplate-cart\b/.test(bc)) intentar(iniciarCarrito);
    if (/^(category|search)$/.test(t) || /\btemplate-(category|search)\b/.test(bc)) {
      // la portada de la categoría (bloque 7, con los talles) la arma el pie: darle un momento
      var n = 0;
      (function esperar() { if ($('#flcatp .tall') || n++ > 15) intentar(iniciarCategoria); else setTimeout(esperar, 100); })();
      if (t === 'category' || /\btemplate-category\b/.test(bc)) intentar(bannerCategoria);
    }
  });
})(window, document);
