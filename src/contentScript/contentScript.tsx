import React, { memo, useEffect, useState } from "react";
import * as ReactDOM from 'react-dom';
import { zenModeTitle, goBackTitle } from "../constants";
import { getCurrentYoutubeTimeStamp, generateId, getCurrentTimeStamp, getYoutubeVideoId } from './content.utils'
import { insertNoteToDB } from './content.db'
import InsertNote from "./components/InsertNote";

const ZenMode = () => {
    const databaseName = "StuberNote";
    const collectionObjectName = "note";

    const youtubeVideoId = getYoutubeVideoId();
    const [buttonText, setButtonText] = useState<string>(zenModeTitle);
    const [noteArray, setNoteArray] = useState<any>();
    const [placeHolder, setPlaceHolder] = useState<any>();
    
    
    var belowContainer = document.getElementById("below");

    const fetchNoteToDB = (youtubeVideoId, payload) => {
        const request = indexedDB.open(databaseName, 1);

        request.onupgradeneeded = function () {
            const db = request.result;
            const store = db.createObjectStore(collectionObjectName, { keyPath: "id" });
            store.createIndex("cars_note", ["note"], { unique: false });
        };

        request.onsuccess = function () {
            var fetchedNote: any;
            const db = request.result;
            const transaction = db.transaction(collectionObjectName, "readwrite");
            const store = transaction.objectStore(collectionObjectName);

            if (payload) {
                store.put({ id: youtubeVideoId, notes: payload });
            }

            const idQuery = store.get(youtubeVideoId);

            idQuery.onsuccess = function () {
                setNoteArray(idQuery?.result);

                return fetchedNote;
            };

        };
    }

    useEffect(() => {
        fetchNoteToDB(youtubeVideoId, null);
    }, [`${youtubeVideoId}`])

    useEffect(() => {
        setInterval(() => {
            setPlaceHolder(getCurrentYoutubeTimeStamp());
        }, 1000)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            var belowContainer = document.getElementById("below");
            var secondaryContainer = document.getElementById("secondary");
            setButtonText(goBackTitle);
            belowContainer.classList.add("new-hide");
            secondaryContainer.classList.add("new-hide");
        }, 1000)
    }, [])

    function submitNote(e, value) {
        e.preventDefault();
        if (noteArray) {
            const newData = JSON.parse(JSON.stringify(noteArray.notes));
            const notePayload =
                { note: value, youtubeTimeStamp: getCurrentYoutubeTimeStamp(), genId: generateId(), insertedAt: getCurrentTimeStamp() }
            newData.unshift(notePayload);
            insertNoteToDB(youtubeVideoId, newData);
        } else {
            const notePayload =
                [{ note: value, youtubeTimeStamp: getCurrentYoutubeTimeStamp(), genId: generateId(), insertedAt: getCurrentTimeStamp() }]
            insertNoteToDB(youtubeVideoId, notePayload);
        }

        fetchNoteToDB(youtubeVideoId, null);
    }

    function updateNote(e, value, noteId) {
        e.preventDefault();
        const newData = JSON.parse(JSON.stringify(noteArray.notes));
        const noteIndex = newData.findIndex((data) => data.genId == noteId);
        newData[noteIndex].note = value;
        insertNoteToDB(youtubeVideoId, newData);
        fetchNoteToDB(youtubeVideoId, null);

    }

    function deleteNote(e, noteId) {
        e.preventDefault();
        const newData = JSON.parse(JSON.stringify(noteArray.notes));
        const noteIndex = newData.findIndex((data) => data.genId == noteId);
        newData.splice(noteIndex, 1);
        insertNoteToDB(youtubeVideoId, newData);
        fetchNoteToDB(youtubeVideoId, null);
    }

    var secondaryContainer = document.getElementById("secondary");
    const zenClick = () => {
        if (buttonText === zenModeTitle) {
            setButtonText(goBackTitle);
            belowContainer.classList.add("new-hide");
            secondaryContainer.classList.add("new-hide");
        } else if (buttonText === goBackTitle) {
            setButtonText(zenModeTitle);
            belowContainer.classList.remove("new-hide");
            secondaryContainer.classList.remove("new-hide");
        }
    }

    return (
        <>
            <div style={{display:'flex',justifyContent:'flex-end', marginTop:'10px'}}>
                <h1 onClick={zenClick}>{buttonText}</h1>
            </div>

            <InsertNote firstNote hideCustomization placeHolder={placeHolder} defaultNote={""} submitNote={(e: any, value: string) => {
                submitNote(e, value);
            }} />
            {
                noteArray?.notes.map((noteData) => {
                    return (
                        <InsertNote key={noteData.genId} deleteNote={(e, videoId) => {
                            deleteNote(e, videoId)
                        }} placeHolder={placeHolder} defaultNote={noteData} updateNote={(e, value: string, noteId: string) => {
                            updateNote(e, value, noteId);
                        }} />
                    )
                })
            }
        </>
    )
}

const contentScript = () => {
    return ReactDOM.createPortal(<ZenMode />, document.getElementById("primary"));
}
export default contentScript;