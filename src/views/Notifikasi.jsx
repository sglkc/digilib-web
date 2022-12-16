import { Fragment, useEffect, useState } from 'react';
import Axios from '@/func/Axios';
import Button from '@/components/Button';
import styles from './Notifikasi.module.css';

export default function NotifikasiView() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    Axios
      .get('/user/notifications')
      .then((res) => {
        const result = res.data.result.map((r) => ({
          name: r.name,
          text: r.text,
          date: new Date(r.createdAt).toLocaleString()
        }));

        setNotifications(result);
      })
      .catch(() => false);
  }, []);

  function deleteAll() {
    Axios.delete('/user/notifications')
      .then(() => setNotifications([]))
      .catch(() => false);
  }

  return (
    <>
      <div className={styles.list}>
        { notifications.map((notification, i) => (
          <Fragment key={i}>
            { i !== 0 && <hr /> }
            <div className={styles.item}>
              <h4>{ notification.date }</h4>
              <p>{ notification.text }</p>
            </div>
          </Fragment>
        ))
        }
        { !notifications.length && <h3>Notifikasi kosong</h3> }
        <Button
          className={styles.button}
          onClick={deleteAll}
        >
          Hapus Semua Notifikasi
        </Button>
      </div>
    </>
  );
}
