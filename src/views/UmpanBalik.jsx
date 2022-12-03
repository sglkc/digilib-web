import { Icon } from '@mdi/react';
import { mdiEmail } from '@mdi/js';

export default function UmpanBalikView() {
  return (
    <>
      <p style={{ marginBottom: '1rem', fontWeight: 600 }}>
        Jangan ragu untuk menghubungi kami untuk pertanyaan Anda.
        Hubungi kami di kontak dibawah ini.
      </p>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Icon path={mdiEmail} title="email" size={1.5} />
        <div>
          <p style={{ fontWeight: 700 }}>Email</p>
          <a
            style={{ fontWeight: 600, textDecoration: 'underline' }}
            href="mailto:info@jalanrahmat.com"
          >
          info@jalanrahmat.com
          </a>
        </div>
      </div>
    </>
  );
}
