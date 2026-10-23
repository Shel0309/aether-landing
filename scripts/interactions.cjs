const { chromium } = require('playwright-core');
const path = require('path');

const url = process.env.URL || 'http://localhost:4173/aether-landing/';
const out = path.join(__dirname, '..', 'shots');

(async () => {
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
    args: ['--enable-unsafe-swiftshader'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
  });
  page.on('pageerror', (err) => console.log('PAGE EXCEPTION:', err.message));

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(out, '30-preloader.png') });
  await page.waitForTimeout(3600);

  await page.click('a[href="#object"].nav__link');
  await page.waitForTimeout(1700);
  const objectScroll = await page.evaluate(() => {
    const el = document.getElementById('object');
    return el ? Math.round(el.getBoundingClientRect().top) : null;
  });

  await page.evaluate(() => {
    const el = document.getElementById('reserve');
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
  });
  await page.waitForTimeout(1400);
  await page.fill('#reserve-email', 'not-an-email');
  await page.click('.btn--lime');
  await page.waitForTimeout(400);
  const errorVisible = await page.isVisible('.reserve__error');
  await page.screenshot({ path: path.join(out, '32-form-error.png') });
  await page.fill('#reserve-email', 'hello@example.com');
  await page.click('.btn--lime');
  await page.waitForTimeout(700);
  const successVisible = await page.isVisible('.reserve__success');
  await page.screenshot({ path: path.join(out, '33-form-success.png') });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.click('.menu-toggle');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(out, '34-mobile-menu.png') });
  const menuVisible = await page.isVisible('.menu');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(900);
  const menuClosed = !(await page.isVisible('.menu'));

  console.log(JSON.stringify({ menuVisible, menuClosed, objectScroll, errorVisible, successVisible }, null, 2));
  await browser.close();
})();
