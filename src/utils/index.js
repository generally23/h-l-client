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
