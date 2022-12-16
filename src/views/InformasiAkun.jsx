import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/UserReducer';
import Axios from '@/func/Axios';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import DateInput from '@/components/DateInput';
import Input from "@/components/Input";
import PasswordInput from "@/components/PasswordInput";
import styles from './InformasiAkun.module.css';

export default function InformasiAkunView() {
  const [alert, _setAlert] = useState(false);
  const [passwordView, setPasswordView] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  function setAlert(update) {
    _setAlert(update);
    setTimeout(() => _setAlert(false), 5000);
  }

  function submitPassword(e) {
    e.preventDefault();

    const [password] = e.target;

    Axios
      .patch('/user/password', { password: password.value })
      .then(() => setAlert({ text: 'Kata sandi telah diperbarui' }))
      .catch(() => setAlert({
        text: 'Terjadi error, silahkan coba lagi',
        error: 'true'
      }));
  }

  function submit(e) {
    e.preventDefault();

    const [nama, email, tanggal_lahir] = e.target;

    Axios
      .patch('/user', {
        nama: nama.value,
        email: email.value,
        tanggal_lahir: tanggal_lahir.value
      })
      .then((res) => {
        setAlert({ text: 'Informasi akun telah diperbarui' });
        dispatch(setUser({ ...res.data.result }));
      })
      .catch(() => setAlert({
        text: 'Terjadi error, silahkan coba lagi',
        error: 'true'
      }));
  }

  return (
    <>
      <div className={styles['form-container']}>
        <div className={styles.col}>
          <div>
            <p className={styles.secondary}>Nama</p>
            <p>{ user.nama }</p>
          </div>
          <div>
            <p className={styles.secondary}>Email</p>
            <p>{ user.email }</p>
          </div>
          <div>
            <p className={styles.secondary}>Tanggal Lahir</p>
            <p>{ user.tanggal_lahir }</p>
          </div>
          <a onClick={() => setPasswordView(!passwordView)}>
            { passwordView ? 'Ubah informasi akun' : 'Ubah kata sandi' }
          </a>
        </div>
        <form
          className={styles.col}
          onSubmit={passwordView ? submitPassword : submit}
        >
          <div>
            <h2>
              { passwordView ? 'Ubah Kata Sandi' : 'Ubah Informasi Akun' }
            </h2>
            { passwordView &&
            <p className={styles.secondary}>
              Kata sandi baru Anda harus berbeda dari kata sandi sebelumnya
            </p>
            }
          </div>
          { passwordView ?
            <PasswordInput
              pattern=".{6,}"
              placeholder="Kata Sandi Baru"
              title="Kata sandi minimal berisi 6 karakter"
            />
            :
            <>
              <Input
                type="text"
                name="nama"
                placeholder="Nama Lengkap"
                defaultValue={user.nama}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={user.email}
                required
              />
              <DateInput defaultValue={user.tanggal_lahir} />
            </>
          }
          { alert && <Alert {...alert} /> }
          <Button className={styles.button} type="submit">
            { passwordView ? 'Perbarui Kata Sandi' : 'Perbarui Informasi Akun' }
          </Button>
        </form>
      </div>
    </>
  );
}
