import { Injectable } from "@angular/core";
import { Category } from "../_models/Category";
import { CategoryService } from "../_services/category.service";
import { DynamicFlatNode } from "./DynamicFlatNode";

@Injectable({providedIn: 'root'})
export class DynamicDatabase {

  dataMap = new Map<string, string[]>([
    ['Fruits', ['Apple', 'Orange', 'Banana']],
    ['Vegetables', ['Tomato', 'Potato', 'Onion']],
    ['Apple', ['Fuji', 'Macintosh']],
    ['Onion', ['Yellow', 'White', 'Purple']],
  ]);

  categories:Category[] = [];

  constructor(private categoriesService:CategoryService) { }

  getCategories(){
    this.categoriesService.getCategories().subscribe({
      next: (categories) =>
        {
          this.categories = categories;
          console.log(this.categories);
          // this.convertToDatasource();
          this.categoryMap();
         }
    })
  }

  convertToDatasource(){
    console.log(JSON.stringify(this.categories));
  }

  categoryMap(){
  const categoryMap = new Map<string, string[]>();
  const parentCatsNames: string[] = [];

  this.categories.forEach((category) => {
    if(category.parentId === null)
    {
      parentCatsNames.push(category.name);
    }
  const categoryChildrenNames = category?.children?.map((child) => child.name);

  if(categoryChildrenNames)
  categoryMap.set(category.name, categoryChildrenNames);
});

console.log('categoryMap :', categoryMap);
this.dataMap = categoryMap;
console.log('parentCatsNames :', parentCatsNames);
this.rootLevelNodes = parentCatsNames;
  }


  rootLevelNodes: string[] = ['Fruits', 'Vegetables'];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    this.getCategories();
    // this.convertToDatasource();
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
