import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Timer from '../components/Timer';
import workouts from '../data/workouts';
import { ArrowLeft, Clock, Flame, Target, ListChecks, Zap, ChevronRight } from 'lucide-react';
import styles from './Detail.module.css';

const CATEGORY_COLORS = {
  kardio:    { from: '#FF5500', to: '#FF2A00' },
  kekuatan:  { from: '#818CF8', to: '#6366F1' },
  hiit:      { from: '#F59E0B', to: '#EF4444' },
  yoga:      { from: '#4ADE80', to: '#06B6D4' },
  fleksibilitas: { from: '#00F2FE', to: '#4ADE80' },
  default:   { from: '#FF5500', to: '#FF2A00' },
};

const LEVEL_COLORS = {
  pemula:   { color: '#4ADE80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.3)' },
  menengah: { color: '#FBBF24', bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.3)' },
  lanjutan: { color: '#F87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.3)' },
};

export default function Detail() {
  const { id } = useParams();
  const workout = workouts.find((item) => item.id === parseInt(id, 10));
  const [doneSteps, setDoneSteps] = useState([]);

  if (!workout) {
    return (
      <div className={styles.notFoundPage}>
        <span className={styles.notFoundEmoji}>🔍</span>
        <h2>Latihan Tidak Ditemukan</h2>
        <p>Latihan yang kamu cari tidak tersedia atau telah dihapus.</p>
        <Link to="/program" className={styles.backBtn}>
          <ArrowLeft size={16} /> Kembali ke Program
        </Link>
      </div>
    );
  }

  const catKey = workout.kategori?.toLowerCase() || 'default';
  const col = CATEGORY_COLORS[catKey] || CATEGORY_COLORS.default;
  const lvl = LEVEL_COLORS[workout.level?.toLowerCase()] || LEVEL_COLORS.pemula;

  const toggleStep = (i) => {
    setDoneSteps(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/program" className={styles.backLink}>
          <ArrowLeft size={16} /> Program
        </Link>
        <ChevronRight size={14} color="#475569" />
        <span>{workout.nama}</span>
      </div>

      <div className={styles.layout}>
        {/* ── LEFT — Main Content ── */}
        <main className={styles.main}>
          {/* Hero Banner */}
          <div className={styles.heroBanner}
            style={{ background: `linear-gradient(135deg, ${col.from}22, ${col.to}11)`, borderColor: `${col.from}30` }}>
            <div className={styles.heroBannerGlow}
              style={{ background: `radial-gradient(circle at 30% 50%, ${col.from}30, transparent 65%)` }} />
            <span className={styles.heroEmoji}>{workout.emoji}</span>
            <div className={styles.heroInfo}>
              <span className={styles.levelBadge}
                style={{ color: lvl.color, background: lvl.bg, border: `1px solid ${lvl.border}` }}>
                <Zap size={11} fill={lvl.color} /> {workout.level}
              </span>
              <h1 className={styles.nama}>{workout.nama}</h1>
              <div className={styles.metaRow}>
                <span className={styles.metaItem}><Clock size={15} />{workout.durasi}</span>
                <span className={styles.metaItem}><Flame size={15} color="#FF5500" />{workout.kalori} kkal</span>
                <span className={styles.metaItem} style={{ background: `${col.from}20`, color: col.from, border: `1px solid ${col.from}30` }}>
                  {workout.kategori}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={styles.card}>
            <p className={styles.deskripsi}>{workout.deskripsi}</p>
          </div>

          {/* Steps */}
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>
              <ListChecks size={20} color={col.from} /> Langkah-Langkah
            </h2>
            <p className={styles.sectionHint}>Klik langkah untuk tandai selesai ✓</p>
            <div className={styles.steps}>
              {workout.langkah?.map((step, i) => (
                <div key={i}
                  className={`${styles.step} ${doneSteps.includes(i) ? styles.stepDone : ''}`}
                  onClick={() => toggleStep(i)}
                >
                  <span className={styles.stepNum}
                    style={{ background: doneSteps.includes(i) ? '#4ADE80' : `linear-gradient(135deg, ${col.from}, ${col.to})` }}>
                    {doneSteps.includes(i) ? '✓' : i + 1}
                  </span>
                  <span className={styles.stepText}>{step}</span>
                </div>
              ))}
            </div>
            {doneSteps.length > 0 && (
              <div className={styles.stepProgress}>
                <div className={styles.stepProgressBar}
                  style={{ width: `${(doneSteps.length / workout.langkah.length) * 100}%`,
                    background: `linear-gradient(90deg, ${col.from}, ${col.to})` }} />
              </div>
            )}
          </div>

          {/* Muscle Targets */}
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>
              <Target size={20} color={col.from} /> Otot yang Dilatih
            </h2>
            <div className={styles.muscleTags}>
              {workout.ototTarget?.map((otot, i) => (
                <span key={i} className={styles.muscleTag}
                  style={{ color: col.from, background: `${col.from}15`, border: `1px solid ${col.from}30` }}>
                  {otot}
                </span>
              ))}
            </div>
          </div>
        </main>

        {/* ── RIGHT — Timer ── */}
        <aside className={styles.sidebar}>
          <Timer sets={workout.set} reps={workout.repetisi} restTime={30} />

          {/* Related workouts suggestion */}
          <div className={styles.relatedCard}>
            <h4>Latihan Lainnya</h4>
            {workouts.filter(w => w.id !== workout.id).slice(0, 3).map(w => (
              <Link key={w.id} to={`/detail/${w.id}`} className={styles.relatedItem}>
                <span className={styles.relatedEmoji}>{w.emoji}</span>
                <div className={styles.relatedInfo}>
                  <span className={styles.relatedName}>{w.nama}</span>
                  <span className={styles.relatedMeta}>{w.durasi} · {w.kalori} kkal</span>
                </div>
                <ChevronRight size={15} color="#475569" />
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
