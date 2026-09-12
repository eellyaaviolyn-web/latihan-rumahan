import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Flame, Lock, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../firebase';
import styles from './ForgotPassword.module.css'; // Kita pakai CSS yang sama dengan Lupa Password

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidCode, setIsValidCode] = useState(null); // null = checking, true = valid, false = invalid
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Verifikasi apakah link (oobCode) masih berlaku
  useEffect(() => {
    if (!oobCode) {
      setIsValidCode(false);
      return;
    }
    verifyPasswordResetCode(auth, oobCode)
      .then(() => setIsValidCode(true))
      .catch(() => setIsValidCode(false));
  }, [oobCode]);

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Password tidak sama!');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Gagal mengubah password. Link mungkin sudah kedaluwarsa.');
    } finally {
      setIsLoading(false);
    }
  };

  // State: Loading Code
  if (isValidCode === null) {
    return (
      <div className={styles.page}>
        <div className={styles.card} style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Loader2 size={30} className={styles.spin} style={{ margin: '0 auto 16px', color: '#FF5500' }} />
          <p style={{ color: '#94A3B8' }}>Memverifikasi link aman...</p>
        </div>
      </div>
    );
  }

  // State: Invalid Code (Link expired/broken)
  if (isValidCode === false) {
    return (
      <div className={styles.page}>
        <div className={styles.ambOrange} />
        <div className={styles.ambTeal} />
        <div className={styles.card} style={{ textAlign: 'center' }}>
          <AlertCircle size={40} color="#F87171" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '10px' }}>Link Tidak Valid</h2>
          <p style={{ color: '#94A3B8', marginBottom: '24px', lineHeight: '1.6' }}>Link reset password ini sudah tidak berlaku, kedaluwarsa, atau sudah pernah digunakan.</p>
          <Link to="/lupa-password" className={styles.submitBtn} style={{ textDecoration: 'none' }}>
            Minta Link Baru
          </Link>
        </div>
      </div>
    );
  }

  // State: Success
  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.ambTeal} />
        <div className={styles.card}>
          <div className={styles.successBox}>
            <CheckCircle size={40} color="#4ADE80" />
            <h3>Password Diperbarui!</h3>
            <p>Sandi kamu berhasil diubah. Silakan login menggunakan password barumu.</p>
            <Link to="/login" className={styles.backBtn} style={{ marginTop: '16px' }}>
              Masuk Sekarang
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // State: Form New Password
  return (
    <div className={styles.page}>
      <div className={styles.ambOrange} />
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <div className={styles.flameIcon}><Flame size={24} color="#fff" /></div>
          <h2>Buat Sandi Baru</h2>
          <p>Masukkan password baru untuk akunmu</p>
        </div>

        <form onSubmit={handleSavePassword} className={styles.form}>
          {error && (
            <div style={{ padding: '10px', background: 'rgba(248,113,113,0.1)', color: '#F87171', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <div className={styles.inputGroup}>
            <label>Sandi Baru</label>
            <div className={styles.inputWrapper}>
              <Lock size={17} className={styles.inputIcon} />
              <input
                type="password"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Ulangi Sandi Baru</label>
            <div className={styles.inputWrapper}>
              <Lock size={17} className={styles.inputIcon} />
              <input
                type="password"
                placeholder="Ketik ulang sandi"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className={`${styles.submitBtn} ${isLoading ? styles.btnDisabled : ''}`} disabled={isLoading}>
            {isLoading ? <Loader2 size={18} className={styles.spin} /> : 'Simpan Password'}
            {!isLoading && <ArrowRight size={17} />}
          </button>
        </form>
      </div>
    </div>
  );
}
