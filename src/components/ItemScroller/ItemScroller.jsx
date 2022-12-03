import Item from "./Item";
import styles from './styles.module.css';

export default function ItemScroller({ items }) {
  return (
    <div className={styles['scroller-container']}>
      {[1,2,3,4,5,6,7,8].map((i) => <Item key={i} />)}
    </div>
  );
}
