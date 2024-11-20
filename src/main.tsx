import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/pages/layout/Layout';
import { NotFound } from '@/pages/errorPage/NotFound';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <h2>Login Form</h2> },
      {
        path: '/catalog',
        element: <h2>Каталог Запросов о Помощи</h2>,
      },
      {
        path: '/login',
        element: <h2>Страница Входа</h2>,
      },
      {
        path: '/profile',
        element: <h2>Личный Профиль</h2>,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
