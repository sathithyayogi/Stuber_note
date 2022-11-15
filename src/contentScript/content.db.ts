const databaseName = "CarsDatabase";
const collectionObjectName = "cars";

// fetch all note
const fetchNote = (youtubeVideoId) =>{
    let youtubeNote = {};
    const request = indexedDB.open(databaseName, 1);
    const db = request.result;
    const transaction = db.transaction(collectionObjectName, "readwrite");
    const store = transaction.objectStore(collectionObjectName);
    const idQuery = store.get(youtubeVideoId);
    idQuery.onsuccess = function () {
        youtubeNote = idQuery;
    };
    transaction.oncomplete = function () {
        db.close();
    };
    return youtubeNote;
}

// insert note
export const insertNote = (youtubeVideoId, payload) =>{
    const request = indexedDB.open(databaseName, 1);

    request.onupgradeneeded = function () {
        const db = request.result;
        const store = db.createObjectStore(collectionObjectName, { keyPath: "id" });
        store.createIndex("cars_note", ["note"], { unique: false });
    };

    request.onsuccess = function () {
        const db = request.result;
        const transaction = db.transaction(collectionObjectName, "readwrite");
        const store = transaction.objectStore(collectionObjectName);
        store.put({ id: youtubeVideoId, notes:[payload]});


      const note =  fetchNote(youtubeVideoId);
        console.log("note out",note);
        
        transaction.oncomplete = function () {
            db.close();
        };

    };
}

// update note
