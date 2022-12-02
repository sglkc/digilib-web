import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.png';
import AuthLayout from '@/layouts/Auth';
import Button from '@/components/Button';
import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import styles from './Login.module.css';

export default function LoginView() {
  function submit(e) {
    e.preventDefault();
  }

  return (
    <AuthLayout>
      <img className={styles.logo} src={Logo} alt="logo" />
      <form className={styles.column} onSubmit={submit}>
        <h1 className="text-primary">Login</h1>
        <Input type="email" placeholder="Email" required />
        <PasswordInput />
        <a className={styles.link} href="#">lupa kata sandi?</a>
        <Button type="submit">Login</Button>
        <p>Belum punya akun? <Link to="/register">Daftar Sekarang</Link></p>
      </form>
    </AuthLayout>
  );
}
