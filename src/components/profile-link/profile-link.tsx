import React, { ChangeEvent, MouseEventHandler } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';

type ProfileLinkProps = {
  title: string;
  path?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

function ProfileLink({ title, path, onClick }: ProfileLinkProps) {
  const pathname = useLocation().pathname;

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
