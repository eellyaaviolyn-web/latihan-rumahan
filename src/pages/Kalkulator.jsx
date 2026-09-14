import React, { useState } from 'react';
import { Calculator, Activity, ChevronDown } from 'lucide-react';
import styles from './Kalkulator.module.css';

const ACTIVITY_LEVELS = [
  { label: 'Tidak Aktif (jarang olahraga)',       factor: 1.2   },
  { label: 'Ringan (olahraga 1-3x/minggu)',        factor: 1.375 },
  { label: 'Sedang (olahraga 3-5x/minggu)',        factor: 1.55  },
  { label: 'Aktif (olahraga berat 6-7x/minggu)',   factor: 1.725 },
  { label: 'Sangat Aktif (atlet / kerja fisik berat)', factor: 1.9 },
];

function getBMICategory(bmi) {
  if (bmi < 18.5) return { label: 'Kekurangan Berat',  color: '#00F2FE', emoji: '⚠️' };
  if (bmi < 25)   return { label: 'Berat Badan Normal', color: '#4ADE80', emoji: '✅' };
  if (bmi < 30)   return { label: 'Kelebihan Berat',   color: '#FBBF24', emoji: '⚡' };
  return            { label: 'Obesitas',                color: '#F87171', emoji: '🔴' };
}

export default function Kalkulator() {
  const [tab, setTab] = useState('bmi');

  // BMI state
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  // TDEE state
  const [gender, setGender] = useState('pria');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState(0);
  const [goal, setGoal] = useState('maintain');
  const [tdeeResult, setTdeeResult] = useState(null);

  const calcBMI = (e) => {
    e.preventDefault();
    const h = parseFloat(bmiHeight) / 100;
    const w = parseFloat(bmiWeight);
    const bmi = w / (h * h);
    setBmiResult(bmi.toFixed(1));
  };

  const calcTDEE = (e) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age);
    // Mifflin-St Jeor Equation
    const bmr = gender === 'pria'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * ACTIVITY_LEVELS[activity].factor;
    let target = tdee;
    if (goal === 'turun') target = tdee - 500;
    if (goal === 'naik')  target = tdee + 300;
    setTdeeResult({ tdee: Math.round(tdee), target: Math.round(target) });
  };

  const bmiCat = bmiResult ? getBMICategory(parseFloat(bmiResult)) : null;
  const bmiPercent = bmiResult
    ? Math.min(100, Math.max(0, ((parseFloat(bmiResult) - 10) / (45 - 10)) * 100))
    : 0;

  return (
    <div className={styles.page}>
      {/* Ambient glow */}
      <div className={styles.glowOrange} />
      <div className={styles.glowTeal} />

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>🧮 Tools Gratis</span>
        <h1 className={styles.title}>Kalkulator Kebugaran</h1>
        <p className={styles.subtitle}>Hitung BMI dan kebutuhan kalori harian kamu secara akurat</p>
      </div>

      {/* Tab Switcher */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'bmi' ? styles.tabActive : ''}`}
          onClick={() => setTab('bmi')}>
          <Calculator size={18} /> Kalkulator BMI
        </button>
        <button
          className={`${styles.tab} ${tab === 'tdee' ? styles.tabActive : ''}`}
          onClick={() => setTab('tdee')}>
          <Activity size={18} /> Kalori Harian (TDEE)
        </button>
      </div>

      <div className={styles.content}>

        {/* ─── TAB BMI ─── */}
        {tab === 'bmi' && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Indeks Massa Tubuh (BMI)</h2>
            <p className={styles.cardDesc}>BMI adalah ukuran lemak tubuh berdasarkan tinggi dan berat badan.</p>

            <form onSubmit={calcBMI} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Tinggi Badan</label>
                  <div className={styles.inputWrapper}>
                    <input type="number" placeholder="170" value={bmiHeight}
                      onChange={e => setBmiHeight(e.target.value)} required min="100" max="250" />
                    <span className={styles.unit}>cm</span>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Berat Badan</label>
                  <div className={styles.inputWrapper}>
                    <input type="number" placeholder="65" value={bmiWeight}
                      onChange={e => setBmiWeight(e.target.value)} required min="20" max="300" />
                    <span className={styles.unit}>kg</span>
                  </div>
                </div>
              </div>
              <button type="submit" className={styles.calcBtn}>Hitung BMI</button>
            </form>

            {bmiResult && (
              <div className={styles.result}>
                <div className={styles.bmiNumber} style={{ color: bmiCat.color }}>
                  {bmiResult}
                </div>
                <div className={styles.bmiCategory}>
                  {bmiCat.emoji} {bmiCat.label}
                </div>

                {/* BMI Bar */}
                <div className={styles.bmiBar}>
                  <div className={styles.bmiBarFill} style={{ width: `${bmiPercent}%`, background: bmiCat.color }} />
                  <div className={styles.bmiBarThumb} style={{ left: `${bmiPercent}%`, background: bmiCat.color }} />
                </div>
                <div className={styles.bmiScale}>
                  <span style={{ color: '#00F2FE' }}>Kurus &lt;18.5</span>
                  <span style={{ color: '#4ADE80' }}>Normal 18.5-24.9</span>
                  <span style={{ color: '#FBBF24' }}>Gemuk 25-29.9</span>
                  <span style={{ color: '#F87171' }}>Obesitas &ge;30</span>
                </div>

                <div className={styles.bmiTips}>
                  {parseFloat(bmiResult) < 18.5 && <p>💡 Tingkatkan asupan kalori dengan makanan bergizi. Konsultasikan dengan ahli gizi.</p>}
                  {parseFloat(bmiResult) >= 18.5 && parseFloat(bmiResult) < 25 && <p>💪 BMI kamu ideal! Pertahankan pola makan sehat dan rutin olahraga.</p>}
                  {parseFloat(bmiResult) >= 25 && parseFloat(bmiResult) < 30 && <p>🔥 Kurangi asupan kalori 300-500 kal/hari dan tingkatkan aktivitas fisik.</p>}
                  {parseFloat(bmiResult) >= 30 && <p>⚕️ Disarankan konsultasi dokter untuk program penurunan berat badan yang aman.</p>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB TDEE ─── */}
        {tab === 'tdee' && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Total Daily Energy Expenditure (TDEE)</h2>
            <p className={styles.cardDesc}>Hitung berapa kalori yang kamu butuhkan per hari berdasarkan aktivitasmu.</p>

            <form onSubmit={calcTDEE} className={styles.form}>
              {/* Gender */}
              <div className={styles.genderRow}>
                <button type="button"
                  className={`${styles.genderBtn} ${gender === 'pria' ? styles.genderActive : ''}`}
                  onClick={() => setGender('pria')}>👨 Pria</button>
                <button type="button"
                  className={`${styles.genderBtn} ${gender === 'wanita' ? styles.genderActive : ''}`}
                  onClick={() => setGender('wanita')}>👩 Wanita</button>
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Umur</label>
                  <div className={styles.inputWrapper}>
                    <input type="number" placeholder="22" value={age}
                      onChange={e => setAge(e.target.value)} required min="10" max="100" />
                    <span className={styles.unit}>thn</span>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Tinggi Badan</label>
                  <div className={styles.inputWrapper}>
                    <input type="number" placeholder="170" value={height}
                      onChange={e => setHeight(e.target.value)} required min="100" max="250" />
                    <span className={styles.unit}>cm</span>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Berat Badan</label>
                  <div className={styles.inputWrapper}>
                    <input type="number" placeholder="65" value={weight}
                      onChange={e => setWeight(e.target.value)} required min="20" max="300" />
                    <span className={styles.unit}>kg</span>
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Tingkat Aktivitas</label>
                <div className={styles.selectWrapper}>
                  <select value={activity} onChange={e => setActivity(parseInt(e.target.value))}>
                    {ACTIVITY_LEVELS.map((a, i) => (
                      <option key={i} value={i}>{a.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className={styles.selectIcon} />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Tujuan</label>
                <div className={styles.goalRow}>
                  {[
                    { val: 'turun', label: '⬇️ Turun Berat' },
                    { val: 'maintain', label: '⚖️ Maintain' },
                    { val: 'naik', label: '⬆️ Naik Berat' },
                  ].map(g => (
                    <button type="button" key={g.val}
                      className={`${styles.goalBtn} ${goal === g.val ? styles.goalActive : ''}`}
                      onClick={() => setGoal(g.val)}>{g.label}</button>
                  ))}
                </div>
              </div>

              <button type="submit" className={styles.calcBtn}>Hitung Kalori</button>
            </form>

            {tdeeResult && (
              <div className={styles.result}>
                <div className={styles.tdeeGrid}>
                  <div className={styles.tdeeBox}>
                    <span className={styles.tdeeLabel}>TDEE Kamu</span>
                    <span className={styles.tdeeNum}>{tdeeResult.tdee.toLocaleString()}</span>
                    <span className={styles.tdeeUnit}>kal/hari</span>
                  </div>
                  <div className={`${styles.tdeeBox} ${styles.tdeeTarget}`}>
                    <span className={styles.tdeeLabel}>
                      {goal === 'turun' ? '🔥 Target (Defisit)' : goal === 'naik' ? '💪 Target (Surplus)' : '⚖️ Target (Maintenance)'}
                    </span>
                    <span className={styles.tdeeNum} style={{ color: goal === 'turun' ? '#F87171' : goal === 'naik' ? '#4ADE80' : '#FBBF24' }}>
                      {tdeeResult.target.toLocaleString()}
                    </span>
                    <span className={styles.tdeeUnit}>kal/hari</span>
                  </div>
                </div>
                <div className={styles.bmiTips}>
                  {goal === 'turun' && <p>🔥 Kamu perlu defisit 500 kal/hari untuk menurunkan ±0.5kg per minggu. Fokus ke protein dan sayuran!</p>}
                  {goal === 'maintain' && <p>⚖️ Pertahankan angka ini setiap hari dengan makanan seimbang dan olahraga rutin.</p>}
                  {goal === 'naik' && <p>💪 Surplus 300 kal/hari untuk menaikkan otot secara bersih (lean bulk). Prioritaskan latihan beban!</p>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
