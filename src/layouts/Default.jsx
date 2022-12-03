import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import { toggleNavbar } from '@/store/NavbarReducer';
import Navbar from '@/components/Navbar';
import styles from './Default.module.css';

export default function DefaultLayout({ children }) {
  const overlay = useSelector(state => state.navbar.open);
  const dispatch = useDispatch();
  const setNavbar = (bool) => dispatch(toggleNavbar({ open: bool }));
  const title = document.title.replace(' | Jalan Rahmat', '');

  return (
    <>
      <Navbar />
      { overlay &&
      <div
        onClick={() => setNavbar(false)}
        className={styles.overlay}
      ></div>
      }
      <div className={styles['layout-container']}>
        <div className={styles.titlebar}>
          <button onClick={() => setNavbar(true)}>
            <Icon path={mdiMenu} title="kembali" size={1.5} color="white" />
          </button>
          <h1>{ title }</h1>
        </div>
        <div className={styles['content-container']}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
