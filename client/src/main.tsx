import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { Provider } from 'react-redux';

import { Login } from './pages/login/index.tsx';
import { Register } from './pages/register/index.tsx';

import { Paths } from './paths.ts';
import { store } from './app/store.ts';
import { Auth } from './features/auth/auth.tsx';

import { Employees } from './pages/employees/index.tsx';
import { AddEmployee } from './pages/add-employee/index.tsx';
import { Status } from './pages/status/index.tsx';
import { Employee } from './pages/employee/index.tsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.employeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
