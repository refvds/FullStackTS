import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { Paths } from './paths.ts';

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <h1>Home</h1>,
  },
  {
    path: Paths.login,
    element: <h1>Login</h1>,
  },
  {
    path: Paths.register,
    element: <h1>register</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
