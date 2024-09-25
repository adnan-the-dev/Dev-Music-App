import { handleAPI } from "../handleApi";
import urls from "./urls";

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

// http://localhost:3300/api/songs/like
