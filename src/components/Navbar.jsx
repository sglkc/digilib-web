import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Icon } from '@mdi/react';
import {
  mdiAccountOutline,
  mdiChatProcessingOutline,
  mdiBellOutline,
  mdiHistory,
  mdiHomeOutline,
  mdiInformationOutline
} from '@mdi/js';
import Logo from '@/assets/logo.png';
import Button from '@/components/Button';
import styles from './Navbar.module.css';

const list = [
  [
    {
      to: '/',
      icon: mdiHomeOutline,
      iconTitle: 'etalase',
      text: 'Etalase'
    },
    {
      to: '/account',
      icon: mdiAccountOutline,
      iconTitle: 'akun',
      text: 'Informasi Akun'
    },
    {
      to: '/notification',
      icon: mdiBellOutline,
      iconTitle: 'notifikasi',
      text: 'Notifikasi'
    },
    {
      to: '/history',
      icon: mdiHistory,
      iconTitle: 'riwayat',
      text: 'Riwayat'
    },
  ],
  [
    {
      to: '/feedback',
      icon: mdiChatProcessingOutline,
      iconTitle: 'feedback',
      text: 'Umpan Balik'
    },
    {
      to: '/about',
      icon: mdiInformationOutline,
      iconTitle: 'tentang',
      text: 'Tentang Aplikasi'
    },
  ],
];

export default function Navbar({ onClick }) {
  const navbar = useSelector(state => state.navbar);
  const { pathname } = useLocation();

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
        <h3>Muhammad Irawan</h3>
        <p>irawan@gmail.com</p>
      </div>
      { list.map((items, i) => (
        <Fragment key={i}>
          <hr />
          <div className={styles.list}>
            {
              items.map((item, j) => (
                <Button
                  key={j}
                  to={item.to}
                  style={pathname === item.to ? { backgroundColor: '#3333331f' } : {}}
                  onClick={onClick}
                >
                  <Icon path={item.icon} title={item.iconTitle} size={1.125} />
                  {item.text}
                </Button>
              ))
            }
          </div>
        </Fragment>
      ))
      }
      <Button to="/login" className={styles.button}>Keluar</Button>
    </nav>
  );
}
