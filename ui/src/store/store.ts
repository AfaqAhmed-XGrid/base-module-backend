import { configureStore } from '@reduxjs/toolkit';
import {api} from './api'

const store: any = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
