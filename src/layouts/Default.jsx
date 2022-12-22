import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useMatches, useNavigate } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiMagnify, mdiMenu } from '@mdi/js';
import Authenticate from '@/func/Authenticate';
import { toggleNavbar } from '@/store/NavbarReducer';
import Navbar from '@/components/Navbar';
import styles from './Default.module.css';

export default function DefaultLayout({ isAdmin }) {
  const navigate = useNavigate();
  const { data } = useMatches().at(-1);
  const overlay = useSelector(state => state.navbar.open);
  const dispatch = useDispatch();
  const setNavbar = (bool) => dispatch(toggleNavbar({ open: bool }));

  useEffect(() => {
    if (data && data.title) document.title = `${data.title} | Jalan Rahmat`;
  }, [data]);

  return (
    <Authenticate loggedIn={true} isAdmin={isAdmin}>
      <Navbar isAdmin={isAdmin} onClick={() => setNavbar(false)} />
      { overlay &&
      <div
        onClick={() => setNavbar(false)}
        className={styles.overlay}
      ></div>
      }
      <div className={styles['layout-container']}>
        <div className={styles.titlebar}>
          <button onClick={() => setNavbar(true)} data-menu="true">
            <Icon path={mdiMenu} title="Menu" size={1.5} color="white" />
          </button>
          <h1>{ data ? data.title : 'Digilib'}</h1>
          { (data && data.search) &&
            <button onClick={() => navigate('/search')}>
              <Icon path={mdiMagnify} title="Cari" size={1.25} color="white" />
            </button>
          }
        </div>
        <div className={styles['content-container']}>
          <Outlet />
        </div>
      </div>
    </Authenticate>
  );
}
