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

// Package imports
const env = require('dotenv').config();

module.exports = {
  responseMessages: {
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
