const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-unsafe-swiftshader'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(process.env.URL || 'http://localhost:4173/aether-landing/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4200);
  const box = await page.locator('.hero__actions .btn--solid').boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'shots/70-hover-cta.png', clip: { x: 900, y: 620, width: 540, height: 220 } });
  await browser.close();
})();
