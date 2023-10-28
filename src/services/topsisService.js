import axios from "axios";
import { config } from "../config/Config";

const topsisService = {
  getResultTopsis: (id) => {
    const result = axios
      .get(config.apiUrl + `api/topsis/${id}`)
      .then((response) => {
        return {
          success: response.data.success,
          message: response.data.message,
          data: response.data.data,
          topsis: response.data.topsis,
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

  printTopsis: (id) => {
    const result = axios
      .get(config.apiUrl + `api/result/${id}`)
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

  getAllUserTopsis: () => {
    const result = axios
      .get(config.apiUrl + "api/topsis")
      .then((response) => {
        return {
          success: response.data.success,
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

export default topsisService;
