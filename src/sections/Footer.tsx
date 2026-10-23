import { useEffect, useState } from 'react';
import { Icon } from '../components/Icon';
import { Magnetic } from '../components/Magnetic';

const nav = [
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#object', label: 'The Object' },
  { href: '#experience', label: 'Experience' },
  { href: '#specs', label: 'Specification' },
  { href: '#reserve', label: 'Reserve' },
];

const social = [
  { href: 'https://www.instagram.com/', label: 'Instagram' },
  { href: 'https://www.are.na/', label: 'Are.na' },
  { href: 'https://www.youtube.com/', label: 'YouTube' },
];

export function Footer() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const londonTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(time);

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__statement">
            <span className="footer__eyebrow">06 / End</span>
            <p>
              Sound has a shape.
              <br />
              Step <em>inside it.</em>
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <span className="footer__col-title">Index</span>
            {nav.map((link) => (
              <a key={link.href} href={link.href} data-cursor>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="footer__contact">
            <span className="footer__col-title">Contact</span>
            <a href="mailto:hello@aether.systems" data-cursor>
              hello@aether.systems
              <Icon name="mail" size={14} />
            </a>
            <a href="mailto:press@aether.systems" data-cursor>
              press@aether.systems
              <Icon name="mail" size={14} />
            </a>
            <div className="footer__socials">
              {social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                >
                  {link.label}
                  <Icon name="arrowOutward" size={12} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer__time">
            <span className="footer__col-title">Local time</span>
            <span className="footer__clock">London / {londonTime}</span>
            <span className="footer__coords">51.5072° N / 0.1276° W</span>
          </div>
        </div>

        <div className="footer__word-wrap" aria-hidden="true">
          <svg className="footer__word" viewBox="0 0 1200 260" fill="none">
            <defs>
              <linearGradient id="footer-word-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ece9e0" />
                <stop offset="100%" stopColor="#ece9e0" stopOpacity="0.18" />
              </linearGradient>
            </defs>
            <text
              x="0"
              y="222"
              textLength="1200"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#footer-word-gradient)"
              fontFamily="Space Grotesk Variable, Space Grotesk, sans-serif"
              fontWeight="600"
              fontSize="300"
              letterSpacing="-14"
            >
              AETHER
            </text>
          </svg>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Aether Systems</span>
          <span className="footer__disclaimer">
            A conceptual product study. Not a real product.
          </span>
          <span className="footer__bottom-right">
            <span>Built with WebGL &amp; patience</span>
            <Magnetic strength={5}>
              <a href="#top" className="footer__top-btn" aria-label="Back to top" data-cursor>
                <Icon name="north" size={16} />
              </a>
            </Magnetic>
          </span>
        </div>
      </div>
    </footer>
  );
}
