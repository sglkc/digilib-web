import { useEffect, useState } from 'react';
import Axios from '@/func/Axios';
import BottomNavbar from '@/components/BottomNavbar';
import CategoryScroller from '@/components/CategoryScroller';
import ItemScroller from '@/components/ItemScroller/ItemScroller';
import SortBy from '@/components/SortBy';
import styles from './Etalase.module.css';

export default function EtalaseView() {
  const [quote, setQuote] = useState(false);

  useEffect(() => {
    Axios.get('/quotes/random')
      .then((res) => setQuote(res.data.result))
      .catch(() => false);
  }, []);

  return (
    <>
      <div className={styles['quote-container']}>
        <h3>Quotes Harian</h3>
        <p>{ quote.text }</p>
        <p>{ quote.author }</p>
      </div>
      <CategoryScroller />
      <SortBy />
      <ItemScroller url="/items" />
      <BottomNavbar />
    </>
  );
}
