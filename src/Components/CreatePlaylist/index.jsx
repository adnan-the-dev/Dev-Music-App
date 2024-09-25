// import React, { useState } from "react";
// import {
//   Container,
//   Box,
//   Button,
//   TextField,
//   Switch,
//   Typography,
//   FormControlLabel,
// } from "@mui/material";
// import { styled } from "@mui/system";

// const DragDropBox = styled(Box)(({ theme }) => ({
//   border: "2px dashed #ccc",
//   borderRadius: "8px",
//   padding: "20px",
//   textAlign: "center",
//   background: "#f9f9f9",
//   marginBottom: "20px",
//   position: "relative",
// }));

// const BrowseButton = styled(Button)(({ theme }) => ({
//   background: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
//   color: "white",
//   marginTop: "10px",
//   padding: "10px 20px",
//   borderRadius: "8px",
//   "&:hover": {
//     background: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
//     opacity: 0.9,
//   },
// }));

// const SaveButton = styled(Button)(({ theme }) => ({
//   background: "linear-gradient(to right, #11998e, #38ef7d)",
//   color: "white",
//   padding: "10px 20px",
//   borderRadius: "8px",
//   marginTop: "20px",
//   "&:hover": {
//     background: "linear-gradient(to right, #11998e, #38ef7d)",
//     opacity: 0.9,
//   },
// }));

// const HiddenInput = styled("input")({
//   display: "none",
// });

// const PlaylistForm = () => {
//   const [formData, setFormData] = useState({
//     playlistName: "",
//     playlistDescription: "",
//     img: null,
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (event) => {
//     setFormData({
//       ...formData,
//       img: event.target.files[0],
//     });
//   };

//   const handleSubmit = () => {
//     // Handle form submission
//     console.log(formData);
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h5" gutterBottom>
//         Playlist Form
//       </Typography>
//       <DragDropBox>
//         {formData.img ? (
//           <img
//             src={formData.img}
//             alt="Playlist"
//             style={{ width: "100%", height: "auto", borderRadius: "8px" }}
//           />
//         ) : (
//           <>
//             <Typography variant="body1">Drag n drop playlist image</Typography>
//             <Typography variant="body1">or</Typography>
//             <label htmlFor="upload-image">
//               <HiddenInput
//                 id="upload-image"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//               <BrowseButton component="span">Browse</BrowseButton>
//             </label>
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
//         onChange={handleInputChange}
//       />
//       <TextField
//         fullWidth
//         variant="outlined"
//         label="Playlist Description"
//         name="playlistDescription"
//         value={formData.playlistDescription}
//         onChange={handleInputChange}
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
// import { styled } from "@mui/system";

const PlaylistForm = () => {
  const [formData, setFormData] = useState({
    playlistName: "",
    playlistDescription: "",
    img: null,
  });

  const [imgPreview, setImgPreview] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, img: file });
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
    // Here you can handle the upload logic, for example using FormData
    const data = new FormData();
    data.append("playlistName", formData.playlistName);
    data.append("playlistDescription", formData.playlistDescription);
    data.append("img", formData.img);

    // You can then send 'data' to your API endpoint
  };

  return (
    <Container
      // maxWidth="sm"
      style={{
        border: "1px solid red",
        borderRadius: "12px",
        padding: "1rem 1rem",
        background: "blueviolet",
        maxWidth: "400px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Playlist Form
      </Typography>
      <DragDropBox>
        {imgPreview ? (
          <img
            src={imgPreview}
            alt="Playlist"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        ) : (
          <>
            <Typography variant="body1">Drag n drop playlist image</Typography>
            <Typography variant="body1">or</Typography>
            <label htmlFor="upload-image">
              <HiddenInput
                id="upload-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
        name="playlistName"
        value={formData.playlistName}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Playlist Description"
        name="playlistDescription"
        value={formData.playlistDescription}
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
