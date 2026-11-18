const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,cur={};
const band=b=>b>10?'bad':b>5?'warn':'ok';
function tween(id,to,fmt){const el=$('#'+id),from=cur[id]??to;cur[id]=to;if(RM||from===to){el.textContent=fmt(to);return}
 const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/300),e=1-Math.pow(1-k,3);el.textContent=fmt(from+(to-from)*e);if(k<1)requestAnimationFrame(f)})(t0)}
function renderSim(cut){
 const [ap,vol,bad,dis,loss,prof,ret]=DATA.sim[cut],b=band(bad),A=Math.round(ap),D=Math.round(ap*bad/100);
 tween('cut-out',cut,v=>Math.round(v));tween('s-ap',ap,v=>v.toFixed(1)+'%');tween('s-bad',bad,v=>v.toFixed(2)+'%');
 tween('s-dis',dis,v=>'$'+v.toFixed(1)+'M');tween('s-loss',loss,v=>'$'+v.toFixed(2)+'M');tween('s-prof',prof,v=>'$'+v.toFixed(2)+'M');
 $('#s-vol').textContent=vol.toLocaleString('en-US')+' loans approved';$('#s-ret').textContent='Return '+ret.toFixed(2)+'%';
 $('#s-bad').className='v '+b;const c=$('#s-chip');c.className='tag '+b;c.textContent=bad<DATA.riskCap?'within 5% cap':'above 5% cap';
 $$('#wf i').forEach((e,i)=>e.className=i<A-D?'a':i<A?'d':'');
 $('#wf-a').textContent=A-D;$('#wf-d').textContent=D;$('#wf-x').textContent=100-A;
 $('#mk').style.left=(cut-460)/150*100+'%';$('#mk-v').textContent=cut;
 if(window.tradeInst)tradeInst.update('none');
}
