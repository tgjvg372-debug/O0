const CACHE_NAME = "nizo-image-cache-v2";
const IMAGE_URLS = ["file_000000001bb08210877b39b5755e73be.png","file_000000009f58821088563384f6a6f274_edit_104086976247376.png","IMG_20260813_084411.jpg", "IMG_20260508_115221_copy_892x595.jpg", "IMG_20260508_115251_edit_49182422899206_copy_585x439.jpg", "798799_copy_447x447.jpg", "IMG_20260508_115250099_copy_1788x1788.jpg", "98.jpeg", "unnamed.webp", "Screenshot_20260710_061538.jpg", "ni899.webp", "Picsart_26-09-27_16-06-06-380.jpg", "FB_IMG_1781978305483.jpg", "FB_IMG_1781978343708.jpg", "0adeffbe6b89c41ea28360bfdf7af6f119f8dec9.jpg", "free-fire-directforgames.com.webp", "razer-gold-pin-hero-mobile_edit_10211200409229.jpg", "kjjik.jpg", "${ad[ADS_COL_IMAGE]}", "${cat.img}", "oho_copy_647x416.jpg", "og9ho_copy_647x416.jpg", "1000141323_copy_1200x772.jpg", "6_copy_700x450.jpg", "1000141321_copy_1400x900.jpg", "100014133_copy_1400x900.jpg", "1000141320_copy_1400x900.jpg", "abcbcg00m5rmr0cy4vw8d1a8qm_result_0_edit_69968802773569_copy_640x416.jpg", "1010_copy_1400x900.jpg", "1783854581277.png", "ogk9ho_copy_647x416.jpg", "ogkho_copy_647x416.jpg", "100014_copy_1400x900.jpg", "100015_copy_1400x900.jpg", "t76hb_copy_700x450.jpg", "100016_copy_700x450.jpg", "107014_copy_1400x900.jpg", "100j014_copy_700x450.jpg", "1783854849862.png", "25.png", "35.png", "50.png", "Screenshot_20260713_093923_mobi_foo_zaincash_DashboardActivity_edit_3244284595115.jpg", "Screenshot_20260713_093900_mobi_foo_zaincash_DashboardActivity_edit_3274347190156.jpg", "00pickkb9_copy_647x416.jpg", "00pikkb9_copy_647x416.jpg", "10001424_copy_700x450.jpg", "00pkb9_copy_1294x832.jpg", "p08_copy_700x450.jpg", "00p9_copy_700x450.jpg", "00pik9gkkb9_copy_647x416.jpg", "1000142620_copy_1024x658.jpg", "K8FMQfA50izbCc1EWUUkzUdSmQJX90xjx8DDdqro_edit_2294422859280.png", "Screenshot_20260710_061305.jpg", "Screenshot_20260710_052240.jpg", "Screenshot_20260710_061354.jpg", "Screenshot_20260710_061435.jpg", "kji99ij.jpg", "images_edit_67180783422132.jpg", "45000-FTTH-internet-alwatani_edit_67143966931365.png", "20260721_135143.jpg", "20260721_135257.jpg", "20260721_135306.jpg", "20260721_135327.jpg", "20260721_135338.jpg", "20260721_135348.jpg", "1784637658138_edit_15849675617495.png", "1784637660149_edit_15831181366929.png", "1784637633522_edit_15902046826069.png", "1784637598610_edit_15942814675220.png", "1784637620231_edit_15923458408248.png", "9hku8.jpeg", "IMG_20260721_184446.jpg", "nojoomalrabiaa-6months-all-governorates-300x193_edit_26570402945384.png", "IMG_20260721_184409.jpg", "IMG_20260721_184515.jpg", "IMG_20260721_184544.jpg", "file_00000000e0788210ad9d51a87653a3b0.png", "file_00000000d52c8210908bc12a864f1bd2.png", "file_000000005e6482109cfc77636a7b37d6.png", "file_0000000089a48210b0f47c43a488ec00.png", "remal-card-45000-dinars_edit_67006830702355.png", "furat-card-35000-dinars_edit_67067993279311.png", "waha-card-60000-dinars_edit_67107645493462.png", "IMG_20260927_161632.jpg", "1000174008.jpg", "1000174011.jpg", "1000174012.jpg", "1000174013.jpg", "1000174014.jpg", "1000174015.jpg", "1000174016.jpg", "1000174017.jpg", "1000174018.jpg", "1000174019.jpg", "1000174110.jpg", "1000174020.jpg", "1000174111.jpg", "1000174021.jpg", "1000174112.jpg", "1000174022.jpg", "1000174113.jpg", "1000174023.jpg", "1000174114.jpg", "1000174024.jpg", "file_00000000da348210b1b7b79c38724cad.png", "file_0000000061e882108c51b779c3d0c126.png", "file_000000009c508210b3dd2e10813bd288.png", "file_00000000cd0082108880fee7758a5b6a.png", "file_00000000f3488210ab0c088d696e5dc3.png", "file_000000001190821088849162aefb93da.png", "file_00000000056082108efcb9100ae7a9b6.png", "file_00000000bb6c8210a85fda5e86ecaa30.png", "file_00000000402c8210bec6bdca7c06a3c2.png", "file_00000000dca0821087526b517895cd89.png", "file_0000000014a882109ca13c32aa707957.png", "file_00000000bbd88210993c1e36f71ee440.png", "file_00000000fcf8821092eea77827dac765.png", "file_0000000006f88210b0d1464f29d571d7.png", "file_000000003a188210ab4e65db21bc639f.png", "file_000000004bfc8210b2ca32103ce38ec3.png", "file_0000000074f881f49206f8fb94d84afb.png", "file_0000000087e08210b5c0d188f5cbc800.png", "file_00000000a20c821094aa1fef0b42f963.png", "file_00000000b2088210ad7dc860adcbc5bf.png"];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(IMAGE_URLS.map(async path => {
      try {
        const response = await fetch(new Request(new URL(path, self.registration.scope), { cache: "reload" }));
        if (response.ok && response.type !== "opaque") await cache.put(new URL(path, self.registration.scope), response);
      } catch (_) {}
    }));
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("nizo-image-cache-") && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || request.destination !== "image") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, { ignoreSearch: false });
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  })());
});
