import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Icon } from '@mdi/react';
import {
  mdiBookmark, mdiBookmarkOutline, mdiTimerSand, mdiShareVariant
} from '@mdi/js';
import Axios from '@/func/Axios';
import Chip from '@/components/ItemScroller/Chip';
import Audio from './Audio';
import Book from './Book';
import Video from './Video';
import styles from './Item.module.css';

export default function ItemView() {
  const { item } = useLoaderData();
  const { author, description, cover, media, title, type, Categories } = item;
  const coverUrl = Axios.getUri({ url: '/files/cover/' + cover });
  const [loading, setLoading] = useState(false);
  const [bookmark, setBookmark] = useState(item.Bookmark);

  useEffect(() => {
    Axios.post('/histories/' + item.item_id)
      .then(() => false)
      .catch(() => false);
  }, []);

  function toggleBookmark() {
    if (loading) return;

    setLoading(true);
    Axios.request({
      url: '/bookmarks/' + item.item_id,
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
    <>
      <div className={styles.cover}>
        { type === 'video' ?
          <Video cover={coverUrl} media={media} />
          :
          <img src={coverUrl} width="200" height="200" />
        }
      </div>
      <div id="scroller" className={styles.scroller}>
        { type === 'video' ?
          <Video className={styles.video} cover={coverUrl} media={media} />
          :
          <img src={coverUrl} width="250" height="200" />
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
              onClick={toggleBookmark}
            >
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
          { type === 'audio' && <Audio media={media} /> }
          { type === 'book' && <Book media={media} /> }
          <h3>Deskripsi Singkat</h3>
          <p>{ description }</p>
          <h3>Tagar</h3>
          <div className={styles.chips}>
            { Categories.map(({ name }, i) => (
              <Chip key={i} name={name} large="true" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
