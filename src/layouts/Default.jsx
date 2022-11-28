import { useDispatch, useSelector } from 'react-redux';
import { toggleNavbar } from '@/store/NavbarReducer';
import Navbar from '@/components/Navbar';
import styles from './Default.module.css';

export default function DefaultLayout({ children }) {
  const overlay = useSelector(state => state.navbar.open);
  const dispatch = useDispatch();
  const setNavbar = (bool) => dispatch(toggleNavbar({ open: bool }));

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
        <button onClick={() => setNavbar(true)}>toggle navbar</button>
        { children }
      </div>
    </>
  );
}
