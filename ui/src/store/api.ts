// Package import
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Import buildqueryparam function
import buildQueryParams from '../services/buildQueryParams';

// Constant import
import constants from '../app.constants';

// Creating endpoints for rtk query to make http requests
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
        method: constants.httpMethods.post,
        body: formData,
        credentials: 'include',
      }),
    }),
    forgotPassword: builder.mutation({
      query: (formData) => ({
        url: constants.auth + '/forgot-password',
        method: constants.httpMethods.post,
        body: formData,
        credentials: 'include',
      }),
    }),
    updateUserData: builder.mutation({
      query: (userFormData) => ({
        url: constants.auth + '/update-profile',
        method: constants.httpMethods.put,
        body: userFormData,
        credentials: 'include',
      }),
    }),
    changePassword: builder.mutation({
      query: (passwordFormData) => ({
        url: constants.auth + '/change-password',
        method: constants.httpMethods.put,
        body: passwordFormData,
        credentials: 'include',
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: constants.auth + '/logout',
        method: constants.httpMethods.get,
        credentials: 'include',
      }),
    }),
    checkAuthStatus: builder.mutation({
      query: () => ({
        url: constants.auth + '/user',
        method: constants.httpMethods.get,
        credentials: 'include',
      }),
    }),
    getMovies: builder.mutation({
      query: (params) => ({
        url: constants.movie + '/get-all-movies' + buildQueryParams(params),
        method: constants.httpMethods.get,
        credentials: 'include',
      }),
    }),
    getGraphData: builder.mutation({
      query: () => ({
        url: constants.movie + '/get-graph-data',
        method: constants.httpMethods.get,
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
  useCheckAuthStatusMutation,
  useGetMoviesMutation,
  useGetGraphDataMutation,
} = api;
