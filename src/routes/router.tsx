import { createBrowserRouter } from 'react-router-dom';
import { HelpCatalog, HelpRequest, Login, NotFound, Profile } from '@/pages';
import { Layout } from '@/pages';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute element={<Login />} isLoginPage={true} /> },
      {
        path: '/help-catalog',
        children: [
          {
            index: true,
            element: <ProtectedRoute element={<HelpCatalog />} />,
          },
          {
            path: ':requestId',
            element: <ProtectedRoute element={<HelpRequest />} />,
          },
        ],
      },
      {
        path: '/help-request',
        element: <ProtectedRoute element={<HelpRequest />} />,
      },
      {
        path: '/login',
        element: <ProtectedRoute element={<Login />} isLoginPage={true} />,
      },
      {
        path: '/profile',
        element: <ProtectedRoute element={<Profile />} />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
