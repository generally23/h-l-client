import { Navigation, Pagination } from 'swiper/modules';

export const formatMoney = (number = 0) => {
  number = String(number);
  // don't format numbers 4 characters and less
  if (number.length < 5) return number;

  // count every time a character is seen
  let counter = 0;
  // formatted string to be returned
  let formatted = '';
  // end index start at first character (rtl)
  let endIndex = 0;
  // start at last charcter since we read rtl
  let startIndex = number.length - 1;

  // loop from start startIdx to endIdx
  for (startIndex; startIndex >= endIndex; startIndex--) {
    // current character
    const value = number[startIndex];
    // update counter
    counter++;
    // counter at 3 add comma if startIdx > endIdx
    if (counter === 3) {
      formatted =
        startIndex > endIndex
          ? `.${value}${formatted}`
          : `${value}${formatted}`;
      // reset counter
      counter = 0;
    } else {
      // add character at to left
      formatted = `${value}${formatted}`;
    }
  }

  return formatted;
};

// returns an object of the authenticated user
export const getLocalAuth = () => {
  // return false or { auth: auth: true, account: {...} }
  return (
    sessionStorage.authenticated && JSON.parse(sessionStorage.authenticated)
  );
};

// set auth status
export const setLocalAuth = value => {
  sessionStorage.setItem('authenticated', JSON.stringify(value));
};

// set auth status
export const removeLocalAuth = value => {
  sessionStorage.removeItem('authenticated');
};

export const alertAndRedirectBack =
  (account, error, setSuccessMessage, setErrorMessage, redirect) => () => {
    if (account) {
      // show success message
      setSuccessMessage('Successfully signed up!');
      // reset error message if present
      setErrorMessage('');
      // redirect user after 2 seconds
      setTimeout(() => {
        // redirect
        redirect(-1);
      }, 5000);
    }

    if (error) {
      // reset success message if present
      setSuccessMessage('');
      // show error message
      setErrorMessage(error.message);
    }
  };

// this computes an image size and resolution
// image size has to be less than 5mb
// image resolution has to HD+

export const isAcceptableImage = async (file, options) => {
  if (!file) return false;

  let acceptable = true;
  // default file size in 5mb in bytes
  const defaultSize = 5 * 1024 * 1024;

  const { resolution, size } = (options = {
    size: defaultSize,
    resolution: { width: 1920, height: 1080 },
    ...options,
  });

  // check size and stop here if size is more than allowed
  console.log(
    `default size: ${defaultSize}bytes`,
    `file size: ${file.size}bytes`
  );
  // if this is true then file is acceptable
  acceptable = file.size <= size;

  if (!acceptable) return false;

  // create image to use as a container to help calculate file resolution
  const image = new Image();

  // create a URL object from file
  const imageUrl = URL.createObjectURL(file);

  // set img src to image url
  image.src = imageUrl;

  return new Promise(resolver => {
    // listen for event when image has been successfully been loaded
    image.addEventListener('load', e => {
      // extract width and height from image
      const { width, height } = image;

      console.log('Image Width: ', width, 'Image height: ', height);

      // set acceptable to false if resolution is lower than expected
      if (width < resolution.width || height < resolution.height) {
        acceptable = false;
      }
      // resole this promise
      resolver(acceptable);

      // revoke url object
      URL.revokeObjectURL(imageUrl);
    });
  });
};

export const formatSrset = srcSet => {
  srcSet = !srcSet ? [] : srcSet;
  return srcSet
    .reduce((accumulator, currentValue) => {
      // Split each element by '-' to separate the parts
      const parts = currentValue.split('-');

      const width = parts[parts.length - 1];

      // Format the string and add it to the accumulator
      accumulator.push(`${currentValue} ${width}w`);

      return accumulator;
    }, [])
    .join(', ');
};

// extendable
export const basicSwiperOptions = {
  slidesPerView: 3,
  spaceBetween: 50,
  pagination: {
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    450: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
  lazy: 'true',
  navigation: true,
  modules: [Pagination, Navigation],
};

// puriify
export const assignStrict = object => {
  const pure = {};
  if (!object) return;

  for (let key in object) {
    if (object[key]) pure[key] = object[key];
  }
  return pure;
};

// this function takes an object an properties it return an object of those properties
export const selectFromObject = (object, ...keys) => {
  if (!object) return {};

  const output = {};

  for (let key of keys) {
    output[key] = object[key];
  }

  return output;
};

// convert formDataToJson

export const formDataToObject = form => {
  return Object.fromEntries(form.entries());
};
