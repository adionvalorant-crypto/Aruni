const hearts=document.querySelector('.floating-hearts');
const cursorHeart=document.querySelector('.cursor-heart');

function makeHeart(x=Math.random()*100,y=105){
  const h=document.createElement('span');
  h.className='float-heart';
  h.textContent=['♡','♥','✦','˚'][Math.floor(Math.random()*4)];
  h.style.left=x+'%';
  h.style.top=y+'%';
  h.style.fontSize=(10+Math.random()*22)+'px';
  h.style.animationDuration=(4+Math.random()*4)+'s';
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),8000);
}
setInterval(()=>makeHeart(),900);

document.addEventListener('pointermove',e=>{
  cursorHeart.style.left=e.clientX+'px';
  cursorHeart.style.top=e.clientY+'px';
  cursorHeart.style.opacity='.55';
});
document.addEventListener('pointerleave',()=>cursorHeart.style.opacity='0');

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.reason-card').forEach(card=>{
  card.addEventListener('click',()=>{
    document.querySelectorAll('.reason-card').forEach(c=>c.classList.remove('active'));
    card.classList.add('active');
    for(let i=0;i<4;i++) setTimeout(()=>makeHeart(40+Math.random()*20,65),i*100);
  });
});

document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('error',()=>{
    img.style.display='none';
    const box=img.parentElement;
    if(box.classList.contains('image-box')) box.classList.add('missing-photo');
  });
});

const musicBtn=document.getElementById('musicBtn');
let audio;
musicBtn.addEventListener('click',()=>{
  if(!audio){
    audio=new Audio('assets/Those_Eyes_-_New_West_(mp3.pm).mp3');
    audio.loop=true;
    audio.volume=0.4;
  }
  if(audio.paused){
    audio.play().then(()=>musicBtn.innerHTML='♫ <span>playing</span>').catch(()=>musicBtn.innerHTML='♪ <span>add song</span>');
  }else{
    audio.pause();
    musicBtn.innerHTML='♪ <span>music</span>';
  }
});

window.addEventListener('load',()=>{
  document.querySelector('.hero-copy')?.classList.add('visible');
});
