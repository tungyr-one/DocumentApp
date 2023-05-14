import { CategoryService } from './../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/Category';
import { DocService } from '../_services/doc.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TreeData } from 'mat-tree-select-input';
import { IFlatNode } from '../_models/IFlatNode';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{
  newCategoryForm: FormGroup;
  parentCategory: TreeData = {
    name: 'none',
    id: 0,
    children: []
  };
  selectableParent = true;

  constructor(private docService:DocService,
    private categoriesService:CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.newCategoryForm = this.fb.group({
      categoryName: ['!exampleCategory', [Validators.required]],
      parentCategory: [''],
    });
  }

  onSubmit(form: FormGroup) {
    const newCategory:Category = {
      name: this.newCategoryForm.get('categoryName')?.value,
      parentId: this.parentCategory.id
    }

    if(this.parentCategory.id === 0)
    {
      newCategory.parentId = undefined;
    }

    this.categoriesService.createCategory(newCategory).subscribe({
      next: () => {
        this.toastr.success('Category created');
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

  cancel(){
    this.router.navigateByUrl('/categories');
  }
}
