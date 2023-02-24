import { CategoryDto } from '../_models/CategoryDto';
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
      categoryName: ['!exampleCat', [Validators.required]],
      subcategoryNameOne: ['!exsubcat1'],
      subcategoryNameTwo: ['!exsubcat2'],
      subcategoryNameThree: ['!exsubcat3'],
    });
  }

  onSubmit(form: FormGroup) {
    const values = {...this.newCategoryForm.value};
    let subcategories: Array<string> = [this.newCategoryForm.get('subcategoryNameOne')?.value, 
    this.newCategoryForm.get('subcategoryNameTwo')?.value,  
    this.newCategoryForm.get('subcategoryNameThree')?.value];
    let newCategory:CategoryDto = { 
      name: this.newCategoryForm.get('categoryName')?.value,
      children: subcategories
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
