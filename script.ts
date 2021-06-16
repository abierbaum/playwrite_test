import {chromium} from 'playwright';

async function main(): Promise<void> {
   const browser = await chromium.launch({headless: false, devtools: true/*, slowMo: 2000*/});
   const page = await browser.newPage();
   //await page.goto('https://www.google.com/maps');
   await page.goto('https://leafletjs.com/examples/quick-start/example.html');
   await page.waitForTimeout(500);

   await page.screenshot({ path: `page_one.png` });

   // Wait until map is in the DOM
   await page.hover('#mapid');
   const map_elt = await page.$('.leaflet-pane');
   const bbox = (await map_elt?.boundingBox())!;

   const pt = [bbox.x + bbox.width / 2, bbox.y + bbox.height / 2]

   await page.mouse.move(pt[0], pt[1]);
   await page.mouse.down();
   await page.waitForTimeout(250);

   await page.mouse.move(pt[0]+100, pt[1]+100, {steps: 20});
   await page.waitForTimeout(250);

   await page.mouse.up();
   await page.waitForTimeout(250);

   await page.screenshot({ path: `page_two.png` });

   await browser.close();
}

main().catch((e) => console.error(e));