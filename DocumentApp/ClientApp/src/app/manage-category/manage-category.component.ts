import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, Observable } from 'rxjs';
import { Category } from '../_models/Category';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  Categories:Category[] = [];
  categories$: Observable<string[]>;
  categoryId:number;
  CategoriesNames:string[] = [];
  currentCategoryName:string;
  prefix = "-- ";

  constructor(private categoriesService:CategoryService,
    private router: Router,
    private toastr: ToastrService
    ){}

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
          this.toastr.success('Category deleted');
        },
        error:() => {
          this.toastr.error('Something went wrong!', 'Oops!');
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

