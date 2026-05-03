export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto">{children}</div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="text-center mb-12 animate-fade-up">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.4em] text-gold mb-3">{eyebrow}</p>
      )}
      <h2 className="font-display text-4xl sm:text-5xl">{title}</h2>
      <div className="divider-ornament mt-4 max-w-xs mx-auto">✦</div>
    </div>
  );
}
