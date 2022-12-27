import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiLoading } from '@mdi/js';
import DefaultLayout from './Default';

export default function AdminLayout() {
  return (
    <DefaultLayout isAdmin={true}>
      <Suspense
        fallback={
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem' }}>Memuat...</h2>
            <Icon path={mdiLoading} size={2} spin={true} color="orange" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </DefaultLayout>
  );
}
