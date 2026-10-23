const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto('file:///C:/Users/leoni/aether-landing/public/og.svg');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'public/og.png' });
  await browser.close();
})();
