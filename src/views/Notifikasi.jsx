import { Fragment } from "react";
import DefaultLayout from "@/layouts/Default";
import Button from "@/components/Button";
import styles from './Notifikasi.module.css';

export default function NotifikasiView() {
  const notifications = [
    {
      date: '05 Agustus 2021',
      text: 'Update Aplikasi telah tersedia'
    },
    {
      date: '05 Agustus 2021',
      text: 'Update Aplikasi telah tersedia'
    },
    {
      date: '05 Agustus 2021',
      text: 'Update Aplikasi telah tersedia'
    },
    {
      date: '05 Agustus 2021',
      text: 'Update Aplikasi telah tersedia'
    },
  ];

  return (
    <DefaultLayout>
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
        <Button className={styles.button}>Hapus Semua Notifikasi</Button>
      </div>
    </DefaultLayout>
  );
}
