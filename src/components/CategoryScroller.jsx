import Button from './Button';
import { CategoryScroller as style } from './styles.module.css';

export default function CategoryScroller() {
  return (
    <div className={style}>
      <Button className="selected">Semua</Button>
      <Button>Audio</Button>
      <Button>Buku</Button>
      <Button>Video</Button>
    </div>
  );
}
