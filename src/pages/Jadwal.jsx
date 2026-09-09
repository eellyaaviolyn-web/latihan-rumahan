import React from 'react';
import { Link } from 'react-router-dom';
import { workouts, jadwalMingguan } from '../data/workouts';
import { Calendar, CheckCircle, Coffee } from 'lucide-react';
import styles from './Jadwal.module.css';

export default function Jadwal() {
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
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Calendar size={32} /> Jadwal Latihan Mingguan
        </h1>
        <p className={styles.subtitle}>
          Rekomendasi jadwal latihan untuk hasil optimal
        </p>
      </header>

      <div className={styles.scheduleGrid}>
        {jadwalMingguan.map((day) => (
          <div key={day.hari} className={styles.dayCard}>
            <div
              className={`${styles.dayHeader} ${
                day.istirahat ? styles.dayHeaderRest : styles.dayHeaderNormal
              }`}
            >
              {day.hari}
            </div>

            <div className={styles.dayContent}>
              <div className={styles.dayFocus}>{day.fokus}</div>

              {day.istirahat ? (
                <div className={styles.restMessage}>
                  <Coffee size={36} />
                  <span>Hari Istirahat - Pemulihan Tubuh</span>
                </div>
              ) : (
                <div className={styles.workoutList}>
                  {day.latihan.map((id) => {
                    const workout = workouts.find((w) => w.id === id);
                    if (!workout) return null;
                    return (
                      <Link
                        key={workout.id}
                        to={`/detail/${workout.id}`}
                        className={styles.workoutItem}
                      >
                        <span className={styles.workoutEmoji}>{workout.emoji}</span>
                        <span className={styles.workoutNama}>{workout.nama}</span>
                        <span
                          className={`${styles.badge} ${getBadgeClass(
                            workout.level
                          )}`}
                        >
                          {workout.level}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <section className={styles.tipsSection}>
        <h2 className={styles.tipsTitle}>Tips Latihan</h2>
        <ul className={styles.tipsList}>
          <li className={styles.tipItem}>
            <CheckCircle size={20} />
            <span>
              Lakukan pemanasan 5-10 menit sebelum latihan untuk mempersiapkan otot dan sendi.
            </span>
          </li>
          <li className={styles.tipItem}>
            <CheckCircle size={20} />
            <span>
              Minum air putih yang cukup sebelum, saat latihan, dan setelah selesai berolahraga.
            </span>
          </li>
          <li className={styles.tipItem}>
            <CheckCircle size={20} />
            <span>
              Istirahat minimal 1 hari per minggu agar otot memiliki waktu optimal untuk pemulihan.
            </span>
          </li>
          <li className={styles.tipItem}>
            <CheckCircle size={20} />
            <span>
              Dengarkan tubuh Anda, jangan memaksakan diri jika mengalami rasa nyeri atau kelelahan berlebih.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
