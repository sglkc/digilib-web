import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import Input from './Input';
import { Password as style } from './styles.module.css';

export default function PasswordInput(props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={style}>
      <Input
        placeholder="Kata Sandi"
        type={visible ? 'text' : 'password'}
        required
        {...props}
      />
      <button type="button" onClick={() => setVisible(!visible)}>
        <Icon path={visible ? mdiEye : mdiEyeOff} size="1.75rem" color="#666" />
      </button>
    </div>
  );
}