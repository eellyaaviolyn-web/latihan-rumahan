import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { workouts, jadwalMingguan } from '../data/workouts';
import { Calendar, Coffee, CheckCircle, Flame, Droplets, Moon, ChevronRight, RotateCcw } from 'lucide-react';
import { useToast } from '../components/Toast';
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

const TODAY_KEY = `fitlife_tracker_${new Date().toISOString().split('T')[0]}`;

export default function Jadwal() {
  const toast = useToast();

  // Workout tracker dari localStorage
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(TODAY_KEY)) || {}; }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(TODAY_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggleCheck = (id) => {
    setChecked(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) toast('Latihan selesai! Lanjut terus! 🔥', 'success');
      else toast('Centang dibatalkan', 'info');
      return next;
    });
  };

  const resetTracker = () => {
    setChecked({});
    localStorage.removeItem(TODAY_KEY);
    toast('Progress hari ini direset', 'info');
  };

  // Hitung progress tracker hari ini
  const allWorkoutIds = jadwalMingguan
    .filter(d => !d.istirahat)
    .flatMap(d => d.latihan);
  const uniqueIds = [...new Set(allWorkoutIds)];
  const checkedCount = uniqueIds.filter(id => checked[id]).length;
  const trackerPct = uniqueIds.length > 0
    ? Math.round((checkedCount / uniqueIds.length) * 100)
    : 0;

  const activeCount = jadwalMingguan.filter(d => !d.istirahat).length;
  const totalCount = jadwalMingguan.length;
  const weekPct = Math.round((activeCount / totalCount) * 100);

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
              <span className={styles.weekPct}><Flame size={14} color="#FF5500" /> {activeCount}/{totalCount} hari aktif</span>
            </div>
            <div className={styles.weekBar}>
              <div className={styles.weekBarFill} style={{ width: `${weekPct}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Workout Tracker Banner ── */}
      <section className={styles.trackerSection}>
        <div className={styles.trackerCard}>
          <div className={styles.trackerLeft}>
            <div className={styles.trackerTitle}>
              <CheckCircle size={20} color="#4ADE80" />
              <span>Tracker Hari Ini</span>
            </div>
            <p className={styles.trackerSub}>
              {checkedCount === 0
                ? 'Belum ada latihan yang diselesaikan hari ini'
                : checkedCount === uniqueIds.length
                  ? '🎉 Semua latihan hari ini selesai!'
                  : `${checkedCount} dari ${uniqueIds.length} latihan selesai`}
            </p>
          </div>
          <div className={styles.trackerRight}>
            <div className={styles.trackerPctText} style={{ color: trackerPct === 100 ? '#4ADE80' : '#FF5500' }}>
              {trackerPct}%
            </div>
            <button onClick={resetTracker} className={styles.resetBtn} title="Reset progress hari ini">
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>
        <div className={styles.trackerBar}>
          <div className={styles.trackerFill}
            style={{ width: `${trackerPct}%`, background: trackerPct === 100 ? '#4ADE80' : 'linear-gradient(90deg, #FF5500, #FF2A00)' }} />
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
                      const isDone = !!checked[id];
                      return (
                        <div key={w.id} className={`${styles.workoutItem} ${isDone ? styles.workoutDone : ''}`}>
                          <button
                            className={`${styles.checkBtn} ${isDone ? styles.checkBtnDone : ''}`}
                            onClick={() => toggleCheck(id)}
                            title={isDone ? 'Batalkan' : 'Tandai selesai'}
                          >
                            <CheckCircle size={16} />
                          </button>
                          <span className={styles.wEmoji}>{w.emoji}</span>
                          <div className={styles.wInfo}>
                            <span className={`${styles.wName} ${isDone ? styles.wNameDone : ''}`}>{w.nama}</span>
                            <span className={styles.wLevel}>{w.level}</span>
                          </div>
                          <Link to={`/detail/${w.id}`} className={styles.wLink}>
                            <ChevronRight size={16} color="#475569" />
                          </Link>
                        </div>
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
