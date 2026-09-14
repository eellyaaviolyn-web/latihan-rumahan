import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Mail, ArrowRight, Loader2, CheckCircle, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useToast } from '../components/Toast';
import styles from './ForgotPassword.module.css';

const EMAILJS_SERVICE  = 'service_1ex4sqn';
const EMAILJS_TEMPLATE = 'template_zg3j5br';
const EMAILJS_PUBLIC   = '3ITqVBk8h3_op6zUL';
const RESEND_COOLDOWN  = 60;

export default function ForgotPassword() {
  const toast = useToast();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Countdown timer resend
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef(null);

  const startCountdown = () => {
    setCountdown(RESEND_COOLDOWN);
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // ── STEP 1: Kirim Kode OTP ──
  const sendCode = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    setError('');

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);

    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        to_email: email,
        otp_code: code,
        passcode: code,
      }, EMAILJS_PUBLIC);

      toast('Kode OTP berhasil dikirim ke emailmu! 📧', 'success');
      startCountdown();
      setStep(2);
    } catch (err) {
      console.error(err);
      setError('Gagal mengirim email. Pastikan email benar & coba lagi.');
      toast('Gagal mengirim email. Coba lagi!', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend dari Step 2
  const handleResend = async () => {
    if (countdown > 0) return;
    setIsLoading(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setOtp(['', '', '', '', '', '']);
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        to_email: email,
        otp_code: code,
        passcode: code,
      }, EMAILJS_PUBLIC);
      toast('Kode baru sudah dikirim ulang! 📧', 'success');
      startCountdown();
    } catch {
      toast('Gagal kirim ulang. Coba lagi.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // ── STEP 2: Input OTP ──
  const handleChangeOtp = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs[index + 1].current?.focus();
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered === generatedCode) {
      setError('');
      toast('Kode OTP cocok! Buat password baru. 🔐', 'success');
      setStep(3);
    } else {
      setError('Kode OTP salah atau tidak cocok!');
      toast('Kode salah! Coba cek lagi.', 'error');
    }
  };

  // ── STEP 3: Simpan Password Baru ──
  const handleSavePassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('fitlife_user', JSON.stringify({ name: email.split('@')[0], email }));
      setIsLoading(false);
      toast('Sandi berhasil diperbarui! 🎉', 'success');
      setStep(4);
    }, 1200);
  };

  return (
    <div className={styles.page}>
      <div className={styles.ambOrange} />
      <div className={styles.ambTeal} />

      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <div className={styles.flameIcon}><Flame size={24} color="#fff" /></div>
          {step === 1 && <><h2>Lupa Password</h2><p>Masukkan email yang terdaftar pada akunmu</p></>}
          {step === 2 && <><h2>Verifikasi Kode</h2><p>Masukkan 6 digit kode yang dikirim ke <strong>{email}</strong></p></>}
          {step === 3 && <><h2>Buat Sandi Baru</h2><p>Masukkan sandi baru yang kuat untuk akunmu</p></>}
        </div>

        {error && step !== 4 && (
          <div className={styles.errorBox}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <form onSubmit={sendCode} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Email Terdaftar</label>
              <div className={styles.inputWrapper}>
                <Mail size={17} className={styles.inputIcon} />
                <input type="email" placeholder="nama@email.com" value={email}
                  onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className={`${styles.submitBtn} ${isLoading ? styles.btnDisabled : ''}`} disabled={isLoading}>
              {isLoading ? <Loader2 size={18} className={styles.spin} /> : 'Kirim Kode OTP'}
              {!isLoading && <ArrowRight size={17} />}
            </button>
          </form>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className={styles.form}>
            <div className={styles.otpContainer}>
              {otp.map((digit, index) => (
                <input key={index} ref={inputRefs[index]}
                  type="text" maxLength="1" className={styles.otpInput}
                  value={digit}
                  onChange={(e) => handleChangeOtp(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !digit && index > 0)
                      inputRefs[index - 1].current?.focus();
                  }}
                  required
                />
              ))}
            </div>

            <button type="submit" className={styles.submitBtn}>
              Verifikasi Kode
            </button>

            <div className={styles.resendRow}>
              {countdown > 0 ? (
                <span className={styles.countdownTxt}>
                  Kirim ulang dalam <strong>{countdown}s</strong>
                </span>
              ) : (
                <button type="button" onClick={handleResend}
                  className={styles.resendBtn} disabled={isLoading}>
                  {isLoading ? 'Mengirim...' : 'Kirim Ulang Kode'}
                </button>
              )}
            </div>
          </form>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <form onSubmit={handleSavePassword} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Sandi Baru</label>
              <div className={styles.inputWrapper}>
                <Lock size={17} className={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 6 karakter"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
                <button type="button" className={styles.eyeBtn}
                  onClick={() => setShowPassword(p => !p)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className={`${styles.submitBtn} ${isLoading ? styles.btnDisabled : ''}`} disabled={isLoading}>
              {isLoading ? <Loader2 size={18} className={styles.spin} /> : 'Simpan Sandi Baru'}
            </button>
          </form>
        )}

        {/* ── STEP 4: SUCCESS ── */}
        {step === 4 && (
          <div className={styles.successBox}>
            <CheckCircle size={44} color="#4ADE80" />
            <h3>Sandi Berhasil Diubah!</h3>
            <p>Kamu sudah otomatis masuk ke akun. Lanjut latihan sekarang!</p>
            <button onClick={() => window.location.href = '/program'} className={styles.backBtn}>
              Lanjut ke Program 🏋️
            </button>
          </div>
        )}

        {step === 1 && (
          <p className={styles.backTxt}>
            Ingat password? <Link to="/login">Masuk di sini</Link>
          </p>
        )}
      </div>
    </div>
  );
}
