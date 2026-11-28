type SectionHeaderProps = {
  title: string;
  issue: string;
  id?: string;
  className?: string;
};

export function SectionHeader({
  title,
  issue,
  id,
  className = "",
}: SectionHeaderProps) {
  return (
    <header className={className}>
      <p className="mb-3 font-mono text-sm font-medium text-ink">§ {issue}</p>
      <h2
        id={id}
        className="font-display text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl"
      >
        {title}
      </h2>
    </header>
  );
}
