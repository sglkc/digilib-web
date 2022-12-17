import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Axios from '@/func/Axios';
import Button from '@/components/Button';
import BottomNavbar from '@/components/BottomNavbar';
import CategoryScroller from '@/components/CategoryScroller';
import ItemScroller from '@/components/ItemScroller/ItemScroller';
import SortBy from '@/components/SortBy';

export default function JelajahiDetailView() {
  const [params, setParams] = useSearchParams();
  const url = Axios.getUri({
    url: '/categories/items',
    params: {
      search: params.get('categories').split(',')
    }
  });

  return (
    <>
      <CategoryScroller />
      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <SortBy style={{ margin: 0 }} />
        <Button onClick={() => setParams()}>Kembali ke pencarian</Button>
      </div>
      <ItemScroller url={url} />
      <BottomNavbar />
    </>
  );
}
