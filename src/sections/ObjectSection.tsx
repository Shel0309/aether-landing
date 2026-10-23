import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';

const features = [
  {
    icon: 'spatialAudio' as const,
    index: '01',
    title: 'Spatial mapping',
    text: 'Forty-eight microphones sample the room a thousand times a second. Aether rebuilds its geometry in real time.',
  },
  {
    icon: 'sensors' as const,
    index: '02',
    title: 'Adaptive acoustics',
    text: 'Not a preset. A living model of the space that adjusts phase, delay and pressure as people move through it.',
  },
  {
    icon: 'bolt' as const,
    index: '03',
    title: 'Phase-locked drivers',
    text: 'Twelve custom drivers fire within 0.8 ms of each other. The result is a field, not a sweet spot.',
  },
];

export function ObjectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 14]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section className="object" id="object" ref={sectionRef}>
      <div className="shell">
        <SectionHead index="02" label="The Object" right="Aether One / 2026" />

        <div className="object__grid">
          <div className="object__visual">
            <div className="object__stage">
              <div className="object__stage-glow" aria-hidden="true" />
              <div className="object__graticule" aria-hidden="true" />

              <motion.div
                className="object__orbit"
                style={{ rotate: orbitRotate }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 440 440" fill="none">
                  <defs>
                    <path
                      id="orbit-path"
                      d="M220,220 m-196,0 a196,196 0 1,1 392,0 a196,196 0 1,1 -392,0"
                    />
                  </defs>
                  <circle cx="220" cy="220" r="196" stroke="currentColor" strokeOpacity="0.16" />
                  <circle
                    cx="220"
                    cy="220"
                    r="176"
                    stroke="currentColor"
                    strokeOpacity="0.1"
                    strokeDasharray="1 8"
                  />
                  <text
                    fill="currentColor"
                    fontFamily="monospace"
                    fontSize="8"
                    letterSpacing="5.5"
                    opacity="0.55"
                  >
                    <textPath href="#orbit-path">
                      AETHER ONE — SPATIAL FIELD — 360 DEGREES — LONDON — 2026 —
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              <motion.div className="object__orb" style={{ rotate, scale }}>
                <div className="object__orb-grid" aria-hidden="true" />
                <div className="object__orb-dome">
                  <span className="object__orb-center" />
                </div>
              </motion.div>

              <div className="object__badge object__badge--top" aria-hidden="true">
                <span>12</span>
                <small>Drivers</small>
              </div>
              <div className="object__badge object__badge--left" aria-hidden="true">
                <span>2.4</span>
                <small>Kilograms</small>
              </div>
              <div className="object__badge object__badge--right" aria-hidden="true">
                <Icon name="spatialAudio" size={18} />
                <small>360° field</small>
              </div>
            </div>

            <div className="object__caption">
              <span>Fig. 01</span>
              <span>Monoblock aluminium / signal lime</span>
            </div>
          </div>

          <div className="object__info">
            <Reveal>
              <h2 className="object__title">
                Not a speaker.
                <br />
                A <em>presence.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="object__lead">
                Machined from a single block of aluminium, Aether One is built to
                disappear into the room — and a field designed to do the opposite.
              </p>
            </Reveal>

            <div className="feature-list">
              {features.map((feature, index) => (
                <Reveal key={feature.title} delay={0.05 * index}>
                  <article className="feature" data-cursor>
                    <div className="feature__icon">
                      <Icon name={feature.icon} size={22} />
                    </div>
                    <div className="feature__body">
                      <div className="feature__meta">
                        <span>{feature.index}</span>
                        <span>System</span>
                      </div>
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                    </div>
                    <Icon name="arrowOutward" size={16} className="feature__arrow" />
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="object__foot" delay={0.1}>
              <div>
                <span>Dimensions</span>
                <strong>320 × 320 × 96 mm</strong>
              </div>
              <div>
                <span>Finish</span>
                <strong>Signal lime / graphite</strong>
              </div>
              <a href="#specs" data-cursor>
                Full specification
                <Icon name="arrowOutward" size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
