import { Category } from './../_models/Category';
import { CategoryService } from './../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  options: TreeData[] = [];
  initialOptions: TreeData[] = [];




  selectedCategory:string;

  onSelectionChanged()
  {
    // console.log('selectedCategory:', this.selectedCategory);
    console.log( this.newDocForm.controls['categoryName'].value);
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
      version: ['1'],
      author: ['Victor', [Validators.required]],
      category: ['', [Validators.required]],
      text: ['Please ensure the versions of these two packages exactly match.',
      [Validators.required, Validators.minLength(15)]],
    });
  }

  constructTreeData(data:Category[]){
    return data.map(
      (item:any)=>{
        let o:any = {
          name: item.name,
          id: item.id,
          children: item.children.length ? this.constructTreeData(item.children) : []
        }
        return o
      }
    )
  }

  // filter(array: TreeData[], text: string) {
  filter(text: string) {
  // console.log('filter:', array,text);
  let array = this.options;

    const getNodes = (result:any, object:any) =>
    {
      if ( object.name.toLowerCase().startsWith(text)) {
          result.push(object);
          // console.log('result: ', result);
          return result;
      }

      if (Array.isArray(object.children)) {
        const children = object.children.reduce(getNodes, []);
        // console.log('children: ', children);
        if (children.length) result.push({ ...object, children });
      }
      console.log('result 2: ', result);
      return result;
    };

    this.options = array.reduce(getNodes, []);

    console.log('options: ', this.options);
  }

  reloadCategorySelect()
  {
    this.options = this.initialOptions;
  }

  onSubmit(form: FormGroup) {
    let category = this.newDocForm.controls['category'].value;
    console.log(category);
    const values = {...this.newDocForm.value, categoryId:category.id};

    console.log(values);

    this.docService.createDocument(values).subscribe({
      next: () => {
        this.toastr.success('Document saved');
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
          const filteredArray = categories.filter(item => item.parentId === null);
          this.options = this.constructTreeData(filteredArray);
          this.initialOptions = this.options;
          this.CategoriesNames = this.categoriesService.categoriesNamesWithPrefix;
        }}
      )
    ).subscribe();
  }

  cancel(){
    this.router.navigateByUrl('');
  }

}
