import { useRef, useState, type FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Icon } from '../components/Icon';
import { Magnetic } from '../components/Magnetic';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';

const perks = [
  'Free in-room calibration',
  'Five-year acoustic warranty',
  '30-day field trial',
];

export function Reserve() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const wordX = useTransform(scrollYProgress, [0, 1], ['4%', '-6%']);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus('error');
      return;
    }
    setStatus('success');
  };

  return (
    <section className="reserve" id="reserve" ref={ref}>
      <motion.span className="reserve__word" style={{ x: wordX }} aria-hidden="true">
        AETHER
      </motion.span>

      <div className="shell reserve__inner">
        <SectionHead index="05" label="Reserve" right="First series / 500" tone="light" />

        <div className="reserve__grid">
          <div className="reserve__copy">
            <Reveal>
              <h2>
                Make room
                <br />
                for <em>wonder.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="reserve__lead">
                The first series is limited to five hundred instruments. Reserve
                yours with no payment today — we will confirm your finish and
                delivery window personally.
              </p>
            </Reveal>

            <Reveal className="reserve__price" delay={0.15}>
              <span className="reserve__amount">$1,290</span>
              <span className="reserve__price-meta">
                Aether One / first series
                <br />
                Ships spring 2027
              </span>
            </Reveal>

            <Reveal className="reserve__perks" delay={0.2}>
              {perks.map((perk) => (
                <span key={perk}>
                  <Icon name="check" size={14} />
                  {perk}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal className="reserve__card" delay={0.1} y={40}>
            <div className="reserve__card-head">
              <span className="reserve__status">
                <span className="reserve__status-dot" />
                Private reservation
              </span>
              <span>001 / 500</span>
            </div>

            {status === 'success' ? (
              <div className="reserve__success" role="status">
                <span className="reserve__success-icon">
                  <Icon name="check" size={26} />
                </span>
                <h3>You are on the list.</h3>
                <p>
                  We will write to <strong>{email}</strong> when your field is ready
                  to be calibrated.
                </p>
                <span className="reserve__success-meta">Reservation / 129</span>
              </div>
            ) : (
              <form className="reserve__form" onSubmit={onSubmit} noValidate>
                <label htmlFor="reserve-email">Email address</label>
                <div className={`reserve__field ${status === 'error' ? 'is-error' : ''}`}>
                  <Icon name="mail" size={18} />
                  <input
                    id="reserve-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    aria-invalid={status === 'error'}
                    aria-describedby={status === 'error' ? 'reserve-email-error' : undefined}
                  />
                </div>
                {status === 'error' ? (
                  <p className="reserve__error" id="reserve-email-error" role="alert">
                    Please enter a valid email address.
                  </p>
                ) : null}

                <Magnetic strength={5}>
                  <button type="submit" className="btn btn--lime" data-cursor>
                    Reserve my Aether
                    <Icon name="arrowOutward" size={16} />
                  </button>
                </Magnetic>

                <p className="reserve__fineprint">
                  No payment today. Fully refundable. Your details stay with us.
                </p>
              </form>
            )}

            <div className="reserve__progress">
              <div className="reserve__progress-top">
                <span>First series</span>
                <span>128 / 500 reserved</span>
              </div>
              <div className="reserve__progress-bar">
                <span style={{ width: '25.6%' }} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
