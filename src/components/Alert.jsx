import { mdiCheckBold, mdiExclamationThick } from '@mdi/js';
import { Icon } from '@mdi/react';
import { Alert as className } from './components.module.css';

export default function Alert({ text, error, style }) {
  return (
    <div className={className} error={error ? 'true' : undefined} style={style}>
      <Icon
        path={error ? mdiExclamationThick : mdiCheckBold}
        color="white"
        size={1.25}
      />
      <span>{ text }</span>
    </div>
  );
}
