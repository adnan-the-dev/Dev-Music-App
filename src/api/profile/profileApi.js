import { handleAPI } from "../handleApi";
import urls from "./profileUrls";

export const updateProfileApi = async (id, data) => {
  const body = data;
  const response = await handleAPI(`${urls.update}/${id}`, "PUT", body);
  return response;
};

// http://localhost:3300/api/users/:id
