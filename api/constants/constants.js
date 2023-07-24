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

module.exports = {
  responseMessages: {
    logInUser: {
      success: 'You are logged in successfully.',
      failure: 'Login failed. Please try again!',
      wrongCredentails: 'Wrong Crendentials. Please try again!',
      socialLogin: {
        failure: 'An error occured! Please try again',
        success: 'You are logged in successfully.',
      },
    },
    signUpUser: {
      success: 'You account is created successfully.',
      failure: 'Signup failed. Please try again!',
      userAlreadyExisted: 'An account is already created with this email.',
    },
  },
};
