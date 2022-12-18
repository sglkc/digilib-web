import { useDispatch, useSelector } from 'react-redux';
import { setOrder } from '@/store/FilterReducer';
import { mdiFormatAlignLeft } from '@mdi/js';
import { Icon } from '@mdi/react';
import { SortBy as className } from './components.module.css';

export default function SortBy({ style }) {
  const sort = useSelector((state) => state.filter.order);
  const dispatch = useDispatch();

  function toggleSort() {
    const toggle = sort === 'Terbaru' ? 'Terlama' : 'Terbaru';

    dispatch(setOrder(toggle));
  }

  return (
    <button className={className} style={style} onClick={toggleSort}>
      <span>Urutkan: </span>
      <Icon path={mdiFormatAlignLeft} title="Urutkan" size={1} />
      <span>{ sort }</span>
    </button>
  );
}
