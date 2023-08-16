/*
Copyright (c) 2023, Xgrid Inc, http://xgrid.co

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const constants = {
  httpRequests: {
    apiUrl: 'http://localhost:4000/api/',
    httpEndPoints: {
      auth: {
        signIn: 'auth/login',
        signUp: 'auth/signup',
        forgotPassword: 'auth/forgot-password',
        getUser: 'auth/user',
      },
      movie: {
        graphData: 'movie/graph-data',
        getMovieData: 'movie/all-movies',
        saveMovie: 'movie/movie-data'
      },
      users: {
        getAllUsers: 'users/all-users',
        deleteUser: 'users/user',
      }
    },
    codeQuery: '?code=',
    generalErrorMessage: 'Unkown error occured. Please try later!'
  },
  paths: {
    logo: '/assets/logo.png',
  },
  validation: {
    regex: {
      isEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      hasLowerCaseAlpha: /[a-z]/,
      hasUpperCaseAlpha: /[A-Z]/,
      hasNum: /\d/,
      hasSpecialChar: /[!@#$%^&*]/,
    },
    messages: {
      short: 'Password must be at least 8 characters long',
      noLowerAlpha: 'Password must contain at least one lowercase letter',
      noUpperAlpha: 'Password must contain at least one uppercase letter',
      noNum: 'Password must contain at least one digit',
      noSpecialChar: 'Password must contain at least one special char (!@#$%^&*)',
      notEmail: 'Please enter a valid email address',
      required: 'This field is required',
    },
  },
  pages: {
    signIn: {
      link: '/sign-in',
      name: 'sign-in',
    },
    signUp: {
      link: '/sign-up',
      name: 'sign-up',
    },
    dashboard: {
      link: '/dashboard',
      name: 'TheDashboard',
    },
    callBack: {
      link: '/callback/:app',
      name: 'CallBack',
    },
    movies: {
      link: '/movies-data',
      name: 'TheMoviesData',
    },
  },
  socialAuthorization: {
    google: 'auth/google',
    github: 'auth/github',
    googleCallBack: 'auth/google/callback',
    githubCallBack: 'auth/github/callback',
    appNames: {
      google: 'google',
      github: 'github',
    }
  },
  localStorage: {
    userToken: 'token',
  },
  toast: {
    types: {
      positive: 'positive',
      negative: 'negative',
    }
  },
  navbarDrawerItems: [
    { link: '/dashboard', icon: 'dashboard', name: 'Dashboard' },
    { link: '/movies-data', icon: 'table', name: 'Tabular Analysis' },
    { link: '/releases-per-year', icon: 'insights', name: 'Release Analysis' },
    { link: '/budget-per-year', icon: 'equalizer', name: 'Budget Analysis' },
  ],
  userTable: {
    headings: ['#', 'Avatar', 'email', 'user name', 'method', 'actions' ]
  },
  movieTable: {
    shorterTableheadings: ['Title', 'Release Data', 'Production Budget', 'World Wide Gross'],
    completeTableheadings: ['Title', 'Release Data', 'Production Budget', 'Domestic Gross', 'World Wide Gross'],
    features: {
      sort: [ '-releaseDate', '+releaseDate', '-productionBudget', '+productionBudget', '-domesticGross', '+domesticGross', '-worldWideGross', '+worldWideGross', ],
      limit: [10, 15, 20, 25, 30 ],
      filter: [
        { title: 'Production Budget (Upper Range)', vModel: 'productionBudget[$lte]' },
        { title: 'Production Budget (Lower Range)', vModel: 'productionBudget[$gte]' },
        { title: 'Domestic Gross (Upper Range)', vModel: 'domesticGross[$lte]' },
        { title: 'Domestic Gross (Lower Range)', vModel: 'domesticGross[$gte]' },
        { title: 'Worldwide Gross (Upper Range)', vModel: 'worldWideGross[$lte]' },
        { title: 'Worldwide Gross (Lower Range)', vModel: 'worldWideGross[$gte]' },
      ]
    },
    newMovieInputs: [
      { title: 'Title', cypress: 'title', icon: 'movie', vModel: 'title', type: 'text' },
      { title: 'Release Date', cypress: 'releaseDate', icon: 'today', vModel: 'releaseDate', type: 'date' },
      { title: 'Production Budget (USD)', cypress: 'productionBudget', icon: 'attach_money', vModel: 'productionBudget', type: 'number' },
      { title: 'Domestic Gross (USD)', cypress: 'domesticGross', icon: 'attach_money', vModel: 'domesticGross', type: 'number' },
      { title: 'World Wide Gross (USD)', cypress: 'worldWideGross', icon: 'attach_money', vModel: 'worldWideGross', type: 'number' },
    ] as const,
  },
};
    
export default constants;
