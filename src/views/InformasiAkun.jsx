import { useState } from 'react';
import Button from '@/components/Button';
import Input from "@/components/Input";
import PasswordInput from "@/components/PasswordInput";
import styles from './InformasiAkun.module.css';

export default function InformasiAkunView() {
  const [dateInput, setDateInput] = useState('text');

  return (
    <>
      <div className={styles['form-container']}>
        <div className={styles.col}>
          <div>
            <p className={styles.secondary}>Nama</p>
            <p>Muhammad Irawan</p>
          </div>
          <div>
            <p className={styles.secondary}>Email</p>
            <p>irawan@gmail.com</p>
          </div>
          <div>
            <p className={styles.secondary}>Tanggal Lahir</p>
            <p>06 Agustus 1971</p>
          </div>
        </div>
        <form className={styles.col}>
          <div>
            <h2>Ubah Informasi Akun</h2>
            <p className={styles.secondary}>
              Kata sandi baru Anda harus berbeda dari kata sandi sebelumnya
            </p>
          </div>
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
          <PasswordInput placeholder="Kata Sandi Baru" />
          <Button type="submit">Perbarui Informasi Akun</Button>
        </form>
      </div>
    </>
  );
}
