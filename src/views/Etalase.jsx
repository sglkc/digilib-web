import BottomNavbar from '@/components/BottomNavbar';
import CategoryScroller from '@/components/CategoryScroller';
import ItemScroller from '@/components/ItemScroller/ItemScroller';
import SortBy from '@/components/SortBy';
import styles from './Etalase.module.css';

export default function EtalaseView() {
  return (
    <>
      <div className={styles['quote-container']}>
        <h3>Quotes Harian</h3>
        <p>
          Banyak jalan untuk mendekati Tuhan, sebanyak bilangan nafas para
          pencari Tuhan. Tapi jalan yang paling dekat pada Allah adalah
          membahagiakan orang lain di sekitarmu. Engkau berkhidmat kepada
          mereka.
        </p>
        <p>Jalaluddin Rakhmat - The Road to Allah (hal. 268)</p>
      </div>
      <CategoryScroller />
      <SortBy />
      <ItemScroller />
      <BottomNavbar />
    </>
  );
}
