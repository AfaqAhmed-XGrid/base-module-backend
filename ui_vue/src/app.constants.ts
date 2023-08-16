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
  ]
};
    
export default constants;
