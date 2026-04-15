import { useRef, useState, useCallback, useEffect } from "react";
import scratchSurface from "@/assets/scratch-surface.jpg";

const ScratchCard = ({ visible }: { visible: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.src = scratchSurface;

    img.onload = () => {
      imgRef.current = img;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);

      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Scratch instruction text
      ctx.fillStyle = "rgba(120, 80, 20, 0.7)";
      ctx.font = "600 14px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "Scratch to reveal the wedding date",
        canvas.offsetWidth / 2,
        canvas.offsetHeight / 2
      );
    };
  }, [visible]);

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const cx = x - rect.left;
    const cy = y - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, Math.PI * 2);
    ctx.fill();

    // Calculate reveal percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;

    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 128) transparent++;
    }

    if (transparent / (imageData.data.length / 4) > 0.4) {
      setRevealed(true);
    }
  }, []);

  const handlePointerDown = () => setScratching(true);
  const handlePointerUp = () => setScratching(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (scratching) scratch(e.clientX, e.clientY);
  };

  const handleAddToCalendar = () => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: "Nithin & Blessy's Wedding",
      dates: "20260510T110000/20260510T130000",
      details:
        "Join us in celebrating the holy matrimony of Nithin & Blessy. By the grace of God, we joyfully invite you to witness their union.",
      location: "The Grand Ballroom",
    });

    window.open(
      `https://calendar.google.com/calendar/render?${params.toString()}`,
      "_blank"
    );
  };

  if (!visible) return null;

  return (
    <section className="relative z-10 px-6 py-16">
      <div
        className="max-w-sm mx-auto text-center animate-fade-up"
        style={{ animationDelay: "2.8s", opacity: 0 }}
      >
        <h2 className="font-display text-3xl sm:text-4xl text-gold-gradient leading-[1.3] py-2 tracking-wide overflow-visible">
          Save The Date
        </h2>

        <div className="relative glass-card p-8 gold-glow overflow-hidden">
          {/* Revealed content */}
          <div className="text-center py-4">
            <p className="font-heading text-2xl text-primary mb-2">
              May 10, 2026
            </p>
            <p className="font-serif text-lg text-muted-foreground">
              Sunday, 11:00 AM
            </p>
            <p className="font-serif text-sm text-bougainvillea-light mt-2">
              The Grand Ballroom
            </p>
          </div>

          {/* Scratch overlay */}
          {!revealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onPointerMove={handlePointerMove}
              style={{ borderRadius: "var(--radius)" }}
            />
          )}
        </div>

        {/* Google Calendar button */}
        {revealed && (
          <div className="mt-6 animate-fade-up">
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-serif text-sm tracking-widest uppercase
                         bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-700
                         text-white shadow-lg hover:shadow-yellow-400/30 hover:scale-105
                         transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-white"
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
              </svg>
              Add to Google Calendar
            </button>

            <p className="font-serif text-xs text-ivory/40 mt-3 tracking-wide">
              Opens Google Calendar in a new tab
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScratchCard;