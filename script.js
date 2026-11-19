(function(){
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v)),ease=t=>1-Math.pow(1-t,3),$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

/* hero slider */
const hero=$('.hero'),slides=$$('.slide'),dots=$('.dots'),prog=$('.prog'),DUR=4500;let i=0,tm;
slides.forEach((s,n)=>{const b=document.createElement('button');b.setAttribute('aria-label','Go to slide '+(n+1));b.onclick=()=>go(n);dots.appendChild(b)});
function go(n){i=(n+slides.length)%slides.length;
 slides.forEach((s,k)=>{s.classList.toggle('is-active',k===i);s.style.zIndex=k===i?2:1});
 [...dots.children].forEach((d,k)=>d.classList.toggle('on',k===i));
 prog.classList.remove('run');void prog.offsetWidth;
 clearTimeout(tm);if(!reduce){prog.classList.add('run');tm=setTimeout(()=>go(i+1),DUR)}}
$('.next').onclick=()=>go(i+1);$('.prev').onclick=()=>go(i-1);go(0);

/* tabs */
$$('.tabs button').forEach(b=>b.onclick=()=>{
 $$('.tabs button').forEach(x=>x.setAttribute('aria-selected',x===b));
 ['tees','hoods'].forEach(id=>document.getElementById(id).hidden=id!==b.dataset.t);frame()});

/* quick add */
let cart=0;$$('.sz button').forEach(b=>b.onclick=()=>{cart++;$('#cart').textContent='Cart ('+cart+')'});

/* scroll-lit statement */
const st=$('#stmt');st.innerHTML=st.textContent.split(' ').map(w=>`<span>${w}</span>`).join(' ');
const words=$$('#stmt span');

/* tracker bars */
const tr=$('.tr');$$('.tr li').forEach((li,n)=>{li.querySelector('.meter').style.setProperty('--d',n*.08+'s');li.querySelector('.meter').style.setProperty('--s',parseFloat(li.style.getPropertyValue('--w'))/100)});
new IntersectionObserver(([e])=>{if(e.isIntersecting)tr.classList.add('in')},{threshold:.25}).observe(tr);

/* scroll-linked 3D */
const stage=$('.stage'),simg=$('.stage img'),fcap=$('.fcap'),feat=$('.feature'),r1=$('.r1'),r2=$('.r2'),bm=$('.bm');
let tick=false;
function frame(){tick=false;const vh=innerHeight,vw=innerWidth;
 $$('.grid:not([hidden]) .card').forEach(el=>{
  const r=el.getBoundingClientRect(),col=[...el.parentElement.children].indexOf(el)%4;
  const p=ease(clamp((vh*.95-r.top-col*30)/(vh*.5),0,1));
  el.style.opacity=.15+.85*p;
  el.style.transform=`translate3d(0,${(1-p)*70}px,${(p-1)*120}px) rotateX(${(1-p)*26}deg)`});
 let b=bm.getBoundingClientRect(),t=clamp((b.top+b.height/2-vh/2)/(vh/2+b.height/2),-1,1);
 r1.style.transform=`translateX(${-60+t*40}vw)`;r2.style.transform=`translateX(${-140-t*40}vw)`;
 b=st.getBoundingClientRect();const p=clamp((vh*.8-b.top)/(b.height+vh*.25),0,1);
 words.forEach((w,k)=>w.classList.toggle('on',k<p*words.length*1.05));
 const f=feat.getBoundingClientRect();t=clamp((f.top+f.height/2-vh/2)/(vh/2+f.height/2),-1,1);
 stage.style.transform=`rotateX(${t*12}deg) scale(${1.03-Math.abs(t)*.08})`;
 simg.style.transform=`translate3d(0,${t*-6}%,0) scale(${1.06-Math.abs(t)*.06})`;
 fcap.style.transform=`translate3d(${t*50}px,${t*-24}px,0)`}
const req=()=>{if(!tick){tick=true;requestAnimationFrame(frame)}};
if(!reduce){addEventListener('scroll',req,{passive:true});addEventListener('resize',req)}
frame();window.frame=frame;

/* favorites rail */
(function(){
const rail=document.getElementById('rail'),bar=document.getElementById('rbar');
const step=()=>rail.querySelector('.card').offsetWidth+20;
document.getElementById('fn').onclick=()=>rail.scrollBy({left:step(),behavior:'smooth'});
document.getElementById('fp').onclick=()=>rail.scrollBy({left:-step(),behavior:'smooth'});
const upd=()=>{const m=rail.scrollWidth-rail.clientWidth,p=m>0?rail.scrollLeft/m:0,w=bar.parentElement.clientWidth*.25;bar.style.marginLeft=p*(bar.parentElement.clientWidth-w)+'px'};
rail.addEventListener('scroll',upd,{passive:true});upd();
/* lookbook reveal + parallax */
const lks=[...document.querySelectorAll('.lk')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
lks.forEach(l=>io.observe(l));
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function par(){const vh=innerHeight;lks.forEach(l=>{const r=l.getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;
 const t=Math.max(-1,Math.min(1,(r.top+r.height/2-vh/2)/(vh/2+r.height/2))),s=+l.dataset.s;
 l.style.transform=`translate3d(0,${t*s*50}px,0)`;l.querySelector('img').style.transform=`translate3d(0,${t*-6}%,0) scale(1.2)`})}
/* CTA mouse parallax */
const cta=document.getElementById('cta');
cta.addEventListener('pointermove',e=>{const r=cta.getBoundingClientRect();cta.style.setProperty('--mx',(e.clientX-r.left)/r.width-.5);cta.style.setProperty('--my',(e.clientY-r.top)/r.height-.5)});
if(!reduce){addEventListener('scroll',()=>requestAnimationFrame(par),{passive:true});par()}
})();

/* trending preview */
(function(){
const lis=[...document.querySelectorAll('.tr li')],img=document.getElementById('pvi'),ph=document.getElementById('pvp'),nm=document.getElementById('pvn'),rk=document.getElementById('pvr');
function show(li){lis.forEach(x=>x.classList.toggle('on',x===li));
 const u=li.dataset.img;nm.textContent=li.dataset.name;rk.textContent='#'+(lis.indexOf(li)+1);
 img.classList.remove('on');
 if(u){img.onload=()=>img.classList.add('on');img.src=u;img.alt=li.dataset.name;ph.style.display='none'}else{ph.style.display='flex'}}
lis.forEach(li=>{li.addEventListener('mouseenter',()=>show(li));li.addEventListener('focus',()=>show(li));li.addEventListener('click',()=>show(li))});
show(lis.find(l=>l.dataset.img)||lis[0]);
})();
/* mega menu + drawer */
(function(){
const hdr=document.querySelector('.top'),items=[...document.querySelectorAll('.mi[data-m]')],scrim=document.getElementById('scrim'),drawer=document.getElementById('drawer');
let cur=null,ot,ct;
const panel=k=>document.getElementById('mega-'+k);
function open(k){clearTimeout(ct);if(cur===k)return;closeAll(true);cur=k;panel(k).classList.add('open');items.find(i=>i.dataset.m===k).setAttribute('aria-expanded','true');scrim.classList.remove('d');scrim.classList.add('on')}
function closeAll(keep){items.forEach(i=>i.setAttribute('aria-expanded','false'));document.querySelectorAll('.mega.open').forEach(p=>p.classList.remove('open'));cur=null;if(!keep&&!drawer.classList.contains('open'))scrim.classList.remove('on')}
items.forEach(i=>{
 i.addEventListener('mouseenter',()=>{clearTimeout(ot);clearTimeout(ct);ot=setTimeout(()=>open(i.dataset.m),70)});
 i.addEventListener('click',()=>cur===i.dataset.m?closeAll():open(i.dataset.m));
});
document.querySelectorAll('.top .main a').forEach(a=>a.addEventListener('mouseenter',()=>{clearTimeout(ot);ct=setTimeout(()=>closeAll(),120)}));
hdr.addEventListener('mouseleave',()=>{clearTimeout(ot);ct=setTimeout(()=>closeAll(),200)});
hdr.addEventListener('mouseenter',()=>clearTimeout(ct));
addEventListener('keydown',e=>{if(e.key==='Escape'){closeAll();closeDrawer()}});
/* drawer */
function openDrawer(){drawer.classList.add('open');scrim.classList.add('on','d');document.body.style.overflow='hidden'}
function closeDrawer(){drawer.classList.remove('open');scrim.classList.remove('d');if(!cur)scrim.classList.remove('on');document.body.style.overflow=''}
document.getElementById('burger').onclick=openDrawer;document.getElementById('dclose').onclick=closeDrawer;
scrim.onclick=()=>{closeAll();closeDrawer()};
drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeDrawer));
addEventListener('resize',()=>{if(innerWidth>1180)closeDrawer()});
/* trending thumbs for small screens */
document.querySelectorAll('.tr li').forEach(li=>{const u=li.dataset.img;if(u){const im=document.createElement('img');im.className='th';im.src=u;im.alt='';im.loading='lazy';li.insertBefore(im,li.children[1])}});
})();
/* full-width gallery */
(function(){
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const f=document.getElementById('gf'),t=document.getElementById('gt'),orig=[...t.children],n=orig.length;
orig.slice(0,3).forEach(c=>{const k=c.cloneNode(true);k.setAttribute('aria-hidden','true');k.querySelectorAll('a').forEach(a=>a.tabIndex=-1);t.appendChild(k)});
const cn=document.getElementById('gcn'),pr=document.getElementById('gpr');
let v=3,idx=0,tm,busy=false,x0=null;
const vis=()=>innerWidth<=700?1:innerWidth<=1000?2:3;
const set=(i,a)=>{t.style.transition=a?'transform .95s cubic-bezier(.7,0,.2,1)':'none';t.style.transform=`translate3d(${-i*100/v}%,0,0)`};
function ui(){cn.textContent=String(idx%n+1).padStart(2,'0');pr.classList.remove('run');void pr.offsetWidth;if(!reduce)pr.classList.add('run')}
function auto(){clearTimeout(tm);if(!reduce)tm=setTimeout(next,3600)}
function next(){if(busy)return;busy=true;idx++;set(idx,true);ui();setTimeout(()=>{if(idx>=n){idx=0;set(0,false)}busy=false},980);auto()}
function prev(){if(busy)return;busy=true;if(idx===0){idx=n;set(idx,false);void t.offsetWidth}idx--;set(idx,true);ui();setTimeout(()=>busy=false,980);auto()}
function size(){v=vis();f.style.setProperty('--v',v);idx%=n;set(idx,false)}
document.getElementById('gn').onclick=next;document.getElementById('gp').onclick=prev;
f.addEventListener('mouseenter',()=>{clearTimeout(tm);pr.style.animationPlayState='paused'});
f.addEventListener('mouseleave',()=>{pr.style.animationPlayState='';ui();auto()});
f.addEventListener('pointerdown',e=>x0=e.clientX);
addEventListener('pointerup',e=>{if(x0===null)return;const dx=e.clientX-x0;x0=null;if(Math.abs(dx)>50)dx<0?next():prev()});
addEventListener('resize',size);size();ui();auto();
/* banner parallax */
const gb=document.querySelector('.gb'),gi=gb.querySelector('img');
function par(){const r=gb.getBoundingClientRect(),vh=innerHeight;if(r.bottom<0||r.top>vh)return;const k=Math.max(-1,Math.min(1,(r.top+r.height/2-vh/2)/(vh/2+r.height/2)));gi.style.transform=`translate3d(0,${k*-7}%,0) scale(${1.06-Math.abs(k)*.05})`}
if(!reduce){addEventListener('scroll',()=>requestAnimationFrame(par),{passive:true});par()}
})();
})();
