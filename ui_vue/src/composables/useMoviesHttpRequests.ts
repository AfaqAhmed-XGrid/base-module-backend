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

// Import constants
import constants from '../app.constants';

// Import composables
import useNotify from './useNotify';

// Import helper functions
import buildQueryParams from '@/helpers/buildQueryParams';

// Import types
import type { GraphDataQuery, MovieQueryParams, MovieData } from '@/app.model';

/**
 * Function to make all movie data related http requests
 * @return {Object} return object of functions
 */
export const useMoviesHttpRequests = () => {
  const baseURL = constants.httpRequests.apiUrl;
  const movieEndPoint = constants.httpRequests.httpEndPoints.movie;

  // Initializing hooks
  const notify = useNotify();

  /**
   * Function to make http request for graph data
   * @param {Object} queries param
   * @return {Promose<Object>} returns db data 
   */
  const getGraphData = async (queries: (GraphDataQuery & Record<string, string | number>)) => {
    try {
      const queryParams = buildQueryParams(queries ? queries : {});
      const response = await axios.get(baseURL + movieEndPoint.graphData + queryParams);
      return response.data;
    } catch (error) {
      if( error instanceof AxiosError && error?.response?.data) {
        notify.error(error?.response?.data.message);
      } else {
        notify.error(constants.httpRequests.generalErrorMessage);
      }
    }
  };

  /**
   * Function get movies data from db
   * @param {Object} queries object
   * @return {Object} returns object
   */
  const getMoviesData = async (queries: (MovieQueryParams & Record<string, string | number>)) => {
    try {
      const queryParams = buildQueryParams(queries ? queries : {});
      const response = await axios.get(baseURL + movieEndPoint.getMovieData + queryParams);
      return response.data;
    } catch (error) {
      if( error instanceof AxiosError && error?.response?.data) {
        notify.error(error?.response?.data.message);
      } else {
        notify.error(constants.httpRequests.generalErrorMessage);
      }
    }
  };

  /**
   * Function to save movie data in db
   * @param {Object} formData body
   * @return {void}
   */
  const saveMovieData = async (formData: MovieData | { [key: string]: number | string }) => {
    try {
      const response = await axios.post(baseURL + movieEndPoint.saveMovie, { ...formData });
      notify.success(response.data.message);
    } catch (error) {
      if( error instanceof AxiosError && error?.response?.data) {
        notify.error(error?.response?.data.message);
      } else {
        notify.error(constants.httpRequests.generalErrorMessage);
      }
    }
  };

  return { getGraphData, getMoviesData, saveMovieData };
};
