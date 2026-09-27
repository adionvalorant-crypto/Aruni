const hearts=document.querySelector('.floating-hearts');

function makeHeart(x=Math.random()*100,y=105){
  const h=document.createElement('span');
  h.className='float-heart';
  h.style.left=x+'%';
  h.style.top=y+'%';
  h.style.animationDuration=(5+Math.random()*3)+'s';
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),8500);
}

let heartTimer=setInterval(()=>makeHeart(),1300);

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

/* Music */
const musicBtn=document.getElementById('musicBtn');
const gateMusic=document.getElementById('gateMusic');
let audio=null;

function getAudio(){
  if(!audio){
    audio=new Audio('assets/Those_Eyes_-_New_West_(mp3.pm).mp3');
    audio.loop=true;
    audio.volume=0.4;
  }
  return audio;
}

async function toggleMusic(sourceButton){
  const a=getAudio();
  if(a.paused){
    try{
      await a.play();
      if(musicBtn) musicBtn.innerHTML='♫ <span>playing</span>';
      if(gateMusic) gateMusic.textContent='♫ our song is playing';
    }catch{
      if(sourceButton) sourceButton.textContent='tap again to play';
    }
  }else{
    a.pause();
    if(musicBtn) musicBtn.innerHTML='♪ <span>music</span>';
    if(gateMusic) gateMusic.textContent='♪ play our song';
  }
}

musicBtn?.addEventListener('click',()=>toggleMusic(musicBtn));
gateMusic?.addEventListener('click',()=>toggleMusic(gateMusic));

/* Welcome password — intentionally forgiving about case and extra u's */
const gate=document.getElementById('welcomeGate');
const unlockForm=document.getElementById('unlockForm');
const secretName=document.getElementById('secretName');
const unlockMessage=document.getElementById('unlockMessage');

function acceptedName(value){
  const cleaned=value.trim().replace(/\s+/g,'');
  return /^bhondu+$/i.test(cleaned);
}

unlockForm?.addEventListener('submit',e=>{
  e.preventDefault();
  if(acceptedName(secretName.value)){
    unlockMessage.textContent='I knew you would know. ♡';
    gate.classList.add('is-hidden');
    document.body.classList.remove('locked');
    setTimeout(()=>document.querySelector('.hero-copy')?.classList.add('visible'),250);
    setTimeout(()=>secretName.blur(),50);
    for(let i=0;i<10;i++) setTimeout(()=>makeHeart(35+Math.random()*30,85),i*90);
  }else{
    unlockMessage.textContent='Hmm... you know what I call you. Try again ♡';
    secretName.select();
  }
});

/* Clickable reasons */
document.querySelectorAll('.reason-card').forEach(card=>{
  card.addEventListener('click',()=>{
    document.querySelectorAll('.reason-card').forEach(c=>c.classList.remove('active'));
    card.classList.add('active');
    for(let i=0;i<4;i++) setTimeout(()=>makeHeart(40+Math.random()*20,65),i*100);
  });
});

/* Photo lightbox */
const lightbox=document.getElementById('photoLightbox');
const lightboxImage=document.getElementById('lightboxImage');
const lightboxCaption=document.getElementById('lightboxCaption');
const closeLightbox=()=>{
  if(!lightbox) return;
  lightbox.hidden=true;
  lightboxImage.removeAttribute('src');
};
document.querySelectorAll('.polaroid').forEach(card=>{
  card.setAttribute('tabindex','0');
  const open=()=>{
    const img=card.querySelector('img');
    const caption=card.querySelector('figcaption');
    if(!img||!lightbox) return;
    lightboxImage.src=img.currentSrc||img.src;
    lightboxImage.alt=img.alt||'Memory';
    lightboxCaption.textContent=caption?.textContent||'';
    lightbox.hidden=false;
  };
  card.addEventListener('click',open);
  card.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' ') { e.preventDefault(); open(); }
  });
});
document.getElementById('lightboxClose')?.addEventListener('click',closeLightbox);
lightbox?.addEventListener('click',e=>{if(e.target===lightbox) closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeLightbox();});

/* Hidden note */
document.getElementById('secretButton')?.addEventListener('click',e=>{
  const text=document.getElementById('secretText');
  text.hidden=!text.hidden;
  e.currentTarget.textContent=text.hidden?'there\'s one more thing here...':'okay, this one was just for you ♡';
});

/* Promise interaction */
document.getElementById('promiseButton')?.addEventListener('click',e=>{
  const response=document.getElementById('promiseResponse');
  const lines=[
    'Then I promise I\'ll keep trying. ♡',
    'No perfect promises. Just a real one.',
    'I\'ll communicate. I\'ll listen. I\'ll choose us.'
  ];
  const next=Number(e.currentTarget.dataset.count||0);
  response.textContent=lines[next%lines.length];
  e.currentTarget.dataset.count=String(next+1);
  for(let i=0;i<5;i++) setTimeout(()=>makeHeart(43+Math.random()*14,72),i*90);
});

/* Missing-image fallback */
document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('error',()=>{
    img.style.display='none';
    const box=img.parentElement;
    if(box?.classList.contains('image-box')) box.classList.add('missing-photo');
  });
});

window.addEventListener('load',()=>{
  document.body.classList.add('locked');
  document.querySelector('.hero-copy')?.classList.add('visible');
});

window.addEventListener('beforeunload',()=>clearInterval(heartTimer));
