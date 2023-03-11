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
  categoryId:number;
  CategoriesNames:string[] = [];
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
      version: ['1'],
      author: ['Victor', [Validators.required]],
      categoryName: ['', [Validators.required]],
      text: ['Please ensure the versions of these two packages exactly match.',
      [Validators.required, Validators.minLength(15)]],
    });
  }

  onSubmit(form: FormGroup) {
    let categoryName = this.newDocForm.controls['categoryName'].value;

    if(categoryName.substring(0,3) == this.prefix)
    {
      categoryName = categoryName.replace(this.prefix, "");
    }

    let category = this.Categories.find((category) => category.name === categoryName);

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
          this.CategoriesNames = this.categoriesService.categoriesNamesWithPrefix;
        }}
      )
    ).subscribe();
  }

  cancel(){
    this.router.navigateByUrl('');
  }

}
