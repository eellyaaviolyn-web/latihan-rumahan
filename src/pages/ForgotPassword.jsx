import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import styles from './ForgotPassword.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSent(true);
    }, 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.ambOrange} />
      <div className={styles.ambTeal} />

      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <div className={styles.flameIcon}><Flame size={24} color="#fff" /></div>
          <h2>Reset Password</h2>
          <p>Masukkan email yang terdaftar pada akunmu</p>
        </div>

        {sent ? (
          <div className={styles.successBox}>
            <CheckCircle size={40} color="#4ADE80" />
            <h3>Email Terkirim!</h3>
            <p>Link untuk mengatur ulang password telah dikirim ke <strong>{email}</strong>. Silakan cek inbox atau folder spam kamu.</p>
            <Link to="/login" className={styles.backBtn}>Kembali ke Login</Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Email Terdaftar</label>
              <div className={styles.inputWrapper}>
                <Mail size={17} className={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className={`${styles.submitBtn} ${isLoading ? styles.btnDisabled : ''}`} disabled={isLoading}>
              {isLoading ? <Loader2 size={18} className={styles.spin} /> : 'Kirim Link Reset'}
              {!isLoading && <ArrowRight size={17} />}
            </button>
          </form>
        )}

        {!sent && (
          <p className={styles.backTxt}>
            Ingat password? <Link to="/login">Masuk di sini</Link>
          </p>
        )}
      </div>
    </div>
  );
}
