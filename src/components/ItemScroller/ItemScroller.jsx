import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useInView } from 'react-cool-inview';
import { Icon } from '@mdi/react';
import { mdiLoading } from '@mdi/js';
import Axios from '@/func/Axios';
import Item from './ItemComponent';
import styles from './ItemScroller.module.css';

export default function ItemScroller({ bookmarksOnly, isAdmin, url }) {
  url ??= '/items';
  const LIMIT = 10;
  const defaultState = {
    count: 0,
    items: [],
    page: 1,
    lastPage: false
  };

  const navigate = useNavigate();
  const filter = useSelector(state => state.filter);
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
          order: filter.order === 'Terbaru' ? 'DESC' : undefined,
          page: state.page,
          type: filter.type
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
        if (
          err.data.message === 'PAGE_EMPTY' ||
          err.data.message === 'PAGE_NOT_FOUND'
        ) {
          return setState({ ...defaultState, lastPage: true });
        }

        alert('Terjadi error, silahkan coba lagi di lain waktu');
      });
  }

  function gotoItem(item_id) {
    navigate((isAdmin ? '/admin/item/' : '/item/') + item_id);
  }

  useEffect(() => {
    setState({ ...defaultState });
    getItems();
  }, [url, filter]);

  return (
    <div className={styles['scroller-container']}>
      { Boolean(state.count) && state.items.map((item, i) => (
        <Item
          key={i}
          item={item}
          onBookmark={(e) => { if (bookmarksOnly) e.remove() }}
          onClick={() => gotoItem(item.item_id)}
        />
      ))
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
          <Icon
            className={styles.spin}
            path={mdiLoading}
            size={1.25}
            color="orange"
          />
        </span>
      }
    </div>
  );
}
