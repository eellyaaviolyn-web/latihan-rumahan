import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Mail, ArrowRight } from 'lucide-react';
import styles from './Login.module.css'; // Menggunakan style yang sama dengan Login

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setSent(true);
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
          <h2>Reset Password</h2>
          <p>Masukkan email yang terdaftar pada akunmu</p>
        </div>

        {sent ? (
          <div style={{
            textAlign: 'center', color: '#4ADE80', marginBottom: '24px', 
            padding: '16px', background: 'rgba(74,222,128,0.1)', 
            border: '1px solid rgba(74,222,128,0.2)', borderRadius: '12px',
            fontSize: '0.95rem', lineHeight: '1.5'
          }}>
            Link untuk mengatur ulang password telah dikirim ke <strong>{email}</strong>. Silakan cek inbox Anda.
          </div>
        ) : (
          <form onSubmit={handleReset} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Email Terdaftar</label>
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

            <button type="submit" className={styles.submitBtn}>
              Kirim Link Reset <ArrowRight size={18} />
            </button>
          </form>
        )}

        <p className={styles.registerTxt}>
          Kembali ke <Link to="/login">Halaman Login</Link>
        </p>
      </div>
    </div>
  );
}
