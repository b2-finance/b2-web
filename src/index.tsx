import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes.ts';
import { AuthProvider } from './auth/use-auth/auth-provider.tsx';
import { ErrorPage } from './error/error-page/error-page.tsx';
import { LoginPage } from './auth/login-page/login-page.tsx';
import { SignupPage } from './auth/signup-page/signup-page.tsx';
import { ProtectedRoute } from './auth/protected-route/protected-route.tsx';
import { App } from './app/app.tsx';

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.login,
        element: <LoginPage />,
      },
      {
        path: ROUTES.signup,
        element: <SignupPage />,
      },
      {
        element: (
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        ),
        children: [
          {
            path: ROUTES.dashboard,
            element: <h1>Dashboard</h1>,
          },
          {
            path: ROUTES.journal,
            element: <h1>Journal</h1>,
          },
          {
            path: ROUTES.reports,
            element: <h1>Reports</h1>,
          },
          {
            path: ROUTES.planning,
            element: <h1>Planning</h1>,
          },
          {
            path: ROUTES.setup,
            element: <h1>Setup</h1>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
