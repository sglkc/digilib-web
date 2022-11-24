import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '@/views/Login';
import Register from '@/views/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
]);

export default function Provider() {
  return <RouterProvider router={router} />;
};
