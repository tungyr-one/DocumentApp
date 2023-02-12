import { Category } from './../_models/Category';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { Doc } from 'src/app/_models/Doc';
import { DocService } from '../_services/doc.service';
import { CategoryService } from '../_services/category.service';
import { Subcategory } from '../_models/Subcategory';
import { SubcategoryService } from '../_services/subcategory.service';

@Component({
  selector: 'app-doc-edit',
  templateUrl: './doc-edit.component.html',
  styleUrls: ['./doc-edit.component.css']
})
export class DocEditComponent implements OnInit{
  editForm: FormGroup;
  id:string|null;
  doc$:Observable<Doc>;
  Categories:Category[] = [];
  Subcategories:Subcategory[] = [];

  isSubmitted = false;

    // City Names


  constructor(private docService:DocService, 
    private catService:CategoryService, 
    private subcatService:SubcategoryService, 
    private toastr: ToastrService,
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {  
    this.loadDoc();
    this.loadCategories();
    this.loadSubcategories();
    this.editForm = this.fb.group({
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
    const values = {...this.editForm.value};
    console.log(values);

    if(this.id)
    {
        this.docService.UpdateDocument(this.id, values).subscribe({
              next: () => {
                this.router.navigateByUrl('')
              }, 
              // error: error:any => {
              //   console.log(error);
              // }
            })
    }

   

    this.toastr.success('Ehuuuuuuu!');

    this.isSubmitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      // alert(JSON.stringify(this.editForm.value))
      return true;
    }
  }


  loadDoc(){
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log("id: " + this.id);
    if(this.id !== null)
    {
      this.doc$ = this.docService.getDocument(this.id)
      .pipe(tap(doc=> this.editForm.patchValue(doc)));
      
    }
    else
    {
      this.toastr.error('Unable to load document data');
    }
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

  submit() {
    if (this.editForm.valid) {
      console.log(this.editForm.value);
    }
  }
  
  // Getter method to access formcontrols
  get categoryName() {
    return this.editForm.get('categoryName');
  }
}