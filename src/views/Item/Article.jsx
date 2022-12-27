import { useState } from 'react';
import Button from '@/components/Button';
import { Article as className } from './Type.module.css';

export default function Article({ media }) {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    const scroller = document.getElementById('scroller');

    scroller.style.overflow = open ? 'auto' : 'hidden';
    setOpen(!open);
  }

  return (
    <div className={className}>
      <Button onClick={toggleOpen}>Baca Artikel</Button>
      <div
        style={!open ? { display: 'none' } : {}}
        onClick={toggleOpen}
      >
        <p>Kembali</p>
        <iframe
          style={{ padding: '0 1rem 4rem' }}
          src={media}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
