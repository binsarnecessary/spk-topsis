import axios from "axios";
import { config } from "../config/Config";

const criteriaService = {
  getAllCriteria: () => {
    const result = axios
      .get(config.apiUrl + "api/criteria")
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

  getAllCriteriaById: (id) => {
    const result = axios
      .get(config.apiUrl + `api/criteria/${id}`)
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

  addCriteria: (data) => {
    const result = axios
      .post(config.apiUrl + `api/criteria`, data)
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

  updateCriteria: (data) => {
    const result = axios
      .put(config.apiUrl + `api/criteria/${data.id}`, data)
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

  deleteCriteria: (id) => {
    const result = axios
      .delete(config.apiUrl + `api/criteria/${id}`)
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



  //---------------TOPSI METHOD----------------------------

  getAllPoint: () => {
    const result = axios
      .get(config.apiUrl + "api/point")
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

  sendKuesioner: (data) => {
    const result = axios
      .post(config.apiUrl + "api/decision", data)
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

export default criteriaService;
