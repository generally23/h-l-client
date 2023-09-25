import axios from 'axios';

export const postData = (url, options = { method: 'POST' }) => {
  return async data => {
    options = { ...options, data, withCredentials: true, cors: true };
    try {
      // server response
      const response = await axios(url, options);
      // return response body
      return response.data;
    } catch (error) {
      // check if error is from axios
      if (error.response) {
        // add isError property to help identify payload bc this promise will be fullfilled
        error.response.data.isError = true;
      } else {
        // add isError
        error = { message: error.message, isError: true };
      }
      // return error
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

export const fetchData = (
  url,
  options = { withCredentials: true, cors: true }
) => {
  return async data => {
    options = { ...options, ...data };
    try {
      const response = await axios(data?.url || url, options);
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
