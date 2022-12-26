import { useState } from 'react';
import Axios from '@/func/Axios';
import Button from '@/components/Button';
import { Book as className } from './Type.module.css';

export default function Book({ media }) {
  const [open, setOpen] = useState(false);
  const embed = 'https://docs.google.com/gview?embedded=true&url=';
  const mediaUrl = Axios.getUri({
    url: '/files/media/' + media,
    params: { timestamp: Date.now() }
  });

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
        <iframe
          src={navigator.pdfViewerEnabled ? mediaUrl : embed + mediaUrl}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
