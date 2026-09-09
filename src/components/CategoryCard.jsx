import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './CategoryCard.module.css';

export default function CategoryCard({ icon: Icon, title, description, onClick, color = '#ff6b35' }) {
  return (
    <div
      className={styles.card}
      onClick={onClick}
      style={{ '--card-color': color }}
    >
      <div className={styles.iconWrap}>
        <div className={styles.iconBg} />
        {Icon && <Icon size={32} className={styles.icon} />}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.cta}>
        <span>Lihat Program</span>
        <ArrowRight size={16} />
      </div>
    </div>
  );
}
