import { useState, useRef, useEffect } from 'react';
import { Send, Heart, Smile, Image, MoreVertical, Phone, Video, Check, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Message } from '@/types';

interface ChatSectionProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  partnerName: string;
  unreadCount: number;
  onMarkAsRead: () => void;
}

const quickMessages = [
  'Te amo ❤️',
  'Te extraño mucho',
  'Estoy pensando en ti',
  'Buenos días, amor',
  'Buenas noches, mi vida',
  'Eres lo mejor que me pasó',
];

export function ChatSection({ 
  messages, 
  onSendMessage, 
  partnerName,
  unreadCount,
  onMarkAsRead 
}: ChatSectionProps) {
  const [inputText, setInputText] = useState('');
  const [showQuickMessages, setShowQuickMessages] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Mark messages as read when entering the chat
  useEffect(() => {
    onMarkAsRead();
  }, [onMarkAsRead]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
      inputRef.current?.focus();
    }
  };

  const handleQuickMessage = (msg: string) => {
    onSendMessage(msg);
    setShowQuickMessages(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, msg) => {
    const date = new Date(msg.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(msg);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-love-cream to-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-love-pink/10 px-4 py-2 rounded-full mb-4">
            <Heart className="text-love-pink" size={18} />
            <span className="text-love-pink font-medium text-sm">Nuestro Chat Especial</span>
          </div>
          <h2 className="font-script text-4xl md:text-5xl text-gray-800 mb-3">
            Mensajes de Amor
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Cada mensaje es un puente que une nuestros corazones
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-3xl shadow-love-lg overflow-hidden border border-love-pink/20">
          {/* Chat Header */}
          <div className="gradient-love p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12 border-2 border-white/50">
                  <AvatarFallback className="bg-white/20 text-white font-script text-xl">
                    {partnerName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
              </div>
              <div>
                <h3 className="text-white font-medium">{partnerName}</h3>
                <p className="text-white/70 text-sm">En línea</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/20">
                <Phone size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/20">
                <Video size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/20">
                <MoreVertical size={20} />
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="h-[400px] md:h-[500px] bg-gradient-to-b from-love-lavender/30 to-love-cream/50" ref={scrollRef}>
            <div className="p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-20 h-20 rounded-full bg-love-pink/10 flex items-center justify-center mb-4">
                    <Heart className="text-love-pink" size={32} />
                  </div>
                  <p className="text-gray-500 mb-2">Aún no hay mensajes</p>
                  <p className="text-gray-400 text-sm">¡Envía el primer mensaje de amor!</p>
                </div>
              ) : (
                Object.entries(groupedMessages).map(([date, dateMessages]) => (
                  <div key={date}>
                    {/* Date separator */}
                    <div className="flex items-center justify-center my-4">
                      <div className="bg-white/70 px-4 py-1 rounded-full text-xs text-gray-500">
                        {formatDate(dateMessages[0].timestamp)}
                      </div>
                    </div>
                    
                    {dateMessages.map((msg, index) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-3 animate-slide-up`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className={`max-w-[75%] ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`px-4 py-3 shadow-soft ${
                              msg.sender === 'me'
                                ? 'chat-bubble-sent'
                                : 'chat-bubble-received'
                            }`}
                          >
                            <p className="text-sm md:text-base">{msg.text}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
                            {msg.sender === 'me' && (
                              msg.read ? (
                                <CheckCheck size={14} className="text-love-pink" />
                              ) : (
                                <Check size={14} className="text-gray-400" />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Quick Messages */}
          {showQuickMessages && (
            <div className="bg-white border-t border-love-pink/10 p-3 animate-slide-up">
              <p className="text-xs text-gray-500 mb-2">Mensajes rápidos:</p>
              <div className="flex flex-wrap gap-2">
                {quickMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickMessage(msg)}
                    className="px-3 py-1.5 bg-love-pink/10 hover:bg-love-pink/20 text-love-pink text-sm rounded-full transition-colors"
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-love-pink/10">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-love-pink hover:bg-love-pink/10"
                onClick={() => setShowQuickMessages(!showQuickMessages)}
              >
                <Smile size={22} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-love-pink hover:bg-love-pink/10"
              >
                <Image size={22} />
              </Button>
              <Input
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe un mensaje de amor..."
                className="flex-1 bg-gray-50 border-0 focus-visible:ring-love-pink/30 rounded-full px-4"
              />
              <Button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="gradient-love hover:opacity-90 rounded-full px-6 disabled:opacity-50"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Unread indicator */}
        {unreadCount > 0 && (
          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-2 bg-love-pink/10 text-love-pink px-4 py-2 rounded-full text-sm">
              <Heart size={16} className="animate-heartbeat" />
              Tienes {unreadCount} mensaje{unreadCount > 1 ? 's' : ''} sin leer
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
