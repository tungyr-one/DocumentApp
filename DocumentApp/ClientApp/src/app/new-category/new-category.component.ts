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
  isChecked:boolean = true;
  prefix = "-- ";

  constructor(private docService:DocService,
    private categoryService:CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.newCategoryForm = this.fb.group({
      categoryName: ['!exampleCategory', [Validators.required]],
    });
  }

  onSubmit(form: FormGroup) {
    const values = {...this.newCategoryForm.value};
    console.log(values);
    let subcategories: Array<string> = [this.newCategoryForm.get('subcategoryNameOne')?.value,
    this.newCategoryForm.get('subcategoryNameTwo')?.value,
    this.newCategoryForm.get('subcategoryNameThree')?.value];
    console.log(subcategories);
    let newCategory:CategoryDto = {
      name: this.newCategoryForm.get('categoryName')?.value,
      subcategories: subcategories
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

  loadSubcategories(){
    this.subcatService.getSubcategories().subscribe({
      next: response => {
          this.Subcategories = response;
      }
    })
  }

  //TODO:warn user he may lose data
  cancel(){
    this.router.navigateByUrl('');
  }
}
