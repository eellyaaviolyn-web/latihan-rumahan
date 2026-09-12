import React from 'react';
import styles from './FilterSidebar.module.css';

const CATEGORIES = ['Semua', 'Kardio', 'Kekuatan', 'HIIT', 'Yoga', 'Peregangan'];
const LEVELS = ['Semua', 'Pemula', 'Menengah', 'Lanjutan'];

const CATEGORY_ICONS = {
  Semua: '⚡', Kardio: '🏃', Kekuatan: '💪', HIIT: '🔥', Yoga: '🧘', Peregangan: '🤸'
};

export default function FilterSidebar({ activeKategori, activeLevel, onKategoriChange, onLevelChange }) {
  return (
    <div className={styles.filterWrap}>
      {/* Category pills */}
      <div className={styles.group}>
        <span className={styles.groupLabel}>Kategori</span>
        <div className={styles.pills}>
          {CATEGORIES.map(k => (
            <button
              key={k}
              type="button"
              className={`${styles.pill} ${activeKategori === k ? styles.pillActive : ''}`}
              onClick={() => onKategoriChange(k)}
            >
              <span>{CATEGORY_ICONS[k]}</span>
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Level pills */}
      <div className={styles.group}>
        <span className={styles.groupLabel}>Level</span>
        <div className={styles.pills}>
          {LEVELS.map(l => (
            <button
              key={l}
              type="button"
              className={`${styles.pill} ${activeLevel === l ? styles.pillActive : ''} ${styles['pill' + l]}`}
              onClick={() => onLevelChange(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
