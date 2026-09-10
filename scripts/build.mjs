import {build} from 'esbuild';
import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
execFileSync('python3',['scripts/integrate_content.py'],{stdio:'inherit'});
const catalogue=JSON.parse(await fs.readFile('content/catalogue.json','utf8'));
const sets=JSON.parse(await fs.readFile('content/practice-sets.json','utf8'));
const members=sets.flatMap(set=>set.ids);
if(new Set(sets.map(set=>set.id)).size!==sets.length||members.length!==catalogue.length||new Set(members).size!==members.length||sets.some(set=>set.ids.length<2||set.ids.length>5||set.ids.some(id=>!catalogue.some(item=>item.id===id&&item.part===set.part&&(item.part==='knm'||item.level===set.level)))))throw Error('Practice sets must cover every exercise exactly once, with matching subject and level.');
await build({entryPoints:['app/main.jsx'],outfile:'demo/app.js',bundle:true,minify:true,format:'iife',define:{'process.env.NODE_ENV':'"production"'},legalComments:'eof'});
await fs.copyFile('app/styles.css','demo/styles.css');

await build({entryPoints:['app/theme-init.js'],outfile:'demo/theme.js',bundle:true,minify:true,format:'iife'});
let html=await fs.readFile('app/index.html','utf8');
for(const file of ['app.js','styles.css','theme.js']){
  const hash=createHash('sha256').update(await fs.readFile(`demo/${file}`)).digest('hex').slice(0,12);
  html=html.replace(`"${file}"`,`"/${file}?v=${hash}"`);
}
await fs.writeFile('demo/index.html',html);
// Keep a file-openable copy for offline practice; normal URLs use the server shell.
await fs.writeFile('demo/offline.html',html.replace(/"\/(app\.js|styles\.css|theme\.js)\?v=[a-f0-9]+"/g,'"$1"'));
