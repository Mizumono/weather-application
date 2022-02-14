import styles from './Card.module.scss';

const Card = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

Card.Header = ({ children }) => <div className={styles.header}>{children}</div>;
Card.Body = ({ children }) => <div className={styles.body}>{children}</div>;
Card.Footer = ({ children }) => <div className={styles.footer}>{children}</div>;

export default Card;
