import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { TreeData } from 'mat-tree-select-input';
import { map, tap, Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Category } from '../_models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl;
  categoriesOptions: TreeData[] = [];

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
    return this.http.get<Category[]>(this.baseUrl + 'categories').pipe(
      map(response => {
        return response;
    }),
    tap({
      next: (categories) => {
        const filteredArray = categories.filter(item => item.parentId === null);
        this.categoriesOptions = this.constructTreeData(filteredArray);
      }})
      )
    }

    createCategory(model:Category)
    {
      return this.http.post(this.baseUrl + 'categories/', model)
      .pipe(
        tap({next:()=> {
          this.getCategories();
          this.categoriesChanged();
        }})
      )
    }

    updateCategory(id:number, model:Category){
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

    constructTreeData(data:Category[]):TreeData[]{
      this.categoriesOptions = [];
      return data.map(
        (item:any)=>{
          let o:any = {
            name: item.name,
            value: item.id,
            children: item.children.length ? this.constructTreeData(item.children) : []
          }
          return o
        }
      )
    }
}
