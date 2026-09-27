(function(){
'use strict';
var pages=document.querySelectorAll('.page'), current='home', song=document.getElementById('song'), toast=document.getElementById('toast');
var photos=[
['20260913145619135.jpg','this one just felt right'],['20260913145620022.jpg','you looked pretty here'],['20260913145623476.jpg','just us'],['20260913145623805.jpg','one of those moments'],['PXL_20260912_064556914.jpg','you'],['PXL_20260912_064649801.jpg','this face'],['PXL_20260915_085033379.jpg','you, being you'],['PXL_20260915_085042633.MP.jpg','a little moment together'],['PXL_20260925_072819836.jpg','dumb as always'],['PXL_20260925_072822775.jpg','another favourite'],['PXL_20260925_072831129.jpg','pretty as always'],['PXL_20260925_114406222.jpg','one more memory']
];
function show(id){
 current=id;
 pages.forEach(function(p){p.classList.toggle('active',p.id===id);});
 window.scrollTo({top:0,behavior:'smooth'});
}
function toastMsg(msg){
 toast.textContent=msg;toast.classList.add('show');clearTimeout(toast._t);
 toast._t=setTimeout(function(){toast.classList.remove('show');},3500);
}
document.querySelectorAll('[data-open]').forEach(function(b){b.addEventListener('click',function(){show(this.getAttribute('data-open'));});});
document.querySelectorAll('[data-back]').forEach(function(b){b.addEventListener('click',function(){show('home');});});
document.getElementById('homeBtn').onclick=function(){show('home');};
document.getElementById('enterBtn').onclick=function(){show('notes');toastMsg('welcome back. ♡');};

var image=document.getElementById('galleryImage'),caption=document.getElementById('galleryCaption'),dots=document.getElementById('photoDots'),pi=0;
photos.forEach(function(_,i){
 var d=document.createElement('button');d.className='photo-dot'+(i===0?' active':'');d.type='button';
 d.onclick=function(){setPhoto(i);};dots.appendChild(d);
});
function setPhoto(i){
 pi=(i+photos.length)%photos.length;image.src='../assets/'+photos[pi][0];caption.textContent=photos[pi][1];
 document.querySelectorAll('.photo-dot').forEach(function(d,i){d.classList.toggle('active',i===pi);});
}
document.getElementById('prevPhoto').onclick=function(){setPhoto(pi-1);};
document.getElementById('nextPhoto').onclick=function(){setPhoto(pi+1);};
image.onclick=function(){setPhoto(pi+1);};

document.querySelectorAll('.paper-note').forEach(function(b){b.onclick=function(){document.getElementById('noteReveal').textContent=this.dataset.note;toastMsg('you opened one.');};});
var lore={
bhopal:'Bhopal. MUN. That night walk near the hotel. Before everything had a name.',
taobao:'Tao Bao. First date. One of the little facts that became ours.',
1903:'19.03.2026. More than best friends.',
2003:'20.03.2026. Officially us. The date this whole thing keeps coming back to.'
};
document.querySelectorAll('[data-lore]').forEach(function(b){b.onclick=function(){document.getElementById('loreReveal').textContent=lore[this.dataset.lore];};});
var futures={
date:'Another date. No reason. Just us.',
trip:'Somewhere neither of us has been yet.',
food:'Something neither of us has ordered before.',
random:'Something so stupid that we will remember it anyway.'
};
document.querySelectorAll('[data-future]').forEach(function(b){b.onclick=function(){document.getElementById('futureReveal').textContent=futures[this.dataset.future];};});
var open={
angry:'Be angry. I can take it. Just come back and talk to me.',
miss:'I probably miss you too. Unfortunately, this website still cannot teleport me.',
bad:'Come here. Today being bad doesn't mean tomorrow has to be.',
sleep:'Put the phone down eventually. But before you do: I love you.',
laugh:'Fine. Here is your reminder that you chose me voluntarily.',
love:'Hi. I love you. That is all.'
};
document.querySelectorAll('[data-openwhen]').forEach(function(b){b.onclick=function(){document.getElementById('openReveal').textContent=open[this.dataset.openwhen];};});
var randoms=[
'Bhopal. That night. Still remember it.',
'Tao Bao. First date.',
'20.03.2026. Still us.',
'You are still unfortunately my favourite person.',
'This website exists because apparently normal communication was not enough.',
'Go look at a photo.',
'Come back tomorrow. I might have added something.',
'No message. Just a reminder: I love you.'
];
document.getElementById('randomBtn').onclick=function(){document.getElementById('randomReveal').textContent=randoms[Math.floor(Math.random()*randoms.length)];};
var input=document.getElementById('memoryInput'),saved=document.getElementById('savedMemory');
function loadSaved(){var v=localStorage.getItem('aruniV2Memory');if(v)saved.textContent=v;}
document.getElementById('saveMemory').onclick=function(){var v=input.value.trim();if(!v){toastMsg('write something first 😒');return;}localStorage.setItem('aruniV2Memory',v);saved.textContent=v;input.value='';toastMsg('kept here. ♡');};
loadSaved();

var music=document.getElementById('musicBtn');
music.onclick=function(){if(song.paused){song.play().then(function(){music.textContent='♫';}).catch(function(){toastMsg('press again to start the song.');});}else{song.pause();music.textContent='♪';}};
document.addEventListener('keydown',function(e){
 if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
 if(e.key==='Escape')show('home');
});
var secret='';
document.addEventListener('keydown',function(e){
 if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
 secret=(secret+e.key.toLowerCase()).slice(-8);
 if(secret==='iloveyou'){toastMsg('I know. I love you too. ♡');secret='';}
 if(secret==='taobao'){show('lore');document.getElementById('loreReveal').textContent='You found it. Tao Bao. First date. ♡';secret='';}
});
document.addEventListener('click',function(e){
 if(e.target.closest('button'))return;
 var h=document.createElement('span');h.textContent='♡';h.style.cssText='position:fixed;left:'+e.clientX+'px;top:'+e.clientY+'px;color:#a93652;z-index:40;pointer-events:none;font-size:18px;animation:float .9s ease forwards';document.body.appendChild(h);setTimeout(function(){h.remove();},900);
});
var st=document.createElement('style');st.textContent='@keyframes float{to{transform:translateY(-35px) scale(1.25);opacity:0}}';document.head.appendChild(st);
})();