import { mdiCheckBold, mdiExclamationThick } from '@mdi/js';
import { Icon } from '@mdi/react';
import { Alert as style } from './components.module.css';

export default function Alert({ text, error }) {
  return (
    <div className={style} error={error}>
      <Icon
        path={error ? mdiExclamationThick : mdiCheckBold}
        color="white"
        size={1.25}
      />
      <span>{ text }</span>
    </div>
  );
}
