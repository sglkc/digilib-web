import { useDispatch, useSelector } from 'react-redux';
import { setType } from '@/store/FilterReducer';
import Button from './Button';
import { CategoryScroller as style } from './components.module.css';

export default function CategoryScroller() {
  const types = [
    { text: 'Semua', value: undefined },
    { text: 'Artikel', value: 'article' },
    { text: 'Audio', value: 'audio' },
    { text: 'Buku', value: 'book' },
    { text: 'Video', value: 'video' },
  ];
  const selectedType = useSelector((state) => state.filter.type);
  const dispatch = useDispatch();

  return (
    <div className={style}>
      { types.map((type, i) => (
        <Button
          key={i}
          className={type.value === selectedType ? 'selected' : ''}
          onClick={() => dispatch(setType(type.value))}
        >
          { type.text }
        </Button>
      ))}
    </div>
  );
}
