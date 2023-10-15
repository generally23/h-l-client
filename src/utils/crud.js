import axios from 'axios';
import { accountsURL } from '../constants';

const sendRequest = async options => {
  try {
    // server response
    const response = await axios(options);
    // return response body
    return response.data;
  } catch (error) {
    console.log('Post error: ', error);
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

export const postData = options => {
  // set basic options and bake in user provided options
  options = {
    method: 'POST',
    withCredentials: true,
    cors: true,
    ...options,
  };

  return sendRequest(options);
};

export const updateData = options => {
  // Options should include URL and data

  options = { method: 'PATCH', withCredentials: true, cors: true, ...options };

  return sendRequest(options);
};

export const manageAccountAuth = async ({
  data,
  path,
  setLoading,
  setError,
  setAccount,
  method = 'post',
} = {}) => {
  // don't forget to reinitialize state
  setLoading(false);
  // reinitialize error
  setError(null);
  // reinitialize account
  setAccount(null);

  // inform UI to spin loader
  setLoading(true);
  // url to sign in
  const url = `${accountsURL}/${path}`;

  // send data to server
  let response;

  switch (method) {
    // user is fetching or triggering a get request
    case 'get':
      response = await fetchData({ url });
      break;

    // if method is update user is updating account
    case 'update':
      response = await updateData({ url, data });
      break;

    // default action is post
    default:
      response = await postData({ url, data });
  }

  // set loading to false after we get response
  setLoading(false);

  // response might be an error inspect it
  if (response.isError) return setError(response);

  // set account object
  setAccount(response);
};

export const fetchData = options => {
  options = { withCredentials: true, cors: true, ...options };

  return sendRequest(options);
};

// export const fetchData = (
//   url,
//   options = { withCredentials: true, cors: true }
// ) => {
//   return async data => {
//     options = { url, ...options, ...data };
//     try {
//       const response = await axios(options);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       if (error.response) {
//         error.response.data.isError = true;
//       } else error = { message: error.message, isError: true };

//       return error.response ? error.response.data : error;
//     }
//   };
// };

export const removeData = (url, options) => {
  options = { withCredentials: true, cors: true };

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
