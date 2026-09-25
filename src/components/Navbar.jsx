import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Zap, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import styles from './Navbar.module.css';

/* ── Link list sesuai status login ── */
const PUBLIC_LINKS = [
  { to: '/',      label: 'Dashboard', icon: <LayoutDashboard size={13} /> },
  { to: '/harga', label: 'Pricing'   },
];

const APP_LINKS = [
  { to: '/program',    label: 'Programs'                  },
  { to: '/ai-studio',  label: 'Studio AI', isLive: true   },
  { to: '/kalkulator', label: 'Calculator'                 },
  { to: '/komunitas',  label: 'Community'                  },
  { to: '/jadwal',     label: 'Schedule'                   },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [user, setUser]       = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const close = () => setOpen(false);

  /* Sync user dari localStorage */
  useEffect(() => {
    const syncUser = () => {
      const s = localStorage.getItem('fitlife_user');
      setUser(s ? JSON.parse(s) : null);
    };
    syncUser();
    window.addEventListener('storage', syncUser);
    /* Tangkap event custom dari Login/Register */
    window.addEventListener('fitlife:login', syncUser);
    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('fitlife:login', syncUser);
    };
  }, []);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fitlife_user');
    setUser(null);
    close();
    navigate('/');
  };

  const LINKS = user ? APP_LINKS : PUBLIC_LINKS;

  return (
    <header className={styles.header}>
      <nav className={`${styles.pill} ${scrolled ? styles.pillScrolled : ''}`}>

        {/* ── Logo ── */}
        <Link to="/" className={styles.logo} onClick={close}>
          <span className={styles.logoIcon}><Zap size={16} fill="white" color="white" /></span>
          <span className={styles.logoTxt}>FitLife</span>
        </Link>

        {/* ── Center Links (desktop) ── */}
        <ul className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
          {LINKS.map(({ to, label, isLive }) => (
            <li key={label}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
                onClick={close}>
                {isLive && <span className={styles.liveNavDot} />}
                {label}
              </NavLink>
            </li>
          ))}

          {/* Mobile-only auth */}
          {!user ? (
            <>
              <li className={styles.mobileDivider} />
              <li><Link to="/login"    className={styles.link} onClick={close}>Login</Link></li>
              <li><Link to="/register" className={`${styles.link} ${styles.mobileGreen}`} onClick={close}>Daftar Gratis</Link></li>
            </>
          ) : (
            <>
              <li className={styles.mobileDivider} />
              <li><Link to="/profil" className={styles.link} onClick={close}>Profil & Trophy Vault</Link></li>
              <li>
                <button onClick={handleLogout} className={`${styles.link} ${styles.mobileLogout}`}>
                  Keluar dari akun
                </button>
              </li>
            </>
          )}
        </ul>

        {/* ── Right: CTA / User ── */}
        <div className={styles.actions}>
          {user ? (
            <div className={styles.userRow}>
              <Link to="/profil" className={styles.userProfileLink} title="Profil & Trophy Vault">
                <div className={styles.avatar}>
                  {user.picture
                    ? <img src={user.picture} alt={user.name} referrerPolicy="no-referrer" />
                    : <span>{user.name?.charAt(0)?.toUpperCase() || 'U'}</span>}
                </div>
                <span className={styles.userName}>{user.name?.split(' ')[0]}</span>
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn} title="Keluar">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login"    className={styles.loginLink}>Login</Link>
              <Link to="/register" className={styles.ctaBtn}>Daftar Gratis</Link>
            </>
          )}
        </div>

        {/* ── Hamburger ── */}
        <button className={styles.burger} onClick={() => setOpen(p => !p)} type="button">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
    </header>
  );
}
