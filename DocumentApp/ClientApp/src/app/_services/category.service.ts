import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs';
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
        return response;
    }));
  }

  getCategory(id:number)
  {
    return this.http.get<Category>(this.baseUrl + 'categories/' + id).pipe(
      map((category:Category) => {
        return category;
      }));
  }

  createCategory(model:any)
  {
    return this.http.post(this.baseUrl + 'categories/', model)
  }

  updateCategory(id:number, model:any){
    return this.http.put(this.baseUrl + 'categories/' + id, model)
  }

  deleteCategory(id:number){
    return this.http.delete(this.baseUrl + 'categories/'+ (+id))
  }
}
