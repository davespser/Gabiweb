import { useState, useEffect, useCallback } from 'react';
import { Heart, MessageCircle, Image, Quote, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/sections/HeroSection';
import { ChatSection } from '@/sections/ChatSection';
import { GallerySection } from '@/sections/GallerySection';
import { QuotesSection } from '@/sections/QuotesSection';
import { Footer } from '@/sections/Footer';
import { useChat } from '@/hooks/useChat';
import { useLoveQuotes } from '@/hooks/useLoveQuotes';
import type { Photo } from '@/types';
import './App.css';

// Configuración de la relación
const CONFIG = {
  myName: 'David',
  partnerName: 'Gabi',
  myLocation: 'Cartagena, España',
  partnerLocation: 'torrevieja, España',
  startDate: new Date('2026-01-02'), // Fecha de inicio de la relación
};

// Fotos de ejemplo para la galería
const SAMPLE_PHOTOS: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop',
    caption: 'Nuestra primera foto juntos',
    date: '15 de Junio, 2023',
    location: 'Parque Central',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop',
    caption: 'Atardecer mágico',
    date: '20 de Julio, 2023',
    location: 'Playa del Sol',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=400&fit=crop',
    caption: 'Momentos especiales',
    date: '5 de Agosto, 2023',
    location: 'Café Romántico',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=400&fit=crop',
    caption: 'Nuestro aniversario',
    date: '15 de Junio, 2024',
    location: 'Restaurante Especial',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop',
    caption: 'Paseo por la ciudad',
    date: '10 de Septiembre, 2023',
    location: 'Centro Histórico',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400&h=400&fit=crop',
    caption: 'Noche de estrellas',
    date: '25 de Diciembre, 2023',
    location: 'Mirador del Cielo',
  },
];

function App() {
  const { messages, sendMessage, markAsRead, unreadCount } = useChat();
  const { currentQuote, getRandomQuote } = useLoveQuotes();
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Heart },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'galeria', label: 'Galería', icon: Image },
    { id: 'frases', label: 'Frases', icon: Quote },
  ];

  return (
    <div className="min-h-screen bg-love-cream">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-soft py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('inicio')}
            className="flex items-center gap-2"
          >
            <Heart 
              className={`animate-heartbeat ${isScrolled ? 'text-love-pink' : 'text-white'}`} 
              size={28} 
              fill="currentColor"
            />
            <span 
              className={`font-script text-2xl ${
                isScrolled ? 'text-love-pink' : 'text-white'
              }`}
            >
              LoveBridge
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    activeSection === item.id
                      ? 'gradient-love text-white'
                      : isScrolled
                      ? 'text-gray-600 hover:bg-love-pink/10 hover:text-love-pink'
                      : 'text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.id === 'chat' && unreadCount > 0 && (
                    <span className="bg-love-rose text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-slide-up">
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === item.id
                        ? 'gradient-love text-white'
                        : 'text-gray-600 hover:bg-love-pink/10'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                    {item.id === 'chat' && unreadCount > 0 && (
                      <span className="ml-auto bg-love-rose text-white text-xs px-2 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <div id="inicio">
          <HeroSection
            partnerName={CONFIG.partnerName}
            myName={CONFIG.myName}
            startDate={CONFIG.startDate}
            myLocation={CONFIG.myLocation}
            partnerLocation={CONFIG.partnerLocation}
          />
        </div>

        {/* Chat Section */}
        <div id="chat">
          <ChatSection
            messages={messages}
            onSendMessage={sendMessage}
            partnerName={CONFIG.partnerName}
            unreadCount={unreadCount}
            onMarkAsRead={markAsRead}
          />
        </div>

        {/* Gallery Section */}
        <div id="galeria">
          <GallerySection photos={SAMPLE_PHOTOS} />
        </div>

        {/* Quotes Section */}
        <div id="frases">
          <QuotesSection
            currentQuote={currentQuote}
            onNewQuote={getRandomQuote}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer
        partnerName={CONFIG.partnerName}
        myName={CONFIG.myName}
      />

      {/* Floating Action Button for Chat */}
      {unreadCount > 0 && (
        <button
          onClick={() => scrollToSection('chat')}
          className="fixed bottom-6 right-6 w-14 h-14 gradient-love rounded-full shadow-love-lg flex items-center justify-center text-white animate-bounce-soft z-40 hover:scale-110 transition-transform"
        >
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-love-rose text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
            {unreadCount}
          </span>
        </button>
      )}
    </div>
  );
}

export default App;
