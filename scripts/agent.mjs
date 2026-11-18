// Step 5: let an AI agent use the same key through the NIGHTGATE MCP server.
//   npm run agent      writes .mcp.json for an MCP client started in this folder
import fs from 'node:fs';
import path from 'node:path';
import { BASE, NETWORK, ROOT, run, token } from '../src/lib.mjs';

run(async () => {
    const config = {
        mcpServers: {
            nightgate: {
                command: 'npx',
                args: ['-y', '@odatano/nightgate-mcp'],
                env: { ODATANO_ACCESS_KEY: token(), ODATANO_ACCESS_URL: BASE, NIGHTGATE_NETWORK: NETWORK },
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
