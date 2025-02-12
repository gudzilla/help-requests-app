import { createBrowserRouter } from 'react-router-dom';
import { HelpRequestPage, LoginPage, NotFound, ProfilePage } from '@/pages';
import { Layout } from '@/pages';
import { ProtectedRoute } from './ProtectedRoute';
import { HelpCatalogPage } from '../pages/helpCatalog/HelpCatalogPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute element={<LoginPage />} when={'login'} /> },
      {
        path: '/help-catalog',
        children: [
          {
            index: true,
            element: <ProtectedRoute element={<HelpCatalogPage />} />,
          },
          {
            path: ':requestId',
            element: <ProtectedRoute element={<HelpRequestPage />} />,
          },
        ],
      },
      {
        path: '/help-request',
        element: <ProtectedRoute element={<HelpRequestPage />} />,
      },
      {
        path: '/login',
        element: <ProtectedRoute element={<LoginPage />} when={'login'} />,
      },
      {
        path: '/profile',
        element: <ProtectedRoute element={<ProfilePage />} />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
