import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import WorkoutCard from '../components/WorkoutCard';
import FilterSidebar from '../components/FilterSidebar';
import workouts from '../data/workouts';
import styles from './Program.module.css';

export default function Program() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlKategori = searchParams.get('kategori');

  const [activeKategori, setActiveKategori] = useState(urlKategori || 'Semua');
  const [activeLevel, setActiveLevel] = useState('Semua');

  // Sync category if URL parameter changes (e.g. navigation from Beranda or back/forward)
  useEffect(() => {
    const param = searchParams.get('kategori');
    if (param) {
      setActiveKategori(param);
    } else {
      setActiveKategori('Semua');
    }
  }, [searchParams]);

  const handleKategoriChange = (kategori) => {
    setActiveKategori(kategori);
    const newParams = new URLSearchParams(searchParams);
    if (kategori === 'Semua') {
      newParams.delete('kategori');
    } else {
      newParams.set('kategori', kategori);
    }
    setSearchParams(newParams);
  };

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesKategori =
      activeKategori === 'Semua' ||
      workout.kategori.toLowerCase() === activeKategori.toLowerCase();
    const matchesLevel =
      activeLevel === 'Semua' ||
      workout.level.toLowerCase() === activeLevel.toLowerCase();

    return matchesKategori && matchesLevel;
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Program Latihan</h1>
        <p className={styles.subtitle}>
          Pilih latihan yang sesuai dengan kemampuan dan tujuan Anda
        </p>
        <p className={styles.count}>{filteredWorkouts.length} latihan ditemukan</p>
      </header>

      <div className={styles.layout}>
        <FilterSidebar
          activeKategori={activeKategori}
          activeLevel={activeLevel}
          onKategoriChange={handleKategoriChange}
          onLevelChange={setActiveLevel}
        />
        <main>
          <div className={styles.grid}>
            {filteredWorkouts.length > 0 ? (
              filteredWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))
            ) : (
              <div className={styles.noResults}>
                Tidak ada latihan yang sesuai filter.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
