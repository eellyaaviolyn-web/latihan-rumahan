import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Mail, Lock, User, ArrowRight } from 'lucide-react';
import styles from './Login.module.css'; // Menggunakan style yang sama dengan Login

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulasi sukses mendaftar
    navigate('/program');
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
          <button type="button" className={styles.oauthBtn} onClick={() => navigate('/program')}>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} />
            Daftar dengan Google
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

          <button type="submit" className={styles.submitBtn}>
            Daftar Sekarang <ArrowRight size={18} />
          </button>
        </form>

        <p className={styles.registerTxt}>
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
