import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Award, Heart, Shield, Zap } from 'lucide-react';
import styles from './Tentang.module.css';

const INSTRUCTORS = [
  {
    name: 'Rizky Firmansyah', role: 'Head Trainer — HIIT & Kardio',
    initials: 'RF', color: '#FF5500',
    rating: 4.9, students: 12400,
    tags: ['HIIT', 'Kardio', 'Fat Loss'],
    bio: 'Bersertifikasi ACE & NSCA. 8 tahun pengalaman melatih atlet & umum.',
  },
  {
    name: 'Sari Puspita', role: 'Yoga & Mindfulness Coach',
    initials: 'SP', color: '#818CF8',
    rating: 4.8, students: 9800,
    tags: ['Yoga', 'Meditasi', 'Fleksibilitas'],
    bio: 'RYT-500 Yoga Alliance. Spesialis pemulihan cedera dan mindfulness.',
  },
  {
    name: 'Dimas Wibowo', role: 'Strength & Bodyweight Expert',
    initials: 'DW', color: '#4ADE80',
    rating: 4.9, students: 15200,
    tags: ['Kekuatan', 'Bodyweight', 'Calisthenics'],
    bio: 'Mantan atlet calisthenics nasional. Ahli latihan tanpa alat.',
  },
  {
    name: 'Anisa Rahma', role: 'Nutrition & Wellness Coach',
    initials: 'AR', color: '#00F2FE',
    rating: 4.7, students: 8500,
    tags: ['Nutrisi', 'Wellness', 'Pemula'],
    bio: 'S.Gz dari IPB. Spesialis program pemula dan manajemen berat badan.',
  },
];

const MISI = [
  { icon: <Heart size={18} color="#F87171" />, text: 'Menyediakan program latihan gratis, terstruktur, dan mudah dipraktikkan tanpa alat mahal.' },
  { icon: <Shield size={18} color="#4ADE80" />, text: 'Mengutamakan keselamatan, teknik gerakan yang benar, dan pencegahan cedera.' },
  { icon: <Users size={18} color="#00F2FE" />, text: 'Membangun komunitas kebugaran yang inklusif dan saling memotivasi.' },
  { icon: <Award size={18} color="#FBBF24" />, text: 'Mendorong konsistensi demi tercapainya kualitas hidup yang lebih baik.' },
];

export default function Tentang() {
  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.glow} />
        <span className="eyebrow-label"><Zap size={13} /> Tim Instruktur</span>
        <h1 className={styles.title}>
          Dilatih oleh yang<br />
          <span className={styles.titleGrad}>Terbaik di Bidangnya</span>
        </h1>
        <p className={styles.sub}>
          Setiap program FitLife dirancang dan dipantau oleh instruktur bersertifikat internasional.
        </p>
      </section>

      {/* ── Instructor Grid ── */}
      <section className={styles.instrSection}>
        <div className={styles.instrGrid}>
          {INSTRUCTORS.map(instr => (
            <div key={instr.name} className={styles.instrCard} style={{ '--accent': instr.color }}>
              {/* Avatar */}
              <div className={styles.avatarWrap}>
                <div className={styles.avatar} style={{ background: `linear-gradient(135deg, ${instr.color}, ${instr.color}99)` }}>
                  {instr.initials}
                </div>
                <div className={styles.ratingBadge}>
                  <Star size={11} fill="#FBBF24" color="#FBBF24" />
                  {instr.rating}
                </div>
              </div>

              <h3 className={styles.instrName}>{instr.name}</h3>
              <p className={styles.instrRole}>{instr.role}</p>
              <p className={styles.instrBio}>{instr.bio}</p>

              {/* Tags */}
              <div className={styles.tagRow}>
                {instr.tags.map(t => (
                  <span key={t} className={styles.tag} style={{ color: instr.color, background: `${instr.color}15`, border: `1px solid ${instr.color}30` }}>{t}</span>
                ))}
              </div>

              <div className={styles.instrFooter}>
                <Users size={14} color="#64748B" />
                <span>{instr.students.toLocaleString()} murid</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Visi Misi ── */}
      <section className={styles.visiSection}>
        <div className={styles.visiInner}>
          <span className="eyebrow-label">Tentang Kami</span>
          <h2 className={styles.visiTitle}>Visi & Misi FitLife</h2>

          <div className={styles.visiBox}>
            <Award size={24} color="#FBBF24" />
            <div>
              <h4>Visi Kami</h4>
              <p>Menjadikan olahraga sebagai gaya hidup yang mudah diakses oleh semua orang Indonesia.</p>
            </div>
          </div>

          <div className={styles.misiGrid}>
            {MISI.map((m, i) => (
              <div key={i} className={styles.misiCard}>
                <div className={styles.misiIcon}>{m.icon}</div>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} />
        <h2>Siap Mulai Perjalananmu?</h2>
        <p>Bergabung bersama 50.000+ pengguna aktif FitLife Indonesia.</p>
        <Link to="/program" className={styles.ctaBtn}>
          Mulai Latihan Gratis →
        </Link>
      </section>
    </div>
  );
}
