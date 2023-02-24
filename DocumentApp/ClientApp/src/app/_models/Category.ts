import { Doc } from "./Doc";

export interface Category {
   id: number;
   name: string;
   parentId: number;
   children: Category[];
   docs: Doc[];

}