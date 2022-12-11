import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '@/components/Button';
import BottomNavbar from '@/components/BottomNavbar';
import Chip from '@/components/ItemScroller/Chip';
import Search from '@/components/Search';
import styles from './Search.module.css';

const dummy = [
  'Tafsir Al-Quran', 'Psikologi', 'Agama', 'Doa', 'Hadits', 'Komunikasi',
  'Neurosains', 'Sains dan Pendidikan', 'Fikih'
];

export default function JelajahiSearchView() {
  const [params, setParams] = useSearchParams();
  const defaultCategories = useRef([...dummy]);
  const [categories, setCategories] = useState(defaultCategories.current);
  const [selected, setSelected] = useState([]);

  function toggleCategory(index) {
    const temp = selected.includes(index)
      ? [...selected.filter(i => i !== index)]
      : [...selected, index];

    setSelected(temp);
  }

  function searchCategory({ target }) {
    const filtered = defaultCategories
      .current
      .filter(cat => {
        return cat.toLowerCase().match(target.value.toLowerCase());
      });

    setCategories([...filtered]);
  }

  function searchSelected() {
    const mapped = selected.map(i => categories[i]).join();

    setParams({ categories: mapped });
  }

  return (
    <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
      <p>Pilih kategori yang ingin Anda tampilkan</p>
      <Search placeholder="Cari Kategori disini" onChange={searchCategory} />
      <div className={styles.chips}>
        { categories.map((name, i) => (
          <Chip
            key={i}
            name={name}
            onClick={() => toggleCategory(i)}
            selected={selected.includes(i)}
            large="true"
          />
        ))
        }
        { !categories.length && <h3>Kategori kosong!</h3> }
      </div>
      <Button
        className={styles.button}
        onClick={searchSelected}
      >
        Cari Kategori
      </Button>
      <BottomNavbar />
    </form>
  );
}
