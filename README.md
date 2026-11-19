# NIGHTGATE masterclass

Ship a Midnight dApp with only an API key.

You deploy your own small attestation vault on Midnight preview, attest a
record, prove a statement about it in zero knowledge and verify it. Every
transaction is built and proven on your machine. A DUST pool pays the fees, so
you need no wallet, no tokens, no node, no indexer and no proof server.

## What you need

- Node.js 22 or newer and git
- A code for the hosted NIGHTGATE API (you get one in the session)

## The run

```bash
git clone https://github.com/ODATANO/nightgate-masterclass
cd nightgate-masterclass
npm install

npm run key -- <YOUR-CODE>            # 0  your API key, stored in .env
npm run deploy                        # 1  your own vault
npm run attest                        # 2  commit to record.json
npm run prove -- healthPct min 80     # 3  prove "healthPct >= 80"
npm run verify -- healthPct min 80    # 4  check it on the chain
npm run agent                         # 5  let an AI agent use the same key
```

Every step can be run again. A finished step is skipped.

| step | what happens | where |
| --- | --- | --- |
| `key` | a code becomes a key | hosted API |
| `deploy` | the deploy is built and signed | your machine |
| `attest` | a proof that you know the values behind the commitment | your machine |
| `prove` | a proof that one value meets a threshold | your machine |
| every write | DUST is added and the transaction is submitted | the sponsor pool |
| `verify` | the public state is read and checked | hosted API |

## The record

`record.json` is a small battery passport:

```json
{ "id": "battery-001", "capacityKwh": 75, "cycles": 412, "healthPct": 93, "recycledPct": 16 }
```

The four values never leave your machine. `attest` puts a commitment to them on
the chain. `prove` then shows a statement such as `healthPct >= 80` to be true
without showing `93`.

```bash
npm run prove -- healthPct min 80      # at least 80
npm run prove -- cycles max 1000       # at most 1000
npm run prove -- recycledPct min 12
npm run verify                         # lists every proven statement
```

A false statement cannot be proven. Try `npm run prove -- healthPct min 95`.

Change `record.json` and give it a new `id` to attest another record.

## Verify somebody else's claim

Verifying needs no secret, only public data. `prove` prints the command for
your neighbour:

```bash
npm run verify -- healthPct min 80 vault=<their vault address> record=battery-001
```

You learn that the statement holds for their record. You do not learn the value.

## The contract

[`contract/src/mini-vault.compact`](contract/src/mini-vault.compact) is about
150 lines of Compact.

- **Public state**: `attestations` (record id to owner and commitment),
  `claims` (the proven statements) and a counter.
- **Private inputs** (witnesses): your secret, the four values and a salt.
- **`attest(record_id)`** stores your owner id and the commitment.
- **`proveField(record_id, field_index, op, threshold)`** opens the commitment
  inside the proof, checks the comparison and stores the statement.
- **Pure circuits** `ownerIdOf`, `commitmentOf` and `claimKeyOf` compute the
  same hashes off-chain. `verify` uses `claimKeyOf` to find a statement.

The compiled contract is in `contract/managed/mini-vault`, prover keys
included, so you need no compiler. `npm test` runs both circuits offline.

To change the contract, compile it with the Compact compiler 0.36.0 (Linux,
macOS or WSL) and deploy again:

```bash
compact compile +0.36.0 contract/src/mini-vault.compact contract/managed/mini-vault
npm run deploy -- new
```

## How a write works

```
your machine                         hosted API                Midnight preview
------------                         ----------                ----------------
build + prove + sign  -- bytes -->   sponsor adds DUST   -->   block
(seed, values, salt                  and submits
 stay here)           <-- job ---    job status
```

The code is in [`src/lib.mjs`](src/lib.mjs) and the four scripts:

```js
const builder = await createTxBuilder({ seedHex, networkId: 'preview', api, walletSync: false,
    contractClass: Contract, contractName: 'mini-vault', zkConfigDir: 'contract/managed/mini-vault' });

const built = await builder.buildSponsorable({ contractAddress: vault,
    call: { circuitId: 'proveField', args: [recordId, 2n, 1n, 80n] }, witnesses, bind: false });

await connect(api).sponsorUnbound({ unboundTxB64: built.unboundTxB64, idempotencyKey });
```

## Let an agent do it

`npm run agent` writes `.mcp.json` with the
[NIGHTGATE MCP server](https://www.npmjs.com/package/@odatano/nightgate-mcp) on
preview, your key and the path of your seed. Start an MCP client in this
folder, for example `claude`, and ask:

- "Who am I on Midnight?"
- "Anchor README.md on Midnight and verify it afterwards."
- "How many calls does my key have left?"

The server builds and proves on your machine as well, with the same seed, and
the same pool pays. It comes with `npm install`.

## What your key can do

- 1 unit per API call, `npm run key` shows what is left
- a few sponsored deploys of your own contracts
- sponsored calls to the contracts you deployed
- preview at `https://api.preview.odatano.dev`

## When something goes wrong

| message | what to do |
| --- | --- |
| `No key yet` | `npm run key -- <YOUR-CODE>` |
| `this code was already used` | each code works once, ask for another |
| `HTTP 402` | the key has no calls left, redeem another code with `npm run key -- <CODE> again` |
| `HTTP 429` | wait a minute and run the same command again |
| a step stops half way | run the same command again |
| `.vault` was deleted | the seed and the private values are gone, deploy a new vault with `npm run deploy -- new` |

Your seed (`.vault/seed.hex`), your private values (`.vault/records`) and your
key (`.env`) stay on your machine and out of git.

## Files

```
contract/src/mini-vault.compact     the contract
contract/managed/mini-vault/        compiled contract, circuits and keys
record.json                         the record you attest
scripts/                            key, deploy, attest, prove, verify, agent
src/lib.mjs                         settings, seed, witnesses, builder
test/circuits.test.mjs              both circuits on the Compact runtime
```

## Links

- [`@odatano/nightgate-tx`](https://www.npmjs.com/package/@odatano/nightgate-tx), the client SDK
- [`@odatano/nightgate-mcp`](https://www.npmjs.com/package/@odatano/nightgate-mcp), the MCP server
- [NIGHTGATE](https://github.com/ODATANO/NIGHTGATE)
- [Docs](https://odatano.dev/docs/)

Apache-2.0
