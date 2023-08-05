console.log("Welcome");

//Initialize the Varriables
var songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
var masterPlay = document.getElementById("masterPlay");
var myProgressBar = document.getElementById("myProgressBar");
var gif = document.getElementById("gif");
var masterSongName = document.getElementById("masterSongName");
var songItems = Array.from(document.getElementsByClassName("songItem"));

var songs = [
    {SongName:'Salam-e-ishq', FilePath:'songs/1.mp3', CoverPath:'covers/1.jpg'},
    {SongName:'Dil-Ibadat', FilePath:'songs/2.mp3', CoverPath:'covers/2.jpg'},
    {SongName:'Tum-Mere-Ho', FilePath:'songs/3.mp3', CoverPath:'covers/3.jpg'},
    {SongName:'Dil-Ko-Karaar-Aaya', FilePath:'songs/4.mp3', CoverPath:'covers/4.jpg'},
    {SongName:'Dil-Deewana', FilePath:'songs/5.mp3', CoverPath:'covers/5.jpg'},
    {SongName:'Hawaayein', FilePath:'songs/6.mp3', CoverPath:'covers/6.jpg'},
    {SongName:'Yaad-Hai-Na', FilePath:'songs/7.mp3', CoverPath:'covers/7.jpg'},
    {SongName:'Sanam-Teri-Kasam', FilePath:'songs/8.mp3', CoverPath:'covers/8.jpg'},
    {SongName:'Jitni-Dafa', FilePath:'songs/9.mp3', CoverPath:'covers/9.jpg'},
    {SongName:'Sukoon-Mila', FilePath:'songs/10.mp3', CoverPath:'covers/10.jpg'},
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].CoverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].SongName;
});

//audioElement.play();

// Handle Play/Pause click.
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//Listen to Events.
audioElement.addEventListener("timeupdate", ()=>{
    // Update Seeekbar.
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove(fa-circle-pause);
        element.classList.add(fa-circle-play);
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove(fa-circle-play);
        e.target.classList.add(fa-circle-pause);
        audioElement.src = "songs/${songIndex+1}.mp3";
        masterSongName.innerText = songs[songIndex].SongName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove(fa-circle-play);
        masterPlay.classList.add(fa-circle-pause);
    })
})

document.getElementById("next").addEventListener('click', ()=>{
    if (songIndex>=9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = "songs/${songIndex+1}.mp3";
    masterSongName.innerText = songs[songIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove(fa-circle-play);
    masterPlay.classList.add(fa-circle-pause);
})

document.getElementById("previous").addEventListener('click', ()=>{
    if (songIndex<=0) {
        songIndex = 9;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = "songs/${songIndex+1}.mp3";
    masterSongName.innerText = songs[songIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove(fa-circle-play);
    masterPlay.classList.add(fa-circle-pause);
})