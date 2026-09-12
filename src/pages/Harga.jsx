import React, { useState } from 'react';
import { Check, ChevronDown, Shield, Zap, RefreshCw, Star } from 'lucide-react';
import styles from './Harga.module.css';

const FAQS = [
  { q: 'Apakah ada kontrak jangka panjang?', a: 'Tidak ada! Kamu bisa berlangganan bulanan dan batal kapan saja tanpa biaya tambahan.' },
  { q: 'Bagaimana cara mengakses program setelah berlangganan?', a: 'Setelah pembayaran berhasil, semua konten premium langsung bisa diakses melalui akun kamu.' },
  { q: 'Apakah bisa digunakan di beberapa perangkat?', a: 'Ya! Akun Pro FitLife bisa diakses di smartphone, tablet, dan laptop secara bersamaan.' },
  { q: 'Bagaimana jika saya tidak puas?', a: 'Kami memberikan garansi uang kembali 14 hari tanpa pertanyaan apapun.' },
];

export default function Harga() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const monthlyPrice = 99000;
  const annualMonthly = 69000;

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <span className="eyebrow-label">Harga</span>
        <h1 className={styles.title}>Pilih Paket yang<br /><span className={styles.titleGrad}>Tepat Untukmu</span></h1>
        <p className={styles.sub}>Mulai gratis, upgrade kapan saja. Tidak ada biaya tersembunyi.</p>

        {/* Toggle */}
        <div className={styles.toggle}>
          <span className={!isAnnual ? styles.toggleActive : styles.toggleInactive}>Bulanan</span>
          <button className={`${styles.toggleBtn} ${isAnnual ? styles.toggleBtnOn : ''}`}
            onClick={() => setIsAnnual(!isAnnual)} aria-label="Toggle billing">
            <span className={styles.toggleKnob} />
          </button>
          <span className={isAnnual ? styles.toggleActive : styles.toggleInactive}>
            Tahunan
            <span className={styles.saveBadge}>Hemat 30%</span>
          </span>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className={styles.plansSection}>
        <div className={styles.plansGrid}>
          {/* Free */}
          <div className={styles.card}>
            <h3>Pemula</h3>
            <div className={styles.price}>
              <span>Rp 0</span>
              <small>/bulan</small>
            </div>
            <p className={styles.planDesc}>Sempurna untuk mulai perjalanan fitness kamu.</p>
            <ul className={styles.features}>
              {['50 video latihan dasar', 'Pelacak kalori harian', 'Jadwal latihan mingguan', 'Komunitas publik'].map(f => (
                <li key={f}><Check size={16} color="#4ADE80" /><span>{f}</span></li>
              ))}
            </ul>
            <button className={styles.btnGhost}>Mulai Gratis →</button>
          </div>

          {/* Pro */}
          <div className={`${styles.card} ${styles.proCard}`}>
            <div className={styles.shimmerBorder} />
            <div className={styles.badge}>🏆 Paling Populer</div>
            <h3>Pro FitLife</h3>
            <div className={styles.price}>
              <span>Rp {(isAnnual ? annualMonthly : monthlyPrice).toLocaleString('id-ID')}</span>
              <small>/bulan</small>
            </div>
            {isAnnual && <p className={styles.annualNote}>Ditagih Rp {(annualMonthly * 12).toLocaleString('id-ID')}/tahun</p>}
            <p className={styles.planDesc}>Untuk kamu yang serius ingin hasil nyata dan cepat.</p>
            <ul className={styles.features}>
              {[
                '500+ video HD premium', 'AI Personal Trainer 24/7',
                'Program latihan kustom', 'Analitik tubuh & progress',
                'Leaderboard VIP eksklusif', 'Chat langsung dengan instruktur'
              ].map(f => (
                <li key={f}><Check size={16} color="#FF5500" /><span>{f}</span></li>
              ))}
            </ul>
            <button className={styles.btnPrimary}>
              {isAnnual ? 'Mulai Pro Tahunan' : 'Coba Gratis 14 Hari'} →
            </button>
            <p className={styles.cancelNote}>Batal kapan saja, tanpa biaya</p>
          </div>
        </div>

        {/* Trust badges */}
        <div className={styles.trustRow}>
          {[
            { icon: <Shield size={16} />, text: 'Pembayaran Aman & Terenkripsi' },
            { icon: <RefreshCw size={16} />, text: 'Garansi Uang Kembali 14 Hari' },
            { icon: <Star size={16} fill="#FBBF24" color="#FBBF24" />, text: '4.9/5 Rating dari 50K+ Pengguna' },
            { icon: <Zap size={16} />, text: 'Akses Instan Setelah Pembayaran' },
          ].map(t => (
            <div key={t.text} className={styles.trustItem}>
              {t.icon} {t.text}
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <h2 className={styles.faqTitle}>Pertanyaan yang Sering Ditanyakan</h2>
          <div className={styles.faqList}>
            {FAQS.map((faq, i) => (
              <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}>
                <button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className={styles.faqIcon} />
                </button>
                {openFaq === i && <p className={styles.faqA}>{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
