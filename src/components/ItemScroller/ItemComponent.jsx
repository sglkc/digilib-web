import { useEffect, useRef, useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiBookmark, mdiBookmarkOutline, mdiTimerSand } from '@mdi/js';
import Axios from '@/func/Axios';
import Chip from './Chip';
import styles from './ItemScroller.module.css';

export default function Item({ item, onBookmark, onClick }) {
  const { item_id, author, cover, title, Bookmark, Categories } = item;
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [bookmark, setBookmark] = useState(Bookmark);
  const coverUrl = Axios.getUri({ url: '/files/cover/' + cover });

  useEffect(() => setBookmark(Bookmark), [item]);

  function toggleBookmark(e) {
    e.stopPropagation();
    if (loading) return;
    if (onBookmark) onBookmark(ref.current);

    setLoading(true);
    Axios.request({
      url: '/bookmarks/' + item_id,
      method: bookmark ? 'delete' : 'post'
    })
      .then((res) => {
        const bookmark = res.data.message === 'ADDED_BOOKMARK';
        setBookmark(bookmark);
      })
      .catch(() => {
        Axios.get('/bookmarks/' + item_id).then((res) => {
          const bookmark = res.data.message === 'ADDED_BOOKMARK';
          setBookmark(bookmark);
        })
          .catch(() => false);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div ref={ref} className={styles['item-container']} onClick={onClick}>
      <img src={coverUrl} width="100" />
      <div className={styles['item-detail']}>
        <h3>{ title }</h3>
        <p>{ author }</p>
        <div className={styles['chip-container']}>
          { Categories.map(({ name }, i) => <Chip key={i} name={name} />) }
        </div>
        <button className={styles.bookmark} onClick={toggleBookmark}>
          <Icon
            path={
              loading ? mdiTimerSand :
                bookmark ? mdiBookmark : mdiBookmarkOutline
            }
            title="Tandai"
            color="orange"
            size={1.125}
          />
        </button>
      </div>
    </div>
  );
}
