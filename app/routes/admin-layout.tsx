import {Form,NavLink,Outlet,useLoaderData} from 'react-router';
import {getStore} from '../../server/store';
import {adminSession} from '../../server/security';
import {readPreferences} from '../domain/render-state';
import ThemeSwitch from '../components/admin/ThemeSwitch';
export function loader({request}){adminSession(request);return {open:getStore().reports().filter(report=>report.status==='open').length,theme:readPreferences(request.headers.get('Cookie')||'').theme};}
export function meta(){return [{title:'Administration | Inburgering'},{name:'robots',content:'noindex'}];}
export default function AdminLayout(){
  const {open,theme}=useLoaderData<typeof loader>();
  return <div className="admin">
    <header className="admin-bar">
      <NavLink to="/ops" end className="wordmark">Inburgering</NavLink>
      <nav className="admin-nav" aria-label="Operations">
        <NavLink to="/ops" end>Overview</NavLink>
        <NavLink to="/ops/exercises">Exercises</NavLink>
        <NavLink to="/ops/reports">Reports{open>0&&<span className="admin-count" aria-label={`${open} open`}>{open}</span>}</NavLink>
        <NavLink to="/ops/services">Services</NavLink>
      </nav>
      <div className="admin-bar-tools"><ThemeSwitch initial={theme}/><a className="bar-link" href="/reading">Practice site</a><Form method="post" action="/ops/logout"><button className="bar-link">Sign out</button></Form></div>
    </header>
    <main className="admin-main" id="main-content"><Outlet/></main>
  </div>;
}
