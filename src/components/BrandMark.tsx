type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = '' }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="24" cy="24" r="9.5" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
      <path d="M24 5v6M24 37v6M5 24h6M37 24h6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M24 24 35.5 12.5" stroke="#C9FF3D" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="3.2" fill="#C9FF3D" />
    </svg>
  );
}
