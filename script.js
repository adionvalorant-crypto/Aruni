(function(){
'use strict';

function init(){
  var slides=document.querySelectorAll('.slide');
  var current=0;
  var unlocked=false;
  var interactions=0, discoveries=0, wrongAnswers=0, startedAt=Date.now();

  var counter=document.getElementById('slideCounter');
  var progress=document.getElementById('progress');
  var prev=document.getElementById('prevSlide');
  var next=document.getElementById('nextSlide');

  function showSlide(n, direction){
    if(!unlocked && n>0){return;}
    direction=direction||0;
    if(n<0){n=0;}
    if(n>=slides.length){n=slides.length-1;}
    current=n;
    if(current===11){var bl=document.getElementById('blackLine'); if(bl){bl.textContent='wait.'; setTimeout(function(){if(current===11) bl.textContent='I actually love you a stupid amount.';},900);}}
    for(var i=0;i<slides.length;i++){
      slides[i].classList.remove('active','from-left','from-right');
      if(i===current){
        slides[i].classList.add('active');
        if(direction<0){slides[i].classList.add('from-left');}
        if(direction>0){slides[i].classList.add('from-right');}
      }
    }
    if(counter){counter.textContent=('0'+(current+1)).slice(-2)+' / '+('0'+slides.length).slice(-2);}
    if(progress){progress.style.setProperty('--progress',((current+1)/slides.length*100)+'%');}
    if(prev){prev.disabled=current===0;}
    if(next){next.disabled=current===slides.length-1;}
  }

  function go(delta){interactions++; showSlide(current+delta,delta);}

  if(prev){prev.onclick=function(){go(-1);};}
  if(next){next.onclick=function(){go(1);};}

  var nextButtons=document.querySelectorAll('[data-next]');
  for(var n=0;n<nextButtons.length;n++){
    nextButtons[n].onclick=function(){go(1);};
  }

  var form=document.getElementById('unlockForm');
  var unlockButton=document.getElementById('unlockButton');
  var input=document.getElementById('secretName');
  var message=document.getElementById('unlockMessage');

  function accepted(value){
    var clean=String(value || '').trim().toLowerCase().replace(/\s+/g,'');
    return /^bhond?u+$/i.test(clean) || /^bhondu+$/i.test(clean);
  }

  function unlock(){
    var value=input ? input.value : '';
    if(accepted(value)){
      unlocked=true;
      if(message){message.textContent='Good. You know. 😒';}
      var a=getAudio();
      try{a.currentTime=0;}catch(e){}
      var playPromise=a.play();
      if(playPromise && playPromise.catch){playPromise.catch(function(){});}
      setTimeout(function(){showSlide(1,1);},250);
    }else{
      if(message){message.textContent='Nope. Try again.';}
      if(input){input.focus();input.select();}
    }
  }

  if(unlockButton){unlockButton.addEventListener('click',function(event){
    event.preventDefault();
    unlock();
  });}
  if(form){form.addEventListener('submit',function(event){
    event.preventDefault();
    unlock();
  });}
  if(input){input.addEventListener('keydown',function(event){
    if(event.key==='Enter'){
      event.preventDefault();
      unlock();
    }
  });}
  var audio=document.getElementById('siteSong');
  function getAudio(){
    if(!audio){
      audio=new Audio('assets/Those_Eyes_-_New_West_(mp3.pm).mp3');
      audio.loop=true;
    }
    audio.volume=0.4;
    return audio;
  }
  function toggleMusic(){
    var a=getAudio();
    if(a.paused){
      a.play().then(function(){
        var mb=document.getElementById('musicBtn');
        if(mb){mb.textContent='♫';}
      }).catch(function(){});
    }else{
      a.pause();
      var mb2=document.getElementById('musicBtn');
      if(mb2){mb2.textContent='♪';}
    }
  }
  var music=document.getElementById('musicBtn');
  var gateMusic=document.getElementById('gateMusic');
  if(music){music.onclick=toggleMusic;}
  if(gateMusic){gateMusic.onclick=toggleMusic;}

  var loveReveal=document.getElementById('loveReveal');
  if(loveReveal){
    loveReveal.onclick=function(){
      var line=document.getElementById('loveLine');
      line.classList.toggle('show');
      loveReveal.textContent=line.classList.contains('show')?'♡ I meant every word':'one thing, though →';
    };
  }

  var dateCards=document.querySelectorAll('.date-card');
  for(var d=0;d<dateCards.length;d++){
    dateCards[d].onclick=function(){
      for(var j=0;j<dateCards.length;j++){dateCards[j].classList.remove('selected');}
      this.classList.add('selected');
      var detail=document.getElementById('cardDetail');
      if(detail){detail.textContent=this.getAttribute('data-detail')||'';}
    };
  }

  var photos=[
    ['20260913145619135.jpg','this one just felt right'],
    ['20260913145620022.jpg','you looked pretty here'],
    ['20260913145623476.jpg','just us'],
    ['20260913145623805.jpg','one of those moments'],
    ['PXL_20260912_064556914.jpg','you'],
    ['PXL_20260912_064649801.jpg','this face'],
    ['PXL_20260915_085033379.jpg','you, being you'],
    ['PXL_20260915_085042633.MP.jpg','a little moment together'],
    ['PXL_20260925_072819836.jpg','dumb as always'],
    ['PXL_20260925_072822775.jpg','another favourite'],
    ['PXL_20260925_072831129.jpg','pretty as always'],
    ['PXL_20260925_114406222.jpg','one more memory']
  ];
  var photoIndex=0;
  var image=document.getElementById('galleryImage');
  var caption=document.getElementById('galleryCaption');
  var photoCounter=document.getElementById('photoCounter');
  var dots=document.getElementById('photoDots');

  function setPhoto(i){
    photoIndex=(i+photos.length)%photos.length;
    image.src='assets/'+photos[photoIndex][0];
    caption.textContent=photos[photoIndex][1];
    photoCounter.textContent=('0'+(photoIndex+1)).slice(-2)+' / 12';
    var allDots=document.querySelectorAll('.photo-dot');
    for(var k=0;k<allDots.length;k++){allDots[k].classList.toggle('active',k===photoIndex);}
  }

  if(dots){
    for(var p=0;p<photos.length;p++){
      var dot=document.createElement('button');
      dot.type='button';
      dot.className='photo-dot'+(p===0?' active':'');
      dot.setAttribute('aria-label','Photo '+(p+1));
      (function(index){dot.onclick=function(){setPhoto(index);};})(p);
      dots.appendChild(dot);
    }
  }
  var prevPhoto=document.getElementById('prevPhoto');
  var nextPhoto=document.getElementById('nextPhoto');
  if(prevPhoto){prevPhoto.onclick=function(){setPhoto(photoIndex-1);};}
  if(nextPhoto){nextPhoto.onclick=function(){setPhoto(photoIndex+1);};}
  if(image){image.onclick=function(){interactions++; setPhoto(photoIndex+1);};}

  var reactionButtons=document.querySelectorAll('.photo-reactions button');
  for(var rb=0;rb<reactionButtons.length;rb++){reactionButtons[rb].onclick=function(){interactions++; document.getElementById('reactionResponse').textContent=this.getAttribute('data-reaction')+' — fair.';};}

  var quizOptions=document.querySelectorAll('.quiz-options button');
  for(var qo=0;qo<quizOptions.length;qo++){quizOptions[qo].onclick=function(){interactions++; if(this.getAttribute('data-answer')==='correct'){discoveries++; document.getElementById('quizResult').textContent='Correct. Good that you know 😒';}else{wrongAnswers++; document.getElementById('quizResult').textContent='Nope. You had one job.';}};}

  var fightOptions=document.querySelectorAll('.fight-options button');
  for(var fo=0;fo<fightOptions.length;fo++){fightOptions[fo].onclick=function(){interactions++; document.getElementById('fightResult').textContent='Correct answer: C. Somehow both. We are working on it.';};}

  var openButtons=document.querySelectorAll('[data-open]');
  var openTexts={angry:'You can be angry. I can take it. I just don’t want us to stop talking.',miss:'I probably miss you too. Unfortunately, this website cannot teleport me.',bored:'Congratulations. You found the part of the internet specifically made to waste your time.'};
  for(var ob=0;ob<openButtons.length;ob++){openButtons[ob].onclick=function(){interactions++; document.getElementById('openWhenResult').textContent=openTexts[this.getAttribute('data-open')];};}

  var dateClicks=0, dateTimer=null;
  for(var dc=0;dc<dateCards.length;dc++){dateCards[dc].addEventListener('click',function(){interactions++; if(this.getAttribute('data-detail').indexOf('day we stopped')>-1){dateClicks++; clearTimeout(dateTimer); dateTimer=setTimeout(function(){dateClicks=0;},1200); if(dateClicks>=3){discoveries++; var detail=document.getElementById('cardDetail'); if(detail) detail.textContent='You found the extra memory. Bhopal was before all of this — and I still remember that night clearly.';}}});}

  var secretKeys='';
  document.addEventListener('keydown',function(e){if(e.target && (e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'))return; var key=e.key.toLowerCase(); secretKeys=(secretKeys+key).slice(-6); if(secretKeys==='bhondu'){discoveries++; interactions++; document.body.classList.add('secret-mode'); setTimeout(function(){document.body.classList.remove('secret-mode');},2200); secretKeys='';}});

  var reasonButtons=document.querySelectorAll('.reason-buttons button');
  for(var r=0;r<reasonButtons.length;r++){
    reasonButtons[r].onclick=function(){
      for(var q=0;q<reasonButtons.length;q++){reasonButtons[q].classList.remove('selected');}
      this.classList.add('selected');
      document.getElementById('reasonMessage').textContent=this.getAttribute('data-message')||'';
    };
  }

  var promise=document.getElementById('promiseButton');
  if(promise){
    promise.onclick=function(){
      var response=document.getElementById('promiseResponse');
      response.textContent=response.textContent?'Good. Then I will keep proving it.':'Alright. I mean it.';
    };
  }

  function updateStats(){var el=document.getElementById('interactionStats'); if(el){var secs=Math.max(1,Math.round((Date.now()-startedAt)/1000)); el.textContent='You clicked: '+interactions+' · You found: '+discoveries+' · You got wrong: '+wrongAnswers+' · You stayed: '+secs+'s';}}
  var finalSlide=document.querySelector('.final-slide'); if(finalSlide){new MutationObserver(updateStats).observe(finalSlide,{attributes:true});}

  /* extra hidden memories */
  var secretHeart=document.getElementById('secretHeart');
  var heartNote=document.getElementById('heartNote');
  var heartPressTimer=null;
  if(secretHeart){
    secretHeart.addEventListener('click',function(){
      interactions++;
      if(heartNote){heartNote.textContent='still you. every single time.'; heartNote.classList.add('show');}
      setTimeout(function(){if(heartNote){heartNote.classList.remove('show');}},2600);
    });
    secretHeart.addEventListener('pointerdown',function(){
      heartPressTimer=setTimeout(function(){
        discoveries++;
        if(heartNote){heartNote.textContent='20.03.2026 — and I would still choose that day.'; heartNote.classList.add('show');}
      },1200);
    });
    ['pointerup','pointerleave','pointercancel'].forEach(function(ev){
      secretHeart.addEventListener(ev,function(){clearTimeout(heartPressTimer);});
    });
  }

  var hiddenWords='';
  document.addEventListener('keydown',function(e){
    if(e.target && (e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'))return;
    hiddenWords=(hiddenWords+e.key.toLowerCase()).slice(-7);
    if(hiddenWords.indexOf('taobao')>-1){
      discoveries++;
      var detail=document.getElementById('cardDetail');
      var timeline=document.querySelector('.timeline-slide');
      if(timeline){
        var original=detail ? detail.textContent : '';
        if(detail){detail.textContent='Tao Bao. First date. Still one of my favourite little facts about us.';}
        setTimeout(function(){if(detail && detail.textContent.indexOf('Tao Bao. First date.')===0){detail.textContent=original;}},4200);
      }
      hiddenWords='';
    }
  });

  var finalCopy=document.querySelector('.final-copy');
  if(finalCopy){
    var taps=0, tapTimer=null;
    finalCopy.addEventListener('click',function(e){
      if(e.target.closest && e.target.closest('#restart'))return;
      taps++;
      clearTimeout(tapTimer);
      tapTimer=setTimeout(function(){taps=0;},900);
      if(taps===7){
        discoveries++;
        var old=document.getElementById('interactionStats');
        if(old){old.textContent='20.03.2026. Still us. ♡';}
        setTimeout(updateStats,3200);
        taps=0;
      }
    });
  }

  var restart=document.getElementById('restart');
  if(restart){
    restart.onclick=function(){
      unlocked=false;
      input.value='';
      message.textContent='';
      showSlide(0,0);
    };
  }

  setInterval(updateStats,1000);

  document.addEventListener('keydown',function(event){
    if(event.target && (event.target.tagName==='INPUT'||event.target.tagName==='TEXTAREA')){return;}
    if(event.key==='ArrowRight'||event.key===' '){event.preventDefault();go(1);}
    if(event.key==='ArrowLeft'){event.preventDefault();go(-1);}
  });

  var touchStart=0;

  /* little heart burst wherever she taps */
  document.addEventListener('click',function(event){
    var heart=document.createElement('span');
    heart.className='tap-heart';
    heart.textContent=['♥','♡','♥'][Math.floor(Math.random()*3)];
    heart.style.left=event.clientX+'px';
    heart.style.top=event.clientY+'px';
    heart.style.setProperty('--drift',(Math.random()*50-25)+'px');
    document.body.appendChild(heart);
    setTimeout(function(){heart.remove();},900);
  });

  document.addEventListener('touchstart',function(event){touchStart=event.changedTouches[0].clientX;},{passive:true});
  document.addEventListener('touchend',function(event){
    var distance=event.changedTouches[0].clientX-touchStart;
    if(Math.abs(distance)>55){go(distance<0?1:-1);}
  },{passive:true});

  showSlide(0,0);
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init);
}else{
  init();
}
})();