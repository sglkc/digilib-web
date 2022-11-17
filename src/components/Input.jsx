import { Input as style } from './styles.module.css';

export default function InputComponent(props) {
  return (
    <input className={style} {...props} />
  );
}
