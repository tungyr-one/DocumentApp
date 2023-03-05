import { Category } from './../_models/Category';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { Doc } from 'src/app/_models/Doc';
import { DocService } from '../_services/doc.service';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-doc-edit',
  templateUrl: './doc-edit.component.html',
  styleUrls: ['./doc-edit.component.css']
})
export class DocEditComponent implements OnInit{
  editForm: FormGroup;
  id:number;
  doc$:Observable<Doc>;
  Categories:Category[] = [];
  CategoryList:string[] = [];
  DocCategoryName:string;
  prefix = "-- ";

  constructor(private docService:DocService,
    private categoriesService:CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit() {
    this.loadCategories();
    this.loadDoc();
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      version: ['', [Validators.required]],
      author: ['', [Validators.required]],
      categoryName: ['', [Validators.required]],
      text: ['', [Validators.required, Validators.minLength(15)]],
    });
  }

  loadDoc(){
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if(this.id !== null)
    {
      this.doc$ = this.docService.getDocument(this.id)
      .pipe(
        tap(doc=>
        this.editForm.patchValue(doc)
        ),
        tap(doc=> this.loadDocCategory(doc.categoryName)),
        );
    }
    else
    {
      this.toastr.error('Unable to load document data');
    }
  }

  loadCategories(){
    this.categoriesService.getCategories()
    .pipe(
      tap(categories => this.Categories = categories),
      tap(categories => this.makeCategoriesList(categories))
      ).subscribe();
  }

  onSubmit(form: FormGroup) {
    const values = {...this.editForm.value};

    if(values.categoryName.substring(0,3) == this.prefix)
    {
      values.categoryName = values.categoryName.replace(this.prefix, "");
    }
    if(this.id)
    {
        this.docService.updateDocument(this.id, values).subscribe({
          next: () => {
            this.router.navigateByUrl('')
          }
        })
    }
  }

  deleteDoc()
  {
    if(this.id)
    {
    this.docService.deleteDocument(this.id).subscribe({
      next: () => {
        this.router.navigateByUrl('')
      }
    });
    }
  }

  loadDocCategory(categoryName:string){
    let docCategory = this.Categories.find((obj) => {
      return obj.name === categoryName;
    });

    if(docCategory?.parentId)
    {
      this.DocCategoryName = this.prefix + docCategory.name;
    }
    else
    {
      if(docCategory)
      this.DocCategoryName = docCategory?.name;
    }
  }

 makeCategoriesList(categories:Category[])
 {
  let CategoryList:string[] = []
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
