self.addEventListener('push', function(event){
    const data = event.data ? event.data.json() : {}
    const options = {
        body: data.body || 'Default body',
        icon: 'img/icons/android-chrome-192x192.png',
        basge: 'img/icons/android-chrome-192x192.png',
    };
    event.waitUntil(
        self.ServiceWorkerRegistration.shownotification(data.title || 'Default title', options)
    );
});