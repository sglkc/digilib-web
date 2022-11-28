import {
  createBrowserRouter,
  RouterProvider as Provider
} from 'react-router-dom';
import Etalase from '@/views/Etalase';
import Login from '@/views/Login';
import Register from '@/views/Register';

const setTitle = (title) => (document.title = `${title} | Jalan Rahmat`);
const router = createBrowserRouter([
  {
    path: '/',
    element: <Etalase />,
    loader: () => setTitle('Digilib')
  },
  {
    path: '/login',
    element: <Login />,
    loader: () => setTitle('Masuk')
  },
  {
    path: '/register',
    element: <Register />,
    loader: () => setTitle('Daftar')
  },
]);

export default function RouterProvider() {
  return <Provider router={router} />;
};
