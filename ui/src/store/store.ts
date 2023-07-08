// Package import
import { configureStore } from '@reduxjs/toolkit';

// rtk queries import
import { api } from './api';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
