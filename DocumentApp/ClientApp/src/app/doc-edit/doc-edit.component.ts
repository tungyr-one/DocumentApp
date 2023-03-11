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
  CategoriesNames:string[] = [];
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
      version: [''],
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
        tap({next: (doc)=>{
          console.log('doc edit load doc: ', doc);
          this.editForm.patchValue(doc, {emitEvent: false, onlySelf: true}),
          this.DocCategoryName = this.categoriesService.addPrefixToDocCategoryName(doc.categoryName)!
        }})
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
      tap({
        next: (categories) => {
          this.Categories = categories;
          this.CategoriesNames = this.categoriesService.categoriesNamesWithPrefix;
        }}
      )
    ).subscribe();
  }

  onSubmit(form: FormGroup) {
    const values = {...this.editForm.value};
    console.log('values:', values);
    console.log('dirty?:', this.editForm.dirty);

    if(this.editForm.dirty)
    {
      let newVersion = ++values.version;
      this.editForm.controls['version'].setValue(newVersion);

      if(values.categoryName.substring(0,3) == this.prefix)
      {
        values.categoryName = values.categoryName.replace(this.prefix, "");
      }
      if(this.id)
      {
        this.docService.updateDocument(this.id, values).subscribe({
              next: () => {
                this.toastr.success('Document saved');
              },
              error:() => {
                this.toastr.error('Something went wrong!', 'Oops!');
              }
            })
        }
    }
    else
    {
      this.toastr.info('No changes found');
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

  cancel(){
    this.router.navigateByUrl('');
  }
}
