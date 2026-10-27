import SegmentLinks from './SegmentLinks';
import { LEVELS, type Level } from '../types';
const visibleLevels: Level[] = LEVELS.filter((level) => level !== 'B2');
// Levels without reviewed material stay visible as a placeholder link that does not navigate.
export default function LevelNavigation({
  label,
  value,
  hrefFor,
  onChange,
  available = visibleLevels,
  soon = 'Binnenkort',
}) {
  return (
    <SegmentLinks
      id="level-control"
      label={label}
      value={value}
      onChange={onChange}
      options={visibleLevels.map((level) =>
        available.includes(level) || level === value
          ? { value: level, label: level, href: hrefFor(level) }
          : { value: level, label: level, note: soon },
      )}
    />
  );
}
