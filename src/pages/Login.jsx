import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import styles from './Login.module.css';

const STATS = [
  { val: '50K+', label: 'Pengguna Aktif' },
  { val: '4.9★', label: 'Rating Rata-rata' },
  { val: '500+', label: 'Program Latihan' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/program');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Email atau password salah.');
      } else {
        setError('Gagal login. Silakan coba lagi.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/program');
    } catch (err) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Gagal login dengan Google.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className={styles.splitPage}>
      {/* ── LEFT PANEL ── */}
      <div className={styles.leftPanel}>
        <div className={styles.leftGlow1} />
        <div className={styles.leftGlow2} />
        <div className={styles.leftInner}>
          <div className={styles.leftLogo}>
            <div className={styles.flameIconLg}><Flame size={28} color="#fff" /></div>
            <span className={styles.logoTxt}>FitLife<span>Indonesia</span></span>
          </div>
          <div className={styles.leftQuote}>
            <span className={styles.quoteMark}>"</span>
            <p>Perjalanan 1000 mil dimulai dari satu langkah. Mulailah hari ini dari rumahmu.</p>
          </div>
          <div className={styles.leftStats}>
            {STATS.map(s => (
              <div key={s.label} className={styles.leftStat}>
                <span className={styles.leftStatVal}>{s.val}</span>
                <span className={styles.leftStatLbl}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.leftAvatars}>
            {['#FF5500','#818CF8','#4ADE80','#FBBF24','#00F2FE'].map((c,i) => (
              <div key={i} className={styles.leftAv} style={{ background: c }}>
                {['R','S','D','A','F'][i]}
              </div>
            ))}
            <span className={styles.leftAvTxt}>50.000+ bergabung</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (Form) ── */}
      <div className={styles.rightPanel}>
        <div className={styles.formCard}>
          <div className={styles.formHead}>
            <h2>Selamat Datang 👋</h2>
            <p>Masuk ke akun FitLife kamu</p>
          </div>

          {error && (
            <div style={{ padding: '10px', background: 'rgba(248,113,113,0.1)', color: '#F87171', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button type="button" className={`${styles.oauthBtn} ${isGoogleLoading ? styles.btnDisabled : ''}`}
            onClick={handleGoogle} disabled={isGoogleLoading}>
            {isGoogleLoading
              ? <Loader2 size={20} className={styles.spin} />
              : <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} />}
            {isGoogleLoading ? 'Menghubungkan...' : 'Lanjutkan dengan Google'}
          </button>

          <div className={styles.divider}><span>atau masuk dengan email</span></div>

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <div className={styles.inputWrapper}>
                <Mail size={17} className={styles.inputIcon} />
                <input type="email" placeholder="nama@email.com" value={email}
                  onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label>Password</label>
                <Link to="/lupa-password" className={styles.forgot}>Lupa password?</Link>
              </div>
              <div className={styles.inputWrapper}>
                <Lock size={17} className={styles.inputIcon} />
                <input type="password" placeholder="••••••••" value={password}
                  onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className={`${styles.submitBtn} ${isLoading ? styles.btnDisabled : ''}`} disabled={isLoading}>
              {isLoading ? <Loader2 size={18} className={styles.spin} /> : 'Masuk Sekarang'}
              {!isLoading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className={styles.switchTxt}>
            Belum punya akun? <Link to="/register">Daftar gratis</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
