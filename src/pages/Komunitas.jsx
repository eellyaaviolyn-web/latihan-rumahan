import React, { useState } from 'react';
import { MessageSquare, Users, Award, Heart, ThumbsUp, Flame, Target } from 'lucide-react';
import styles from './Komunitas.module.css';

const POSTS = [
  {
    name: 'Rizky Pratama', initial: 'R', color: '#818CF8', time: '10 menit lalu',
    text: 'Baru saja selesai program HIIT Fat Burn Hari 14! Keringat ngucur deras tapi rasanya luar biasa. Semangat terus buat yang lain! 💪',
    likes: 48, tags: ['HIIT', 'Day14'],
  },
  {
    name: 'Sarah Amelia', initial: 'S', color: '#FBBF24', time: '45 menit lalu',
    text: 'Ada yang punya tips buat ngilangin nyeri otot setelah leg day? Kemarin nyoba program lower body dan sekarang jalan aja susah 😂',
    likes: 31, tags: ['Recovery', 'Tanya'],
  },
  {
    name: 'Dimas Anggara', initial: 'D', color: '#4ADE80', time: '2 jam lalu',
    text: 'Target turun 5kg tercapai dalam 2 bulan cuma pakai latihan bodyweight dari FitLife! Makasih buat AI Trainer-nya yang ngebantu nyusun jadwal. 🔥',
    likes: 127, tags: ['WeightLoss', 'Achievement'],
  },
  {
    name: 'Ayu Fitriani', initial: 'A', color: '#00F2FE', time: '5 jam lalu',
    text: 'Streak 30 hari tercapai! Tidak ada yang mustahil kalau konsisten. Yuk semangat semuanya! 🏆',
    likes: 203, tags: ['Streak30', 'Motivasi'],
  },
];

export default function Komunitas() {
  const [likes, setLikes] = useState(POSTS.map(p => p.likes));
  const [liked, setLiked] = useState(POSTS.map(() => false));
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
        <span className="eyebrow-label"><Users size={13} /> Komunitas</span>
        <h1 className={styles.title}>
          Bersama Lebih Kuat,<br />
          <span className={styles.titleGrad}>Bersama Lebih Jauh</span>
        </h1>
        <p className={styles.sub}>Bergabung dengan 50.000+ member aktif — share progress, tanya tips, dan saling memotivasi!</p>
      </section>

      {/* ── Stats ── */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {[
            { icon: <Users size={22} color="#00F2FE" />, val: '52.140', label: 'Member Aktif', glow: 'rgba(0,242,254,0.15)' },
            { icon: <MessageSquare size={22} color="#4ADE80" />, val: '12.400', label: 'Diskusi Hari Ini', glow: 'rgba(74,222,128,0.15)' },
            { icon: <Award size={22} color="#FBBF24" />, val: '1.200', label: 'Program Selesai', glow: 'rgba(251,191,36,0.15)' },
            { icon: <Flame size={22} color="#FF5500" />, val: '8.900', label: 'Streak Aktif', glow: 'rgba(255,85,0,0.15)' },
          ].map(s => (
            <div key={s.label} className={styles.statBox} style={{ '--glow': s.glow }}>
              <div className={styles.statIcon}>{s.icon}</div>
              <div className={styles.statVal}>{s.val}</div>
              <div className={styles.statLbl}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Challenge Banner ── */}
      <section className={styles.challengeSection}>
        <div className={styles.challengeCard}>
          <div className={styles.challengeLeft}>
            <div className={styles.challengeTag}><Flame size={13} /> Challenge Aktif</div>
            <h3>30 Hari Push Up Challenge 🏆</h3>
            <p>Selesaikan 100 push up per hari selama 30 hari berturut-turut. 4.820 member sudah bergabung!</p>
            <div className={styles.challengeProgress}>
              <div className={styles.challengeBar}>
                <div className={styles.challengeFill} style={{ width: '64%' }} />
              </div>
              <span>16.200 / 30.000 target hari ini</span>
            </div>
          </div>
          <div className={styles.challengeRight}>
            <div className={styles.challengeEmoji}>💪</div>
            <button
              className={`${styles.joinBtn} ${challengeJoined ? styles.joinedBtn : ''}`}
              onClick={() => setChallengeJoined(!challengeJoined)}
            >
              {challengeJoined ? '✓ Bergabung' : 'Ikut Challenge'}
            </button>
          </div>
        </div>
      </section>

      {/* ── Feed ── */}
      <section className={styles.feedSection}>
        <h2 className={styles.feedTitle}>Aktivitas Terbaru 🔥</h2>
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
