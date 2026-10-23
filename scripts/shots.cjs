const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const url = process.env.URL || 'http://localhost:4173/aether-landing/';
const out = path.join(__dirname, '..', 'shots');
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
    args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
  });
  page.on('pageerror', (err) => console.log('PAGE EXCEPTION:', err.message));

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: path.join(out, '01-hero.png') });

  const positions = [
    ['02-manifesto', '#manifesto', 0],
    ['03-manifesto-low', '#manifesto', 520],
    ['04-object', '#object', 0],
    ['05-object-low', '#object', 500],
    ['06-experience-a', '#experience', 0],
    ['07-experience-b', '#experience', 900],
    ['08-experience-c', '#experience', 1900],
    ['09-quote', '.quote', 0],
    ['10-specs', '#specs', 0],
    ['11-specs-low', '#specs', 700],
    ['12-reserve', '#reserve', 0],
    ['13-footer', '.footer', 0],
  ];

  for (const [name, selector, extra] of positions) {
    await page.evaluate(
      ({ selector, extra }) => {
        const el = document.querySelector(selector);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY + extra;
        window.scrollTo(0, top);
      },
      { selector, extra },
    );
    await page.waitForTimeout(1600);
    await page.screenshot({ path: path.join(out, `${name}.png`) });
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(out, '20-mobile-hero.png') });

  for (const [name, selector, extra] of [
    ['21-mobile-manifesto', '#manifesto', 0],
    ['22-mobile-object', '#object', 0],
    ['23-mobile-experience', '#experience', 0],
    ['24-mobile-specs', '#specs', 0],
    ['25-mobile-reserve', '#reserve', 0],
    ['26-mobile-footer', '.footer', 0],
  ]) {
    await page.evaluate(
      ({ selector, extra }) => {
        const el = document.querySelector(selector);
        if (!el) return;
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + extra);
      },
      { selector, extra },
    );
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(out, `${name}.png`) });
  }

  console.log('done');
  await browser.close();
})();
