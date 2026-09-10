import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import styles from './Login.module.css'; // Menggunakan style yang sama dengan Login

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('fitlife_user', JSON.stringify({ name, email }));
      window.location.href = '/program';
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
      <div className={styles.ambOrange} />
      <div className={styles.ambTeal} />

      <div className={styles.loginCard}>
        <div className={styles.logoWrap}>
          <div className={styles.flameIcon}>
            <Flame size={24} color="#fff" />
          </div>
          <h2>Buat Akun Baru</h2>
          <p>Mulai perjalanan fitness kamu hari ini</p>
        </div>

        <div className={styles.oauthGroup}>
          <button type="button" className={`${styles.oauthBtn} ${isGoogleLoading ? styles.btnDisabled : ''}`} onClick={handleGoogle} disabled={isGoogleLoading}>
            {isGoogleLoading ? <Loader2 size={20} className={styles.spin} /> : <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} />}
            {isGoogleLoading ? 'Mendaftar...' : 'Daftar dengan Google'}
          </button>
        </div>

        <div className={styles.divider}>
          <span>atau gunakan email</span>
        </div>

        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nama Lengkap</label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.inputIcon} />
              <input 
                type="text" 
                placeholder="Nama kamu" 
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </div>

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
            </div>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <button type="submit" className={`${styles.submitBtn} ${isLoading ? styles.btnDisabled : ''}`} disabled={isLoading}>
            {isLoading ? <Loader2 size={18} className={styles.spin} /> : 'Daftar Sekarang'}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className={styles.registerTxt}>
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
