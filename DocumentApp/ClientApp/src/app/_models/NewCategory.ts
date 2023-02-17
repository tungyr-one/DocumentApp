import { Doc } from "./Doc";
import { Subcategory } from "./Subcategory";

export interface NewCategory {
   name: string;
   subcategoryNames: string[];
}