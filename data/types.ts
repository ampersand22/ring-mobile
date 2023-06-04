export interface comment {
  id: number;
  text: string;
  author: number;
  timeStamp: number;
  likes: number[];
}

export interface post {
  id: number;
  text: string;
  timeStamp: number;
  likes: number[];
  author: number;
  comments: comment[];
  authorDetails: any,
}

export interface User {
  id: number;
  name: string;
  kayfabeName: string;
  billedFrom?: string;
  avatar?: string;
  location: string;
}