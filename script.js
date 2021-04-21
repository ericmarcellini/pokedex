const songs = [
    "2Pac - Ambitionz az a ridah.mp3",
    "2Pac - Changes ft. Talent.mp3",
    "Coolio - Gangsta's Paradise [Original].mp3",
    "Gin & Juice Snoop Dogg [dirty].mp3",
    "Nuthin' But A G Thang.mp3",
    "Wiz Khalifa - Black And Yellow.mp3"
]

const player = document.getElementById('player');

function createSongList() {
    const list = document.createElement("ol");
    for (let i = 0; i < songs.length; i++){
      const item = document.createElement("li")
      item.appendChild(document.createTextNode(songs[i]))
      list.appendChild(item);
    }
    return list
}

const songList = document.getElementById('songList');
songList.appendChild(createSongList());



songList.onclick = function(e){
    const source = document.getElementById('source');
    source.src="songs/" + e.target.innerText;

    document.querySelector("#currentSong").innerHTML = `Now Playing: ${e.target.innerHTML}`


    player.load();
    player.play();
};

function playAudio() {
    if(player.readyState) {
        player.play();
    }

}

function pauseAudio(){
    player.pause();
}

const slider = document.getElementById('volumeSlider')
slider.oninput = function(e) {
    const volume = e.target.value
    player.volume = volume;
}

function updateProgress() {
   if(player.currentTime > 0){
    const progressBar = document.getElementById('progress');
    progressBar.value = (player.currentTime / player.duration) * 100;
   }
}
