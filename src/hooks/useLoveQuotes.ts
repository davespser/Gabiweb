import { useState, useCallback } from 'react';
import type { LoveQuote } from '@/types';

const quotes: LoveQuote[] = [
  { id: '1', text: 'El amor no conoce distancias, solo conecta corazones.', author: 'Anónimo' },
  { id: '2', text: 'Cada kilómetro que nos separa vale la pena por cada segundo que pasamos juntos.', author: 'Anónimo' },
  { id: '3', text: 'La distancia significa tan poco cuando alguien significa tanto.', author: 'Anónimo' },
  { id: '4', text: 'Nuestros corazones están sincronizados, sin importar la distancia.', author: 'Anónimo' },
  { id: '5', text: 'El amor verdadero no se mide en kilómetros, sino en latidos.', author: 'Anónimo' },
  { id: '6', text: 'Contigo, cada despedida es solo una cuenta regresiva para el próximo abrazo.', author: 'Anónimo' },
  { id: '7', text: 'La distancia es solo una prueba para ver qué tan lejos puede viajar el amor.', author: 'Anónimo' },
  { id: '8', text: 'Te llevo en mi corazón, dondequiera que vaya.', author: 'Anónimo' },
  { id: '9', text: 'Nuestro amor es más fuerte que cualquier distancia.', author: 'Anónimo' },
  { id: '10', text: 'Cada día que pasa es un día menos para estar juntos.', author: 'Anónimo' },
  { id: '11', text: 'El amor no tiene fronteras, ni horarios, ni distancias.', author: 'Anónimo' },
  { id: '12', text: 'Eres mi pensamiento favorito, sin importar la hora o el lugar.', author: 'Anónimo' },
];

export function useLoveQuotes() {
  const [currentQuote, setCurrentQuote] = useState<LoveQuote>(quotes[0]);

  const getRandomQuote = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

  return {
    currentQuote,
    getRandomQuote,
    allQuotes: quotes,
  };
}
