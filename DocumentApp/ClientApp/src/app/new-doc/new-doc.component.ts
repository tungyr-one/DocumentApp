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



  // options: TreeData[] = []

  options: TreeData[] = [
    {
      name: 'Electronics',
      value: 'Electronics',
      children: [
        {
          name: 'Phones',
          value: 'Phones',
          children: [
            {
              name: 'Iphones',
              value: 'Iphones',
              children: []

            }
          ]
        }
      ]
    },

    {
      name: 'Web Development',
      value: 'Web Development',
      children: [
        {
          name: 'Frontend Development',
          value: 'Frontend Development',
          children: [
            {
              name: 'Angular',
              value: 'Angular',
              children: []


            },
            {
              name: 'React',
              value: 'React',
              children: []


            }
          ]
        }
      ]
    },
  ]




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
      categoryName: ['', [Validators.required]],
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

  filter(array: TreeData[], text: string) {

    const getNodes = (result:any, object:any) => {
      if ( object.name.toLowerCase().startsWith(text)) {
          result.push(object);
          return result;
      }
      if (Array.isArray(object.children)) {
        const children = object.children.reduce(getNodes, []);
        if (children.length) result.push({ ...object, children });
      }
      return result;
    };

    this.options = array.reduce(getNodes, []);
  }

  onSubmit(form: FormGroup) {
    let category = this.newDocForm.controls['categoryName'].value;
    console.log('category:', category);

    // if(category.name.substring(0,3) == this.prefix)
    // {
    //   category.name = category.name.replace(this.prefix, "");
    // }

    // let category = this.Categories.find((category) => category.name === category);

    const values = {...this.newDocForm.value, categoryId: category?.id};

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
          this.CategoriesNames = this.categoriesService.categoriesNamesWithPrefix;
        }}
      )
    ).subscribe();
  }

  cancel(){
    this.router.navigateByUrl('');
  }

}
