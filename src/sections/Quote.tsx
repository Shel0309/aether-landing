import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Reveal } from '../components/Reveal';

const press = ['Monocle', 'Wired', 'Dezeen', 'Wallpaper*', 'Frame'];

export function Quote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ['-18%', '18%']);
  const quoteY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  return (
    <section className="quote section-paper" ref={ref}>
      <motion.div className="quote__glow" style={{ y: glowY }} aria-hidden="true" />
      <div className="shell">
        <div className="quote__top">
          <span>Field notes / 05</span>
          <span>Unpublished, 2026</span>
        </div>

        <motion.blockquote style={{ y: quoteY }}>
          <Reveal>
            <p>
              “It does not sound like a room.
              <br />
              It sounds like a <em>memory.</em>”
            </p>
          </Reveal>
        </motion.blockquote>

        <Reveal className="quote__by" delay={0.15}>
          <span className="quote__line" />
          <span>Frame Magazine — Issue 214</span>
        </Reveal>

        <div className="press">
          {press.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
