import { baseUrl } from "../handleApi";

const urls = {
  getSongs: `${baseUrl}/songs`,
  likeSong: `${baseUrl}/songs/like`,
  allLikeSongs: `${baseUrl}/songs/like`,
};

export default urls;

// http://localhost:3300/api/songs/like
