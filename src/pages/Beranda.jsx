import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Star, Play, Brain, Dumbbell,
  Users, Flame, Heart, Zap, Target, Award, Activity
} from 'lucide-react';
import styles from './Beranda.module.css';

/* ─── 3D Tilt hook ─── */
function useTilt(deg = 9) {
  const onMouseMove = useCallback((e) => {
    const el = e.currentTarget;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    el.style.transition = 'transform 0.06s ease';
    el.style.transform  = `perspective(900px) rotateX(${y * -deg}deg) rotateY(${x * deg}deg) scale3d(1.02,1.02,1.02)`;
  }, [deg]);
  const onMouseLeave = useCallback((e) => {
    e.currentTarget.style.transition = 'transform 0.5s ease';
    e.currentTarget.style.transform  = '';
  }, []);
  return { onMouseMove, onMouseLeave };
}

/* ─── SVG Progress Ring ─── */
function Ring({ pct = 75, color = '#FF5500', size = 60, stroke = 5 }) {
  const r    = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ - (pct / 100) * circ}
        style={{ filter: `drop-shadow(0 0 7px ${color}90)`, transition: 'stroke-dashoffset 1.2s ease' }}
      />
    </svg>
  );
}

/* ─── Animated ECG Waveform ─── */
function ECGWave() {
  const d = 'M0,24 L55,24 L70,14 L85,24 L115,24 L119,30 L126,4 L133,42 L140,24 L162,24 L183,11 L204,24 L300,24';
  return (
    <div className={styles.ecgOuter}>
      <div className={styles.ecgTrack}>
        {[0, 1].map(i => (
          <svg key={i} viewBox="0 0 300 48" className={styles.ecgSvg} preserveAspectRatio="none">
            <path d={d} fill="none" stroke="#4ADE80" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 0 3px #4ADE80)' }} />
          </svg>
        ))}
      </div>
    </div>
  );
}

/* ─── Animated Burn Bars ─── */
function PulseBars() {
  const heights = [38, 65, 42, 80, 52, 72, 46, 88, 60, 76, 50, 68];
  return (
    <div className={styles.pulseBars}>
      {heights.map((h, i) => (
        <div key={i} className={styles.pulseBar}
          style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }} />
      ))}
    </div>
  );
}

/* ─── Main Component ─── */
export default function Beranda() {
  const navigate = useNavigate();
  const tilt = useTilt(8);

  const handleTilt = tilt.onMouseMove;
  const resetTilt  = tilt.onMouseLeave;

  return (
    <div className={styles.page}>

      {/* ════════════════ HERO ════════════════ */}
      <section className={styles.hero}>
        {/* Ambient glow layers */}
        <div className={styles.ambOrange} />
        <div className={styles.ambTeal}   />
        <div className={styles.gridBg}    />

        <div className={styles.heroGrid}>

          {/* ── LEFT ── */}
          <div className={styles.heroLeft}>

            {/* Top Badge */}
            <div className={styles.topBadge}>
              <span>🔥</span>
              <span>#1 Platform Fitness Rumahan di Indonesia</span>
              <span className={styles.badgeStarRow}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill="#FBBF24" color="#FBBF24" />
                ))}
              </span>
            </div>

            {/* Headline */}
            <h1 className={styles.headline}>
              Bentuk Tubuh<br />
              Impian dari Rumah.<br />
              <span className={styles.headlineGrad}>Tanpa&nbsp;Alat,<br />Hasil&nbsp;Maksimal.</span>
            </h1>

            {/* Sub */}
            <p className={styles.sub}>
              Akses <strong>500+ program latihan</strong> HD terstruktur yang disesuaikan
              dengan tingkat kebugaranmu. Cukup <strong>15–30 menit sehari</strong>.
            </p>

            {/* CTA Group */}
            <div className={styles.ctaRow}>
              <button type="button" className={styles.ctaPrimary}
                onClick={() => navigate('/program')}>
                Coba Gratis 14 Hari <ArrowRight size={17} />
              </button>
              <button type="button" className={styles.ctaGhost}
                onClick={() => navigate('/program')}>
                <span className={styles.playDot}><Play size={12} fill="white" /></span>
                Lihat Demo Video
              </button>
            </div>

            {/* Social Proof */}
            <div className={styles.proof}>
              <div className={styles.avatars}>
                {['#FF5500', '#818CF8', '#4ADE80', '#22D3EE', '#FBBF24'].map((c, i) => (
                  <span key={i} className={styles.av}
                    style={{ background: c, zIndex: 5 - i }}>
                    {['R', 'S', 'D', 'A', 'F'][i]}
                  </span>
                ))}
              </div>
              <div className={styles.proofText}>
                <span><strong>50.000+</strong> pengguna di Indonesia</span>
                <span className={styles.rating}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#FBBF24" color="#FBBF24" />)}
                  <strong>4.9</strong><span>/5.0</span>
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Visual Showcase ── */}
          <div className={styles.heroRight}>
            <div className={styles.centerGlow} />
            <div className={styles.orbitRing1} />
            <div className={styles.orbitRing2} />

            {/* Athlete centerpiece */}
            <div className={styles.athleteBubble}>
              <span className={styles.athleteEmoji}>🏃‍♂️</span>
            </div>

            {/* Card: Burn Rate (top-left) */}
            <div className={`${styles.fCard} ${styles.fCardBurn}`}>
              <div className={styles.fHeader}>
                <Flame size={13} color="#FF5500" />
                <span className={styles.fLabel}>Burn Rate</span>
                <span className={styles.livePill}>LIVE</span>
              </div>
              <div className={styles.fBig}>320 <sub>Kcal</sub></div>
              <PulseBars />
            </div>

            {/* Card: Program (top-right) */}
            <div className={`${styles.fCard} ${styles.fCardProg}`}>
              <div className={styles.fHeader}>
                <Zap size={13} color="#818CF8" />
                <span className={styles.fLabel}>Program Hari Ini</span>
              </div>
              <div className={styles.progName}>HIIT Fat Burn</div>
              <div className={styles.ringRow}>
                <Ring pct={75} color="#818CF8" size={54} stroke={4} />
                <div>
                  <div className={styles.ringPct} style={{ color: '#818CF8' }}>75%</div>
                  <div className={styles.ringLbl}>Selesai</div>
                </div>
              </div>
            </div>

            {/* Card: Heart Rate (bottom) */}
            <div className={`${styles.fCard} ${styles.fCardHR}`}>
              <div className={styles.fHeader}>
                <Heart size={13} color="#4ADE80" />
                <span className={styles.fLabel}>Heart Rate</span>
                <span className={styles.zonePill}>ZONA AKTIF</span>
              </div>
              <div className={styles.hrRow}>
                <span className={styles.fBig} style={{ fontSize: '1.5rem' }}>145 <sub>BPM</sub></span>
              </div>
              <ECGWave />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ BENTO GRID ════════════════ */}
      <section className={styles.bento}>
        <div className={styles.bentoHead}>
          <span className={styles.eyebrow}>Fitur Unggulan</span>
          <h2 className={styles.bentoTitle}>
            Semua yang Kamu Butuhkan,<br />Dalam Satu Platform
          </h2>
          <p className={styles.bentoSub}>
            Dirancang untuk hasil nyata — dari AI trainer hingga pelacak kalori pintar.
          </p>
        </div>

        <div className={styles.bentoGrid}>

          {/* ── Card 1: AI Trainer (Large, 2 cols) ── */}
          <div className={`${styles.bc} ${styles.bc1}`}
            onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <div className={styles.bcBadge} style={{ color: '#818CF8' }}>
              <Brain size={13} /> AI Personal Trainer
            </div>
            <h3 className={styles.bcTitle}>Pelatih AI yang<br />Selalu Ada Untukmu</h3>

            <div className={styles.chatWrap}>
              {[
                { role: 'ai',   text: 'Halo! Hari ini fokus **Upper Body**. Mulai dengan Push Up 3×12 💪' },
                { role: 'user', text: 'Bisa tambahin latihan core?' },
                { role: 'ai',   text: 'Tentu! **Plank 3×30 detik** setelah Push Up. Let\'s go 🔥' },
              ].map((m, i) => (
                <div key={i} className={`${styles.msg} ${m.role === 'user' ? styles.msgUser : ''}`}>
                  {m.role === 'ai' && <span className={styles.aiAv}>🤖</span>}
                  <div className={`${styles.bubble} ${m.role === 'user' ? styles.bubbleUser : ''}`}
                    dangerouslySetInnerHTML={{
                      __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }} />
                </div>
              ))}
            </div>

            <div className={styles.pills}>
              {['Push Up 3×12', 'Plank 3×30s', 'Tricep Dip 3×10'].map(p => (
                <span key={p} className={styles.pill}>{p}</span>
              ))}
            </div>
          </div>

          {/* ── Card 2: Tanpa Alat ── */}
          <div className={`${styles.bc} ${styles.bc2}`}
            onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <div className={styles.bcBadge} style={{ color: '#FF5500' }}>
              <Dumbbell size={13} /> Tanpa Peralatan
            </div>
            <h3 className={styles.bcTitle}>Efektif di<br />Ruang Sempit</h3>

            <div className={styles.exGrid}>
              {[
                { e: '💪', n: 'Push Up' },
                { e: '🦵', n: 'Squat' },
                { e: '🧘', n: 'Plank' },
                { e: '🔥', n: 'Burpee' },
              ].map(({ e, n }) => (
                <div key={n} className={styles.exCard}>
                  <span className={styles.exEm}>{e}</span>
                  <span className={styles.exNm}>{n}</span>
                </div>
              ))}
            </div>

            <div className={styles.greenBadge}>✓ 0 Peralatan Diperlukan</div>
          </div>

          {/* ── Card 3: Komunitas ── */}
          <div className={`${styles.bc} ${styles.bc3}`}
            onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <div className={styles.bcBadge} style={{ color: '#22D3EE' }}>
              <Users size={13} /> Komunitas
            </div>
            <h3 className={styles.bcTitle}>Leaderboard<br />Harian</h3>

            <div className={styles.lb}>
              {[
                { rank: 1, name: 'Sarah A.',  pts: 2840, color: '#FBBF24' },
                { rank: 2, name: 'Rizki B.',  pts: 2720, color: '#94A3B8' },
                { rank: 3, name: 'Kamu',      pts: 2650, color: '#FF5500', me: true },
              ].map(u => (
                <div key={u.rank} className={`${styles.lbRow} ${u.me ? styles.lbMe : ''}`}>
                  <span className={styles.lbRk} style={{ color: u.color }}>#{u.rank}</span>
                  <span className={styles.lbNm}>{u.name}</span>
                  <span className={styles.lbPt}>{u.pts.toLocaleString()} <small>pts</small></span>
                </div>
              ))}
            </div>

            <div className={styles.streakChip}>
              <Award size={12} /> Streak 7 Hari 🔥
            </div>
          </div>

          {/* ── Card 4: Kalori (2 cols) ── */}
          <div className={`${styles.bc} ${styles.bc4}`}
            onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <div className={styles.bcBadge} style={{ color: '#4ADE80' }}>
              <Target size={13} /> Pelacak Kalori Otomatis
            </div>
            <h3 className={styles.bcTitle}>Kalori Terbakar Hari Ini</h3>

            <div className={styles.kcRow}>
              {/* Ring */}
              <div className={styles.kcRingWrap}>
                <Ring pct={68} color="#4ADE80" size={110} stroke={7} />
                <div className={styles.kcCenter}>
                  <span className={styles.kcNum}>1.240</span>
                  <span className={styles.kcUnit}>kkal</span>
                </div>
              </div>

              {/* Stats */}
              <div className={styles.kcStats}>
                {[
                  { label: 'Target Harian',  val: '1.800 kkal', c: '#4ADE80' },
                  { label: 'Kalori Tersisa', val: '560 kkal',   c: '#94A3B8' },
                  { label: 'Sesi Latihan',   val: '3 sesi',     c: '#FF5500' },
                  { label: 'Durasi Total',   val: '54 menit',   c: '#818CF8' },
                ].map(s => (
                  <div key={s.label} className={styles.kcStat}>
                    <span className={styles.kcVal} style={{ color: s.c }}>{s.val}</span>
                    <span className={styles.kcLbl}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Mini breakdown bars */}
              <div className={styles.kcBars}>
                {[
                  { label: 'Kardio',     pct: 68, c: '#FF5500' },
                  { label: 'Kekuatan',   pct: 45, c: '#818CF8' },
                  { label: 'Peregangan', pct: 30, c: '#4ADE80' },
                ].map(b => (
                  <div key={b.label} className={styles.kcBarItem}>
                    <span className={styles.kcBarLabel}>{b.label}</span>
                    <div className={styles.kcBarTrack}>
                      <div className={styles.kcBarFill}
                        style={{ width: `${b.pct}%`, background: b.c }} />
                    </div>
                    <span className={styles.kcBarPct} style={{ color: b.c }}>{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ CTA FOOTER ════════════════ */}
      <section className={styles.ctaBanner}>
        <div className={styles.bannerGlow} />
        <div className={styles.bannerInner}>
          <span className={styles.eyebrow}>Mulai Hari Ini</span>
          <h2 className={styles.bannerTitle}>Siap untuk Transformasi?</h2>
          <p className={styles.bannerSub}>
            Bergabung bersama <strong>50.000+</strong> pengguna aktif.
            Gratis selamanya — mulai dalam 30 detik.
          </p>
          <div className={styles.bannerBtns}>
            <button type="button" className={styles.ctaPrimary}
              onClick={() => navigate('/program')}>
              Coba Gratis 14 Hari <ArrowRight size={17} />
            </button>
            <button type="button" className={styles.ctaGhost}
              onClick={() => navigate('/jadwal')}>
              Lihat Jadwal Latihan
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
