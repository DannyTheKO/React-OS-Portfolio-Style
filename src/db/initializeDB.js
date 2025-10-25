const DB_NAME = "DannyOS_DB"
const DB_VERSION = 1
let db;

export default function initializeDB() {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
        db = event.target.result;
        console.error(db.onerror());
    }

    request.onsuccess = (event) => {
        db = event.target.result;
        console.log(db)
    }

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        console.log(db)

        // Name of the database table
        db.createObjectStore("Test");
    }
}