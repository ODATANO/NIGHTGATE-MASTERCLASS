// Shared parts of the four steps: settings, your seed, your record, the builder.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash, randomBytes } from 'node:crypto';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const at = (...parts) => path.join(ROOT, ...parts);

if (fs.existsSync(at('.env'))) process.loadEnvFile(at('.env'));

export const BASE = (process.env.NIGHTGATE_BASE_URL || 'https://api.preview.odatano.dev').replace(/\/+$/, '');
export const NETWORK = process.env.NIGHTGATE_NETWORK || 'preview';
export const CONTRACT = 'mini-vault';
export const ZK_DIR = at('contract', 'managed', CONTRACT);

// The four values of a record, in the order the contract hashes them.
export const FIELDS = ['capacityKwh', 'cycles', 'healthPct', 'recycledPct'];
// op as the circuit takes it: 0 = at most, 1 = at least.
export const OPS = { max: 0n, min: 1n };
export const SIGN = { 0: '<=', 1: '>=' };

const VAULT_DIR = at('.vault');
export const SEED_FILE = at('.vault', 'seed.hex');
const ADDRESS_FILE = at('.vault', 'vault.txt');
const RECORDS_DIR = at('.vault', 'records');

export const hex = (bytes) => Buffer.from(bytes).toString('hex');
export const bytes = (hexString) => Uint8Array.from(Buffer.from(hexString, 'hex'));
export const sha256 = (data) => Uint8Array.from(createHash('sha256').update(data).digest());
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const short = (value) => `${String(value).slice(0, 10)}…${String(value).slice(-6)}`;

export function stop(message) {
    console.error(`\n${message}\n`);
    process.exit(2);
}

/** `name=value` pairs and plain words of the command line. */
export function args() {
    const words = [];
    const named = {};
    for (const raw of process.argv.slice(2)) {
        const pair = /^-{0,2}([a-z]+)=(.+)$/i.exec(raw);
        if (pair) named[pair[1].toLowerCase()] = pair[2];
        else words.push(raw);
    }
    return { words, named };
}

export function token() {
    const value = (process.env.NIGHTGATE_TOKEN || '').trim();
    if (!value) stop('No key yet. Run:  npm run key -- <YOUR-CODE>');
    return value;
}

/** Your seed. It is created on the first run and never leaves this folder. */
export function seedHex() {
    const fromEnv = (process.env.NIGHTGATE_SEED_HEX || '').trim();
    if (fromEnv) return fromEnv;
    if (!fs.existsSync(SEED_FILE)) {
        fs.mkdirSync(VAULT_DIR, { recursive: true });
        // 'wx' never overwrites an existing seed.
        fs.writeFileSync(SEED_FILE, randomBytes(64).toString('hex'), { mode: 0o600, flag: 'wx' });
        console.log('new seed written to .vault/seed.hex');
    }
    return fs.readFileSync(SEED_FILE, 'utf8').trim();
}

/** The secret behind your public owner id, derived from the seed. */
export const secretOf = (seed) => sha256(Buffer.concat([Buffer.from('mini-vault owner secret'), Buffer.from(seed, 'hex')]));

export function vaultAddress(named = {}) {
    const value = (named.vault || process.env.NIGHTGATE_VAULT || (fs.existsSync(ADDRESS_FILE) ? fs.readFileSync(ADDRESS_FILE, 'utf8') : '')).trim();
    return value || null;
}

export function saveVaultAddress(address) {
    fs.mkdirSync(VAULT_DIR, { recursive: true });
    fs.writeFileSync(ADDRESS_FILE, `${address}\n`);
}

// ---- Records -------------------------------------------------------------------

/** The public id of a record: the hash of its label. */
export const recordIdOf = (label) => (/^[0-9a-f]{64}$/i.test(label) ? bytes(label) : sha256(Buffer.from(label, 'utf8')));

/** Reads record.json: a label and the four values. */
export function readRecord(file = at('record.json')) {
    const record = JSON.parse(fs.readFileSync(file, 'utf8'));
    const values = FIELDS.map((name) => {
        const value = record[name];
        if (!Number.isInteger(value) || value < 0) stop(`record.json: "${name}" must be a whole number, 0 or more`);
        return BigInt(value);
    });
    if (typeof record.id !== 'string' || !record.id) stop('record.json: "id" must be a text label, for example "battery-001"');
    return { label: record.id, values };
}

const openingFile = (recordId) => path.join(RECORDS_DIR, `${hex(recordId)}.json`);

/** The private side of an attestation: the values and the salt. Without it nobody can prove anything about the record. */
export function saveOpening(recordId, { label, values, salt }) {
    fs.mkdirSync(RECORDS_DIR, { recursive: true });
    fs.writeFileSync(openingFile(recordId), JSON.stringify({ label, values: values.map(String), salt: hex(salt) }, null, 2), { mode: 0o600 });
}

export function readOpening(recordId) {
    const file = openingFile(recordId);
    if (!fs.existsSync(file)) return null;
    const stored = JSON.parse(fs.readFileSync(file, 'utf8'));
    return { label: stored.label, values: stored.values.map(BigInt), salt: bytes(stored.salt) };
}

// ---- Contract ------------------------------------------------------------------

export const contractModule = () => import('../contract/managed/mini-vault/contract/index.js');

/** The witnesses answer the circuit's private questions from your disk. */
export function witnessesFor(secret) {
    const opening = (recordId) => readOpening(recordId) ?? stop(`no private data for record ${hex(recordId)} in .vault/records`);
    return {
        local_secret_key: ({ privateState }) => [privateState, secret],
        record_values: ({ privateState }, recordId) => [privateState, opening(recordId).values],
        record_salt: ({ privateState }, recordId) => [privateState, opening(recordId).salt],
    };
}

/** Client for the hosted API plus a builder that proves on this machine. */
export async function open({ withBuilder = true } = {}) {
    const { connect, createTxBuilder } = await import('@odatano/nightgate-tx');
    const api = { baseUrl: BASE, token: token() };
    const ng = connect(api);
    if (!withBuilder) return { ng, close: async () => {} };

    const seed = seedHex();
    if (!/^[0-9a-f]{128}$/i.test(seed)) stop('the seed must be 128 hex characters (.vault/seed.hex)');
    const secret = secretOf(seed);
    const { Contract } = await contractModule();
    const builder = await createTxBuilder({
        seedHex: seed,
        networkId: NETWORK,
        api,
        // The vault moves no coins, so the wallet need not sync.
        walletSync: false,
        contractClass: Contract,
        contractName: CONTRACT,
        privateStateId: 'miniVaultPrivateState',
        zkConfigDir: ZK_DIR,
    });
    return { ng, builder, secret, witnesses: witnessesFor(secret), close: () => builder.close() };
}

/** Hands a built transaction to the sponsor and waits until it is in a block. */
export async function sponsor(ng, built, name) {
    const started = Date.now();
    const job = await ng.sponsorUnbound({ unboundTxB64: built.unboundTxB64, idempotencyKey: `${name}-${Date.now()}` });
    console.log(`  in a block after ${Math.round((Date.now() - started) / 1000)} s, transaction ${short(job.txHash)}`);
    return job;
}

/** The vault's public state, decoded with the contract's own reader. Null while the server cannot read it yet. */
export async function readLedger(ng, address) {
    const snapshot = await ng.contractStateAt({ address }).catch(() => null);
    if (!snapshot?.state) return null;
    const { ContractState } = await import('@midnight-ntwrk/compact-runtime');
    const { ledger } = await contractModule();
    return ledger(ContractState.deserialize(Uint8Array.from(Buffer.from(snapshot.state, 'base64'))).data);
}

/** Polls the public state until `ready(ledger)` holds. */
export async function waitForLedger(ng, address, ready, { tries = 36, everyMs = 5000, what = 'the chain' } = {}) {
    for (let i = 0; i < tries; i++) {
        const state = await readLedger(ng, address);
        if (state && ready(state)) return state;
        if (i === 0) console.log(`  waiting for ${what}...`);
        await sleep(everyMs);
    }
    return null;
}

/** Runs a step and turns a failure into one readable line. */
export function run(main) {
    main().then(() => process.exit(process.exitCode ?? 0)).catch((error) => {
        const status = error?.status ? ` (HTTP ${error.status}${error.code ? `, ${error.code}` : ''})` : '';
        console.error(`\nfailed${status}: ${error?.message ?? error}`);
        if (error?.status === 401) console.error('The key was not accepted. Check NIGHTGATE_TOKEN in .env.');
        if (error?.status === 402) console.error('The key has no calls left. Ask for another code and run: npm run key -- <CODE>');
        if (error?.status === 429) console.error('Too many calls right now. Wait a minute and run the same command again.');
        process.exit(1);
    });
}
