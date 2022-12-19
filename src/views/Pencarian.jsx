import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Axios from '@/func/Axios';
import CategoryScroller from '@/components/CategoryScroller';
import ItemScroller from '@/components/ItemScroller/ItemScroller';
import Search from '@/components/Search';
import SortBy from '@/components/SortBy';

export default function PencarianView() {
  const [params, setParams] = useSearchParams();
  const defaultUri = Axios.getUri({
    url: '/items',
    params: { search: params.get('q') }
  });

  const [url, setUrl] = useState(defaultUri);

  function onSubmit(e) {
    e.preventDefault();

    const search = e.target[0].value;

    setUrl(Axios.getUri({ url: '/items', params: { search }}));
    setParams({ q: search });
  }

  return (
    <form onSubmit={onSubmit}>
      <Search
        placeholder="Ketik yang Anda cari disini"
        defaultValue={params.get('q')}
        style={{ marginBottom: '1.5rem' }}
      />
      { params.get('q') ?
        <>
          <CategoryScroller />
          <SortBy />
          <ItemScroller url={url} />
        </>
        :
        <h4 style={{ textAlign: 'center', fontSize: '1.125rem' }}>
          Silahkan cari untuk item
        </h4>
      }
    </form>
  );
}
