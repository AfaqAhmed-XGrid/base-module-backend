const constants = {
  apiUrl: 'http://localhost:4000/api/',
  user: 'user',
  movie: 'movie',
  auth: 'auth',
  dummyUser: {
    email: 'afaq.ahmed@xgrid.com',
    displayName: 'Afaq Ahmed',
  },
  paths: {
    logo: '/assets/logo.png',
  },
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
    displayName: 'displayName',
  },
  httpMethods: {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
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
  recordsPerPage: [
    {
      key: '10',
      value: 10,
    },
    {
      key: '15',
      value: 15,
    },
    {
      key: '20',
      value: 20,
    },
    {
      key: '25',
      value: 25,
    },
  ],
  dataSortingCategories: [
    {
      value: '-productionBudget',
      name: 'Production Budget (Descending)',
    },
    {
      value: '+productionBudget',
      name: 'Production Budget (Ascending)',
    },
    {
      value: '-worldWideGross',
      name: 'World Wide Gross (Descending)',
    },
    {
      value: '+worldWideGross',
      name: 'World Wide Gross (Ascending)',
    },
    {
      value: '-domesticGross',
      name: 'Domestic Gross (Descending)',
    },
    {
      value: '+domesticGross',
      name: 'Domestic Gross (Ascending)',
    },
    {
      value: '-releaseDate',
      name: 'Release Date (Descending)',
    },
    {
      value: '+releaseDate',
      name: 'Release Date (Ascending)',
    },
  ],
  filteringCategories: [
    {
      title: 'Production Budget',
      value: 'productionBudget',
    },
    {
      title: 'Domestic Gross',
      value: 'domesticGross',
    },
    {
      title: 'World Wide Gross',
      value: 'worldWideGross',
    },
  ],
  tableHeadings: ['Title', 'Release Date', 'Production Budget', 'Domestic Gross', 'World Wide Gross'],
  dashboardCardsData: [
    {
      title: 'Users',
      number: 198,
      color: '#4099FF',
    },
    {
      title: 'Movies',
      number: 3988,
      color: '#2ED8B6',
    },
    {
      title: 'Clients',
      number: 87,
      color: '#FFB64D',
    },
  ],
};

export default constants;
