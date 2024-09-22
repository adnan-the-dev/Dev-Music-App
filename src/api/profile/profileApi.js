

export const postRegisterApi = async (data) => {
  const body = data;
  const response = await handleAPI(`${urls.signup}`, "POST", body);
  return response;
};

export const postLoginApi = async (data) => {
  const body = data;
  const response = await handleAPI(`${urls.login}`, "POST", body);
  return response;
};
