import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  createCategory(model:any)
  {
    return this.http.post(this.baseUrl + 'categories/', model)
  }

  deleteCategory(name:string){
    return this.http.delete(this.baseUrl + 'categories/'+ name)
  }
}
