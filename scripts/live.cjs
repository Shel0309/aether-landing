const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-unsafe-swiftshader'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  const res = await page.goto('https://shel0309.github.io/aether-landing/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4500);
  await page.screenshot({ path: 'shots/50-live-hero.png' });
  await page.evaluate(() => document.getElementById('object').scrollIntoView());
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'shots/51-live-object.png' });
  console.log(JSON.stringify({ status: res.status(), errors }, null, 2));
  await browser.close();
})();
