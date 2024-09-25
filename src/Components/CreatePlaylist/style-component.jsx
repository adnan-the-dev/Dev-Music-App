import { Box, Button, styled } from "@mui/material";

export const DragDropBox = styled(Box)(({ theme }) => ({
  border: "2px dashed #ccc",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center",
  background: "#f9f9f9",
  marginBottom: "20px",
  position: "relative",
}));

export const BrowseButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
  color: "white",
  marginTop: "10px",
  padding: "10px 20px",
  borderRadius: "8px",
  "&:hover": {
    background: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
    opacity: 0.9,
  },
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(to right, #11998e, #38ef7d)",
  color: "white",
  padding: "10px 20px",
  borderRadius: "8px",
  marginTop: "20px",
  "&:hover": {
    background: "linear-gradient(to right, #11998e, #38ef7d)",
    opacity: 0.9,
  },
}));

export const HiddenInput = styled("input")({
  display: "none",
});
