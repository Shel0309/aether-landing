const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-unsafe-swiftshader'] });
  for (const [w,h,name] of [[1280,720,'40-1280x720'],[1920,1080,'41-1920x1080'],[768,1024,'42-tablet']]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto('http://localhost:4173/aether-landing/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3800);
    await page.screenshot({ path: `shots/${name}.png` });
    await page.close();
  }
  await browser.close();
})();
