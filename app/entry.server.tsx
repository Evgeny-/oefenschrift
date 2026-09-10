import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable } from '@react-router/node';
import { ServerRouter, type EntryContext } from 'react-router';
import { renderToPipeableStream } from 'react-dom/server';
import { isbot } from 'isbot';

export const streamTimeout = 5000;

export default function handleRequest(
  request: Request,
  status: number,
  headers: Headers,
  context: EntryContext,
) {
  if (request.method === 'HEAD') return new Response(null, { status, headers });
  const nonce = request.headers.get('x-csp-nonce') || undefined;
  return new Promise<Response>((resolve, reject) => {
    let shellRendered = false;
    const ready =
      isbot(request.headers.get('user-agent') || '') || context.isSpaMode
        ? 'onAllReady'
        : 'onShellReady';
    const timeout = setTimeout(() => abort(), streamTimeout + 1000);
    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={context} url={request.url} nonce={nonce} />,
      {
        nonce,
        [ready]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeout);
              callback();
            },
          });
          headers.set('Content-Type', 'text/html');
          resolve(new Response(createReadableStreamFromReadable(body), { status, headers }));
          pipe(body);
        },
        onShellError(error) {
          clearTimeout(timeout);
          reject(error);
        },
        onError() {
          status = 500;
          if (shellRendered) console.error('Server rendering failed.');
        },
      },
    );
  });
}
