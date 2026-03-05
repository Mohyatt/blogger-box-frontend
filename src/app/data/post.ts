import { Category } from './category';

export interface Post {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  category: Category;
}

export type Append<T, U> = T & U;

export type PostBase = Omit<Post, 'id' | 'createdDate' | 'category'>;

export type PostCreateInput = Append<PostBase, { categoryId: string }>;
