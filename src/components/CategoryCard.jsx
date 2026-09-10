import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './CategoryCard.module.css';

export default function CategoryCard({ icon: Icon, title, description, onClick, color = '#FF5E36' }) {
  return (
    <div className={styles.card} onClick={onClick} style={{ '--c': color }}>
      {/* top accent bar */}
      <div className={styles.topBar} />

      <div className={styles.iconWrap}>
        {Icon && <Icon size={28} className={styles.icon} />}
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>

      <div className={styles.footer}>
        <span className={styles.cta}>Lihat Program</span>
        <span className={styles.arrow}><ArrowUpRight size={15} /></span>
      </div>
    </div>
  );
}
