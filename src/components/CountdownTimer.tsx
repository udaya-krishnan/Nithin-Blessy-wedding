import { useEffect, useState } from "react";

const CountdownTimer = ({ visible }: { visible: boolean }) => {
  // Wedding: May 10, 2026 at 11:00 AM
  const targetDate = new Date("2026-05-10T11:00:00").getTime();

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
    { label: "Days", short: "D", value: time.days },
    { label: "Hours", short: "H", value: time.hours },
    { label: "Minutes", short: "M", value: time.minutes },
    { label: "Seconds", short: "S", value: time.seconds },
  ];

  return (
    <section className="relative z-10 px-6 py-16 overflow-visible">
      <div className="max-w-md mx-auto text-center pt-4 pb-4">

        {/* Title */}
        <div className="overflow-visible">
          <h2
            className="font-display text-3xl sm:text-4xl text-gold-gradient leading-[1.3] py-2 tracking-wide animate-soft-glow animate-fade-up"
            style={{ animationDelay: "2.2s" }}
          >
            Counting Down
          </h2>
        </div>

        {/* Countdown Grid */}
        <div
          className="grid grid-cols-4 gap-2 sm:gap-3 animate-fade-up"
          style={{ animationDelay: "2.5s" }}
        >
          {units.map((u) => (
            <div
              key={u.label}
              className="glass-card p-3 sm:p-4 gold-glow text-center overflow-hidden"
            >
              {/* Number */}
              <span className="font-heading text-2xl sm:text-4xl text-primary block leading-[1.3]">
                {String(u.value).padStart(2, "0")}
              </span>

              {/* Label */}
              <span className="font-serif text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase text-muted-foreground mt-1 block">
                <span className="sm:hidden">{u.short}</span>
                <span className="hidden sm:inline">{u.label}</span>
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CountdownTimer;