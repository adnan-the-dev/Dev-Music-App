import { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import logo from "../../assets/logo.png";

// const Playlists = () => {
const Playlists = ({ filteredPlaylists }) => {
  return (
    <Fragment>
      {filteredPlaylists?.map((playlist) => (
        <Link key={playlist._id} to={`/playlist/${playlist._id}`}>
          <div className={styles.playlist}>
            {playlist.img === "" ? (
              <img
                src={logo}
                alt={playlist.name}
                style={{ background: "#919496" }}
              />
            ) : (
              <img src={playlist.img} alt={playlist.name} />
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
