import { useEffect, useState } from "react";

const CountdownTimer = ({ visible }: { visible: boolean }) => {
  // Wedding: June 10, 2026 at 11:00 AM
  const targetDate = new Date("2026-06-10T11:00:00").getTime();

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate - Date.now());

      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!visible) return null;

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section className="relative z-10 px-6 py-16">
      <div className="max-w-md mx-auto text-center">
        <h2
          className="font-display text-4xl text-gold-gradient mb-2 animate-fade-up"
          style={{ animationDelay: "2.2s", opacity: 0 }}
        >
          Counting Down
        </h2>

        {/* Date & time display */}
        <p
          className="font-serif text-ivory/60 text-sm tracking-widest uppercase mb-8 animate-fade-up"
          style={{ animationDelay: "2.35s", opacity: 0 }}
        >
          June 10, 2026 &nbsp;·&nbsp; 11:00 AM
        </p>

        <div
          className="grid grid-cols-4 gap-3 animate-fade-up"
          style={{ animationDelay: "2.5s", opacity: 0 }}
        >
          {units.map((u) => (
            <div key={u.label} className="glass-card p-4 gold-glow text-center">
              <span className="font-heading text-3xl sm:text-4xl text-primary block">
                {String(u.value).padStart(2, "0")}
              </span>
              <span className="font-serif text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1 block">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;