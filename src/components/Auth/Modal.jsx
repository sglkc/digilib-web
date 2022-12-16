import { useState } from 'react';
import Axios from '@/func/Axios';
import Alert from '@/components/Alert';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './Auth.module.css';

export default function ForgotPasswordModal({ setModal }) {
  const [alert, setAlert] = useState(false);

  function submit(e) {
    e.preventDefault();

    const [email] = e.target;

    Axios
      .post('/user/password', { email: email.value })
      .then(() => {
        setAlert({
          text: 'Silahkan cek email Anda untuk mendapatkan kata sandi baru',
          error: false
        });
      })
      .catch((err) => {
        if (err.message === 'EMAIL_NOT_FOUND') {
          return setAlert({
            text: `Alamat email ${email.value} tidak terdaftar`,
            error: 'true'
          });
        }

        setAlert({
          text: 'Terjadi error, silahkan coba lagi nanti',
          error: 'true'
        });
      });

  }

  return (
    <div className={styles.overlay} onClick={() => setModal(false)}>
      <form
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
      >
        <h3>Lupa Kata Sandi?</h3>
        <p>
          Masukkan alamat email Anda dan kami akan membagikan tautan untuk
          membuat Kata Sandi baru
        </p>
        <Input type="email" name="email" placeholder="Email" required />
        { alert && <Alert {...alert} /> }
        <Button type="submit">Kirim Sekarang</Button>
      </form>
    </div>
  );
}
