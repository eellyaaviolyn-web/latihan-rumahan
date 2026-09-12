import React from 'react';
import { Link } from 'react-router-dom';
import { workouts, jadwalMingguan } from '../data/workouts';
import { Calendar, Coffee, CheckCircle, Flame, Droplets, Moon, ChevronRight } from 'lucide-react';
import styles from './Jadwal.module.css';

const DAY_ACCENT = {
  Senin:   '#FF5500', Selasa: '#818CF8', Rabu:   '#4ADE80',
  Kamis:   '#F59E0B', Jumat:  '#00F2FE', Sabtu:  '#F87171',
  Minggu:  '#A78BFA'
};

const TIPS = [
  { icon: <Flame size={20} color="#FF5500" />, title: 'Pemanasan Wajib', text: 'Lakukan pemanasan 5–10 menit sebelum latihan untuk mencegah cedera.' },
  { icon: <Droplets size={20} color="#00F2FE" />, title: 'Hidrasi Optimal', text: 'Minum air putih yang cukup sebelum, saat, dan setelah berolahraga.' },
  { icon: <Moon size={20} color="#818CF8" />, title: 'Istirahat Cukup', text: 'Tidur 7–8 jam sehari agar otot pulih dan performa meningkat.' },
  { icon: <CheckCircle size={20} color="#4ADE80" />, title: 'Dengarkan Tubuh', text: 'Hentikan latihan jika merasakan nyeri berlebihan atau kelelahan ekstrem.' },
];

export default function Jadwal() {
  const doneCount = jadwalMingguan.filter(d => !d.istirahat).length;
  const totalCount = jadwalMingguan.length;
  const pct = Math.round((doneCount / totalCount) * 100);

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroInner}>
          <span className="eyebrow-label"><Calendar size={13} /> Jadwal Mingguan</span>
          <h1 className={styles.title}>
            Rencana Latihan<br />
            <span className={styles.titleGrad}>Minggu Ini</span>
          </h1>
          <p className={styles.sub}>Rekomendasi jadwal terstruktur untuk hasil optimal — konsisten adalah kuncinya.</p>

          {/* Weekly progress */}
          <div className={styles.weekProgress}>
            <div className={styles.weekProgressHead}>
              <span>Progress Minggu Ini</span>
              <span className={styles.weekPct}><Flame size={14} color="#FF5500" /> {doneCount}/{totalCount} hari aktif</span>
            </div>
            <div className={styles.weekBar}>
              <div className={styles.weekBarFill} style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Day Cards ── */}
      <section className={styles.calSection}>
        <div className={styles.calGrid}>
          {jadwalMingguan.map((day) => {
            const accent = DAY_ACCENT[day.hari] || '#FF5500';
            return (
              <div key={day.hari} className={`${styles.dayCard} ${day.istirahat ? styles.restCard : ''}`}
                style={{ '--accent': accent }}>

                {/* Day header */}
                <div className={styles.dayHeader}>
                  <span className={styles.dayName}>{day.hari}</span>
                  {day.istirahat
                    ? <span className={styles.restTag}>😴 Istirahat</span>
                    : <span className={styles.activeTag} style={{ color: accent, borderColor: `${accent}40`, background: `${accent}15` }}>Latihan</span>
                  }
                </div>

                <div className={styles.dayFocus} style={{ color: day.istirahat ? '#64748B' : accent }}>
                  {day.fokus}
                </div>

                {day.istirahat ? (
                  <div className={styles.restContent}>
                    <Coffee size={32} color="#475569" />
                    <p>Hari pemulihan aktif — stretching ringan dianjurkan</p>
                  </div>
                ) : (
                  <div className={styles.workoutList}>
                    {day.latihan.map((id) => {
                      const w = workouts.find((x) => x.id === id);
                      if (!w) return null;
                      return (
                        <Link key={w.id} to={`/detail/${w.id}`} className={styles.workoutItem}>
                          <span className={styles.wEmoji}>{w.emoji}</span>
                          <div className={styles.wInfo}>
                            <span className={styles.wName}>{w.nama}</span>
                            <span className={styles.wLevel}>{w.level}</span>
                          </div>
                          <ChevronRight size={16} color="#475569" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Tips ── */}
      <section className={styles.tipsSection}>
        <div className={styles.tipsInner}>
          <span className="eyebrow-label">Tips & Panduan</span>
          <h2 className={styles.tipsTitle}>Tips untuk Latihan Maksimal</h2>
          <div className={styles.tipsGrid}>
            {TIPS.map(tip => (
              <div key={tip.title} className={styles.tipCard}>
                <div className={styles.tipIcon}>{tip.icon}</div>
                <h4>{tip.title}</h4>
                <p>{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
