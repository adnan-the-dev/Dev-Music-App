// import React, { useState } from "react";
// import { Container, Box, Button, TextField, Typography } from "@mui/material";
// import {
//   BrowseButton,
//   DragDropBox,
//   HiddenInput,
//   SaveButton,
// } from "./style-component";
// // import { styled } from "@mui/system";

// const PlaylistForm = () => {
//   const [formData, setFormData] = useState({
//     playlistName: "",
//     playlistDescription: "",
//     image: "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = {
//       name: formData.playlistName,
//       desc: formData.playlistDescription,
//       image: formData.image,
//     };
//   };

//   return (
//     <Container
//       style={{
//         border: "1px solid red",
//         borderRadius: "12px",
//         padding: "1rem 1rem",
//         background: "blueviolet",
//         maxWidth: "400px",
//       }}
//     >
//       <Typography variant="h5" gutterBottom>
//         Playlist Form
//       </Typography>
//       <DragDropBox>
//         {formData.image ? (
//           <img
//             src={formData.image}
//             alt="Playlist"
//             style={{ width: "100%", height: "auto", borderRadius: "8px" }}
//           />
//         ) : (
//           <>
//             <Typography variant="body1">Drag n drop playlist image</Typography>
//             <Typography variant="body1">or</Typography>
//             <HiddenInput
//               id="upload-image"
//               label="upload-image"
//               type="image"
//               name="image"
//               handleInputChange={handleInputChange}
//             />
//           </>
//         )}
//       </DragDropBox>
//       <TextField
//         fullWidth
//         variant="outlined"
//         label="Playlist Name"
//         margin="normal"
//         name="playlistName"
//         value={formData.playlistName}
//         handleInputChange={handleInputChange}
//       />
//       <TextField
//         fullWidth
//         variant="outlined"
//         label="Playlist Description"
//         name="playlistDescription"
//         value={formData.playlistDescription}
//         handleInputChange={handleInputChange}
//         margin="normal"
//         multiline
//         rows={4}
//       />
//       <Box textAlign="center">
//         <SaveButton onClick={handleSubmit}>SAVE</SaveButton>
//       </Box>
//     </Container>
//   );
// };

// export default PlaylistForm;

import React, { useState } from "react";
import { Container, Box, Button, TextField, Typography } from "@mui/material";
import {
  BrowseButton,
  DragDropBox,
  HiddenInput,
  SaveButton,
} from "./style-component";
import { useNavigate } from "react-router-dom";
import showToast from "../../utils/toastService";
import { createPlaylistApi } from "../../api/playLists/playLists";

const PlaylistForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    image: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await createPlaylistApi(formData);
      showToast(`${response?.message}`, "success");
      navigate("/home");
    } catch (error) {
      showToast("Failed to update playlist", "error");
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        border: "1px solid red",
        borderRadius: "12px",
        padding: "1rem 1rem",
        background: "blueviolet",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Playlist Form
      </Typography>
      <DragDropBox>
        {formData.image ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "250px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Playlist"
              style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
            />
          </div>
        ) : (
          <>
            <Typography variant="body1">Drag n drop playlist image</Typography>
            <Typography variant="body1">or</Typography>
            <label htmlFor="upload-image">
              <HiddenInput
                id="upload-image"
                type="file"
                accept="image/*"
                name="image"
                onChange={handleInputChange}
              />
              <BrowseButton component="span">Browse</BrowseButton>
            </label>
          </>
        )}
      </DragDropBox>
      <TextField
        fullWidth
        variant="outlined"
        label="Playlist Name"
        margin="normal"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Playlist Description"
        name="desc"
        value={formData.desc}
        onChange={handleInputChange}
        margin="normal"
        multiline
        rows={4}
      />
      <Box textAlign="center">
        <SaveButton onClick={handleSubmit}>SAVE</SaveButton>
      </Box>
    </Container>
  );
};

export default PlaylistForm;
