import { CategoryDto } from '../_models/CategoryDto';
import { CategoryService } from './../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/Category';
import { Subcategory } from '../_models/Subcategory';
import { SubcategoryService } from '../_services/subcategory.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {
  editCategoryForm: FormGroup;
  id:string|null;
  category$: Observable<Category>;
  Categories:Category[] = [];
  Subcategories:Subcategory[] = [];

  constructor(private categoryService:CategoryService,  
    private subcatService:SubcategoryService, 
    private toastr: ToastrService,
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategory();
    // this.loadSubcategories();
    this.editCategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      subcategoriesNameOne: [''],
      subcategoriesNameTwo: [''],
      subcategoriesNameThree: [''],
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid);
    const values = {...this.editCategoryForm.value};
    console.log('categories editform values:',values);
    let subcategories: Array<string> = [this.editCategoryForm.get('subcategoriesNameOne')?.value, 
    this.editCategoryForm.get('subcategoriesNameTwo')?.value,  
    this.editCategoryForm.get('subcategoriesNameThree')?.value];
    console.log('created subcategories array', subcategories);
    let updateCategory:CategoryDto = { 
      name: this.editCategoryForm.get('name')?.value,
      subcategories: subcategories
    }
    console.log('updateCategory:', updateCategory);

    if(this.id)
    {
        this.categoryService.updateCategory(this.id, updateCategory).subscribe({
        next: () => {
          this.router.navigateByUrl('');
        },
      });
    }

    
  }

  loadCategory(){
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id !== null)
    {
      this.category$ = this.categoryService.getCategory(this.id)
      .pipe(tap(category => 
        this.editCategoryForm.patchValue({
          name: category.name,
          subcategoriesNameOne: category.subcategories[0]?.name,
          subcategoriesNameTwo: category.subcategories[1]?.name,
          subcategoriesNameThree: category.subcategories[2]?.name
        })
        ),
        // tap(category=> this.editForm.controls['categoryName'].setValue(category.categoryName)),
        tap(category=> console.log('loadcategory - category:', category)),
        // tap(category=> this.loadSubcategories(category.name)),
        // tap(()=> console.log('loadcategory - Subcategories:', this.Subcategories)),
        );
    }
    else
    {
      this.toastr.error('Unable to load categoryument data');
    }
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
    // this.router.navigateByUrl('');
  }
}
