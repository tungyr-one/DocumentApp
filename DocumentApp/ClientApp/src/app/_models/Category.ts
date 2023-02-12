import { Doc } from "./Doc";
import { Subcategory } from "./Subcategory";

export interface Category {
   id: number;
   name: string;
   subcategories: Subcategory[];
   docs: Doc[];

}