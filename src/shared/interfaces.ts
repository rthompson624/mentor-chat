export interface IMentor {
  name: string;
  imageUrl: string;
}

export type ROLE = 'system' | 'user' | 'assistant';

export interface IMessage {
  role: ROLE;
  content: string;
}
