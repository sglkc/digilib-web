import { chip } from './ItemScroller.module.css';

export default function Chip(props) {
  const classes = [
    chip,
    props.className || '',
    props.large ? 'large' : '',
    props.selected ? 'selected' : ''
  ]
    .join(' ');

  return (
    <div {...props} className={classes}>
      <p>{ props.name }</p>
    </div>
  );
}
