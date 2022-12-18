import Axios from '@/func/Axios';

async function getItem({ params }) {
  const { item_id } = params;
  const res = await Axios.get('/items/' + item_id);
  const item = res.data.result;

  return { item, title: item.title };
}

export { getItem };
