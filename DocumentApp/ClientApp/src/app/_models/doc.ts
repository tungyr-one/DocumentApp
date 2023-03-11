import { Category } from './Category';
export interface Doc {
   id: number;
   name: string;
   created: Date;
   version: number;
   author: string;
   categoryId: number;
   categoryName: string;
   category:Category;
   text: string;
}
