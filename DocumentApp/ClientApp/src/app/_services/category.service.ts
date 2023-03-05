import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, tap, Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Category } from '../_models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl;
  categories: Category[];
  categoriesNamesWithPrefix: string[] = [];
  prefix = "-- ";

  @Output() categoriesChangedEvent = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  categoriesChanged() {
    this.categoriesChangedEvent.emit();
  }

  getCategory(id:number)
  {
    return this.http.get<Category>(this.baseUrl + 'categories/' + id).pipe(
      map((category:Category) => {
        return category;
      }));
  }

  getCategories(){
    this.categoriesNamesWithPrefix = [];
    return this.http.get<Category[]>(this.baseUrl + 'categories').pipe(
      map(response => {
        return response;
    }),
    tap({
      next: (categories) => {
        this.categories = categories;
        this.makeOrderedListWithPrefixes();
      }})
      )
    }

    createCategory(model:any)
    {
      return this.http.post(this.baseUrl + 'categories/', model)
      .pipe(
        tap({next:()=> {
          this.getCategories();
          this.categoriesChanged()
        }})
      )
    }

    updateCategory(id:number, model:any){
      return this.http.put(this.baseUrl + 'categories/' + id, model)
      .pipe(
        tap({next: ()=> {
          this.getCategories();
          this.categoriesChanged();
        }})
      )
    }

    deleteCategory(id:number){
      return this.http.delete(this.baseUrl + 'categories/'+ (+id))
      .pipe(
        tap({next: ()=> {
          this.getCategories();
          this.categoriesChanged();
        }})
      )
    }

  makeOrderedListWithPrefixes():Observable<string[]>
  {
    this.categories.forEach(category => {
      if(category.parentId == null)
      {
        this.categoriesNamesWithPrefix.push(category.name)
        if(category.children)
        {
          category.children.forEach(subcategory => {
          this.categoriesNamesWithPrefix.push(this.prefix + subcategory.name)
        });
        }
      }
    });
    const result = of(this.categoriesNamesWithPrefix);
    return result;
  }

  addPrefixToDocCategoryName(categoryName:string){
    let docCategory = this.categories.find((obj) => {
      return obj.name === categoryName;
    });

    if(docCategory?.parentId)
    {
      return this.prefix + docCategory.name;
    }
    else
    {
      if(docCategory)
      {
        return docCategory?.name;
      }
      else
      {
        return;
      }

    }
  }
}
