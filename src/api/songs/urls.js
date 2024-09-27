import { baseUrl } from "../handleApi";

const urls = {
  getSongs: `${baseUrl}/songs`,
  likeSong: `${baseUrl}/songs/like`,
  allLikeSongs: `${baseUrl}/songs/like`,
  uploadSong: `${baseUrl}/songs`,
  deleteSong: `${baseUrl}/songs`,
};

export default urls;

// http://localhost:3300/api/songs/:id
