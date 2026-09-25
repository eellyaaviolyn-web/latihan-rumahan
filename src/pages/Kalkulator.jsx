import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Activity, ChevronDown, PieChart, Zap, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './Kalkulator.module.css';

const ACTIVITY_LEVELS = [
  { label: 'Tidak Aktif (jarang olahraga)',       factor: 1.2   },
  { label: 'Ringan (olahraga 1-3x/minggu)',        factor: 1.375 },
  { label: 'Sedang (olahraga 3-5x/minggu)',        factor: 1.55  },
  { label: 'Aktif (olahraga berat 6-7x/minggu)',   factor: 1.725 },
  { label: 'Sangat Aktif (atlet / kerja fisik berat)', factor: 1.9 },
];

function getBMICategory(bmi) {
  if (bmi < 18.5) return { label: 'Kekurangan Berat',  color: '#06b6d4', emoji: '⚠️' };
  if (bmi < 25)   return { label: 'Berat Badan Normal', color: '#10b981', emoji: '✅' };
  if (bmi < 30)   return { label: 'Kelebihan Berat',   color: '#f59e0b', emoji: '⚡' };
  return            { label: 'Obesitas',                color: '#ef4444', emoji: '🔴' };
}

export default function Kalkulator() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tdee');

  // BMI state
  const [bmiHeight, setBmiHeight] = useState('172');
  const [bmiWeight, setBmiWeight] = useState('68');
  const [bmiResult, setBmiResult] = useState(null);

  // TDEE & Macro state
  const [gender, setGender] = useState('pria');
  const [age, setAge] = useState('24');
  const [height, setHeight] = useState('172');
  const [weight, setWeight] = useState('68');
  const [activity, setActivity] = useState(2);
  const [goal, setGoal] = useState('maintain'); // 'turun', 'maintain', 'naik'
  const [tdeeResult, setTdeeResult] = useState(null);
  const [macroResult, setMacroResult] = useState(null);

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
    if (goal === 'naik')  target = tdee + 350;

    const targetCal = Math.round(target);

    // PRD Macro Nutrition Algorithm
    // Protein: 2.0g/kg (turun: 2.2g, maintain: 1.8g, naik: 2.0g)
    const proteinPerKg = goal === 'turun' ? 2.2 : goal === 'naik' ? 2.0 : 1.8;
    const proteinGrams = Math.round(w * proteinPerKg);
    const proteinCal = proteinGrams * 4;

    // Fat: 0.8g/kg bodyweight
    const fatGrams = Math.round(w * 0.85);
    const fatCal = fatGrams * 9;

    // Carbs: Sisa kalori
    const carbCal = Math.max(0, targetCal - proteinCal - fatCal);
    const carbGrams = Math.round(carbCal / 4);

    const proteinPct = Math.round((proteinCal / targetCal) * 100);
    const fatPct = Math.round((fatCal / targetCal) * 100);
    const carbPct = Math.max(0, 100 - proteinPct - fatPct);

    setTdeeResult({ tdee: Math.round(tdee), target: targetCal });
    setMacroResult({
      protein: { grams: proteinGrams, cal: proteinCal, pct: proteinPct },
      fat: { grams: fatGrams, cal: fatCal, pct: fatPct },
      carb: { grams: carbGrams, cal: carbCal, pct: carbPct }
    });
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
        <span className={styles.eyebrow}>⚡ AI Metrik & Nutrisi</span>
        <h1 className={styles.title}>AI Fitness & Macro Calculator</h1>
        <p className={styles.subtitle}>
          Hitung TDEE presisi, distribusi makronutrien gram, dan rekomendasi program latihan FitLife.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'tdee' ? styles.tabActive : ''}`}
          onClick={() => setTab('tdee')}>
          <Activity size={18} /> Kalori Harian & Makro AI
        </button>
        <button
          className={`${styles.tab} ${tab === 'bmi' ? styles.tabActive : ''}`}
          onClick={() => setTab('bmi')}>
          <Calculator size={18} /> Kalkulator BMI
        </button>
      </div>

      <div className={styles.content}>

        {/* ─── TAB TDEE & MACRO (PRIMARY) ─── */}
        {tab === 'tdee' && (
          <div className={styles.card}>
            <div className={styles.cardHeaderBox}>
              <h2 className={styles.cardTitle}>Total Daily Energy & Macro Engine</h2>
              <span className={styles.engineBadge}>Mifflin-St Jeor Algoritma</span>
            </div>
            <p className={styles.cardDesc}>
              Analisis kebutuhan metabolisme basal (BMR), pengeluaran energi harian (TDEE), dan rasio Protein-Karbo-Lemak.
            </p>

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
                    <input type="number" placeholder="24" value={age}
                      onChange={e => setAge(e.target.value)} required min="10" max="100" />
                    <span className={styles.unit}>thn</span>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Tinggi Badan</label>
                  <div className={styles.inputWrapper}>
                    <input type="number" placeholder="172" value={height}
                      onChange={e => setHeight(e.target.value)} required min="100" max="250" />
                    <span className={styles.unit}>cm</span>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Berat Badan</label>
                  <div className={styles.inputWrapper}>
                    <input type="number" placeholder="68" value={weight}
                      onChange={e => setWeight(e.target.value)} required min="20" max="300" />
                    <span className={styles.unit}>kg</span>
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Tingkat Aktivitas Harian</label>
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
                <label>Tujuan Kebugaran</label>
                <div className={styles.goalRow}>
                  {[
                    { val: 'turun', label: '🔥 Fat Loss (Defisit)' },
                    { val: 'maintain', label: '⚖️ Recomposition (Maintenance)' },
                    { val: 'naik', label: '💪 Lean Bulking (Surplus)' },
                  ].map(g => (
                    <button type="button" key={g.val}
                      className={`${styles.goalBtn} ${goal === g.val ? styles.goalActive : ''}`}
                      onClick={() => setGoal(g.val)}>{g.label}</button>
                  ))}
                </div>
              </div>

              <button type="submit" className={styles.calcBtn}>
                Analisis Kebutuhan Kalori & Makro Nutrisi ✨
              </button>
            </form>

            {tdeeResult && macroResult && (
              <div className={styles.result}>
                {/* Total Energy Telemetry */}
                <div className={styles.tdeeGrid}>
                  <div className={styles.tdeeBox}>
                    <span className={styles.tdeeLabel}>BMR / TDEE Maintenance</span>
                    <span className={styles.tdeeNum}>{tdeeResult.tdee.toLocaleString()}</span>
                    <span className={styles.tdeeUnit}>kkal / hari</span>
                  </div>
                  <div className={`${styles.tdeeBox} ${styles.tdeeTarget}`}>
                    <span className={styles.tdeeLabel}>
                      {goal === 'turun' ? '🔥 Target Kalori (Defisit)' : goal === 'naik' ? '💪 Target Kalori (Lean Bulk)' : '⚖️ Target Kalori (Maintenance)'}
                    </span>
                    <span className={styles.tdeeNum} style={{ color: goal === 'turun' ? '#06b6d4' : goal === 'naik' ? '#10b981' : '#f59e0b' }}>
                      {tdeeResult.target.toLocaleString()}
                    </span>
                    <span className={styles.tdeeUnit}>kkal / hari</span>
                  </div>
                </div>

                {/* Macro Nutrition Distribution (PRD 4.4) */}
                <h3 className={styles.macroHeading}>
                  <PieChart size={18} color="#10b981" />
                  Distribusi Makronutrien Harian Terkalkulasi
                </h3>

                <div className={styles.macroCardsGrid}>
                  {/* Protein */}
                  <div className={styles.macroCard} style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                    <div className={styles.macroTop}>
                      <span className={styles.macroType}>PROTEIN</span>
                      <span className={styles.macroPctBadge} style={{ color: '#10b981', background: 'rgba(16,185,129,0.12)' }}>
                        {macroResult.protein.pct}%
                      </span>
                    </div>
                    <div className={styles.macroGrams} style={{ color: '#10b981' }}>
                      {macroResult.protein.grams} <sub>gram</sub>
                    </div>
                    <span className={styles.macroCal}>{macroResult.protein.cal} kkal • Pertumbuhan & Sintesis Otot</span>
                  </div>

                  {/* Carbs */}
                  <div className={styles.macroCard} style={{ borderColor: 'rgba(6, 182, 212, 0.3)' }}>
                    <div className={styles.macroTop}>
                      <span className={styles.macroType}>KARBOHIDRAT</span>
                      <span className={styles.macroPctBadge} style={{ color: '#06b6d4', background: 'rgba(6,182,212,0.12)' }}>
                        {macroResult.carb.pct}%
                      </span>
                    </div>
                    <div className={styles.macroGrams} style={{ color: '#06b6d4' }}>
                      {macroResult.carb.grams} <sub>gram</sub>
                    </div>
                    <span className={styles.macroCal}>{macroResult.carb.cal} kkal • Energi Utama Glikogen</span>
                  </div>

                  {/* Fats */}
                  <div className={styles.macroCard} style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                    <div className={styles.macroTop}>
                      <span className={styles.macroType}>LEMAK SEHAT</span>
                      <span className={styles.macroPctBadge} style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.12)' }}>
                        {macroResult.fat.pct}%
                      </span>
                    </div>
                    <div className={styles.macroGrams} style={{ color: '#f59e0b' }}>
                      {macroResult.fat.grams} <sub>gram</sub>
                    </div>
                    <span className={styles.macroCal}>{macroResult.fat.cal} kkal • Regulasi Hormon & Sendi</span>
                  </div>
                </div>

                {/* Direct CTA to AI Workout Studio */}
                <div className={styles.programMatchBox}>
                  <div className={styles.matchLeft}>
                    <Zap size={22} color="#10b981" />
                    <div>
                      <h4>Rekomendasi Program: Squat Masterclass & Kinetic HIIT</h4>
                      <p>Cocok untuk target metabolik <strong>{goal}</strong> dengan target pembakaran 300–450 kkal per sesi.</p>
                    </div>
                  </div>
                  <button onClick={() => navigate('/ai-studio')} className={styles.matchCtaBtn}>
                    <span>Buka di AI Studio HUD</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB BMI ─── */}
        {tab === 'bmi' && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Indeks Massa Tubuh (BMI)</h2>
            <p className={styles.cardDesc}>BMI adalah rasio estimasi massa tubuh berdasarkan tinggi dan berat badan.</p>

            <form onSubmit={calcBMI} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Tinggi Badan</label>
                  <div className={styles.inputWrapper}>
                    <input type="number" placeholder="172" value={bmiHeight}
                      onChange={e => setBmiHeight(e.target.value)} required min="100" max="250" />
                    <span className={styles.unit}>cm</span>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Berat Badan</label>
                  <div className={styles.inputWrapper}>
                    <input type="number" placeholder="68" value={bmiWeight}
                      onChange={e => setBmiWeight(e.target.value)} required min="20" max="300" />
                    <span className={styles.unit}>kg</span>
                  </div>
                </div>
              </div>
              <button type="submit" className={styles.calcBtn}>Hitung Skor BMI</button>
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
                  <span style={{ color: '#06b6d4' }}>Kurus &lt;18.5</span>
                  <span style={{ color: '#10b981' }}>Normal 18.5-24.9</span>
                  <span style={{ color: '#f59e0b' }}>Kelebihan 25-29.9</span>
                  <span style={{ color: '#ef4444' }}>Obesitas &ge;30</span>
                </div>

                <div className={styles.bmiTips}>
                  {parseFloat(bmiResult) < 18.5 && <p>💡 Tingkatkan asupan kalori bernutrisi tinggi (surplus +300 kkal). Fokus latihan beban hipertrofi.</p>}
                  {parseFloat(bmiResult) >= 18.5 && parseFloat(bmiResult) < 25 && <p>💪 Komposisi tubuh kamu prima! Pertahankan konsistensi latihan 3–4x seminggu di AI Studio.</p>}
                  {parseFloat(bmiResult) >= 25 && parseFloat(bmiResult) < 30 && <p>🔥 Terapkan defisit kalori moderat 300–500 kkal/hari disertai latihan kardio HIIT FitLife.</p>}
                  {parseFloat(bmiResult) >= 30 && <p>⚕️ Mulai dengan latihan low-impact seperti mobility dan jalan cepat, serta konsultasikan pola makan.</p>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
