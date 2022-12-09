import Item from "./ItemComponent";
import styles from './ItemScroller.module.css';

const items = [
  {
    item_id: 1,
    title: 'Neuro Psikologi',
    author: 'Jalaludin Rakhmat',
    description:
    'Ed ut perspiciatis unde omnis iste natus error sit voluptatem ' +
    'accusantium doloremque laudantium.',
    categories: ['Sains dan Pendidikan', 'Psikologi', 'Komunikasi', 'Neurosains'],
    cover: 'http://cdn.medicalxpress.com/newman/gfx/news/2014/0318_cogsci-grades-orig.jpg',
    media: 'https://filesamples.com/samples/audio/mp3/sample1.mp3',
    type: 'audio',
    bookmark: false,
  },
  {
    item_id: 2,
    title: 'Doa Bukan Lampu Aladin',
    author: 'Jalaludin Rakhmat',
    description:
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut' +
    'fugit, sed quia consequuntur magni dolored eos qui ratione voluptatem.',
    categories: ['Doa', 'Agama'],
    cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1332922051l/13563593.jpg',
    media: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Placeholder.pdf',
    type: 'book',
    bookmark: false,
  },
  {
    item_id: 3,
    title: 'Neuro Psikologi',
    author: 'Jalaludin Rakhmat',
    description:
    'Ed ut perspiciatis unde omnis iste natus error sit voluptatem ' +
    'accusantium doloremque laudantium.',
    categories: ['Sains dan Pendidikan', 'Psikologi', 'Komunikasi', 'Neurosains'],
    cover: 'https://i.ytimg.com/vi/zxFWIa9mDIo/maxresdefault.jpg',
    media: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    type: 'video',
    bookmark: false,
  }
];

export default function ItemScroller() {
  return (
    <div className={styles['scroller-container']}>
      {items.map((item, i) => <Item key={i} item={item} />)}
    </div>
  );
}
