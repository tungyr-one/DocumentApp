import { Injectable } from "@angular/core";
import { Category } from "../_models/Category";
import { CategoryService } from "../_services/category.service";
import { DynamicFlatNode } from "./DynamicFlatNode";

@Injectable({providedIn: 'root'})
export class DynamicDatabase {

  dataMap = new Map<Category, Category[]>([]);

  categories:Category[] = [];

  constructor(private categoriesService:CategoryService) { }

  rootLevelNodes: Category[] = [];

  initialData(): DynamicFlatNode[] {
    this.getCategories();
    return this.rootLevelNodes.map(category => new DynamicFlatNode(category, 0, true));
  }

  getCategories(){
    this.categoriesService.getCategories().subscribe({
      next: (categories) =>
        {
          this.categories = categories;
          this.categoryMap();
         }
    })
  }

  categoryMap(){
  const categoryMap = new Map<Category, Category[]>();
  const parentCatsNames: Category[] = [];

  this.categories.forEach((category) => {
    if(category.parentId === null)
    {
      parentCatsNames.push(category);
    }
  const categoryChildrenNames = category?.children?.map((child) => child);

  if(categoryChildrenNames)
  categoryMap.set(category, categoryChildrenNames);
});

this.dataMap = categoryMap;
this.rootLevelNodes = parentCatsNames;
  }

  getChildren(node: Category): Category[] | undefined {
    let ch = this.dataMap.get(node);
    return ch;
  }

  isExpandable(node: Category): boolean {
    return this.dataMap.has(node);
  }
}
