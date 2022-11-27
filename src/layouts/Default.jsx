import Navbar from '@/components/Navbar';
import styles from './Default.module.css';

export default function DefaultLayout({ children }) {
  return (
    <div className={styles.container}>
      <Navbar />
      { children }
    </div>
  );
}
