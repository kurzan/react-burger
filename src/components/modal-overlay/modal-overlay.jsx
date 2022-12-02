import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({onClick}) => {
  
  return (
    <div onClick={onClick} className={styles.overlay} />
  )
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default ModalOverlay;