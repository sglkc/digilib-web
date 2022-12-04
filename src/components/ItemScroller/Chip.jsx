import { chip } from './styles.module.css';

export default function Chip(props) {
  const classes = [chip, props.className || ''].join(' ');

  return (
    <div {...props} className={classes}>
      <p>{ props.name }</p>
    </div>
  );
}
