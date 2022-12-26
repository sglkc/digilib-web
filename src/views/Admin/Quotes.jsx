import { useEffect, useState } from 'react';
import Axios from '@/func/Axios';
import { Quotes as className } from './Admin.module.css';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function AdminQuotesView() {
  const LIMIT = 5;
  const [state, setState] = useState({ min: 0, max: LIMIT, page: 1 });
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    setEdit(false);
    Axios
      .get('/quotes')
      .then((res) => setState({
        ...state,
        count: res.data.count,
        quotes: res.data.result,
      }))
      .catch(() => false);
  }, [alert]);

  useEffect(() => {
    if (edit) return;
    document.forms[0].reset();
    document.getElementsByTagName('textarea')[0].innerText = '';
  }, [edit]);

  function submit(e) {
    e.preventDefault();

    const data = {
      author: e.target.elements.author.value,
      text: e.target.elements.text.value,
    };

    if (edit) {
      Axios
        .patch('/quotes/' + edit.quote_id, data)
        .then(() => setAlert({ text: 'Sukses memperbarui quote' }))
        .catch(() => setAlert({ text: 'Gagal memperbarui quote', error: true }))
        .finally(() => setEdit(false));
      return;
    }

    Axios
      .post('/quotes', data)
      .then(() => {
        setAlert({ text: 'Sukses menambahkan quote' });
        document.forms[0].reset();
        document.getElementsByTagName('textarea')[0].innerText = '';
      })
      .catch(() => setAlert({ text: 'Gagal menambahkan quote', error: true }))
  }

  function deleteQuote() {
    Axios
      .delete('/quotes/' + edit.quote_id)
      .then(() => setAlert({ text: 'Sukses menghapus quote' }))
      .catch(() => setAlert({ text: 'Gagal menghapus quote', error: true }))
      .finally(() => setEdit(false));
  }

  return (
    <div className={className}>
      { alert && <Alert style={{ marginBottom: '1rem' }} {...alert} /> }
      <table>
        <thead>
          <tr>
            <th>Teks</th>
            <th>Penulis</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          { state.quotes ? state.quotes.slice(state.min, state.max).map(
            (quote, i) => (
              <tr key={i}>
                <td>{ quote.text }</td>
                <td>{ quote.author }</td>
                <td>
                  <Button onClick={() => setEdit({ ...quote })}>Edit</Button>
                </td>
              </tr>
            ))
            :
              <tr>
                <td>
                  <h3>Memuat...</h3>
                </td>
              </tr>
          }
        </tbody>
      </table>
      <nav>
        <Button
          onClick={() => setState({
            ...state,
            min: state.min <= 0 ? 0 : state.min - LIMIT,
            max: state.min <= 0 ? LIMIT : state.min,
            page: state.min <= 0 ? 1 : state.page - 1
          })}
        >
          &lt;
        </Button>
        <h4>{ state.page }/{ Math.ceil(state.count / LIMIT) }</h4>
        <Button
          onClick={() => setState({
            ...state,
            min: state.max >= state.count ? state.min : state.max,
            max: state.max >= state.count ? state.max : state.max + LIMIT,
            page: state.max >= state.count ? state.page : state.page + 1
          })}
        >
          &gt;
        </Button>
      </nav>
      <hr />
      <form onSubmit={submit}>
        <h3>Teks</h3>
        <Input
          name="text"
          placeholder="Teks"
          defaultValue={edit.text}
          rows="5"
          textarea="true"
          autoComplete="off"
          maxLength={250}
          required
        />
        <h3>Penulis</h3>
        <Input
          name="author"
          placeholder="Penulis"
          defaultValue={edit.author}
          autoComplete="off"
          required
        />
        <div>
          { edit &&
          <>
            <Button
              style={{ backgroundColor: 'orangered' }}
              onClick={deleteQuote}
            >
              Hapus
            </Button>
            <Button
              style={{ backgroundColor: '#999' }}
              onClick={() => setEdit(false)}
            >
              Kembali
            </Button>
          </>
          }
          <Button style={{ marginLeft: edit ? '' : 'auto' }} type="submit">
            { edit ? 'Perbarui' : 'Tambah' }
          </Button>
        </div>
      </form>
    </div>
  );
}
