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

export const isValidFirstname = firstname =>
  /^[A-Za-zÀàÂâÄäÇçÉéÈèÊêËëÎîÏïÔôŒœÙùÛûÜü]{5,15}$/.test(firstname);
export const isValidLastname = lastname =>
  /^[A-Za-zÀàÂâÄäÇçÉéÈèÊêËëÎîÏïÔôŒœÙùÛûÜü]{2,10}$/.test(lastname);

export const isValidEmail = email =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const isValidPassword = password => /^(?=.*\S).{8,32}$/.test(password);

export const validateFields = (...fields) => {
  console.log(fields.map(validateField));

  return fields.every(validateField);
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
