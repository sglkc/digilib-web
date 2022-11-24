import Button from '@/components/Button';
import Input from '@/components/Input';
import Password from '@/components/Password';
import Logo from '@/assets/logo.png';
import styles from './Login.module.css';

export default function LoginView() {
  function submit(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={Logo} />
      <form className={styles.column} onSubmit={submit}>
        <h1 className="text-primary">Login</h1>
        <Input type="email" placeholder="Email" required />
        <Password />
        <a className={styles.link} href="#">lupa kata sandi?</a>
        <Button type="submit">Login</Button>
        <p>Belum punya akun? <a href="/register">Daftar Sekarang</a></p>
      </form>
    </div>
  );
}
