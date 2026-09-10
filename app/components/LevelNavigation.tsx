import SegmentLinks from './SegmentLinks';
// Levels without reviewed material stay visible as a placeholder link that does not navigate.
export default function LevelNavigation({
  label,
  value,
  hrefFor,
  onChange,
  available = ['A2', 'B1', 'B2'],
  soon = 'Binnenkort',
}) {
  return (
    <SegmentLinks
      id="level-control"
      label={label}
      value={value}
      onChange={onChange}
      options={['A2', 'B1', 'B2'].map((level) =>
        available.includes(level) || level === value
          ? { value: level, label: level, href: hrefFor(level) }
          : { value: level, label: level, note: soon },
      )}
    />
  );
}
