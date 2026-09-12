import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Mail, ArrowRight, Loader2, CheckCircle, Lock, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import styles from './ForgotPassword.module.css';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Pass, 4: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // STEP 1: Kirim Kode OTP
  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Bikin 6 digit angka acak
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);

    // KUNCI EMAILJS (Silakan isi jika sudah punya akun EmailJS)
    const serviceId = 'SERVICE_ID_KAMU'; 
    const templateId = 'TEMPLATE_ID_KAMU';
    const publicKey = 'PUBLIC_KEY_KAMU';

    try {
      if (serviceId === 'SERVICE_ID_KAMU') {
        // SIMULASI (Karena belum ada EmailJS)
        console.log("KODE OTP SIMULASI:", code);
        alert(`[SIMULASI OTP]\n\nKarena EmailJS belum disetting, kode kamu adalah: ${code}\n\nMasukkan kode ini di kotak!`);
      } else {
        // MENGIRIM EMAIL ASLI DENGAN EMAILJS
        await emailjs.send(serviceId, templateId, {
          to_email: email,
          otp_code: code
        }, publicKey);
      }
      setStep(2);
    } catch (err) {
      console.error(err);
      setError('Gagal mengirim email. Periksa koneksi atau ID EmailJS.');
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: Ketik OTP
  const handleChangeOtp = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered === generatedCode) {
      setError('');
      setStep(3); // Lanjut buat password
    } else {
      setError('Kode OTP salah atau tidak cocok!');
    }
  };

  // STEP 3: Simpan Password Baru
  const handleSavePassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }
    setIsLoading(true);
    
    // Simulasi simpan ke database (karena ini frontend murni)
    setTimeout(() => {
      // Kita langsung loginkan user dengan password barunya
      localStorage.setItem('fitlife_user', JSON.stringify({ name: email.split('@')[0], email }));
      setIsLoading(false);
      setStep(4);
    }, 1500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.ambOrange} />
      <div className={styles.ambTeal} />

      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <div className={styles.flameIcon}><Flame size={24} color="#fff" /></div>
          
          {step === 1 && <h2>Lupa Password</h2>}
          {step === 2 && <h2>Verifikasi Kode</h2>}
          {step === 3 && <h2>Buat Sandi Baru</h2>}
          {step === 4 && <div style={{display:'none'}}></div>}
          
          {step === 1 && <p>Masukkan email yang terdaftar pada akunmu</p>}
          {step === 2 && <p>Masukkan 6 digit kode yang dikirim ke <strong>{email}</strong></p>}
          {step === 3 && <p>Masukkan sandi baru untuk <strong>{email}</strong></p>}
        </div>

        {error && step !== 4 && (
          <div style={{ padding: '10px', background: 'rgba(248,113,113,0.1)', color: '#F87171', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* ================= STEP 1: INPUT EMAIL ================= */}
        {step === 1 && (
          <form onSubmit={handleSendCode} className={styles.form}>
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
              {isLoading ? <Loader2 size={18} className={styles.spin} /> : 'Kirim Kode OTP'}
              {!isLoading && <ArrowRight size={17} />}
            </button>
          </form>
        )}

        {/* ================= STEP 2: INPUT OTP ================= */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className={styles.form}>
            <div className={styles.otpContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength="1"
                  className={styles.otpInput}
                  value={digit}
                  onChange={(e) => handleChangeOtp(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !digit && index > 0) {
                      inputRefs[index - 1].current.focus();
                    }
                  }}
                  required
                />
              ))}
            </div>
            <button type="submit" className={styles.submitBtn}>
              Verifikasi Kode
            </button>
            <p className={styles.backTxt} style={{marginTop: '10px'}}>
              Tidak menerima kode? <button type="button" onClick={handleSendCode} style={{background:'transparent', border:'none', color:'#FF5500', fontWeight:700, cursor:'pointer'}}>Kirim Ulang</button>
            </p>
          </form>
        )}

        {/* ================= STEP 3: NEW PASSWORD ================= */}
        {step === 3 && (
          <form onSubmit={handleSavePassword} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Sandi Baru</label>
              <div className={styles.inputWrapper}>
                <Lock size={17} className={styles.inputIcon} />
                <input
                  type="password"
                  placeholder="Minimal 6 karakter"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className={`${styles.submitBtn} ${isLoading ? styles.btnDisabled : ''}`} disabled={isLoading}>
              {isLoading ? <Loader2 size={18} className={styles.spin} /> : 'Simpan Sandi Baru'}
            </button>
          </form>
        )}

        {/* ================= STEP 4: SUCCESS ================= */}
        {step === 4 && (
          <div className={styles.successBox}>
            <CheckCircle size={40} color="#4ADE80" />
            <h3 style={{fontSize: '1.3rem', color: '#4ADE80', fontWeight: 800, marginTop: '10px'}}>Sandi Berhasil Diubah!</h3>
            <p style={{color: '#94A3B8', fontSize: '0.9rem', textAlign: 'center', lineHeight: '1.6'}}>Sandi kamu berhasil diperbarui dan kamu sudah otomatis login ke dalam sistem.</p>
            <button onClick={() => window.location.href = '/program'} className={styles.backBtn} style={{marginTop: '16px'}}>
              Lanjut ke Program
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
