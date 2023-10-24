import axios from "axios";
import { config } from "../config/Config";

const newsService = {
  getAllNews: () => {
    const result = axios
      .get(config.apiUrl + "api/news")
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

  getNewsById: (id) => {
    const result = axios
      .get(config.apiUrl + `api/news/${id}`)
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

  addDataNews: (data) => {
    const result = axios
      .post(config.apiUrl + "api/news", data)
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

  editDataNews: (data) => {
    const result = axios
      .put(config.apiUrl + `api/news/${data.id}`, data)
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

  deleteDataNews: (id) => {
    const result = axios
      .delete(config.apiUrl + `api/news/${id}`)
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

export default newsService;
