import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import WorkoutCard from '../components/WorkoutCard';
import FilterSidebar from '../components/FilterSidebar';
import workouts from '../data/workouts';
import styles from './Program.module.css';
import {
  Dumbbell, Users, Star, Zap, Sparkles, X,
  CheckCircle2, ArrowRight, Target, Clock, Shield
} from 'lucide-react';
import { useToast } from '../components/Toast';

export default function Program() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const urlKategori = searchParams.get('kategori');

  const [activeKategori, setActiveKategori] = useState(urlKategori || 'Semua');
  const [activeLevel, setActiveLevel] = useState('Semua');

  // AI Smart Matchmaker Modal State
  const [showMatchmaker, setShowMatchmaker] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    goal: 'Hypertrophy',
    duration: '20-30 min',
    equipment: 'Bodyweight (Tanpa Alat)'
  });
  const [matchedProgram, setMatchedProgram] = useState(null);

  useEffect(() => {
    const param = searchParams.get('kategori');
    setActiveKategori(param || 'Semua');
  }, [searchParams]);

  const handleKategoriChange = (kategori) => {
    setActiveKategori(kategori);
    const newParams = new URLSearchParams(searchParams);
    if (kategori === 'Semua') newParams.delete('kategori');
    else newParams.set('kategori', kategori);
    setSearchParams(newParams);
  };

  const filteredWorkouts = workouts.filter((w) => {
    const matchK = activeKategori === 'Semua' || w.kategori.toLowerCase() === activeKategori.toLowerCase();
    const matchL = activeLevel === 'Semua' || w.level.toLowerCase() === activeLevel.toLowerCase();
    return matchK && matchL;
  });

  const handleRunMatchmaker = () => {
    // Generate tailored match
    let rec = workouts[0];
    if (quizAnswers.goal === 'Fat Loss') {
      rec = workouts.find(w => w.kategori.toLowerCase().includes('kardio') || w.kategori.toLowerCase().includes('hiit')) || workouts[0];
    } else if (quizAnswers.goal === 'Mobility') {
      rec = workouts.find(w => w.kategori.toLowerCase().includes('yoga') || w.kategori.toLowerCase().includes('stretching')) || workouts[2];
    } else {
      rec = workouts[0];
    }
    setMatchedProgram(rec);
    setQuizStep(4); // Result step
    toast('AI Smart Matchmaker berhasil mencocokkan program!', 'success');
  };

  return (
    <div className={styles.page}>
      {/* ── Hero Header ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroInner}>
          <div className={styles.heroBadgeRow}>
            <span className="eyebrow-label"><Dumbbell size={13} /> Program Latihan</span>
            <button
              onClick={() => { setShowMatchmaker(true); setQuizStep(1); }}
              className={styles.smartMatchTriggerBtn}
            >
              <Sparkles size={14} color="#10b981" />
              <span>AI Smart Matchmaker (Kuis 3 Detik)</span>
            </button>
          </div>

          <h1 className={styles.title}>
            Temukan Program<br />
            <span className={styles.titleGrad}>Latihan Terbaikmu</span>
          </h1>
          <p className={styles.sub}>
            Pilih dari <strong>500+ program</strong> yang dirancang oleh pakar kebugaran.
            Dilengkapi sensor biomekanika AI untuk memvalidasi setiap repetisi Anda.
          </p>

          {/* Stats strip */}
          <div className={styles.statsRow}>
            {[
              { icon: <Dumbbell size={16} />, val: '500+', label: 'Program' },
              { icon: <Users size={16} />,    val: '50K+', label: 'Pengguna' },
              { icon: <Star size={16} fill="#FBBF24" color="#FBBF24" />, val: '4.9', label: 'Rating' },
              { icon: <Zap size={16} />,      val: '100%', label: 'Kinetic AI Ready' },
            ].map(s => (
              <div key={s.label} className={styles.statBox}>
                <div className={styles.statIcon}>{s.icon}</div>
                <div className={styles.statVal}>{s.val}</div>
                <div className={styles.statLbl}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className={styles.filterSection}>
        <div className={styles.filterBar}>
          <FilterSidebar
            activeKategori={activeKategori}
            activeLevel={activeLevel}
            onKategoriChange={handleKategoriChange}
            onLevelChange={setActiveLevel}
          />
          <span className={styles.resultCount}>
            <strong>{filteredWorkouts.length}</strong> latihan ditemukan
          </span>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className={styles.gridSection}>
        {filteredWorkouts.length > 0 ? (
          <div className={styles.grid}>
            {filteredWorkouts.map((w) => <WorkoutCard key={w.id} workout={w} />)}
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIllustration}>🏋️</div>
            <h3>Tidak Ada Latihan Ditemukan</h3>
            <p>Coba ubah filter kategori atau level untuk menemukan latihan yang tepat.</p>
            <button
              onClick={() => { setActiveKategori('Semua'); setActiveLevel('Semua'); setSearchParams({}); }}
              className={styles.emptyBtn}>
              Reset Filter
            </button>
          </div>
        )}
      </section>

      {/* ── AI SMART MATCHMAKER MODAL ── */}
      {showMatchmaker && (
        <div className={styles.modalOverlay} onClick={() => setShowMatchmaker(false)}>
          <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowMatchmaker(false)}>
              <X size={18} />
            </button>

            {quizStep < 4 ? (
              <>
                <div className={styles.modalHead}>
                  <div className={styles.modalSparkleIcon}>
                    <Sparkles size={20} color="#10b981" />
                  </div>
                  <div>
                    <h3 className={styles.modalTitle}>AI Smart Matchmaker</h3>
                    <p className={styles.modalSub}>Langkah {quizStep} dari 3 • Rekomendasi Program Akurat</p>
                  </div>
                </div>

                {/* Step 1: Target Goal */}
                {quizStep === 1 && (
                  <div className={styles.quizBody}>
                    <label className={styles.quizQuestion}>1. Apa target performa utamamu saat ini?</label>
                    <div className={styles.quizOptions}>
                      {['Hypertrophy (Bentuk Otot)', 'Fat Loss & Kondisioning', 'Mobility & Pemulihan Sendi', 'Strength & Tenaga'].map(opt => (
                        <button
                          key={opt}
                          className={`${styles.quizOptionBtn} ${quizAnswers.goal === opt.split(' ')[0] ? styles.optionActive : ''}`}
                          onClick={() => setQuizAnswers(p => ({ ...p, goal: opt.split(' ')[0] }))}
                        >
                          <Target size={16} />
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                    <button className={styles.quizNextBtn} onClick={() => setQuizStep(2)}>
                      Lanjutkan <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {/* Step 2: Session Duration */}
                {quizStep === 2 && (
                  <div className={styles.quizBody}>
                    <label className={styles.quizQuestion}>2. Berapa alokasi waktu idealmu per sesi?</label>
                    <div className={styles.quizOptions}>
                      {['15-20 Menit (Express Burn)', '20-30 Menit (Standar Optimal)', '40-50 Menit (Intensitas Atlet)'].map(opt => (
                        <button
                          key={opt}
                          className={`${styles.quizOptionBtn} ${quizAnswers.duration === opt ? styles.optionActive : ''}`}
                          onClick={() => setQuizAnswers(p => ({ ...p, duration: opt }))}
                        >
                          <Clock size={16} />
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                    <div className={styles.modalNavButtons}>
                      <button className={styles.quizBackBtn} onClick={() => setQuizStep(1)}>Kembali</button>
                      <button className={styles.quizNextBtn} onClick={() => setQuizStep(3)}>
                        Lanjutkan <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Equipment */}
                {quizStep === 3 && (
                  <div className={styles.quizBody}>
                    <label className={styles.quizQuestion}>3. Ketersediaan peralatan latihan di rumah?</label>
                    <div className={styles.quizOptions}>
                      {['Bodyweight (100% Tanpa Alat)', 'Dumbbell / Resistance Band', 'Full Home Gym (Barbell/Kettlebell)'].map(opt => (
                        <button
                          key={opt}
                          className={`${styles.quizOptionBtn} ${quizAnswers.equipment === opt ? styles.optionActive : ''}`}
                          onClick={() => setQuizAnswers(p => ({ ...p, equipment: opt }))}
                        >
                          <Shield size={16} />
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                    <div className={styles.modalNavButtons}>
                      <button className={styles.quizBackBtn} onClick={() => setQuizStep(2)}>Kembali</button>
                      <button className={styles.quizNextBtn} onClick={handleRunMatchmaker}>
                        Temukan Program Cocok 🔥
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Step 4: Result */
              <div className={styles.resultView}>
                <div className={styles.resultCheck}>
                  <CheckCircle2 size={36} color="#10b981" />
                </div>
                <span className={styles.matchScorePill}>99.2% MATCH ACCURACY</span>
                <h3 className={styles.resultProgramTitle}>{matchedProgram?.nama || 'Squat Masterclass & Core'}</h3>
                <p className={styles.resultDesc}>
                  Berdasarkan preferensi <strong>{quizAnswers.goal}</strong> dan durasi <strong>{quizAnswers.duration}</strong>,
                  program ini dirancang untuk memaksimalkan hipertrofi dan kekuatan fungsional tanpa membebani lumbar spine.
                </p>

                <div className={styles.resultCardBox}>
                  <span className={styles.resultEmoji}>{matchedProgram?.emoji || '🔥'}</span>
                  <div>
                    <strong>{matchedProgram?.nama || 'Push Up'}</strong>
                    <p>
                      {matchedProgram?.level} &nbsp;•&nbsp;
                      {matchedProgram?.durasi} &nbsp;•&nbsp;
                      {matchedProgram?.kalori} kcal
                    </p>
                  </div>
                </div>

                <div className={styles.resultActions}>
                  <button
                    onClick={() => {
                      setShowMatchmaker(false);
                      navigate('/ai-studio');
                    }}
                    className={styles.launchStudioAction}
                  >
                    <Zap size={16} /> Buka di AI Studio HUD
                  </button>
                  <button
                    onClick={() => {
                      setShowMatchmaker(false);
                      if (matchedProgram) navigate(`/detail/${matchedProgram.id}`);
                    }}
                    className={styles.viewDetailAction}
                  >
                    Lihat Rincian Gerakan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
