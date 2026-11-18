// Step 1: deploy your own mini vault. Built and proven here, the sponsor pays the fee.
//   npm run deploy            a vault that already exists is kept
//   npm run deploy -- new     deploys another one
import { BASE, NETWORK, args, open, run, saveVaultAddress, sponsor, vaultAddress, waitForLedger } from '../src/lib.mjs';

run(async () => {
    const { words } = args();
    const existing = vaultAddress();
    if (existing && !words.includes('new')) {
        console.log(`your vault: ${existing} (already deployed)`);
        return;
    }

    console.log(`network ${NETWORK}, API ${BASE}`);
    const { ng, builder, witnesses, close } = await open();
    try {
        console.log('building the deploy on this machine...');
        const started = Date.now();
        const built = await builder.buildDeploySponsorable({ bind: false, constructorArgs: [], witnesses, initialPrivateState: {} });
        console.log(`  built in ${Math.round((Date.now() - started) / 1000)} s: ${built.serializedBytes} bytes, address ${built.contractAddress}`);

        console.log('handing it to the sponsor...');
        try {
            await sponsor(ng, built, 'deploy');
        } catch (error) {
            console.error(`If the deploy lands later after all, write ${built.contractAddress} into .vault/vault.txt.`);
            throw error;
        }
        saveVaultAddress(built.contractAddress);

        await waitForLedger(ng, built.contractAddress, () => true, { what: 'the server to read your new vault' });
        console.log(`\nyour vault is live: ${built.contractAddress}`);
        console.log('next: npm run attest');
    } finally {
        await close();
    }
});
