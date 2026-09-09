import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Timer from '../components/Timer';
import workouts from '../data/workouts';
import { ArrowLeft, Clock, Flame, Target, ListChecks } from 'lucide-react';
import styles from './Detail.module.css';

export default function Detail() {
  const { id } = useParams();
  const workout = workouts.find((item) => item.id === parseInt(id, 10));

  if (!workout) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h2>Latihan tidak ditemukan</h2>
          <p>Latihan yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Link to="/program" className={styles.backLink}>
            <ArrowLeft size={18} /> Kembali ke Program
          </Link>
        </div>
      </div>
    );
  }

  const getBadgeClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'pemula':
        return styles.badgePemula;
      case 'menengah':
        return styles.badgeMenengah;
      case 'lanjutan':
        return styles.badgeLanjutan;
      default:
        return '';
    }
  };

  return (
    <div className={styles.page}>
      <Link to="/program" className={styles.backLink}>
        <ArrowLeft size={18} /> Kembali ke Program
      </Link>

      <div className={styles.layout}>
        <main className={styles.main}>
          <div className={styles.emojiDisplay}>{workout.emoji}</div>

          <div>
            <h1 className={styles.nama}>{workout.nama}</h1>
            <span className={`${styles.badge} ${getBadgeClass(workout.level)}`}>
              {workout.level}
            </span>
          </div>

          <div className={styles.infoRow}>
            <div className={styles.infoItem}>
              <Clock size={18} />
              <span>{workout.durasi}</span>
            </div>
            <div className={styles.infoItem}>
              <Flame size={18} />
              <span>{workout.kalori} kkal</span>
            </div>
            <div className={styles.infoItem}>
              <span>{workout.kategori}</span>
            </div>
          </div>

          <p className={styles.deskripsi}>{workout.deskripsi}</p>

          <section>
            <h2 className={styles.sectionTitle}>
              <ListChecks size={22} /> Langkah-Langkah
            </h2>
            <div className={styles.steps}>
              {workout.langkah?.map((step, index) => (
                <div key={index} className={styles.step}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <span className={styles.stepText}>{step}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>
              <Target size={22} /> Otot yang Ditargetkan
            </h2>
            <div className={styles.ototTags}>
              {workout.ototTarget?.map((otot, index) => (
                <span key={index} className={styles.ototTag}>
                  {otot}
                </span>
              ))}
            </div>
          </section>
        </main>

        <aside className={styles.sidebar}>
          <Timer sets={workout.set} reps={workout.repetisi} restTime={30} />
        </aside>
      </div>
    </div>
  );
}
