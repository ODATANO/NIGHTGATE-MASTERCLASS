// Step 2: attest record.json. The chain gets a commitment, the four values stay here.
//   npm run attest
import { randomBytes } from 'node:crypto';
import {
    FIELDS, args, contractModule, hex, open, readOpening, readRecord, recordIdOf, run, saveOpening, sponsor, stop, vaultAddress, waitForLedger,
} from '../src/lib.mjs';

run(async () => {
    const { named } = args();
    const vault = vaultAddress(named) ?? stop('No vault yet. Run: npm run deploy');
    const record = readRecord();
    const recordId = recordIdOf(record.label);
    console.log(`vault  ${vault}`);
    console.log(`record ${record.label} (id ${hex(recordId)})`);

    const { ng, builder, secret, witnesses, close } = await open();
    try {
        const { pureCircuits } = await contractModule();
        const state = await waitForLedger(ng, vault, () => true, { what: 'the server to read your vault' });
        if (!state) stop('The server cannot read the vault yet. Try again in a minute.');
        if (state.attestations.member(recordId)) {
            console.log('this record is already attested, nothing to do');
            console.log('next: npm run prove -- healthPct min 80');
            return;
        }

        // The salt hides the values: without it the commitment could be guessed by trying values.
        const salt = readOpening(recordId)?.salt ?? Uint8Array.from(randomBytes(32));
        saveOpening(recordId, { label: record.label, values: record.values, salt });
        const commitment = pureCircuits.commitmentOf(record.values, salt);
        console.log(`private: ${FIELDS.map((name, i) => `${name}=${record.values[i]}`).join(', ')}`);
        console.log(`public:  commitment ${hex(commitment)}, owner ${hex(pureCircuits.ownerIdOf(secret))}`);

        console.log('building and proving the attestation on this machine...');
        const started = Date.now();
        const built = await builder.buildSponsorable({
            contractAddress: vault,
            call: { circuitId: 'attest', args: [recordId] },
            witnesses,
            initialPrivateState: {},
            bind: false,
        });
        console.log(`  proven in ${Math.round((Date.now() - started) / 1000)} s: ${built.serializedBytes} bytes`);

        console.log('handing it to the sponsor...');
        await sponsor(ng, built, 'attest');
        await waitForLedger(ng, vault, (ledger) => ledger.attestations.member(recordId), { what: 'the attestation to show up' });
        console.log('\nattested. Your values are in .vault/records, keep that folder.');
        console.log('next: npm run prove -- healthPct min 80');
    } finally {
        await close();
    }
});
