import { CategoryService } from './../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/Category';
import { DocService } from '../_services/doc.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeData } from 'mat-tree-select-input';
import { tap } from 'rxjs';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{
  newCategoryForm: FormGroup;
  isChecked:boolean = true;
  categoriesSelectOptions: TreeData[] = [];

  constructor(private docService:DocService,
    private categoriesService:CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
    this.newCategoryForm = this.fb.group({
      categoryName: ['!exampleCategory', [Validators.required]],
      parentCategory: [''],
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


  onSubmit(form: FormGroup) {
    let categoryName = this.newCategoryForm.get('categoryName')?.value;
    let parentCategory = this.newCategoryForm.controls['parentCategory']?.value;

    let newCategory:Category = {
      name: categoryName,
      parentId: parentCategory.id
    }

    this.categoriesService.createCategory(newCategory).subscribe({
      next: () => {
        this.toastr.success('Category created');
        this.router.navigateByUrl('/categories');
      },
      error:() => {
        this.toastr.error('Something went wrong!', 'Oops!');
      }
    });
  }


  cancel(){
    this.router.navigateByUrl('/categories');
  }
}
