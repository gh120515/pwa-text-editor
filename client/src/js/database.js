import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
  console.log('PUT to the database');

  // Create a connection to the database database and version we want to use.
  const textDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges (read & write to update data)
  const tx = textDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .put() method to get all data in the database.
  const request = store.put({ content });

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result?.value;

  // console.error('putDb not implemented');
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const textDb = await openDB('jate', 1);
  const tx = textDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;

  // console.error('getDb not implemented');
};

initdb();
