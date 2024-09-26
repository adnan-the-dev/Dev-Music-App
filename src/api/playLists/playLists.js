import { handleAPI, handleFileAPI } from "../handleApi";
import urls from "./playListUrls";

// get all playlists
export const getAllPlayListsSongsApi = async () => {
  const response = await handleAPI(`${urls.playLists}`, "GET");
  return response;
};

// get playlist by id
export const getPlayListById = async (id) => {
  const response = await handleAPI(`${urls.playListById}/${id}`, "GET");
  return response;
};

// update playlist by id
export const updatePlaylistById = async (id, data) => {
  const body = data;
  const response = await handleFileAPI(
    `${urls.updatePlayList}/${id}`,
    "PUT",
    body
  );
  return response;
};

// add song to playlist by id
export const addSongToPlaylist = async (data) => {
  const body = data;
  const response = await handleAPI(`${urls.addSongToPlaylist}`, "PUT", body);
  return response;
};

// create new playlist
export const createPlaylistApi = async (data) => {
  const body = data;
  const response = await handleFileAPI(
    `${urls.createPlaylist}`,
    "POST",
    body
  );
  return response;
};



// http://localhost:3300/api/playlists
