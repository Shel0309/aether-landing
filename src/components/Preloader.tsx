import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BrandMark } from './BrandMark';

type PreloaderProps = {
  onDone: () => void;
};

export function Preloader({ onDone }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (reduced) {
      const timeout = window.setTimeout(() => doneRef.current(), 300);
      return () => window.clearTimeout(timeout);
    }

    let frame = 0;
    let start: number | null = null;
    const duration = 1800;

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = window.setTimeout(() => doneRef.current(), 420) as unknown as number;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(frame);
    };
  }, [reduced]);

  return (
    <motion.div
      className="preloader"
      exit={{ y: '-100%' }}
      transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="preloader__noise" aria-hidden="true" />
      <div className="preloader__top">
        <span>AETHER SYSTEMS</span>
        <span>EST. 2026 / LONDON</span>
      </div>

      <div className="preloader__center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <BrandMark className="preloader__mark" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Sound has a shape.
        </motion.p>
      </div>

      <div className="preloader__bottom">
        <span className="preloader__status">
          <span className="preloader__pulse" />
          Calibrating spatial field
        </span>
        <span className="preloader__count">
          {String(progress).padStart(3, '0')}
          <span>%</span>
        </span>
      </div>
      <motion.div
        className="preloader__bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0.25, ease: 'linear' }}
      />
    </motion.div>
  );
}
