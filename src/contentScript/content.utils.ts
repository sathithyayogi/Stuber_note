import { playerSelectClassName } from "../constants";

const getTime = youtubeTimeInSeconds => {
    var date = new Date(0);
    date.setSeconds(youtubeTimeInSeconds);
    return date.toISOString().substr(11, 8);
};

export const getCurrentYoutubeTimeStamp = () => {
    // @ts-ignore 
    const currentTimeStamp = document.getElementsByClassName('video-stream')[0].currentTime;
    return getTime(currentTimeStamp);
};

export const generateId = () => {
    return Number(Math.floor(1000 + Math.random() * 9000).toString());
};

export const getCurrentTimeStamp = () => {
    return new Date();
};

export const getYoutubeVideoId = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get("v");
}

export const getYoutubeURL = () => {
    const youtubeURL = `https://www.youtube.com/watch?v=${getYoutubeVideoId()}`;
    return youtubeURL;
}


export const playYoutubeVideo = () => {
    // @ts-ignore
    document.getElementsByClassName(playerSelectClassName)[0].play()
}

export const pauseYoutubeVideo = () => {
    // @ts-ignore
    document.getElementsByClassName(playerSelectClassName)[0].pause()
}

export const playAtParticularTimeStamp = (time: any) => {

    const timeArray = time.split(':');
    const hour = parseInt(timeArray[0]);
    const min = parseInt(timeArray[1]);
    const sec = parseInt(timeArray[2]);

    let totalSec = 0;

    if (hour > 0) {
        totalSec += (hour * 3600);
    } else if (min > 0) {
        totalSec += (min * 60);
    } else if (sec > 0) {
        totalSec += sec;
    }

    // @ts-ignore
    document.getElementsByClassName(playerSelectClassName)[0].currentTime = totalSec;
    // @ts-ignore    
    document.getElementsByClassName(playerSelectClassName)[0].play()
}
