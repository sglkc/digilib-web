import Axios from '@/func/Axios';

async function editItem({ params }) {
  const { item_id } = params;
  const res = await Axios.get('/items/' + item_id);
  const item = res.data.result;

  return { item, title: 'Edit: ' + item.title };
}

async function getItem({ params }) {
  const { item_id } = params;
  const res = await Axios.get('/items/' + item_id);
  const item = res.data.result;

  return { item, title: item.title };
}

export { editItem, getItem };
