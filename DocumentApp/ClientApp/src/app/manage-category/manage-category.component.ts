import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TreeData } from 'mat-tree-select-input';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  categoriesSelectOptions: TreeData[] = [];
  categoryForm: FormGroup;

  constructor(private categoriesService:CategoryService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
    ){}

    ngOnInit(){
      this.loadCategories();
      this.categoryForm = this.fb.group({
        category: [''],
      });

      this.categoriesService.categoriesChangedEvent
      .subscribe(() => {
           this.loadCategories();
      });
    }

    loadCategories(){
      this.categoriesService.getCategories()
      .pipe(
        tap({
          next: () => {
            this.categoriesSelectOptions = this.categoriesService.categoriesTreeData;
          }}
        )
      ).subscribe();
    }

    editCategory(){
      let formCategory = this.categoryForm.controls['category'].value;
      if(formCategory.value)
      {
        this.router.navigateByUrl('/categories/edit/' + formCategory.value);
      }
    }

    deleteCategory(){
      let formCategory = this.categoryForm.controls['category'].value;
      if(formCategory.value)
      {
        this.categoriesService.deleteCategory(formCategory.value).subscribe({
        next: () => {
          this.toastr.success('Category deleted');
        },
        error:error => {
          this.toastr.error(error.error.message, 'Oops!');
        }
      });
      }
    }
  }

