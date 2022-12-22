import { Input as style } from './components.module.css';

export default function Input(props) {
  const classes = [style, props.className || ''].join(' ');
  return (
    <>
      { props.textarea ?
        <textarea rows="3" {...props} className={classes} />
        :
        <input {...props} className={classes} />
      }
    </>
  );
}
