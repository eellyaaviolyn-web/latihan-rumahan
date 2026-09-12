import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import WorkoutCard from '../components/WorkoutCard';
import FilterSidebar from '../components/FilterSidebar';
import workouts from '../data/workouts';
import styles from './Program.module.css';
import { Dumbbell, Users, Star, Zap } from 'lucide-react';

export default function Program() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlKategori = searchParams.get('kategori');

  const [activeKategori, setActiveKategori] = useState(urlKategori || 'Semua');
  const [activeLevel, setActiveLevel] = useState('Semua');

  useEffect(() => {
    const param = searchParams.get('kategori');
    setActiveKategori(param || 'Semua');
  }, [searchParams]);

  const handleKategoriChange = (kategori) => {
    setActiveKategori(kategori);
    const newParams = new URLSearchParams(searchParams);
    if (kategori === 'Semua') newParams.delete('kategori');
    else newParams.set('kategori', kategori);
    setSearchParams(newParams);
  };

  const filteredWorkouts = workouts.filter((w) => {
    const matchK = activeKategori === 'Semua' || w.kategori.toLowerCase() === activeKategori.toLowerCase();
    const matchL = activeLevel === 'Semua' || w.level.toLowerCase() === activeLevel.toLowerCase();
    return matchK && matchL;
  });

  return (
    <div className={styles.page}>
      {/* ── Hero Header ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroInner}>
          <span className="eyebrow-label"><Dumbbell size={13} /> Program Latihan</span>
          <h1 className={styles.title}>
            Temukan Program<br />
            <span className={styles.titleGrad}>Latihan Terbaikmu</span>
          </h1>
          <p className={styles.sub}>
            Pilih dari <strong>500+ program</strong> yang dirancang oleh pakar kebugaran.
            Dari pemula hingga atlet — semua ada di sini.
          </p>

          {/* Stats strip */}
          <div className={styles.statsRow}>
            {[
              { icon: <Dumbbell size={16} />, val: '500+', label: 'Program' },
              { icon: <Users size={16} />,    val: '50K+', label: 'Pengguna' },
              { icon: <Star size={16} fill="#FBBF24" color="#FBBF24" />, val: '4.9', label: 'Rating' },
              { icon: <Zap size={16} />,      val: '100%', label: 'Tanpa Alat' },
            ].map(s => (
              <div key={s.label} className={styles.statBox}>
                <div className={styles.statIcon}>{s.icon}</div>
                <div className={styles.statVal}>{s.val}</div>
                <div className={styles.statLbl}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className={styles.filterSection}>
        <div className={styles.filterBar}>
          <FilterSidebar
            activeKategori={activeKategori}
            activeLevel={activeLevel}
            onKategoriChange={handleKategoriChange}
            onLevelChange={setActiveLevel}
          />
          <span className={styles.resultCount}>
            <strong>{filteredWorkouts.length}</strong> latihan ditemukan
          </span>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className={styles.gridSection}>
        {filteredWorkouts.length > 0 ? (
          <div className={styles.grid}>
            {filteredWorkouts.map((w) => <WorkoutCard key={w.id} workout={w} />)}
          </div>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyEmoji}>🔍</span>
            <h3>Tidak ada latihan ditemukan</h3>
            <p>Coba ubah filter kategori atau level untuk menemukan latihan yang tepat.</p>
          </div>
        )}
      </section>
    </div>
  );
}
