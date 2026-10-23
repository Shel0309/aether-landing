import type { CSSProperties } from 'react';
import { icons, type IconName } from '../lib/icons';

type IconProps = {
  name: IconName;
  size?: number | string;
  className?: string;
  style?: CSSProperties;
};

export function Icon({ name, size = '1em', className = '', style }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`icon ${className}`.trim()}
      style={{ width: size, height: size, ...style }}
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  );
}
