import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoIcon}>🏋️</span>
          <span>FitLife</span> Indonesia
        </Link>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
          type="button"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={closeMenu}
              end
            >
              Beranda
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/program"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={closeMenu}
            >
              Program Latihan
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jadwal"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={closeMenu}
            >
              Jadwal
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tentang"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={closeMenu}
            >
              Tentang Kami
            </NavLink>
          </li>
          <li>
            <Link
              to="/program"
              className={styles.ctaNavBtn}
              onClick={closeMenu}
            >
              <Zap size={14} />
              Mulai Latihan
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
