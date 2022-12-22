import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Axios from '@/func/Axios';
import Button from '@/components/Button';
import CategoryScroller from '@/components/CategoryScroller';
import ItemScroller from '@/components/ItemScroller/ItemScroller';
import Search from '@/components/Search';
import SortBy from '@/components/SortBy';
import { Items as className } from './Admin.module.css';

export default function AdminItemListView() {
  const [params, setParams] = useSearchParams();
  const defaultUri = Axios.getUri({
    url: '/items',
    params: { search: params.get('q') }
  });

  const [url, setUrl] = useState(defaultUri);

  function onSubmit(e) {
    e.preventDefault();

    const search = e.target.elements.search.value;

    setUrl(Axios.getUri({ url: '/items', params: { search }}));
    setParams({ q: search });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={className}>
        <Button to="/admin/item/new" type="button">Tambah Item Baru</Button>
        <Search
          name="search"
          placeholder="Ketik yang Anda cari disini"
          defaultValue={params.get('q')}
        />
      </div>
      <CategoryScroller />
      <SortBy />
      <ItemScroller url={url} isAdmin />
    </form>
  );
}
