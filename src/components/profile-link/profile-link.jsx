import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import styles from './styles.module.scss';

function ProfileLink({ title, path, onClick }) {
  const match = useMatch(path || '');

  return path ? (
    <NavLink
      className={`${match ? styles['link__active'] : styles['link__inActive']}`}
      to={path}
    >
      <h3>{title}</h3>
    </NavLink>
  ) : (
    <button className={styles.link} onClick={onClick}>
      <h3>{title}</h3>
    </button>
  );
}

export default ProfileLink;
