// Runs the two circuits offline on the Compact runtime: no network, no key, no proof.
//   npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import * as runtime from '@midnight-ntwrk/compact-runtime';
import { Contract, ledger, pureCircuits } from '../contract/managed/mini-vault/contract/index.js';

const COIN_KEY = '00'.repeat(32);
const RECORD_ID = Uint8Array.from(randomBytes(32));
const VALUES = [75n, 412n, 93n, 16n];
const SALT = Uint8Array.from(randomBytes(32));
const AT_MOST = 0n;
const AT_LEAST = 1n;

/** One caller of the vault: a secret plus the private values it holds. */
function caller(secret, values = VALUES, salt = SALT) {
    return new Contract({
        local_secret_key: ({ privateState }) => [privateState, secret],
        record_values: ({ privateState }) => [privateState, values],
        record_salt: ({ privateState }) => [privateState, salt],
    });
}

/** A fresh vault and a way to call it as any caller. */
async function vault() {
    const address = runtime.sampleContractAddress();
    const owner = Uint8Array.from(randomBytes(32));
    let state = (await caller(owner).initialState(runtime.createConstructorContext(undefined, COIN_KEY))).currentContractState;
    const call = async (contract, circuit, ...args) => {
        const context = runtime.createCircuitContext({
            circuitId: circuit, contractAddress: address, coinPublicKeyOrZswapState: COIN_KEY, contractState: state, privateState: undefined,
        });
        const result = await contract.impureCircuits[circuit](context, ...args);
        state = result.context.callContext.currentQueryContext.state;
    };
    return { owner, call, read: () => ledger(state) };
}

test('attest stores the owner and the commitment, not the values', async () => {
    const v = await vault();
    await v.call(caller(v.owner), 'attest', RECORD_ID);
    const attestation = v.read().attestations.lookup(RECORD_ID);
    assert.deepEqual(attestation.owner, pureCircuits.ownerIdOf(v.owner));
    assert.deepEqual(attestation.commitment, pureCircuits.commitmentOf(VALUES, SALT));
    assert.equal(v.read().attested, 1n);
});

test('a record is attested once', async () => {
    const v = await vault();
    await v.call(caller(v.owner), 'attest', RECORD_ID);
    await assert.rejects(v.call(caller(v.owner), 'attest', RECORD_ID), /already attested/);
});

test('proveField records a true statement, and a verifier finds it from public data', async () => {
    const v = await vault();
    await v.call(caller(v.owner), 'attest', RECORD_ID);
    await v.call(caller(v.owner), 'proveField', RECORD_ID, 2n, AT_LEAST, 80n);

    const { commitment } = v.read().attestations.lookup(RECORD_ID);
    const key = pureCircuits.claimKeyOf(RECORD_ID, commitment, 2n, AT_LEAST, 80n);
    assert.equal(v.read().claims.member(key), true);
    assert.deepEqual(v.read().claims.lookup(key), { record_id: RECORD_ID, field_index: 2n, op: AT_LEAST, threshold: 80n });
    assert.equal(v.read().claims.member(pureCircuits.claimKeyOf(RECORD_ID, commitment, 2n, AT_LEAST, 95n)), false);
});

test('a false statement cannot be proven', async () => {
    const v = await vault();
    await v.call(caller(v.owner), 'attest', RECORD_ID);
    await assert.rejects(v.call(caller(v.owner), 'proveField', RECORD_ID, 2n, AT_LEAST, 95n), /statement is false/);
    await assert.rejects(v.call(caller(v.owner), 'proveField', RECORD_ID, 1n, AT_MOST, 400n), /statement is false/);
});

test('only the attester can prove, and only with the attested values', async () => {
    const v = await vault();
    await v.call(caller(v.owner), 'attest', RECORD_ID);
    const stranger = Uint8Array.from(randomBytes(32));
    await assert.rejects(v.call(caller(stranger), 'proveField', RECORD_ID, 2n, AT_LEAST, 80n), /only the attester/);
    const better = [75n, 412n, 99n, 16n];
    await assert.rejects(v.call(caller(v.owner, better), 'proveField', RECORD_ID, 2n, AT_LEAST, 95n), /do not match/);
});

test('field index and op are checked', async () => {
    const v = await vault();
    await v.call(caller(v.owner), 'attest', RECORD_ID);
    await assert.rejects(v.call(caller(v.owner), 'proveField', RECORD_ID, 4n, AT_LEAST, 1n), /field index out of range/);
    await assert.rejects(v.call(caller(v.owner), 'proveField', RECORD_ID, 0n, 2n, 1n), /op out of range/);
});
