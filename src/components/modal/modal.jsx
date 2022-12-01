import React, {useEffect, useCallback} from "react";
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./modal.module.css";
import ModalOverlay from '../modal-overlay/modal-overlay';


const Modal = ({children, title, onClose}) => {

  const [isOpen, setIsOpen] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);

  const close = useCallback(() => {
    setIsOpen(false)
    onClose();
  }, [onClose]);

  const onEscClose = useCallback((evt) => {
    if (evt.key === "Escape") {
      close();
    }
  }, [close]);

  useEffect(() => {
    document.addEventListener("keydown", onEscClose);
    
    return () => {
      document.removeEventListener("keydown", onEscClose);
    };
  }, [onEscClose]);

  const handleIcon = () => {
    setIsHovered(!isHovered);
  }

  return (
    <>
    {isOpen &&
      <>
        <ModalOverlay onClick={close} />
        <div className={styles.modal}>
          <div className={'ml-10 mr-10 mt-10 mb-8 ' + styles.head}>
            <p className="text text_type_main-large">{title}</p>
            <div className={styles.button} onClick={close} onMouseEnter={handleIcon} onMouseLeave={handleIcon}>
              {isHovered ? <CloseIcon type="secondary" /> : <CloseIcon type="primary" />}
            </div>
          </div>
          {children}
        </div>
      </>
    }
    </>
  )
};

Modal.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  onClose: PropTypes.func
};


export default Modal;

