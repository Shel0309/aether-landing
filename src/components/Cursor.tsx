import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState('');
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.35 });
  const visible = useRef(false);

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia('(pointer: fine)');
    if (!fine.matches) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible.current) {
        visible.current = true;
        document.documentElement.classList.add('cursor-visible');
      }
    };

    const over = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive = target.closest(
        'a, button, input, textarea, select, [data-cursor], summary',
      );
      if (!interactive) {
        setHovering(false);
        setLabel('');
        return;
      }
      setHovering(true);
      setLabel(interactive.getAttribute('data-cursor-label') ?? '');
    };

    const leave = () => {
      visible.current = false;
      document.documentElement.classList.remove('cursor-visible');
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.addEventListener('pointerleave', leave);

    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerleave', leave);
      document.documentElement.classList.remove('has-custom-cursor', 'cursor-visible');
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className={`cursor ${hovering ? 'is-hovering' : ''} ${label ? 'has-label' : ''}`}
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      <span className="cursor__dot" />
      <span className="cursor__ring">
        <span className="cursor__label">{label}</span>
      </span>
    </motion.div>
  );
}
