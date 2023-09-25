/*
Field
{
    value: '',
    validators: [
        {
            validate: function(){},
            errormessage: ''
        }
    ],
    setError: function();
}
*/

import dayjs from 'dayjs';

export const isValidFirstname = firstname =>
  /^[A-Za-zÀàÂâÄäÇçÉéÈèÊêËëÎîÏïÔôŒœÙùÛûÜü]{5,15}$/.test(firstname);
export const isValidLastname = lastname =>
  /^[A-Za-zÀàÂâÄäÇçÉéÈèÊêËëÎîÏïÔôŒœÙùÛûÜü]{2,10}$/.test(lastname);

export const isValidEmail = email =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const isValidPassword = password => /^(?=.*\S).{8,32}$/.test(password);

export const isValidTitle = title => /^(?=.{1,60}$).*$/.test(title);

export const isValidAddress = address => /^(?=.{1,60}$).*$/.test(address);

export const isValidPrice = (price = 0) => {
  let min = 5000000;
  let max = 900000000000;
  return price >= min && price <= max;
};

export const isValidDescription = description =>
  description.length <= 300 && description.length >= 15;

export const isValidArea = (area = 0) => {
  return area > 0;
};

export const isValidYearBuilt = (year = 0) => {
  console.log('year: ', year);
  // year must be between 1900 and current year
  return year >= 1900 && year <= dayjs().year();
};

export const validateFields = (...fields) => {
  return fields.map(validateField).every(v => v === true);
};

export const validateField = field => {
  if (!field) return false;

  for (let validator of field.validators) {
    const { validate, errormessage } = validator;
    const isValid = validate(field.value);
    if (!isValid) {
      field.setError(errormessage);
      return false;
    } else field.setError('');
  }
  return true;
};
