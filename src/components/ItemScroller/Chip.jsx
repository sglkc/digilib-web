import styles from './styles.module.css';

export default function Chip({ name }) {
  return (
    <div className={styles.chip}>
      <p>{name}</p>
    </div>
  );
}
