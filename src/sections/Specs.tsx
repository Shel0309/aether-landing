import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';

type CounterProps = {
  value: number;
  decimals?: number;
  suffix?: string;
};

function Counter({ value, decimals = 0, suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let start: number | null = null;
    const duration = 1600;

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className="stat__value">
      {display.toFixed(decimals)}
      <small>{suffix}</small>
    </span>
  );
}

const stats: Array<{
  value: number;
  suffix: string;
  label: string;
  note: string;
  decimals?: number;
}> = [
  { value: 360, suffix: '°', label: 'Immersive field', note: 'Sound from every direction, not just the front.' },
  { value: 12, suffix: '', label: 'Custom drivers', note: 'Four tweeters. Four midrange. Four woofers.' },
  { value: 0.8, suffix: 'ms', decimals: 1, label: 'Phase lock', note: 'Driver-to-driver alignment at any volume.' },
  { value: 24, suffix: 'h', label: 'Continuous play', note: 'Ninety-six hours in low-power field mode.' },
];

const specs = [
  {
    index: '01',
    title: 'Acoustic architecture',
    text: 'Twelve drivers in a true 360° array: four 25 mm tweeters, four 70 mm midrange and four 100 mm woofers. Each paired with a dedicated 96 kHz DSP channel and a sealed 2.4 litre chamber.',
  },
  {
    index: '02',
    title: 'Materials & finish',
    text: 'A single billet of 6061 aluminium, bead-blasted and anodised. The grille is acoustically transparent woven steel. No plastic enters the signal path or the surface.',
  },
  {
    index: '03',
    title: 'Connectivity',
    text: 'Wi-Fi 6E, Bluetooth 5.3, USB-C, Ethernet and Aether Link for multi-room fields. AirPlay 2 and Chromecast are built in. Local playback works without a network.',
  },
  {
    index: '04',
    title: 'In the box',
    text: 'Aether One, magnetic levelling base, woven power cable, calibration microphone and a quick-start field guide. Packed in recycled felt and moulded pulp.',
  },
];

export function Specs() {
  return (
    <section className="specs" id="specs">
      <div className="shell">
        <SectionHead index="04" label="Specification" right="Measured, not promised" />

        <div className="specs__intro">
          <Reveal>
            <h2>
              Precision you can
              <br />
              <em>feel.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="specs__intro-copy">
            <p>
              Every surface, every millimetre and every microsecond exists for one
              reason: to make the technology disappear. What remains is the room,
              the music, and you.
            </p>
            <span className="specs__intro-note">Tolerance / 0.02 mm</span>
          </Reveal>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} className="stat" delay={index * 0.06}>
              <Counter
                value={stat.value}
                decimals={stat.decimals ?? 0}
                suffix={stat.suffix}
              />
              <span className="stat__label">{stat.label}</span>
              <p>{stat.note}</p>
            </Reveal>
          ))}
        </div>

        <div className="specs__details">
          <Reveal className="blueprint">
            <div className="blueprint__grid" aria-hidden="true" />
            <div className="blueprint__top">
              <span>Top view / scale 1:4</span>
              <span>Aether One</span>
            </div>
            <svg viewBox="0 0 640 470" fill="none" aria-label="Technical drawing of Aether One">
              <motion.rect
                x="140"
                y="92"
                width="360"
                height="270"
                rx="44"
                stroke="currentColor"
                strokeOpacity="0.55"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.circle
                cx="320"
                cy="227"
                r="96"
                stroke="currentColor"
                strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              <motion.circle
                cx="320"
                cy="227"
                r="54"
                stroke="#C9FF3D"
                strokeOpacity="0.75"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
              <motion.circle
                cx="320"
                cy="227"
                r="18"
                stroke="currentColor"
                strokeOpacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.7 }}
              />

              <g stroke="currentColor" strokeOpacity="0.3" strokeDasharray="2 6">
                <path d="M320 60v320M96 227h448" />
                <circle cx="320" cy="227" r="132" strokeOpacity="0.18" />
              </g>

              <g fill="currentColor" fillOpacity="0.55">
                <circle cx="320" cy="131" r="5" />
                <circle cx="320" cy="323" r="5" />
                <circle cx="224" cy="227" r="5" />
                <circle cx="416" cy="227" r="5" />
                <circle cx="252" cy="159" r="4" />
                <circle cx="388" cy="159" r="4" />
                <circle cx="252" cy="295" r="4" />
                <circle cx="388" cy="295" r="4" />
              </g>

              <g stroke="#C9FF3D" strokeOpacity="0.65">
                <path d="M140 402h360" />
                <path d="M140 396v12M500 396v12" />
                <path d="M560 92v270" />
                <path d="M554 92h12M554 362h12" />
              </g>

              <g fill="#C9FF3D" fontFamily="monospace" fontSize="8" letterSpacing="1.5">
                <text x="320" y="424" textAnchor="middle">320 MM</text>
                <text x="578" y="231" transform="rotate(90 578 231)" textAnchor="middle">270 MM</text>
                <text x="140" y="72" fill="currentColor" fillOpacity="0.5">AETHER ONE / TOP</text>
                <text x="500" y="72" fill="currentColor" fillOpacity="0.5">REV. 02</text>
              </g>

              <circle cx="320" cy="227" r="3" fill="#C9FF3D" />
              <motion.circle
                cx="320"
                cy="227"
                r="132"
                stroke="#C9FF3D"
                strokeOpacity="0.25"
                strokeDasharray="1 10"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '320px 227px' }}
              />
            </svg>
            <div className="blueprint__bottom">
              <span>12 driver array</span>
              <span>Designed in London / Assembled in Japan</span>
            </div>
          </Reveal>

          <div className="accordion">
            {specs.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <details className="accordion__item">
                  <summary>
                    <span className="accordion__index">{item.index}</span>
                    <span className="accordion__title">{item.title}</span>
                    <span className="accordion__icon">
                      <Icon name="add" size={18} />
                    </span>
                  </summary>
                  <div className="accordion__content">
                    <p>{item.text}</p>
                  </div>
                </details>
              </Reveal>
            ))}
            <Reveal className="accordion__foot" delay={0.1}>
              <span>Need the full data sheet?</span>
              <a href="mailto:hello@aether.systems" data-cursor>
                Request PDF
                <Icon name="arrowOutward" size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
