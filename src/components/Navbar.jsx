import { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Icon } from '@mdi/react';
import {
  mdiAccountBox,
  mdiAccountBoxOutline,
  mdiAccountOutline,
  mdiChatProcessingOutline,
  mdiBellOutline,
  mdiPlaylistEdit,
  mdiHistory,
  mdiHomeOutline,
  mdiInformationOutline
} from '@mdi/js';
import Logo from '@/assets/logo.png';
import Button from '@/components/Button';
import styles from './Navbar.module.css';

const userList = [
  [
    {
      to: '/',
      icon: mdiHomeOutline,
      text: 'Etalase'
    },
    {
      to: '/account',
      icon: mdiAccountOutline,
      text: 'Informasi Akun'
    },
    {
      to: '/notification',
      icon: mdiBellOutline,
      text: 'Notifikasi'
    },
    {
      to: '/history',
      icon: mdiHistory,
      text: 'Riwayat'
    },
  ],
  [
    {
      to: '/feedback',
      icon: mdiChatProcessingOutline,
      text: 'Umpan Balik'
    },
    {
      to: '/about',
      icon: mdiInformationOutline,
      text: 'Tentang Aplikasi'
    },
  ],
];

const adminList = [
  [
    {
      to: '/admin',
      icon: mdiHomeOutline,
      text: 'Home'
    },
    {
      to: '/admin/items',
      icon: mdiPlaylistEdit,
      text: 'Edit Item'
    },
    {
      to: '/account',
      icon: mdiAccountOutline,
      text: 'Informasi Akun'
    },
  ]
];

export default function Navbar({ isAdmin, onClick }) {
  const navbar = useSelector(state => state.navbar);
  const user = useSelector(state => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const list = isAdmin ? adminList : userList;

  function logout() {
    document.cookie = 'TOKEN=;Max-Age=0';
    navigate('/login');
  }

  return (
    <nav
      className={styles['nav-container']}
      style={navbar.open ? { left: 0 } : {}}
    >
      <img
        className={styles.logo}
        src={Logo}
        alt="logo"
        width="128"
        height="128"
      />
      <div className={styles.profile}>
        <h3>{ user.nama }</h3>
        <p>{ user.email }</p>
      </div>
      { user.is_admin &&
      <>
        <hr />
        <div className={styles.list}>
          <Button to={isAdmin ? '/' : '/admin'} onClick={onClick}>
            <Icon
              path={isAdmin ? mdiAccountBoxOutline : mdiAccountBox}
              title={isAdmin ? 'User' : 'Admin'}
              size={1.125}
            />
            { isAdmin ? 'Keluar dari Admin' : 'Menu Admin' }
          </Button>
        </div>
      </>
      }
      { list.map((items, i) => (
        <Fragment key={i}>
          <hr />
          <div className={styles.list}>
            {
              items.map((item, j) => (
                <Button
                  key={j}
                  to={item.to}
                  style={
                    pathname === item.to ? { backgroundColor: '#3333331f' } : {}
                  }
                  onClick={onClick}
                >
                  <Icon path={item.icon} title={item.text} size={1.125} />
                  {item.text}
                </Button>
              ))
            }
          </div>
        </Fragment>
      ))
      }
      <Button onClick={logout} className={styles.button}>Keluar</Button>
    </nav>
  );
}
