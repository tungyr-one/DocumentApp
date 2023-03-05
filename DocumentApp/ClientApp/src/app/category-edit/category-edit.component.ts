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
  id:number;
  category$: Observable<Category>;
  Category: Category;
  Subcategories:Category[] = [];
 NewCategory = <Category>{name: '', children:[]};


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
    });
  }

  applyChanges(category:string){

  }



  onSubmit() {
    if(this.id)
    {
        this.categoryService.updateCategory(this.id, this.Category).subscribe({
              next: () => {
                this.router.navigateByUrl('')
              }
            })
    }
  }

loadCategory(){
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if(this.id !== null)
    {
      this.category$ = this.categoryService.getCategory(this.id)
      .pipe(tap(category =>
        this.editCategoryForm.patchValue({
          name: category.name,
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
