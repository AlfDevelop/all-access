self.addEventListener('install', (event) => {
    self.skipWaiting(); // Active immédiatement le service worker
  });
  
  self.addEventListener('activate', (event) => {
    clients.claim(); // Prend le contrôle des clients ouverts
  });
  
  // Mettre en file d'attente les requêtes hors ligne
  self.addEventListener('sync', async (event) => {
    if (event.tag === 'sync-api-request') {
      event.waitUntil(syncApiRequest());
    }
  });
  
  async function syncApiRequest() {
    const db = await openDatabase();
    const requests = await db.getAll('requests');
  
    for (const request of requests) {
      try {
        const response = await fetch(request.url, request.options);
        const result = await response.json();
  
        // Envoyer une notification à l'utilisateur
        self.registration.showNotification("✅ API Réponse !", {
          body: "Les données ont été récupérées avec succès.",
          icon: "/icons/icon-192x192.png"
        });
  
        await db.delete('requests', request.id); // Supprime la requête une fois réussie
      } catch (error) {
        console.error("Échec de la synchronisation en arrière-plan :", error);
      }
    }
  }
  
  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("offline-requests", 1);
      request.onerror = (event) => reject(event.target.error);
      request.onsuccess = (event) => resolve(event.target.result);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("requests")) {
          db.createObjectStore("requests", { keyPath: "id", autoIncrement: true });
        }
      };
    });
  }
  