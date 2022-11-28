import { Provider } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import Router from '@/router/Router.jsx';
import store from '@/store';
import '@fontsource/nunito/variable.css';
import './App.css';

const root = document.getElementById('root').classList;
const breakpoints = {
  576: 'xs',
  768: 'sm',
  992: 'md',
};

export default function App() {
  const width = useWindowWidth({ fps: 15 });

  for (const px in breakpoints) {
    root[width <= px ? 'add' : 'remove'](breakpoints[px]);
  }

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
