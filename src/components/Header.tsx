import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BrandMark } from './BrandMark';
import { Icon } from './Icon';
import { Magnetic } from './Magnetic';

const links = [
  { href: '#manifesto', label: 'Manifesto', index: '01' },
  { href: '#object', label: 'The Object', index: '02' },
  { href: '#experience', label: 'Experience', index: '03' },
  { href: '#specs', label: 'Specification', index: '04' },
];

type HeaderProps = {
  menuOpen: boolean;
  onMenuChange: (open: boolean) => void;
};

export function Header({ menuOpen, onMenuChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onMenuChange(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, onMenuChange]);

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-hidden' : ''}`}>
        <div className="header__inner">
          <a className="brand" href="#top" aria-label="Aether — back to top">
            <BrandMark className="brand__mark" />
            <span className="brand__name">AETHER</span>
            <span className="brand__reg">®</span>
          </a>

          <nav className="nav" aria-label="Primary">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav__link">
                <span>{link.index}</span>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <Magnetic strength={6}>
              <a href="#reserve" className="btn btn--ghost btn--small" data-cursor>
                <span className="btn__dot" />
                Reserve
                <Icon name="arrowOutward" size={14} />
              </a>
            </Magnetic>

            <button
              type="button"
              className="menu-toggle"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => onMenuChange(true)}
            >
              <span>Menu</span>
              <Icon name="menu" size={18} />
            </button>
          </div>
        </div>
        <div className="header__rule" />
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu__head">
              <a className="brand" href="#top" onClick={() => onMenuChange(false)}>
                <BrandMark className="brand__mark" />
                <span className="brand__name">AETHER</span>
              </a>
              <button
                type="button"
                className="menu__close"
                aria-label="Close menu"
                onClick={() => onMenuChange(false)}
              >
                <span>Close</span>
                <Icon name="close" size={20} />
              </button>
            </div>

            <nav className="menu__nav" aria-label="Mobile">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => onMenuChange(false)}
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.24 + index * 0.07,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="menu__index">0{index + 1}</span>
                  <span>{link.label}</span>
                  <Icon name="arrowOutward" size={22} />
                </motion.a>
              ))}
            </nav>

            <div className="menu__bottom">
              <a href="#reserve" onClick={() => onMenuChange(false)}>
                Reserve — $1,290
              </a>
              <div className="menu__meta">
                <span>London / 51.5072 N</span>
                <span>hello@aether.systems</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
