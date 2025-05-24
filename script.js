const playlist = [
  { name: "Song 1", file: "songs/song1.mp3", image: "images/song1.jpg" },
  { name: "Song 2", file: "songs/song2.mp3", image: "images/song2.jpg" },
  { name: "Song 3", file: "songs/song3.mp3", image: "images/song3.jpg" }
];

let current = 0;
const audio = document.getElementById('audio');
const playlistDiv = document.getElementById('playlist');

// Load the playlist to the page
function loadPlaylist(songs = playlist) {
  playlistDiv.innerHTML = '';
  songs.forEach((song, index) => {
    const div = document.createElement('div');
    div.classList.add('song-item');
    div.innerText = song.name;
    div.onclick = () => loadSong(index);
    playlistDiv.appendChild(div);
  });
}

// Load the selected song
function loadSong(index) {
  current = index;
  audio.src = playlist[current].file;
  document.getElementById("album-art").src = playlist[current].image;
  audio.play();
}

// Toggle play/pause
function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

// Play next song
function nextSong() {
  current = (current + 1) % playlist.length;
  loadSong(current);
}

// Play previous song
function prevSong() {
  current = (current - 1 + playlist.length) % playlist.length;
  loadSong(current);
}

// Change volume
function changeVolume(val) {
  audio.volume = val;
}

// Search songs
function searchMusic() {
  const query = document.getElementById('search').value.toLowerCase();
  const filtered = playlist.filter(song => song.name.toLowerCase().includes(query));

  loadPlaylist(filtered);

  // If search results found, load the first song from filtered list
  if (filtered.length > 0) {
    const firstSongIndex = playlist.indexOf(filtered[0]);
    loadSong(firstSongIndex);
  } else {
    audio.pause(); // Pause audio if no songs found
    document.getElementById("album-art").src = ""; // Remove album art if no songs found
  }
}

// Initial load
window.onload = () => {
  loadPlaylist();
  loadSong(current); // Preload the first song
};
