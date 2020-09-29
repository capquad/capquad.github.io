const CACHE_NAME = "T&D v1";
const version = "T&D v1";

const urlsToCache = [
	'/',
	'/assets/css/style.css',
	'/index.html',
	'/favicon.ico',
	'/assets/js/main.js',
	'/assets/github-real.png',
	'/assets/twitter.png',
	'/assets/whatsapp.png',
	'/android-chrome-256x256.png',
	'/android-chrome-192x192.png',
	'/apple-touch-icon.png',
	'/favicon-32x32.png',
	'/favicon-16x16.png'
];

self.addEventListener('install', installer => {
	console.log("Installing");

	const done = async () => {
		const cache = await caches.open(CACHE_NAME);
		return cache.addAll(urlsToCache);
	};

	installer.waitUntil(done());
});

self.addEventListener('fetch', fetchEvent => {
	const url = fetchEvent.request.url;

	console.log(`Fetching: ${url}`);

	const getResponse = async (request) => {
		let response = await caches.match(request);
		if (response && response.status === 200) {
			console.log('File in cache. Returning cached version');
			return response;
		}

		try {
			response = await fetch(request);
			if (response && response.status === 404) {
				return new Response({
					status: 404
				});
			}
		} catch (e) {
			window.alert(e);
		}

		const clone = response.clone();
		const cache = await caches.open(CACHE_NAME);
		cache.put(url, clone);
		return response;
	};
	fetchEvent.respondWith(getResponse(fetchEvent.request));
});

self.addEventListener('activate', activator => {
	console.log('Activating');

	const currentCaches = [CACHE_NAME];
	const done = async () => {
		const names = await caches.keys();
		return Promise.all(names.map(name => {
			if (!currentCaches.includes(name)) {
				return caches.delete(name);
			}
		}));
	};

	activator.waitUntil(done());
});
