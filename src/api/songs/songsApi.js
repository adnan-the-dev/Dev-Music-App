import { handleAPI, handleFileAPI } from "../handleApi";
import urls from "./urls";

// get all songs API
export const getSongsApi = async () => {
  const response = await handleAPI(`${urls.getSongs}`, "GET");
  return response;
};

// likeSong API
export const likeSongApi = async (id) => {
  const response = await handleAPI(`${urls.likeSong}/${id}`, "PUT");
  return response;
};

// get all liked songs API
export const getAllLikedSongsApi = async () => {
  const response = await handleAPI(`${urls.allLikeSongs}`, "GET");
  return response;
};

// upload song API
export const uploadSongApi = async (data) => {
  const body = data;
  const response = await handleFileAPI(`${urls.uploadSong}`, "POST", body);
  return response;
};

// delete song API
export const deleteSongApi = async (id) => {
  const response = await handleAPI(`${urls.deleteSong}/${id}`, "DELETE");
  return response;
};

// update song API
// http://localhost:3300/api/songs/:id
