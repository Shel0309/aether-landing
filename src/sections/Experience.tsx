import { useEffect, useRef, useState, type PointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Icon } from '../components/Icon';
import type { IconName } from '../lib/icons';
import { SectionHead } from '../components/SectionHead';
import { useMediaQuery } from '../hooks/useMediaQuery';

type Scene = {
  index: string;
  tag: string;
  title: string;
  text: string;
  icon: IconName;
  theme: 'club' | 'studio' | 'cinema' | 'wild';
};

const scenes: Scene[] = [
  {
    index: '01',
    tag: 'Club',
    title: 'The Club',
    text: 'A wall of sound that moves with the crowd. Pressure without volume, detail without fatigue.',
    icon: 'graphicEq',
    theme: 'club',
  },
  {
    index: '02',
    tag: 'Studio',
    title: 'The Studio',
    text: 'A near-field monitor at midnight, a far-field room by morning. One object, two acoustics.',
    icon: 'tune',
    theme: 'studio',
  },
  {
    index: '03',
    tag: 'Cinema',
    title: 'The Cinema',
    text: 'Dialogue anchored to the screen. Score overhead. Silence exactly where it belongs.',
    icon: 'movie',
    theme: 'cinema',
  },
  {
    index: '04',
    tag: 'Wild',
    title: 'The Wild',
    text: 'A field-ready mode with a 24-hour battery. Ninety-six hours in low-power listening.',
    icon: 'forest',
    theme: 'wild',
  },
];

function SceneArt({ scene }: { scene: Scene }) {
  return (
    <div className={`scene__canvas scene__canvas--${scene.theme}`} aria-hidden="true">
      <div className="scene__glow" />

      {scene.theme === 'club' ? (
        <svg className="scene__svg" viewBox="0 0 400 420" fill="none">
          <g stroke="currentColor">
            <ellipse cx="200" cy="210" rx="58" ry="158" transform="rotate(22 200 210)" opacity="0.55" />
            <ellipse cx="200" cy="210" rx="98" ry="182" transform="rotate(22 200 210)" opacity="0.32" />
            <ellipse cx="200" cy="210" rx="142" ry="204" transform="rotate(22 200 210)" opacity="0.18" />
            <ellipse cx="200" cy="210" rx="182" ry="222" transform="rotate(22 200 210)" opacity="0.1" />
            <path d="M200 52v316" opacity="0.22" strokeDasharray="2 7" />
          </g>
          <circle cx="200" cy="210" r="6" fill="#C9FF3D" />
          <circle cx="200" cy="210" r="22" stroke="#C9FF3D" strokeOpacity="0.5" />
        </svg>
      ) : null}

      {scene.theme === 'studio' ? (
        <svg className="scene__svg" viewBox="0 0 400 420" fill="none">
          <g fill="#C9FF3D">
            {Array.from({ length: 29 }, (_, i) => {
              const height = 28 + ((i * 37) % 120);
              return (
                <rect
                  key={i}
                  x={30 + i * 12}
                  y={210 - height / 2}
                  width="3"
                  height={height}
                  opacity={0.24 + (i % 5) * 0.12}
                  rx="1.5"
                />
              );
            })}
          </g>
          <path d="M18 210h364" stroke="#C9FF3D" strokeOpacity="0.25" strokeDasharray="1 6" />
          <circle cx="200" cy="210" r="52" stroke="#C9FF3D" strokeOpacity="0.35" />
          <circle cx="200" cy="210" r="68" stroke="#ECE9E0" strokeOpacity="0.08" />
        </svg>
      ) : null}

      {scene.theme === 'cinema' ? (
        <div className="scene__screen-wrap">
          <div className="scene__screen">
            <span className="scene__screen-glow" />
            <span className="scene__screen-line" />
          </div>
          <svg className="scene__seats" viewBox="0 0 400 140" fill="none">
            {[0, 1, 2, 3].map((row) => (
              <path
                key={row}
                d={`M-20 ${54 + row * 22} Q 200 ${12 + row * 24} 420 ${54 + row * 22}`}
                stroke="currentColor"
                strokeOpacity={0.26 - row * 0.055}
              />
            ))}
          </svg>
        </div>
      ) : null}

      {scene.theme === 'wild' ? (
        <svg className="scene__svg" viewBox="0 0 400 420" fill="none">
          <g stroke="currentColor" fill="none">
            {Array.from({ length: 7 }, (_, i) => (
              <path
                key={i}
                d={`M-40 ${180 + i * 28} C 70 ${112 + i * 24}, 150 ${246 + i * 18}, 230 ${176 + i * 22} S 380 ${132 + i * 30}, 450 ${190 + i * 24}`}
                opacity={0.4 - i * 0.04}
              />
            ))}
            <path d="M200 60v300M40 210h330" opacity="0.12" strokeDasharray="2 8" />
          </g>
          <circle cx="268" cy="126" r="34" fill="#C9FF3D" fillOpacity="0.1" />
          <circle cx="268" cy="126" r="34" stroke="#C9FF3D" strokeOpacity="0.55" />
          <circle cx="268" cy="126" r="3" fill="#C9FF3D" />
        </svg>
      ) : null}

      <span className="scene__ghost">{scene.index}</span>
      <div className="scene__art-vignette" />
      <span className="scene__art-index">Field / {scene.index}</span>
    </div>
  );
}

function SceneCard({ scene }: { scene: Scene }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 140, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 140, damping: 20 });

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 7);
    rotateX.set(-py * 7);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      className={`scene scene--${scene.theme}`}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1200 }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      data-cursor
      data-cursor-label="ENTER"
    >
      <SceneArt scene={scene} />
      <div className="scene__body">
        <div className="scene__topline">
          <span className="scene__tag">
            <Icon name={scene.icon} size={15} />
            {scene.tag}
          </span>
          <span className="scene__number">{scene.index} / 04</span>
        </div>
        <h3>{scene.title}</h3>
        <div className="scene__bottom">
          <p>{scene.text}</p>
          <span className="scene__enter" aria-hidden="true">
            <Icon name="arrowOutward" size={18} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wide = useMediaQuery('(min-width: 900px)');
  const [maxX, setMaxX] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track || !wide) {
        setMaxX(0);
        return;
      }
      const padding = 64;
      setMaxX(Math.max(0, track.scrollWidth - window.innerWidth + padding));
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener('resize', measure);
    document.fonts.ready.then(measure).catch(() => undefined);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [wide]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div className="experience__sticky">
        <div className="shell experience__head">
          <SectionHead index="03" label="Experience" right="Four spaces / one field" />
          <div className="experience__head-row">
            <h2>
              Four ways
              <br />
              to <em>disappear.</em>
            </h2>
            <div className="experience__hint">
              <span className="experience__hint-dot" />
              <span>Scroll to move through the field</span>
            </div>
          </div>
        </div>

        <motion.div className="experience__track" ref={trackRef} style={{ x }}>
          {scenes.map((scene) => (
            <SceneCard key={scene.index} scene={scene} />
          ))}
        </motion.div>

        <div className="shell experience__progress">
          <span>01</span>
          <div className="experience__bar">
            <motion.span style={{ scaleX: progress }} />
          </div>
          <span>04</span>
        </div>
      </div>
    </section>
  );
}
