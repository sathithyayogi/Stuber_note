const databaseName = "StuberNote";
const collectionObjectName = "note";

// fetch all note
export const fetchNote = (youtubeVideoId) =>{
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
export const insertNoteToDB = async (youtubeVideoId, payload) =>{
    const request = indexedDB.open(databaseName, 1);

    request.onupgradeneeded = function () {
        const db = request.result;
        const store = db.createObjectStore(collectionObjectName, { keyPath: "id" });
        store.createIndex("cars_note", ["note"], { unique: false });
    };

    request.onsuccess = function () {
        var fetchedNote:any;
        const db = request.result;
        const transaction = db.transaction(collectionObjectName, "readwrite");
        const store = transaction.objectStore(collectionObjectName);

        if(payload){
            store.put({ id: youtubeVideoId, notes:payload});
        }

        const idQuery = store.get(youtubeVideoId);
        
        idQuery.onsuccess = function () {
            console.log("idQuery?.result 0 ",idQuery?.result);
            
            fetchedNote = idQuery?.result;
            console.log("returning place 1",idQuery?.result);
            
            return fetchedNote;
        };
        
        // transaction.oncomplete = function () {
        //     db.close();
        // };
    };
}
