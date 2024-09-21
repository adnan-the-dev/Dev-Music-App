// import axios from "axios";
// import urls from "./authUrls";

import { handleApi } from "../handleApi";
import urls from "./authUrls";

// export const logInApi = async (data) => {
//   const { login } = urls.auth;
//   const response = await axios.post(login, data, {
//     headers: { "Content-Type": "application/json" },
//     withCredentials: false,
//   });
//   return response;
// };

// export const registerUserApi = (data) =>
//   axios.post(`${urls.auth.signup}`, data, {
//     headers: { "Content-Type": "application/json" },
//     withCredentials: true,
//   });

// //   http://localhost:3300/api/users

export const postRegisterApi = async (data) => {
  const body = data;
  const response = await handleApi(`${urls.signup}`, "POST", body);
  return response;
};

export const postLoginApi = async (data) => {
  const body = data;
  const response = await handleApi(`${urls.login}`, "POST", body);
  return response;
};

// export const getMenuApi = async () => {
//   const response = await handleAPICall(${urls.menu}, "GET");
//   return response;
// };

// export const getAllOutletMenuApi = async () => {
//   const response = await handleAPICall(${urls.allOutletMenu}, "GET");
//   return response;
// };

// export const getOutletMenuApi = async (outletId) => {
//   const response = await protectedAPICall(
//     ${urls.outletMenu}/${outletId}/menu,
//     "GET",
//   );
//   return response;
// };
