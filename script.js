const play = document.getElementById('play');
const music = document.querySelector('audio');
const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const time = document.getElementById('time');
const track = document.getElementById('track');
const end_time = document.querySelector('span');
let currenttime = document.querySelector('p');
const progressbar = document.getElementById('progressbar');
let icon = document.getElementById('progressbar_input');
let volume_slider = document.getElementById('volume_slider');

const songs = [
    {
        name: "mohali anthem",
        title: "mohali anthem",
        artist: "sikander khalon",
    },
    {
        name: "bai bai",
        title: "bai bai",
        artist: "arjan dhillon",
    },
    {
        name: "0 to 100",
        title: "0 to 100",
        artist: "sidhu moosewala",
    },
];

let isplaying = false;

// play function
const playmusic = () => {
    isplaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
 
// progressbar icon moving function    
if(music.play()){
    setInterval(() => {
        icon.value = music.currentTime;
    },1000);
}
};

// pause funtion
const pausemusic = () => {
    isplaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anime");
};

// condition for play pause funtion
play.addEventListener('click', () => {
    if (isplaying) {
        pausemusic();
    } else {
        playmusic();
    }
});

// change the track name and img
const loadsong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    img.src = "images/" + songs.name + ".jpg";
    music.src = "music/" + songs.name + ".mp3";
};

// next and prev button 

songsIndex = 0;

next.addEventListener('click', nextsongs = () => {
    songsIndex = (songsIndex + 1) % songs.length;
    loadsong(songs[songsIndex]);
    playmusic();
});

prev.addEventListener('click', () => {
    songsIndex = (songsIndex - 1 + songs.length) % songs.length;
    loadsong(songs[songsIndex]);
    playmusic();
});

music.addEventListener("timeupdate", (event) => {
    const duration = event.target.duration;
    const currentTime = event.target.currentTime;

// time update

    let etm = Math.floor(duration / 60);
    let ets = Math.floor(duration % 60);
    if (ets < 10) {
        end_time.innerHTML = `0${etm}:0${ets}`;
    } else {
        end_time.innerHTML = `${etm}:${ets}`;
    }

    let ctm = Math.floor(currentTime / 60);
    let cts = Math.floor(currentTime % 60);
    currenttime.innerHTML = `${ctm}:${cts}`;
    if (cts < 10) {
        currenttime.innerHTML = `0${ctm}:0${cts}`;
    } else {
        currenttime.innerHTML = `${ctm}:${cts}`;
    }
});


// click functionality on progressbar
progressbar.addEventListener('click',() =>{
    music.currentTime = icon.value;
    
});

// volume function
function setVolume() {
    music.volume = volume_slider.value / 100;
}

music.addEventListener("ended", nextsongs);