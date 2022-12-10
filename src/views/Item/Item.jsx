import { useEffect, useState } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiBookmark, mdiBookmarkOutline, mdiShareVariant } from '@mdi/js';
import Chip from '@/components/ItemScroller/Chip';
import Audio from './Audio';
import Book from './Book';
import Video from './Video';
import styles from './Item.module.css';

export default function ItemView() {
  const { state } = useLocation();
  const loader = useLoaderData();
  const { item } = state ?? loader;
  const { author, categories, description, cover, media, title, type } = item;
  const [bookmark, setBookmark] = useState(item.bookmark);

  useEffect(() => {
    document.title = title + ' | Jalan Rahmat';
    document.getElementById('title').innerText = title;
  }, [title]);

  return (
    <>
      <div className={styles.cover}>
        { type === 'video' ?
          <Video cover={cover} media={media} />
          :
          <img src={cover} width="200" height="200" />
        }
      </div>
      <div id="scroller" className={styles.scroller}>
        { type === 'video' ?
          <Video className={styles.video} cover={cover} media={media} />
          :
          <img src={cover} width="250" height="200" />
        }
        <div className={styles.container}>
          <div>
            <h2>{ title }</h2>
            <h3>{ author }</h3>
          </div>
          <div className={styles.row}>
            <button className={styles.button}>
              <Icon path={mdiShareVariant} title="Bagikan" size={1.125} />
              <p>Bagikan</p>
            </button>
            <button
              className={styles.button}
              onClick={() => setBookmark(!bookmark)}
            >
              <Icon
                path={bookmark ? mdiBookmark : mdiBookmarkOutline}
                title="Tandai"
                color="orange"
                size={1.125}
              />
            </button>
          </div>
          { type === 'audio' && <Audio media={media} /> }
          { type === 'book' && <Book media={media} /> }
          <h3>Deskripsi Singkat</h3>
          <p>{ description }</p>
          <h3>Tagar</h3>
          <div className={styles.chips}>
            { categories.map((n, i) => <Chip key={i} name={n} large="true" />)}
          </div>
        </div>
      </div>
    </>
  );
}
