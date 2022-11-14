import React, { memo, useEffect, useState } from "react";
import * as ReactDOM from 'react-dom';
// import  './contentscript.css'
import { zenModeTitle, goBackTitle } from "../constants";

const ZenMode = () => {
    const [buttonText, setButtonText] = useState<string>(zenModeTitle);
    const [noteTxt, setNoteTxt] = useState<string>("");
    const [placeHolder, setPlaceHolder] = useState<any>();
    var belowContainer = document.getElementById("below");
    const getTime = t => {
        var date = new Date(0);
        date.setSeconds(t);
        return date.toISOString().substr(11, 8);
    };
    const getCurrentYoutubeTimeStamp = () => {
        // @ts-ignore 
        const currentTimeStamp = document.getElementsByClassName('video-stream')[0].currentTime;
        return getTime(currentTimeStamp);
    };
    const generateId = () => {
        return Math.floor(Math.random() * 9000);
    }
    useEffect(() => {
        setInterval(() => {
            // @ts-ignore 
            const newT = document.getElementsByClassName('video-stream')[0].currentTime;
            setPlaceHolder(getCurrentYoutubeTimeStamp());
        }, 1000)
    }, [])

    useEffect(() => {
        console.log("---------");
        console.log(noteTxt);
    }, [noteTxt])

    // useEffect(() => {

    //     const params = new URLSearchParams(window.location.search)
    //     const videoId = params.get("v");
    //     const request = indexedDB.open("CarsDatabase", 1);
    //     request.onsuccess = function () {
    //         const db = request.result;
    //         const transaction = db.transaction("cars", "readwrite");
    //         const store = transaction.objectStore("cars");
    //         console.log("videoId", videoId);
    //         const idQuery = store.get(videoId);
    //         console.log("idQuery", idQuery);
    //         idQuery.onsuccess = function () {
    //             console.log('new fetch', idQuery?.result.note);
    //             setNoteTxt(idQuery?.result.note)
    //         };

    //         transaction.oncomplete = function () {
    //             db.close();
    //         };

    //     };
    // }, [])

    function submitNote(e) {
        e.preventDefault();
        const params = new URLSearchParams(window.location.search)
        const videoId = params.get("v");
        const request = indexedDB.open("CarsDatabase", 1);

        request.onupgradeneeded = function () {
            const db = request.result;
            const store = db.createObjectStore("cars", { keyPath: "id" });
            store.createIndex("cars_note", ["note"], { unique: false });
        };


        request.onsuccess = function () {

            const db = request.result;

            // 1
            const transaction = db.transaction("cars", "readwrite");

            //2
            const store = transaction.objectStore("cars");

            //3
            store.put({ id: videoId, note: noteTxt, youtubeTimeStamp: getCurrentYoutubeTimeStamp(), genId: generateId() });

            //4
            const idQuery = store.get(videoId);

            // 5
            idQuery.onsuccess = function () {
                console.log('idQuery', idQuery.result);
            };


            // 6
            transaction.oncomplete = function () {
                db.close();
            };



        };



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

    const addNote = (e) => {
        e.preventDefault();
        alert(noteTxt);
    }

    useEffect(() => {
        setTimeout(() => {
            var belowContainer = document.getElementById("below");
            var secondaryContainer = document.getElementById("secondary");
            belowContainer.classList.add("new-hide");
            secondaryContainer.classList.add("new-hide");
        }, 2500)
    }, [])

    return (
        <>
            <div style={{ display: 'flex', width: '100%', cursor: 'pointer', justifyContent: 'center', backgroundColor: 'red' }}>
                <h1 onClick={zenClick}>{buttonText}</h1>
            </div>

            <form onSubmit={(e) => {
                addNote(e);
            }}>
                <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                    <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
                        <label className="sr-only">Your comment</label>

                        <textarea id="comment" rows={4} defaultValue={noteTxt} onChange={(e) => {
                            setNoteTxt(e.target.value)
                        }} className="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder={" Write your Note at " + placeHolder}></textarea>
                    </div>
                    <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
                        <button onClick={(e) => {
                            submitNote(e);
                        }} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Post comment
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

const contentScript = () => {
    return ReactDOM.createPortal(<ZenMode />, document.getElementById("primary"));
}
export default contentScript;