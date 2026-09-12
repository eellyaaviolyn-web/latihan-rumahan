import { Link } from 'react-router-dom';
import { Flame, Camera, Play, Share2, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Top divider glow */}
      <div className={styles.topGlow} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Col 1: Brand */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIcon}><Flame size={16} color="#fff" /></div>
              <span>FitLife<em>Indonesia</em></span>
            </Link>
            <p className={styles.brandDesc}>
              Platform latihan rumahan #1 Indonesia. Akses 500+ program workout gratis, tanpa gym, tanpa alat mahal.
            </p>
            {/* Newsletter */}
            <div className={styles.newsletter}>
              <input type="email" placeholder="Email kamu..." className={styles.newsletterInput} />
              <button type="button" className={styles.newsletterBtn}><ArrowRight size={16} /></button>
            </div>
            <p className={styles.newsletterHint}>Tips latihan gratis setiap minggu 💪</p>
            {/* Socials */}
            <div className={styles.socials}>
              <a href="#" className={styles.social} aria-label="Instagram"><Camera size={18} /></a>
              <a href="#" className={styles.social} aria-label="YouTube"><Play size={18} /></a>
              <a href="#" className={styles.social} aria-label="Twitter"><Share2 size={18} /></a>
            </div>
          </div>

          {/* Col 2: Program */}
          <div className={styles.col}>
            <h4>Program</h4>
            <ul>
              <li><Link to="/program">Semua Program</Link></li>
              <li><Link to="/program?kategori=HIIT">HIIT Fat Burn</Link></li>
              <li><Link to="/program?kategori=Kekuatan">Kekuatan</Link></li>
              <li><Link to="/program?kategori=Yoga">Yoga & Meditasi</Link></li>
              <li><Link to="/jadwal">Jadwal Mingguan</Link></li>
            </ul>
          </div>

          {/* Col 3: Platform */}
          <div className={styles.col}>
            <h4>Platform</h4>
            <ul>
              <li><Link to="/tentang">Instruktur</Link></li>
              <li><Link to="/komunitas">Komunitas</Link></li>
              <li><Link to="/harga">Harga & Paket</Link></li>
              <li><Link to="/login">Masuk</Link></li>
              <li><Link to="/register">Daftar Gratis</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className={styles.col}>
            <h4>Kontak</h4>
            <div className={styles.contactItem}><Mail size={15} /><span>info@fitlife.id</span></div>
            <div className={styles.contactItem}><Phone size={15} /><span>+62 812-3456-7890</span></div>
            <div className={styles.contactItem}><MapPin size={15} /><span>Jakarta, Indonesia</span></div>
            <div className={styles.appBadges}>
              <div className={styles.appBadge}>📱 App Store</div>
              <div className={styles.appBadge}>🤖 Play Store</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p>© 2025 FitLife Indonesia. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Syarat & Ketentuan</a>
            <a href="#">Bantuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
