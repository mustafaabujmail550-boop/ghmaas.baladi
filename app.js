(function(){
const M=window.MENU,C=window.CONFIG||{};
const $=s=>document.querySelector(s);
const norm=t=>t.replace(/[\u064B-\u0652\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').toLowerCase();
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.textContent=h;return e};
let active='all';
// chips
const chips=$('#chips');
[{id:'all',name:'الكل'},...M.categories].forEach(c=>{
  const b=el('button','chip',c.name);b.type='button';b.setAttribute('role','tab');b.dataset.id=c.id;
  b.setAttribute('aria-selected',c.id==='all');
  b.onclick=()=>{active=c.id;[...chips.children].forEach(x=>x.setAttribute('aria-selected',x===b));render(true)};
  chips.appendChild(b)});
// sections
const host=$('#sections');
M.categories.forEach(c=>{
  const s=el('section');s.id='cat-'+c.id;s.dataset.id=c.id;
  s.appendChild(el('h2','tear',c.name));
  const g=el('div','grid');
  c.items.forEach(it=>{
    const a=el('article','card');a.dataset.s=norm(it.name+' '+(it.desc||''));
    const im=el('img');im.src=it.img;im.alt=it.name;im.loading='lazy';im.width=104;im.height=104;
    const d=el('div');d.appendChild(el('h3',null,it.name));
    if(it.desc)d.appendChild(el('p',null,it.desc));
    const p=el('div','prices');
    it.prices.forEach(x=>{const s=el('span','price');s.appendChild(el('b',null,x.value+' '+M.currency));if(x.label)s.appendChild(el('i',null,x.label));p.appendChild(s)});
    d.appendChild(p);a.append(im,d);g.appendChild(a)});
  s.appendChild(g);host.appendChild(s)});
$('#note').textContent=M.note||'';
function render(scroll){
  const q=norm($('#q').value.trim());let n=0;
  host.querySelectorAll('section').forEach(s=>{
    let v=0;
    s.querySelectorAll('.card').forEach(c=>{const ok=(active==='all'||active===s.dataset.id)&&(!q||c.dataset.s.includes(q));c.hidden=!ok;if(ok)v++});
    s.hidden=!v;n+=v});
  $('#empty').hidden=n>0;
  if(scroll){const t=active==='all'?$('#menu'):$('#cat-'+active);t.scrollIntoView({behavior:'smooth'})}
}
$('#q').addEventListener('input',()=>render(false));
// hero strip: real dish photos from the menu
const pick=['01','18','28','37','50','59'];
const strip=$('#strip');
pick.forEach((n,i)=>{const im=el('img');im.src='assets/img/'+n+'.webp';im.alt='';im.style.animationDelay=(.6+i*.08)+'s';strip.appendChild(im)});
// contact (only fields that have values)
const L=$('#contactList');
const add=(txt,href)=>{const li=el('li');if(href){const a=el('a',null,txt);a.href=href;a.target='_blank';a.rel='noopener';li.appendChild(a)}else li.textContent=txt;L.appendChild(li)};
if(C.phone)add('اتصل: '+C.phone,'tel:'+C.phone.replace(/^0/,'+962'));
if(C.whatsapp)add('واتساب','https://wa.me/'+C.whatsapp);
if(C.address)add(C.address,C.mapUrl||null);
if(C.hours)add('ساعات العمل: '+C.hours);
if(C.instagram)add('Instagram: ghmaas.baladi_jordan',C.instagram);
if(C.facebook)add('Facebook',C.facebook);
if(C.tiktok)add('TikTok',C.tiktok);
if(!L.children.length)add('سيتم إضافة معلومات التواصل قريباً.');
// nav highlight
const links=[...document.querySelectorAll('.nav__links a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
['home','menu','about','contact'].forEach(i=>io.observe(document.getElementById(i)));
})();
