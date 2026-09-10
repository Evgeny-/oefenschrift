import React, { useEffect } from 'react';
import { useFetcher } from 'react-router';
export const number = (value: number) =>
  new Intl.NumberFormat('en-GB').format(Math.round(value || 0));
export const percent = (part: number, total: number) =>
  total ? `${Math.round((part / total) * 100)}%` : '–';
// Three significant digits with a K/M suffix, for counts that must stay on one line.
// Written out rather than Intl's compact notation, whose suffixes differ between engines
// (Firefox writes "1.45m" for en-GB).
export function compact(value: number) {
  for (const [size, suffix] of [
    [1e9, 'B'],
    [1e6, 'M'],
    [1e3, 'K'],
  ] as const)
    if ((value || 0) >= size * 0.9995) return `${Number((value / size).toPrecision(3))}${suffix}`;
  return String(Math.round(value || 0));
}
export const money = (value: number) => `$${value.toFixed(2)}`;
export function Tile({
  label,
  value,
  detail = undefined,
  tone = undefined,
  className = 'span-2',
}: {
  label: string;
  value: React.ReactNode;
  detail?: React.ReactNode;
  tone?: 'warn' | undefined;
  className?: string;
}) {
  return (
    <div className={`tile ${className} ${tone === 'warn' ? 'tile-warn' : ''}`}>
      <span className="tile-label">{label}</span>
      <strong className="tile-value">{value}</strong>
      {detail !== undefined && <span className="tile-detail">{detail}</span>}
    </div>
  );
}
export function Card({
  title,
  note = undefined,
  children,
  className = '',
  actions = undefined,
}: {
  title?: string;
  note?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className={`card ${className}`}>
      {(title || actions) && (
        <div className="card-head">
          <div>
            {title && <h2>{title}</h2>}
            {note && <p className="small">{note}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}
export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="empty-note">{children}</p>;
}
// Live provider balances, read once the page has rendered (the server caches them for
// five minutes, see providerBalances). Both values are undefined until the read returns.
export function useProviders(): { eleven: any; openai: any } {
  const fetcher = useFetcher<{ data: { eleven: any; openai: any } }>();
  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) fetcher.load('/api/ops/providers');
  }, [fetcher]);
  return fetcher.data?.data || { eleven: undefined, openai: undefined };
}
