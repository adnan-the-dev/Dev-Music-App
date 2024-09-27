import React, { useState, useRef } from "react";
import "./musicUploadForm.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { uploadSongApi } from "../../api/songs/songsApi";
import showToast from "../../utils/toastService";

export default function MusicUploadForm() {
  const [formData, setFormData] = useState({
    name: "",
    artist: "",
    image: null,
    file: null,
  });
  const navigate = useNavigate();
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [audioFileName, setAudioFileName] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else if (name === "filePath") {
      setFormData({ ...formData, file: files[0] });
      setAudioFileName(files[0].name);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const { data: response } = await uploadSongApi(formData);
      showToast(`${response?.message}`, "success");
      navigate("/search");
    } catch (error) {
      showToast("Failed to update playlist", "error");
    }
  };

  return (
    <div className="form-container">
      <div className="image-box">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Track Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="artist">Artist</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Cover Image</label>
          <div className="image-upload-container">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              ref={imageInputRef}
              className="file-input"
              style={{ display: "none" }}
            />
            <button
              type="button"
              onClick={() => imageInputRef.current.click()} // Trigger the file input
              className="browse-button"
            >
              Browse Image
            </button>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Cover Preview"
                className="image-preview"
              />
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="filePath">Audio File</label>
          <div className="audio-upload-container">
            <input
              type="file"
              id="filePath"
              name="filePath"
              // accept="audio/*"
              onChange={handleChange}
              required
              ref={audioInputRef}
              className="file-input"
              style={{ display: "none" }}
            />
            <button
              type="button"
              onClick={() => audioInputRef.current.click()}
              className="browse-button"
            >
              Browse Audio
            </button>
            {audioFileName && (
              <p className="audio-file-name">{audioFileName}</p>
            )}
          </div>
        </div>
        <button type="submit" className="submit-button">
          Upload
        </button>
      </form>
    </div>
  );
}
