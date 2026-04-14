import { Navigation, Church, Star } from "lucide-react";

const EventLocation = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  const venues = [
    {
      icon: Church,
      tag: "Wedding Ceremony",
      name: "St. George Orthodox Syrian Church",
      address: "Chuvannamannu, Thrissur, Kerala – 680652",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=St+George+Orthodox+Syrian+Church+Chuvannamannu+Thrissur+Kerala",
      delay: "3.1s",
    },
    {
      icon: Star,
      tag: "Reception",
      name: "Dream City Convention Centre",
      address: "Peechi Road Junction, Pattikkad, Thrissur, Kerala – 680652",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Dream+City+Convention+Centre+Pattikkad+Thrissur+Kerala",
      delay: "3.4s",
    },
  ];

  return (
    <section className="relative z-10 px-6 py-16">
      <div className="max-w-sm mx-auto text-center">

        {/* Section heading */}
        <h2
          className="font-display text-4xl text-gold-gradient mb-10 animate-fade-up"
          style={{ animationDelay: "2.9s", opacity: 0 }}
        >
          Venues
        </h2>

        <div className="flex flex-col gap-6">
          {venues.map((venue) => {
            const Icon = venue.icon;
            return (
              <div
                key={venue.name}
                className="glass-card p-8 gold-glow animate-fade-up"
                style={{ animationDelay: venue.delay, opacity: 0 }}
              >
                {/* Event type tag */}
                <p className="font-serif text-xs uppercase tracking-[0.3em] text-bougainvillea-light mb-4">
                  {venue.tag}
                </p>

                {/* Icon circle */}
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Venue name */}
                <h3 className="font-heading text-xl text-primary mb-2">
                  {venue.name}
                </h3>

                {/* Address */}
                <p className="font-serif text-muted-foreground text-sm leading-relaxed mb-6">
                  {venue.address}
                </p>

                {/* Google Maps button — fixed: was missing opening <a */}
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full font-serif text-sm text-primary tracking-wide hover:bg-primary/20 transition-colors duration-300"
                >
                  <Navigation className="w-4 h-4" />
                  Open in Google Maps
                </a>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventLocation;