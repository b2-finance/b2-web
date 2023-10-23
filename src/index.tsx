import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { ROUTES } from './common/routes.ts';
import { App } from './app/app.tsx';
import { ErrorPage } from './error-page/error-page.tsx';
import { AuthProvider } from './auth/use-auth/auth-provider.tsx';
import { ProtectedRoute } from './auth/protected-route/protected-route.tsx';
import { LoginPage } from './auth/login-page/login-page.tsx';

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.login,
        element: <LoginPage />,
      },
      {
        path: ROUTES.dashboard,
        element: (
          <ProtectedRoute>
            <h1>Dashboard</h1>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.budget,
        element: (
          <ProtectedRoute>
            <h1>Budget</h1>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
