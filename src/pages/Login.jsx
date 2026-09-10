import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Mail, Lock, ArrowRight } from 'lucide-react';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulasi login sukses, diarahkan ke halaman program
    navigate('/program');
  };

  return (
    <div className={styles.loginPage}>
      {/* Ambient backgrounds */}
      <div className={styles.ambOrange} />
      <div className={styles.ambTeal} />

      <div className={styles.loginCard}>
        <div className={styles.logoWrap}>
          <div className={styles.flameIcon}>
            <Flame size={24} color="#fff" />
          </div>
          <h2>Selamat Datang</h2>
          <p>Masuk ke akun FitLife kamu</p>
        </div>

        <div className={styles.oauthGroup}>
          <button type="button" className={styles.oauthBtn}>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} />
            Lanjutkan dengan Google
          </button>
        </div>

        <div className={styles.divider}>
          <span>atau gunakan email</span>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input 
                type="email" 
                placeholder="nama@email.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label>Password</label>
              <Link to="/lupa-password" className={styles.forgot}>Lupa password?</Link>
            </div>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Masuk Sekarang <ArrowRight size={18} />
          </button>
        </form>

        <p className={styles.registerTxt}>
          Belum punya akun? <Link to="/register">Daftar gratis</Link>
        </p>
      </div>
    </div>
  );
}
