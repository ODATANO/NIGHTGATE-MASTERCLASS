// Step 5: let an AI agent use the same key and the same seed through the NIGHTGATE MCP server.
//   npm run agent      writes .mcp.json for an MCP client started in this folder
import fs from 'node:fs';
import path from 'node:path';
import { BASE, NETWORK, ROOT, SEED_FILE, run, seedHex, stop, token } from '../src/lib.mjs';

const SERVER = path.join(ROOT, 'node_modules', '@odatano', 'nightgate-mcp', 'dist', 'index.js');

run(async () => {
    const key = token();
    if (!fs.existsSync(SERVER)) stop('The MCP server is not installed yet. Run:  npm install');
    const seed = seedHex();
    // A seed from the environment is handed over as it is. Otherwise the server reads your seed file.
    const identity = process.env.NIGHTGATE_SEED_HEX ? { NIGHTGATE_SEED_HEX: seed } : { NIGHTGATE_SEED_FILE: SEED_FILE };
    const config = {
        mcpServers: {
            nightgate: {
                command: process.execPath,
                args: [SERVER],
                env: { ODATANO_ACCESS_KEY: key, ODATANO_ACCESS_URL: BASE, NIGHTGATE_NETWORK: NETWORK, ...identity },
            },
        },
    };
    // The file holds your key, so it is in .gitignore.
    fs.writeFileSync(path.join(ROOT, '.mcp.json'), JSON.stringify(config, null, 2) + '\n', { mode: 0o600 });
    console.log('.mcp.json written (it holds your key and stays out of git)');
    console.log('\nClaude Code: start `claude` in this folder and accept the "nightgate" server.');
    console.log('Other clients: copy the "nightgate" entry of .mcp.json into their MCP settings.');
    console.log('\nThings to ask the agent:');
    console.log('  "Who am I on Midnight? Use get_attester_identity."');
    console.log('  "Anchor README.md on Midnight and verify it afterwards."');
    console.log('  "How many calls does my key have left?"');
});
