import React, {useEffect, useCallback, useState} from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./modal.module.css";
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.querySelector('#modals');


const Modal = ({children, title, onClose}) => {

  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false)
    onClose && onClose();
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

  return ReactDOM.createPortal(
    <>
    {isOpen &&
      <>
        <ModalOverlay onClick={close} />
        <div className={styles.modal}>
          <div className={'ml-10 mr-10 mt-10 mb-8 ' + styles.head}>
            <p className="text text_type_main-large">{title}</p>
            <div className={styles.button} onClick={close} onMouseEnter={handleIcon} onMouseLeave={handleIcon}>
              <CloseIcon type={isHovered ? "secondary" : "primary"} />
            </div>
          </div>
          {children}
        </div>
      </>
    }
    </>,
    modalRoot
  )
};

Modal.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  onClose: PropTypes.func
};


export default Modal;

