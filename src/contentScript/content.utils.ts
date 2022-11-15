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
    return  params.get("v");
}

