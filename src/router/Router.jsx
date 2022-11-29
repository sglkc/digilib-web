import {
  createBrowserRouter,
  RouterProvider as Provider
} from 'react-router-dom';
import EtalaseView from '@/views/Etalase';
import LoginView from '@/views/Login';
import RegisterView from '@/views/Register';
import TentangView from '@/views/Tentang';

const setTitle = (title) => (document.title = `${title} | Jalan Rahmat`);
const router = createBrowserRouter([
  {
    path: '/',
    element: <EtalaseView />,
    loader: () => setTitle('Etalase'),
  },
  {
    path: '/login',
    element: <LoginView />,
    loader: () => setTitle('Masuk')
  },
  {
    path: '/register',
    element: <RegisterView />,
    loader: () => setTitle('Daftar')
  },
  {
    path: '/tentang',
    element: <TentangView />,
    loader: () => setTitle('Tentang')
  },
]);

export default function RouterProvider() {
  return <Provider router={router} />;
};
