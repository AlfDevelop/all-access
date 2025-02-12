self.addEventListener('sync', async (event) => {
    console.log("📡 Background Sync détecté :", event.tag);
    if (event.tag === 'sync-api-request') {
      event.waitUntil(syncApiRequest());
    }
  });
  
  async function syncApiRequest() {
    console.log("🔄 Exécution de `syncApiRequest()`...");
    const db = await openDatabase();
    const tx = db.transaction("requests", "readonly");
    const store = tx.objectStore("requests");
  
    const requests = await new Promise((resolve, reject) => {
      const getAllRequest = store.getAll();
      getAllRequest.onsuccess = () => resolve(getAllRequest.result || []);
      getAllRequest.onerror = (event) => reject(event.target.error);
    });
  
    if (requests.length === 0) {
      console.log("📭 Aucune requête en attente.");
      return;
    }
  
    for (const request of requests) {
      try {
        console.log("🌐 Envoi de la requête stockée :", request);
        const response = await fetch(request.url, request.options);
        const result = await response.json();
        console.log("✅ Réponse reçue :", result);
  
        self.registration.showNotification("✅ API Réponse !", {
          body: "Les données ont été récupérées avec succès.",
          icon: "/icons/icon-192x192.png"
        });
  
        const deleteTx = db.transaction("requests", "readwrite");
        deleteTx.objectStore("requests").delete(request.id);
        console.log("🗑 Requête supprimée après exécution.");
      } catch (error) {
        console.error("❌ Erreur lors de l'exécution de la requête stockée :", error);
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
  