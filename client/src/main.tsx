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

import './index.css';

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <h1>Home</h1>,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
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
