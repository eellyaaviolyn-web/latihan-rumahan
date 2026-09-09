import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Kolom 1: Logo & Deskripsi */}
          <div className={styles.column}>
            <Link to="/" className={styles.logo}>
              <span>FitLife</span> Indonesia
            </Link>
            <p>
              Platform latihan rumahan terpercaya untuk memandu gaya hidup sehat
              dan kebugaran fisik optimal Anda tanpa perlu ke gym.
            </p>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div className={styles.column}>
            <h3>Tautan Cepat</h3>
            <ul className={styles.links}>
              <li>
                <Link to="/">Beranda</Link>
              </li>
              <li>
                <Link to="/program">Program</Link>
              </li>
              <li>
                <Link to="/jadwal">Jadwal</Link>
              </li>
              <li>
                <Link to="/tentang">Tentang</Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Informasi Kontak */}
          <div className={styles.column}>
            <h3>Kontak Kami</h3>
            <div className={styles.contactItem}>
              <Mail size={18} />
              <span>info@fitlife.id</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={18} />
              <span>+62 812-3456-7890</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={18} />
              <span>Jakarta, Indonesia</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Hak Cipta */}
        <div className={styles.bottom}>
          <p>&copy; 2024 FitLife Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
