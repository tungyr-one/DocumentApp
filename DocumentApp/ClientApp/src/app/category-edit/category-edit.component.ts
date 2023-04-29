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


  constructor(private categoriesService:CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadCategory();
    this.editCategoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
      parentCategory: ['parCat'],
    });
  }

  onSubmit() {
    let parentCategory = this.editCategoryForm.controls['parentCategory']?.value;

    if(parentCategory.level == 2)
    {
      this.toastr.error('The maximum depth of nested categories for the selected category has been reached', 'Oops!');
      return;
    }

    if(this.category.id)
    {
        this.categoriesService.updateCategory(this.category).subscribe({
              next: () => {
                this.toastr.success('Category updated', 'Done!')
                this.router.navigateByUrl('/categories')
              }
            })
    }
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

loadCategory(){
    let id = +this.route.snapshot.paramMap.get('id')!;
    if(id)
    {
      this.category$ = this.categoriesService.getCategory(id)
      .pipe(tap(category =>
        this.editCategoryForm.patchValue({
          name: category.name,
        })),
        tap(category => this.category = category),
        );
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
