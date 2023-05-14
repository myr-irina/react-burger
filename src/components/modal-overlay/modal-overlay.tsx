import React, { FC } from 'react';
import styles from './modal-overlay.module.scss';

function ModalOverlay({
  onClick,
}: {
  onClick?: React.MouseEventHandler;
}): JSX.Element {
  return <div className={styles.overlay} onClick={onClick} />;
}

export default ModalOverlay;
