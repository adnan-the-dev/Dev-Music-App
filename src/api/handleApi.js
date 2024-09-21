// import axios from "axios";
// // import swal from "sweetalert";

// export const baseUrl =
//   import.meta.env.VITE_REACT_APP_BASE_URL;

// const isAccessTokenInvalid = (response) => {
//   const statusCodes = [400, 401, 403, 404];
//   return statusCodes.includes(response.status);
// };

// // swal(
// //   'Session Expired',
// //   'Your session has expired. Please log in again.',
// //   'warning'
// // )

// export const protectedAPICall = async (url, method, body = {}) => {
//   try {
//     // let accessToken = localStorage.getItem("accessToken");
//     try {
//       const response = await axios({
//         url,
//         method,
//         // headers: { Authorization: Bearer ${accessToken} },
//         data: body,
//       });
//       return response;
//     } catch (e) {
//       if (isAccessTokenInvalid(e.response)) {
//         const refreshTokenResponse = await axios.post(
//           ${baseUrl}/auth/refresh,
//           {
//             refreshToken: localStorage.getItem("refreshToken"),
//           },
//         );

//         // if (error.response && error.response.status === 401) {
//         //   swal(
//         //     'Session Expired',
//         //     'Your session has expired. Please log in again.',
//         //     'warning'
//         //   ).then(() => {
//         //     localStorage.clear();
//         //     window.location.href = '/login';
//         //   });
//         // }

//         accessToken = refreshTokenResponse.data.accessToken;
//         localStorage.setItem("accessToken", accessToken);

//         const refreshedResponse = await axios({
//           url,
//           method,
//           // headers: { Authorization: Bearer ${accessToken} },
//           data: body,
//         });

//         return refreshedResponse;
//       } else {
//         // return response;
//       }
//     }
//   } catch (error) {
//     return error;
//   }
// };

// export const handleAPICall = async (url, method, body = {}) => {
//   try {
//     const headers = {};
//     const response = await axios({
//       url,
//       method,
//       headers,
//       data: body,
//     });
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// import axios from "axios";

// export const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

// export const protectedAPICall = async (url, method, body = {}) => {
//   try {
//     const response = await axios({
//       url,
//       method,
//       data: body,
//     });
//     return response;
//   } catch (error) {
//     console.error("API call error:", error);
//     return error;
//   }
// };

// export const handleAPICall = async (url, method, body = {}) => {
//   try {
//     const response = await axios({
//       url,
//       method,
//       data: body,
//     });
//     return response;
//   } catch (error) {
//     console.error("API call error:", error);
//     return error;
//   }
// };


import axios from "axios";
export const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
export const handleApi = async (url, method, body = {}) => {
  try {
    const headers = {};
    const response = await axios({ url, method, headers, data: body });
    return response;
  } catch (e) {
    return e;
  }
};
