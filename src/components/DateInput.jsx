import { useState } from 'react';
import Input from './Input';

export default function DateInput(props) {
  const [dateInput, setDateInput] = useState('text');

  return (
    <Input
      type={dateInput}
      placeholder="Tanggal Lahir"
      max="2010-01-01"
      onFocus={() => setDateInput('date')}
      onBlur={() => setDateInput('text')}
      required
      {...props}
    />
  );
}
