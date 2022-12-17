import { useEffect, useState } from 'react';
import { useInView } from 'react-cool-inview';
import { Icon } from '@mdi/react';
import { mdiLoading } from '@mdi/js';
import Axios from '@/func/Axios';
import Item from './ItemComponent';
import styles from './ItemScroller.module.css';

export default function ItemScroller({ url }) {
  url ??= '/items';
  const LIMIT = 10;
  const defaultState = {
    count: 0,
    items: [],
    page: 1,
    lastPage: false
  };

  //const itemFilter = useSelector(state => state.itemFilter);
  const itemFilter = { order: 'Terbaru', type: 'semua' };
  const [state, setState] = useState(defaultState);
  const { observe } = useInView({
    rootMargin: '50px 0px',
    onEnter: getItems
  });

  function getItems() {
    if (state.lastPage) return;

    Axios
      .get(url, {
        params: {
          limit: LIMIT,
          order: itemFilter.order === 'Terbaru' ? undefined : 'DESC',
          page: state.page,
          type: itemFilter.type === 'semua' ? undefined : itemFilter.type
        }
      })
      .then((res) => {
        const { count } = res.data;
        const items = state.items.concat(res.data.result);
        const page = state.page + 1;
        const lastPage = items.length >= count;

        setState({ ...defaultState, count, items, page, lastPage });
      })
      .catch((err) => {
        if (err.data.message === 'PAGE_EMPTY') {
          return setState({ ...defaultState, lastPage: true });
        }

        alert('Terjadi error, silahkan coba lagi di lain waktu');
      });
  }

  useEffect(getItems, []);

  return (
    <div className={styles['scroller-container']}>
      { Boolean(state.count) &&
          state.items.map((item, i) => <Item key={i} item={item} />)
      }
      { Boolean(!state.count && state.lastPage) &&
        <strong className={styles.details}>Halaman ini kosong</strong>
      }
      { Boolean(state.count && state.lastPage) &&
        <strong className={styles.details}>
          Anda sudah berada di halaman terakhir
        </strong>
      }
      { !state.lastPage &&
        <span ref={observe} className={styles.details}>
          <Icon className={styles.spin} path={mdiLoading} size={1.25} color="black" />
        </span>
      }
    </div>
  );
}
