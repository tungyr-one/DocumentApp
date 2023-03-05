import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap, Observable } from 'rxjs';
import { Category } from '../_models/Category';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  Categories:Category[] = [];
  categories$: Observable<string[]>;
  CategoriesNames:string[] = [];
  categoryId:number;
  currentCategoryName:string;
  prefix = "-- ";

  constructor(private categoriesService:CategoryService,
    private router: Router){}

  ngOnInit(){
    this.loadCategories();

    this.categoriesService.categoriesChangedEvent
    .subscribe(() => {
         this.loadCategories();
    });
  }

  loadCategories(){
    this.categoriesService.getCategories()
    .pipe(
      tap({
        next: (categories) => {
          this.Categories = categories;
          this.currentCategoryName = categories[0].name;
          this.CategoriesNames = this.categoriesService.categoriesNamesWithPrefix;
        }}
      )
    ).subscribe();
  }

  editCategory(){
    this.router.navigateByUrl('/categories/edit/' + this.getCategoryId());
  }

  deleteCategory(){
    let id = this.getCategoryId();
    if(id)
    this.categoriesService.deleteCategory(id).subscribe({
      next: () => {
      }
    });
  }

  getCategoryId()
  {
    let categorName = this.currentCategoryName;
    if(categorName.substring(0,3) == this.prefix)
    {
      categorName = categorName.replace(this.prefix, "");
    }
    let category = this.Categories.find((obj) => {
      return obj.name === categorName;
    });
    return category?.id;
  }
}
