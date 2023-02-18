import React from 'react';
import { NavLink, useMatch, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';

function ProfileLink({ title, path, onClick }) {
  const pathname = useLocation().pathname;
  console.log(pathname);

  return path ? (
    <NavLink
      className={`${
        pathname === path ? styles['link__active'] : styles['link__inActive']
      }`}
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
