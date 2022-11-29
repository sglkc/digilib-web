import DefaultLayout from "@/layouts/Default";

export default function TentangView() {
  return (
    <DefaultLayout>
      <p style={{ marginBottom: '1rem' }}>
        Aplikasi untuk koleksi karya dan pemikiran Allah yarham KH. Jalaluddin
        Rakhmat beserta penulis dan tokoh lain yang menelaah, menyebarkan, dan
        meneruskan karya Kang Jalal. Nama aplikasi "Jalan Rahmat" diambil dari
        salah satu karya beliau yang berbentuk buku. Perpustakaan ini mencakup
        topik-topik yang menjadikan perhatian Allahyarham, yaitu:
      </p>
      <ul style={{ marginLeft: '1rem', listStyle: 'disc' }}>
        <li>Ahlul Bait</li>
        <li>Tafsir Al-Qur'an</li>
        <li>Hadits</li>
        <li>Filsafat</li>
        <li>Sejarah</li>
        <li>Psikologi</li>
        <li>Sains dan Pendidikan</li>
        <li>Komunikasi</li>
        <li>Agama</li>
        <li>Fikih</li>
        <li>Sosial Politik</li>
        <li>Tasawuff</li>
        <li>Neurosains</li>
        <li>Do'a</li>
      </ul>
    </DefaultLayout>
  );
}
