import DefaultLayout from '@/layouts/Default';
import CategoryScroller from '@/components/CategoryScroller';
import ItemScroller from '@/components/ItemScroller/ItemScroller';

export default function RiwayatView() {
  return (
    <DefaultLayout>
      <CategoryScroller />
      <ItemScroller />
    </DefaultLayout>
  );
}
