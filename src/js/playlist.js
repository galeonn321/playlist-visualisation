function splitOnEqual(param){
  return param.split('=');
}

function getAccessToken(){
  const hash = window.location.hash;
  const hashWithoutHash = hash.substring(1);

  const params = hashWithoutHash.split('&');
  const keyValues = params.map((value) => splitOnEqual(value)); //! 

  const accessToken = keyValues[0][1];
  return accessToken;
}

getAccessToken();


function getPlaylist(playlistID){
   const url = `https://api.spotify.com/v1/playlists/${playlistID}`
   const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
   };

   return fetch(url, {headers}).then((response) => response.json());
}

function renderPlaylist(playlistID){

const container = document.getElementById('tracks');
const audioPlayer = document.getElementById('player');

getPlaylist(playlistID).then((playlist) => {
  console.log(playlist);
  const tracks = playlist.tracks.items;

    for (let i=0; i < tracks.length; i++){
      const track = tracks[i].track;

      const playlistItem = document.createElement('div');
      playlistItem.classList.add('playlist-item');

      const playlistItemImg = document.createElement('img');
      playlistItemImg.classList.add('playlist-item-img');
      playlistItemImg.setAttribute('src', track.album.images[0].url);

      const playlistItemTitle = document.createElement('div');
      playlistItemTitle.classList.add('playlist-item-title');
      playlistItemTitle.innerHTML = track.name;

      playlistItem.addEventListener('click', () => {
        if (currentlyActive === track.id){
          audioPlayer.pause();
          currentlyActive = null;
          playlistItem.classList.remove('active');
          }else{
            if (currentlyActive){
              document.querySelector(".active").classList.remove('active;')
            }
            currentlyActive = track.id;
            playlistItem.classList.add('active');

            //! play preview if available
            if (track.preview_url){
              audioPlayer.setAttribute('src', track.preview_url);
              audioPlayer.play();
            }else{
          audioPlayer.onpause();
          }
        }} );

      playlistItem.appendChild(playlistItemImg);
      playlistItem.appendChild(playlistItemTitle);
      container.appendChild(playlistItem);

    }
  });
}

let currentlyActive;


renderPlaylist('37i9dQZF1E4EVVDXXikh20')


























// curl -X "GET" "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n?market=ES" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQCAlAwNoobqAMHH_uaFfF--umZb5QIsR_9bCQohPWfEDF5v7HAvLe5oeL84EZYqsEJRiVr8Y8jM8LcjLgJwoYx3DNcwuK_XQfoqzTyEqXVylMr4soctmrdk9GvFA7S7RtqM9Lso8NGDk5bc"