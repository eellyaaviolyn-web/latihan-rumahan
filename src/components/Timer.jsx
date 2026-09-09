import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';
import styles from './Timer.module.css';

export default function Timer({
  sets = 3,
  reps = '10-12',
  restTime = 30,
  workoutTime = 45,
}) {
  const [currentSet, setCurrentSet] = useState(1);
  const [timeLeft, setTimeLeft] = useState(workoutTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isRunning || isFinished) return;

    if (timeLeft === 0) {
      if (!isResting && currentSet < sets) {
        setIsResting(true);
        setTimeLeft(restTime);
      } else if (isResting) {
        setCurrentSet((prev) => prev + 1);
        setTimeLeft(workoutTime);
        setIsResting(false);
      } else if (currentSet === sets && !isResting) {
        setIsFinished(true);
        setIsRunning(false);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isFinished, timeLeft, isResting, currentSet, sets, restTime, workoutTime]);

  const startTimer = () => {
    if (isFinished) {
      setCurrentSet(1);
      setTimeLeft(workoutTime);
      setIsResting(false);
      setIsFinished(false);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsResting(false);
    setIsFinished(false);
    setCurrentSet(1);
    setTimeLeft(workoutTime);
  };

  const formatTime = (seconds) => {
    const safeSeconds = Math.max(0, Math.floor(seconds || 0));
    const mins = Math.floor(safeSeconds / 60);
    const secs = safeSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = sets > 0
    ? (isFinished ? 100 : Math.min(100, Math.round((currentSet / sets) * 100)))
    : 0;

  return (
    <div className={styles.timerContainer}>
      {/* Informasi Set */}
      <div className={styles.setInfo}>
        <span className={styles.setLabel}>
          <TimerIcon size={16} aria-hidden="true" />
          <span>Set Aktif</span>
        </span>
        <span className={styles.setCount}>
          {currentSet}/{sets}
        </span>
      </div>

      {/* Indikator Progres Set */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Tampilan Timer Utama */}
      <div
        className={`${styles.timeDisplay} ${isResting ? styles.resting : ''}`}
      >
        {formatTime(timeLeft)}
      </div>

      {/* Informasi Set & Repetisi */}
      <div className={`${styles.label} ${styles.repInfo}`}>
        SET & REPETISI: {sets} Set x {reps} Repetisi
      </div>

      {/* Status Istirahat */}
      {isResting && (
        <div className={styles.restLabel}>
          WAKTU ISTIRAHAT
        </div>
      )}

      {/* Status Selesai */}
      {isFinished && (
        <div className={styles.finishedLabel}>
          SELESAI! 🎉
        </div>
      )}

      {/* Tombol Kontrol */}
      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.controlBtn} ${isRunning ? styles.pauseBtn : styles.playBtn}`}
          onClick={isRunning ? pauseTimer : startTimer}
          aria-label={isRunning ? 'Jeda Timer' : 'Mulai Timer'}
          title={isRunning ? 'Jeda' : 'Mulai'}
        >
          {isRunning ? (
            <Pause size={22} />
          ) : (
            <Play size={22} style={{ marginLeft: '2px' }} />
          )}
        </button>
        <button
          type="button"
          className={`${styles.controlBtn} ${styles.resetBtn}`}
          onClick={resetTimer}
          aria-label="Atur Ulang Timer"
          title="Atur Ulang"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
}
