import { useState, useEffect } from 'react';
import { Heart, Quote, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { LoveQuote } from '@/types';

interface QuotesSectionProps {
  currentQuote: LoveQuote;
  onNewQuote: () => void;
}

export function QuotesSection({ currentQuote, onNewQuote }: QuotesSectionProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedQuote, setDisplayedQuote] = useState(currentQuote);

  useEffect(() => {
    setDisplayedQuote(currentQuote);
  }, [currentQuote]);

  const handleNewQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onNewQuote();
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-love-cream relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 opacity-10">
          <Heart size={60} className="text-love-pink" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <Heart size={80} className="text-love-purple" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-5">
          <Sparkles size={100} className="text-love-pink" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-love-rose/10 px-4 py-2 rounded-full mb-4">
            <Quote className="text-love-rose" size={18} />
            <span className="text-love-rose font-medium text-sm">Palabras del Corazón</span>
          </div>
          <h2 className="font-script text-4xl md:text-5xl text-gray-800 mb-3">
            Frases de Amor
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Palabras que expresan lo que el corazón siente
          </p>
        </div>

        {/* Quote Card */}
        <div className="relative">
          {/* Decorative quote marks */}
          <div className="absolute -top-6 -left-4 md:-left-8">
            <Quote size={60} className="text-love-pink/20 fill-love-pink/10" />
          </div>
          <div className="absolute -bottom-6 -right-4 md:-right-8 rotate-180">
            <Quote size={60} className="text-love-pink/20 fill-love-pink/10" />
          </div>

          <div 
            className={`glass rounded-3xl p-8 md:p-12 text-center transition-all duration-300 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {/* Hearts decoration */}
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  size={16}
                  className="text-love-pink fill-love-pink animate-heartbeat"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="font-script text-2xl md:text-4xl text-gray-800 leading-relaxed mb-6">
              "{displayedQuote.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <div className="w-8 h-px bg-love-pink/30" />
              <span className="text-sm uppercase tracking-wider">{displayedQuote.author}</span>
              <div className="w-8 h-px bg-love-pink/30" />
            </div>

            {/* Decorative elements */}
            <div className="mt-8 flex justify-center">
              <div className="relative">
                <Heart 
                  size={32} 
                  className="text-love-pink fill-love-pink animate-heartbeat" 
                />
                <div className="absolute inset-0 animate-pulse-ring">
                  <Heart size={32} className="text-love-pink fill-love-pink" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New quote button */}
        <div className="text-center mt-8">
          <Button
            onClick={handleNewQuote}
            variant="outline"
            className="border-love-pink text-love-pink hover:bg-love-pink hover:text-white rounded-full px-6 gap-2 transition-all"
          >
            <RefreshCw size={18} className={isAnimating ? 'animate-spin' : ''} />
            Nueva Frase
          </Button>
        </div>

        {/* Love message */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm italic">
            "El amor no tiene fronteras, ni horarios, ni distancias."
          </p>
        </div>
      </div>
    </section>
  );
}
