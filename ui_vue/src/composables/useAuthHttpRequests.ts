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

// Import Packages
import axios, { AxiosError } from 'axios';
import { useRouter, useRoute } from 'vue-router';

// Import constants
import constants from '../app.constants';

// Import types
import type { signInFormData } from '@/app.model';

// Import composables
import useNotify from './useNotify';

/**
 * Function to make all auth related http requests
 * @return {Object} return object of functions
 */
export const useAuthHttpRequest = () => {
  const baseURL = constants.httpRequests.apiUrl;
  const authEndPoint = constants.httpRequests.httpEndPoints.auth;

  // Initializing hooks
  const notify = useNotify();
  const router = useRouter();
  const route = useRoute();

  /**
   * Function to make http request to sign in the user with credentials
   * @param {signInFormData} data user provided credentials
   * @return {Promise<void>} returns a promise
   */
  const signInUser = async (data: signInFormData): Promise<void> => {
    try {
      const response = await axios.post(baseURL + authEndPoint.signIn, data);

      notify.success(response.data.message);
      localStorage.setItem(constants.localStorage.userToken, response.data.token);
      router.push(constants.pages.dashboard.link);
    } catch (error) {

      if( error instanceof AxiosError && error?.response?.data) {
        notify.error(error?.response?.data.message);
      } else {
        notify.error(constants.httpRequests.generalErrorMessage);
      }

    }
  };

  /**
   * Function to make http request to sign up the user with profile data and credentials
   * @param {string} email user provided profile data for sign up
   * @return {Promise<void>} returns a promise
   */
  const resetUserPassword = async(email: string): Promise<void> => {
    try {
      const response = await axios.post(baseURL + authEndPoint.forgotPassword, { email });

      notify.success(response.data.message);
    } catch (error) {

      if( error instanceof AxiosError && error?.response?.data) {
        notify.error(error?.response?.data.message);
      } else {
        notify.error(constants.httpRequests.generalErrorMessage);
      }

    }
  };

  /**
   * Function to make http request for third party authentication
   * @param {string} url this param is api url for third party authentication
   * @return {Promise<void>} returns a promise
   */
  const authCallBack = async (url: string): Promise<void> => {
    try {
      const code = route.query.code;
      const error = route.query.error;

      if (error) {
        throw new Error(error.toString());
      }

      const response = await axios.get(url + constants.httpRequests.codeQuery + code);

      notify.success(response.data.message);
      localStorage.setItem(constants.localStorage.userToken, response.data.token);
      router.push(constants.pages.dashboard.link);
    } catch (error) {

      if( error instanceof AxiosError && error?.response?.data) {
        notify.error(error.response?.data ? error.response.data.message : constants.httpRequests.generalErrorMessage);
      } else {
        notify.error(constants.httpRequests.generalErrorMessage);
      }
      
      router.push(constants.pages.signIn.link);
    }
  };

  return { signInUser, authCallBack, resetUserPassword };
};
