const validateInputField = (inputType:string, inputValue:string | undefined):string | null => {
  let errorMessage = null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!inputValue) {
    errorMessage = `${inputType} is required`;
    return errorMessage;
  }

  switch (inputType) {
    case 'email':
      switch (true) {
        case inputValue === '':
          errorMessage = 'Email is required';
          break;
        case !emailRegex.test(inputValue):
          errorMessage = 'Invalid email format';
          break;
        default:
          break;
      }
      break;
    case 'password':
      switch (true) {
        case inputValue.length < 8:
          errorMessage = 'password must be at least 8 characters long';
          break;
        case !/[a-z]/.test(inputValue):
          errorMessage = 'password must contain at least one lowercase letter';
          break;
        case !/[A-Z]/.test(inputValue):
          errorMessage = 'password must contain at least one uppercase letter';
          break;
        case !/\d/.test(inputValue):
          errorMessage = 'password must contain at least one digit';
          break;
        case !/[!@#$%^&*]/.test(inputValue):
          errorMessage = 'password must contain at least one special char (!@#$%^&*)';
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }

  return errorMessage;
};

export { validateInputField };
