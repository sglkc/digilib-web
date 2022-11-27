import { Icon } from '@mdi/react';
import {
  mdiAccountOutline,
  mdiChatProcessingOutline,
  mdiBellOutline,
  mdiHistory,
  mdiInformationOutline
} from '@mdi/js';
import Logo from '@/assets/logo.png';
import Button from '@/components/Button';
import styles from './Navbar.module.css';

export default function NavbarComponent({ style }) {
  return (
    <nav className={styles.container} style={style}>
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
      <hr />
      <div className={styles.list}>
        <Button href="#">
          <Icon path={mdiAccountOutline} title="profil" size={1.125} />
          Informasi Akun
        </Button>
        <Button href="#">
          <Icon path={mdiBellOutline} title="notifikasi" size={1.125} />
          Notifikasi
        </Button>
        <Button href="#">
          <Icon path={mdiHistory} title="riwayat" size={1.125} />
          Riwayat
        </Button>
      </div>
      <hr />
      <div className={styles.list}>
        <Button href="#">
          <Icon path={mdiChatProcessingOutline} title="feedback" size={1.125} />
          Umpan Balik
        </Button>
        <Button href="#">
          <Icon path={mdiInformationOutline} title="tentang" size={1.125} />
          Tentang Aplikasi
        </Button>
      </div>
      <Button href="/login" className={styles.button}>Keluar</Button>
    </nav>
  );
}
