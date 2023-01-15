import React from 'react';
import styles from './modal-overlay.module.scss';

function ModalOverlay({ onClick }) {
  return <div className={styles.overlay} onClick={onClick} />;
}

export default ModalOverlay;
