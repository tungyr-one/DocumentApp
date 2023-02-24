import { CategoryDto } from '../_models/CategoryDto';
import { CategoryService } from './../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/Category';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom, Observable, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {
  editCategoryForm: FormGroup;
  id:string;
  category$: Observable<Category>;
  Category: Category;
  Subcategories:Category[] = [];
 NewCategory = <CategoryDto>{name: '', children:[]};


  constructor(private categoryService:CategoryService,  
    private toastr: ToastrService,
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategory();
    this.editCategoryForm = this.fb.group({
      parentName: ['', [Validators.required]],
      subcategoriesNameOne: [''],
      subcategoriesNameTwo: [''],
      subcategoriesNameThree: [''],
    });
  }

  applyChanges(category:string){
    
  }

 

  onSubmit(form: FormGroup) {
    const values = {...this.editCategoryForm.value};

    let subcategoriesNames: Array<string> = [this.editCategoryForm.get('subcategoriesNameOne')?.value, 
    this.editCategoryForm.get('subcategoriesNameTwo')?.value,  
    this.editCategoryForm.get('subcategoriesNameThree')?.value];

    subcategoriesNames.forEach(subcategoryName => {
      if(subcategoryName != undefined)
      {
        this.Category.children
      }
    });

    
  }




loadCategory(){
    this.id = this.route.snapshot.paramMap.get('id')!;
    if(this.id !== null)
    {
      this.category$ = this.categoryService.getCategory(this.id)
      .pipe(tap(category => 
        this.editCategoryForm.patchValue({
          name: category.name,
          subcategoriesNameOne: category.children[0]?.name,
          subcategoriesNameTwo: category.children[1]?.name,
          subcategoriesNameThree: category.children[2]?.name
        })),
        tap(category =>  this.Category = category),
        );
    }
    else
    {
      this.toastr.error('Unable to load categoryument data');
    }
  }

  cancel(){
    this.router.navigateByUrl('');
  }
}
