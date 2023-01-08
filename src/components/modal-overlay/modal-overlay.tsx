import styles from './modal-overlay.module.css';
import { FC } from 'react';

type TModalOverlayProps = {
  onClick: () => void;
}

const ModalOverlay: FC<TModalOverlayProps> = ({onClick}) => {
  
  return (
    <div onClick={onClick} className={styles.overlay} />
  )
};

export default ModalOverlay;