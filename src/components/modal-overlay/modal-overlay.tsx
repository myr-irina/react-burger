import React from 'react';
import styles from './modal-overlay.module.scss';
import PropTypes from 'prop-types';

function ModalOverlay({ onClick }) {
  return <div className={styles.overlay} onClick={onClick} />;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
