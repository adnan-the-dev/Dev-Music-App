import { Fragment, useEffect, useState } from "react";
import { ClickAwayListener } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "./styles.module.scss";
import {
  addSongToPlaylist,
  getAllPlayListsSongsApi,
} from "../../api/playLists/playLists";
import showToast from "../../utils/toastService";

const playlists = [
  { _id: 1, img: "", name: "Today's Top Songs", desc: "By Jahangeer" },
];

const PlaylistMenu = ({ song, closeMenu }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllApiSongs = async () => {
    setLoading(true);
    try {
      const { data: res } = await getAllPlayListsSongsApi();
      setPlaylists(res?.data ?? []);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch songs.";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const addSongToPlaylistFuc = async (playlistId, songId) => {
    const data = { songId, playlistId };
    try {
      const response = await addSongToPlaylist(data);
      if (response.status === 200) {
        showToast(`${response?.data?.message}`, "success");
      } else {
        showToast(`${response?.data?.message}`, "error");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to add song to playlist.";
      showToast(errorMessage, "error");
    }
  };

  useEffect(() => {
    getAllApiSongs();
  }, []);

  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <div className={styles.menu} onClick={closeMenu}>
        <div className={styles.playlist_option}>
          <p>Add to Playlist</p>
          <Fragment>
            <ArrowRightIcon />
            <div className={styles.playlists}>
              {playlists?.map((list) => (
                <div className={styles.option} key={list._id}>
                  <p onClick={() => addSongToPlaylistFuc(list._id, song._id)}>
                    {list.name}
                  </p>
                </div>
              ))}
            </div>
          </Fragment>
        </div>

        <div className={styles.option}>
          <p>Delete</p>
        </div>
        <div className={styles.option}>
          <p>Share</p>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default PlaylistMenu;
