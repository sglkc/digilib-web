import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiBookmark, mdiBookmarkOutline } from '@mdi/js';
import Axios from '@/func/Axios';
import Chip from './Chip';
import styles from './ItemScroller.module.css';

export default function Item({ item }) {
  const { item_id, author, cover, title, Categories } = item;
  const [bookmark, setBookmark] = useState(item.bookmark);
  const navigate = useNavigate();
  const coverUrl = Axios.getUri({ url: '/files/cover/' + cover });

  function gotoItem() {
    navigate('/item/' + item_id);
  }

  function toggleBookmark(e) {
    e.stopPropagation();
    setBookmark(!bookmark);
  }

  return (
    <div className={styles['item-container']} onClick={gotoItem}>
      <img src={coverUrl} width="100" />
      <div className={styles['item-detail']}>
        <h3>{ title }</h3>
        <p>{ author }</p>
        <div className={styles['chip-container']}>
          { Categories.map(({ name }, i) => <Chip key={i} name={name} />) }
        </div>
        <button className={styles.bookmark} onClick={toggleBookmark}>
          <Icon
            path={bookmark ? mdiBookmark : mdiBookmarkOutline}
            title="tandai"
            color="orange"
            size={1.125}
          />
        </button>
      </div>
    </div>
  );
}
