import axios from 'axios';

export const postData = (url, options = { method: 'POST' }) => {
  return async data => {
    options = { ...options, data, withCredentials: true, cors: true };
    try {
      const response = await axios(url, options);

      return response.data;
    } catch (error) {
      if (error.response) {
        error.response.data.isError = true;
      } else {
        error = { message: error.message, isError: true };
      }

      return error.response ? error.response.data : error;
    }
  };
};

export const updateData = (url, options = { method: 'PATCH' }) => {
  return async data => {
    options = { ...options, data, withCredentials: true, cors: true };
    try {
      const response = await axios(url, options);

      return response.data;
    } catch (error) {
      if (error.response) {
        error.response.data.isError = true;
      } else {
        error = { message: error.message, isError: true };
      }

      return error.response ? error.response.data : error;
    }
  };
};

export const fetchData = (url, options = {}) => {
  return async data => {
    options = { ...options, ...data };
    try {
      const response = await axios(data.url || url, options);
      return response.data;
    } catch (error) {
      console.error(error);
      if (error.response) {
        error.response.data.isError = true;
      } else error = { message: error.message, isError: true };

      return error.response ? error.response.data : error;
    }
  };
};

export const removeData = (url, options) => {};
