import {randomBytes,createHmac,timingSafeEqual,scryptSync} from 'node:crypto';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {redirect} from 'react-router';
export function assertLocal(request){
  const url=new URL(request.url);
  if(!['127.0.0.1','localhost'].includes(url.hostname))throw new Response('Local access only',{status:403});
  const origin=request.headers.get('Origin');
  if(origin&&origin!==url.origin)throw new Response('Origin rejected',{status:403});
  if(request.headers.get('Sec-Fetch-Site')==='cross-site')throw new Response('Cross-site access rejected',{status:403});
}
function secret(){
  if(process.env.INBURGERING_ADMIN_SECRET)return process.env.INBURGERING_ADMIN_SECRET;
  const path=resolve('var/admin-secret');mkdirSync('var',{recursive:true});
  try{return readFileSync(path,'utf8');}catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT')throw e;const value=randomBytes(32).toString('hex');try{writeFileSync(path,value,{mode:0o600,flag:'wx'});return value;}catch(error){if((error as NodeJS.ErrnoException).code==='EEXIST')return readFileSync(path,'utf8');throw error;}}
}
function sign(value){return createHmac('sha256',secret()).update(value).digest('hex');}
function equal(a,b){return typeof a==='string'&&typeof b==='string'&&a.length===b.length&&timingSafeEqual(Buffer.from(a),Buffer.from(b));}
export const SESSION_HOURS=12;
// A session token is issued only by a successful login: login.<issued>.<random>.<signature>.
function valid(token){const [kind,time,random,sig]=String(token||'').split('.');return kind==='login'&&/^\d+$/.test(time||'')&&/^[a-f0-9]{32}$/.test(random||'')&&Date.now()-Number(time)<SESSION_HOURS*3600*1000&&Number(time)<=Date.now()&&equal(sig,sign('login.'+time+'.'+random));}
function cookie(request){return (request.headers.get('Cookie')||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('inburgering_ops='))?.slice(16);}
function cookieHeader(value,maxAge){return `inburgering_ops=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}`;}
export const CREDENTIALS_PATH='var/admin-credentials.json';
// The operator account: INBURGERING_ADMIN_USER with INBURGERING_ADMIN_PASSWORD (local
// development and tests) or a scrypt hash written by `npm run admin:password`.
export function adminCredentials():{user:string;password?:string;salt?:string;hash?:string}|null{
  const user=process.env.INBURGERING_ADMIN_USER;
  if(user&&process.env.INBURGERING_ADMIN_PASSWORD)return {user,password:process.env.INBURGERING_ADMIN_PASSWORD};
  try{const stored=JSON.parse(readFileSync(resolve(process.env.INBURGERING_ADMIN_CREDENTIALS||CREDENTIALS_PATH),'utf8'));if(typeof stored.user==='string'&&typeof stored.salt==='string'&&typeof stored.hash==='string')return stored;}catch{}
  return null;
}
export function hashPassword(password,salt=randomBytes(16).toString('hex')){return {salt,hash:scryptSync(password,salt,64).toString('hex')};}
export function writeCredentials(user,password){
  if(!/^[\w.@-]{2,64}$/.test(user))throw new Error('Choose a user name of 2-64 letters, digits, dots, @, _ or -.');
  if(typeof password!=='string'||password.length<10)throw new Error('Use a password of at least 10 characters.');
  const path=resolve(process.env.INBURGERING_ADMIN_CREDENTIALS||CREDENTIALS_PATH);mkdirSync(resolve(path,'..'),{recursive:true});
  writeFileSync(path,JSON.stringify({user,...hashPassword(password),created:new Date().toISOString()},null,1)+'\n',{mode:0o600});
  return path;
}
export function verifyLogin(user,password){
  const account=adminCredentials();
  if(!account||typeof user!=='string'||typeof password!=='string')return false;
  const nameMatches=equal(user,account.user);
  if(account.password!==undefined)return nameMatches&&equal(password,account.password);
  return nameMatches&&equal(hashPassword(password,account.salt).hash,account.hash);
}
// Five failed attempts per address pause logins for fifteen minutes.
const attempts=new Map<string,number[]>();
export function loginAllowed(address,now=Date.now()){
  const recent=(attempts.get(address)||[]).filter(time=>now-time<15*60*1000);attempts.set(address,recent);
  return recent.length<5;
}
export function loginFailed(address,now=Date.now()){attempts.set(address,[...(attempts.get(address)||[]),now]);}
export function loginSession(){const value='login.'+Date.now()+'.'+randomBytes(16).toString('hex'),token=value+'.'+sign(value);return {token,headers:{'Set-Cookie':cookieHeader(token,SESSION_HOURS*3600),'Cache-Control':'no-store'}};}
export function logoutHeaders(){return {'Set-Cookie':cookieHeader('',0),'Cache-Control':'no-store'};}
export function signedIn(request){assertLocal(request);const token=cookie(request);return valid(token)?token:null;}
// Pages and JSON endpoints call this first; without a session it sends the operator to the login form.
export function adminSession(request){
  const token=signedIn(request);
  if(token)return {token,headers:{'Cache-Control':'no-store'}};
  const url=new URL(request.url);
  if(request.headers.get('Accept')?.includes('text/html')||url.pathname.startsWith('/ops'))throw redirect('/ops/login?next='+encodeURIComponent(url.pathname+url.search));
  throw new Response('Sign in to the administration first.',{status:401});
}
export function requireAdminMutation(request,token){assertLocal(request);const origin=request.headers.get('Origin');if(origin!==new URL(request.url).origin||!valid(token)||!equal(token,cookie(request)))throw new Response('Reload the admin page and try again.',{status:403});}
// Learner events carry a random browser id; only its keyed hash reaches the database.
export function visitorHash(id){return typeof id==='string'&&/^[a-f0-9-]{8,64}$/.test(id)?createHmac('sha256',secret()).update('visitor.'+id).digest('hex').slice(0,32):null;}
