import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../environments/environment';
import { Category } from '../_models/Category';
import { Subcategory } from '../_models/Subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  baseUrl = environment.apiUrl;
  subcategories: Subcategory[];

  constructor(private http: HttpClient) { }

  getSubcategories(){
    return this.http.get<Subcategory[]>(this.baseUrl + 'subcategories').pipe(
      map(response => {
        this.subcategories = response;
      return this.subcategories;
  }))
  }

}
