import { baseUrl } from "../handleApi";

const urls = {
  auth: {
    signup: `${baseUrl}/users`,
    login: `${baseUrl}/login`,
  },
};

export default urls;

// http://localhost:3300/api/users

// http://localhost:3300/api/login
