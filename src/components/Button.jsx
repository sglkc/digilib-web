import { Button as style } from './styles.module.css';

export default function ButtonComponent(props) {
  return (
    <button className={style} type="button" {...props}>
      { props.children }
    </button>
  );
}
