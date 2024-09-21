import { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import logo from "../../assets/logo.png";

const Playlists = () => {
  // const Playlists = ({ playlists }) => {
  const playlists = [
    {
      _id: 1,
      name: "Today's Top Songs",
      desc: "By Adnan aziz",
    },
  ];
  return (
    <Fragment>
      {playlists.map((playlist) => (
        <Link key={playlist._id} to={`/playlist/${playlist._id}`}>
          <div className={styles.playlist}>
            {playlist.img === "" ? (
              <img
                src={logo}
                alt={playlist.name}
                style={{ background: "#919496" }}
              />
            ) : (
              <img src={logo} alt={playlist.name} />
            )}
            <p>{playlist.name}</p>
            <span>{playlist.desc}</span>
          </div>
        </Link>
      ))}
    </Fragment>
  );
};

export default Playlists;
