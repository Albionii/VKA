const dbName = 'clientsDB';
const storeName = 'clients';

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('name', 'name', { unique: false });
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

const getTransaction = async (mode) => {
  const db = await openDatabase();
  return db.transaction(storeName, mode).objectStore(storeName);
};

export const addClient = async (client) => {
  const objectStore = await getTransaction('readwrite');
  return new Promise((resolve, reject) => {
    const request = objectStore.add(client);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      console.error('Error adding client:', event.target.error);
      reject(event.target.error);
    };
  });
};

export const updateClient = async (client) => {
  const objectStore = await getTransaction('readwrite');
  return new Promise((resolve, reject) => {
    const request = objectStore.put(client);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      console.error('Error editing client:', event.target.error);
      reject(event.target.error);
    };
  });
};

export const deleteClient = async (clientId) => {
  const objectStore = await getTransaction('readwrite');
  return new Promise((resolve, reject) => {
    const request = objectStore.delete(clientId);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      console.error('Error deleting client:', event.target.error);
      reject(event.target.error);
    };
  });
};

export const getClients = async () => {
  const objectStore = await getTransaction('readonly');
  return new Promise((resolve, reject) => {
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error('Error fetching clients:', event.target.error);
      reject(event.target.error);
    };
  });
};

export const getClient = async (clientId) => {
  const objectStore = await getTransaction('readonly');
  return new Promise((resolve, reject) => {
    const request = objectStore.get(clientId);

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error('Error fetching client:', event.target.error);
      reject(event.target.error);
    };
  });
};

export const getImagesOfClient = async (clientId) => {
  const client = await getClient(clientId);
  return client ? client.photos : [];
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