import { handleAPI } from "../handleApi";
import urls from "./playListUrls";

export const getAllPlayListsSongsApi = async () => {
  const response = await handleAPI(`${urls.playLists}`, "GET");
  return response;
};

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
