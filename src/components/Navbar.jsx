import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Flame, Menu, X, LogOut } from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import styles from './Navbar.module.css';

const LINKS = [
  { to: '/program', label: 'Program'    },
  { to: '/jadwal',  label: 'Jadwal'     },
  { to: '/tentang', label: 'Instruktur' },
  { to: '/komunitas', label: 'Komunitas'  },
  { to: '/harga',     label: 'Harga'      },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const close = () => setOpen(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

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
          {/* Mobile-only auth links */}
          {!user && (
            <>
              <li className={styles.mobileAuthDivider} />
              <li><Link to="/login" className={styles.link} onClick={close}>Login</Link></li>
              <li><Link to="/register" className={`${styles.link} ${styles.mobileStartBtn}`} onClick={close}>Mulai Gratis →</Link></li>
            </>
          )}
          {user && (
            <>
              <li className={styles.mobileAuthDivider} />
              <li>
                <button onClick={() => { handleLogout(); close(); }} className={`${styles.link} ${styles.mobileLogout}`}>
                  Keluar dari akun
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Right Actions */}
        <div className={styles.actions}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF5500, #FF2A00)', display: 'flex', alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase', overflow: 'hidden' }}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} referrerPolicy="no-referrer" />
                  ) : (
                    user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'
                  )}
                </div>
                {user.displayName || user.email?.split('@')[0]}
              </div>
              <button onClick={handleLogout} className={styles.loginBtn} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <LogOut size={16} /> Keluar
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className={styles.loginBtn} onClick={close}>Login</Link>
              <Link to="/program" className={styles.startBtn} onClick={close}>
                Mulai Gratis →
              </Link>
            </>
          )}
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
