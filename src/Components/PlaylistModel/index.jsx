import { useState, useEffect } from "react";
import TextField from "../../Components/Inputs/TextFeilds";
import FileInput from "../Inputs/FileInput";
import Button from "../Button";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import defaultImg from "../../assets/logo.png";
import styles from "./styles.module.scss";
import showToast from "../../utils/toastService";
import { updatePlaylistById } from "../../api/playLists/playLists";

const PlaylistModel = ({ closeModel, playlist, getPlayList }) => {
  const [data, setData] = useState({
    name: "",
    desc: "",
    image: "",
  });

  const envUrl = import.meta.env.VITE_REACT_SONG_URL;

  const id = playlist?._id;

  useEffect(() => {
    if (playlist) {
      setData({
        name: playlist.name || "",
        desc: playlist.desc || "",
        // img: playlist.img || "",
        image: `${envUrl}/${playlist.img}` || "",
      });
    }
  }, [playlist]);

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: data.name,
      desc: data.desc,
      image: data.image,
    };
    try {
      const response = await updatePlaylistById(id, formData);
      showToast(`${response?.data?.message}`, "success");
      closeModel();
      getPlayList();
    } catch (error) {
      console.error(error);
      showToast("Failed to update playlist", "error");
    }
  };

  return (
    <div className={styles.model_container}>
      <IconButton className={styles.close_btn} onClick={closeModel}>
        <CloseIcon />
      </IconButton>
      <div className={styles.form_container}>
        <h1>Edit Details</h1>
        <div className={styles.input_container}>
          <TextField
            label="Name"
            name="name"
            value={data.name}
            handleInputState={handleInputState}
          />
        </div>
        <div className={styles.input_container}>
          <TextField
            label="Description"
            name="desc"
            value={data.desc}
            handleInputState={handleInputState}
          />
        </div>
        <div className={styles.input_container}>
          <FileInput
            label="Choose Image"
            type="image"
            name="image"
            value={data.image === "" ? defaultImg : data.image}
            handleInputState={handleInputState}
          />
        </div>
        <Button
          label="Submit"
          onClick={handleSubmit}
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            margin: "1rem",
          }}
        />
      </div>
    </div>
  );
};

export default PlaylistModel;
