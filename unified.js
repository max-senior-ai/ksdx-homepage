document.documentElement.classList.add('js');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');nav.classList.toggle('open',open)});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');nav.classList.remove('open')}));
document.querySelector('.purpose-origin').classList.remove('reveal');
document.querySelectorAll('.purpose-origin h3').forEach(el=>el.classList.add('reveal'));
const timeline=document.querySelector('.timeline');
const reveal=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');reveal.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -35px 0px'});
document.querySelectorAll('.reveal').forEach(el=>{if(!el.closest('.timeline')&&!el.closest('.stories'))reveal.observe(el)});
document.querySelectorAll('.services .reveal,.purpose-stats .reveal,.purpose-origin p').forEach((el,i)=>el.style.setProperty('--reveal-delay',(i%3)*220+'ms'));
const timelineItems=[...timeline.querySelectorAll(':scope > div.reveal')];
const historySection=document.querySelector('.history');
const timelineObserver=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('in');timelineObserver.unobserve(e.target)}}},{threshold:.25,rootMargin:'0px 0px -12% 0px'});timelineItems.forEach(el=>timelineObserver.observe(el));
document.addEventListener('click',event=>{const link=event.target.closest('a,button');if(!link||reduce.matches||document.body.classList.contains('motion-paused'))return;if(event.detail&&event.clientX){const wave=document.createElement('span');wave.className='click-wave';wave.style.left=event.clientX+'px';wave.style.top=event.clientY+'px';for(let i=0;i<4;i++){const ring=document.createElement('i');ring.style.setProperty('--ring-delay',i*110+'ms');wave.append(ring)}document.body.append(wave);setTimeout(()=>wave.remove(),1800)}if(link.matches('a[href^="#"]')){const target=document.querySelector(link.hash);if(target){target.classList.remove('arrived');setTimeout(()=>{target.classList.add('arrived');setTimeout(()=>target.classList.remove('arrived'),1400)},450)}}});
let pending=false;const sections=[...document.querySelectorAll('main section[id]')];
function update(){pending=false;const tr=timeline.getBoundingClientRect();const tp=Math.max(0,Math.min(1,(innerHeight*.75-tr.top)/Math.max(1,tr.height)));timeline.style.setProperty('--timeline-progress',tp);const mapProgress=Math.max(0,Math.min(1,(innerHeight*.86-timelineItems[2].getBoundingClientRect().top)/(innerHeight*.48)));historySection.style.setProperty('--map-reveal',mapProgress);timeline.classList.toggle('future-visible',timelineItems[4].getBoundingClientRect().bottom<innerHeight*.94);timelineItems.forEach(el=>{const rect=el.getBoundingClientRect();el.classList.toggle('current',rect.top<innerHeight*.7&&rect.bottom>innerHeight*.3);const depth=Math.max(0,Math.min(1,(innerHeight*.92-rect.top)/(innerHeight*.42)));el.style.setProperty('--history-ink',.24+.76*depth)});const max=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--progress',max>0?scrollY/max:0);let active='';for(const section of sections){if(section.getBoundingClientRect().top<innerHeight*.4)active=section.id}nav.querySelectorAll('a').forEach(a=>{const on=a.hash==='#'+active;a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update);update();
// Shared theme: older adults encountering digital services and participating together.
const heroPhoto=document.querySelector('.hero .photo');
const slides=[{src:'assets-concept-smart.jpg',alt:'스마트경로당에서 함께 배우는 시니어의 콘셉트 이미지'},{src:'assets-concept-community.jpg',alt:'시니어 커뮤니티 운동 공간 콘셉트 이미지'},{src:'assets-concept-learning.jpg',alt:'디지털 배움 콘셉트 이미지'},{src:'assets-cms-enhanced.jpg',alt:'CMS 콘텐츠 관리 시연 현장 보정 사진'}];
// Four messages drawn from the founding purpose; one per image, every 6.5 seconds.
const heroCopy=document.querySelector('.hero-copy');
const messageStage=document.createElement('div');messageStage.className='hero-messages';
heroCopy.prepend(messageStage);
const firstMessage=document.createElement('div');firstMessage.className='hero-message is-current';
firstMessage.append(heroCopy.querySelector('h1'),heroCopy.querySelector('p'));messageStage.append(firstMessage);
const additionalMessages=[
 '<h1>건강한 오늘,<br><em>더 행복한 내일.</em></h1><p>익숙한 공간에 더하는 새로운 기술.<br>어르신의 건강하고 활기찬 생활을 지원합니다.</p>',
 '<h1>배움으로 열리는<br><em>더 넓은 일상.</em></h1><p>쉽게 만나고, 함께 배우는 디지털.<br>교육과 콘텐츠로 새로운 경험을 이어갑니다.</p>',
 '<h1>누구나 누리는<br><em>디지털 세상.</em></h1><p>정보화 교육과 디지털 기기 지원으로<br>어르신의 디지털 격차를 줄여갑니다.</p>'
];
const heroMessages=[firstMessage,...additionalMessages.map(html=>{const message=document.createElement('div');message.className='hero-message';message.innerHTML=html;messageStage.append(message);return message})];
heroMessages.forEach((message,messageIndex)=>{
 message.setAttribute('aria-hidden',String(messageIndex!==0));
 message.querySelectorAll('h1,p').forEach(block=>{
  block.setAttribute('aria-label',[...block.childNodes].map(node=>node.nodeName==='BR'?' ':node.textContent).join(''));
  let letterIndex=0;
  const walker=document.createTreeWalker(block,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{const fragment=document.createDocumentFragment();
   node.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim()){fragment.append(document.createTextNode(word));return}
    const group=document.createElement('span');group.className='mist-word';group.setAttribute('aria-hidden','true');
    [...word].forEach(letter=>{const char=document.createElement('span');char.className='mist-letter';char.textContent=letter;const n=letterIndex++;
     char.style.setProperty('--mist-delay',Math.min(n*17,410)+'ms');char.style.setProperty('--mist-x',(3+(n*7)%5)+'px');char.style.setProperty('--mist-y',(-2-(n*11)%4)+'px');char.style.setProperty('--mist-rotate','0deg');group.append(char)});fragment.append(group)});node.replaceWith(fragment)});
 });
});
let messageIndex=0,messageCleanup;
function showHeroMessage(next){
 if(next===messageIndex)return;
 clearTimeout(messageCleanup);
 heroMessages.forEach(message=>message.classList.remove('is-current','is-entering','is-leaving'));
 const outgoing=heroMessages[messageIndex],incoming=heroMessages[next];
 outgoing.setAttribute('aria-hidden','true');incoming.setAttribute('aria-hidden','false');
 messageIndex=next;
 if(reduce.matches){incoming.classList.add('is-current');return}
 outgoing.classList.add('is-leaving');incoming.classList.add('is-current','is-entering');
 messageCleanup=setTimeout(()=>{outgoing.classList.remove('is-leaving');incoming.classList.remove('is-entering')},4600);
}
let slideIndex=0,slideTimer;
heroPhoto.replaceChildren();
const photoMotions=['hero-zoom-in','hero-zoom-out','hero-glide-left','hero-glide-right'];
const shuffledMotions=[...photoMotions].sort(()=>Math.random()-.5);
const slideImages=slides.map((item,i)=>{const img=new Image();img.src=item.src;img.alt=item.alt;img.className=i===0?'is-active':'';img.style.setProperty('--photo-motion',shuffledMotions[i]);img.style.setProperty('--photo-duration',(20+Math.random()*4).toFixed(2)+'s');img.style.setProperty('--photo-phase',(-5-Math.random()*7).toFixed(2)+'s');img.setAttribute('aria-hidden',String(i!==0));heroPhoto.append(img);return img});
const controls=document.createElement('div');controls.className='slide-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label','메인 사진 선택');document.querySelector('.hero').append(controls);
const slideButtons=slides.map((item,i)=>{const button=document.createElement('button');button.className='slide-control';button.type='button';button.setAttribute('aria-label',`사진 ${i+1}: ${item.alt}`);button.setAttribute('aria-pressed',String(i===0));button.addEventListener('click',()=>{showSlide(i);restartSlides()});controls.append(button);return button});
function showSlide(i){showHeroMessage(i);slideIndex=i;slideImages.forEach((img,j)=>{img.classList.toggle('is-active',j===i);img.setAttribute('aria-hidden',String(j!==i));slideButtons[j].setAttribute('aria-pressed',String(j===i))})}
function restartSlides(){clearInterval(slideTimer);if(!reduce.matches&&!document.hidden&&!document.body.classList.contains('motion-paused'))slideTimer=setInterval(()=>showSlide((slideIndex+1)%slides.length),6500)}
reduce.addEventListener('change',restartSlides);document.addEventListener('visibilitychange',restartSlides);restartSlides();
document.addEventListener('click',event=>{const control=event.target.closest('a,button');if(control&&!reduce.matches){control.classList.remove('pressed');requestAnimationFrame(()=>control.classList.add('pressed'));setTimeout(()=>control.classList.remove('pressed'),600)}});
if(new URLSearchParams(location.search).has('capture')){document.documentElement.classList.add('capture');document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));clearInterval(slideTimer);showSlide(0);historySection.style.setProperty('--map-reveal',1);timeline.classList.add('future-visible')}
if(document.documentElement.classList.contains('capture'))document.querySelectorAll('img').forEach(img=>img.loading='eager');

// Enter once as a group so the editorial sequence stays perceptible.
const storyGroup=document.querySelector('.stories');
const storyReveal=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');storyReveal.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
storyGroup.querySelectorAll('.reveal').forEach((el,i)=>{el.style.setProperty('--reveal-delay',i*240+'ms');storyReveal.observe(el)});
const captureMode=new URLSearchParams(location.search).has('capture');
// Keep full accessible values and prose; only the visual layer animates.
const countObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;countObserver.unobserve(el);const final=el.dataset.value;const suffix=el.dataset.suffix;const start=performance.now();function tick(now){const t=Math.min(1,(now-start)/850);const value=Math.round(Number(final)*(1-Math.pow(1-t,3)));el.innerHTML=value.toLocaleString('ko-KR')+'<span>'+suffix+'</span>';if(t<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)})},{threshold:.6});
document.querySelectorAll('.purpose-stat strong').forEach((el,i)=>{const values=[1000,83,65],suffixes=['만+','%','%'];el.setAttribute('aria-label',el.textContent);if(!reduce.matches&&!captureMode){el.dataset.value=values[i];el.dataset.suffix=suffixes[i];countObserver.observe(el)}});
// Quiet paragraph fades preserve normal, selectable body text.
document.querySelectorAll('.purpose-origin p').forEach((p,i)=>{
 p.classList.add('origin-fade');
 p.style.setProperty('--origin-delay',i*110+'ms');
 if(reduce.matches||captureMode)p.classList.add('in');
 else reveal.observe(p);
});
// Finish the full-width color transition before the first article's metadata.
const newsSection=document.querySelector('#news');
function alignNewsAtmosphere(){const photo=newsSection.querySelector('.story .photo');if(photo){const bottom=photo.getBoundingClientRect().bottom-newsSection.getBoundingClientRect().top;newsSection.style.setProperty('--news-dusk-end',Math.round(bottom)+'px')}}
const newsSizeObserver=new ResizeObserver(alignNewsAtmosphere);newsSizeObserver.observe(newsSection);alignNewsAtmosphere();

// Sparse travelling points sit behind content, following a different line in each section.
const ambientPaths=[
 ['.purpose','M10 95 C75 110 80 10 150 25 S235 95 280 30',38],
 ['.business','M0 85 L115 85 C180 85 175 25 230 25 L280 25',32],
 ['.history','M15 110 C-10 20 150 -5 240 60 S285 100 270 115',42],
 ['.contact','M0 95 C75 25 160 100 280 20',36]
];
ambientPaths.forEach(([selector,path,duration],index)=>{
 const section=document.querySelector(selector);if(!section)return;
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');
 svg.setAttribute('class','ambient-thread');svg.setAttribute('viewBox','0 0 280 120');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
 const line=document.createElementNS(ns,'path');line.setAttribute('d',path);
 const dot=document.createElementNS(ns,'circle');dot.setAttribute('r','2.2');
 const motion=document.createElementNS(ns,'animateMotion');motion.setAttribute('path',path);motion.setAttribute('dur',duration+'s');motion.setAttribute('begin',(-index*8)+'s');motion.setAttribute('repeatCount','indefinite');motion.setAttribute('calcMode','paced');dot.append(motion);svg.append(line,dot);section.prepend(svg);
});

// Pointer-driven refraction is limited to the photo; text and controls remain stable.
const heroSurface=document.querySelector('.hero');
const waterDefs=document.createElementNS('http://www.w3.org/2000/svg','svg');
waterDefs.setAttribute('class','water-defs');waterDefs.setAttribute('aria-hidden','true');
waterDefs.innerHTML='<defs><filter id="hero-water-filter" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".009 .018" numOctaves="1" seed="7" result="water"/><feDisplacementMap in="SourceGraphic" in2="water" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter></defs>';
heroSurface.append(waterDefs);
const refraction=waterDefs.querySelector('feDisplacementMap'),waterNoise=waterDefs.querySelector('feTurbulence');
let waterFrame=0,waterPower=0,waterTarget=0,lastWave=0,lastMove=0,lastWaterX=0,lastWaterY=0;
function settleWater(now){
 if(reduce.matches||document.hidden){waterPower=waterTarget=0}
 if(now-lastMove>100)waterTarget*=.9;
 waterPower+=(waterTarget-waterPower)*.075;
 refraction.setAttribute('scale',waterPower.toFixed(3));
 waterNoise.setAttribute('baseFrequency',(.009+Math.sin(now*.00032)*.0005).toFixed(5)+' '+(.018+Math.cos(now*.00027)*.0007).toFixed(5));
 if(waterPower>.025||waterTarget>.025)waterFrame=requestAnimationFrame(settleWater);
 else{refraction.setAttribute('scale','0');heroSurface.classList.remove('water-active');waterFrame=0}
}
heroSurface.addEventListener('pointermove',event=>{
 if(reduce.matches||event.pointerType!=='mouse')return;
 const rect=heroSurface.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top;
 if(x<rect.width*.42||event.target.closest('a,button')){waterTarget=0;return}
 const now=performance.now(),distance=Math.hypot(x-lastWaterX,y-lastWaterY);
 waterTarget=Math.min(5,1.8+distance*.06);lastMove=now;lastWaterX=x;lastWaterY=y;
 heroSurface.classList.add('water-active');if(!waterFrame)waterFrame=requestAnimationFrame(settleWater);
 if(now-lastWave>240&&heroSurface.querySelectorAll('.hero-water-ring').length<7){
  lastWave=now;const ring=document.createElement('span');ring.className='hero-water-ring';ring.setAttribute('aria-hidden','true');ring.style.setProperty('--water-x',x+'px');ring.style.setProperty('--water-y',y+'px');heroSurface.append(ring);ring.addEventListener('animationend',()=>ring.remove(),{once:true});
 }
},{passive:true});
heroSurface.addEventListener('pointerleave',()=>{waterTarget=0});
reduce.addEventListener('change',()=>{if(reduce.matches){waterTarget=0;heroSurface.querySelectorAll('.hero-water-ring').forEach(r=>r.remove())}});
