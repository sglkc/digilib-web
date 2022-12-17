import { mdiFormatAlignLeft } from '@mdi/js';
import { Icon } from '@mdi/react';
import { useState } from 'react';
import { SortBy as className } from './components.module.css';

export default function SortBy({ style }) {
  const [sort, setSort] = useState('Terbaru');

  function toggleSort() {
    const toggle = sort === 'Terbaru' ? 'Terlama' : 'Terbaru';

    setSort(toggle);
  }

  return (
    <button className={className} style={style} onClick={toggleSort}>
      <span>Urutkan: </span>
      <Icon path={mdiFormatAlignLeft} title="Urutkan" size={1} />
      <span>{ sort }</span>
    </button>
  );
}
