// Package imports
const env = require('dotenv').config();

module.exports = {
  responseMessages: {
    authorizedUser: {
      failure: 'You are not authorized. Please login first',
    },
    logOutUser: {
      success: 'You are logged out successfully.',
      failure: 'Failed logging out. Please try again!',
    },
    changePassword: {
      wrongCredentails: 'Wrong Crendentials. Please try again!',
      success: 'Your password is changed successfully',
      failure: 'Failed to change password. Please login again and then try!',
    },
    generalErrorMessage: 'Something went wrong! Try again!',
    forgotPassword: {
      resetPassword: {
        success: 'Your password has been reset successfully',
        failure: 'Failed to reset password. Please try again!',
        tokenExpiredMessage: 'Your token has expired. Please try again',
        wrongCredentails: 'Wrong Crendentials. Please try again!',
      },
      resetPasswordEmail: {
        success: 'Password reset mail is sent to your account',
        failure: 'Password reset mail could not be sent! Check your network connectivity!',
        emailText: `Please click on the link to reset your password. The link is active for 5 minuts only!`,
        emailSubject: 'Reset you password!',
      },
    },
    userProfileData: {
      success: 'Your data has been fetched successfully',
      failure: 'Failed to fetch data. Please try again!',
    },
    updateUserProfile: {
      success: 'Your data has been updated successfully',
      failure: 'Failed to update data. Please try again!',
    },
  },
  labels: {
    session: 'session: ',
    sessiodId: 'sessionId: ',
    user: 'user: ',
    error: 'error: ',
    info: 'info: ',
    middleware: 'middleware: ',
    loginCtrl: {
      noUserInReq: 'user is not found in request. login() problem. (loginCtrl)',
    },
    signupCtrl: {
      noUserInReq: 'user is not found in request. login() problem. (signupCtrl)',
    },
    logoutCtrl: {
      failure: 'Error while logging out the user (logoutCtrl)',
    },
    changePasswordCtrl: {
      noUserInReq: 'user is not found in request. login() problem. (changePasswrodCtrl)',
      findingUser: {
        failure: 'Error while finding user (changePasswordCtrl)',
      },
      savingNewPassword: {
        failure: 'Error while saving new password (changePasswordCtrl)',
      },
    },
    forgotPasswordCtrl: {
      findingUser: {
        failure: 'Error while finding user (forgotPasswordCtrl)',
      },
      token: {
        generatingError: 'Error in generating token through model defined method. (forgotPasswordCtrl)',
        savingError: 'Error in saving user after generating token. (forgotPasswordCtrl)',
      },
      emailSendingError: 'Error while sending email (forgotPasswordCtrl)',
      emailSendingUnkownError: 'Check info (forgotPasswordCtrl)',
    },
    resetPasswordCtrl: {
      findingUser: {
        failure: 'Error while finding user (resetPasswordCtrl)',
      },
      savingPassword: {
        failure: 'Something wrong while saving the reset password (resetPasswordCtrl)',
      },
    },
    getProfileDataCtrl: {
      noUserInReq: 'user is not found in request. login() problem. (changePasswrodCtrl)',
    },
    updateProfileDataCtrl: {
      noUserInReq: 'user is not found in request. login() problem. (changePasswrodCtrl)',
      updatingUser: {
        failure: 'error in saving user profile. login() problem. (updateProfileCtrl)',
      },
    },
    iaAuthenticatedMiddleware: {
      false: 'something wrong with re.login() or req.isAuthenticated() (isAuthenticatedMiddleware)',
    },
    loginMiddleware: {
      strategyError: 'error passed in middleware through login strategy (loginMiddleware)',
      noUserStrategyError: 'no user passed in middleware through login strategy (loginMiddleware)',
      loginError: 'error in logging in (loginMiddleware)',
    },
    signupMiddleware: {
      strategyError: 'error passed in middleware through signup strategy (signupMiddleware)',
      noUserStrategyError: 'no user passed in middleware through signup strategy (signupMiddleware)',
      loginError: 'error in logging in (signupMiddleware)',
    },
    googleMiddleware: {
      strategyError: 'error passed in middleware through google strategy (googleMiddleware)',
      noUserStrategyError: 'no user passed in middleware through google strategy (googleMiddleware)',
      loginError: 'error in logging in (googleMiddleware)',
    },
    githubMiddleware: {
      strategyError: 'error passed in middleware through github strategy (githubMiddleware)',
      noUserStrategyError: 'no user passed in middleware through github strategy (githubMiddleware)',
      loginError: 'error in logging in (githubMiddleware)',
    },
  },
};
