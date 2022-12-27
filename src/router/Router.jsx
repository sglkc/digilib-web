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
import ItemNotFound from '@/views/Item/NotFound';
import JelajahiView from '@/views/Jelajahi/Jelajahi';
import NotifikasiView from '@/views/Notifikasi';
import RiwayatView from '@/views/Riwayat';
import TandaiView from '@/views/Tandai';
import TentangView from '@/views/Tentang';
import UmpanBalikView from '@/views/UmpanBalik';
import PencarianView from '@/views/Pencarian';
import AdminView from '@/views/Admin/Admin';
import AdminEditorView from '@/views/Admin/Editor';
import AdminItemFormView from '@/views/Admin/ItemForm';
import AdminItemListView from '@/views/Admin/ItemList';
import AdminQuotesView from '@/views/Admin/Quotes';
import { editItem, getItem } from './Loader';

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
        loader: () => ({ title: 'Etalase', search: true }),
      },
      {
        path: '/search',
        element: <PencarianView />,
        loader: () => ({ title: 'Pencarian' }),
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
            errorElement: <ItemNotFound />,
            loader: getItem,
          }
        ]
      },
      {
        path: '/explore',
        element: <JelajahiView />,
        loader: () => ({ title: 'Jelajahi', search: true }),
      },
      {
        path: '/bookmark',
        element: <TandaiView />,
        loader: () => ({ title: 'Tandai', search: true }),
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
        loader: () => ({ title: 'Riwayat', search: true })
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
  {
    path: '/admin',
    element: <DefaultLayout isAdmin />,
    errorElement: <ErrorView />,
    children: [
      {
        path: '/admin',
        element: <AdminView />,
        loader: () => ({ title: 'Admin' }),
      },
      {
        path: '/admin/editor',
        element: <AdminEditorView />,
        loader: () => ({ title: 'Editor Teks' }),
      },
      {
        path: '/admin/items',
        element: <AdminItemListView />,
        loader: () => ({ title: 'Edit Item' }),
      },
      {
        path: '/admin/item',
        children: [
          {
            path: '/admin/item',
            element: <Navigate to="/admin" replace />,
          },
          {
            path: '/admin/item/new',
            element: <AdminItemFormView />,
            loader: () => ({ title: 'Tambah Item' })
          },
          {
            path: '/admin/item/:item_id',
            element: <AdminItemFormView />,
            errorElement: <ItemNotFound />,
            loader: editItem,
          }
        ]
      },
      {
        path: '/admin/quotes',
        element: <AdminQuotesView />,
        loader: () => ({ title: 'Quotes' }),
      },
      {
        path: '*',
        element: <Navigate to="/admin" replace />
      }
    ]
  }
]);

export default function RouterProvider() {
  return <Provider router={router} />;
};
