import axios from "axios";
export const baseUrl =
  import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3300";
export const handleAPI = async (url, method, body = {}) => {
  const token = localStorage.getItem("accessToken");

  try {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };
    const response = await axios({ url, method, headers, data: body });
    return response;
  } catch (e) {
    return e;
  }
};

export const handleFileAPI = async (url, method, body) => {
  const token = localStorage.getItem("accessToken");

  try {
    const headers = {
      "x-auth-token": token,
    };
    const formData = new FormData();
    if (body) {
      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });
    }
    const response = await axios({ url, method, headers, data: formData });
    return response;
  } catch (e) {
    return e;
  }
};
