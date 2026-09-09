import React from 'react';
import { Filter } from 'lucide-react';
import styles from './FilterSidebar.module.css';

const KATEGORI_OPTIONS = ['Semua', 'Kardio', 'Kekuatan', 'Fleksibilitas'];
const LEVEL_OPTIONS = ['Semua', 'Pemula', 'Menengah', 'Lanjutan'];

export default function FilterSidebar({
  activeKategori = 'Semua',
  activeLevel = 'Semua',
  onKategoriChange,
  onLevelChange,
}) {
  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>
        <Filter size={18} />
        <span>Filter Latihan</span>
      </h3>

      <div className={styles.group}>
        <div className={styles.groupTitle}>Kategori</div>
        <div className={styles.buttons}>
          {KATEGORI_OPTIONS.map((kategori) => {
            const isActive = activeKategori === kategori;
            return (
              <button
                key={kategori}
                type="button"
                className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
                onClick={() => onKategoriChange && onKategoriChange(kategori)}
              >
                {kategori}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.groupTitle}>Level</div>
        <div className={styles.buttons}>
          {LEVEL_OPTIONS.map((level) => {
            const isActive = activeLevel === level;
            return (
              <button
                key={level}
                type="button"
                className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
                onClick={() => onLevelChange && onLevelChange(level)}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
