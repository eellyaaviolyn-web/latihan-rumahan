import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi proses API ke server
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('fitlife_user', JSON.stringify({ name: email.split('@')[0], email }));
      window.location.href = '/program'; // Reload agar navbar membaca state login
    }, 1500);
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(res => res.json());

        localStorage.setItem('fitlife_user', JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture
        }));
        window.location.href = '/program';
      } catch (error) {
        console.error("Gagal mengambil data dari Google", error);
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      console.error("Login Google gagal");
      setIsGoogleLoading(false);
    }
  });

  const handleGoogle = () => {
    setIsGoogleLoading(true);
    loginWithGoogle();
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
          <button type="button" className={`${styles.oauthBtn} ${isGoogleLoading ? styles.btnDisabled : ''}`} onClick={handleGoogle} disabled={isGoogleLoading}>
            {isGoogleLoading ? <Loader2 size={20} className={styles.spin} /> : <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} />}
            {isGoogleLoading ? 'Menghubungkan...' : 'Lanjutkan dengan Google'}
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

          <button type="submit" className={`${styles.submitBtn} ${isLoading ? styles.btnDisabled : ''}`} disabled={isLoading}>
            {isLoading ? <Loader2 size={18} className={styles.spin} /> : 'Masuk Sekarang'}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className={styles.registerTxt}>
          Belum punya akun? <Link to="/register">Daftar gratis</Link>
        </p>
      </div>
    </div>
  );
}
