import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

type Wish = { name: string; message: string; attending: string; at: number };

export function RSVP({ guestName }: { guestName: string }) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState(guestName);
  const [message, setMessage] = useState("");
  const [attending, setAttending] = useState("Hadir");

  useEffect(() => {
    const saved = localStorage.getItem("ratu-ega-wishes");
    if (saved) setWishes(JSON.parse(saved));
  }, []);

  useEffect(() => setName(guestName), [guestName]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const next = [{ name, message, attending, at: Date.now() }, ...wishes].slice(0, 50);
    setWishes(next);
    localStorage.setItem("ratu-ega-wishes", JSON.stringify(next));
    setMessage("");
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Card className="p-6 border-gold/30 shadow-elegant">
        <form onSubmit={submit} className="space-y-4">
          <Input
            placeholder="Nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background/60"
          />
          <div className="flex gap-2">
            {["Hadir", "Tidak Hadir", "Ragu"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setAttending(opt)}
                className={`flex-1 text-xs sm:text-sm py-2 rounded-md border transition-all ${
                  attending === opt
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background/60 border-border hover:border-gold"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Tuliskan ucapan & doa terbaik Anda..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="bg-background/60"
          />
          <Button type="submit" className="w-full bg-gold text-accent-foreground hover:opacity-90">
            Kirim Ucapan
          </Button>
        </form>
      </Card>

      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {wishes.length === 0 && (
          <p className="text-center text-muted-foreground text-sm italic">
            Jadilah yang pertama memberikan ucapan
          </p>
        )}
        {wishes.map((w, i) => (
          <Card key={i} className="p-4 border-gold/20 bg-card/70">
            <div className="flex justify-between items-center mb-1">
              <span className="font-display font-semibold">{w.name}</span>
              <span className="text-[10px] uppercase tracking-wider text-gold">{w.attending}</span>
            </div>
            <p className="text-sm text-muted-foreground">{w.message}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
