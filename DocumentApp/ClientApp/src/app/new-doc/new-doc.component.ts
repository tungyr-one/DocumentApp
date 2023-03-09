import { CategoryService } from './../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/Category';
import { DocService } from '../_services/doc.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { TreeData } from 'mat-tree-select-input';
import {MatTreeModule} from '@angular/material/tree';

@Component({
  selector: 'app-new-doc',
  templateUrl: './new-doc.component.html',
  styleUrls: ['./new-doc.component.css']
})
export class NewDocComponent implements OnInit{
  newDocForm: FormGroup;
  Categories:Category[] = [];
  categoryId:number;
  CategoriesNames:string[] = [];
  prefix = "-- ";


  options: TreeData[] = []


  constructTreeData(data: any) {
    return data.map((item: any) => {
      let children = [];

      if (item.Children && item.Children.length) {
        children = this.constructTreeData(item.Children);
      }

      return {
        name: item.name,
        value: item.id,
        children: children,
      };
    });
  }

  selectedCategory:string;

  onSelectionChange()
  {
    console.log('selectedCategory:', this.selectedCategory);
  }

  constructor(private docService:DocService,
    private categoriesService:CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
    this.newDocForm = this.fb.group({
      name: ['!Test doc', Validators.required],
      version: ['1.0', [Validators.required]],
      author: ['Victor', [Validators.required]],
      categoryName: ['', [Validators.required]],
      text: ['Please ensure the versions of these two packages exactly match.',
      [Validators.required, Validators.minLength(15)]],
    });
  }

  onSubmit(form: FormGroup) {
    const values = {...this.newDocForm.value};

    if(values.categoryName.substring(0,3) == this.prefix)
    {
      values.categoryName = values.categoryName.replace(this.prefix, "");
    }

    this.docService.createDocument(values).subscribe({
      next: () => {
        this.toastr.success('Document saved');
        this.router.navigateByUrl('');
      },
      error:() => {
        this.toastr.error('Something went wrong!', 'Oops!');
      }
    });
  }

  loadCategories(){
    this.categoriesService.getCategories()
    .pipe(
      tap({
        next: (categories) => {
          this.Categories = categories;
          console.log(categories);
          this.options = this.constructTreeData(categories);
          this.CategoriesNames = this.categoriesService.categoriesNamesWithPrefix;
        }}
      )
    ).subscribe();
  }

  cancel(){
    this.router.navigateByUrl('');
  }

}
