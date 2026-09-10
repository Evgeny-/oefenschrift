import {redirect} from 'react-router';
import {assertLocal,logoutHeaders} from '../../server/security';
export function loader(){throw redirect('/ops/login');}
export function action({request}){assertLocal(request);if(request.headers.get('Origin')!==new URL(request.url).origin)throw new Response('Origin rejected',{status:403});throw redirect('/ops/login',{headers:logoutHeaders()});}
