export interface Doc {
   id: number;
   name: string;
   created: Date;
   version: string;
   author: string;
   categoryId: number;
   subcategoryId: number;
   categoryName: string;
   subcategoryName: string;
   text: string;
}