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
  currentUser?: any;

  authorDetails?: User;
  likePost?: () => void;
  unlikePost?: () => void;
  makeComment?: () => void;
}

export interface User {
  id: number;
  name: string;
  kayfabeName: string;
  billedFrom?: string;
  avatar?: string;
  location: string;
}

export interface Stable {
  id: number;
  name: string;
  members: User[];
}

// stables 