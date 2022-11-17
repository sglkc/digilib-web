import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '@/views/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
]);

export default function Provider() {
  return <RouterProvider router={router} />;
};
