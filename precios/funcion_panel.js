async (ID,T,MODO)=>{ const c=document.getElementById('product-row-check-'+ID);
 if(!c) return 'NO ESTA '+ID;
 const tr=c.closest('tr');
 const pc=[...tr.querySelectorAll('input[name="price"]')], pr=[...tr.querySelectorAll('input[name="promotional_price"]')];
 if(pc.length!==T.length||pr.length!==T.length) return 'SALTEADO '+ID+' talles '+pc.length+'/'+pr.length+' (plan '+T.length+')';
 const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; const zz=ms=>new Promise(r=>setTimeout(r,ms));
 const poner=async(el,v)=>{ el.dispatchEvent(new FocusEvent('focusin',{bubbles:true})); el.dispatchEvent(new FocusEvent('focus')); set.call(el,String(v)); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); el.dispatchEvent(new FocusEvent('blur')); el.dispatchEvent(new FocusEvent('focusout',{bubbles:true})); await zz(1300); };
 const n=x=>{ x=String(x).trim(); if(x==='') return ''; const v=/^\d+(\.\d{1,2})?$/.test(x)?parseFloat(x):parseFloat(x.replace(/\./g,'').replace(',','.')); return String(Math.round(v)); };
 const marca=[];
 for(let i=0;i<T.length;i++){
  const [hoy,nueva]=T[i].map(String); const p=n(pc[i].value), q=n(pr[i].value);
  if(MODO==='subir'){
   if(p===hoy&&q===''){ await poner(pc[i],nueva); marca.push('S'); }
   else if(p===nueva&&q==='') marca.push('ya');
   else marca.push('RARO('+p+'/'+q+')');
  } else if(MODO==='cyber'){
   if(p===nueva&&q===''){ await poner(pr[i],hoy); marca.push('C'); }
   else if(p===nueva&&q===hoy) marca.push('ya');
   else marca.push('RARO('+p+'/'+q+')');
  } else if(MODO==='volver'){
   if(p===nueva&&(q===hoy||q==='')){ await poner(pc[i],hoy); if(q!=='') await poner(pr[i],''); marca.push('V'); }
   else if(p===hoy&&q==='') marca.push('ya');
   else if(p===hoy&&q===hoy){ await poner(pr[i],''); marca.push('V2'); }
   else marca.push('RARO('+p+'/'+q+')');
  } else if(MODO==='cambiarpromo'){
   if(q===nueva) marca.push('ya');
   else if(q===hoy){ await poner(pr[i],nueva); marca.push('M'); }
   else marca.push('RARO('+p+'/'+q+')');
  } else if(MODO==='sacarpromo'){
   if(p===nueva&&q===hoy){ await poner(pr[i],''); marca.push('P'); }
   else if(p===nueva&&q==='') marca.push('ya');
   else marca.push('RARO('+p+'/'+q+')');
  } else return 'MODO DESCONOCIDO';
 }
 await zz(1500);
 const fin=pc.map((e,i)=>n(e.value)+'/'+(n(pr[i].value)||'-')).join(' ');
 return (marca.some(m=>m.startsWith('RARO'))?'SALTEADO ':'OK ')+ID+' '+MODO+' ['+marca.join(',')+'] -> '+fin;
}