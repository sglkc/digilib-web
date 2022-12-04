import { Link } from 'react-router-dom';
import { Button as style } from './components.module.css';

export default function Button(props) {
  const classes = [style, props.className || ''].join(' ');
  return (
    <>
      { props.to ?
        <Link to={props.to} {...props} className={classes}>{props.children}</Link>
        :
        <button type="button" {...props} className={classes}>
          { props.children }
        </button>
      }
    </>
  );
}
