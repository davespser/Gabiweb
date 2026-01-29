import { useState, useEffect, useCallback } from 'react';
import type { Message } from '@/types';

const STORAGE_KEY = 'lovebridge_chat_messages';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load messages from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMessages(parsed);
        const unread = parsed.filter((m: Message) => m.sender === 'partner' && !m.read).length;
        setUnreadCount(unread);
      } catch (e) {
        console.error('Error parsing chat messages:', e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const sendMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      timestamp: Date.now(),
      read: true,
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const receiveMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'partner',
      timestamp: Date.now(),
      read: false,
    };
    setMessages(prev => [...prev, newMessage]);
    setUnreadCount(prev => prev + 1);
  }, []);

  const markAsRead = useCallback(() => {
    setMessages(prev => 
      prev.map(m => m.sender === 'partner' ? { ...m, read: true } : m)
    );
    setUnreadCount(0);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setUnreadCount(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    messages,
    unreadCount,
    sendMessage,
    receiveMessage,
    markAsRead,
    clearChat,
  };
}
