import Button from '@/components/Button';

export default function ItemNotFound() {
  return (
    <>
      <h3 style={{ marginBottom: '1.5rem' }}>Item tidak dapat ditemukan.</h3>
      <Button to={-1}>Kembali ke halaman sebelumnya</Button>
    </>
  );
}
