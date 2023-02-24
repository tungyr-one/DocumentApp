
export interface CategoryDto {
   id?:number;
   name: string;
   parentId?: number;
   children?: string[];
}