// Step 3: prove a statement about one value without revealing it.
//   npm run prove -- healthPct min 80      healthPct is at least 80
//   npm run prove -- cycles max 1000       cycles is at most 1000
import {
    FIELDS, OPS, SIGN, args, contractModule, hex, open, readOpening, readRecord, recordIdOf, run, sponsor, stop, vaultAddress, waitForLedger,
} from '../src/lib.mjs';

/** Reads `<field> min|max <threshold>` from the command line. */
export function statementOf(words) {
    const [field, op, threshold] = words;
    const index = FIELDS.indexOf(field);
    if (index < 0 || !(op in OPS) || !/^\d+$/.test(threshold ?? '')) {
        stop(`Say what to prove: <field> min|max <number>\n  fields: ${FIELDS.join(', ')}\n  example: npm run prove -- healthPct min 80`);
    }
    return { field, index: BigInt(index), op: OPS[op], threshold: BigInt(threshold), text: `${field} ${SIGN[OPS[op]]} ${threshold}` };
}

if (process.argv[1]?.endsWith('prove.mjs')) run(async () => {
    const { words, named } = args();
    const statement = statementOf(words);
    const vault = vaultAddress(named) ?? stop('No vault yet. Run: npm run deploy');
    const label = named.record ?? readRecord().label;
    const recordId = recordIdOf(label);
    const opening = readOpening(recordId) ?? stop(`No private data for "${label}". Run: npm run attest`);

    // Checked here first, so a false statement costs no proof and no call.
    const value = opening.values[Number(statement.index)];
    const holds = statement.op === OPS.min ? value >= statement.threshold : value <= statement.threshold;
    if (!holds) stop(`"${statement.text}" is false for your record. A false statement cannot be proven.`);

    console.log(`vault     ${vault}`);
    console.log(`record    ${label} (id ${hex(recordId)})`);
    console.log(`statement ${statement.text}`);

    const { ng, builder, witnesses, close } = await open();
    try {
        const { pureCircuits } = await contractModule();
        const state = await waitForLedger(ng, vault, (ledger) => ledger.attestations.member(recordId), { tries: 12, what: 'the attestation' });
        if (!state) stop(`"${label}" is not attested on this vault. Run: npm run attest`);
        const { commitment } = state.attestations.lookup(recordId);
        const key = pureCircuits.claimKeyOf(recordId, commitment, statement.index, statement.op, statement.threshold);
        if (state.claims.member(key)) {
            console.log('this statement is already proven on the chain');
            console.log(`next: npm run verify -- ${words.join(' ')}`);
            return;
        }

        console.log('building and proving on this machine, the value stays here...');
        const started = Date.now();
        const built = await builder.buildSponsorable({
            contractAddress: vault,
            call: { circuitId: 'proveField', args: [recordId, statement.index, statement.op, statement.threshold] },
            witnesses,
            initialPrivateState: {},
            bind: false,
        });
        console.log(`  proven in ${Math.round((Date.now() - started) / 1000)} s: ${built.serializedBytes} bytes`);

        console.log('handing it to the sponsor...');
        await sponsor(ng, built, 'prove');
        await waitForLedger(ng, vault, (ledger) => ledger.claims.member(key), { what: 'the claim to show up' });
        console.log(`\nproven: ${statement.text}`);
        console.log(`next: npm run verify -- ${words.join(' ')}`);
        console.log(`share with your neighbour:\n  npm run verify -- ${words.join(' ')} vault=${vault} record=${label}`);
    } finally {
        await close();
    }
});
