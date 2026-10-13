const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');if(menu){menu.addEventListener('click',()=>{menu.classList.toggle('open');nav.classList.toggle('open');menu.setAttribute('aria-expanded',menu.classList.contains('open'))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');nav.classList.remove('open')}))}const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));const counters=document.querySelectorAll('[data-count]');const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=+el.dataset.count,duration=1200,start=performance.now();const tick=now=>{const p=Math.min((now-start)/duration,1);el.textContent=Math.floor(target*(1-Math.pow(1-p,3))).toLocaleString();if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);countObserver.unobserve(el)}),{threshold:.5});counters.forEach(el=>countObserver.observe(el));const form=document.querySelector('#contactForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();const btn=form.querySelector('button');btn.textContent='送信を受け付けました（デモ）';btn.disabled=true;setTimeout(()=>{btn.innerHTML='入力内容を送信する <span>→</span>';btn.disabled=false;form.reset()},3000)});

const fitJapaneseHeadings=()=>{
  document.querySelectorAll('.service-detail h2').forEach(heading=>{
    heading.style.removeProperty('font-size');
    const computed=parseFloat(getComputedStyle(heading).fontSize);
    const minSize=Math.max(26,computed*.62);
    let size=computed;
    const available=heading.clientWidth;
    const phrases=[...heading.children].filter(el=>el.tagName==='SPAN');
    const overflows=()=>phrases.length
      ? phrases.some(phrase=>phrase.scrollWidth>available)
      : heading.scrollWidth>available;
    while(size>minSize&&overflows()){
      size-=.5;
      heading.style.fontSize=size+'px';
    }
  });
};
const scheduleHeadingFit=()=>requestAnimationFrame(()=>requestAnimationFrame(fitJapaneseHeadings));
window.addEventListener('resize',scheduleHeadingFit,{passive:true});
window.addEventListener('orientationchange',scheduleHeadingFit,{passive:true});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(scheduleHeadingFit);
scheduleHeadingFit();
