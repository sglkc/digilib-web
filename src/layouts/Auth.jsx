import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Authenticate from '@/func/Authenticate';
import className from './Auth.module.css';

export default function AuthLayout({ children, style }) {
  const { title } = useLoaderData();

  useEffect(() => void(document.title = `${title} | Digital Library`), [title]);

  return (
    <Authenticate>
      <div className={className['layout-container']} style={style}>
        { children }
      </div>
    </Authenticate>
  );
}
