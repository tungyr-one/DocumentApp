import { CategoryService } from './../_services/category.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/Category';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TreeData } from 'mat-tree-select-input';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {
  editCategoryForm: FormGroup;
  category$: Observable<Category>;
  category: Category;
  categoriesSelectOptions: TreeData[] = [];
  selectableParent = true;
  parentCategoryId:number;


  constructor(private categoriesService:CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadDropdownCategoriesData();
    this.loadCategory();
    this.editCategoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
      parentCategory: [''],
    });
  }

  onSubmit() {
    if(!this.parentCategoryId)
    {
      this.toastr.error('Parent category not chosen!', 'Oops!');
      return;
    }

    if(this.parentCategoryId === this.category.id){
      this.toastr.error('Choosen parent category id and catetegory id cannot be the same', 'Oops!');
      return;
    }
    
    this.category.parentId = this.parentCategoryId;

    this.categoriesService.updateCategory(this.category).subscribe({
          next: () => {
            this.toastr.success('Category updated', 'Done!')
            this.router.navigateByUrl('/categories')
          },
          error:(error) => {
            this.toastr.error('Something went wrong!', 'Oops!');
          }
        })
  }

  onNodeSelect(id:number)
  {
    console.log('parent: ', id);
    this.parentCategoryId = id;
  }

  loadDropdownCategoriesData(){
    this.categoriesService.getCategories()
    .pipe(
      tap({
        next: () => {
          this.categoriesSelectOptions = this.categoriesService.categoriesTreeData;
        }}
      )
    ).subscribe();
  }


loadCategory(){
    let id = +this.route.snapshot.paramMap.get('id')!;
    if(id)
    {
      this.category$ = this.categoriesService.getCategory(id)
      .pipe
      (
        tap({next: (categoryData:Category)=>{
          this.editCategoryForm.patchValue({
            name: categoryData.name,});
          this.category = categoryData;

          if(categoryData.parentId)
          {
            var parentCategory = this.categoriesService
            .findCategoryById(this.categoriesSelectOptions,categoryData.parentId);
            this.editCategoryForm.controls['parentCategory'].setValue(parentCategory);
          }
        }})
      )
    }
    else
    {
      this.toastr.error('Unable to load category data');
    }
  }

  deleteCategory(){
    if(this.category.id)
    {
      this.categoriesService.deleteCategory(this.category.id).subscribe({
      next: () => {
        this.toastr.success('Category deleted', 'Done!');
        this.router.navigateByUrl('');
      },
      error:() => {
        this.toastr.error('Something went wrong!', 'Oops!');
      }
    });
    }
  }

  cancel(){
    this.router.navigateByUrl('/categories');
  }
}



