import Authenticate from '@/func/Authenticate';
import className from './Auth.module.css';

export default function AuthLayout({ children, style }) {
  return (
    <Authenticate auth={true}>
      <div className={className['layout-container']} style={style}>
        { children }
      </div>
    </Authenticate>
  );
}
