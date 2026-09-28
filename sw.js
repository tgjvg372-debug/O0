const CACHE='filscash-v2';
const FILES=['./','index.html'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));
  self.clients.claim();
});
// الصفحة: من النت أولاً، وإذا ماكو نت تفتح النسخة المحفوظة (بدل صفحة الخطأ البيضاء)
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate'){
    e.respondWith(
      fetch(e.request).then(r=>{
        const copy=r.clone();
        caches.open(CACHE).then(c=>c.put('index.html',copy));
        return r;
      }).catch(()=>caches.match('index.html').then(r=>r||caches.match('./')))
    );
  }
});
