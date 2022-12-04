import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiBookmark, mdiBookmarkOutline } from '@mdi/js';
import Chip from './Chip';
import styles from './styles.module.css';

export default function Item({ item }) {
  const { author, category, cover, title } = item;
  const [bookmark, setBookmark] = useState(item.bookmark);

  return (
    <div className={styles['item-container']}>
      <img src={cover} width="100" />
      <div className={styles['item-detail']}>
        <h3>{ title }</h3>
        <p>{ author }</p>
        <div className={styles['chip-container']}>
          {category.map((name, i) => <Chip key={i} name={name} />)}
        </div>
        <button className={styles.bookmark} onClick={() => setBookmark(!bookmark)}>
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
