import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Users, Award } from 'lucide-react';
import styles from './Tentang.module.css';

export default function Tentang() {
  const misiData = [
    {
      icon: <Heart size={20} />,
      text: 'Menyediakan panduan program latihan rumahan yang gratis, terstruktur, dan mudah dipraktikkan oleh siapa saja tanpa membutuhkan alat mahal.'
    },
    {
      icon: <Shield size={20} />,
      text: 'Memberikan edukasi kebugaran yang tepat dengan mengutamakan keselamatan, teknik gerakan yang benar, dan pencegahan cedera.'
    },
    {
      icon: <Users size={20} />,
      text: 'Membangun komunitas kebugaran yang inklusif, saling memotivasi, dan mendukung perjalanan transformasi hidup sehat bersama.'
    },
    {
      icon: <Award size={20} />,
      text: 'Mendorong konsistensi dan pencapaian target kebugaran pribadi demi tercapainya kualitas hidup yang lebih baik.'
    }
  ];

  const safetyTips = [
    'Selalu lakukan pemanasan 5-10 menit sebelum latihan untuk mempersiapkan sendi dan otot.',
    'Gunakan pakaian yang nyaman serta alas atau matras yang tidak licin demi menjaga stabilitas gerakan.',
    'Jaga postur tubuh yang benar pada setiap gerakan dan utamakan teknik daripada kecepatan atau beban.',
    'Minum air yang cukup sebelum, saat istirahat, dan setelah latihan untuk menjaga keseimbangan hidrasi tubuh.',
    'Konsultasikan dengan dokter jika memiliki kondisi kesehatan khusus atau riwayat cedera sebelum memulai rutinitas baru.'
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Tentang FitLife Indonesia</h1>

      <div className={styles.description}>
        <p>
          FitLife Indonesia hadir dengan komitmen mendampingi masyarakat Indonesia
          dalam mewujudkan pola hidup yang lebih bugar, aktif, dan sehat tanpa
          terkendala jarak, waktu, maupun biaya keanggotaan gym.
        </p>
        <p>
          Kami percaya bahwa setiap langkah kecil dalam berolahraga membawa dampak besar
          bagi kesehatan jasmani dan ketenangan mental. Melalui beragam variasi latihan
          beban tubuh (bodyweight), kardio, dan fleksibilitas, kami memudahkan siapa
          saja untuk mulai berlatih langsung dari ruang tamu mereka.
        </p>
        <p>
          Platform ini dirancang khusus agar mudah dipahami oleh pemula maupun mereka
          yang ingin meningkatkan intensitas latihan harian secara teratur dan mandiri.
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Award size={24} /> Visi & Misi
        </h2>

        <div className={styles.visiBox}>
          <h4>Visi Kami</h4>
          <p>
            Menjadikan olahraga sebagai gaya hidup yang mudah diakses oleh semua
            orang Indonesia.
          </p>
        </div>

        <ul className={styles.misiList}>
          {misiData.map((item, index) => (
            <li key={index} className={styles.misiItem}>
              {item.icon}
              <span className={styles.misiText}>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Shield size={24} /> Tips Keamanan Berolahraga
        </h2>

        <div className={styles.safetyList}>
          {safetyTips.map((tip, index) => (
            <div key={index} className={styles.safetyItem}>
              <Shield size={20} />
              <span className={styles.safetyText}>{tip}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>Siap Mulai Latihan?</h2>
        <Link to="/program" className={styles.ctaBtn}>
          Mulai Sekarang
        </Link>
      </div>
    </div>
  );
}
