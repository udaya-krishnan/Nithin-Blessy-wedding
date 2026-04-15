import dividerImg from "@/assets/floral-divider.png";

interface HeroSectionProps {
  visible?: boolean;
}

const HeroSection = ({ visible = true }: HeroSectionProps) => {
  if (!visible) return null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-visible z-10">
      <div className="text-center max-w-lg mx-auto pt-6 pb-6">

        {/* Opening blessing */}
        <p
          className="font-serif text-bougainvillea-light text-sm sm:text-base uppercase tracking-[0.3em] mb-2 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          By the grace of God
        </p>

        {/* Ceremony label */}
        <p
          className="font-heading text-ivory/60 text-xs sm:text-sm uppercase tracking-[0.4em] mb-8 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          ✦ Holy Matrimony ✦
        </p>

        {/* Names Wrapper (prevents clipping) */}
        <div className="overflow-visible">

          {/* First Name */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-gradient leading-[1.3] pt-2 pb-2 tracking-wide animate-soft-glow animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            Nithin Sunny
          </h1>

          {/* Ampersand */}
          <p
            className="font-heading text-bougainvillea-light text-2xl sm:text-3xl my-3 italic animate-fade-up"
            style={{ animationDelay: "0.9s" }}
          >
            &
          </p>

          {/* Second Name */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-gradient leading-[1.3] pt-2 pb-2 tracking-wide animate-soft-glow animate-fade-up"
            style={{ animationDelay: "1.2s" }}
          >
            Blessy Ann Jose
          </h1>

        </div>

        {/* Floral Divider */}
        <div
          className="my-8 flex justify-center animate-fade-up"
          style={{ animationDelay: "1.5s" }}
        >
          <img
            src={dividerImg}
            alt="floral divider"
            className="w-56 sm:w-72 opacity-80"
          />
        </div>

        {/* Invitation text */}
        <p
          className="font-serif text-ivory/80 text-lg sm:text-xl leading-relaxed tracking-wide animate-fade-up"
          style={{ animationDelay: "1.8s" }}
        >
          Together with their families
          <br />
          invite you to celebrate their wedding
        </p>

        {/* Scripture verse */}
        <p
          className="font-serif text-ivory/50 text-sm sm:text-base italic leading-relaxed mt-6 animate-fade-up"
          style={{ animationDelay: "2.1s" }}
        >
          "Two are better than one, for they have a good reward for their toil."
          <br />
          <span className="not-italic tracking-widest text-xs text-gold-gradient opacity-70">
            — Ecclesiastes 4:9
          </span>
        </p>

      </div>
    </section>
  );
};

export default HeroSection;