(function(){
 document.documentElement.classList.add('js');
 $('#kpis').innerHTML=DATA.kpis.map(k=>`<div><div class="l">${k.l}</div><div class="v ${k.c}">${k.v}</div><div class="n">${k.n}</div></div>`).join('');
 $('#tiers').innerHTML=DATA.tiers.map(t=>`<div><b class="${t.c}">${t.v.toFixed(1)}%</b><span class="n">${t.n}</span></div>`).join('');
 $('#drv').innerHTML=DATA.drivers.map(d=>`<div><code>${d[0]}</code><span>${d[1]}</span><span class="pips" aria-label="impact ${d[2]} of 3">${[1,2,3].map(i=>`<i class="${i<=d[2]?'on':''}"></i>`).join('')}</span></div>`).join('');
 $('#stack').innerHTML=DATA.stack.map(s=>`<div><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('');
 $('#wf').innerHTML=Array.from({length:100},(_,i)=>`<i style="--i:${i}"></i>`).join('');
 const sl=$('#sl');sl.addEventListener('input',e=>renderSim(+e.target.value));renderSim(+sl.value);
 $$('.stg').forEach(g=>[...g.children].forEach((c,i)=>c.style.setProperty('--i',i)));
 if(window.Chart){chartDefaults();const lz=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){lz.unobserve(e.target);(e.target.id==='tierChart'?mkTier:mkTrade)()}}),{threshold:.3});['tierChart','tradeChart'].forEach(i=>lz.observe($('#'+i)))}
 const links=$$('.bar nav a'),secs=$$('main section[id],section[id]');
 const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{rootMargin:'0px 0px -6% 0px'});
 $$('.rv,.stg').forEach(e=>rv.observe(e));
 const pl=$('.pill'),pill=()=>{const a=$('.bar nav a.on');if(a){pl.style.width=a.offsetWidth+'px';pl.style.transform='translateX('+a.offsetLeft+'px)'}};addEventListener('resize',pill);
 let tk=0;const nav=()=>{tk=0;let id=secs[0].id;secs.forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.4)id=s.id});if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)id=secs[secs.length-1].id;links.forEach(a=>a.classList.toggle('on',a.hash==='#'+id));pill()};
 addEventListener('scroll',()=>{tk||(tk=requestAnimationFrame(nav))},{passive:true});nav();
})();
