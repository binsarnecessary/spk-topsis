import axios from "axios";
import { config } from "../config/Config";

const alternativeService = {
  getAlternative: () => {
    const result = axios
      .get(config.apiUrl + "api/alternative")
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

  getAlternativeById: (id) => {
    const result = axios
      .get(config.apiUrl + `api/alternative/${id}`)
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

  addAlternative: (data) => {
    const result = axios
      .post(config.apiUrl + `api/alternative`, data)
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

  updateAlternative: (data) => {
    const result = axios
      .put(config.apiUrl + `api/alternative/${data.id}`, data)
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

  deleteAlternative: (id) => {
    const result = axios
      .delete(config.apiUrl + `api/alternative/${id}`)
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

export default alternativeService;
