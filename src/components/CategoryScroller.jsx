import { useDispatch, useSelector } from 'react-redux';
import { setType } from '@/store/FilterReducer';
import Button from './Button';
import { CategoryScroller as style } from './components.module.css';

export default function CategoryScroller() {
  const types = ['Semua', 'Audio', 'Book', 'Video'];
  const type = useSelector((state) => state.filter.type);
  const dispatch = useDispatch();

  return (
    <div className={style}>
      { types.map((name, i) => (
        <Button
          key={i}
          className={type === name.toLowerCase() ? 'selected' : ''}
          onClick={() => dispatch(setType(name.toLowerCase()))}
        >
          { name }
        </Button>
      ))}
    </div>
  );
}
