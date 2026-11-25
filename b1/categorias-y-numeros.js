/* FL Indumentaria · Barra de categorías en compu y números que suben (bloque 1, v1.0.1) · fuente: bloque1/b1.src.js (en la Mac: FL GRAL/ideas-atlas-destino/) */
!function(t,e){if(!t.FLB1){t.FLB1={v:"1.0.1"};var a="#4E0A06",n="#3887C4";try{/[?&]flprueba=0/.test(location.search)?sessionStorage.removeItem("flb1"):/[?&]flprueba/.test(location.search)&&sessionStorage.setItem("flb1","1")}catch(t){}try{"1"===sessionStorage.getItem("flb1")}catch(t){}!1,t.FLB1.activo=!0;var r=t.matchMedia&&t.matchMedia("(prefers-reduced-motion: reduce)").matches,i="/"===location.pathname||""===location.pathname;"loading"===e.readyState?e.addEventListener("DOMContentLoaded",u):u()}function o(t){return String(null==t?"":t).replace(/[&<>"]/g,function(t){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[t]})}function l(t,e){var a=[];if(!t)return a;for(var n=0;n<t.children.length;n++)t.children[n].tagName===e&&a.push(t.children[n]);return a}function s(t){for(var e=0;e<t.children.length;e++){var a=t.children[e];if("A"===a.tagName)return a;if("UL"!==a.tagName){var n=a.querySelector("a");if(n)return n}}return null}function c(t){var e=t.querySelector('[data-flp="t"]');return(e?e.textContent:t.textContent).replace(/\s+/g," ").trim()}function d(t){return t.replace(/\s*\/\s*/g," / ")}function f(){var i=e.querySelector("header.js-head-main");if(i&&!e.getElementById("flb1cat")){var f=e.querySelector(".nav-list");if(f){for(var p=null,u=l(f,"LI"),h=0;h<u.length;h++){var b=s(u[h]);if(u[h].querySelector("ul")&&b&&/productos/i.test(b.textContent)){p=u[h];break}}if(p){var g=[],v=null;if(l(p.querySelector("ul"),"LI").forEach(function(t){var e=s(t);if(e){var a=c(e),n=e.getAttribute("href");if(/^ver tod/i.test(a))n&&"#"!==n&&(v=n);else{var r=t.querySelector("ul"),i={t:a,h:n,ws:/winter/i.test(a),hijos:[]};r&&(l(r,"LI").forEach(function(t){var e=s(t);if(e){var a=c(e),n=e.getAttribute("href");/^ver tod/i.test(a)?n&&"#"!==n&&(i.h=n):n&&"#"!==n&&i.hijos.push({t:a,h:n})}}),i.h&&"#"!==i.h||!i.hijos.length||(i.h=i.hijos[0].h)),i.h&&"#"!==i.h&&g.push(i)}}}),!(g.length<2)){var m,x,y=location.pathname.replace(/\/+$/,"")+"/",w='<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';m='#flb1cat{display:none}@media (min-width:992px){#flb1cat{display:block;position:relative;border-top:1px solid rgba(17,17,17,.12);font-family:inherit;color:#111}#flb1cat *{box-sizing:border-box}#flb1cat .in{display:flex;align-items:center;height:46px;padding:0 24px;gap:4px}#flb1cat .cb{flex:0 0 auto;display:inline-flex;align-items:center;gap:7px;height:22px;margin:0 8px 0 0;padding:0 18px 0 0;border:0;border-right:1px solid rgba(17,17,17,.18);background:none;font-family:inherit;font-weight:800;font-size:12.5px;line-height:1;letter-spacing:.09em;text-transform:uppercase;color:#111;cursor:pointer}#flb1cat .cb svg{width:12px;height:12px;transition:transform .2s ease}#flb1cat .cb[aria-expanded="true"] svg{transform:rotate(180deg)}#flb1cat .vp{flex:1 1 auto;min-width:0;overflow-x:auto;overflow-y:hidden;scrollbar-width:none}#flb1cat .vp::-webkit-scrollbar{display:none}#flb1cat.desb .vp{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 28px,#000 calc(100% - 28px),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 28px,#000 calc(100% - 28px),transparent 100%)}#flb1cat .tr{display:flex;gap:30px;list-style:none!important;margin:0!important;padding:0 14px!important;white-space:nowrap}#flb1cat .tr li{list-style:none!important;margin:0!important;padding:0!important}#flb1cat .tr a{position:relative;display:block;padding:15px 0;font-weight:600;font-size:12.5px;line-height:16px;letter-spacing:.07em;text-transform:uppercase;color:#111!important;text-decoration:none!important}#flb1cat .tr a:after{content:"";position:absolute;left:0;right:0;bottom:10px;height:2px;background:'+a+";transform:scaleX(0);transition:transform .25s ease}#flb1cat .tr a:hover:after,#flb1cat .tr a.on:after{transform:scaleX(1)}#flb1cat .tr a.on{font-weight:800}#flb1cat .tr a.ws{color:"+n+"!important}#flb1cat .tr a.ws:after{background:"+n+"}#flb1cat .ar{flex:0 0 auto;display:none;width:30px;height:30px;padding:0;border:0;border-radius:50%;background:none;color:#111;cursor:pointer}#flb1cat .ar svg{width:14px;height:14px}#flb1cat .pv svg{transform:rotate(90deg)}#flb1cat .nx svg{transform:rotate(-90deg)}#flb1cat.desb .ar{display:inline-flex;align-items:center;justify-content:center}#flb1cat .ar:hover{background:rgba(17,17,17,.07)}#flb1cat .ar[disabled]{opacity:.25;cursor:default;background:none}#flb1cat .pan{position:absolute;left:24px;top:100%;z-index:5;min-width:600px;max-width:calc(100% - 48px);padding:22px 28px 18px;background:#FAF8F3;border:1px solid rgba(17,17,17,.14);box-shadow:0 22px 44px rgba(0,0,0,.13);-webkit-columns:3 170px;columns:3 170px;-webkit-column-gap:36px;column-gap:36px}#flb1cat .pan>div{-webkit-column-break-inside:avoid;break-inside:avoid}#flb1cat .pan[hidden]{display:none}#flb1cat .pan a{display:block;padding:8px 0;font-weight:700;font-size:13px;letter-spacing:.05em;text-transform:uppercase;color:#111!important;text-decoration:none!important}#flb1cat .pan a:hover{color:"+a+"!important}#flb1cat .pan a.ws{color:"+n+"!important}#flb1cat .pan .sb a{padding:4px 0 4px 12px;font-weight:500;text-transform:none;letter-spacing:0;color:#555!important}#flb1cat .pan .td{-webkit-column-span:all;column-span:all;margin-top:10px;padding-top:12px;border-top:1px solid rgba(17,17,17,.12)}#flb1cat .pan .td a{display:inline-block}}",(x=e.createElement("style")).textContent=m,e.head.appendChild(x);var k="",L="";g.forEach(function(t){var e=(t.ws?"ws":"")+(T(t.h)?" on":"");k+='<li><a class="'+e+'" href="'+o(t.h)+'">'+o(d(t.t))+"</a></li>",L+='<div><a class="'+(t.ws?"ws":"")+'" href="'+o(t.h)+'">'+o(d(t.t))+"</a>",t.hijos.length&&(L+='<div class="sb">',t.hijos.forEach(function(t){L+='<a href="'+o(t.h)+'">'+o(t.t)+"</a>"}),L+="</div>"),L+="</div>"}),v&&(k+='<li><a href="'+o(v)+'"'+(T(v,!0)?' class="on"':"")+">Ver todo</a></li>",L+='<div class="td"><a href="'+o(v)+'">Ver todos los productos \u2192</a></div>');var S=e.createElement("div");S.id="flb1cat",S.innerHTML='<nav class="in" aria-label="Categor\xedas"><button type="button" class="cb" aria-expanded="false" aria-controls="flb1pan">Categor\xedas '+w+'</button><button type="button" class="ar pv" aria-label="Ver categor\xedas anteriores">'+w+'</button><div class="vp"><ul class="tr">'+k+'</ul></div><button type="button" class="ar nx" aria-label="Ver m\xe1s categor\xedas">'+w+'</button></nav><div class="pan" id="flb1pan" hidden>'+L+"</div>",i.appendChild(S);var E=S.querySelector(".cb"),q=S.querySelector(".pan"),C=S.querySelector(".vp"),B=S.querySelector(".pv"),I=S.querySelector(".nx"),A=0;E.addEventListener("click",function(){z(q.hidden)}),E.addEventListener("mouseenter",function(){z(!0)}),q.addEventListener("mouseenter",function(){clearTimeout(A)}),S.addEventListener("mouseleave",function(){A=setTimeout(function(){z(!1)},220)}),e.addEventListener("keydown",function(t){"Escape"!==t.key&&27!==t.keyCode||q.hidden||(z(!1),E.focus())}),e.addEventListener("click",function(t){q.hidden||S.contains(t.target)||z(!1)}),B.addEventListener("click",function(){V(-1)}),I.addEventListener("click",function(){V(1)}),C.addEventListener("scroll",O,{passive:!0}),t.addEventListener("resize",O);var F=S.querySelector(".tr a.on");if(F){var M=F.getBoundingClientRect(),j=C.getBoundingClientRect();(M.left<j.left+28||M.right>j.right-28)&&(C.scrollLeft+=M.left-j.left-40)}O(),e.fonts&&e.fonts.ready&&e.fonts.ready.then(O)}}}}function T(t,e){try{var a=new URL(t,location.href).pathname.replace(/\/+$/,"")+"/";return"/"!==a&&(e?y===a:0===y.indexOf(a))}catch(t){return!1}}function z(t){clearTimeout(A),q.hidden=!t,E.setAttribute("aria-expanded",t?"true":"false")}function O(){var t=C.scrollWidth-C.clientWidth;S.classList.toggle("desb",t>2),B.disabled=C.scrollLeft<=2,I.disabled=C.scrollLeft>=t-2}function V(t){var e=C.scrollLeft+t*C.clientWidth*.7;C.scrollTo?C.scrollTo({left:e,behavior:r?"auto":"smooth"}):C.scrollLeft=e}}function p(){if("IntersectionObserver"in t&&!r){var a=e.getElementById("flstats");if(a)return i(a);if(t.MutationObserver){var n=new MutationObserver(function(){var t=e.getElementById("flstats");t&&(n.disconnect(),i(t))});n.observe(e.body,{childList:!0,subtree:!0})}}function i(e){if(!e.getAttribute("data-flb1")){e.setAttribute("data-flb1","1");for(var a=[],n=e.querySelectorAll(".v, .k"),r=0;r<n.length;r++)for(var i=0;i<n[r].childNodes.length;i++){var o=n[r].childNodes[i];if(3===o.nodeType){var l=o.nodeValue.match(/^(\D*?)(\d{1,3}(?:\.\d{3})+)([\s\S]*)$/);l&&a.push({nd:o,pre:l[1],fin:+l[2].replace(/\./g,""),post:l[3]})}}if(a.length){var s=new IntersectionObserver(function(e){if(e[0].isIntersecting){s.disconnect();var n=0;t.requestAnimationFrame(function e(r){n||(n=r);var i=Math.min(1,(r-n)/1600),o=1-Math.pow(1-i,3);a.forEach(function(t){var e;t.nd.nodeValue=t.pre+(e=t.fin*o,String(Math.round(e)).replace(/\B(?=(\d{3})+(?!\d))/g,"."))+t.post}),i<1&&t.requestAnimationFrame(e)})}},{threshold:.5});s.observe(e)}}}}function u(){try{f()}catch(e){t.FLB1.err=String(e)}var a=e.querySelector("header.js-head-main");a&&a.classList.add("flb1");try{i&&p()}catch(e){t.FLB1.err=String(e)}}}(window,document);
/* + BLACK FRIDAY 2026 (FLBF v1.1.2, 25-nov-2026, arranca hoy) · fuente: FL GRAL/black-friday-2026/codigo-web/promobf.src.js */
/* FL Indumentaria · BLACK FRIDAY 2026 (miércoles 25 al lunes 30 de noviembre) · FLBF v1.1.7 (25-nov-2026: arranca HOY + banner animado GIF; v1.1.1: esconde la etiqueta «Envío gratis» del tema que tapaba el «10% OFF»; v1.1.2: precio por transferencia PRIMERO y más grande, con etiqueta bordó; v1.1.3: precio por transferencia en UN bloque bordó, precio grande y abajo «(+20% extra por transferencia)»; v1.1.4: la promo se comunica como «HASTA 30/35/40% OFF por transferencia» (barra, ficha); recuadro «POR TRANSFERENCIA» en mayúscula; en el carrito siguen 10/15/20 + «+20% OFF EXTRA ABONANDO POR TRANSFERENCIA» grande; el tachado va DENTRO del recuadro bordó, al lado del precio por transferencia; v1.1.5: en las tarjetas el recuadro va al ANCHO de la foto y más bajo, tachado al lado; v1.1.6: las cintas de las categorías (bloque 7, #flcatp) hablan del Black Friday, negra y roja; v1.1.7: el recuadro vuelve al tamaño del precio y el TACHADO va AFUERA, arriba, en negro, entre el precio con tarjeta y el de transferencia)
   Va en el bloque 1 (b1/categorias-y-numeros.js en github.com/MTCONSULTORES/fl-tienda), que se carga con defer en todas las páginas.
   Se prende el miércoles 25-nov 00:00 (Facundo lo activó ese día) (Argentina) y se apaga SOLO el martes 1-dic 00:00: compara con el reloj de quien mira.
   Antes y después NO toca la página. ?flbf en la dirección = prendido fuera de fecha para mirarlo (queda prendido en esa pestaña
   mientras se navega; ?flbf=0 lo apaga).
   Mecánica (la cobra Tiendanube con la promoción «Descuento en el carrito», no este código): 10 % en toda la web, 15 % desde $140.000,
   20 % desde $200.000 (+ 9 cuotas sin interés en Pago Nube), envío gratis, +20 % por transferencia sobre lo ya descontado.
   Los precios de lista están subidos un 11,12 % (redondeados para abajo a $100): el 10 % los deja en el precio de antes.
   Cuando está prendido:
   1) cada prenda (listados): tachado + precio con el 10 % + precio por transferencia + 6 cuotas, y sobre la foto la banda «10% OFF · ENVÍO GRATIS»
      y la etiqueta BLACK FRIDAY (el precio del sello y el del tema quedan escondidos solo en las tarjetas);
   2) ficha: lo mismo en grande + «cuánto te queda esta prenda en cada escalón»;
   3) carrito: barra «te faltan $X para el 15 % / el 20 % + 9 cuotas» que se mueve con el subtotal (sube el ticket);
   4) inicio: el banner del Black Friday PRIMERO en los dos carruseles (compu y celu);
   5) barra de arriba: los 3 mensajes del Black Friday (lo hace la barra FLBA, más abajo, con FLBF.textoBarra).
   ES5 a propósito (Safari viejos). */
(function (w, d) {
  if (w.FLBF) return;
  var INI = Date.parse('2026-11-25T00:00:00-03:00'), FIN = Date.parse('2026-12-01T00:00:00-03:00');
  var T15 = 140000, T20 = 200000;
  var P = w.FLBF = { v: '1.1.7', activa: false, T15: T15, T20: T20 };
  try {
    var q = w.location.search || '', t = Date.now(), ss = null;
    try { ss = w.sessionStorage; } catch (e0) {}
    if (/[?&]flbf=0(?:&|$)/.test(q)) { if (ss) ss.removeItem('flbf'); }
    else if (/[?&]flbf(?:[=&]|$)/.test(q)) { if (ss) ss.setItem('flbf', '1'); P.prueba = true; }
    if (!P.prueba && ss && ss.getItem('flbf') === '1') P.prueba = true;
    P.activa = (t >= INI && t < FIN) || !!P.prueba;
  } catch (e) { P.err = String(e); }
  // barra de arriba (la usa FLBA): devuelve el texto nuevo de cada mensaje, o el mismo si no corresponde
  P.textoBarra = function (t) {
    if (/transfer/i.test(t)) return 'Black Friday: hasta 40% OFF por transferencia';
    if (/env[ií]o/i.test(t)) return 'Envío gratis a todo el país';
    if (/cuota/i.test(t)) return '9 cuotas sin interés desde $200.000';
    return t;
  };
  if (!P.activa) return;

  var CDN = 'https://cdn.jsdelivr.net/gh/MTCONSULTORES/fl-tienda@99ed386f4b563f12baa19023f6606472a5b41441/b17/';
  var NEGRO = '#0B0B0B', CREMA = '#F2EDE4', ROJO = '#E3311D', BORDO = '#4E0A06';
  var A = 'Anton,Impact,"Arial Narrow",sans-serif', G = '"Geist Mono",ui-monospace,Menlo,monospace';
  var ALT = 'Black Friday: abonando por transferencia hasta 30% OFF en toda la web, 35% desde $140.000 y 40% desde $200.000; 9 cuotas sin interés desde $200.000; envío gratis a todo el país';

  function plata(n) { n = Math.round(+n || 0); return '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function num(s) { s = String(s || '').replace(/[^\d,]/g, '').replace(/,\d*$/, ''); return +s || 0; }
  function $$(s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); }
  // precio que cobra la tienda (ya con la oferta propia, si tiene) y tachado: el de lista si es más alto
  function precios(pd, cp) {
    var p = pd ? (+pd.getAttribute('data-product-price') / 100 || num(pd.getAttribute('content')) || num(pd.textContent)) : 0;
    var c = cp && cp.style.display !== 'none' ? num(cp.textContent) : 0;
    var con10 = Math.round(p * 0.9);
    return { p: p, tachado: c > p ? c : p, con10: con10, transf: Math.round(con10 * 0.8), off: c > p ? Math.round((1 - con10 / c) * 100) : 10 };
  }

  var CAMION = '<svg viewBox="0 0 64 40" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">' +
    '<path d="M3 5h34v24H3z"/><path d="M37 13h12l9 9v7H37z"/><circle cx="14" cy="31" r="5" fill="' + ROJO + '" stroke="' + ROJO + '"/><circle cx="48" cy="31" r="5" fill="' + ROJO + '" stroke="' + ROJO + '"/></svg>';

  // ---------- estilos ----------
  try {
    var css =
      /* etiqueta BLACK FRIDAY arriba a la derecha de la foto (la misma del Cyber y del envío 48 hs) */
      'html.flbf .js-item-product .js-product-item-image-container-private:before{content:"BLACK FRIDAY";position:absolute;top:10px;right:10px;z-index:4;display:flex;align-items:center;height:18px;padding:1px 6px 0 16px;box-sizing:border-box;background:' + NEGRO + ' linear-gradient(' + ROJO + ',' + ROJO + ') no-repeat 7px 50%/5px 5px;color:' + CREMA + ';font:700 8px/1 ' + G + ';letter-spacing:.14em;white-space:nowrap;pointer-events:none}' +
      /* tarjeta: se esconden los precios del sello y del tema y se dibuja el del Black Friday */
      'html.flbf .js-item-product .flp-host,html.flbf .js-item-product .js-price-display,html.flbf .js-item-product .js-compare-price-display,' +
      'html.flbf .js-item-product .item-link .js-nubesdk-slot,html.flbf .js-item-product .js-offer-label,html.flbf .js-labels-floating-group .js-free-shipping-minimum-label{display:none!important}' +
      '.flbf-p .tc{display:block;font-size:16px;font-weight:600;line-height:1.1;color:#111;text-decoration:line-through;text-decoration-thickness:1.5px;margin:0 0 4px}' +
      '.flbf-p .t{display:inline-flex;flex-direction:column;align-items:flex-start;max-width:100%;box-sizing:border-box;background:' + BORDO + ';color:#fff;padding:6px 9px 6px;border-radius:3px;margin-bottom:4px}' +
      '.flbf-p .t span{display:block;font-size:10px;font-weight:800;line-height:1.2;letter-spacing:.06em;text-transform:uppercase;margin-top:3px}' +
      '.flbf-p .t b{font-size:23px;font-weight:800;letter-spacing:-.015em;line-height:1}' +
      '.flbf-p .s{font-size:10.5px;line-height:1.35;color:#6f675e;margin-top:2px}.flbf-p .s s{color:#a39a90;margin-right:4px}.flbf-p .s b{color:#111;font-weight:700}' +
      '.flbf-band{position:absolute;left:0;right:0;bottom:0;z-index:4;display:flex;height:24px;pointer-events:none}' +
      '.flbf-band .o{display:flex;align-items:center;padding:1px 8px 0;background:' + ROJO + ';color:' + CREMA + ';font:700 9px/1 ' + G + ';letter-spacing:.08em;white-space:nowrap}' +
      '.flbf-band .e{flex:1;display:flex;align-items:center;justify-content:center;gap:5px;background:' + NEGRO + ';color:' + CREMA + ';font:400 12px/1 ' + A + ';letter-spacing:.03em;text-transform:uppercase;white-space:nowrap;overflow:hidden}' +
      '.flbf-band .e b{color:' + ROJO + ';font-weight:400}.flbf-band svg{width:20px;height:13px;color:' + CREMA + ';flex:none}' +
      /* ficha */
      'html.flbf .flbf-ficha-oculto,html.flbf .flbf-zona>.flp-host,html.flbf [data-flp="precios-ficha"]{display:none!important}' +
      '.flbf-fp{margin:6px 0 4px}.flbf-fp .l1{display:flex;align-items:baseline;flex-wrap:wrap;gap:4px 10px}' +
      '.flbf-fp .l1 s{color:#9a9087;font-size:15px}.flbf-fp .l1 b{font-size:20px;font-weight:800;color:#111;letter-spacing:-.01em}.flbf-fp .l1 .ct{font-size:13px;color:#4b443d;margin-left:-6px}' +
      '.flbf-fp .l1 i{font-style:normal;background:' + ROJO + ';color:' + CREMA + ';font:700 11px/1 ' + G + ';letter-spacing:.08em;padding:5px 7px 4px;align-self:center}' +
      '.flbf-fp .tr{display:inline-flex;flex-direction:column;align-items:flex-start;margin:0 0 10px;background:' + BORDO + ';color:#fff;padding:8px 13px 9px;border-radius:3px}' +
      '.flbf-fp .tr small{font-size:12px;font-weight:800;line-height:1.2;letter-spacing:.07em;text-transform:uppercase;margin-top:5px}.flbf-fp .tr b{font-size:30px;font-weight:800;line-height:1;letter-spacing:-.015em}' +
      '.flbf-fp .tc{display:block;font-size:22px;font-weight:600;line-height:1.1;color:#111;text-decoration:line-through;text-decoration-thickness:2px;margin:0 0 5px}' +
      '.flbf-fp .cu{font-size:13px;color:#4b443d;margin-top:7px}' +
      '.flbf-x{background:' + NEGRO + ';color:' + CREMA + ';padding:14px 14px 13px;margin:14px 0 8px;box-shadow:inset 0 3px 0 ' + ROJO + ';font-family:inherit}' +
      '.flbf-x .k{font:700 10px/1.2 ' + G + ';letter-spacing:.12em;text-transform:uppercase;display:flex;align-items:center;gap:7px;color:' + CREMA + '}' +
      '.flbf-x .k i{display:inline-block;width:6px;height:6px;background:' + ROJO + ';flex:none}.flbf-x .k b{color:' + ROJO + ';font-weight:700}' +
      '.flbf-x .hs{font:400 17px/1 ' + A + ';text-transform:uppercase;letter-spacing:.04em;color:' + CREMA + ';margin-top:11px}' +
      '.flbf-x .cols{display:grid;grid-template-columns:1fr 1fr 1.25fr;margin-top:7px}' +
      '.flbf-x .tf{font:700 7.5px/1.25 ' + G + ';letter-spacing:.05em;text-transform:uppercase;color:' + CREMA + ';margin-top:4px}' +
      '.flbf-x .c{padding:0 8px 0 0;min-width:0}.flbf-x .c+.c{padding-left:9px;border-left:1px solid rgba(242,237,228,.22)}' +
      '.flbf-x .p{font:400 28px/.95 ' + A + '}.flbf-x .p small{font-size:.5em;color:' + ROJO + ';margin-left:2px;vertical-align:.85em}.flbf-x .c:last-child .p{font-size:35px}' +
      '.flbf-x .m{font:700 8.5px/1.25 ' + G + ';letter-spacing:.06em;text-transform:uppercase;color:rgba(242,237,228,.75);margin-top:5px;min-height:21px}' +
      '.flbf-x .v{font:400 18px/1 ' + A + ';margin-top:7px}.flbf-x .v span{display:block;font:500 8.5px/1.2 ' + G + ';text-transform:uppercase;color:rgba(242,237,228,.55);margin-bottom:4px}' +
      '.flbf-x .q{display:inline-block;margin-top:7px;background:' + CREMA + ';color:' + NEGRO + ';font:800 9px/1.1 ' + G + ';letter-spacing:.04em;text-transform:uppercase;padding:4px 5px 3px}' +
      '.flbf-x .pie{display:flex;align-items:baseline;flex-wrap:wrap;gap:4px 8px;margin-top:12px;padding-top:10px;border-top:1px solid rgba(242,237,228,.22);font:400 17px/1 ' + A + ';text-transform:uppercase;color:' + ROJO + '}' +
      '.flbf-x .pie span{font:700 8.5px/1.3 ' + G + ';letter-spacing:.04em;color:rgba(242,237,228,.8)}' +
      /* cintas de las categorías (bloque 7): negra con BLACK FRIDAY y estrellas rojas, la segunda roja (antes bordó) */
      'html.flbf #flcatp .ci.n{background:' + NEGRO + ';color:' + CREMA + '}html.flbf #flcatp .ci.n b{color:' + ROJO + ';font-weight:400}html.flbf #flcatp .ci.n em{color:' + ROJO + ';opacity:1}' +
      'html.flbf #flcatp .ci.r{background:' + ROJO + ';color:' + CREMA + '}html.flbf #flcatp .ci.r em{opacity:.9}html.flbf #flcatp .ci div{animation-duration:42s}' +
      /* los puntitos del carrusel del celu van arriba: abajo tapaban «ENVÍO GRATIS» del banner */
      'html.flbf .js-swiper-home-pagination-mobile{top:10px!important;bottom:auto!important}' +
      /* carrito */
      'html.flbf .js-ajax-cart-panel .js-ship-free-rest{display:none!important}' +
      '.flbf-c{background:' + NEGRO + ';color:' + CREMA + ';padding:12px 12px 10px;margin:10px 0 12px;box-shadow:inset 0 3px 0 ' + ROJO + ';font-family:inherit;text-align:left}' +
      '.flbf-c .k{font:700 9.5px/1.2 ' + G + ';letter-spacing:.1em;text-transform:uppercase;color:rgba(242,237,228,.8);display:flex;align-items:center;gap:7px}' +
      '.flbf-c .k i{display:inline-block;width:6px;height:6px;background:' + ROJO + ';flex:none}.flbf-c .k b{color:' + ROJO + ';font-weight:700}' +
      '.flbf-c .h{font:400 22px/1.05 ' + A + ';text-transform:uppercase;margin:8px 0 2px;letter-spacing:.005em}.flbf-c .h b{color:' + ROJO + ';font-weight:400}' +
      '.flbf-c .bar{position:relative;height:6px;background:rgba(242,237,228,.18);margin:14px 0 6px}' +
      '.flbf-c .bar .f{position:absolute;left:0;top:0;bottom:0;background:' + ROJO + ';transition:width .35s ease}' +
      '.flbf-c .bar .t{position:absolute;top:-6px;width:2px;height:18px;background:rgba(242,237,228,.7)}.flbf-c .bar .t.si{background:' + ROJO + '}' +
      '.flbf-c .lb{position:relative;height:28px;font:700 8.5px/1.25 ' + G + ';letter-spacing:.04em;text-transform:uppercase;color:rgba(242,237,228,.7)}' +
      '.flbf-c .lb span{position:absolute;top:0;white-space:nowrap}.flbf-c .lb b{color:' + CREMA + '}.flbf-c .lb .si b{color:' + ROJO + '}' +
      '.flbf-c .s{font:700 9.5px/1.3 ' + G + ';letter-spacing:.06em;text-transform:uppercase;color:rgba(242,237,228,.75);margin-top:2px}' +
      '.flbf-c .tx{background:' + CREMA + ';color:' + NEGRO + ';font:400 19px/1.1 ' + A + ';text-transform:uppercase;letter-spacing:.01em;padding:7px 9px 6px;margin:2px 0 8px}' +
      /* dentro de la hoja del bloque 15 sus reglas para <b> (más grandes y bordó) le ganan a las de acá: se las pisa */
      '#flb-hoja .flbf-c b{font-size:inherit;font-weight:700;line-height:inherit;font-family:inherit;display:inline;letter-spacing:inherit;margin:0;color:' + CREMA + '}' +
      '#flb-hoja .flbf-c .h b{font-weight:400;color:' + ROJO + '}#flb-hoja .flbf-c .k b,#flb-hoja .flbf-c .lb .si b{color:' + ROJO + '}' +
      '@media (prefers-reduced-motion:reduce){.flbf-c .bar .f{transition:none}}' +
      '@media (min-width:768px){html.flbf .js-item-product .js-product-item-image-container-private:before{top:14px;right:14px;height:24px;padding:1px 9px 0 22px;background-position:10px 50%;background-size:6px 6px;font-size:10px}' +
      '.flbf-p .t b{font-size:29px}.flbf-p .tc{font-size:19px}.flbf-p .t{padding:7px 12px 8px}.flbf-p .t span{font-size:12px}.flbf-p .s{font-size:12.5px}.flbf-band{height:32px}.flbf-band .e{font-size:16px}.flbf-band .o{font-size:11px;padding:1px 12px 0}.flbf-band svg{width:26px;height:17px}' +
      '.flbf-fp .l1 b{font-size:22px}.flbf-fp .tr b{font-size:36px}.flbf-fp .tc{font-size:25px}.flbf-fp .tr small{font-size:13px}}';
    var st = d.createElement('style'); st.id = 'flbf-css'; st.textContent = css;
    (d.head || d.documentElement).appendChild(st);
    d.documentElement.classList.add('flbf');
  } catch (e) { P.errCss = String(e); }

  // ---------- 1) tarjetas de los listados ----------
  function tarjetas() {
    $$('.js-item-product .js-item-price-container').forEach(function (pc) {
      if (pc.getAttribute('data-flbf')) return;
      var pd = pc.querySelector('.js-price-display'); if (!pd) return;
      var x = precios(pd, pc.querySelector('.js-compare-price-display'));
      if (!x.p) return;
      pc.setAttribute('data-flbf', '1');
      var bx = d.createElement('div'); bx.className = 'flbf-p';
      bx.innerHTML = '<s class="tc">' + plata(x.tachado) + '</s><div class="t"><b>' + plata(x.transf) + '</b><span>Por transferencia</span></div>' +
        '<div class="s"><b>' + plata(x.con10) + '</b> con tarjeta</div>' +
        '<div class="s">6 cuotas sin interés de ' + plata(x.con10 / 6) + '</div>';
      pc.insertBefore(bx, pc.firstChild);
      var it = pc.closest ? pc.closest('.js-item-product') : null;
      var im = it && it.querySelector('.js-product-item-image-container-private');
      if (im && !im.querySelector('.flbf-band')) {
        var bd = d.createElement('div'); bd.className = 'flbf-band';
        bd.innerHTML = '<span class="o">' + x.off + '% OFF</span><span class="e">' + CAMION + 'Envío <b>gratis</b></span>';
        im.appendChild(bd);
      }
    });
  }

  // ---------- 2) ficha de la prenda ----------
  function escalera(L) {
    return '<div class="k"><i></i>Black Friday · <b>más llevás, más ahorrás</b></div>' +
      '<div class="hs">Hasta</div><div class="cols">' +
      '<div class="c"><div class="p">30%<small>OFF</small></div><div class="m">En toda<br>la web</div><div class="tf">Por transferencia</div><div class="v"><span>Te queda</span>' + plata(L * 0.9 * 0.8) + '</div></div>' +
      '<div class="c"><div class="p">35%<small>OFF</small></div><div class="m">Desde<br>$140.000</div><div class="tf">Por transferencia</div><div class="v"><span>Te queda</span>' + plata(L * 0.85 * 0.8) + '</div></div>' +
      '<div class="c"><div class="p">40%<small>OFF</small></div><div class="m">Desde<br>$200.000</div><div class="tf">Por transferencia</div><div class="v"><span>Te queda</span>' + plata(L * 0.8 * 0.8) + '</div><div class="q">+ 9 cuotas sin interés</div></div>' +
      '</div><div class="pie">Envío gratis <span>a todo el país</span></div>';
  }
  var ficha = null;
  function pintarFicha() {
    if (!ficha) return;
    var x = precios(ficha.pd, ficha.cp);
    if (!x.p) return;
    var clave = x.p + '|' + x.tachado;
    if (ficha.clave === clave) return;
    ficha.clave = clave;
    ficha.fp.innerHTML = '<s class="tc">' + plata(x.tachado) + '</s><div class="tr"><b>' + plata(x.transf) + '</b><small>Por transferencia</small></div>' +
      '<div class="l1"><b>' + plata(x.con10) + '</b><span class="ct">con tarjeta</span><i>' + x.off + '% OFF</i></div>' +
      '<div class="cu">6 cuotas sin interés de <b>' + plata(x.con10 / 6) + '</b> · 9 cuotas desde $200.000</div>';
    ficha.x.innerHTML = escalera(x.p);
  }
  function iniciarFicha() {
    if (ficha) return;
    var pd = d.querySelector('#price_display'); if (!pd) return;
    var cp = d.querySelector('#compare_price_display');
    // lo que se esconde: el precio y el tachado del tema y el bloque de precios del sello de la ficha (por CSS, así también
    // queda escondido si el sello lo dibuja después que esto)
    var cont = pd.parentElement;
    [pd, cp].forEach(function (el) { if (el) el.classList.add('flbf-ficha-oculto'); });
    if (cont && cont.parentElement) cont.parentElement.classList.add('flbf-zona');
    var fp = d.createElement('div'); fp.className = 'flbf-fp';
    var x = d.createElement('div'); x.className = 'flbf-x';
    var ancla = cont || pd;
    ancla.parentNode.insertBefore(fp, ancla.nextSibling);
    fp.parentNode.insertBefore(x, fp.nextSibling);
    ficha = { pd: pd, cp: cp, fp: fp, x: x, clave: '' };
    pintarFicha();
    if (w.MutationObserver) {
      var mo = new MutationObserver(function () { pintarFicha(); });
      mo.observe(pd, { attributes: true, childList: true, characterData: true, subtree: true });
      if (cp) mo.observe(cp, { attributes: true, childList: true, characterData: true, subtree: true });
    }
  }

  // ---------- 3) carrito: «te faltan $X» ----------
  function subtotalDe(form) {
    var el = form.querySelector('.js-cart-subtotal[data-priceraw]') || form.querySelector('[data-component="cart.subtotal"]');
    var v = el ? (+el.getAttribute('data-priceraw') / 100 || num(el.textContent)) : 0;
    if (!v) { try { v = (+w.LS.cart.subtotal || 0) / 100; } catch (e) {} }
    return v;
  }
  function htmlCarrito(sub) {
    var k, h, s;
    if (sub < T15) { k = 'Black Friday · ya tenés <b>10% OFF</b>'; h = 'Te faltan <b>' + plata(T15 - sub) + '</b> para el 15% OFF'; s = 'Sumá otra prenda y llegás'; }
    else if (sub < T20) { k = 'Black Friday · ¡ya tenés <b>15% OFF</b>!'; h = 'Te faltan <b>' + plata(T20 - sub) + '</b> para el 20% OFF + 9 cuotas'; s = 'Con una remera o una bermuda más, llegás'; }
    else { k = 'Black Friday · el descuento más grande'; h = '¡Tenés <b>20% OFF</b> + 9 cuotas sin interés!'; s = ''; }
    var tope = T20 * 1.15, pct = Math.min(sub / tope, 1) * 100, x15 = T15 / tope * 100, x20 = T20 / tope * 100;
    return '<div class="k"><i></i>' + k + '</div><div class="h">' + h + '</div>' +
      '<div class="bar"><div class="f" style="width:' + pct.toFixed(1) + '%"></div><div class="t si" style="left:0"></div>' +
      '<div class="t' + (sub >= T15 ? ' si' : '') + '" style="left:calc(' + x15.toFixed(1) + '% - 1px)"></div><div class="t' + (sub >= T20 ? ' si' : '') + '" style="left:calc(' + x20.toFixed(1) + '% - 1px)"></div></div>' +
      '<div class="lb"><span class="si" style="left:0"><b>10%</b><br>en todo</span>' +
      '<span class="' + (sub >= T15 ? 'si' : '') + '" style="left:' + x15.toFixed(1) + '%;transform:translateX(-50%);text-align:center"><b>15%</b><br>$140.000</span>' +
      '<span class="' + (sub >= T20 ? 'si' : '') + '" style="left:' + x20.toFixed(1) + '%;transform:translateX(-50%);text-align:center"><b>20% + 9 cuotas</b><br>$200.000</span></div>' +
      '<div class="tx">+20% OFF extra abonando por transferencia</div>' + (s ? '<div class="s">' + s + '</div>' : '');
  }
  function carritos() {
    $$('.js-ajax-cart-list').forEach(function (lista) {
      var form = (lista.closest && lista.closest('form, .js-ajax-cart-panel')) || lista.parentNode;
      var box = form.querySelector('.flbf-c');
      if (!box) {
        box = d.createElement('div'); box.className = 'flbf-c'; box.setAttribute('aria-live', 'polite');
        var despues = lista.nextElementSibling && /after_line_items/.test(lista.nextElementSibling.getAttribute('data-nubesdk-slot') || '') ? lista.nextElementSibling : lista;
        despues.parentNode.insertBefore(box, despues.nextSibling);
      }
      var sub = subtotalDe(form);
      var hay = !!lista.querySelector('.js-cart-item');
      box.style.display = sub > 0 && hay ? '' : 'none';
      var clave = String(sub);
      if (box.getAttribute('data-sub') !== clave) { box.setAttribute('data-sub', clave); box.innerHTML = htmlCarrito(sub); }
    });
  }

  // ---------- 4) banner primero en los carruseles del inicio ----------
  function slide(movil) {
    var img = movil
      ? '<img class="slider-image" width="800" height="1000" fetchpriority="high" alt="' + ALT + '" src="' + CDN + 'bf-celular-800x1000.gif">'
      : '<img class="slider-image" width="1440" height="547" fetchpriority="high" alt="' + ALT + '" src="' + CDN + 'bf-compu-1440x547.gif" srcset="' +
        CDN + 'bf-compu-1440x547.gif 1440w, ' + CDN + 'bf-compu-1920x729.gif 1920w" sizes="100vw">';
    return '<div class="swiper-slide slide-container flbf-slide"><a href="/productos/" aria-label="' + ALT + '"><div class="slider-slide">' + img + '</div></a></div>';
  }
  function banner() {
    [['.js-home-slider', 0], ['.js-home-slider-mobile', 1]].forEach(function (p) {
      var el = d.querySelector(p[0]);
      if (!el || el.getAttribute('data-flbf')) return;
      el.setAttribute('data-flbf', '1');
      var html = slide(p[1]), s = el.swiper;
      if (s && s.prependSlide) {
        s.prependSlide(html); s.slideTo(0, 0); s.update();
        if (s.pagination && s.pagination.render) { s.pagination.render(); s.pagination.update(); }
      } else {
        var wr = el.querySelector('.swiper-wrapper');
        if (wr) wr.insertAdjacentHTML('afterbegin', html);
      }
    });
  }

  // «Envío gratis superando los $180.000,00» (renglón del tema en la ficha) → «Envío gratis a todo el país»
  function envioTexto() {
    if (!d.body || !d.createTreeWalker) return;
    var tw = d.createTreeWalker(d.body, 4, null, false), n, re = /superando (los )?\$\s?[\d.,]+/i;
    while ((n = tw.nextNode())) {
      if (re.test(n.nodeValue) && !(n.parentNode && n.parentNode.closest && n.parentNode.closest('.js-adbar, script, style'))) n.nodeValue = n.nodeValue.replace(re, 'a todo el país');
    }
  }

  // para el bloque 15 («compra fácil»): la misma barra en la hoja que aparece al agregar una prenda
  P.carritoHTML = htmlCarrito;
  P.subtotal = function () {
    var f = d.querySelector('form.js-ajax-cart-panel') || d.querySelector('.js-ajax-cart-panel');
    if (f) return subtotalDe(f);
    try { return (+w.LS.cart.subtotal || 0) / 100; } catch (e) { return 0; }
  };

  // ---------- 4) cintas de las categorías (las arma el bloque 7 dentro de #flcatp): textos del Black Friday ----------
  function cintas() {
    var c = d.getElementById('flcatp'); if (!c) return;
    var n = c.querySelector('.ci.n > div'), r = c.querySelector('.ci.r > div');
    if (!n || !r || n.getAttribute('data-flbf')) return;
    function rep(a) { var s = ''; for (var i = 0; i < 4; i++) a.forEach(function (t) { s += t + '<em>\u2726</em>'; }); return s; }
    n.innerHTML = rep(['<b>Black Friday</b>', 'Hasta 40% OFF por transferencia', 'Más llevás, más ahorrás']);
    r.innerHTML = rep(['Envío gratis a todo el país', '9 cuotas sin interés desde $200.000', 'Hasta el 30 de noviembre']);
    n.setAttribute('data-flbf', '1');
  }

  function todo() {
    try { tarjetas(); } catch (e) { P.errT = String(e); }
    try { cintas(); } catch (e) { P.errCi = String(e); }
    try { iniciarFicha(); } catch (e) { P.errF = String(e); }
    try { carritos(); } catch (e) { P.errC = String(e); }
    try { if (ficha) envioTexto(); } catch (e) { P.errE = String(e); }
  }
  try { banner(); } catch (e) { P.errSlide = String(e); }
  todo();
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', function () { try { banner(); } catch (e) { P.errSlide = String(e); } todo(); });
  // prendas que aparecen después (scroll infinito, carruseles, carrito que se actualiza): un repaso liviano
  if (w.MutationObserver) {
    var pend = false;
    new MutationObserver(function () {
      if (pend) return; pend = true;
      setTimeout(function () { pend = false; todo(); }, 120);
    }).observe(d.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-priceraw'] });
  } else { setInterval(todo, 800); }
})(window, document);
/* + Barra de anuncios ordenada (FLBA v1.0.4 = v1.0.3 + gancho del Black Friday, 25-nov-2026) · fuente: FL GRAL/black-friday-2026/codigo-web/barra.src.js */
/* FL Indumentaria · Barra de anuncios ordenada (opción 1, elegida el 28-oct-2026) · v1.0.4 (+ Black Friday, 25-nov-2026)
   Va AL FINAL del bloque 1 (b1/categorias-y-numeros.js en github.com/MTCONSULTORES/fl-tienda), que se carga con defer
   en todas las páginas: corre antes que el tema calcule la velocidad de la cinta (DOMContentLoaded), así que la velocidad
   sale bien sola.
   - El estilo (letra, rombito celeste entre mensajes, lugar del ícono) está en el CSS avanzado: «FL barra de anuncios».
   - Tiendanube deja SOLO 3 mensajes: si uno trae « + » (con espacios), se parte en dos (cada uno con su ícono y su rombito).
   - Acá: ícono dibujado según la palabra (winter/invierno, transferencia, envío, cuotas; «sale» solo NO, para que un Hot Sale no lleve copo), saca emojis que se cuelen en el panel,
     y el mensaje de la Winter se apaga solo el 1-nov-2026 00:00 (Argentina). */
(function (w, d) {
  if (w.FLBA) return;
  w.FLBA = { v: '1.0.4' };
  var FIN_WINTER = Date.parse('2026-11-01T00:00:00-03:00');
  var IC = {
    copo: '<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 4l3 3 3-3M9 20l3-3 3 3"/>',
    porc: '<circle cx="7" cy="7" r="2.4"/><circle cx="17" cy="17" r="2.4"/><path d="M19 5L5 19"/>',
    envio: '<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7"/><circle cx="6.5" cy="17" r="1.8"/><circle cx="17" cy="17" r="1.8"/>',
    tarjeta: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>'
  };
  var REGLAS = [[/winter|invierno/i, 'copo'], [/transfer/i, 'porc'], [/env[ií]o/i, 'envio'], [/cuota/i, 'tarjeta']];
  var EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{1F1E6}-\u{1F1FF}️‍⃣]/gu;

  function arreglar() {
    var hoy = Date.now();
    d.querySelectorAll('.js-adbar .adbar-message').forEach(function (m) {
      if (m.getAttribute('data-flba')) return;
      var partes = m.textContent.replace(EMOJI, '').split(/\s\+\s/), els = [m];
      for (var k = 1; k < partes.length; k++) { els[k] = m.cloneNode(false); els[k - 1].after(els[k]); }   // primero insertar todos
      els.forEach(function (el, k) { marcar(el, partes[k].replace(/\s+/g, ' ').trim(), hoy); });
    });
    // si se apagaron todos (después del 31 y nadie cambió el panel), que no quede la franja bordó vacía
    var bar = d.querySelector('.js-adbar');
    if (bar && !bar.querySelector('.adbar-message')) bar.style.display = 'none';
  }
  function marcar(m, t, hoy) {
    // promo «Envío gratis 48 hs» (22 y 23-nov-2026, ver FLP48 más arriba): el mensaje del envío cambia solo mientras está prendida
    var P = w.FLP48;
    if (P && P.activa && /env[ií]o/i.test(t) && /superando|180/i.test(t)) t = P.textoBarra;
    // Black Friday (27 al 30-nov-2026, ver FLBF más arriba): los 3 mensajes pasan a los del Black Friday mientras está prendido
    var BF = w.FLBF;
    if (BF && BF.activa && BF.textoBarra) t = BF.textoBarra(t);
    if (!t || (hoy >= FIN_WINTER && /winter/i.test(t))) { m.remove(); return; }
    if (t !== m.textContent) m.textContent = t;
    var ic = '';
    for (var i = 0; i < REGLAS.length; i++) if (REGLAS[i][0].test(t)) { ic = REGLAS[i][1]; break; }
    m.setAttribute('data-flba', ic || 'sin');
    m.classList.add('flba-' + (ic || 'sin'));
    if (ic) m.insertAdjacentHTML('afterbegin', '<svg class="flba-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IC[ic] + '</svg>');
  }
  // la velocidad la calcula el tema (5 s cada 300 px; +20 s en compu si da menos de 40) cuando mide la cinta. A veces mide
  // ANTES de que esto la cambie y la cinta queda más lenta: se vuelve a calcular igual que el tema (solo la duración: no arranca de cero)
  function velocidad() {
    var an = d.querySelector('.js-adbar-animated'), c = d.querySelector('.js-adbar-text-container');
    if (!an || !c || !/marquee/.test(an.style.animation)) return;
    var s = 5 * c.offsetWidth / 300;
    if (w.innerWidth > 768 && s < 40) s += 20;
    if (Math.abs(parseFloat(an.style.animationDuration) - s) > .5) an.style.animationDuration = s + 's';
  }
  function velocidadSegura() { try { velocidad(); } catch (e) { w.FLBA.err = String(e); } }
  try { arreglar(); } catch (e) { w.FLBA.err = String(e); }
  velocidadSegura();
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', velocidadSegura);
  w.addEventListener('load', velocidadSegura);
})(window, document);
