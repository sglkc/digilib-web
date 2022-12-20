import { useLoaderData } from 'react-router-dom';
import Axios from '@/func/Axios';
import Input from '@/components/Input';
import { ItemForm as className } from './Admin.module.css';
import Button from '@/components/Button';
import DateInput from '@/components/DateInput';

export default function AdminItemFormView() {
  const { item } = useLoaderData();
  const { author, description, cover, media, title, type, Categories } = item;
  const { tokoh, tempat, peristiwa, waktu } = item.Tag;
  const categories = Categories.map((c) => c.name);
  const coverUrl = Axios.getUri({ url: '/files/cover/' + cover });

  return (
    <form className={className}>
      <div>
        <img src={coverUrl} />
        <h3>Cover</h3>
        <Input type="file" name="cover" required />
        <h3>Media</h3>
        <Input type="file" name="media" required />
        <div data-div="buttons">
          <Button>Upload</Button>
        </div>
      </div>
      <div>
        <h3>Judul</h3>
        <Input placeholder={title} defaultValue={title} required />
        <h3>Author</h3>
        <Input placeholder={author} defaultValue={author} required />
        <h3>Deskripsi</h3>
        <Input
          placeholder={description}
          defaultValue={description}
          textarea="true"
          required
        />
        <h3>Kategori</h3>
        <p>Kategori item dipisah dengan koma (,)</p>
        <Input
          placeholder={categories.join()}
          defaultValue={categories.join()}
          required
        />
        <h3>Tipe Item</h3>
        <div data-div="radio">
          { ['Audio', 'Book', 'Video'].map((text, i) => (
            <label key={i}>
              <input
                type="radio"
                name="type"
                value={text}
                defaultChecked={text.toLowerCase() === type}
                required
              /> { text }
            </label>
          ))
          }
        </div>
        <hr />
        <h2>Tag</h2>
        <h3>Tokoh</h3>
        <Input placeholder={tokoh} defaultValue={tokoh} required />
        <h3>Tempat</h3>
        <Input placeholder={tempat} defaultValue={tempat} required />
        <h3>Peristiwa</h3>
        <Input placeholder={peristiwa} defaultValue={peristiwa} required />
        <h3>Waktu</h3>
        <DateInput defaultValue={waktu.slice(0, 10)} max="" />
        <hr />
        <div data-div="buttons">
          <Button style={{ background: '#999' }} type="reset">Reset</Button>
          <Button type="submit">Tambah Item</Button>
        </div>
      </div>
    </form>
  )

}
