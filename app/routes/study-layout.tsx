import { Outlet, type ShouldRevalidateFunction } from 'react-router';
import { getStore } from '../../server/store';
import { HomeSampleProvider } from '../components/home/SampleQuestion';

// Shared by every study page. React Router keeps this loader's data while the
// learner changes subjects, levels, languages or exercises inside the layout.
export function loader() {
  const store = getStore();
  return { catalogue: store.catalogue(), practiceSets: store.sets() };
}
export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentUrl,
  nextUrl,
  formMethod,
  defaultShouldRevalidate,
}) => {
  // Mutations and explicit refreshes can reload content. Query-string filters and
  // ordinary navigation use the copy already loaded; a new document loads fresh data.
  if (formMethod && formMethod !== 'GET') return defaultShouldRevalidate;
  return currentUrl.href === nextUrl.href && defaultShouldRevalidate;
};
export default function StudyLayout() {
  return (
    <HomeSampleProvider>
      <Outlet />
    </HomeSampleProvider>
  );
}
