import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Mail, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import styles from './Login.module.css';

const PERKS = [
  '✅ Akses 50+ program gratis selamanya',
  '✅ Jadwal latihan mingguan terstruktur',
  '✅ Bergabung komunitas 50K+ member',
  '✅ Upgrade ke Pro kapan saja',
];

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate('/program');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email sudah terdaftar. Silakan login.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password terlalu lemah (minimal 6 karakter).');
      } else {
        setError('Gagal mendaftar. Silakan coba lagi.');
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
        setError('Gagal mendaftar dengan Google.');
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
          <div>
            <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.03em' }}>
              Bergabung Gratis<br />Mulai Transformasimu
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PERKS.map(p => (
                <p key={p} style={{ color: '#CBD5E1', fontSize: '0.92rem', fontWeight: 500 }}>{p}</p>
              ))}
            </div>
          </div>
          <div className={styles.leftStats}>
            <div className={styles.leftStat}><span className={styles.leftStatVal}>14</span><span className={styles.leftStatLbl}>Hari Gratis</span></div>
            <div className={styles.leftStat}><span className={styles.leftStatVal}>0</span><span className={styles.leftStatLbl}>Kartu Kredit</span></div>
            <div className={styles.leftStat}><span className={styles.leftStatVal}>∞</span><span className={styles.leftStatLbl}>Akses Gratis</span></div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className={styles.rightPanel}>
        <div className={styles.formCard}>
          <div className={styles.formHead}>
            <h2>Buat Akun Baru 🚀</h2>
            <p>Gratis selamanya — mulai dalam 30 detik</p>
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
            {isGoogleLoading ? 'Mendaftar...' : 'Daftar dengan Google'}
          </button>

          <div className={styles.divider}><span>atau daftar dengan email</span></div>

          <form onSubmit={handleRegister} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Nama Lengkap</label>
              <div className={styles.inputWrapper}>
                <User size={17} className={styles.inputIcon} />
                <input type="text" placeholder="Nama kamu" value={name}
                  onChange={e => setName(e.target.value)} required />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <div className={styles.inputWrapper}>
                <Mail size={17} className={styles.inputIcon} />
                <input type="email" placeholder="nama@email.com" value={email}
                  onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Password</label>
              <div className={styles.inputWrapper}>
                <Lock size={17} className={styles.inputIcon} />
                <input type="password" placeholder="Min. 6 karakter" value={password}
                  onChange={e => setPassword(e.target.value)} required minLength={6} />
              </div>
            </div>
            <button type="submit" className={`${styles.submitBtn} ${isLoading ? styles.btnDisabled : ''}`} disabled={isLoading}>
              {isLoading ? <Loader2 size={18} className={styles.spin} /> : 'Daftar Sekarang'}
              {!isLoading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className={styles.switchTxt}>
            Sudah punya akun? <Link to="/login">Masuk di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
