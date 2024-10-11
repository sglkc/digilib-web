import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/logo.png';
import AuthLayout from '@/layouts/Auth';
import Axios from '@/func/Axios';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import DateInput from '@/components/DateInput';
import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import styles from './Register.module.css';

export default function RegisterView() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  function submit(e) {
    e.preventDefault();

    const [nama, email, tanggal_lahir, password] = e.target;

    Axios
      .post('/auth/register', {
        nama: nama.value,
        email: email.value,
        password: password.value,
        tanggal_lahir: tanggal_lahir.value
      })
      .then(() => navigate('/'))
      .catch((err) => {
        const msg = err.data?.message;
        const localized = msg === 'EMAIL_DUPLICATE' ? 'Email sudah terdaftar'
          : 'Terjadi error, mohon coba lagi lain waktu';

        setAlert(localized);
      });
  }

  return (
    <AuthLayout>
      <form className={styles.column} onSubmit={submit}>
        <h1 className="text-primary">Daftar</h1>
        <Input type="text" name="nama" placeholder="Nama Lengkap" required />
        <Input type="email" name="email" placeholder="Email" required />
        <DateInput />
        <PasswordInput
          pattern=".{6,}"
          title="Kata sandi minimal berisi 6 karakter"
        />
        <label className={styles.policies}>
          <input className={styles.input} type="checkbox" required />
          <span>
            Saya berjanji untuk tidak menyebarluaskan konten apapun dari
            dalam aplikasi ini
          </span>
        </label>
        { alert && <Alert text={alert} error="true" /> }
        <Button type="submit">Daftar</Button>
        <p>Sudah punya akun? <Link to="/login">Silahkan Masuk</Link></p>
      </form>
    </AuthLayout>
  );
}
