import { CategoryService } from './../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/Category';
import { DocService } from '../_services/doc.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{
  newCategoryForm: FormGroup;
  Categories:Category[] = [];
  isChecked:boolean = true;

  constructor(private docService:DocService,
    private categoryService:CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
    this.newCategoryForm = this.fb.group({
      categoryName: ['!exampleCategory', [Validators.required]],
    });
  }

  onSubmit(form: FormGroup) {
    const values = {...this.newCategoryForm.value};
    let categoryName = this.newCategoryForm.get('categoryName')?.value;

    let newCategory:Category = {
      name: categoryName
    }

    this.categoryService.createCategory(newCategory).subscribe({
      next: () => {
        this.router.navigateByUrl('');
      },
    });

  }

  loadCategories(){
    this.categoryService.getCategories().subscribe({
      next: response => {
          this.Categories = response;
      }
    })
  }

  cancel(){
    this.router.navigateByUrl('');
  }
}
