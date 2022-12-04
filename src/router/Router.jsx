import {
  createBrowserRouter,
  RouterProvider as Provider
} from 'react-router-dom';
import LoginView from '@/views/Auth/Login';
import RegisterView from '@/views/Auth/Register';
import EtalaseView from '@/views/Etalase';
import ErrorView from '@/views/Error';
import InformasiAkunView from '@/views/InformasiAkun';
import JelajahiView from '@/views/Jelajahi';
import NotifikasiView from '@/views/Notifikasi';
import RiwayatView from '@/views/Riwayat';
import TandaiView from '@/views/Tandai';
import TentangView from '@/views/Tentang';
import UmpanBalikView from '@/views/UmpanBalik';
import DefaultLayout from '@/layouts/Default';

const setTitle = (title) => {
  setTimeout(() => {
    const topbar = document.getElementById('title');
    if (topbar) topbar.innerText = title;
  }, 100);

  document.title = `${title} | Jalan Rahmat`;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        path: '/',
        element: <EtalaseView />,
        loader: () => setTitle('Etalase'),
      },
      {
        path: '/explore',
        element: <JelajahiView />,
        loader: () => setTitle('Jelajahi'),
      },
      {
        path: '/bookmark',
        element: <TandaiView />,
        loader: () => setTitle('Tandai'),
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
