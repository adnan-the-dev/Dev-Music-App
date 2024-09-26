import { Fragment, useEffect, useState } from "react";
import Playlists from "../../Components/Playlists";
import styles from "./styles.module.scss";
import playlistImg from "../../images/rock.jpg";
import { getAllPlayListsSongsApi } from "../../api/playLists/playLists";
import showToast from "../../utils/toastService";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylists } from "../../redux/slices/playlistsSlice";

const filteredPlaylists = [
  { _id: 1, img: playlistImg, name: "Today's Top Songs", desc: "By Jahangeer" },
  { _id: 1, img: playlistImg, name: "Today's Top Songs", desc: "By Jahangeer" },
  { _id: 1, img: playlistImg, name: "Today's Top Songs", desc: "By Jahangeer" },
  { _id: 1, img: playlistImg, name: "Today's Top Songs", desc: "By Jahangeer" },
  { _id: 1, img: playlistImg, name: "Today's Top Songs", desc: "By Jahangeer" },
  { _id: 1, img: playlistImg, name: "Today's Top Songs", desc: "By Jahangeer" },
  { _id: 1, img: playlistImg, name: "Today's Top Songs", desc: "By Jahangeer" },
  { _id: 1, img: playlistImg, name: "Today's Top Songs", desc: "By Jahangeer" },
];

const Home = () => {
  const dispatch = useDispatch();
  // const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const callPlayListsApi = async () => {
    try {
      const { data: res } = await getAllPlayListsSongsApi();
      // setFilteredPlaylists(response?.data ?? []);
      dispatch(setPlaylists(res?.data ?? []));
    } catch (error) {
      showToast("Failed to fetch songs.", "error");
    }
  };
  useEffect(() => {
    callPlayListsApi();
  }, []);
  const filteredPlaylists = useSelector((state) => state.playlists.playlists);

  return (
    <Fragment>
      <div className={styles.container}>
        <h1>Good afternoon</h1>
        <div className={styles.playlists_container}>
          <Playlists filteredPlaylists={filteredPlaylists} />
        </div>
        <h1>Just the hits</h1>
        <div className={styles.playlists_container}>
          <Playlists filteredPlaylists={filteredPlaylists} />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
