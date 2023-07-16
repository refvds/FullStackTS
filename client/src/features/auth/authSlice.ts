import { User } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';

import { authApi } from '../../app/services/auth';
import { RootState } from '../../app/store';

interface IInitialState {
  user: (User & { token: string }) | null;
  isAuthenticated: boolean;
}

const initialState: IInitialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth.isAuthenticated;
export const userSelector = (state: RootState) => state.auth.user;