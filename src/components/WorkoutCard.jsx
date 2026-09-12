import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Flame, ArrowRight, Zap } from 'lucide-react';
import styles from './WorkoutCard.module.css';

const CATEGORY_COLORS = {
  kardio:    { from: '#FF5500', to: '#FF2A00', glow: 'rgba(255,85,0,0.25)' },
  kekuatan:  { from: '#818CF8', to: '#6366F1', glow: 'rgba(129,140,248,0.25)' },
  hiit:      { from: '#F59E0B', to: '#EF4444', glow: 'rgba(245,158,11,0.25)' },
  yoga:      { from: '#4ADE80', to: '#06B6D4', glow: 'rgba(74,222,128,0.25)' },
  peregangan:{ from: '#00F2FE', to: '#4ADE80', glow: 'rgba(0,242,254,0.25)' },
  default:   { from: '#FF5500', to: '#FF2A00', glow: 'rgba(255,85,0,0.25)' },
};

const LEVEL_INFO = {
  pemula:   { color: '#4ADE80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.3)' },
  menengah: { color: '#FBBF24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.3)' },
  lanjutan: { color: '#F87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.3)' },
};

export default function WorkoutCard({ workout }) {
  if (!workout) return null;

  const key = workout.kategori?.toLowerCase() || 'default';
  const col = CATEGORY_COLORS[key] || CATEGORY_COLORS.default;
  const lvl = LEVEL_INFO[workout.level?.toLowerCase()] || LEVEL_INFO.pemula;
  const kcalPct = Math.min(100, Math.round((workout.kalori / 600) * 100));

  return (
    <Link to={`/detail/${workout.id}`} className={styles.card} style={{ '--glow': col.glow }}>
      {/* Top gradient banner */}
      <div className={styles.banner}
        style={{ background: `linear-gradient(135deg, ${col.from}, ${col.to})` }}>
        <span className={styles.emoji}>{workout.emoji}</span>
        <span className={styles.kategoriTag}>{workout.kategori}</span>
      </div>

      <div className={styles.body}>
        {/* Level badge */}
        <span className={styles.levelBadge}
          style={{ color: lvl.color, background: lvl.bg, border: `1px solid ${lvl.border}` }}>
          <Zap size={10} fill={lvl.color} />
          {workout.level}
        </span>

        <h3 className={styles.nama}>{workout.nama}</h3>

        {/* Stats row */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <Clock size={14} color="#94A3B8" />
            <span>{workout.durasi}</span>
          </div>
          <div className={styles.stat}>
            <Flame size={14} color="#FF5500" />
            <span>{workout.kalori} kkal</span>
          </div>
        </div>

        {/* Calorie progress */}
        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill}
              style={{ width: `${kcalPct}%`, background: `linear-gradient(90deg, ${col.from}, ${col.to})` }} />
          </div>
          <span className={styles.progressTxt}>{kcalPct}% intensitas</span>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <span>Mulai Latihan</span>
          <div className={styles.ctaArrow} style={{ background: `linear-gradient(135deg, ${col.from}, ${col.to})` }}>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}
