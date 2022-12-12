import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/logo.png';
import AuthLayout from '@/layouts/Auth';
import Button from '@/components/Button';
import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import ForgotPasswordModal from '@/components/Auth/Modal';
import Axios from '@/func/Axios';
import styles from './Login.module.css';
import Alert from '@/components/Alert';

export default function LoginView() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);

  function submit(e) {
    e.preventDefault();

    const [email, password] = e.target;

    Axios
      .post('/auth/login', {
        email: email.value,
        password: password.value
      })
      .then(() => navigate('/'))
      .catch((err) => {
        const msg = err.data?.message;
        const localized = msg === 'EMAIL_NOT_FOUND' ? 'Email tidak terdaftar'
          : msg === 'INVALID_PASSWORD' ? 'Password salah'
          : 'Terjadi error, mohon coba lagi lain waktu';

        setAlert(localized);
      });
  }

  return (
    <AuthLayout style={{ maxWidth: 800 }}>
      <img className={styles.logo} src={Logo} alt="logo" />
      <form className={styles.column} onSubmit={submit}>
        <h1 className="text-primary">Masuk</h1>
        <Input type="email" name="email" placeholder="Email" required />
        <PasswordInput />
        <a
          className={styles.link}
          onClick={() => (setModal(true))}
        >
          lupa kata sandi?
        </a>
        { alert && <Alert text={alert} error="true" /> }
        <Button type="submit">Masuk</Button>
        <p>Belum punya akun? <Link to="/register">Daftar Sekarang</Link></p>
      </form>
      { modal && <ForgotPasswordModal setModal={setModal} /> }
    </AuthLayout>
  );
}
