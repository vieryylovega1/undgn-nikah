import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { weddingConfig as W } from "@/lib/wedding-config";
import { Cover } from "@/components/wedding/Cover";
import { Countdown } from "@/components/wedding/Countdown";
import { RSVP } from "@/components/wedding/RSVP";
import { Section, SectionTitle } from "@/components/wedding/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Heart, Music, Pause, Volume2, VolumeX } from "lucide-react";
import couple from "@/assets/couple-hero.jpg";
import floral from "@/assets/floral-ornament.png";

export const Route = createFileRoute("/")({
  component: Invitation,
  head: () => ({
    meta: [
      { title: "Undangan Pernikahan Ratu & Ega" },
      { name: "description", content: "Dengan memohon rahmat Allah SWT, kami mengundang Anda ke pernikahan Ratu & Ega - 1 Januari 2031" },
      { property: "og:title", content: "Undangan Pernikahan Ratu & Ega" },
      { property: "og:description", content: "Rabu, 1 Januari 2031 - Sheraton Hotel Surabaya" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Great+Vibes&family=Montserrat:wght@300;400;500&display=swap",
      },
    ],
  }),
});

function Invitation() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [muted, setMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const guestName = useMemo(() => {
    if (typeof window === "undefined") return "Tamu Undangan";
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to") || params.get("guest");
    return to ? decodeURIComponent(to.replace(/\+/g, " ")) : "Tamu Undangan";
  }, []);

  useEffect(() => {
    if (opened) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [opened]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  const handleOpen = () => {
    setOpened(true);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.muted = muted;
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (!next && volume === 0) setVolume(0.6);
      return next;
    });
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value) / 100;
    setVolume(v);
    if (v > 0 && muted) setMuted(false);
    if (v === 0) setMuted(true);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <audio ref={audioRef} src="/wedding-sound.mp3" loop preload="auto" />
      {opened && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
          {showVolume && (
            <div className="flex items-center gap-2 bg-card/95 backdrop-blur border border-gold/30 shadow-elegant rounded-full px-3 py-2 animate-fade-up">
              <button
                onClick={toggleMute}
                aria-label={muted ? "Bunyikan" : "Bisukan"}
                className="text-foreground/80 hover:text-gold transition"
              >
                {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round((muted ? 0 : volume) * 100)}
                onChange={onVolumeChange}
                aria-label="Volume musik"
                className="w-24 accent-[hsl(var(--gold))] cursor-pointer"
              />
            </div>
          )}
          <button
            onClick={toggleMusic}
            onDoubleClick={() => setShowVolume((s) => !s)}
            aria-label={playing ? "Jeda musik" : "Putar musik"}
            className="w-12 h-12 rounded-full bg-gold text-accent-foreground shadow-elegant flex items-center justify-center hover:opacity-90 transition"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5 animate-pulse" />}
          </button>
          <button
            onClick={() => setShowVolume((s) => !s)}
            aria-label="Pengaturan volume"
            className="w-10 h-10 rounded-full bg-card/95 backdrop-blur border border-gold/30 text-foreground/80 hover:text-gold shadow-soft flex items-center justify-center transition"
          >
            {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      )}
      {!opened && <Cover guestName={guestName} onOpen={handleOpen} />}

      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-end justify-center overflow-hidden">
        <img
          src={couple}
          alt="Ratu dan Ega"
          width={1280}
          height={1920}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero-overlay" />
        <div className="relative z-10 text-center pb-16 px-6 animate-fade-up">
          <p className="text-xs uppercase tracking-[0.4em] text-foreground/70 mb-3">
            We Are Getting Married
          </p>
          <h1 className="font-script text-7xl sm:text-8xl text-gradient-gold leading-none">
            Ratu &amp; Ega
          </h1>
          <p className="mt-4 font-display text-lg text-foreground/80">
            {W.dateDisplay}
          </p>
        </div>
      </section>

      {/* QUOTE */}
      <Section>
        <div className="text-center max-w-2xl mx-auto animate-fade-up">
          <Heart className="w-8 h-8 text-gold mx-auto mb-4" />
          <p className="font-display italic text-lg sm:text-xl leading-relaxed text-foreground/80">
            "{W.quote.text}"
          </p>
          <p className="mt-4 text-sm tracking-widest text-gold uppercase">— {W.quote.source}</p>
        </div>
      </Section>

      {/* MEMPELAI */}
      <Section className="bg-secondary/30 relative">
        <img src={floral} alt="" width={1024} height={1024} loading="lazy"
          className="absolute top-0 right-0 w-48 opacity-40 pointer-events-none" />
        <SectionTitle eyebrow="The Bride & Groom" title="Mempelai" />
        <div className="grid sm:grid-cols-2 gap-8">
          {[W.bride, W.groom].map((p, i) => (
            <Card key={i} className="p-8 text-center border-gold/30 bg-card/80 shadow-soft">
              <p className="font-script text-5xl text-gradient-gold mb-2">{p.name}</p>
              <h3 className="font-display text-2xl mb-3">{p.fullName}</h3>
              <p className="text-sm text-muted-foreground">Putra/Putri dari</p>
              <p className="text-sm">{p.father}</p>
              <p className="text-sm">&amp;</p>
              <p className="text-sm">{p.mother}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* COUNTDOWN */}
      <Section>
        <SectionTitle eyebrow="Save The Date" title="Menuju Hari Bahagia" />
        <Countdown target={W.date} />
      </Section>

      {/* ACARA */}
      <Section className="bg-secondary/30">
        <SectionTitle eyebrow="The Events" title="Rangkaian Acara" />
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: "Akad Nikah", ...W.akad },
            { title: "Resepsi", ...W.resepsi },
          ].map((e) => (
            <Card key={e.title} className="p-8 border-gold/30 shadow-soft">
              <h3 className="font-display text-2xl text-center mb-6 text-gradient-gold">{e.title}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3"><Calendar className="w-4 h-4 text-gold mt-1 shrink-0" /><span>{W.dateDisplay}</span></div>
                <div className="flex gap-3"><Clock className="w-4 h-4 text-gold mt-1 shrink-0" /><span>{e.time}</span></div>
                <div className="flex gap-3"><MapPin className="w-4 h-4 text-gold mt-1 shrink-0" /><span><strong>{e.place}</strong><br />{e.address}</span></div>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild className="bg-gold text-accent-foreground hover:opacity-90">
            <a href={W.mapsUrl} target="_blank" rel="noreferrer">
              <MapPin className="mr-2 h-4 w-4" /> Lihat Lokasi
            </a>
          </Button>
        </div>
      </Section>

      {/* RSVP */}
      <Section>
        <SectionTitle eyebrow="RSVP" title="Ucapan & Doa" />
        <RSVP guestName={guestName} />
      </Section>

      {/* FOOTER */}
      <footer className="relative py-16 px-6 text-center bg-primary text-primary-foreground overflow-hidden">
        <img src={floral} alt="" width={1024} height={1024} loading="lazy"
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] opacity-15 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.4em] mb-4 opacity-70">Terima Kasih</p>
          <h2 className="font-script text-5xl text-gradient-gold mb-4">Ratu &amp; Ega</h2>
          <p className="text-sm opacity-80 max-w-md mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
          </p>
          <p className="mt-8 text-xs opacity-50">© 2026 — Made with ♥</p>
        </div>
      </footer>
    </div>
  );
}
