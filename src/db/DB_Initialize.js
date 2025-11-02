import Note_DB_Control from "./Note_DB/Note_DB_Controller.js"

const DB_NAME = "DannyOS_DB"
const DB_VERSION = 1
let db;

/**
 * * Hey future Danny, remember this when creating a database:
 * *    - Controlling database should be in a `function` method not `const` variable
 */

/**
 * TODO: IndexedBD Initialize
 * - Create, Remove, Update, Delete Function
 */

export default function initializeDB() {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    /**
     * The `onupgradeneeded` event fired when:
     *      - Open database for the first time.
     *      - When open it with a higher version number than the current one.
     * 
     * Good for initialize database, change database scheme
     *      - Define object stores
     *      - Indexes
     *      - Structure
     * 
     * TODO: If database is empty, initailize database
     */
    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        console.log(db)

        // Name of the object table.
        db.createObjectStore("Test");
    }

    /**
     * If request send but return on an error,
     * this will send error log to console
     * 
     * This is also convenience for the "Toast Notification" part
     * TODO: Failed Toast Notification
     */
    request.onerror = (event) => {
        db = event.target.result;
        console.error(db.onerror());
    }

    /**
     * If request send on success,
     * will send success log to console
     * 
     * TODO: Success Toast Notification
     */
    request.onsuccess = (event) => {
        db = event.target.result;
        console.log(db)
    }
}