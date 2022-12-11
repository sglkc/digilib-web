import { useLocation, Link } from 'react-router-dom';
import { Icon } from '@mdi/react';
import {
  mdiBookmarkOutline,
  mdiFolderOpenOutline,
  mdiHomeOutline
} from '@mdi/js';
import styles from './BottomNavbar.module.css';

const items = [
  { name: 'Etalase', icon: mdiHomeOutline, route: '/' },
  { name: 'Jelajahi', icon: mdiFolderOpenOutline, route: '/explore' },
  { name: 'Tandai', icon: mdiBookmarkOutline, route: '/bookmark' },
];

export default function BottomNavbar() {
  const { pathname } = useLocation();

  return (
    <div className={styles['bottom-container']}>
      { items.map(({ name, icon, route }, i) => (
        <Link
          key={i}
          className={pathname === route ? styles.selected : ''}
          to={route}
        >
          <Icon path={icon} title={name} size={1.125} />
          <p>{ name }</p>
        </Link>
      ))
      }
    </div>
  );
}
