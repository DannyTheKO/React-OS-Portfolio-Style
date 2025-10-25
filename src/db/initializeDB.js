const DB_NAME = "DannyOS_DB"
const DB_VERSION = 1

export function initializeDB() {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
        console.log(event);
    }

    request.onsuccess = (event) => {
        console.log("hi")
        console.log(event);
    }
}