import { useState } from "react";
import { X } from "lucide-react";

const GALLERY_IMAGES = [
  "/weddingphoto1.jpeg",
  "/weddingphoto2.jpeg",
  "/weddingphoto3.jpeg",
  "/weddingphoto4.jpeg",
  "/weddingphoto6.jpeg",
  "/weddingphoto7.jpeg",
];

const PhotoGallery = ({ visible }: { visible: boolean }) => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!visible) return null;

  return (
    <section className="relative z-10 px-6 py-16 overflow-visible">
      <div
        className="max-w-lg mx-auto text-center animate-fade-up"
        style={{ animationDelay: "3.8s" }} // removed opacity issue
      >
        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl text-gold-gradient leading-[1.3] py-2 tracking-wide animate-soft-glow">
          Gallery
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {GALLERY_IMAGES.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="group relative aspect-[2/3] overflow-hidden rounded-lg border border-border/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <img
                src={src}
                alt={`Wedding gallery ${i + 1}`}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-foreground/80 hover:text-foreground transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Image */}
          <img
            src={GALLERY_IMAGES[lightbox]}
            alt={`Wedding gallery ${lightbox + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;