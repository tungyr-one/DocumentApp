import { CategoryService } from './../_services/category.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/Category';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TreeData } from 'mat-tree-select-input';
import { IFlatNode } from '../_models/IFlatNode';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {
  editCategoryForm: FormGroup;
  category$: Observable<Category>;
  category: Category;
  parentCategory: TreeData = {
    name: 'none',
    id: 0,
    children: []
  };
  selectableParent = true;


  constructor(private categoriesService:CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategory();
    this.editCategoryForm = this.fb.group({
      categoryName: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if(this.parentCategory.id !== 0)
    {
        if(this.parentCategory.id === this.category.id){
        this.toastr.error('Choosen parent category id and catetegory id cannot be the same', 'Oops!');
        return;
        }

        this.category.parentId = this.parentCategory.id;
    }
    else
    {
      this.category.parentId = undefined;
    }

    this.categoriesService.updateCategory(this.category).subscribe({
          next: () => {
        this.toastr.success('Category updated', 'Done!');
        this.router.navigateByUrl('/categories');
          },
          error:() => {
            this.toastr.error('Something went wrong!', 'Oops!');
          }
    });
  }

  onNodeSelect(node:IFlatNode)
  {
    this.parentCategory.id = node.id;
    this.parentCategory.name = node.name;
  }

  clearParent()
  {
    this.parentCategory = {
      name: 'none',
      id: 0,
      children: []
    };
  }

loadCategory(){
    const id = +this.route.snapshot.paramMap.get('id')!;
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
            const parentCategory = this.categoriesService
            .findCategoryById(this.categoriesService.categoriesTreeData, categoryData.parentId);
            parentCategory? this.parentCategory = parentCategory : this.parentCategory;
          }
        }})
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



