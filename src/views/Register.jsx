import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Password from '@/components/Password';
import RegisterPolicy from '@/components/RegisterPolicy';
import Logo from '@/assets/logo.png';
import styles from './Register.module.css';

export default function RegisterView() {
  const [dateInput, setDateInput] = useState('text');

  function submit(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.container}>
      <div className={styles.policy}>
        <img className={styles.logo} src={Logo} />
        <RegisterPolicy />
      </div>
      <form className={styles.column} onSubmit={submit}>
        <h1 className="text-primary">Daftar</h1>
        <Input type="text" placeholder="Nama Lengkap" required />
        <Input type="email" placeholder="Email" required />
        <Input
          type={dateInput}
          placeholder="Tanggal Lahir"
          max="2010-01-01"
          onFocus={() => setDateInput('date')}
          onBlur={() => setDateInput('text')}
          required
        />
        <Password />
        <label className={styles.policies}>
          <input className={styles.input} type="checkbox" required />
          <span>
            Dengan ini menyatakan Anda setuju, Anda menerima segala isi
            <b> Syarat Penggunaan dan Kebijakan Privasi </b>
            Jalan Rahmat
          </span>
        </label>
        <Button type="submit">Daftar</Button>
        <p>Sudah punya akun? <a href="/">Silahkan Masuk</a></p>
      </form>
    </div>
  );
}