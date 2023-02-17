import { CategoryService } from './../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/Category';
import { Subcategory } from '../_models/Subcategory';
import { DocService } from '../_services/doc.service';
import { SubcategoryService } from '../_services/subcategory.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-doc',
  templateUrl: './new-doc.component.html',
  styleUrls: ['./new-doc.component.css']
})
export class NewDocComponent implements OnInit{
  newDocForm: FormGroup;
  Categories:Category[] = [];
  Subcategories:Subcategory[] = [];

  constructor(private docService:DocService, 
    private catService:CategoryService, 
    private subcatService:SubcategoryService, 
    private toastr: ToastrService,
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
    //TODO remove consistent values
    this.newDocForm = this.fb.group({
      name: ['!Test doc', Validators.required],
      version: ['0.1', [Validators.required]],
      author: ['Victor', [Validators.required]],
      categoryName: ['', [Validators.required]],
      subcategoryName: [''],
      text: ['I had run into similar situation, the scenario was ',
       [Validators.required, Validators.minLength(15)]],
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid);
    const values = {...this.newDocForm.value};
    console.log(values);

    this.docService.createDocument(values).subscribe({
      next: () => {
        this.router.navigateByUrl('');
      },
    });    
  }

  loadCategories(){
    this.catService.getCategories().subscribe({
      next: response => {
          this.Categories = response;
      }
    })
  }

  onChange() {
    const values = {...this.newDocForm.value};
    const category = this.Categories.find((obj) => {
      return obj.name === values.categoryName;
    });
    if(category?.subcategories === undefined)
    {
      this.newDocForm.controls['subcategoryName'].setValue('None');
      this.Subcategories = [];
    }
    else
    {
        if(category?.subcategories)
        {
            this.Subcategories = category?.subcategories;
        }  
    }
  }

  //TODO:warn user he may lose data
  cancel(){
    this.router.navigateByUrl('');
  }

}
