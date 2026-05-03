import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import floral from "@/assets/floral-ornament.png";
import { weddingConfig } from "@/lib/wedding-config";

export function Cover({ guestName, onOpen }: { guestName: string; onOpen: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <img
        src={floral}
        alt=""
        width={1024}
        height={1024}
        className="absolute -top-20 -left-20 w-80 opacity-60 animate-float"
      />
      <img
        src={floral}
        alt=""
        width={1024}
        height={1024}
        className="absolute -bottom-24 -right-20 w-80 opacity-60 rotate-180 animate-float"
      />

      <div className="relative z-10 animate-fade-up max-w-md">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">
          The Wedding Of
        </p>
        <h1 className="font-script text-6xl sm:text-7xl text-gradient-gold leading-none mb-2">
          Ratu &amp; Ega
        </h1>
        <p className="font-display text-base text-foreground/70 mb-10 mt-4">
          {weddingConfig.dateDisplay}
        </p>

        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Kepada Yth.
          </p>
          <p className="font-display text-2xl text-foreground">{guestName}</p>
        </div>

        <Button
          onClick={onOpen}
          size="lg"
          className="bg-gold text-accent-foreground hover:opacity-90 shadow-elegant px-8"
        >
          <Mail className="mr-2 h-4 w-4" />
          Buka Undangan
        </Button>
      </div>
    </div>
  );
}
