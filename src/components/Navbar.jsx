import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={close}>
          <span className={styles.logoMark}>🏋️</span>
          <span className={styles.logoFit}>FitLife</span>
          <span className={styles.logoId}>Indonesia</span>
        </Link>

        {/* hamburger */}
        <button className={styles.burger} onClick={() => setOpen(p => !p)}
          aria-label={open ? 'Tutup menu' : 'Buka menu'} type="button">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Nav links */}
        <ul className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
          {[
            { to: '/',        label: 'Beranda',        end: true },
            { to: '/program', label: 'Program Latihan' },
            { to: '/jadwal',  label: 'Jadwal' },
            { to: '/tentang', label: 'Tentang Kami' },
          ].map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} onClick={close}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }>
                {label}
              </NavLink>
            </li>
          ))}

          {/* CTA */}
          <li>
            <Link to="/program" className={styles.ctaBtn} onClick={close}>
              <Zap size={13} /> Mulai Latihan
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
