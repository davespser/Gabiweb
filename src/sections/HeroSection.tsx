import { useState, useEffect } from 'react';
import { Heart, MapPin, Clock, Calendar } from 'lucide-react';
import { useTimer } from '@/hooks/useTimer';

interface HeroSectionProps {
  partnerName: string;
  myName: string;
  startDate: Date;
  myLocation: string;
  partnerLocation: string;
}

export function HeroSection({ partnerName, myName, startDate, myLocation, partnerLocation }: HeroSectionProps) {
  const { days, hours, minutes, seconds } = useTimer(startDate);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const timeUnits = [
    { value: days, label: 'Días' },
    { value: hours, label: 'Horas' },
    { value: minutes, label: 'Minutos' },
    { value: seconds, label: 'Segundos' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-love.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-love-pink/30 via-transparent to-love-purple/40" />
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
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
              className="text-love-pink/30 fill-love-pink/20"
              size={16 + Math.random() * 24}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Title */}
        <div className="mb-8">
          <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-lg mb-4">
            Nuestro Amor
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light">
            A pesar de la distancia, nuestros corazones laten al unísono
          </p>
        </div>

        {/* Names */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
          <div className="text-center">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 mb-3">
              <span className="font-script text-3xl md:text-4xl text-white">{myName[0]}</span>
            </div>
            <p className="text-white font-medium text-lg">{myName}</p>
            <div className="flex items-center justify-center gap-1 text-white/70 text-sm mt-1">
              <MapPin size={14} />
              <span>{myLocation}</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Heart className="text-love-pink fill-love-pink animate-heartbeat w-12 h-12 md:w-16 md:h-16 drop-shadow-lg" />
            <div className="mt-2 glass px-4 py-1 rounded-full">
              <span className="text-white text-sm font-medium">+</span>
            </div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 mb-3">
              <span className="font-script text-3xl md:text-4xl text-white">{partnerName[0]}</span>
            </div>
            <p className="text-white font-medium text-lg">{partnerName}</p>
            <div className="flex items-center justify-center gap-1 text-white/70 text-sm mt-1">
              <MapPin size={14} />
              <span>{partnerLocation}</span>
            </div>
          </div>
        </div>

        {/* Time Counter */}
        <div className="glass rounded-3xl p-6 md:p-8 mx-auto max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="text-love-pink" size={20} />
            <span className="text-white/80 text-sm uppercase tracking-wider">Tiempo juntos</span>
          </div>
          
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {timeUnits.map((unit, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 md:p-4 mb-2">
                  <span className="font-script text-3xl md:text-5xl lg:text-6xl text-white drop-shadow-md">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-white/70 text-xs md:text-sm uppercase tracking-wide">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
              <Calendar size={16} />
              <span>Desde {startDate.toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
