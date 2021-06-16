import {chromium} from 'playwright';

async function main(): Promise<void> {
   const browser = await chromium.launch({headless: false, devtools: true, slowMo: 2000});
   const page = await browser.newPage();
   await page.goto('https://www.google.com/maps');
   await page.waitForTimeout(2000);

   await page.screenshot({ path: `page_one.png` });

   const vp = page.viewportSize()!;

   const m1 = [vp?.width-200, vp?.height-200];
   const m2 = [vp?.width-100, vp?.height-100];

   await page.mouse.move(m1[0], m1[1]);
   await page.mouse.down();
   await page.mouse.move(m2[0], m2[1]);
   await page.mouse.up();

   await page.screenshot({ path: `page_two.png` });

   await browser.close();
}

main().catch((e) => console.error(e));