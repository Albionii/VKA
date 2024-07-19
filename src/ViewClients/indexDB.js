// indexedDB.js
const dbName = 'clientsDB'; 
const storeName = 'clients';


export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error('Error opening IndexedDB:', event.target.error);
      reject(event.target.error);
    };
  });
};

export const getClients = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
      console.error('Failed to open indexedDB:', event.target.errorCode);
      reject(new Error('Failed to open indexedDB'));
    };

    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(storeName, 'readonly');
      const objectStore = transaction.objectStore(storeName);

      const getClientsRequest = objectStore.getAll();

      getClientsRequest.onsuccess = function(event) {
        let clients = event.target.result;
        
        // Sort clients array by id in descending order
        clients.sort((a, b) => b.id - a.id);

        resolve(clients);
      };

      getClientsRequest.onerror = function(event) {
        console.error('Error fetching clients:', event.target.error);
        reject(new Error('Failed to fetch clients'));
      };

      transaction.oncomplete = function(event) {
        db.close();
      };
    };

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
    };
  });
};


export const deleteClient = async (clientId) => {

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
      console.error('Failed to open indexedDB:', event.target.errorCode);
      reject(new Error('Failed to open indexedDB'));
    };

    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);

      const deleteRequest = objectStore.delete(clientId);

      deleteRequest.onsuccess = function(event) {
        console.log(`Client with ID ${clientId} deleted successfully.`);
        resolve();
      };

      deleteRequest.onerror = function(event) {
        console.error('Error deleting client:', event.target.error);
        reject(new Error('Failed to delete client'));
      };

      transaction.oncomplete = function(event) {
        db.close();
      };
    };

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
    };
  });
};

export const searchByName = async (name) => {

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
      console.error('Failed to open indexedDB:', event.target.errorCode);
      reject(new Error('Failed to open indexedDB'));
    };

    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(storeName, 'readonly');
      const objectStore = transaction.objectStore(storeName);

      const clients = [];
      const cursorRequest = objectStore.openCursor();

      cursorRequest.onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
          // Check if the name contains the search string (case insensitive)
          if (cursor.value.name.toLowerCase().includes(name.toLowerCase())) {
            clients.push(cursor.value);
          }
          cursor.continue();
        } else {
          resolve(clients);
        }
      };

      transaction.oncomplete = function(event) {
        db.close();
      };
    };

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      const objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('name', 'name', { unique: false }); // Create index on 'name' property
    };
  });
};

export const getClientImages = async (clientId) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      console.error('Failed to open indexedDB:', event.target.errorCode);
      reject(new Error('Failed to open indexedDB'));
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(storeName, 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const clientRequest = objectStore.get(clientId);

      clientRequest.onsuccess = (event) => {
        const client = event.target.result;
        if (client && client.photos) {
          resolve(client.photos);
        } else {
          resolve([]);
        }
      };

      clientRequest.onerror = (event) => {
        console.error('Error fetching client images:', event.target.error);
        reject(new Error('Failed to fetch client images'));
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('id', 'id', { unique: false });
    };
  });
};
