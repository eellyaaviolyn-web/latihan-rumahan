import React from 'react';
import { Check } from 'lucide-react';
import styles from './Harga.module.css';

export default function Harga() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2>Pilih Paket Kebugaranmu</h2>
        <p>Mulai gratis, upgrade kapan saja untuk fitur premium.</p>
      </div>
      
      <div className={styles.grid}>
        {/* Free Plan */}
        <div className={styles.card}>
          <h3>Pemula</h3>
          <div className={styles.price}>Rp 0<span>/bulan</span></div>
          <ul className={styles.features}>
            <li><Check size={18} color="#4ADE80"/> Akses 50 video latihan dasar</li>
            <li><Check size={18} color="#4ADE80"/> Pelacak kalori harian</li>
            <li><Check size={18} color="#4ADE80"/> Komunitas publik</li>
          </ul>
          <button className={styles.btnGhost}>Pilih Gratis</button>
        </div>

        {/* Pro Plan */}
        <div className={`${styles.card} ${styles.proCard}`}>
          <div className={styles.badge}>Paling Populer</div>
          <h3>Pro FitLife</h3>
          <div className={styles.price}>Rp 99.000<span>/bulan</span></div>
          <ul className={styles.features}>
            <li><Check size={18} color="#FF5500"/> Akses semua 500+ video HD</li>
            <li><Check size={18} color="#FF5500"/> AI Personal Trainer</li>
            <li><Check size={18} color="#FF5500"/> Program latihan kustom</li>
            <li><Check size={18} color="#FF5500"/> Leaderboard VIP</li>
          </ul>
          <button className={styles.btnPrimary}>Mulai Pro 14 Hari</button>
        </div>
      </div>
    </div>
  );
}
