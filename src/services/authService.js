import axios from "axios";
import { config } from "../config/Config";

const authService = {
  loginAuth: (data) => {
    const result = axios
      .post(config.apiUrl + "auth/login", data)
      .then((response) => {
        return {
          success: response.data.success,
          message: response.data.message,
          data: response.data.data,
        };
      })
      .catch((error) => {
        return {
          success: false,
          data: error,
        };
      });

    return result;
  },

  getUser: () => {
    const result = axios
      .get(config.apiUrl + "auth/user")
      .then((response) => {
        return {
          success: response.data.success,
          message: response.data.message,
          data: response.data.data,
        };
      })
      .catch((error) => {
        return {
          success: false,
          data: error,
        };
      });
    return result;
  },
};

export default authService;
