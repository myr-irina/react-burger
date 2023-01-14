import React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');

function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal_opened} onClick={onClose}>
        <div className={styles.modal_content}>
          <div className={styles.modal_close}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
          {children}
        </div>
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
