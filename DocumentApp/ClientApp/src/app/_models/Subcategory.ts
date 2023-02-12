import { Doc } from 'src/app/_models/Doc';


export interface Subcategory {
   id: number;
   name: string;
   categoryId: number;
   categoryName: string;
   docs: Doc[];
}