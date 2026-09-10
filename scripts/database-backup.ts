import {backup,DatabaseSync} from 'node:sqlite';
import {mkdir} from 'node:fs/promises';
const directory='var/backups';await mkdir(directory,{recursive:true});
const destination=`${directory}/inburgering-${new Date().toISOString().replaceAll(':','-')}.sqlite3`;
// Back up the existing database without opening the store or running migrations.
const database=new DatabaseSync(process.env.INBURGERING_DB||'var/reports.sqlite3',{readOnly:true});
try{await backup(database,destination);console.log(destination);}finally{database.close();}
