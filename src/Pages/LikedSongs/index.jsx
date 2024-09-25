import { Fragment, useEffect, useState } from "react";
import Song from "../../Components/Song";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from "./styles.module.scss";
import likeImg from "../../assets/logo.png";
import peaches from "../../assets/logo.png";
import { getAllLikedSongsApi } from "../../api/songs/songsApi";
import { CircularProgress } from "@mui/material";

const songs = [
  { _id: 1, img: peaches, name: "Peaches", artist: "Justin Bieber" },
  { _id: 1, img: peaches, name: "Peaches", artist: "Justin Bieber" },
  { _id: 1, img: peaches, name: "Peaches", artist: "Justin Bieber" },
  { _id: 1, img: peaches, name: "Peaches", artist: "Justin Bieber" },
];

const LikedSongs = () => {
  // getAllLikedSongsApi

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllLikeSongs = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const { data: response } = await getAllLikedSongsApi();
      setSongs(response?.data ?? []);
      setLoading(false);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch songs.";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllLikeSongs();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.head_gradient}></div>
        <img src={likeImg} alt="like songs" />
        <div className={styles.playlist_info}>
          <p>Playlist</p>
          <h1>Liked Songs</h1>
          <span>By Adnan aziz</span>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.body_nav}>
          <div className={styles.left}>
            <span>#</span>
            <p>Title</p>
          </div>
          <div className={styles.center}>
            <p>Artist</p>
          </div>
          <div className={styles.right}>
            <AccessTimeIcon />
          </div>
        </div>
        {loading ? (
          <div className={styles.loader_box}>
            <CircularProgress style={{ color: "white" }} />
          </div>
        ) : (
          songs?.map((song) => (
            <Fragment key={song._id}>
              <Song song={song} />
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
