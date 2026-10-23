import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import Lenis from 'lenis';
import { Cursor } from './components/Cursor';
import { Header } from './components/Header';
import { Preloader } from './components/Preloader';
import { Experience } from './sections/Experience';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Manifesto } from './sections/Manifesto';
import { ObjectSection } from './sections/ObjectSection';
import { Quote } from './sections/Quote';
import { Reserve } from './sections/Reserve';
import { Specs } from './sections/Specs';
import { Ticker } from './components/Ticker';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();

  const onPreloaderDone = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      lerp: 0.095,
      smoothWheel: true,
      autoRaf: true,
      anchors: false,
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (loading || menuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [loading, menuOpen]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const section = document.querySelector<HTMLElement>(hash);
      if (!section) return;

      event.preventDefault();
      const scroll = () => {
        lenisRef.current?.scrollTo(section, {
          offset: -70,
          duration: reduced ? 0 : 1.4,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });
      };

      if (menuOpen) {
        setMenuOpen(false);
        window.setTimeout(scroll, 850);
      } else {
        scroll();
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [menuOpen, reduced]);

  return (
    <>
      <a className="skip-link" href="#manifesto">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />

      <AnimatePresence>
        {loading ? <Preloader onDone={onPreloaderDone} /> : null}
      </AnimatePresence>

      <Header menuOpen={menuOpen} onMenuChange={setMenuOpen} />

      <main>
        <Hero ready={!loading} />
        <Ticker />
        <Manifesto />
        <ObjectSection />
        <Experience />
        <Quote />
        <Specs />
        <Reserve />
      </main>

      <Footer />
    </>
  );
}
