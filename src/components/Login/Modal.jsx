import Input from '@/components/Input';
import Button from '../Button';
import styles from './styles.module.css';

export default function ForgotPasswordModal({ setModal }) {
  return (
    <div className={styles.overlay} onClick={() => setModal(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Lupa Kata Sandi?</h3>
        <p>
          Masukkan alamat email Anda dan kami akan membagikan tautan untuk
          membuat Kata Sandi baru
        </p>
        <Input type="email" placeholder="Email" />
        <Button>Kirim Sekarang</Button>
      </div>
    </div>
  );
}
