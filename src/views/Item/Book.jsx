import { useState } from 'react';
import Button from '@/components/Button';
import { Book as className } from './Type.module.css';

export default function Book({ media }) {
  const [open, setOpen] = useState(false);
  const embed = 'https://docs.google.com/gview?embedded=true&url=';
  const timestamp = '%3Ftimestamp%3D' + Date.now();
  const src = embed + media + timestamp;

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
