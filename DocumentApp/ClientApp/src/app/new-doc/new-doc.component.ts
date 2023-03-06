import { CategoryService } from './../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/Category';
import { DocService } from '../_services/doc.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-new-doc',
  templateUrl: './new-doc.component.html',
  styleUrls: ['./new-doc.component.css']
})
export class NewDocComponent implements OnInit{
  newDocForm: FormGroup;
  Categories:Category[] = [];
  CategoryList:string[] = [];
  prefix = "-- ";

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
      tap(categories => this.Categories = categories),
      tap(categories => this.makeCategoriesList(categories))
      ).subscribe();
  }

  makeCategoriesList(categories:Category[])
  {
   categories.forEach(category => {
     if(category.parentId == null)
     {
       this.CategoryList.push(category.name)
       if(category.children)
       {
         category.children.forEach(subcategory => {
         this.CategoryList.push(this.prefix + subcategory.name)
        });
       }
     }
   });
 }


  cancel(){
    this.router.navigateByUrl('');
  }

}
