import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useMatches } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import Authenticate from '@/func/Authenticate';
import { toggleNavbar } from '@/store/NavbarReducer';
import Navbar from '@/components/Navbar';
import styles from './Default.module.css';

export default function DefaultLayout() {
  const { data } = useMatches().at(-1);
  const overlay = useSelector(state => state.navbar.open);
  const dispatch = useDispatch();
  const setNavbar = (bool) => dispatch(toggleNavbar({ open: bool }));

  useEffect(() => {
    if (data && data.title) document.title = `${data.title} | Jalan Rahmat`;
  }, [data]);

  return (
    <Authenticate auth={false}>
      <Navbar onClick={() => setNavbar(false)} />
      { overlay &&
      <div
        onClick={() => setNavbar(false)}
        className={styles.overlay}
      ></div>
      }
      <div className={styles['layout-container']}>
        <div className={styles.titlebar}>
          <button onClick={() => setNavbar(true)}>
            <Icon path={mdiMenu} title="Menu" size={1.5} color="white" />
          </button>
          <h1>{ data ? data.title : 'Digilib'}</h1>
        </div>
        <div className={styles['content-container']}>
          <Outlet />
        </div>
      </div>
    </Authenticate>
  );
}
