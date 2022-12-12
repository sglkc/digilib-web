import Unauthenticated from '@/func/Unauthenticated';
import className from './Auth.module.css';

export default function AuthLayout({ children, style }) {
  return (
    <Unauthenticated>
      <div className={className['layout-container']} style={style}>
        { children }
      </div>
    </Unauthenticated>
  );
}
