// Package imports
const env = require( 'dotenv' ).config();

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
      conflict: 'Cannot change password because you are signed in through google/github.',
      success: 'Your password is changed successfully',
      failure: 'Failed to change password. Please try again!',
    },
    generalErrorMessage: 'Something went wrong! Try again!',
    forgotPassword: {
      wrongCredentails: 'Wrong Crendentials. Please try again!',
      resetPasswordEmail: {
        success: 'Password reset mail is sent to your account',
        failure: 'Password reset mail could not be sent! Try again later!',
      },
    },
    resetPassword: {
      success: 'Your password has been reset successfully',
      failure: 'Failed to reset password. Please try again!',
      tokenExpiredMessage: 'The link is expired. Send request again!',
    },
    userProfileData: {
      success: 'Your profile is here',
      failure: 'Something went wrong. Please try again!',
    },
    updateUserProfile: {
      success: 'Your profile is updated successfully',
      failure: 'Failed to update your profile. Please try again!',
    },
  },
};
