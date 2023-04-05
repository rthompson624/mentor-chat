import { IMentor } from "./interfaces";

export const MENTORS: IMentor[] = [
  { name: 'Arnold Schwarzenegger', imageUrl: 'arnold-schwarzenegger.jpg' },
  { name: 'Sarah Silverman', imageUrl: 'sarah-silverman.jpeg' },
  { name: 'Jerry Seinfeld', imageUrl: 'jerry-seinfeld.jpg' },
  { name: 'Oprah Winfrey', imageUrl: 'oprah-winfrey.jpeg' },
  { name: 'Donald Trump', imageUrl: 'donald-trump.jpeg' },
  { name: 'Tina Fey', imageUrl: 'tina-fey.jpeg' },
  { name: 'Tracy Morgan', imageUrl: 'tracy-morgan.png' },
  { name: 'Steve Jobs', imageUrl: 'steve-jobs.png' },
];

export const MENTOR_CHAT_API_URL: string = import.meta.env.VITE_MENTOR_CHAT_API_URL;
