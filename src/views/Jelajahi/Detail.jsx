import { useEffect } from 'react';
import BottomNavbar from '@/components/BottomNavbar';
import CategoryScroller from '@/components/CategoryScroller';
import ItemScroller from '@/components/ItemScroller/ItemScroller';
import SortBy from '@/components/SortBy';

export default function JelajahiDetailView() {
  useEffect(() => {
    document.title = 'Detail | Jalan Rahmat';
  }, []);

  return (
    <>
      <CategoryScroller />
      <SortBy />
      <ItemScroller />
      <BottomNavbar />
    </>
  );
}
