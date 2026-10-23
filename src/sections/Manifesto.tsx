import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';

const words = ['Most', 'speakers', 'fill', 'a', 'room.', 'Aether', 'sculpts', 'it.'];

type WordProps = {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function Word({ word, index, total, progress }: WordProps) {
  const start = 0.02 + (index / total) * 0.34;
  const end = start + 0.14;
  const opacity = useTransform(progress, [start, end], [0.28, 1]);

  return (
    <>
      <motion.span
        className={`manifesto__word ${word === 'sculpts' ? 'is-serif' : ''}`}
        style={{ opacity }}
      >
        {word}
      </motion.span>
      {index === 4 ? <br /> : null}
    </>
  );
}

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.55'],
  });

  return (
    <section className="manifesto section-paper" id="manifesto" ref={sectionRef}>
      <div className="manifesto__orb" aria-hidden="true" />
      <div className="shell">
        <SectionHead index="01" label="Manifesto" right="A room, reimagined" tone="light" />

        <h2 className="manifesto__statement">
          {words.map((word, index) => (
            <Word
              key={word}
              word={word}
              index={index}
              total={words.length}
              progress={scrollYProgress}
            />
          ))}
        </h2>

        <div className="manifesto__grid">
          <Reveal className="manifesto__note" delay={0.1}>
            <span className="manifesto__note-line" />
            <p>
              We stopped treating sound as something that comes from a box.
              Aether reads the geometry around it and paints a field — front, back,
              above, below. Wherever you stand, the mix finds you.
            </p>
          </Reveal>

          <aside className="manifesto__aside">
            <Reveal delay={0.15}>
              <div className="manifesto__diagram">
                <svg viewBox="0 0 240 240" fill="none" aria-hidden="true">
                  <circle cx="120" cy="120" r="96" stroke="currentColor" strokeOpacity="0.18" />
                  <circle cx="120" cy="120" r="66" stroke="currentColor" strokeOpacity="0.3" />
                  <circle
                    className="manifesto__diagram-dash"
                    cx="120"
                    cy="120"
                    r="46"
                    stroke="#5E6B2A"
                    strokeDasharray="2 6"
                  />
                  <path d="M120 12v18M120 210v18M12 120h18M210 120h18" stroke="currentColor" strokeOpacity="0.35" />
                  <path d="M120 120 176 64" stroke="#5E6B2A" />
                  <circle cx="120" cy="120" r="5" fill="#5E6B2A" />
                  <circle cx="176" cy="64" r="3.5" fill="currentColor" />
                  <text x="120" y="234" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="monospace" letterSpacing="2">FIELD MAP / 01</text>
                  <text x="186" y="58" fill="currentColor" fontSize="7" fontFamily="monospace" letterSpacing="1">YOU</text>
                </svg>
              </div>
            </Reveal>

            <Reveal className="manifesto__meta" delay={0.25}>
              <div>
                <span>Field</span>
                <strong>360° / adaptive</strong>
              </div>
              <div>
                <span>Material</span>
                <strong>Anodised aluminium</strong>
              </div>
              <a href="#object" className="manifesto__link" data-cursor>
                Meet the object
                <Icon name="arrowOutward" size={15} />
              </a>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
