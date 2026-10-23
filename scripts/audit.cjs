const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-unsafe-swiftshader'] });
  const reduced = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  reduced.on('pageerror', (e) => errors.push(e.message));
  await reduced.goto('https://shel0309.github.io/aether-landing/', { waitUntil: 'networkidle' });
  await reduced.waitForTimeout(2200);
  const reducedState = await reduced.evaluate(() => ({
    h1: getComputedStyle(document.querySelector('h1')).visibility,
    preloader: !!document.querySelector('.preloader'),
    overflow: document.documentElement.scrollWidth - window.innerWidth,
  }));
  await reduced.screenshot({ path: 'shots/60-reduced.png' });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  mobile.on('pageerror', (e) => errors.push(e.message));
  await mobile.goto('https://shel0309.github.io/aether-landing/', { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(4200);
  const mobileState = await mobile.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    preloader: !!document.querySelector('.preloader'),
    cursor: !!document.querySelector('.cursor'),
    heroBottom: Math.round(document.querySelector('.hero').getBoundingClientRect().bottom),
  }));
  await mobile.screenshot({ path: 'shots/61-mobile-touch.png' });
  console.log(JSON.stringify({ reducedState, mobileState, errors }, null, 2));
  await browser.close();
})();
