const CACHE='railway-staff-reference-v5';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg','./brand-art.png','./documents-index.json','./railway-byelaws.pdf','./national-rail-conditions-july-2026.pdf','./crosscountry-passenger-charter-april-2026.pdf','./crosscountry-pidd-issue-8-august-2023.pdf'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('railway-staff-reference-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin===location.origin){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match('./index.html'))))});
