export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'partner';
  timestamp: number;
  read: boolean;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  date: string;
  location?: string;
}

export interface LoveQuote {
  id: string;
  text: string;
  author: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface User {
  name: string;
  avatar: string;
  location: string;
  timezone: string;
}
