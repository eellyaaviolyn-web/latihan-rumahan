import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Heart, Activity, ArrowRight, CheckCircle, Users, Trophy, Zap } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import HeroScene from '../components/HeroScene';
import workouts from '../data/workouts';
import styles from './Beranda.module.css';

export default function Beranda() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>

      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Background decorations */}
        <div className={styles.heroBg}>
          <div className={styles.blob1} />
          <div className={styles.blob2} />
          <div className={styles.blob3} />
          <div className={styles.grid} />
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <Zap size={14} />
              <span>Program Latihan #1 di Indonesia</span>
            </div>

            <h1 className={styles.heroTitle}>
              Latihan
              <span className={styles.heroTitleAccent}> Rumahan</span>
              <br />
              <span className={styles.heroTitleSub}>Mulai Sekarang</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Raih tubuh ideal tanpa gym, tanpa peralatan mahal.
              Program latihan terstruktur untuk semua level —
              dari pemula hingga lanjutan.
            </p>

            <div className={styles.heroCtas}>
              <button
                type="button"
                className={styles.ctaBtnPrimary}
                onClick={() => navigate('/program')}
              >
                Mulai Latihan Gratis
                <ArrowRight size={18} />
              </button>
              <button
                type="button"
                className={styles.ctaBtnSecondary}
                onClick={() => navigate('/jadwal')}
              >
                Lihat Jadwal
              </button>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatNum}>{workouts.length}+</span>
                <span className={styles.heroStatLbl}>Program</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatNum}>3</span>
                <span className={styles.heroStatLbl}>Kategori</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatNum}>100%</span>
                <span className={styles.heroStatLbl}>Gratis</span>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className={styles.heroVisual}>
            <HeroScene />
            <div className={styles.visualCard} style={{ '--delay': '0s' }}>
              <div className={styles.visualCardIcon}>🔥</div>
              <div className={styles.visualCardText}>
                <span className={styles.vcTitle}>Burpee</span>
                <span className={styles.vcSub}>180 kkal · Lanjutan</span>
              </div>
            </div>

            <div className={styles.visualCenter}>
              <div className={styles.pulseRing} />
              <div className={styles.pulseRing2} />
              <span className={styles.centerEmoji}>🏋️</span>
            </div>

            <div className={styles.visualCard} style={{ '--delay': '0.3s' }}>
              <div className={styles.visualCardIcon}>⚡</div>
              <div className={styles.visualCardText}>
                <span className={styles.vcTitle}>HIIT Kardio</span>
                <span className={styles.vcSub}>20 menit</span>
              </div>
            </div>

            <div className={styles.visualCardBottom} style={{ '--delay': '0.6s' }}>
              <CheckCircle size={16} color="#4caf50" />
              <span>Sesi hari ini selesai! 🎉</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.statsBarInner}>
          <div className={styles.statBarItem}>
            <Trophy size={22} className={styles.statIcon} />
            <span className={styles.statBarNum}>{workouts.length}+</span>
            <span className={styles.statBarLbl}>Program Latihan</span>
          </div>
          <div className={styles.statBarDivider} />
          <div className={styles.statBarItem}>
            <Users size={22} className={styles.statIcon} />
            <span className={styles.statBarNum}>3</span>
            <span className={styles.statBarLbl}>Kategori</span>
          </div>
          <div className={styles.statBarDivider} />
          <div className={styles.statBarItem}>
            <Zap size={22} className={styles.statIcon} />
            <span className={styles.statBarNum}>3</span>
            <span className={styles.statBarLbl}>Level Kesulitan</span>
          </div>
          <div className={styles.statBarDivider} />
          <div className={styles.statBarItem}>
            <CheckCircle size={22} className={styles.statIcon} />
            <span className={styles.statBarNum}>100%</span>
            <span className={styles.statBarLbl}>Gratis Selamanya</span>
          </div>
        </div>
      </div>

      {/* Kategori Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>Pilih Sesuai Tujuanmu</p>
          <h2 className={styles.sectionTitle}>Kategori Latihan</h2>
          <p className={styles.sectionDesc}>
            Dari membakar kalori hingga membangun otot — semua tersedia tanpa alat apapun.
          </p>
        </div>
        <div className={styles.kategoriGrid}>
          <CategoryCard
            icon={Heart}
            title="Kardio"
            description="Bakar kalori maksimal dengan HIIT, Jumping Jacks, dan gerakan kardio intensitas tinggi. Tingkatkan stamina dan daya tahan jantung."
            onClick={() => navigate('/program?kategori=Kardio')}
            color="#ff6b35"
          />
          <CategoryCard
            icon={Dumbbell}
            title="Kekuatan"
            description="Bangun massa otot dengan Push Up, Squat, dan Plank. Tidak butuh barbel — gunakan berat badan sendiri sebagai beban."
            onClick={() => navigate('/program?kategori=Kekuatan')}
            color="#6c63ff"
          />
          <CategoryCard
            icon={Activity}
            title="Fleksibilitas"
            description="Tingkatkan kelenturan dan mobilitas dengan yoga dan peregangan. Kurangi risiko cedera dan perbaiki postur tubuh."
            onClick={() => navigate('/program?kategori=Fleksibilitas')}
            color="#00bfa5"
          />
        </div>
      </section>

      {/* Kenapa section */}
      <section className={styles.whySection}>
        <div className={styles.whyInner}>
          <div className={styles.whyLeft}>
            <p className={styles.sectionEyebrow}>Alasan Utama</p>
            <h2 className={styles.whyTitle}>Kenapa Latihan<br />di Rumah?</h2>
            <p className={styles.whyDesc}>
              Tidak ada alasan untuk menunda. Dengan tubuh kamu sendiri sebagai alat, perubahan bisa dimulai hari ini juga.
            </p>
            <button
              type="button"
              className={styles.ctaBtnPrimary}
              onClick={() => navigate('/program')}
            >
              Coba Sekarang <ArrowRight size={16} />
            </button>
          </div>
          <div className={styles.whyRight}>
            {[
              { emoji: '🏠', title: 'Tanpa Peralatan', desc: 'Cukup dengan berat badan sendiri, tidak perlu investasi apapun.' },
              { emoji: '⏰', title: 'Fleksibel Waktu', desc: 'Latihan kapan saja — pagi, siang, malam, sesuai jadwal kamu.' },
              { emoji: '💰', title: 'Benar-Benar Gratis', desc: 'Seluruh program, jadwal, dan panduan bisa diakses 100% gratis.' },
              { emoji: '📈', title: 'Terstruktur & Progresif', desc: 'Program yang dirancang untuk berkembang seiring kemampuanmu.' },
            ].map((item) => (
              <div key={item.title} className={styles.whyCard}>
                <div className={styles.whyEmoji}>{item.emoji}</div>
                <div>
                  <div className={styles.whyCardTitle}>{item.title}</div>
                  <div className={styles.whyCardDesc}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerBg} />
        <div className={styles.ctaBannerContent}>
          <h2 className={styles.ctaBannerTitle}>Siap Mulai Perjalananmu?</h2>
          <p className={styles.ctaBannerDesc}>
            Bergabung dan mulai latihan pertamamu hari ini. Gratis selamanya.
          </p>
          <button
            type="button"
            className={styles.ctaBannerBtn}
            onClick={() => navigate('/program')}
          >
            Lihat Semua Program <ArrowRight size={18} />
          </button>
        </div>
      </section>

    </div>
  );
}
