import { useSearchParams } from 'react-router-dom';
import JelajahiDetailView from './Detail';
import JelajahiSearchView from './Search';

export default function JelajahiView() {
  const [params] = useSearchParams();

  return params.get('categories')
    ? <JelajahiDetailView />
    : <JelajahiSearchView />;
}
