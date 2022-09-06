export interface IPost {
  message: string;
  title: string | null;
  id: number;
  post_date: string;
}

export interface IComment {
  comment: string;
  comment_id: number;
  time: string;
  post_id: number;
}
