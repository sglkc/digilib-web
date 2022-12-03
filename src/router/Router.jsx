import {
  createBrowserRouter,
  RouterProvider as Provider
} from 'react-router-dom';
import LoginView from '@/views/Auth/Login';
import RegisterView from '@/views/Auth/Register';
import EtalaseView from '@/views/Etalase';
import InformasiAkunView from '@/views/InformasiAkun';
import NotifikasiView from '@/views/Notifikasi';
import TentangView from '@/views/Tentang';
import UmpanBalikView from '@/views/UmpanBalik';
import RiwayatView from '@/views/Riwayat';
import DefaultLayout from '@/layouts/Default';

const setTitle = (title) => (document.title = `${title} | Jalan Rahmat`);
const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <EtalaseView />,
        loader: () => setTitle('Etalase'),
      },
      {
        path: '/account',
        element: <InformasiAkunView />,
        loader: () => setTitle('Informasi Akun'),
      },
      {
        path: '/notification',
        element: <NotifikasiView />,
        loader: () => setTitle('Notifikasi')
      },
      {
        path: '/history',
        element: <RiwayatView />,
        loader: () => setTitle('Riwayat')
      },
      {
        path: '/feedback',
        element: <UmpanBalikView />,
        loader: () => setTitle('Umpan Balik')
      },
      {
        path: '/about',
        element: <TentangView />,
        loader: () => setTitle('Tentang')
      },
    ]
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
]);

export default function RouterProvider() {
  return <Provider router={router} />;
};
