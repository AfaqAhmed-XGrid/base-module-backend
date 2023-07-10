// Import constants
import constants from '../app.constants';

/**
 * Function to validate the value of input field
 * @param {string} inputType
 * @param {string | undefined} inputValue
 * @return {string | null}
 */
const validateInputField = (inputType:string, inputValue:string | undefined):string | null => {
  let errorMessage = null;

  if (!inputValue) {
    errorMessage = `${inputType} is required`;
    return errorMessage;
  }

  switch (inputType) {
    case constants.validateInputField.email:
      if (inputValue === '') {
        errorMessage = 'Email is required';
      } else if (!constants.regex.isEmail.test(inputValue)) {
        errorMessage = 'Invalid email format';
      }
      break;
    case constants.validateInputField.password:
      if (inputValue.length < 8) {
        errorMessage = 'Password must be at least 8 characters long';
      } else if (!constants.regex.hasLowerCaseAlpha.test(inputValue)) {
        errorMessage = 'Password must contain at least one lowercase letter';
      } else if (!constants.regex.hasUpperCaseAlpha.test(inputValue)) {
        errorMessage = 'Password must contain at least one uppercase letter';
      } else if (!constants.regex.hasNum.test(inputValue)) {
        errorMessage = 'Password must contain at least one digit';
      } else if (!constants.regex.hasSpecialChar.test(inputValue)) {
        errorMessage = 'Password must contain at least one special char (!@#$%^&*)';
      }
      break;
    default:
      break;
  }

  return errorMessage;
};

export { validateInputField };
