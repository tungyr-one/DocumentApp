import { Doc } from 'src/app/_models/Doc';


export interface Subcategory {
   id: number|null;
   name: string;
   categoryId: number|null;
   categoryName: string;
   docs: Doc[]|null;
}