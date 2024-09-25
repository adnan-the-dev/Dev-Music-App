import { baseUrl } from "../handleApi";

const urls = {
  playLists: `${baseUrl}/playlists`,
  playListById: `${baseUrl}/playlists`,
  updatePlayList: `${baseUrl}/playlists/edit`,
  addSongToPlaylist: `${baseUrl}/playlists/add-song`,
};

export default urls;

// http://localhost:3300/api/playlists/add-song
