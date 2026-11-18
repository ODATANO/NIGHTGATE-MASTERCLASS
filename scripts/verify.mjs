// Step 4: verify a statement. It reads the chain through the API and needs no seed and no private data.
//   npm run verify -- healthPct min 80                              your own vault and record
//   npm run verify -- healthPct min 80 vault=<address> record=<label>   somebody else's
//   npm run verify                                                  lists every proven statement of the record
import { FIELDS, SIGN, args, contractModule, hex, open, readLedger, readRecord, recordIdOf, run, stop, vaultAddress } from '../src/lib.mjs';
import { statementOf } from './prove.mjs';

run(async () => {
    const { words, named } = args();
    const vault = vaultAddress(named) ?? stop('Which vault? Add vault=<address>, or deploy your own with: npm run deploy');
    const label = named.record ?? readRecord().label;
    const recordId = recordIdOf(label);

    const { ng } = await open({ withBuilder: false });
    const { pureCircuits } = await contractModule();
    const ledger = await readLedger(ng, vault);
    if (!ledger) stop('The server cannot read this vault. Check the address.');

    console.log(`vault    ${vault}`);
    console.log(`record   ${label} (id ${hex(recordId)})`);
    if (!ledger.attestations.member(recordId)) stop('NOT VERIFIED: this record is not attested on this vault.');
    const attestation = ledger.attestations.lookup(recordId);
    console.log(`attester ${hex(attestation.owner)}`);
    console.log(`on chain commitment ${hex(attestation.commitment)}, ${ledger.attested} attestation(s) in this vault`);

    if (words.length === 0) {
        const proven = [...ledger.claims].map(([, claim]) => claim).filter((claim) => hex(claim.record_id) === hex(recordId));
        console.log(proven.length ? '\nproven statements:' : '\nno statement proven yet. Run: npm run prove -- healthPct min 80');
        for (const claim of proven) console.log(`  ${FIELDS[Number(claim.field_index)]} ${SIGN[Number(claim.op)]} ${claim.threshold}`);
        return;
    }

    const statement = statementOf(words);
    // The key is recomputed here with the contract's own circuit, from public data only.
    const key = pureCircuits.claimKeyOf(recordId, attestation.commitment, statement.index, statement.op, statement.threshold);
    if (ledger.claims.member(key)) {
        console.log(`\nVERIFIED: the attester proved "${statement.text}" for this record.`);
        console.log('The value itself is not on the chain.');
    } else {
        console.log(`\nNOT VERIFIED: nobody proved "${statement.text}" for this record.`);
        process.exitCode = 1;
    }
});
