import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('react-modals');

function Modal({ children, handleClose, title }) {
  useEffect(() => {
    document.addEventListener('keydown', onEscKeyClose);
    return () => {
      document.removeEventListener('keydown', onEscKeyClose);
    };
  }, []);

  const onEscKeyClose = (e) => {
    if (e.code === 'Escape') {
      handleClose();
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <ModalOverlay onClick={handleClose} />
        <div className={styles.modal_content}>
          <div className={styles.modal_header}>
            {title && <p className='text text_type_main-large'>{title}</p>}
            <div className={styles.modal_close} onClick={handleClose}>
              <CloseIcon type='primary' />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>,
    modalRoot!
  );
}

export default Modal;
