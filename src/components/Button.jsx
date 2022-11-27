import { Button as style } from './styles.module.css';

export default function ButtonComponent(props) {
  const classes = [style, props.className || ''].join(' ');
  return (
    <>
      { props.href ?
        <a href={props.href} {...props} className={classes}>{props.children}</a>
        :
        <button type="button" {...props} className={classes}>
          { props.children }
        </button>
      }
    </>
  );
}
