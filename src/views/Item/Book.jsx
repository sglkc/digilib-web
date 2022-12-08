import Button from '@/components/Button';
import { useState } from 'react';
import { Book as className } from './Type.module.css';

export default function Book({ media }) {
  const [open, setOpen] = useState(false);
  const src = 'https://docs.google.com/gview?embedded=true&url=' + media;

  function toggleOpen() {
    const scroller = document.getElementById('scroller');

    scroller.style.overflow = open ? 'auto' : 'hidden';
    setOpen(!open);
  }

  return (
    <div className={className}>
      <Button onClick={toggleOpen}>Baca</Button>
      <Button>Beli Buku</Button>
      <div
        style={!open ? { display: 'none' } : {}}
        onClick={toggleOpen}
      >
        <p>Ketuk disini untuk kembali</p>
        <iframe src={src} onClick={(e) => e.stopPropagation()}></iframe>
      </div>
    </div>
  );
}
