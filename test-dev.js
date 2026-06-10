import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

(async () => {
  const server = spawn('npm', ['run', 'dev']);
  await new Promise(r => setTimeout(r, 2000));
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
    console.log(err.stack);
  });
  
  try {
    await page.goto('http://localhost:5173');
    await new Promise(r => setTimeout(r, 2000));
  } finally {
    await browser.close();
    server.kill();
  }
})();
