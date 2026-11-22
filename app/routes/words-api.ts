import { wordEntries } from '../../server/words';
// The whole dictionary for searching across lists and for My list. It changes only with a
// deployment, so browsers may keep it for an hour.
export function loader() {
  return Response.json(wordEntries(), {
    headers: {
      'Cache-Control': process.env.NODE_ENV === 'production' ? 'public, max-age=3600' : 'no-store',
    },
  });
}
