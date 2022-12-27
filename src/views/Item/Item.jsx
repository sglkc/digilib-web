import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Icon } from '@mdi/react';
import {
  mdiBookmark, mdiBookmarkOutline, mdiTimerSand, mdiShareVariant
} from '@mdi/js';
import Axios from '@/func/Axios';
import Alert from '@/components/Alert';
import Chip from '@/components/ItemScroller/Chip';
import Article from './Article';
import Audio from './Audio';
import Book from './Book';
import Video from './Video';
import styles from './Item.module.css';

export default function ItemView() {
  const { item } = useLoaderData();
  const { author, description, cover, media, title, type, Categories } = item;
  const coverUrl = Axios.getUri({ url: '/files/cover/' + cover });
  const mediaUrl = Axios.getUri({ url: '/files/media/' + media });
  const [alert, setAlert] = useState(false);
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

  function share() {
    if (!window.isSecureContext) return setAlert({
      text: 'Tidak dapat membagikan tautan, Anda dapat salin tautan diatas',
      error: true
    });

    const url = window.location.href;

    window.navigator.share(url)
      .then(() => setAlert({ text: 'Berhasil membagikan tautan' }))
      .catch(() => {
        window.navigator.clipboard.writeText(url)
          .then(() => setAlert({ text: 'Tautan telah disalin' }))
          .catch(() => setAlert({
            text: 'Tidak dapat membagikan tautan',
            error: true
          }));
      });
  }

  return (
    <>
      <div className={styles.cover}>
        { type === 'video' ?
          <Video cover={coverUrl} media={mediaUrl} />
          :
          <img src={coverUrl} width="200" height="200" />
        }
      </div>
      <div id="scroller" className={styles.scroller}>
        { type === 'video' ?
          <Video className={styles.video} cover={coverUrl} media={mediaUrl} />
          :
          <img src={coverUrl} width="250" height="200" />
        }
        <div className={styles.container}>
          <div>
            <h2>{ title }</h2>
            <h3>{ author }</h3>
          </div>
          <div className={styles.row}>
            <button className={styles.button} onClick={share}>
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
          { alert && <Alert {...alert} /> }
          { type === 'article' && <Article media={mediaUrl} /> }
          { type === 'audio' && <Audio media={mediaUrl} /> }
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
