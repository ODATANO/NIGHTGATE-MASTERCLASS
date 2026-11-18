// Step 0: your API key.
//   npm run key -- <CODE>      turns a code into a key and stores it in .env
//   npm run key -- oda_...     stores a key you already have
//   npm run key                shows what the stored key has left
import fs from 'node:fs';
import path from 'node:path';
import { BASE, NETWORK, ROOT, args, run, stop } from '../src/lib.mjs';

const ENV_FILE = path.join(ROOT, '.env');

function store(key) {
    const lines = fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, 'utf8').split(/\r?\n/).filter((line) => line && !line.startsWith('NIGHTGATE_TOKEN=')) : [];
    fs.writeFileSync(ENV_FILE, [`NIGHTGATE_TOKEN=${key}`, ...lines].join('\n') + '\n', { mode: 0o600 });
}

async function show(key) {
    const response = await fetch(`${BASE}/me`, { headers: { Authorization: `Bearer ${key}` } });
    if (!response.ok) stop(`The API did not accept the key (HTTP ${response.status}).`);
    const me = await response.json();
    const free = me.freeToday?.midnight;
    console.log(`key ${me.prefix}… on ${NETWORK} (${BASE})`);
    console.log(`  calls left: ${me.unlimited ? 'unlimited' : me.unitsLeft}${free != null ? `, plus ${free} free today` : ''}`);
    if (me.validUntil) console.log(`  valid until ${String(me.validUntil).slice(0, 10)}`);
}

run(async () => {
    const [input] = args().words;
    const stored = (process.env.NIGHTGATE_TOKEN || '').trim();

    if (!input) {
        if (!stored) stop('No key yet. Run:  npm run key -- <YOUR-CODE>');
        return show(stored);
    }
    if (input.startsWith('oda_')) {
        store(input);
        console.log('key stored in .env');
        return show(input);
    }
    if (stored && !args().words.includes('again')) {
        stop('There is already a key in .env, so the code was not used.\nTo replace the key: npm run key -- <CODE> again');
    }

    const response = await fetch(`${BASE}/codes/redeem`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: input }) });
    const body = await response.json().catch(() => ({}));
    if (response.status !== 201 || !body.token) {
        const why = { 404: 'unknown code', 409: 'this code was already used', 410: 'this code has expired', 429: 'too many attempts, wait a few minutes' }[response.status];
        stop(`The code was not accepted: ${why ?? body.error ?? `HTTP ${response.status}`}.`);
    }
    store(body.token);
    console.log('code redeemed, key stored in .env (it is shown nowhere else, keep the file)');
    await show(body.token);
    console.log('next: npm run deploy');
});
