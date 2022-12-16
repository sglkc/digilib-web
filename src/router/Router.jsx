import {
  createBrowserRouter,
  Navigate,
  RouterProvider as Provider
} from 'react-router-dom';
import DefaultLayout from '@/layouts/Default';
import LoginView from '@/views/Auth/Login';
import RegisterView from '@/views/Auth/Register';
import EtalaseView from '@/views/Etalase';
import ErrorView from '@/views/Error';
import InformasiAkunView from '@/views/InformasiAkun';
import ItemView from '@/views/Item/Item';
import JelajahiView from '@/views/Jelajahi/Jelajahi';
import NotifikasiView from '@/views/Notifikasi';
import RiwayatView from '@/views/Riwayat';
import TandaiView from '@/views/Tandai';
import TentangView from '@/views/Tentang';
import UmpanBalikView from '@/views/UmpanBalik';
import { getItem } from './Loader';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginView />,
    loader: () => ({ title: 'Login' })
  },
  {
    path: '/register',
    element: <RegisterView />,
    loader: () => ({ title: 'Daftar' })
  },
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        path: '/',
        element: <EtalaseView />,
        loader: () => ({ title: 'Etalase' }),
      },
      {
        path: '/item',
        children: [
          {
            path: '/item/',
            element: <Navigate to="/" replace />,
          },
          {
            path: '/item/:item_id',
            element: <ItemView />,
            loader: getItem,
          }
        ]
      },
      {
        path: '/explore',
        element: <JelajahiView />,
        loader: () => ({ title: 'Etalase' }),
      },
      {
        path: '/bookmark',
        element: <TandaiView />,
        loader: () => ({ title: 'Tandai' }),
      },
      {
        path: '/account',
        element: <InformasiAkunView />,
        loader: () => ({ title: 'Informasi Akun' }),
      },
      {
        path: '/notification',
        element: <NotifikasiView />,
        loader: () => ({ title: 'Notifikasi' })
      },
      {
        path: '/history',
        element: <RiwayatView />,
        loader: () => ({ title: 'Riwayat' })
      },
      {
        path: '/feedback',
        element: <UmpanBalikView />,
        loader: () => ({ title: 'Umpan Balik' })
      },
      {
        path: '/about',
        element: <TentangView />,
        loader: () => ({ title: 'Tentang' })
      },
      {
        path: '/*',
        element: <Navigate to="/" replace />
      }
    ]
  },
]);

export default function RouterProvider() {
  return <Provider router={router} />;
};
