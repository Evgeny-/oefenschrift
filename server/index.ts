import express from 'express';
import type {ServerBuild} from 'react-router';
import {createRequestHandler} from '@react-router/express';
import {randomBytes} from 'node:crypto';
import {createServer} from 'node:http';
const development=process.env.NODE_ENV!=='production',port=Number(process.env.PORT||8766);
const app=express();app.disable('x-powered-by');
app.use((req,res,next)=>{
  if(![`127.0.0.1:${port}`,`localhost:${port}`].includes(req.headers.host||'')){res.status(403).end('Host rejected');return;}
  if(req.headers['sec-fetch-site']==='cross-site'){res.status(403).end('Cross-site access rejected');return;}
  const nonce=randomBytes(18).toString('base64');req.headers['x-csp-nonce']=nonce;
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
  if(req.path==='/ops'||req.path.startsWith('/ops/')||req.path.startsWith('/api/ops'))res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');
  res.setHeader('Content-Security-Policy',`default-src 'self'; script-src 'self' ${development?"'unsafe-inline'":`'nonce-${nonce}'`}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self' blob:; connect-src 'self' ${development?'ws://127.0.0.1:* ws://localhost:*':''}; worker-src 'self' ${development?'blob:':''}; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`);next();
});
const http=createServer(app);
if(development){
  const {createServer}=await import('vite');const vite=await createServer({server:{middlewareMode:true,ws:{server:http}},appType:'custom'});app.use(vite.middlewares);
  app.use(async(req,res,next)=>{try{const build=await vite.ssrLoadModule('virtual:react-router/server-build');await createRequestHandler({build:build as ServerBuild,mode:'development'})(req,res,next);}catch(e){vite.ssrFixStacktrace(e as Error);next(e);}});
}else{
  app.use(express.static('build/client',{index:false}));
  const buildPath='../build/server/index.js';const build=await import(buildPath);app.use(createRequestHandler({build,mode:'production'}));
}
app.use((error,req,res,next)=>{console.error('Request failed:',error?.name||'Error');if(!res.headersSent)res.status(500).json({error:'Request failed. Please retry.'});});
http.listen(port,'127.0.0.1',()=>console.log(`Inburgering ${development?'development (hot reload)':'production'}: http://127.0.0.1:${port}`));
function close(){http.close(()=>process.exit(0));setTimeout(()=>process.exit(0),2000).unref();}
process.on('SIGTERM',close);process.on('SIGINT',close);
