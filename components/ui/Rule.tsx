import { Label } from "./Label";

type RuleProps = {
  label?: string;
  className?: string;
};

export function Rule({ label, className = "" }: RuleProps) {
  if (!label) {
    return <hr className={`border-0 border-t-2 border-ink ${className}`} />;
  }

  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      role="separator"
      aria-label={label}
    >
      <span aria-hidden="true" className="h-0.5 flex-1 bg-ink" />
      <Label>{label}</Label>
      <span aria-hidden="true" className="h-0.5 flex-1 bg-ink" />
    </div>
  );
}
