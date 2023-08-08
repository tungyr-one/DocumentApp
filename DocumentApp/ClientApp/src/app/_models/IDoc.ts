import { ICategory as Category } from './ICategory';

export interface IDoc {
   id: number;
   name: string;
   created: Date;
   edited: Date;
   version: number;
   author: string;
   category:Category;
   text: string;
}
