import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: any;
}

const initialState: AuthState = {
  isAuthenticated: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state: any) => {
      state.isAuthenticated = state;
    },
    setUnauthenticated: (state) => {
      state.isAuthenticated = undefined;
    },
  },
});

export const { setAuthenticated, setUnauthenticated } = authSlice.actions;

export default authSlice.reducer;
