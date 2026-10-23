import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Icon } from '../components/Icon';
import { Magnetic } from '../components/Magnetic';
import { ShaderField } from '../components/ShaderField';

type HeroProps = {
  ready: boolean;
};

export function Hero({ ready }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.85], [1, 0]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const titleX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.6 });
  const titleY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.6 });
  const fieldX = useSpring(pointerX, { stiffness: 55, damping: 18, mass: 0.7 });
  const fieldYMouse = useSpring(pointerY, { stiffness: 55, damping: 18, mass: 0.7 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const nx = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      const ny = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
      pointerX.set(nx * 14);
      pointerY.set(ny * 10);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [pointerX, pointerY, reduced]);

  const lineTransition = (delay: number) => ({
    duration: 1.25,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  });

  return (
    <section className="hero" id="top" ref={sectionRef}>
      <motion.div className="hero__canvas" style={{ scale: canvasScale }}>
        <ShaderField />
      </motion.div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__vignette" aria-hidden="true" />

      <motion.div
        className="hero__field"
        style={{ x: fieldX, y: fieldYMouse }}
        aria-hidden="true"
      >
        <motion.div className="hero__field-inner" style={{ y: fieldY }}>
          <div className="hero__field-glow" />
          <div className="hero__ring hero__ring--outer" />
          <div className="hero__ring hero__ring--mid" />
          <div className="hero__ring hero__ring--inner" />
          <div className="hero__ring-core" />
          <span className="hero__field-label hero__field-label--top">SPATIAL FIELD / 360°</span>
          <span className="hero__field-label hero__field-label--right">12 DRIVERS</span>
          <span className="hero__field-label hero__field-label--bottom">24 BIT / 96 KHZ</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="shell hero__inner"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="hero__topline">
          <motion.span
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Spatial audio instrument <span className="muted">/ 001</span>
          </motion.span>
          <motion.span
            className="hero__coords"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            London — 51.5072° N / 0.1276° W
          </motion.span>
        </div>

        <motion.div style={{ x: titleX, y: titleY }}>
          <h1 className="hero__title">
            <span className="hero__line">
              <motion.span
                className="hero__line-inner"
                initial={{ y: '115%', rotate: 4 }}
                animate={ready ? { y: '0%', rotate: 0 } : {}}
                transition={lineTransition(0.1)}
              >
                Sound
              </motion.span>
            </span>
            <span className="hero__line">
              <motion.span
                className="hero__line-inner"
                initial={{ y: '115%', rotate: 4 }}
                animate={ready ? { y: '0%', rotate: 0 } : {}}
                transition={lineTransition(0.2)}
              >
                has a
              </motion.span>
            </span>
            <span className="hero__line hero__line--last">
              <motion.span
                className="hero__line-inner hero__line-inner--serif"
                initial={{ y: '115%', rotate: 4 }}
                animate={ready ? { y: '0%', rotate: 0 } : {}}
                transition={lineTransition(0.3)}
              >
                shape.
              </motion.span>
              <motion.span
                className="hero__seal"
                initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ duration: 1, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
              >
                <Icon name="graphicEq" size={20} />
              </motion.span>
            </span>
          </h1>
        </motion.div>

        <motion.div
          className="hero__foot"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero__lead">
            Aether One bends sound around architecture, distance and silence.
            A living acoustic field you can step inside.
          </p>

          <div className="hero__actions">
            <Magnetic>
              <a
                href="#object"
                className="btn btn--solid"
                data-cursor
                data-cursor-label="ENTER"
              >
                Explore Aether One
                <Icon name="arrowOutward" size={16} />
              </a>
            </Magnetic>
            <a href="#experience" className="btn btn--text" data-cursor>
              <span className="btn__play">
                <Icon name="playArrow" size={14} />
              </span>
              Hear the field
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero__stats"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="hero__stat">
            <span className="hero__stat-value">360°</span>
            <span className="hero__stat-label">Immersive field</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value">12</span>
            <span className="hero__stat-label">Custom drivers</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value">0.8 ms</span>
            <span className="hero__stat-label">Phase lock</span>
          </div>
          <a className="hero__scroll" href="#manifesto" aria-label="Scroll to manifesto">
            <span>Scroll to discover</span>
            <span className="hero__scroll-line" />
            <Icon name="arrowDownward" size={14} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
