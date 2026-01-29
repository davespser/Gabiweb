import { Heart, Instagram, Mail, Music, Send } from 'lucide-react';

interface FooterProps {
  partnerName: string;
  myName: string;
}

export function Footer({ partnerName, myName }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 gradient-love relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <Heart 
              className="text-white/10 fill-white/5"
              size={20 + Math.random() * 30}
            />
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main content */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="font-script text-2xl md:text-3xl text-white">{myName}</span>
            <Heart className="text-white fill-white animate-heartbeat" size={24} />
            <span className="font-script text-2xl md:text-3xl text-white">{partnerName}</span>
          </div>
          <p className="text-white/80 text-sm md:text-base max-w-md mx-auto">
            Dos corazones, una sola conexión. La distancia no es más que un número cuando el amor es verdadero.
          </p>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-4 mb-8">
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Telegram"
          >
            <Send size={20} />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Spotify"
          >
            <Music size={20} />
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} Nuestro Amor. Creado con mucho cariño.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span>Hecho con</span>
              <Heart className="text-white fill-white animate-heartbeat" size={14} />
              <span>para siempre</span>
            </div>
          </div>
        </div>

        {/* Love message */}
        <div className="mt-8 text-center">
          <p className="font-script text-xl md:text-2xl text-white/90">
            Te amo hoy, mañana y siempre
          </p>
        </div>
      </div>
    </footer>
  );
}
