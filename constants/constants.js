module.exports = {
  startServer: {
    success: 'App is successfully running on',
    failure: 'Error occurred! Server cannot start',
  },
  responseMessages: {
    logInUser: {
      success: 'You are logged in successfully.',
      failure: 'Login failed. Please try again!',
      wrongCredentails: 'Wrong Crendentials. Please try again!',
      socialLogin: {
        success: `<h1>You are logged in successfully.</h1><a href=${process.env.CLIENT_URL}>Go to App</a>`,
        networkError: 'Network error. Please try again',
      },
    },
    signUpUser: {
      success: 'You account is created successfully.',
      failure: 'Signup failed. Please try again!',
      userAlreadyExisted: 'User is already existed. Please sign in!',
      socialSignup: {
        success: `<h1>You are signed up successfully.</h1><a href=${process.env.CLIENT_URL}>Go to App</a>`,
      },
    },
    loggedInUser: {
      failure: 'There is some issue. Please login again!',
    },
  },
  labels: {
    signUp: 'Signup Catch error',
    logIn: 'Login Catch error',
    githubLogIn: 'Github signin catch problem: ',
    googleLogIn: 'Google signin problem: ',
  },
};
