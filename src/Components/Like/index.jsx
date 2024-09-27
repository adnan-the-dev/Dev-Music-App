// import { useState } from "react";
// import { CircularProgress, IconButton } from "@mui/material";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import styles from "./styles.module.scss";
// import { likeSongApi } from "../../api/songs/songsApi";
// import showToast from "../../utils/toastService";

// const Like = ({ songId }) => {
//   const [like, setLike] = useState(false);

//   const [loading, setLoading] = useState(false);
//   // Song liked successfully
//   const handleLike = async () => {
//     setLoading(true);
//     try {
//       const response = await likeSongApi(songId);

//       if (response.status === 200) {
//         setLike(!like);
//         showToast(`${response?.data?.message}`, "success");
//       } else {
//         showToast(response.message, "error");
//       }
//     } catch (error) {
//       showToast("Failed to like the song", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <IconButton
//       className={styles.like_btn}
//       onClick={handleLike}
//       disabled={loading}
//     >
//       {loading ? (
//         <CircularProgress size={24} style={{ color: "white" }} />
//       ) : !like ? (
//         <FavoriteBorderIcon className={styles.like_outlined} />
//       ) : (
//         <FavoriteIcon className={styles.like_filled} />
//       )}
//     </IconButton>
//   );
// };

// export default Like;

import { useState, useEffect } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./styles.module.scss";
import { likeSongApi } from "../../api/songs/songsApi";
import showToast from "../../utils/toastService";

const Like = ({ songId }) => {
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLikeState = localStorage.getItem(`likeState-${songId}`);
    if (savedLikeState !== null) {
      setLike(JSON.parse(savedLikeState));
    }
  }, [songId]);

  const handleLike = async () => {
    setLoading(true);
    try {
      const response = await likeSongApi(songId);

      if (response.status === 200) {
        const newLikeState = !like;
        setLike(newLikeState);
        localStorage.setItem(
          `likeState-${songId}`,
          JSON.stringify(newLikeState)
        );
        showToast(`${response?.data?.message}`, "success");
      } else {
        showToast(response.message, "error");
      }
    } catch (error) {
      showToast("Failed to like the song", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton
      className={styles.like_btn}
      onClick={handleLike}
      disabled={loading}
      // style={{ backgroundColor: like ? "green" : "transparent" }}
    >
      {loading ? (
        <CircularProgress size={24} style={{ color: "white" }} />
      ) : !like ? (
        <FavoriteBorderIcon className={styles.like_outlined} />
      ) : (
        <FavoriteIcon className={styles.like_filled} />
      )}
    </IconButton>
  );
};

export default Like;
