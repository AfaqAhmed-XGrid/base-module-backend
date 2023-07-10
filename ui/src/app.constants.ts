const constants = {
  apiUrl: 'http://localhost:4000/api/',
  user: 'user',
  movie: 'movie',
  auth: 'auth',
  regex: {
    isEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    hasLowerCaseAlpha: /[a-z]/,
    hasUpperCaseAlpha: /[A-Z]/,
    hasNum: /\d/,
    hasSpecialChar: /[!@#$%^&*]/,
  },
  validateInputField: {
    email: 'email',
    password: 'password',
  },
  httpMethods: {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
  },
  breakpoints: {
    xl: '1640px',
    lg: '1250px',
    md: '876px',
    sm: '676px',
    xs: '450px',
  },
  pagelinks: {
    signin: '/signin',
    signup: '/signup',
    editProfile: '/edit-profile',
    changePassword: '/change-password',
    dashbaord: '/dashboard',
    home: '/',
  },
  socialAuthorization: {
    google: 'http://localhost:4000/api/auth/google',
    github: 'http://localhost:4000/api/auth/github',
  },
};

export default constants;
