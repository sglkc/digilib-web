import { useEffect } from 'react';
import { Provider } from 'react-redux';
import Router from '@/router/Router.jsx';
import store from '@/store';
import '@fontsource/nunito/variable.css';
import '@fontsource/nunito/variable-italic.css';
import './App.css';

const root = document.getElementById('root').classList;
const breakpoints = {
  576: 'xs',
  768: 'sm',
  992: 'md',
};

let fired = 0;

function onWindowResize() {
  if (fired > 3) return;

  fired++;
  const width = window.innerWidth;

  for (const px in breakpoints) {
    root[width <= px ? 'add' : 'remove'](breakpoints[px]);
  }

  setTimeout(() => fired--, 250);
}

export default function App() {
  useEffect(() => {
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
