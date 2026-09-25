import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare, Users, Award, Heart, ThumbsUp, Flame,
  ShieldCheck, Zap, ArrowRight, Trophy, Sparkles, Filter
} from 'lucide-react';
import styles from './Komunitas.module.css';

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Sarah Amelia', initial: 'S', color: '#FBBF24', accuracy: 99.4, reps: 1450, city: 'Jakarta, ID', badge: 'Apex Master' },
  { rank: 2, name: 'Rizky Pratama', initial: 'R', color: '#06b6d4', accuracy: 98.8, reps: 1320, city: 'Surabaya, ID', badge: 'Centurion' },
  { rank: 3, name: 'Kamu (Alex P.)', initial: 'A', color: '#10b981', accuracy: 97.9, reps: 1420, city: 'Jakarta, ID', badge: 'Apex Master', isMe: true },
  { rank: 4, name: 'Dimas Anggara', initial: 'D', color: '#818cf8', accuracy: 97.4, reps: 980, city: 'Bandung, ID', badge: 'Iron Core' },
  { rank: 5, name: 'Ayu Fitriani', initial: 'A', color: '#f97316', accuracy: 96.8, reps: 1150, city: 'Medan, ID', badge: 'Centurion' }
];

const POSTS = [
  {
    name: 'Sarah Amelia', initial: 'S', color: '#FBBF24', time: '15 menit lalu',
    text: 'Baru saja tembus 99.4% Form Accuracy di AI Studio Squat Masterclass! Kuncinya ada di stance lock 15° dan dorongan tumit saat concentric. Semangat atlet FitLife! 🔥',
    likes: 64, tags: ['KineticAI', 'SquatMasterclass', 'Apex'],
  },
  {
    name: 'Rizky Pratama', initial: 'R', color: '#06b6d4', time: '45 menit lalu',
    text: 'Streak 24 hari berjalan menuju Centurion Trophy. Sensor AI beneran ngebantu ngoreksi posisi punggung waktu squat biar nggak bungkuk. 💪',
    likes: 48, tags: ['CenturionStreak', 'Biomechanics'],
  },
  {
    name: 'Dimas Anggara', initial: 'D', color: '#818cf8', time: '2 jam lalu',
    text: 'Target turun 5kg tercapai dengan deficit kalori dari AI Macro Calculator + 4x sesi HIIT mingguan. Data telemetri bener-bener akurat!',
    likes: 127, tags: ['MacroAI', 'FatLoss'],
  }
];

export default function Komunitas() {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(POSTS.map(p => p.likes));
  const [liked, setLiked] = useState(POSTS.map(() => false));
  const [regionFilter, setRegionFilter] = useState('all'); // 'all' | 'id'
  const [challengeJoined, setChallengeJoined] = useState(false);

  const handleLike = (i) => {
    const newLiked = [...liked];
    const newLikes = [...likes];
    newLiked[i] = !newLiked[i];
    newLikes[i] += newLiked[i] ? 1 : -1;
    setLiked(newLiked);
    setLikes(newLikes);
  };

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <span className="eyebrow-label"><Users size={13} /> Komunitas & Leaderboard</span>
        <h1 className={styles.title}>
          Global Performance &<br />
          <span className={styles.titleGrad}>Form-Accuracy Leaderboard</span>
        </h1>
        <p className={styles.sub}>
          Peringkat atlet divalidasi oleh konsistensi sensor biomekanika AI (&gt;95% Akurasi Form),
          bukan sekadar durasi latihan.
        </p>
      </section>

      {/* ── Global Form Accuracy Leaderboard (PRD 4.5) ── */}
      <section className={styles.leaderboardSection}>
        <div className={styles.leaderboardCard}>
          <div className={styles.leaderboardHead}>
            <div className={styles.headLeft}>
              <Trophy size={20} color="#10b981" />
              <div>
                <h2 className={styles.boardTitle}>Papan Peringkat Akurasi Form AI</h2>
                <span className={styles.boardSub}>Divalidasi real-time melalui Kinetic Vision Telemetry</span>
              </div>
            </div>

            <div className={styles.boardActions}>
              <div className={styles.filterToggle}>
                <button
                  className={`${styles.toggleBtn} ${regionFilter === 'all' ? styles.toggleActive : ''}`}
                  onClick={() => setRegionFilter('all')}
                >
                  Global
                </button>
                <button
                  className={`${styles.toggleBtn} ${regionFilter === 'id' ? styles.toggleActive : ''}`}
                  onClick={() => setRegionFilter('id')}
                >
                  🇮🇩 Indonesia
                </button>
              </div>
              <button onClick={() => navigate('/ai-studio')} className={styles.challengeCtaBtn}>
                <Zap size={15} /> Uji Form di AI Studio
              </button>
            </div>
          </div>

          <div className={styles.tableResponsive}>
            <table className={styles.leaderTable}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Atlet</th>
                  <th>Lokasi</th>
                  <th>Akurasi Sensor AI</th>
                  <th>Repetisi Valid</th>
                  <th>Status Lencana</th>
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD_DATA.map((row) => (
                  <tr key={row.rank} className={row.isMe ? styles.myRow : ''}>
                    <td>
                      <span className={`${styles.rankBadge} ${styles[`rank${row.rank}`] || ''}`}>
                        {row.rank === 1 ? '🥇 #1' : row.rank === 2 ? '🥈 #2' : row.rank === 3 ? '🥉 #3' : `#${row.rank}`}
                      </span>
                    </td>
                    <td>
                      <div className={styles.athleteRow}>
                        <div className={styles.athleteAvatar} style={{ background: row.color }}>
                          {row.initial}
                        </div>
                        <strong>{row.name}</strong>
                      </div>
                    </td>
                    <td className={styles.cityTxt}>{row.city}</td>
                    <td>
                      <span className={styles.accuracyTag}>
                        <ShieldCheck size={13} /> {row.accuracy}% Form
                      </span>
                    </td>
                    <td className={styles.repsTxt}>{row.reps.toLocaleString()} Reps</td>
                    <td>
                      <span className={styles.badgePill}>{row.badge}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Challenge Banner ── */}
      <section className={styles.challengeSection}>
        <div className={styles.challengeCard}>
          <div className={styles.challengeLeft}>
            <div className={styles.challengeTag}><Flame size={13} /> Challenge Aktif</div>
            <h3>30 Hari Squat Parallel & Core Challenge 🏆</h3>
            <p>Raih 100 repetisi squat dengan kedalaman sudut 88° tervalidasi AI per hari selama 30 hari. 4.820 atlet bergabung!</p>
            <div className={styles.challengeProgress}>
              <div className={styles.challengeBar}>
                <div className={styles.challengeFill} style={{ width: '64%' }} />
              </div>
              <span>16.200 / 30.000 target komunitas hari ini</span>
            </div>
          </div>
          <div className={styles.challengeRight}>
            <div className={styles.challengeEmoji}>🦾</div>
            <button
              className={`${styles.joinBtn} ${challengeJoined ? styles.joinedBtn : ''}`}
              onClick={() => setChallengeJoined(!challengeJoined)}
            >
              {challengeJoined ? '✓ Bergabung' : 'Ikuti Challenge'}
            </button>
          </div>
        </div>
      </section>

      {/* ── Community Feed ── */}
      <section className={styles.feedSection}>
        <div className={styles.feedHeader}>
          <h2 className={styles.feedTitle}>Diskusi & Telemetri Terbaru 🔥</h2>
          <span className={styles.feedCount}>50K+ Member Aktif</span>
        </div>

        <div className={styles.feed}>
          {POSTS.map((post, i) => (
            <div key={i} className={styles.post}>
              <div className={styles.avatar} style={{ background: `linear-gradient(135deg, ${post.color}, ${post.color}99)` }}>
                {post.initial}
              </div>
              <div className={styles.postContent}>
                <div className={styles.postHeader}>
                  <h4>{post.name}</h4>
                  <span className={styles.time}>{post.time}</span>
                </div>
                <p>{post.text}</p>
                <div className={styles.postTags}>
                  {post.tags.map(t => <span key={t} className={styles.postTag}>#{t}</span>)}
                </div>
                <button
                  className={`${styles.likeBtn} ${liked[i] ? styles.likeBtnActive : ''}`}
                  onClick={() => handleLike(i)}
                >
                  <ThumbsUp size={14} />
                  {likes[i]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
