import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Flame, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const LINKS = [
  { to: '/program', label: 'Program'    },
  { to: '/jadwal',  label: 'Jadwal'     },
  { to: '/tentang', label: 'Instruktur' },
  { to: '/',        label: 'Komunitas'  },
  { to: '/',        label: 'Harga'      },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>

        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={close}>
          <span className={styles.flameWrap}>
            <Flame size={18} className={styles.flameIcon} />
          </span>
          <span className={styles.logoTxt}>FitLife</span>
          <span className={styles.logoSub}>Indonesia</span>
        </Link>

        {/* Center Links */}
        <ul className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
          {LINKS.map(({ to, label }) => (
            <li key={label}>
              <NavLink to={to}
                className={({ isActive }) =>
                  isActive && to !== '/'
                    ? `${styles.link} ${styles.linkActive}`
                    : styles.link
                }
                onClick={close} end={to === '/'}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className={styles.actions}>
          <Link to="/login" className={styles.loginBtn} onClick={close}>Login</Link>
          <Link to="/program" className={styles.startBtn} onClick={close}>
            Mulai Gratis →
          </Link>
        </div>

        {/* Hamburger */}
        <button className={styles.burger} type="button"
          onClick={() => setOpen(p => !p)}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>
    </nav>
  );
}
