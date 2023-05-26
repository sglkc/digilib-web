import { useEffect, useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import prettyBytes from 'pretty-bytes';
import Axios from '@/func/Axios';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import Chip from '@/components/ItemScroller/Chip';
import DateInput from '@/components/DateInput';
import Input from '@/components/Input';
import styles from './ItemForm.module.css';

export default function AdminItemFormView() {
  const types = [
    { text: 'Artikel', value: 'article' },
    { text: 'Audio', value: 'audio' },
    { text: 'Buku', value: 'book' },
    { text: 'Video', value: 'video' },
  ];

  const { item } = useLoaderData();
  const [files, setFiles] = useState({
    cover: item?.cover,
    media: item?.media,
    upload: Boolean(item)
  });

  const [categories, setCategories] = useState(
    item?.Categories.map((c) => c.name)
  );

  const [uploadProgress, setUploadProgress] = useState({
    bytes: 0,
    progress: 0,
  });

  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (alert) document.forms.files.scrollIntoView({ behavior: 'smooth' });
  }, [alert]);

  function changeFileCover(e) {
    setFiles({
      cover: URL.createObjectURL(e.target.files[0]),
      media: files.media,
      upload: files.upload
    });
  }

  function changeFileMedia(e) {
    let type = e.target.files.item(0).type;

    if (type === 'application/pdf') type = 'book';
    else if (type === 'text/html') type = 'article';
    else if (type.startsWith('audio')) type = 'audio';
    else if (type.startsWith('video')) type = 'video';

    document.forms.detail.elements.type.value = type;
  }

  function deleteItem() {
    if (!confirm('Hapus item?')) return;

    Axios
      .delete('/items/' + item.item_id)
      .then(() => false)
      .catch(() => false)
      .finally(() => {
        setAlert({ text: 'Item berhasil dihapus' });
        window.alert('Item berhasil dihapus');
        navigate(-1);
      });
  }

  function upload(e) {
    e.preventDefault();

    const { cover, media } = e.target.elements;
    const data = new FormData();
    const date = new Date().toISOString().slice(0, 19).match(/\d/g).join('');
    const upload = {
      cover: cover.files.item(0),
      media: media.files.item(0)
    };

    if (upload.cover) data.append(
      'cover',
      upload.cover,
      date + '-' + upload.cover.name.replace(/ /g, '-')
    );

    if (upload.media) data.append(
      'media',
      upload.media,
      date + '-' + upload.media.name.replace(/ /g, '-')
    );

    if (!data.entries().next().value) return;

    const names = {
      cover: data.get('cover')?.name ?? files.cover,
      media: data.get('media')?.name ?? files.media,
    };

    Axios
      .post('/files', data, {
        onUploadProgress: ({ bytes, progress}) => {
          setUploadProgress({ bytes, progress });
        }
      })
      .then(() => {
        setFiles({ ...names, upload: Boolean(names.cover && names.media) });
        setAlert({ text: 'File sukses diunggah' });

        if (!item) return;

        Axios
          .patch('/items/' + item.item_id, { ...item, ...names })
          .then(() => setAlert({
            text: 'File terunggah, sukses memperbarui item'
          }))
          .catch(() => setAlert({
            text: 'File terunggah, gagal memperbarui item',
            error: true
          }))
      })
      .catch(() => setAlert({ text: 'File gagal diunggah', error: true }));
  }

  function submit(e) {
    e.preventDefault();

    const {
      author, description, title, type, tempat, tokoh, peristiwa, waktu
    } = e.target.elements;

    const data = {
      author: author.value,
      description: description.value,
      title: title.value,
      cover: files.cover,
      media: files.media,
      type: type.value,
      categories: categories.filter((c) => c).map((c) => c.trim()),
      tag: {
        tokoh: tokoh.value,
        tempat: tempat.value,
        peristiwa: peristiwa.value,
        waktu: waktu.value
      }
    }

    if (item) {
      Axios
        .patch('/items/' + item.item_id, data)
        .then(() => setAlert({ text: 'Sukses memperbarui item' }))
        .catch(() => setAlert({ text: 'Gagal memperbarui item', error: true }))
      return;
    }

    const hasEmpty = Object.values(data).map(a => !a).includes(false);

    if (!files.upload || !hasEmpty) return setAlert({
      text: 'Pastikan Anda sudah mengisi semua input dan mengunggah file',
      error: true
    });

    Axios
      .post('/items', data)
      .then(() => setAlert({ text: 'Sukses menambahkan item' }))
      .catch(() => setAlert({ text: 'Gagal menambahkan item', error: true }))
  }

  return (
    <div className={styles.container}>
      <form className={styles.files} name="files" onSubmit={upload}>
        { alert && <Alert style={{ marginBottom: '1.5rem' }} {...alert} /> }
        <h1>{ item ? 'Perbarui' : 'Tambah' } Item</h1>
        { files.cover &&
        <img src={
          files.cover.startsWith('blob:')
            ? files.cover
            : Axios.getUri({ url: '/files/cover/' + files?.cover })
          }
        />
        }
        <h3>Cover</h3>
        <Input
          type="file"
          name="cover"
          accept="image/*"
          onChange={changeFileCover}
        />
        <small>{ files.cover }</small>
        <h3>Media</h3>
        <Input
          type="file"
          name="media"
          accept="video/*,audio/*,application/pdf,text/html"
          onChange={changeFileMedia}
        />
        <small>{ files.media }</small>
        { files.upload &&
        <div className={styles.buttons}>
          { files.cover &&
          <Button
            className={styles.smallButton}
            href={Axios.getUri({ url: '/files/cover/' + files?.cover })}
            download={files.cover}
          >
            Unduh Cover
          </Button>
          }
          { files.media &&
            <Button
              className={styles.smallButton}
              href={Axios.getUri({ url: '/files/media/' + files?.media })}
              download={files.media}
            >
              Unduh Media
            </Button>
          }
        </div>
        }
        { Boolean(uploadProgress.bytes) &&
        <div className={styles.progressContainer}>
          <span>{ prettyBytes(Math.round(uploadProgress.bytes / uploadProgress.progress)) }</span>
          <progress value={uploadProgress.progress} max="1"></progress>
          <span>{ prettyBytes(uploadProgress.bytes) }</span>
        </div>
        }
        <Button type="submit">Unggah File</Button>
        <hr />
      </form>
      <form className={styles.details} name="detail" onSubmit={submit}>
        <h3>Judul</h3>
        <Input
          name="title"
          placeholder={item?.title || 'Judul'}
          defaultValue={item?.title}
          required
        />
        <h3>Author</h3>
        <Input
          name="author"
          placeholder={item?.author || 'Penulis'}
          defaultValue={item?.author}
          required
        />
        <h3>Deskripsi</h3>
        <Input
          name="description"
          placeholder={item?.description || 'Deskripsi'}
          defaultValue={item?.description}
          textarea="true"
          rows="5"
          required
        />
        <h3>Kategori</h3>
        <p>Kategori item dipisah dengan koma (,)</p>
        <Input
          placeholder={categories?.join() || 'Kategori'}
          defaultValue={categories?.join()}
          onChange={(e) => setCategories([ ...e.target.value.split(',') ])}
          required
        />
        { categories?.[0] &&
        <div className={styles.chips}>
          { categories.map((name, i) => <Chip key={i} name={name} />) }
        </div>
        }
        <h3>Tipe Item</h3>
        <div className={styles.radios}>
          { types.map((t, i) => (
            <label key={i}>
              <input
                type="radio"
                name="type"
                value={t.value}
                defaultChecked={t.value === item?.type}
                required
              /> { t.text }
            </label>
          ))
          }
        </div>
        <hr />
        <h2>Tag</h2>
        <h3>Tokoh</h3>
        <Input
          name="tokoh"
          placeholder={item?.Tag.tokoh || 'Tokoh'}
          defaultValue={item?.Tag.tokoh}
          required
        />
        <h3>Tempat</h3>
        <Input
          name="tempat"
          placeholder={item?.Tag.tempat || 'Tempat'}
          defaultValue={item?.Tag.tempat}
          required
        />
        <h3>Peristiwa</h3>
        <Input
          name="peristiwa"
          placeholder={item?.Tag.peristiwa || 'Peristiwa'}
          defaultValue={item?.Tag.peristiwa}
          required
        />
        <h3>Waktu</h3>
        <DateInput
          name="waktu"
          placeholder={item?.Tag.waktu.slice(0, 10) || 'Waktu'}
          defaultValue={item?.Tag.waktu.slice(0, 10)}
          max=""
        />
        <div className={styles.buttons}>
          <Button type="submit">{ item ? 'Perbarui': 'Tambah' } Item</Button>
          { item &&
          <>
            <Button style={{ background: 'slategray' }} type="reset">Reset</Button>
            <Button style={{ background: 'orangered' }} onClick={deleteItem}>
              Hapus
            </Button>
          </>
          }
        </div>
      </form>
    </div>
  );
}
