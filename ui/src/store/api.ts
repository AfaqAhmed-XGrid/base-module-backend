// Package import
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Constant import
import constants from '../app.constants';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: constants.apiUrl }),
  endpoints: (builder) => ({
    signInUser: builder.mutation({
      query: (formData) => ({
        url: constants.auth + '/login',
        method: 'POST',
        body: formData,
        credentials: 'include',
      }),
    }),
    signUpUser: builder.mutation({
      query: (formData) => ({
        url: constants.auth + '/signup',
        method: 'POST',
        body: formData,
        credentials: 'include',
      }),
    }),
    forgotPassword: builder.mutation({
      query: (formData) => ({
        url: constants.auth + '/forgot-password',
        method: 'POST',
        body: formData,
        credentials: 'include',
      }),
    }),
    updateUserData: builder.mutation({
      query: (userFormData) => ({
        url: constants.auth + '/update-profile',
        method: 'PUT',
        body: userFormData,
        credentials: 'include',
      }),
    }),
    changePassword: builder.mutation({
      query: (passwordFormData) => ({
        url: constants.auth + '/change-password',
        method: 'PUT',
        body: passwordFormData,
        credentials: 'include',
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: constants.auth + '/logout',
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});
export { api };

export const {
  useSignInUserMutation,
  useSignUpUserMutation,
  useForgotPasswordMutation,
  useUpdateUserDataMutation,
  useChangePasswordMutation,
  useLogoutUserMutation,
} = api;
