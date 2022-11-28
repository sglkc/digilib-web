import style from './Auth.module.css';

export default function AuthLayout({ children }) {
  return (
    <div className={style['layout-container']}>
      { children }
    </div>
  );
}
