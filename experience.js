document.documentElement.classList.add('js');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.querySelector('span').textContent=open?'−':'＋';nav.classList.toggle('open',open)});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.querySelector('span').textContent='＋';nav.classList.remove('open')}));
const timeline=document.querySelector('.timeline');
const reveal=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');reveal.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -35px 0px'});
document.querySelectorAll('.reveal').forEach(el=>{if(!el.closest('.timeline'))reveal.observe(el)});
document.querySelectorAll('.stories .reveal,.a .services .reveal').forEach((el,i)=>el.style.setProperty('--reveal-delay',(i%3)*120+'ms'));
const timelineItems=[...timeline.children];
const timelineObserver=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('in');timelineObserver.unobserve(e.target)}}},{threshold:.25,rootMargin:'0px 0px -12% 0px'});timelineItems.forEach(el=>timelineObserver.observe(el));
const toggle=document.createElement('button');toggle.className='motion-toggle';toggle.type='button';toggle.textContent='움직임 멈춤';toggle.setAttribute('aria-pressed','false');document.body.append(toggle);
toggle.addEventListener('click',()=>{const paused=document.body.classList.toggle('motion-paused');toggle.textContent=paused?'움직임 재생':'움직임 멈춤';toggle.setAttribute('aria-pressed',String(paused));if(paused)document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'))});
document.addEventListener('click',event=>{const link=event.target.closest('a,button');if(!link||reduce.matches||document.body.classList.contains('motion-paused'))return;if(event.detail&&event.clientX){const wave=document.createElement('span');wave.className='click-wave';wave.style.left=event.clientX+'px';wave.style.top=event.clientY+'px';document.body.append(wave);wave.addEventListener('animationend',()=>wave.remove(),{once:true})}if(link.matches('a[href^="#"]')){const target=document.querySelector(link.hash);if(target){target.classList.remove('arrived');setTimeout(()=>{target.classList.add('arrived');setTimeout(()=>target.classList.remove('arrived'),1400)},450)}}});
let pending=false;const sections=[...document.querySelectorAll('main section[id]')];
function update(){pending=false;const tr=timeline.getBoundingClientRect();const tp=Math.max(0,Math.min(1,(innerHeight*.75-tr.top)/Math.max(1,tr.height)));timeline.style.setProperty('--timeline-progress',tp);timelineItems.forEach(el=>el.classList.toggle('current',el.getBoundingClientRect().top<innerHeight*.7&&el.getBoundingClientRect().bottom>innerHeight*.3));const max=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--progress',max>0?scrollY/max:0);let active='';for(const section of sections){if(section.getBoundingClientRect().top<innerHeight*.4)active=section.id}nav.querySelectorAll('a').forEach(a=>{const on=a.hash==='#'+active;a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update);update();
// Shared theme: older adults encountering digital services and participating together.
const heroPhoto=document.querySelector('.hero .photo');
const slides=[{src:'assets-hero.jpg',alt:'디지털 서비스를 함께 체험하는 어르신과 안내자'},{src:'assets-news2.png',alt:'시니어 디지털 전용관에서 서비스를 소개하는 모습'},{src:'assets-library.jpg',alt:'여러 경로당이 함께 참여하는 디지털 프로그램'}];
if(document.body.classList.contains('c'))slides.unshift({src:'assets-bg.png',alt:'함께 시간을 보내는 가족'});
if(document.body.classList.contains('a'))slides.push(slides.shift());
let slideIndex=0,slideTimer;
heroPhoto.replaceChildren();
const slideImages=slides.map((item,i)=>{const img=new Image();img.src=item.src;img.alt=item.alt;img.className=i===0?'is-active':'';img.setAttribute('aria-hidden',String(i!==0));heroPhoto.append(img);return img});
const controls=document.createElement('div');controls.className='slide-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label','메인 사진 선택');(document.querySelector('.hero-art')||heroPhoto).append(controls);
const slideButtons=slides.map((item,i)=>{const button=document.createElement('button');button.className='slide-control';button.type='button';button.setAttribute('aria-label',`사진 ${i+1}: ${item.alt}`);button.setAttribute('aria-pressed',String(i===0));button.addEventListener('click',()=>{showSlide(i);restartSlides()});controls.append(button);return button});
function showSlide(i){slideIndex=i;slideImages.forEach((img,j)=>{img.classList.toggle('is-active',j===i);img.setAttribute('aria-hidden',String(j!==i));slideButtons[j].setAttribute('aria-pressed',String(j===i))})}
function restartSlides(){clearInterval(slideTimer);if(!reduce.matches&&!document.hidden&&!document.body.classList.contains('motion-paused'))slideTimer=setInterval(()=>showSlide((slideIndex+1)%slides.length),6500)}
toggle.addEventListener('click',restartSlides);reduce.addEventListener('change',restartSlides);document.addEventListener('visibilitychange',restartSlides);restartSlides();
document.addEventListener('click',event=>{const control=event.target.closest('a,button');if(control&&!reduce.matches){control.classList.remove('pressed');requestAnimationFrame(()=>control.classList.add('pressed'));setTimeout(()=>control.classList.remove('pressed'),600)}});
if(new URLSearchParams(location.search).has('capture')){document.documentElement.classList.add('capture');document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));clearInterval(slideTimer);showSlide(0)}
if(document.documentElement.classList.contains('capture'))document.querySelectorAll('img').forEach(img=>img.loading='eager');
