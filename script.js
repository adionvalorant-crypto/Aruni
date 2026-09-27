const slides=[...document.querySelectorAll('.slide')];
let current=0, unlocked=false;
const counter=document.getElementById('slideCounter'), progress=document.getElementById('progress');
const prev=document.getElementById('prevSlide'), next=document.getElementById('nextSlide');

function showSlide(n){
  if(!unlocked && n>0) return;
  current=Math.max(0,Math.min(slides.length-1,n));
  slides.forEach((s,i)=>s.classList.toggle('active',i===current));
  counter.textContent=String(current+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
  progress.style.setProperty('--progress',((current+1)/slides.length*100)+'%');
  prev.disabled=current===0; next.disabled=current===slides.length-1;
}
function go(delta){showSlide(current+delta)}
prev.addEventListener('click',()=>go(-1)); next.addEventListener('click',()=>go(1));
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>go(1)));

const unlockForm=document.getElementById('unlockForm'), nameInput=document.getElementById('secretName'), msg=document.getElementById('unlockMessage');
function acceptedName(v){return /^bhondu+$/i.test(v.trim().replace(/\s+/g,''))}
unlockForm.addEventListener('submit',e=>{
  e.preventDefault();
  if(acceptedName(nameInput.value)){
    unlocked=true; msg.textContent='I knew you would. ♡';
    document.getElementById('deck').classList.add('unlocked');
    setTimeout(()=>showSlide(1),500);
  }else{msg.textContent='You know what I call you. Try again ♡';nameInput.select()}
});

let audio=null;
function getAudio(){if(!audio){audio=new Audio('assets/Those_Eyes_-_New_West_(mp3.pm).mp3');audio.loop=true;audio.volume=.4}return audio}
async function toggleMusic(){
 const a=getAudio();
 if(a.paused){try{await a.play();document.getElementById('musicBtn').textContent='♫'}catch{}}else{a.pause();document.getElementById('musicBtn').textContent='♪'}
}
document.getElementById('musicBtn').addEventListener('click',toggleMusic);
document.getElementById('gateMusic').addEventListener('click',toggleMusic);

document.getElementById('loveReveal').addEventListener('click',e=>{
 const line=document.getElementById('loveLine');line.classList.toggle('show');
 e.currentTarget.textContent=line.classList.contains('show')?'♡ I meant every word':'there\'s one line I really want you to read';
});

document.querySelectorAll('.date-card').forEach(card=>card.addEventListener('click',()=>{
 document.querySelectorAll('.date-card').forEach(c=>c.classList.remove('selected'));
 card.classList.add('selected');document.getElementById('cardDetail').textContent=card.dataset.detail;
}));

const photos=[
['20260913145619135.jpg','one of my favourite pictures of us'],
['20260913145620022.jpg','you looked so pretty here'],
['20260913145623476.jpg','just us ♡'],
['20260913145623805.jpg','one of those moments'],
['PXL_20260912_064556914.jpg','you ♡'],
['PXL_20260912_064649801.jpg','this face'],
['PXL_20260915_085033379.jpg','you, being you'],
['PXL_20260915_085042633.MP.jpg','a little moment together'],
['PXL_20260925_072819836.jpg','you in yellow'],
['PXL_20260925_072822775.jpg','another favourite'],
['PXL_20260925_072831129.jpg','pretty as always'],
['PXL_20260925_114406222.jpg','one more memory']
];
let photoIndex=0;
const gi=document.getElementById('galleryImage'),gc=document.getElementById('galleryCaption'),pc=document.getElementById('photoCounter'),dots=document.getElementById('photoDots');
photos.forEach((p,i)=>{const d=document.createElement('button');d.className='photo-dot'+(i===0?' active':'');d.type='button';d.ariaLabel='Photo '+(i+1);d.addEventListener('click',()=>setPhoto(i));dots.appendChild(d)});
function setPhoto(i){photoIndex=(i+photos.length)%photos.length;gi.style.opacity='0';setTimeout(()=>{gi.src='assets/'+photos[photoIndex][0];gc.textContent=photos[photoIndex][1];pc.textContent=String(photoIndex+1).padStart(2,'0')+' / 12';document.querySelectorAll('.photo-dot').forEach((d,j)=>d.classList.toggle('active',j===photoIndex));gi.style.opacity='1'},120)}
document.getElementById('prevPhoto').addEventListener('click',()=>setPhoto(photoIndex-1));
document.getElementById('nextPhoto').addEventListener('click',()=>setPhoto(photoIndex+1));
gi.addEventListener('click',()=>setPhoto(photoIndex+1));

document.querySelectorAll('.reason-buttons button').forEach(b=>b.addEventListener('click',()=>{
 document.querySelectorAll('.reason-buttons button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');document.getElementById('reasonMessage').textContent=b.dataset.message;
}));

document.getElementById('promiseButton').addEventListener('click',()=>{
 const r=document.getElementById('promiseResponse');r.textContent=r.textContent?'Then I'll keep proving it. ♡':'I hope so. Because I mean it. ♡';
});

document.getElementById('restart').addEventListener('click',()=>{unlocked=false;nameInput.value='';msg.textContent='you know this one.';showSlide(0)});

document.addEventListener('keydown',e=>{
 if(e.target.matches('input,textarea')) return;
 if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();go(1)}
 if(e.key==='ArrowLeft')go(-1);
});
let touchX=0;
document.addEventListener('touchstart',e=>touchX=e.changedTouches[0].clientX,{passive:true});
document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>55)go(dx<0?1:-1)},{passive:true});
showSlide(0);