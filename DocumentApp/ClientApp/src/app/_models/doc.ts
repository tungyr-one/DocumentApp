import { Category } from './Category';

export interface Doc {
   id: number;
   name: string;
   created: Date;
   edited: Date;
   version: number;
   author: string;
   category:Category;
   text: string;
}
