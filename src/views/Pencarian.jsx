import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Axios from '@/func/Axios';
import ItemScroller from '@/components/ItemScroller/ItemScroller';
import Search from '@/components/Search';

export default function PencarianView() {
  const [params, setParams] = useSearchParams();
  const defaultUri = Axios.getUri({ url: '/items', params });
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
      />
      <ItemScroller />
    </form>
  );
}
