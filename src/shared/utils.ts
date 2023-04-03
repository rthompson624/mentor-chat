import { IMentor } from "./interfaces";

export const MENTORS: IMentor[] = [
  { name: 'Arnold Schwarzenegger', imageUrl: 'arnold-schwarzenegger.jpg' },
  { name: 'Jordan Peterson', imageUrl: 'jordan-peterson.jpg' },
  { name: 'Jerry Seinfeld', imageUrl: 'jerry-seinfeld.jpg' },
  { name: 'Alan Alda', imageUrl: 'alan-alda.jpg' },
  { name: 'Buddha', imageUrl: 'buddha.jpg' },
];

export const MENTOR_CHAT_API_URL: string = import.meta.env.VITE_MENTOR_CHAT_API_URL;
