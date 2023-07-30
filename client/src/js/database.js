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
  try {
    console.log('PUT to the database');

    // Create a connection to the database database and version we want to use.
    const jateDb = await openDB('jate', 1);
  
    // Create a new transaction and specify the database and data privileges (read & write to update data)
    const tx = jateDb.transaction('jate', 'readwrite');
  
    // Open up the desired object store.
    const store = tx.objectStore('jate');
  
    // Use the .put() method to get all data in the database.
    const request = store.put({ id: 1, value: content });
  
    // Get confirmation of the request.
    const result = await request;

    console.log("Text saved to the database.", result);

  } catch (err) {
    console.error('Error updating to the database.', err);
  }
 

};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('GET from the database');

    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();

    const result = await request;

    console.log("Text retrieved from the database.", result);
  } catch (err) {
    console.error('Error retrieving data from the database.', err);
  }
  
};

initdb();
