import Unauthenticated from '@/func/Unauthenticated';
import style from './Auth.module.css';

export default function AuthLayout({ children }) {
  return (
    <Unauthenticated>
      <div className={style['layout-container']}>
        { children }
      </div>
    </Unauthenticated>
  );
}
