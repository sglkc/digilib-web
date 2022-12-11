import { Icon } from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import Input from './Input';
import { Search as style } from './components.module.css';

export default function Search(props) {
  return (
    <div className={style}>
      <Input type="text" {...props} />
      <button type="submit">
        <Icon path={mdiMagnify} color="#5a5a5a" size={1.5} />
      </button>
    </div>
  );
}
