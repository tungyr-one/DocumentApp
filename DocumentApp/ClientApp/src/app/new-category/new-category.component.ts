import { NewCategory } from './../_models/NewCategory';
import { CategoryService } from './../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/Category';
import { Subcategory } from '../_models/Subcategory';
import { DocService } from '../_services/doc.service';
import { SubcategoryService } from '../_services/subcategory.service';
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
  Subcategories:Subcategory[] = [];
  isChecked:boolean = true;

  constructor(private docService:DocService, 
    private catService:CategoryService, 
    private subcatService:SubcategoryService, 
    private toastr: ToastrService,
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubcategories();
    this.newCategoryForm = this.fb.group({
      categoryName: ['!exampleCat', [Validators.required]],
      subcategoryNameOne: ['!exsubcat1'],
      subcategoryNameTwo: ['!exsubcat2'],
      subcategoryNameThree: ['!exsubcat3'],
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid);
    const values = {...this.newCategoryForm.value};
    console.log(values);
    let subcats: Array<string> = [this.newCategoryForm.get('subcategoryNameOne')?.value, 
    this.newCategoryForm.get('subcategoryNameTwo')?.value,  
    this.newCategoryForm.get('subcategoryNameThree')?.value];
    console.log(subcats);
    let newCategory:NewCategory = { 
      name: this.newCategoryForm.get('categoryName')?.value,
      subcategories: subcats
    }
    console.log(newCategory);

    // this.categoryService.createCategory(values).subscribe({
    //   next: () => {
    //     this.router.navigateByUrl('');
    //   },
    // });
    
  }

  loadCategories(){
    this.catService.getCategories().subscribe({
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
