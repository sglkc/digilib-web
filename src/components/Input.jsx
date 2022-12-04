import { Input as style } from './components.module.css';

export default function Input(props) {
  const classes = [style, props.className || ''].join(' ');
  return (
    <input {...props} className={classes} />
  );
}
