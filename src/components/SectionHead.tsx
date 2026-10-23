type SectionHeadProps = {
  index: string;
  label: string;
  right?: string;
  tone?: 'dark' | 'light';
};

export function SectionHead({ index, label, right, tone = 'dark' }: SectionHeadProps) {
  return (
    <div className={`section-head section-head--${tone}`}>
      <div className="section-head__left">
        <span className="section-head__index">{index}</span>
        <span className="section-head__label">{label}</span>
      </div>
      {right ? <span className="section-head__right">{right}</span> : null}
    </div>
  );
}
