import { readFileSync, writeFileSync } from 'node:fs';
import { meaningPacket, meaningPacketHash } from './meaning-review';

const source = process.argv[2];
if (!source) throw Error('Usage: npm run batch:review-source -- content/batches/NNN-original.json');
const items = JSON.parse(readFileSync(source, 'utf8'));
const output = source.replace(/-(original|proposed)\.json$/, '-meaning-packet.json');
if (output === source) throw Error('Expected an original or proposed batch file');
writeFileSync(output, JSON.stringify(meaningPacket(items), null, 2) + '\n');
console.log(`${output}\npacket_sha256: ${meaningPacketHash(items)}`);
