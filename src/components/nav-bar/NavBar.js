import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = props => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.navContainer}>
          <NavLink exact to="/" className={styles.navLogo}>
            Clean the Air
          </NavLink>

          <ul
            className={
              click ? `${styles.navMenu} ${styles.active}` : `${styles.navMenu}`
            }
          >
            <li className={styles.navItem}>
              <NavLink
                exact
                to="/mission"
                activeClassName={styles.active}
                className={styles.navLinks}
                onClick={handleClick}
              >
                Mission Statement
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                exact
                to="/about"
                activeClassName={styles.active}
                className={styles.navLinks}
                onClick={handleClick}
              >
                About Air Quality
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                exact
                to="/region"
                activeClassName={styles.active}
                className={styles.navLinks}
                onClick={handleClick}
              >
                Region
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                exact
                to="/resources"
                activeClassName={styles.active}
                className={styles.navLinks}
                onClick={handleClick}
              >
                Resources
              </NavLink>
            </li>
          </ul>
          <div className={styles.navIcon} onClick={handleClick}>
            {click ? (
              <i className="fas fa-times">X</i>
            ) : (
              <i className="fas fa-bars">burger</i>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
