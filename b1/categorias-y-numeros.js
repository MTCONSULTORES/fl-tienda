/* FL Indumentaria · Barra de categorías en compu y números que suben (bloque 1, v1.0.1) · fuente: bloque1/b1.src.js (en la Mac: FL GRAL/ideas-atlas-destino/) */
!function(t,e){if(!t.FLB1){t.FLB1={v:"1.0.1"};var a="#4E0A06",n="#3887C4";try{/[?&]flprueba=0/.test(location.search)?sessionStorage.removeItem("flb1"):/[?&]flprueba/.test(location.search)&&sessionStorage.setItem("flb1","1")}catch(t){}try{"1"===sessionStorage.getItem("flb1")}catch(t){}!1,t.FLB1.activo=!0;var r=t.matchMedia&&t.matchMedia("(prefers-reduced-motion: reduce)").matches,i="/"===location.pathname||""===location.pathname;"loading"===e.readyState?e.addEventListener("DOMContentLoaded",u):u()}function o(t){return String(null==t?"":t).replace(/[&<>"]/g,function(t){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[t]})}function l(t,e){var a=[];if(!t)return a;for(var n=0;n<t.children.length;n++)t.children[n].tagName===e&&a.push(t.children[n]);return a}function s(t){for(var e=0;e<t.children.length;e++){var a=t.children[e];if("A"===a.tagName)return a;if("UL"!==a.tagName){var n=a.querySelector("a");if(n)return n}}return null}function c(t){var e=t.querySelector('[data-flp="t"]');return(e?e.textContent:t.textContent).replace(/\s+/g," ").trim()}function d(t){return t.replace(/\s*\/\s*/g," / ")}function f(){var i=e.querySelector("header.js-head-main");if(i&&!e.getElementById("flb1cat")){var f=e.querySelector(".nav-list");if(f){for(var p=null,u=l(f,"LI"),h=0;h<u.length;h++){var b=s(u[h]);if(u[h].querySelector("ul")&&b&&/productos/i.test(b.textContent)){p=u[h];break}}if(p){var g=[],v=null;if(l(p.querySelector("ul"),"LI").forEach(function(t){var e=s(t);if(e){var a=c(e),n=e.getAttribute("href");if(/^ver tod/i.test(a))n&&"#"!==n&&(v=n);else{var r=t.querySelector("ul"),i={t:a,h:n,ws:/winter/i.test(a),hijos:[]};r&&(l(r,"LI").forEach(function(t){var e=s(t);if(e){var a=c(e),n=e.getAttribute("href");/^ver tod/i.test(a)?n&&"#"!==n&&(i.h=n):n&&"#"!==n&&i.hijos.push({t:a,h:n})}}),i.h&&"#"!==i.h||!i.hijos.length||(i.h=i.hijos[0].h)),i.h&&"#"!==i.h&&g.push(i)}}}),!(g.length<2)){var m,x,y=location.pathname.replace(/\/+$/,"")+"/",w='<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';m='#flb1cat{display:none}@media (min-width:992px){#flb1cat{display:block;position:relative;border-top:1px solid rgba(17,17,17,.12);font-family:inherit;color:#111}#flb1cat *{box-sizing:border-box}#flb1cat .in{display:flex;align-items:center;height:46px;padding:0 24px;gap:4px}#flb1cat .cb{flex:0 0 auto;display:inline-flex;align-items:center;gap:7px;height:22px;margin:0 8px 0 0;padding:0 18px 0 0;border:0;border-right:1px solid rgba(17,17,17,.18);background:none;font-family:inherit;font-weight:800;font-size:12.5px;line-height:1;letter-spacing:.09em;text-transform:uppercase;color:#111;cursor:pointer}#flb1cat .cb svg{width:12px;height:12px;transition:transform .2s ease}#flb1cat .cb[aria-expanded="true"] svg{transform:rotate(180deg)}#flb1cat .vp{flex:1 1 auto;min-width:0;overflow-x:auto;overflow-y:hidden;scrollbar-width:none}#flb1cat .vp::-webkit-scrollbar{display:none}#flb1cat.desb .vp{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 28px,#000 calc(100% - 28px),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 28px,#000 calc(100% - 28px),transparent 100%)}#flb1cat .tr{display:flex;gap:30px;list-style:none!important;margin:0!important;padding:0 14px!important;white-space:nowrap}#flb1cat .tr li{list-style:none!important;margin:0!important;padding:0!important}#flb1cat .tr a{position:relative;display:block;padding:15px 0;font-weight:600;font-size:12.5px;line-height:16px;letter-spacing:.07em;text-transform:uppercase;color:#111!important;text-decoration:none!important}#flb1cat .tr a:after{content:"";position:absolute;left:0;right:0;bottom:10px;height:2px;background:'+a+";transform:scaleX(0);transition:transform .25s ease}#flb1cat .tr a:hover:after,#flb1cat .tr a.on:after{transform:scaleX(1)}#flb1cat .tr a.on{font-weight:800}#flb1cat .tr a.ws{color:"+n+"!important}#flb1cat .tr a.ws:after{background:"+n+"}#flb1cat .ar{flex:0 0 auto;display:none;width:30px;height:30px;padding:0;border:0;border-radius:50%;background:none;color:#111;cursor:pointer}#flb1cat .ar svg{width:14px;height:14px}#flb1cat .pv svg{transform:rotate(90deg)}#flb1cat .nx svg{transform:rotate(-90deg)}#flb1cat.desb .ar{display:inline-flex;align-items:center;justify-content:center}#flb1cat .ar:hover{background:rgba(17,17,17,.07)}#flb1cat .ar[disabled]{opacity:.25;cursor:default;background:none}#flb1cat .pan{position:absolute;left:24px;top:100%;z-index:5;min-width:600px;max-width:calc(100% - 48px);padding:22px 28px 18px;background:#FAF8F3;border:1px solid rgba(17,17,17,.14);box-shadow:0 22px 44px rgba(0,0,0,.13);-webkit-columns:3 170px;columns:3 170px;-webkit-column-gap:36px;column-gap:36px}#flb1cat .pan>div{-webkit-column-break-inside:avoid;break-inside:avoid}#flb1cat .pan[hidden]{display:none}#flb1cat .pan a{display:block;padding:8px 0;font-weight:700;font-size:13px;letter-spacing:.05em;text-transform:uppercase;color:#111!important;text-decoration:none!important}#flb1cat .pan a:hover{color:"+a+"!important}#flb1cat .pan a.ws{color:"+n+"!important}#flb1cat .pan .sb a{padding:4px 0 4px 12px;font-weight:500;text-transform:none;letter-spacing:0;color:#555!important}#flb1cat .pan .td{-webkit-column-span:all;column-span:all;margin-top:10px;padding-top:12px;border-top:1px solid rgba(17,17,17,.12)}#flb1cat .pan .td a{display:inline-block}}",(x=e.createElement("style")).textContent=m,e.head.appendChild(x);var k="",L="";g.forEach(function(t){var e=(t.ws?"ws":"")+(T(t.h)?" on":"");k+='<li><a class="'+e+'" href="'+o(t.h)+'">'+o(d(t.t))+"</a></li>",L+='<div><a class="'+(t.ws?"ws":"")+'" href="'+o(t.h)+'">'+o(d(t.t))+"</a>",t.hijos.length&&(L+='<div class="sb">',t.hijos.forEach(function(t){L+='<a href="'+o(t.h)+'">'+o(t.t)+"</a>"}),L+="</div>"),L+="</div>"}),v&&(k+='<li><a href="'+o(v)+'"'+(T(v,!0)?' class="on"':"")+">Ver todo</a></li>",L+='<div class="td"><a href="'+o(v)+'">Ver todos los productos \u2192</a></div>');var S=e.createElement("div");S.id="flb1cat",S.innerHTML='<nav class="in" aria-label="Categor\xedas"><button type="button" class="cb" aria-expanded="false" aria-controls="flb1pan">Categor\xedas '+w+'</button><button type="button" class="ar pv" aria-label="Ver categor\xedas anteriores">'+w+'</button><div class="vp"><ul class="tr">'+k+'</ul></div><button type="button" class="ar nx" aria-label="Ver m\xe1s categor\xedas">'+w+'</button></nav><div class="pan" id="flb1pan" hidden>'+L+"</div>",i.appendChild(S);var E=S.querySelector(".cb"),q=S.querySelector(".pan"),C=S.querySelector(".vp"),B=S.querySelector(".pv"),I=S.querySelector(".nx"),A=0;E.addEventListener("click",function(){z(q.hidden)}),E.addEventListener("mouseenter",function(){z(!0)}),q.addEventListener("mouseenter",function(){clearTimeout(A)}),S.addEventListener("mouseleave",function(){A=setTimeout(function(){z(!1)},220)}),e.addEventListener("keydown",function(t){"Escape"!==t.key&&27!==t.keyCode||q.hidden||(z(!1),E.focus())}),e.addEventListener("click",function(t){q.hidden||S.contains(t.target)||z(!1)}),B.addEventListener("click",function(){V(-1)}),I.addEventListener("click",function(){V(1)}),C.addEventListener("scroll",O,{passive:!0}),t.addEventListener("resize",O);var F=S.querySelector(".tr a.on");if(F){var M=F.getBoundingClientRect(),j=C.getBoundingClientRect();(M.left<j.left+28||M.right>j.right-28)&&(C.scrollLeft+=M.left-j.left-40)}O(),e.fonts&&e.fonts.ready&&e.fonts.ready.then(O)}}}}function T(t,e){try{var a=new URL(t,location.href).pathname.replace(/\/+$/,"")+"/";return"/"!==a&&(e?y===a:0===y.indexOf(a))}catch(t){return!1}}function z(t){clearTimeout(A),q.hidden=!t,E.setAttribute("aria-expanded",t?"true":"false")}function O(){var t=C.scrollWidth-C.clientWidth;S.classList.toggle("desb",t>2),B.disabled=C.scrollLeft<=2,I.disabled=C.scrollLeft>=t-2}function V(t){var e=C.scrollLeft+t*C.clientWidth*.7;C.scrollTo?C.scrollTo({left:e,behavior:r?"auto":"smooth"}):C.scrollLeft=e}}function p(){if("IntersectionObserver"in t&&!r){var a=e.getElementById("flstats");if(a)return i(a);if(t.MutationObserver){var n=new MutationObserver(function(){var t=e.getElementById("flstats");t&&(n.disconnect(),i(t))});n.observe(e.body,{childList:!0,subtree:!0})}}function i(e){if(!e.getAttribute("data-flb1")){e.setAttribute("data-flb1","1");for(var a=[],n=e.querySelectorAll(".v, .k"),r=0;r<n.length;r++)for(var i=0;i<n[r].childNodes.length;i++){var o=n[r].childNodes[i];if(3===o.nodeType){var l=o.nodeValue.match(/^(\D*?)(\d{1,3}(?:\.\d{3})+)([\s\S]*)$/);l&&a.push({nd:o,pre:l[1],fin:+l[2].replace(/\./g,""),post:l[3]})}}if(a.length){var s=new IntersectionObserver(function(e){if(e[0].isIntersecting){s.disconnect();var n=0;t.requestAnimationFrame(function e(r){n||(n=r);var i=Math.min(1,(r-n)/1600),o=1-Math.pow(1-i,3);a.forEach(function(t){var e;t.nd.nodeValue=t.pre+(e=t.fin*o,String(Math.round(e)).replace(/\B(?=(\d{3})+(?!\d))/g,"."))+t.post}),i<1&&t.requestAnimationFrame(e)})}},{threshold:.5});s.observe(e)}}}}function u(){try{f()}catch(e){t.FLB1.err=String(e)}var a=e.querySelector("header.js-head-main");a&&a.classList.add("flb1");try{i&&p()}catch(e){t.FLB1.err=String(e)}}}(window,document);
/* + Promo Envío gratis 48 hs (FLP48 v1.0.0, 21-nov-2026) · fuente: FL GRAL/cyber-monday-2026/animacion-48hs/codigo/promo48.src.js */
/* FL Indumentaria · Promo «ENVÍO GRATIS 48 HS» (domingo 22 y lunes 23 de noviembre de 2026) · v1.0.0
   Va en el bloque 1 (b1/categorias-y-numeros.js en github.com/MTCONSULTORES/fl-tienda), que se carga con defer en todas las páginas.
   Se prende SOLA el domingo 22-nov 00:00 (Argentina) y se apaga SOLA el martes 24-nov 00:00: compara con el reloj de quien mira la tienda.
   Antes y después de esas fechas NO hace nada (ni siquiera toca la página). Cuando está prendida:
   1) barra de arriba: «Envío gratis superando $…» pasa a «Envío gratis solo domingo y lunes» (lo cambia la barra FLBA, más abajo, con FLP48.textoBarra);
   2) etiqueta «ENVÍO GRATIS DOM Y LUN» arriba a la derecha de la foto de cada prenda (CSS; la misma del Cyber);
   3) en el inicio, el banner animado como PRIMERA imagen del carrusel (compu y celular); el de siempre queda segundo.
   ?flprueba48 en la dirección = la muestra prendida fuera de fecha (para mirarla antes o después).
   Esto NO cambia lo que se cobra: la regla de Descuentos › Envío gratis la maneja Facundo en el panel. */
(function (w, d) {
  if (w.FLP48) return;
  var INI = Date.parse('2026-11-22T00:00:00-03:00'), FIN = Date.parse('2026-11-24T00:00:00-03:00');
  var P = w.FLP48 = { v: '1.0.0', activa: false, textoBarra: 'Envío gratis solo domingo y lunes' };
  try {
    var t = Date.now();
    P.activa = (t >= INI && t < FIN) || /[?&]flprueba48(?:[=&]|$)/.test(w.location.search);
  } catch (e) { P.err = String(e); }
  if (!P.activa) return;

  var CDN = 'https://cdn.jsdelivr.net/gh/MTCONSULTORES/fl-tienda@0c1292ce6a6e852e53930852053027edbb5bf736/b16/';
  var ALT = 'Envío gratis solo domingo y lunes';

  // 2) la etiqueta de cada prenda
  try {
    var css = 'html.flp48 .js-item-product .js-product-item-image-container-private:before{content:"ENV\\00CDO GRATIS DOM Y LUN";position:absolute;top:10px;right:10px;z-index:4;display:flex;align-items:center;height:18px;padding:1px 6px 0 16px;box-sizing:border-box;background:#0b0b0b linear-gradient(#e3311d,#e3311d) no-repeat 7px 50%/5px 5px;color:#f2ede4;font:700 8px/1 "Geist Mono",ui-monospace,Menlo,monospace;letter-spacing:.14em;white-space:nowrap;pointer-events:none}' +
      '@media(min-width:768px){html.flp48 .js-item-product .js-product-item-image-container-private:before{top:14px;right:14px;height:24px;padding:1px 9px 0 22px;background-position:10px 50%;background-size:6px 6px;font-size:10px}}';
    var st = d.createElement('style'); st.id = 'flp48-css'; st.textContent = css;
    (d.head || d.documentElement).appendChild(st);
    d.documentElement.classList.add('flp48');
  } catch (e) { P.errCss = String(e); }

  // 3) el banner animado primero en el carrusel del inicio
  function slide(movil) {
    var img = movil
      ? '<img class="slider-image" width="800" height="1000" fetchpriority="high" alt="' + ALT + '" src="' + CDN + 'envio-gratis-48hs-celular-800x1000.gif">'
      : '<img class="slider-image" width="1440" height="547" fetchpriority="high" alt="' + ALT + '" src="' + CDN + 'envio-gratis-48hs-compu-1440x547.gif" srcset="' +
        CDN + 'envio-gratis-48hs-compu-1440x547.gif 1440w, ' + CDN + 'envio-gratis-48hs-compu-1920x729.gif 1920w" sizes="100vw">';
    return '<div class="swiper-slide slide-container flp48-slide"><a href="/news-in/" aria-label="' + ALT + '"><div class="slider-slide">' + img + '</div></a></div>';
  }
  function meter() {
    [['.js-home-slider', 0], ['.js-home-slider-mobile', 1]].forEach(function (p) {
      var el = d.querySelector(p[0]);
      if (!el || el.getAttribute('data-flp48')) return;
      el.setAttribute('data-flp48', '1');
      var html = slide(p[1]), s = el.swiper;
      if (s && s.prependSlide) {            // el tema ya armó el carrusel: se le suma la imagen primera
        s.prependSlide(html); s.slideTo(0, 0); s.update();
        if (s.pagination && s.pagination.render) { s.pagination.render(); s.pagination.update(); }
      } else {                              // todavía no: se la deja en el HTML y el tema arma el carrusel ya con las dos
        var wr = el.querySelector('.swiper-wrapper');
        if (wr) wr.insertAdjacentHTML('afterbegin', html);
      }
    });
  }
  try { meter(); } catch (e) { P.errSlide = String(e); }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', function () { try { meter(); } catch (e) { P.errSlide = String(e); } });
})(window, document);
/* + Barra de anuncios ordenada (FLBA v1.0.3 = v1.0.2 + gancho de la promo, 21-nov-2026) · fuente: FL GRAL/cyber-monday-2026/animacion-48hs/codigo/barra.src.js */
/* FL Indumentaria · Barra de anuncios ordenada (opción 1, elegida el 28-oct-2026) · v1.0.0
   Va AL FINAL del bloque 1 (b1/categorias-y-numeros.js en github.com/MTCONSULTORES/fl-tienda), que se carga con defer
   en todas las páginas: corre antes que el tema calcule la velocidad de la cinta (DOMContentLoaded), así que la velocidad
   sale bien sola.
   - El estilo (letra, rombito celeste entre mensajes, lugar del ícono) está en el CSS avanzado: «FL barra de anuncios».
   - Tiendanube deja SOLO 3 mensajes: si uno trae « + » (con espacios), se parte en dos (cada uno con su ícono y su rombito).
   - Acá: ícono dibujado según la palabra (winter/invierno, transferencia, envío, cuotas; «sale» solo NO, para que un Hot Sale no lleve copo), saca emojis que se cuelen en el panel,
     y el mensaje de la Winter se apaga solo el 1-nov-2026 00:00 (Argentina). */
(function (w, d) {
  if (w.FLBA) return;
  w.FLBA = { v: '1.0.3' };
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
