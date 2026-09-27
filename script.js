(function(){
'use strict';

function init(){
  var slides=document.querySelectorAll('.slide');
  var current=0;
  var unlocked=false;

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

  function go(delta){showSlide(current+delta,delta);}

  if(prev){prev.onclick=function(){go(-1);};}
  if(next){next.onclick=function(){go(1);};}

  var nextButtons=document.querySelectorAll('[data-next]');
  for(var n=0;n<nextButtons.length;n++){
    nextButtons[n].onclick=function(){go(1);};
  }

  var form=document.getElementById('unlockForm');
  var input=document.getElementById('secretName');
  var message=document.getElementById('unlockMessage');

  function accepted(value){
    return /^bhondu+$/i.test(String(value).replace(/\s/g,''));
  }

  if(form){
    form.onsubmit=function(event){
      event.preventDefault();
      if(accepted(input.value)){
        unlocked=true;
        message.textContent='Good. You know. 😒';
        var a=getAudio();
        a.play().then(function(){
          var mb=document.getElementById('musicBtn');
          if(mb){mb.textContent='♫';}
        }).catch(function(){});
        setTimeout(function(){showSlide(1,1);},250);
      }else{
        message.textContent='Nope. Try again.';
        input.select();
      }
      return false;
    };
  }

  var audio=null;
  function getAudio(){
    if(!audio){
      audio=new Audio('assets/Those_Eyes_-_New_West_(mp3.pm).mp3');
      audio.loop=true;
      audio.volume=0.4;
    }
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
  if(image){image.onclick=function(){setPhoto(photoIndex+1);};}

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

  var restart=document.getElementById('restart');
  if(restart){
    restart.onclick=function(){
      unlocked=false;
      input.value='';
      message.textContent='';
      showSlide(0,0);
    };
  }

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

  showSlide(0);
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init);
}else{
  init();
}
})();