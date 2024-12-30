export interface Message {
  id: number;
  content: string;
  isBot: boolean;
  date: string;
  question?: string;
  answers?: Answer[];
  explication?: string;
  isQuestion: boolean;
}


export interface Answer {
  text: string;
  correct: boolean;
}