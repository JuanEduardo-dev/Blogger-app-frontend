export interface Page {
  id: number;
  url: string;
}

export interface Tag {
  id: number;
  title: string;
  description: string;
}

export interface User {
  name: string;
  lastName: string;
  mail: string;
  degreeId: number;
  bio: string;
}

export interface Publication {
  id: string;
  title: string;
  content: string;
  date: string;
  page: Page;
  page_id: number;
  user: User;
  user_id: string;
  tags: Tag[];
  likes_count: number;
  dislikes_count: number;
}
