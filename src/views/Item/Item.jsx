import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiBookmark, mdiBookmarkOutline, mdiShareVariant } from '@mdi/js';
import Chip from '@/components/ItemScroller/Chip';
import styles from './Item.module.css';

export default function ItemView() {
  const { state } = useLocation();
  const { item } = state;
  const { author, categories, description, cover, title } = item;
  const [bookmark, setBookmark] = useState(item.bookmark);

  useEffect(() => {
    document.title = title + ' | Jalan Rahmat';
    document.getElementById('title').innerText = title;
  }, [title]);

  return (
    <>
      <div className={styles.cover}>
        <img src={cover} width="200" height="200" />
      </div>
      <div className={styles.scroller}>
        <img src={cover} width="200" height="200" />
        <div className={styles.container}>
          <div>
            <h2>{ title }</h2>
            <h3>{ author }</h3>
          </div>
          <div className={styles.row}>
            <button className={styles.row}>
              <Icon path={mdiShareVariant} title="Bagikan" size={1.125} />
              <p>Bagikan</p>
            </button>
            <button>
              <Icon
                path={bookmark ? mdiBookmark : mdiBookmarkOutline}
                title="Tandai"
                color="orange"
                size={1.125}
              />
            </button>
          </div>
          <h3>Deskripsi Singkat</h3>
          <p>{ description }</p>
          <h3>Tagar</h3>
          <div className={styles.chips}>
            { categories.map((n, i) => <Chip key={i} name={n} large={true} />)}
          </div>
        </div>
      </div>
    </>
  );
}
