import BottomNavbar from '@/components/BottomNavbar';
import CategoryScroller from '@/components/CategoryScroller';
import ItemScroller from '@/components/ItemScroller/ItemScroller';
import SortBy from '@/components/SortBy';

export default function TandaiView() {
  return (
    <>
      <CategoryScroller />
      <SortBy />
      <ItemScroller url="/bookmarks" bookmarksOnly />
      <BottomNavbar />
    </>
  );
}
