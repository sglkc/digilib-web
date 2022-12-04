import { mdiFormatAlignLeft } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import { SortBy as style } from './styles.module.css';

export default function SortBy() {
  const [sort, setSort] = useState('Terbaru');

  function toggleSort() {
    const toggle = sort === 'Terbaru' ? 'Terlama' : 'Terbaru';

    setSort(toggle);
  }

  return (
    <button className={style} onClick={toggleSort}>
      <span>Urutkan: </span>
      <Icon path={mdiFormatAlignLeft} title="Urutkan" size={1} />
      <span>{ sort }</span>
    </button>
  );
}
