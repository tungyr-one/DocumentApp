import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Category } from '../_models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl;
  categories: Category[];

  constructor(private http: HttpClient) { }

  getCategories(){
    return this.http.get<Category[]>(this.baseUrl + 'categories').pipe(
      map(response => {
        this.categories = response;
      return this.categories;
    }))
  }

  getCategory(id:string)
  {
    // const category = this.categories.find(x => x.id === +id);
    // if (category != undefined) return of(category);
    return this.http.get<Category>(this.baseUrl + 'categories/' + id).pipe(
      map((category:Category) => {
        // console.log('CategoryService getCategory:', category);
        return category;
      }));
  }

  createCategory(model:any)
  {
    return this.http.post(this.baseUrl + 'categories/', model)
  }

  updateCategory(id:string, model:any){
    console.log('categoryService update category:', model)
    return this.http.put(this.baseUrl + 'categories/' + id, model)
  }

  deleteCategory(id:string){
    return this.http.delete(this.baseUrl + 'categories/'+ (+id))
  }
}
