import React from 'react';
import { MessageSquare, Users, Award } from 'lucide-react';
import styles from './Komunitas.module.css';

export default function Komunitas() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2>Komunitas FitLife</h2>
        <p>Bergabung dengan 50.000+ member lainnya. Bagikan progresmu dan saling memotivasi!</p>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statBox}>
          <Users size={28} color="#00F2FE" className={styles.icon} />
          <h3>52.140</h3>
          <p>Member Aktif</p>
        </div>
        <div className={styles.statBox}>
          <MessageSquare size={28} color="#4ADE80" className={styles.icon} />
          <h3>12.400</h3>
          <p>Diskusi Hari Ini</p>
        </div>
        <div className={styles.statBox}>
          <Award size={28} color="#FBBF24" className={styles.icon} />
          <h3>1.200</h3>
          <p>Program Selesai</p>
        </div>
      </div>

      <div className={styles.feed}>
        <h3>Aktivitas Terbaru 🔥</h3>
        
        <div className={styles.post}>
          <div className={styles.avatar} style={{background: '#818CF8'}}>R</div>
          <div className={styles.postContent}>
            <h4>Rizky Pratama</h4>
            <p>Baru saja menyelesaikan program <strong>HIIT Fat Burn Hari 14</strong>! Keringat ngucur deras tapi rasanya luar biasa. Semangat terus buat yang lain! 💪</p>
            <span className={styles.time}>10 menit yang lalu</span>
          </div>
        </div>

        <div className={styles.post}>
          <div className={styles.avatar} style={{background: '#FBBF24'}}>S</div>
          <div className={styles.postContent}>
            <h4>Sarah Amelia</h4>
            <p>Ada yang punya tips buat ngilangin nyeri otot setelah leg day? Kemarin nyoba program lower body dan sekarang jalan aja susah 😂</p>
            <span className={styles.time}>45 menit yang lalu</span>
          </div>
        </div>

        <div className={styles.post}>
          <div className={styles.avatar} style={{background: '#4ADE80'}}>D</div>
          <div className={styles.postContent}>
            <h4>Dimas Anggara</h4>
            <p>Akhirnya target turun 5kg tercapai dalam 2 bulan cuma pakai latihan bodyweight dari FitLife! Makasih buat AI Trainer-nya yang super ngebantu nyusun jadwal. 🔥</p>
            <span className={styles.time}>2 jam yang lalu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
