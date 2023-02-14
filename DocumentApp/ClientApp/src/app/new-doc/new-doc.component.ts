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
    this.loadSubcategories();
    this.loadCategories();
    this.newDocForm = this.fb.group({
      name: ['', Validators.required],
      version: ['', [Validators.required]],
      author: ['', [Validators.required]],
      categoryName: ['', [Validators.required]],
      subcategoryName: ['', [Validators.required]],
      text: ['', [Validators.required, Validators.minLength(15)]],
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid);
    const values = {...this.newDocForm.value};
    console.log(values);

    this.docService.CreateDocument(values).subscribe({
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

  loadSubcategories(){
    this.subcatService.getSubcategories().subscribe({
      next: response => {
          this.Subcategories = response;
      }
    })
  }

  //TODO:warn user he may lose data
  cancel(){
    this.router.navigateByUrl('');
  }

}
