import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Play, Star, Clock, Flame,
  Dumbbell, Users, Zap, ChevronRight,
  Activity, Brain, Award, Target
} from 'lucide-react';
import styles from './Beranda.module.css';

/* ─── 3D Tilt hook ─── */
function useTilt(deg = 12) {
  const onMouseMove = useCallback((e) => {
    const el = e.currentTarget;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    el.style.transition = 'transform 0.06s ease';
    el.style.transform  = `perspective(800px) rotateX(${y * -deg}deg) rotateY(${x * deg}deg) scale3d(1.03,1.03,1.03)`;
  }, [deg]);
  const onMouseLeave = useCallback((e) => {
    e.currentTarget.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
    e.currentTarget.style.transform  = 'perspective(800px) rotateX(4deg) rotateY(-6deg)';
  }, []);
  return { onMouseMove, onMouseLeave };
}

/* ─── Workout programs data ─── */
const PROGRAMS = [
  {
    id: 1,
    title: 'Full Body HIIT',
    difficulty: 'Beginner',
    diffColor: '#10B981',
    duration: '20 min',
    calories: '320 kcal',
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=85',
    emoji: '🔥',
  },
  {
    id: 2,
    title: 'Core Strength',
    difficulty: 'Intermediate',
    diffColor: '#06B6D4',
    duration: '30 min',
    calories: '250 kcal',
    photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=85',
    emoji: '💪',
  },
  {
    id: 3,
    title: 'No-Equipment Cardio',
    difficulty: 'Advanced',
    diffColor: '#F97316',
    duration: '40 min',
    calories: '450 kcal',
    photo: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=85',
    emoji: '⚡',
  },
];

const ALL_PROGRAMS = [
  ...PROGRAMS,
  {
    id: 4,
    title: 'Yoga Flow Pagi',
    difficulty: 'Beginner',
    diffColor: '#10B981',
    duration: '25 min',
    calories: '180 kcal',
    photo: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=85',
    emoji: '🧘',
  },
  {
    id: 5,
    title: 'Upper Body Power',
    difficulty: 'Advanced',
    diffColor: '#F97316',
    duration: '35 min',
    calories: '380 kcal',
    photo: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=85',
    emoji: '🏋️',
  },
  {
    id: 6,
    title: 'Leg Day Destroyer',
    difficulty: 'Intermediate',
    diffColor: '#06B6D4',
    duration: '35 min',
    calories: '340 kcal',
    photo: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&q=85',
    emoji: '🦵',
  },
];

const FEATURES = [
  { icon: <Brain size={22} />, color: '#818CF8', title: 'AI Personal Trainer', desc: 'Program latihan yang disesuaikan otomatis dengan level dan tujuanmu.' },
  { icon: <Dumbbell size={22} />, color: '#10B981', title: 'Tanpa Peralatan', desc: '100% bisa dilakukan di rumah tanpa membeli alat apapun.' },
  { icon: <Activity size={22} />, color: '#06B6D4', title: 'Tracker Kalori', desc: 'Pantau kalori terbakar secara real-time di setiap sesi latihan.' },
  { icon: <Users size={22} />, color: '#F97316', title: 'Komunitas Aktif', desc: 'Bergabung dengan 50K+ pengguna aktif dan ikuti challenge mingguan.' },
  { icon: <Award size={22} />, color: '#FBBF24', title: 'Sertifikasi Progres', desc: 'Dapatkan badge dan sertifikat digital setiap milestone yang kamu capai.' },
  { icon: <Target size={22} />, color: '#F43F5E', title: 'Target Berbasis Data', desc: 'Analitik mingguan untuk memastikan kamu selalu on-track.' },
];

/* ─── Main Component ─── */
export default function Beranda() {
  const navigate = useNavigate();
  const tilt = useTilt(12);
  const [heroImgError, setHeroImgError] = useState(false);

  return (
    <div className={styles.page}>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className={styles.hero}>
        {/* Background glows */}
        <div className={styles.glowEmerald} />
        <div className={styles.glowCyan} />
        <div className={styles.dotGrid} />

        <div className={styles.heroInner}>
          {/* ── LEFT ── */}
          <div className={styles.heroLeft}>
            {/* Eyebrow badge */}
            <div className={styles.eyebrowBadge}>
              <span className={styles.liveDot} />
              <span>Platform #1 Workout Rumahan Indonesia</span>
            </div>

            {/* Headline */}
            <h1 className={styles.headline}>
              Latihan Rumahan<br />
              Jadi <span className={styles.headlineEmerald}>Lebih Nyata</span>
            </h1>

            {/* Subtitle */}
            <p className={styles.sub}>
              Raih tubuh impian tanpa gym. Akses ratusan program latihan terstruktur
              yang dirancang para ahli — kapan saja, di mana saja.
            </p>

            {/* Stat pills */}
            <div className={styles.statPills}>
              <div className={styles.statPill}>
                <Dumbbell size={14} color="#10B981" />
                <span>500+ Program Tersedia</span>
              </div>
              <div className={styles.statPill}>
                <Star size={14} fill="#FBBF24" color="#FBBF24" />
                <span>4.9/5 Rating</span>
              </div>
              <div className={styles.statPill}>
                <Users size={14} color="#06B6D4" />
                <span>50K+ Pengguna</span>
              </div>
            </div>

            {/* CTA */}
            <div className={styles.ctaRow}>
              <button className={styles.ctaPrimary} onClick={() => navigate('/program')}>
                Mulai Latihan Gratis
                <ArrowRight size={17} />
              </button>
              <button className={styles.ctaGhost} onClick={() => navigate('/kalkulator')}>
                <Activity size={15} />
                Cek BMI Kamu
              </button>
            </div>

            {/* Avatars + social proof */}
            <div className={styles.proof}>
              <div className={styles.avatars}>
                {['#10B981','#06B6D4','#818CF8','#F97316','#FBBF24'].map((c, i) => (
                  <span key={i} className={styles.av} style={{ background: c, zIndex: 5 - i }}>
                    {['R','S','D','A','F'][i]}
                  </span>
                ))}
              </div>
              <div className={styles.proofText}>
                <span><strong>50.000+</strong> orang sudah bergabung</span>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#FBBF24" color="#FBBF24" />)}
                  <span>4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: 3D Floating Card ── */}
          <div className={styles.heroRight}>
            <div className={styles.cardFloat}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}>

              {/* Card thumbnail */}
              <div className={styles.cardThumb}>
                {!heroImgError ? (
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=85"
                    alt="Full Body HIIT"
                    onError={() => setHeroImgError(true)}
                  />
                ) : (
                  <div className={styles.cardThumbFallback}>🏋️</div>
                )}
                <div className={styles.cardThumbOverlay} />

                {/* Floating badges on photo */}
                <div className={styles.badgeTimer}>
                  <Clock size={13} /> 20 min
                </div>
                <div className={styles.badgeCalorie}>
                  320 kcal <Flame size={13} />
                </div>
              </div>

              {/* Card body */}
              <div className={styles.cardBody}>
                <div className={styles.cardBodyTop}>
                  <div>
                    <span className={styles.cardDiff} style={{ color: '#10B981', background: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.3)' }}>
                      Beginner
                    </span>
                    <h3 className={styles.cardTitle}>Full Body HIIT</h3>
                  </div>
                  <button className={styles.playBtn} onClick={() => navigate('/detail/1')}>
                    <Play size={16} fill="white" />
                  </button>
                </div>
                <div className={styles.cardProgress}>
                  <div className={styles.cardProgressBar}>
                    <div className={styles.cardProgressFill} style={{ width: '65%' }} />
                  </div>
                  <span className={styles.cardProgressTxt}>65% selesai</span>
                </div>
              </div>
            </div>

            {/* Floating mini stats around card */}
            <div className={`${styles.floatChip} ${styles.chipTopLeft}`}>
              <Flame size={14} color="#F97316" /> <span>1.240 kkal hari ini</span>
            </div>
            <div className={`${styles.floatChip} ${styles.chipBottomRight}`}>
              <Zap size={14} color="#10B981" /> <span>Streak 7 hari 🔥</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURE GRID ═══════════════════ */}
      <section className={styles.programSection}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionEyebrow}>Program Pilihan</span>
          <h2 className={styles.sectionTitle}>
            Mulai dari yang <span className={styles.textEmerald}>Kamu Suka</span>
          </h2>
          <p className={styles.sectionSub}>Dipilih oleh trainer berpengalaman, cocok untuk semua level.</p>
        </div>

        {/* Top 3 big cards */}
        <div className={styles.programGrid}>
          {PROGRAMS.map((p) => (
            <Link to={`/detail/${p.id}`} key={p.id} className={styles.programCard}>
              <div className={styles.pCardPhoto}>
                <img src={p.photo} alt={p.title}
                  onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                <div className={styles.pCardFallback}>{p.emoji}</div>
                <div className={styles.pCardOverlay} />
                <span className={styles.pDiffBadge}
                  style={{ color: p.diffColor, background: `${p.diffColor}15`, borderColor: `${p.diffColor}40` }}>
                  {p.difficulty}
                </span>
                <button className={styles.pPlayBtn} onClick={(e) => { e.preventDefault(); navigate(`/detail/${p.id}`); }}>
                  <Play size={14} fill="white" />
                </button>
              </div>
              <div className={styles.pCardBody}>
                <h4 className={styles.pCardTitle}>{p.title}</h4>
                <div className={styles.pCardMeta}>
                  <span className={styles.pDuration}><Clock size={13} /> {p.duration}</span>
                  <span className={styles.pCalorie}><Flame size={13} color="#F97316" /> {p.calories}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All programs grid */}
        <div className={styles.allGrid}>
          {ALL_PROGRAMS.map((p) => (
            <Link to={`/detail/${p.id}`} key={p.id} className={styles.allCard}>
              <div className={styles.allCardLeft}>
                <div className={styles.allCardEmoji}>{p.emoji}</div>
                <div>
                  <p className={styles.allCardTitle}>{p.title}</p>
                  <div className={styles.allCardMeta}>
                    <span style={{ color: p.diffColor, fontWeight: 700, fontSize: '0.75rem' }}>{p.difficulty}</span>
                    <span className={styles.allCardDot}>·</span>
                    <span className={styles.allCardDur}><Clock size={11} /> {p.duration}</span>
                  </div>
                </div>
              </div>
              <ChevronRight size={16} color="#475569" />
            </Link>
          ))}
        </div>

        <div className={styles.seeAllRow}>
          <Link to="/program" className={styles.seeAllBtn}>
            Lihat Semua Program <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <section className={styles.featureSection}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionEyebrow}>Kenapa FitLife?</span>
          <h2 className={styles.sectionTitle}>
            Semua yang Kamu Butuhkan<br />
            <span className={styles.textEmerald}>Dalam Satu Platform</span>
          </h2>
        </div>
        <div className={styles.featureGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon} style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                <span style={{ color: f.color }}>{f.icon}</span>
              </div>
              <h4 className={styles.featureTitle}>{f.title}</h4>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ CTA BANNER ═══════════════════ */}
      <section className={styles.ctaBanner}>
        <div className={styles.bannerGlow} />
        <div className={styles.bannerInner}>
          <span className={styles.sectionEyebrow}>Mulai Sekarang</span>
          <h2 className={styles.bannerTitle}>
            Siap Memulai Perjalanan<br />
            <span className={styles.textEmerald}>Transformasimu?</span>
          </h2>
          <p className={styles.bannerSub}>
            Gratis selamanya. Tidak perlu kartu kredit.<br />
            Bergabung bersama <strong>50.000+</strong> pengguna aktif.
          </p>
          <div className={styles.ctaRow}>
            <button className={styles.ctaPrimary} onClick={() => navigate('/register')}>
              Daftar Gratis Sekarang <ArrowRight size={17} />
            </button>
            <button className={styles.ctaGhost} onClick={() => navigate('/program')}>
              <Dumbbell size={15} /> Jelajahi Program
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
