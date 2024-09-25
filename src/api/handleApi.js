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
