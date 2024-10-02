import { Fragment, useEffect, useState } from "react";
import Song from "../../Components/Song";
import Playlists from "../../Components/Playlists";
import { IconButton } from "@mui/material";
import peaches from "../../images/peaches.jpg";
import playlistImg from "../../images/rock.jpg";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.scss";
import { getSongsApi } from "../../api/songs/songsApi";
import showToast from "../../utils/toastService";
import { getAllPlayListsSongsApi } from "../../api/playLists/playLists";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSongs } from "../../redux/slices/songsSlice";
import { setPlaylists } from "../../redux/slices/playlistsSlice";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [songs, setSongs] = useState([]);
  // const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getAllApiSongs = async () => {
    setLoading(true);
    try {
      const { data: response } = await getSongsApi();
      const { data: res } = await getAllPlayListsSongsApi();
      // setSongs(response?.data ?? []);
      // setPlaylists(res?.data ?? []);

      // Dispatch actions to the store
      dispatch(setSongs(response?.data ?? []));
      dispatch(setPlaylists(res?.data ?? []));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch songs.";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const songs = useSelector((state) => state.songs.songs);
  const playlists = useSelector((state) => state.playlists.playlists);

  const filteredSongs = searchTerm
    ? songs.filter((song) =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : songs;

  const filteredPlaylists = searchTerm
    ? playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : playlists;

  useEffect(() => {
    getAllApiSongs();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.search_input_container}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input
          type="text"
          placeholder="Search for songs and playlists"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton onClick={() => setSearchTerm("")}>
          <ClearIcon />
        </IconButton>
      </div>
      <div className={styles.results_container}>
        <div className={styles.songs_container}>
          {filteredSongs.map((song, i) => (
            <Fragment key={i}>
              <Song song={song} />
            </Fragment>
          ))}
        </div>
        <div className={styles.playlists_container}>
          <Playlists filteredPlaylists={filteredPlaylists} />
        </div>
      </div>
    </div>
  );
};

export default Search;
