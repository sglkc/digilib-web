import Chip from './Chip';
import styles from './styles.module.css';

export default function Item({ item }) {
  return (
    <div className={styles['item-container']}>
      <img
        src="https://www.bukukita.com/babacms/displaybuku/51911_f.jpg"
        width="100"
      />
      <div className={styles['item-detail']}>
        <h3>Belajar Cerdas: Belajar Berbasiskan Otak</h3>
        <p>Jalaluddin Rakhmat</p>
        <div className={styles['chip-container']}>
          {['Doa', 'Agama', 'Sains dan Pendidikan', 'Jalaluddin Rakhmat', 'Ilmu Pengetahuan'].map((name, i) => <Chip key={i} name={name} />)}
          <Chip name="Lihat Detail" />
        </div>
      </div>
    </div>
  );
}
