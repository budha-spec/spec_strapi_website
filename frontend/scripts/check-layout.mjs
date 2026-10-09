/**
 * Responsive layout check — run against the dev server before calling a page done.
 *
 *   npm run check:layout -- services/ai-ml-development
 *   npm run check:layout -- services --widths=320,768,1440 --shots=./tmp-shots
 *
 * For each width it loads the page in headless Chrome with real device
 * emulation (plain `--window-size` cannot go below 500px), then reports any
 * element that pushes past the viewport and is not inside a scroll/clip
 * container. Exits 1 when anything overflows, so it can gate CI too.
 *
 * Env: CHROME_PATH (defaults to the usual Windows install), BASE_URL
 * (defaults to http://localhost:3000).
 */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const DEFAULT_WIDTHS = [320, 375, 430, 768, 1024, 1280, 1440, 1920, 2560];
const CHROME =
  process.env.CHROME_PATH ??
  'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
const PORT = 9335;

const args = process.argv.slice(2);
// Accepts `services/x` or `/services/x`. Git Bash rewrites a leading `/` into
// a Windows path (`C:/Program Files/Git/services/x`), so undo that too.
const rawPath = (args.find((a) => !a.startsWith('--')) ?? '/')
  .replace(/\\/g, '/')
  .replace(/^[A-Za-z]:\/.*?\/Git(?=\/)/, '');
const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
const flag = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1];
const widths = flag('widths')?.split(',').map(Number) ?? DEFAULT_WIDTHS;
const shots = flag('shots');
if (shots) mkdirSync(shots, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${join(tmpdir(), 'spec-check-layout')}`,
  'about:blank',
]);

let ws;
for (let i = 0; i < 40 && !ws; i++) {
  try {
    const targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
    const page = targets.find((t) => t.type === 'page');
    if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
  } catch {}
  if (!ws) await sleep(250);
}
if (!ws) throw new Error(`Could not start Chrome at ${CHROME}`);
await new Promise((r) => ws.addEventListener('open', r));

let nextId = 0;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data);
  pending.get(msg.id)?.(msg);
  pending.delete(msg.id);
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const id = ++nextId;
    pending.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });

const REPORT = `(() => {
  const vw = document.documentElement.clientWidth;
  const offenders = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (!r.width || (r.right <= vw + 1 && r.left >= -1)) continue;
    let p = el.parentElement, clipped = false;
    while (p && p !== document.body) {
      if (/hidden|auto|scroll|clip/.test(getComputedStyle(p).overflowX)) { clipped = true; break; }
      p = p.parentElement;
    }
    if (!clipped) offenders.push(el.tagName.toLowerCase() + '.' + String(el.className).slice(0, 80));
  }
  return { vw, scrollW: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight, offenders: offenders.slice(0, 8) };
})()`;

let failed = false;
for (const width of widths) {
  const mobile = width < 768;
  await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile });
  await send('Page.navigate', { url: `${BASE}${path}` });
  await sleep(5000);
  const { result } = await send('Runtime.evaluate', { expression: REPORT, returnByValue: true });
  const report = result.result.value;
  const ok = report.scrollW <= report.vw && report.offenders.length === 0;
  failed ||= !ok;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${width}px  scrollWidth=${report.scrollW}`);
  for (const o of report.offenders) console.log(`       ↳ ${o}`);

  if (shots) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: report.h, deviceScaleFactor: 1, mobile });
    await sleep(1000);
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(shots, `${width}.png`), Buffer.from(shot.result.data, 'base64'));
  }
}

ws.close();
chrome.kill();
process.exit(failed ? 1 : 0);
