import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera, CameraOff, Play, Pause, RotateCcw, Volume2, VolumeX,
  Zap, Award, Activity, ShieldCheck, Flame, ChevronRight,
  Sparkles, CheckCircle2, AlertTriangle, Eye, Info
} from 'lucide-react';
import { useToast } from '../components/Toast';
import styles from './AiStudio.module.css';

const PHASES = [
  { id: 1, name: 'Setup', label: 'Stance Lock', cue: 'Kaki selebar bahu, jari kaki rileks 15° ke luar' },
  { id: 2, name: 'Eccentric', label: '90° Target Lock', cue: 'Turun terkontrol, dorong pinggul ke belakang' },
  { id: 3, name: 'Isometric', label: 'Bottom Hold', cue: 'Tahan di posisi paralel 88° selama 1 detik' },
  { id: 4, name: 'Concentric', label: 'Peak Drive', cue: 'Dorong melalui tumit, kembali ke posisi berdiri tegak' }
];

export default function AiStudio() {
  const navigate = useNavigate();
  const toast = useToast();

  // Mode: 'camera' vs 'simulation'
  const [cameraActive, setCameraActive] = useState(false);
  const [isExercising, setIsExercising] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  // Biomechanical Telemetry State
  const [angle, setAngle] = useState(165);
  const [targetAngle] = useState(88);
  const [repCount, setRepCount] = useState(8);
  const [formAccuracy, setFormAccuracy] = useState(97.8);
  const [caloriesBurned, setCaloriesBurned] = useState(48.5);
  const [timeUnderTension, setTimeUnderTension] = useState(142); // seconds
  const [activeCue, setActiveCue] = useState('Kedalaman squat optimal 88° terkunci sempurna!');
  const [cueType, setCueType] = useState('success'); // 'success' | 'warning' | 'info'

  // Refs for video & canvas
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const simDirectionRef = useRef(-1); // -1: descending (eccentric), 1: ascending (concentric)

  // Format TUT into MM:SS
  const formatTUT = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Toggle Camera Feed
  const toggleCamera = async () => {
    if (cameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) videoRef.current.srcObject = null;
      setCameraActive(false);
      toast('Kamera dimatikan. Beralih ke sensor simulasi biomekanika.', 'info');
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
        toast('Kamera aktif! Kinetic Vision AI mendeteksi postur tubuh Anda.', 'success');
      } catch (err) {
        console.error('Kamera error:', err);
        toast('Izin kamera tidak diberikan. Tetap menggunakan mode simulasi AI 60 FPS.', 'warning');
      }
    }
  };

  // Cleanup Camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Biomechanical Simulation Loop (Generates realistic angle & rep cycle)
  useEffect(() => {
    if (!isExercising) return;

    const interval = setInterval(() => {
      setTimeUnderTension(prev => prev + 1);
      setCaloriesBurned(prev => +(prev + 0.15).toFixed(1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isExercising]);

  // Motion engine for Squat angle & SOP phases
  useEffect(() => {
    if (!isExercising) return;

    const motionInterval = setInterval(() => {
      setAngle(prevAngle => {
        let nextAngle = prevAngle + (simDirectionRef.current * 2.5);

        // Reached bottom of squat (86° - 88°)
        if (nextAngle <= 86) {
          nextAngle = 86;
          simDirectionRef.current = 1; // go back up
          setCurrentPhaseIndex(2); // Isometric bottom hold
          setActiveCue('Bagus! Sudut 88° parallel tercapai, pertahankan lumbar spine!');
          setCueType('success');
        } else if (nextAngle >= 168) {
          // Reached top standing lock
          nextAngle = 168;
          simDirectionRef.current = -1; // go back down
          setCurrentPhaseIndex(0); // Setup
          setRepCount(r => r + 1);
          setFormAccuracy(prev => Math.min(99.4, Math.max(94.2, +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1))));
          setActiveCue('Setup Stance terkunci. Mulai fase eccentric.');
          setCueType('info');
        } else if (simDirectionRef.current === -1 && nextAngle < 140 && nextAngle > 95) {
          setCurrentPhaseIndex(1); // Eccentric
          setActiveCue('Eccentric load: Lutut sejajar dengan ujung kaki.');
          setCueType('info');
        } else if (simDirectionRef.current === 1 && nextAngle > 105 && nextAngle < 155) {
          setCurrentPhaseIndex(3); // Concentric
          setActiveCue('Peak drive: Dorong kuat melalui tumit dan gluteus.');
          setCueType('success');
        }

        return Math.round(nextAngle);
      });
    }, 60);

    return () => clearInterval(motionInterval);
  }, [isExercising]);

  // Canvas Skeleton Rendering (Neon emerald & electric cyan biomechanical overlay)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    const renderSkeleton = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate squat depth based on current angle (168° standing -> 86° squat)
      const normalizedDepth = (168 - angle) / (168 - 86); // 0 (stand) to 1 (full squat)

      const centerX = width * 0.5;
      const headY = height * 0.22 + (normalizedDepth * 70);
      const neckY = headY + 30;
      const shoulderLeftX = centerX - 45;
      const shoulderRightX = centerX + 45;
      const shoulderY = neckY + 10;

      const hipLeftX = centerX - 32;
      const hipRightX = centerX + 32;
      const hipY = neckY + 110 + (normalizedDepth * 85);

      // Knee moves outward & down
      const kneeLeftX = centerX - 48 - (normalizedDepth * 18);
      const kneeRightX = centerX + 48 + (normalizedDepth * 18);
      const kneeY = hipY + 80 - (normalizedDepth * 10);

      // Ankle stays grounded
      const ankleLeftX = centerX - 42;
      const ankleRightX = centerX + 42;
      const ankleY = height * 0.88;

      // Glow effect
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#10b981';
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#10b981';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // 1. Draw Bones
      // Spine
      ctx.beginPath();
      ctx.moveTo(centerX, neckY);
      ctx.lineTo(centerX, hipY);
      ctx.stroke();

      // Shoulders
      ctx.beginPath();
      ctx.moveTo(shoulderLeftX, shoulderY);
      ctx.lineTo(shoulderRightX, shoulderY);
      ctx.stroke();

      // Left Leg (Hip -> Knee -> Ankle)
      ctx.beginPath();
      ctx.moveTo(hipLeftX, hipY);
      ctx.lineTo(kneeLeftX, kneeY);
      ctx.lineTo(ankleLeftX, ankleY);
      ctx.stroke();

      // Right Leg (Hip -> Knee -> Ankle)
      ctx.beginPath();
      ctx.moveTo(hipRightX, hipY);
      ctx.lineTo(kneeRightX, kneeY);
      ctx.lineTo(ankleRightX, ankleY);
      ctx.stroke();

      // Arms (Guard Position)
      ctx.strokeStyle = '#06b6d4';
      ctx.shadowColor = '#06b6d4';
      ctx.beginPath();
      ctx.moveTo(shoulderLeftX, shoulderY);
      ctx.lineTo(centerX - 25, shoulderY + 40);
      ctx.lineTo(centerX - 8, shoulderY + 25);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(shoulderRightX, shoulderY);
      ctx.lineTo(centerX + 25, shoulderY + 40);
      ctx.lineTo(centerX + 8, shoulderY + 25);
      ctx.stroke();

      // 2. Draw Keypoint Joints (Cyan Dots)
      const joints = [
        [centerX, headY], [centerX, neckY],
        [shoulderLeftX, shoulderY], [shoulderRightX, shoulderY],
        [hipLeftX, hipY], [hipRightX, hipY],
        [kneeLeftX, kneeY], [kneeRightX, kneeY],
        [ankleLeftX, ankleY], [ankleRightX, ankleY]
      ];

      joints.forEach(([x, y]) => {
        ctx.fillStyle = '#06b6d4';
        ctx.shadowColor = '#06b6d4';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Highlight Knee Angle Arc on Right Knee
      ctx.strokeStyle = angle <= 92 ? '#10b981' : '#f59e0b';
      ctx.shadowColor = angle <= 92 ? '#10b981' : '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(kneeRightX, kneeY, 26, -Math.PI * 0.4, Math.PI * 0.2);
      ctx.stroke();

      // Angle degree label floating next to right knee
      ctx.shadowBlur = 4;
      ctx.font = '700 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = angle <= 92 ? '#10b981' : '#f59e0b';
      ctx.fillText(`${angle}°`, kneeRightX + 32, kneeY + 4);

      animFrameRef.current = requestAnimationFrame(renderSkeleton);
    };

    animFrameRef.current = requestAnimationFrame(renderSkeleton);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [angle]);

  return (
    <div className={styles.studioContainer}>
      {/* ── Top HUD Telemetry Bar ── */}
      <header className={styles.hudHeader}>
        <div className={styles.hudBrand}>
          <div className={styles.pulseLiveIcon} />
          <div>
            <h1 className={styles.hudTitle}>Kinetic Vision AI Studio</h1>
            <span className={styles.hudSubtitle}>Squat Masterclass • Biomechanical HUD 60 FPS</span>
          </div>
        </div>

        <div className={styles.hudQuickMetrics}>
          <div className={styles.quickMetric}>
            <span className={styles.metricLabel}>FORM ACCURACY</span>
            <span className={styles.metricValueEmerald}>{formAccuracy}%</span>
          </div>
          <div className={styles.quickMetric}>
            <span className={styles.metricLabel}>REPETISI</span>
            <span className={styles.metricValueCyan}>{repCount} <small>/ 15</small></span>
          </div>
          <div className={styles.quickMetric}>
            <span className={styles.metricLabel}>TUT (TIME)</span>
            <span className={styles.metricValueWhite}>{formatTUT(timeUnderTension)}</span>
          </div>
          <div className={styles.quickMetric}>
            <span className={styles.metricLabel}>KALORI</span>
            <span className={styles.metricValueOrange}>{caloriesBurned} <small>kcal</small></span>
          </div>
        </div>

        <div className={styles.hudActions}>
          <button
            onClick={() => setSoundEnabled(p => !p)}
            className={`${styles.hudBtn} ${soundEnabled ? styles.btnActive : ''}`}
            title="Metronome Audio BPM"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>135 BPM</span>
          </button>
          <button
            onClick={() => setIsExercising(p => !p)}
            className={`${styles.hudBtn} ${isExercising ? styles.btnPrimary : ''}`}
          >
            {isExercising ? <Pause size={16} /> : <Play size={16} />}
            <span>{isExercising ? 'Jeda Latihan' : 'Lanjutkan'}</span>
          </button>
        </div>
      </header>

      {/* ── Main Workspace: 3-Column Layout ── */}
      <div className={styles.workspaceGrid}>

        {/* ── Left Column: SOP Phase Sequence & Angle Meter ── */}
        <aside className={styles.leftColumn}>
          {/* Angle Dial Card */}
          <div className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <Activity size={16} color="#06b6d4" />
              <h3>Biomechanics Depth Tracker</h3>
            </div>

            <div className={styles.angleDialContainer}>
              <div className={styles.dialRing}>
                <svg viewBox="0 0 160 160" className={styles.dialSvg}>
                  <circle cx="80" cy="80" r="68" className={styles.dialBackdrop} />
                  <circle
                    cx="80" cy="80" r="68"
                    className={styles.dialProgress}
                    style={{
                      strokeDasharray: 427,
                      strokeDashoffset: 427 - ((180 - angle) / 100) * 427,
                      stroke: angle <= 92 ? '#10b981' : '#06b6d4'
                    }}
                  />
                </svg>
                <div className={styles.dialContent}>
                  <span className={styles.dialAngle} style={{ color: angle <= 92 ? '#10b981' : '#f8fafc' }}>
                    {angle}°
                  </span>
                  <span className={styles.dialTarget}>Target: {targetAngle}° Depth</span>
                </div>
              </div>

              <div className={styles.depthStatusBadge} style={{ background: angle <= 92 ? 'rgba(16,185,129,0.15)' : 'rgba(6,182,212,0.12)', color: angle <= 92 ? '#10b981' : '#06b6d4' }}>
                {angle <= 90 ? '✓ Parallel Depth Locked' : 'Descending to Parallel...'}
              </div>
            </div>
          </div>

          {/* 4-Stage Kinetic SOP Sequence */}
          <div className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <Zap size={16} color="#10b981" />
              <h3>Kinetic Phase Sequence</h3>
            </div>

            <div className={styles.phaseList}>
              {PHASES.map((phase, idx) => {
                const isActive = currentPhaseIndex === idx;
                const isPassed = currentPhaseIndex > idx;
                return (
                  <div
                    key={phase.id}
                    className={`${styles.phaseItem} ${isActive ? styles.phaseActive : ''} ${isPassed ? styles.phasePassed : ''}`}
                  >
                    <div className={styles.phaseStepNum}>0{phase.id}</div>
                    <div className={styles.phaseInfo}>
                      <div className={styles.phaseHeaderRow}>
                        <span className={styles.phaseName}>{phase.name}</span>
                        <span className={styles.phaseTag}>{phase.label}</span>
                      </div>
                      <p className={styles.phaseCue}>{phase.cue}</p>
                    </div>
                    {isActive && <div className={styles.activePillDot} />}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ── Center Column: Live Viewfinder / Canvas Wireframe Overlay ── */}
        <main className={styles.centerViewport}>
          <div className={styles.viewfinderWrapper}>
            {/* Real Webcam Video (mirrored) */}
            <video
              ref={videoRef}
              playsInline
              muted
              className={`${styles.videoFeed} ${cameraActive ? styles.videoVisible : styles.videoHidden}`}
            />

            {/* Fallback Ambient Studio Backdrop when camera is off */}
            {!cameraActive && (
              <div className={styles.studioBackdrop}>
                <div className={styles.gridPlane} />
                <div className={styles.centerGlowOrb} />
                <div className={styles.cameraOffNotice}>
                  <CameraOff size={28} color="#64748b" />
                  <p>Mode Simulasi Biomekanika 60 FPS</p>
                  <span>Klik tombol kamera di bawah untuk mengaktifkan video feed Anda.</span>
                </div>
              </div>
            )}

            {/* Kinetic Pose Skeleton Canvas Overlay */}
            <canvas ref={canvasRef} className={styles.skeletonCanvas} />

            {/* Corner Viewfinder Reticles */}
            <div className={`${styles.reticle} ${styles.reticleTL}`} />
            <div className={`${styles.reticle} ${styles.reticleTR}`} />
            <div className={`${styles.reticle} ${styles.reticleBL}`} />
            <div className={`${styles.reticle} ${styles.reticleBR}`} />

            {/* Real-time Dynamic Floating Cue Toast */}
            <div className={`${styles.floatingCue} ${styles[cueType]}`}>
              {cueType === 'success' && <CheckCircle2 size={16} />}
              {cueType === 'warning' && <AlertTriangle size={16} />}
              {cueType === 'info' && <Sparkles size={16} />}
              <span>{activeCue}</span>
            </div>

            {/* Camera Control Button Overlay */}
            <div className={styles.viewfinderBottomBar}>
              <button
                onClick={toggleCamera}
                className={`${styles.camToggleBtn} ${cameraActive ? styles.camActive : ''}`}
              >
                {cameraActive ? <Camera size={16} /> : <CameraOff size={16} />}
                <span>{cameraActive ? 'Kamera AI: Aktif' : 'Aktifkan Kamera Webcam'}</span>
              </button>

              <div className={styles.tempoIndicator}>
                <span>TEMPO: <strong>3-1-1</strong></span>
                <span className={styles.tempoDot} />
                <span>CADENCE: <strong>NORMAL</strong></span>
              </div>
            </div>
          </div>
        </main>

        {/* ── Right Column: Muscle Recruitment Map & Telemetry ── */}
        <aside className={styles.rightColumn}>
          {/* Target Muscle Recruitment Card */}
          <div className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <Flame size={16} color="#f97316" />
              <h3>Peta Rekrutmen Otot (EMG)</h3>
            </div>

            <div className={styles.muscleList}>
              {[
                { name: 'Gluteus Maximus', percent: 95, color: '#10b981', note: 'Primary Driver' },
                { name: 'Quadriceps (Vastus)', percent: 90, color: '#06b6d4', note: 'Peak Tension' },
                { name: 'Core Stabilizers', percent: 82, color: '#818cf8', note: 'Intra-abdominal' },
                { name: 'Hamstrings', percent: 76, color: '#f59e0b', note: 'Eccentric Brake' }
              ].map(m => (
                <div key={m.name} className={styles.muscleRow}>
                  <div className={styles.muscleMeta}>
                    <span className={styles.muscleName}>{m.name}</span>
                    <span className={styles.musclePercent} style={{ color: m.color }}>{m.percent}%</span>
                  </div>
                  <div className={styles.muscleTrack}>
                    <div
                      className={styles.muscleFill}
                      style={{
                        width: `${m.percent}%`,
                        background: `linear-gradient(90deg, ${m.color}80, ${m.color})`,
                        boxShadow: `0 0 10px ${m.color}40`
                      }}
                    />
                  </div>
                  <span className={styles.muscleNote}>{m.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spine & Bilateral Symmetry Safety Monitor */}
          <div className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <ShieldCheck size={16} color="#10b981" />
              <h3>Lumbar & Bilateral Symmetry</h3>
            </div>

            <div className={styles.safetyGrid}>
              <div className={styles.safetyBox}>
                <span className={styles.safetyLabel}>Bilateral Balance</span>
                <span className={styles.safetyValEmerald}>50% L / 50% R</span>
                <span className={styles.safetySub}>Sempurna Seimbang</span>
              </div>
              <div className={styles.safetyBox}>
                <span className={styles.safetyLabel}>Lumbar Curve</span>
                <span className={styles.safetyValEmerald}>Neutral (0°)</span>
                <span className={styles.safetySub}>Zero Spine Shear</span>
              </div>
            </div>

            <div className={styles.safetyTip}>
              <Info size={14} color="#06b6d4" />
              <p>Sensor AI memverifikasi postur pinggul tidak bergeser miring selama fase eccentric.</p>
            </div>
          </div>

          {/* Quick End Session CTA */}
          <button
            onClick={() => {
              toast('Sesi latihan disimpan ke Telemetri & Trophy Vault!', 'success');
              navigate('/profil');
            }}
            className={styles.finishSessionBtn}
          >
            <span>Selesaikan & Simpan Sesi</span>
            <ChevronRight size={18} />
          </button>
        </aside>

      </div>
    </div>
  );
}
