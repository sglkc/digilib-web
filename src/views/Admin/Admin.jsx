import { useNavigate } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiChatPlusOutline, mdiPlaylistEdit, mdiPlaylistPlus } from '@mdi/js';
import { container as className } from './Admin.module.css';

const items = [
  { name: 'Tambah Item', to: 'item/new', icon: mdiPlaylistPlus },
  { name: 'Edit Item', to: 'items', icon: mdiPlaylistEdit },
  { name: 'Quotes', to: 'quotes', icon: mdiChatPlusOutline },
];

export default function AdminView() {
  const navigate = useNavigate();

  return (
    <div className={className}>
      { items.map((item, i) => (
        <div key={i} onClick={() => navigate('/admin/' + item.to)}>
          <Icon path={item.icon} title={item.name} size={1.5} />
          <h2>{ item.name }</h2>
        </div>
      ))
      }
    </div>
  );
}
