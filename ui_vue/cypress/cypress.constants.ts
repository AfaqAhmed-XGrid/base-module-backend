const constants = {
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
  localStorage: {
    userDataToken: 'token',
  },
  authApis : {
    google: {
      token: 'https://www.googleapis.com/oauth2/v4/token',
      user: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    github: {
      token: 'https://github.com/login/oauth/access_token',
      user: 'https://api.github.com/user',
    },
    methods: {
      get: 'GET',
      post: 'POST',
    },
    grantType: {
      refreshToken: 'refresh_token',
    }
  }
};

export default constants;
