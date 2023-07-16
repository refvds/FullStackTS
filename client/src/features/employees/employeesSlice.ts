import { Employee } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { employeesApi } from '../../app/services/employees';
import { RootState } from '../../app/store';

interface IInitialState {
  employees: Employee[] | null;
}

const initialState: IInitialState = {
  employees: null,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(employeesApi.endpoints.getAllEmployees.matchFulfilled, (state, action) => {
      state.employees = action.payload;
    });
  },
});

export const employeesReducer = employeesSlice.reducer;
export const { logout } = employeesSlice.actions;

export const employeesSelector = (state: RootState) => state.employees;
