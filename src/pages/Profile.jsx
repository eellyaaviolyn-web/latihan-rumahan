import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Zap, Award, Flame, Activity, Clock,
  Calendar, CheckCircle2, ChevronRight, Share2, Sparkles,
  TrendingUp, User, Lock, ExternalLink
} from 'lucide-react';
import { useToast } from '../components/Toast';
import styles from './Profile.module.css';

const TROPHIES = [
  {
    id: 'centurion',
    title: 'Centurion Streak',
    badge: '🛡️',
    description: '30 Hari konsisten berolahraga berturut-turut.',
    progress: 24,
    max: 30,
    unlocked: false,
    rarity: 'Legendary',
    color: '#10b981'
  },
  {
    id: 'apex',
    title: 'Apex Biomechanics',
    badge: '⚡',
    description: 'Akurasi Form AI >98% selama 10 sesi berturut-turut.',
    progress: 10,
    max: 10,
    unlocked: true,
    unlockedDate: '18 Sep 2026',
    rarity: 'Mythic',
    color: '#06b6d4'
  },
  {
    id: '100k',
    title: '100k Club',
    badge: '🔥',
    description: 'Akumulasi pembakaran 100,000 kkal telemetri terverifikasi.',
    progress: 68400,
    max: 100000,
    unlocked: false,
    rarity: 'Epic',
    color: '#f97316'
  },
  {
    id: 'iron-core',
    title: 'Iron Core',
    badge: '🦾',
    description: 'Penyelesaian 50 jam modul ketahanan core & lumbal.',
    progress: 50,
    max: 50,
    unlocked: true,
    unlockedDate: '12 Sep 2026',
    rarity: 'Gold',
    color: '#f59e0b'
  }
];

const RECENT_SESSIONS = [
  {
    id: 1,
    name: 'Squat Masterclass HUD',
    date: 'Hari ini, 07:15',
    reps: '15 / 15 Reps',
    accuracy: 98.4,
    calories: '48.5 kcal',
    tut: '02:22',
    status: 'Verified AI'
  },
  {
    id: 2,
    name: 'Full Body HIIT Kinetic',
    date: 'Kemarin, 16:30',
    reps: '48 Reps Total',
    accuracy: 97.2,
    calories: '320 kcal',
    tut: '20:15',
    status: 'Verified AI'
  },
  {
    id: 3,
    name: 'Core & Lumbar Resilience',
    date: '22 Sep 2026',
    reps: '32 Reps Total',
    accuracy: 99.1,
    calories: '185 kcal',
    tut: '14:50',
    status: 'Verified AI'
  }
];

export default function Profile() {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const s = localStorage.getItem('fitlife_user');
    if (s) setUser(JSON.parse(s));
    else setUser({ name: 'Alex Pradipta', email: 'alex.athlete@fitlife.id' });
  }, []);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast('Tautan profil & Trophy Vault disalin ke clipboard!', 'success');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* ── Top Hero Identity Card ── */}
        <section className={styles.profileHeaderCard}>
          <div className={styles.profileGlow} />

          <div className={styles.identityRow}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarImg}>
                {user?.picture ? (
                  <img src={user.picture} alt={user.name} />
                ) : (
                  <span>{user?.name?.charAt(0) || 'A'}</span>
                )}
              </div>
              <span className={styles.proPill}>PRO ATHLETE</span>
            </div>

            <div className={styles.identityDetails}>
              <div className={styles.nameBadges}>
                <h1 className={styles.userName}>{user?.name || 'Alex Pradipta'}</h1>
                <span className={styles.verifiedBadge}>
                  <ShieldCheck size={14} /> AI Biomechanics Verified
                </span>
              </div>
              <p className={styles.userEmail}>{user?.email || 'alex.athlete@fitlife.id'}</p>
              <div className={styles.metaChips}>
                <span>🇮🇩 Jakarta, ID</span>
                <span>•</span>
                <span>Tier: <strong>Titan Pro</strong></span>
                <span>•</span>
                <span>Member Sejak: <strong>Jan 2026</strong></span>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button onClick={handleShare} className={styles.shareBtn}>
                <Share2 size={16} /> Share Vault
              </button>
              <button onClick={() => navigate('/ai-studio')} className={styles.launchStudioBtn}>
                <Zap size={16} /> Buka AI Studio
              </button>
            </div>
          </div>

          {/* Telemetry Stats Strip */}
          <div className={styles.telemetryStrip}>
            <div className={styles.telemetryCard}>
              <div className={styles.telHeader}>
                <Sparkles size={16} color="#10b981" />
                <span>DAILY READINESS</span>
              </div>
              <div className={styles.telValueEmerald}>94%</div>
              <span className={styles.telSub}>Neuromuscular Peak</span>
            </div>

            <div className={styles.telemetryCard}>
              <div className={styles.telHeader}>
                <Activity size={16} color="#06b6d4" />
                <span>AVG FORM ACCURACY</span>
              </div>
              <div className={styles.telValueCyan}>97.9%</div>
              <span className={styles.telSub}>Top 1% Global Athlete</span>
            </div>

            <div className={styles.telemetryCard}>
              <div className={styles.telHeader}>
                <Flame size={16} color="#f97316" />
                <span>VERIFIED CALORIES</span>
              </div>
              <div className={styles.telValueOrange}>68.4k <small>kcal</small></div>
              <span className={styles.telSub}>Telemetri Terkalibrasi</span>
            </div>

            <div className={styles.telemetryCard}>
              <div className={styles.telHeader}>
                <Clock size={16} color="#818cf8" />
                <span>TIME UNDER TENSION</span>
              </div>
              <div className={styles.telValuePurple}>84.5 <small>jam</small></div>
              <span className={styles.telSub}>Total Reps: 1.420</span>
            </div>
          </div>
        </section>

        {/* ── Trophy Vault Section ── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>🏆 Gamifikasi & Rekognisi</span>
              <h2 className={styles.sectionTitle}>Trophy Vault</h2>
              <p className={styles.sectionSub}>Lencana prestasi yang divalidasi oleh algoritma sensor biomekanika FitLife.</p>
            </div>
            <div className={styles.trophyCounter}>
              <span>Terkumpul: <strong>2 / 4</strong> Master Lencana</span>
            </div>
          </div>

          <div className={styles.trophyGrid}>
            {TROPHIES.map(trophy => {
              const pct = Math.round((trophy.progress / trophy.max) * 100);
              return (
                <div
                  key={trophy.id}
                  className={`${styles.trophyCard} ${trophy.unlocked ? styles.trophyUnlocked : styles.trophyLocked}`}
                >
                  <div className={styles.trophyTop}>
                    <div className={styles.trophyBadgeIcon} style={{ background: `${trophy.color}15`, borderColor: `${trophy.color}35` }}>
                      <span>{trophy.badge}</span>
                    </div>
                    <span className={styles.rarityPill} style={{ color: trophy.color, background: `${trophy.color}15` }}>
                      {trophy.rarity}
                    </span>
                  </div>

                  <h3 className={styles.trophyTitle}>{trophy.title}</h3>
                  <p className={styles.trophyDesc}>{trophy.description}</p>

                  <div className={styles.trophyProgressSection}>
                    <div className={styles.progressRow}>
                      <span>{trophy.unlocked ? 'Tercapai Sempurna' : 'Progres Target'}</span>
                      <span className={styles.progressNum}>
                        {trophy.progress.toLocaleString()} / {trophy.max.toLocaleString()}
                      </span>
                    </div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{
                          width: `${pct}%`,
                          background: trophy.unlocked ? trophy.color : 'rgba(255,255,255,0.2)'
                        }}
                      />
                    </div>
                  </div>

                  {trophy.unlocked ? (
                    <div className={styles.unlockedFooter}>
                      <CheckCircle2 size={14} color="#10b981" />
                      <span>Terbuka pada {trophy.unlockedDate}</span>
                    </div>
                  ) : (
                    <div className={styles.lockedFooter}>
                      <Lock size={14} color="#64748b" />
                      <span>Sisa {trophy.max - trophy.progress} untuk membuka</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Biomechanical Logs History ── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>📊 Log Telemetri Terverifikasi</span>
              <h2 className={styles.sectionTitle}>Riwayat Sesi Latihan AI</h2>
            </div>
            <Link to="/ai-studio" className={styles.viewMoreLink}>
              Mulai Sesi Baru <ChevronRight size={16} />
            </Link>
          </div>

          <div className={styles.logsTableWrapper}>
            <table className={styles.logsTable}>
              <thead>
                <tr>
                  <th>Modul Latihan</th>
                  <th>Waktu</th>
                  <th>Repetisi / Set</th>
                  <th>Form Accuracy</th>
                  <th>Kalori</th>
                  <th>Time (TUT)</th>
                  <th>Verifikasi</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_SESSIONS.map(session => (
                  <tr key={session.id}>
                    <td>
                      <div className={styles.sessionName}>
                        <Zap size={14} color="#10b981" />
                        <strong>{session.name}</strong>
                      </div>
                    </td>
                    <td className={styles.sessionDate}>{session.date}</td>
                    <td>{session.reps}</td>
                    <td>
                      <span className={styles.accuracyPill}>
                        {session.accuracy}%
                      </span>
                    </td>
                    <td className={styles.sessionCal}>{session.calories}</td>
                    <td>{session.tut}</td>
                    <td>
                      <span className={styles.verifiedTag}>
                        <ShieldCheck size={13} /> {session.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
