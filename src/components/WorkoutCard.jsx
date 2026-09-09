import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Flame } from 'lucide-react';
import styles from './WorkoutCard.module.css';

export default function WorkoutCard({ workout }) {
  if (!workout) return null;

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
    <div className={styles.card}>
      <div className={styles.emoji}>{workout.emoji}</div>
      <h3 className={styles.nama}>{workout.nama}</h3>
      <span className={`${styles.badge} ${getBadgeClass(workout.level)}`}>
        {workout.level}
      </span>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <Clock size={16} />
          <span>{workout.durasi}</span>
        </div>
        <div className={styles.infoItem}>
          <Flame size={16} />
          <span>{workout.kalori} kkal</span>
        </div>
      </div>
      <span className={styles.kategori}>{workout.kategori}</span>
      <Link to={`/detail/${workout.id}`} className={styles.mulaiBtn}>
        Mulai
      </Link>
    </div>
  );
}
