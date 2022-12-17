import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Axios from '@/func/Axios';
import ItemScroller from '@/components/ItemScroller/ItemScroller';
import Search from '@/components/Search';

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
    <form
      style={{ minWidth: '50vw' }}
      onSubmit={onSubmit}
    >
      <Search
        placeholder="Ketik yang Anda cari disini"
        defaultValue={params.get('q')}
      />
      { params.get('q') ?
        <ItemScroller url={url} />
        :
        <h4
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '1.125rem'
          }}
        >
          Silahkan cari untuk item
        </h4>
      }
    </form>
  );
}
