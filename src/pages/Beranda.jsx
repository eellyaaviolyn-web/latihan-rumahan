import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dumbbell, Heart, Activity, ArrowRight,
  Star, Users, Zap, Flame, Clock, TrendingUp, Shield
} from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import workouts from '../data/workouts';
import styles from './Beranda.module.css';

/* Tiny SVG progress ring */
function Ring({ pct = 75, color = '#FF5E36', size = 44, stroke = 3 }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
    </svg>
  );
}

export default function Beranda() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>

      {/* ───── HERO ───── */}
      <section className={styles.hero}>
        {/* ambient layers */}
        <div className={styles.heroBg}>
          <div className={styles.glow1} />
          <div className={styles.glow2} />
          <div className={styles.gridLines} />
        </div>

        <div className={styles.heroInner}>
          {/* LEFT */}
          <div className={styles.heroContent}>

            {/* social proof badge */}
            <div className={styles.socialBadge}>
              <span className={styles.socialStars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill="#FBBF24" color="#FBBF24" />
                ))}
              </span>
              <span><strong>10k+</strong> Pengguna Aktif</span>
              <span className={styles.badgeDot} />
              <span className={styles.liveTag}>GRATIS</span>
            </div>

            <h1 className={styles.heroTitle}>
              Transformasi<br />
              <span className={styles.heroAccent}>Tubuh</span> dari<br />
              <span className={styles.heroGrad}>Rumah</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Program latihan terstruktur tanpa gym, tanpa peralatan mahal.
              Mulai dari pemula sampai lanjutan — semua ada di sini, <em>gratis selamanya</em>.
            </p>

            {/* CTAs */}
            <div className={styles.heroCtas}>
              <button type="button" className={styles.btnPrimary} onClick={() => navigate('/program')}>
                Mulai Latihan Gratis <ArrowRight size={17} />
              </button>
              <button type="button" className={styles.btnGhost} onClick={() => navigate('/jadwal')}>
                Lihat Program
              </button>
            </div>

            {/* trust strip */}
            <div className={styles.trustStrip}>
              <span className={styles.trustItem}><Shield size={13} /> Tanpa Registrasi</span>
              <span className={styles.trustItem}><Zap size={13} /> Mulai Instan</span>
              <span className={styles.trustItem}><TrendingUp size={13} /> Hasil Nyata</span>
            </div>
          </div>

          {/* RIGHT — floating cards */}
          <div className={styles.heroVisual}>

            {/* main glass card */}
            <div className={styles.mainCard}>
              <div className={styles.mainCardHeader}>
                <div>
                  <div className={styles.mainCardLabel}>Latihan Hari Ini</div>
                  <div className={styles.mainCardTitle}>Full Body HIIT</div>
                </div>
                <div className={styles.liveIndicator}>
                  <span className={styles.liveDot} /> AKTIF
                </div>
              </div>

              {/* workouts inside */}
              {[
                { emoji: '🔥', name: 'Burpee', kcal: 180, pct: 82, color: '#FF5E36' },
                { emoji: '⚡', name: 'Mountain Climber', kcal: 160, pct: 66, color: '#22D3EE' },
                { emoji: '💪', name: 'Push Up', kcal: 120, pct: 50, color: '#4ADE80' },
              ].map((w) => (
                <div key={w.name} className={styles.workoutRow}>
                  <span className={styles.rowEmoji}>{w.emoji}</span>
                  <div className={styles.rowInfo}>
                    <span className={styles.rowName}>{w.name}</span>
                    <span className={styles.rowSub}>
                      <Flame size={11} /> {w.kcal} kkal
                    </span>
                  </div>
                  <Ring pct={w.pct} color={w.color} size={42} stroke={3} />
                </div>
              ))}

              <div className={styles.cardFooter}>
                <Clock size={13} /> Durasi rata-rata <strong>18 menit</strong>
              </div>
            </div>

            {/* floating metric chips */}
            <div className={`${styles.chip} ${styles.chip1}`}>
              <span className={styles.chipNum}>520</span>
              <span className={styles.chipLbl}>kkal / sesi</span>
            </div>

            <div className={`${styles.chip} ${styles.chip2}`}>
              <span className={styles.chipNum}>3×</span>
              <span className={styles.chipLbl}>Per Minggu</span>
            </div>

            {/* done toast */}
            <div className={styles.doneToast}>
              <span>✅</span>
              <span>Sesi Selesai! +180 kkal terbakar</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───── STATS BAR ───── */}
      <div className={styles.statsBar}>
        {[
          { icon: <Dumbbell size={18} />, num: `${workouts.length}+`, lbl: 'Program Latihan' },
          { icon: <Users size={18} />,    num: '10k+',  lbl: 'Pengguna Aktif' },
          { icon: <Flame size={18} />,    num: '3',     lbl: 'Kategori' },
          { icon: <Star size={18} />,     num: '4.9',   lbl: 'Rating Pengguna' },
        ].map((s, i) => (
          <React.Fragment key={s.lbl}>
            {i > 0 && <div className={styles.statsDivider} />}
            <div className={styles.statItem}>
              <span className={styles.statIcon}>{s.icon}</span>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLbl}>{s.lbl}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* ───── KATEGORI ───── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>Pilih Sesuai Tujuanmu</span>
          <h2 className={styles.sectionTitle}>Kategori Latihan</h2>
          <p className={styles.sectionDesc}>
            Dari membakar kalori hingga membangun otot — semua tersedia tanpa alat apapun.
          </p>
        </div>
        <div className={styles.kategoriGrid}>
          <CategoryCard icon={Heart}    title="Kardio"        color="#FF5E36"
            description="Bakar kalori maksimal dengan HIIT & Jumping Jacks. Tingkatkan stamina dan daya tahan kardiovaskular."
            onClick={() => navigate('/program?kategori=Kardio')} />
          <CategoryCard icon={Dumbbell} title="Kekuatan"      color="#818CF8"
            description="Bangun otot dengan Push Up, Squat & Plank. Gunakan berat badan sendiri sebagai beban efektif."
            onClick={() => navigate('/program?kategori=Kekuatan')} />
          <CategoryCard icon={Activity} title="Fleksibilitas" color="#22D3EE"
            description="Tingkatkan kelenturan dengan yoga & peregangan. Kurangi risiko cedera dan perbaiki postur tubuh."
            onClick={() => navigate('/program?kategori=Fleksibilitas')} />
        </div>
      </section>

      {/* ───── KENAPA ───── */}
      <section className={styles.whySection}>
        <div className={styles.whyInner}>
          <div className={styles.whyLeft}>
            <span className={styles.eyebrow}>Kenapa FitLife?</span>
            <h2 className={styles.whyTitle}>Semua yang Kamu<br />Butuhkan, Gratis</h2>
            <p className={styles.whyDesc}>
              Tidak perlu gym. Tidak perlu alat. Hanya butuh tekad dan panduan yang tepat —
              dan kami menyediakannya 100% gratis.
            </p>
            <button type="button" className={styles.btnPrimary} onClick={() => navigate('/program')}>
              Coba Sekarang <ArrowRight size={16} />
            </button>
          </div>

          <div className={styles.whyGrid}>
            {[
              { emoji: '🏠', color: '#FF5E36', title: 'Tanpa Peralatan',   desc: 'Cukup berat badan sendiri — nol investasi alat.' },
              { emoji: '⏰', color: '#818CF8', title: 'Bebas Waktu',        desc: 'Pagi, siang, malam — latihan kapan pun kamu mau.' },
              { emoji: '💰', color: '#22D3EE', title: '100% Gratis',        desc: 'Semua program & jadwal bisa diakses tanpa biaya.' },
              { emoji: '📈', color: '#4ADE80', title: 'Progresif',           desc: 'Program yang berkembang mengikuti kemampuanmu.' },
            ].map((item) => (
              <div key={item.title} className={styles.whyCard}
                   style={{ '--card-color': item.color }}>
                <div className={styles.whyIcon}>{item.emoji}</div>
                <div className={styles.whyCardTitle}>{item.title}</div>
                <div className={styles.whyCardDesc}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA BANNER ───── */}
      <section className={styles.ctaBanner}>
        <div className={styles.bannerGlow} />
        <div className={styles.bannerContent}>
          <span className={styles.eyebrow} style={{ color: '#FF5E36' }}>Mulai Hari Ini</span>
          <h2 className={styles.bannerTitle}>Siap Transformasi?</h2>
          <p className={styles.bannerDesc}>
            Bergabung bersama 10.000+ pengguna aktif yang sudah merasakan manfaatnya.
            Gratis selamanya, mulai dalam 30 detik.
          </p>
          <div className={styles.bannerCtas}>
            <button type="button" className={styles.btnPrimary} onClick={() => navigate('/program')}>
              Lihat Semua Program <ArrowRight size={17} />
            </button>
            <button type="button" className={styles.btnGhost} onClick={() => navigate('/jadwal')}>
              Jadwal Mingguan
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
