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
import RegisterPolicy from '@/components/Auth/Policy';
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
      <div className={styles.policy}>
        <img className={styles.logo} src={Logo} alt="logo" />
        <RegisterPolicy />
      </div>
      <form className={styles.column} onSubmit={submit}>
        <h1 className="text-primary">Daftar</h1>
        <Input type="text" placeholder="Nama Lengkap" required />
        <Input type="email" placeholder="Email" required />
        <DateInput />
        <PasswordInput
          pattern=".{6,}"
          title="Password minimal berisi 6 karakter"
        />
        <label className={styles.policies}>
          <input className={styles.input} type="checkbox" required />
          <span>
            Dengan ini menyatakan Anda setuju, Anda menerima segala isi
            <b> Syarat Penggunaan dan Kebijakan Privasi </b>
            Jalan Rahmat
          </span>
        </label>
        { alert && <Alert text={alert} error="true" /> }
        <Button type="submit">Daftar</Button>
        <p>Sudah punya akun? <Link to="/login">Silahkan Masuk</Link></p>
      </form>
    </AuthLayout>
  );
}
