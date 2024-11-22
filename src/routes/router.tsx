import { createBrowserRouter } from 'react-router-dom';
import { HelpCatalog, HelpRequest, Login, NotFound, Profile } from '@/pages';
import { Layout } from '@/pages';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      {
        path: '/help-catalog',
        element: <ProtectedRoute element={<HelpCatalog />} />,
      },
      {
        path: '/help-request',
        element: <ProtectedRoute element={<HelpRequest />} />,
      },
      {
        path: '/login',
        element: <ProtectedRoute element={<Login />} />,
      },
      {
        path: '/profile',
        element: <ProtectedRoute element={<Profile />} />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
