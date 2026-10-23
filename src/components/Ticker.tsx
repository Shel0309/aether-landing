import { Icon } from './Icon';

const items = [
  'Spatial field',
  'Adaptive acoustics',
  'Twelve drivers',
  'Zero latency',
  '24 bit / 96 khz',
  'Made in London',
];

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[0, 1].map((copy) => (
          <div className="ticker__group" key={copy}>
            {items.map((item) => (
              <span className="ticker__item" key={`${copy}-${item}`}>
                <Icon name="autoAwesome" size={13} />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
