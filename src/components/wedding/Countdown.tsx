import { useEffect, useState } from "react";

export function Countdown({ target }: { target: string }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) return setT({ d: 0, h: 0, m: 0, s: 0 });
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { label: "Hari", value: t.d },
    { label: "Jam", value: t.h },
    { label: "Menit", value: t.m },
    { label: "Detik", value: t.s },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
      {items.map((i) => (
        <div key={i.label} className="bg-card/80 backdrop-blur border border-gold/30 rounded-lg py-3 sm:py-4 shadow-soft">
          <div className="text-2xl sm:text-4xl font-display font-semibold text-gradient-gold">
            {String(i.value).padStart(2, "0")}
          </div>
          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">
            {i.label}
          </div>
        </div>
      ))}
    </div>
  );
}
