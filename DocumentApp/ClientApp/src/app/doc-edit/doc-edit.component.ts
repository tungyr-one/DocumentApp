import { Category } from './../_models/Category';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { Doc } from 'src/app/_models/Doc';
import { DocService } from '../_services/doc.service';
import { CategoryService } from '../_services/category.service';
import { TreeData } from 'mat-tree-select-input';

@Component({
  selector: 'app-doc-edit',
  templateUrl: './doc-edit.component.html',
  styleUrls: ['./doc-edit.component.css']
})
export class DocEditComponent implements OnInit{
  editForm: FormGroup;
  id:number;
  doc$:Observable<Doc>;
  categoriesSelectOptions: TreeData[] = [];

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
      category: ['', [Validators.required]],
      text: ['', [Validators.required, Validators.minLength(15)]],
    });
  }

  loadCategories(){
    this.categoriesService.getCategories()
    .pipe(
      tap({
        next: () => {
          this.categoriesSelectOptions = this.categoriesService.categoriesOptions;
        }}
      )
    ).subscribe();
  }

  loadDoc(){
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if(this.id !== null)
    {
      this.doc$ = this.docService.getDocument(this.id)
      .pipe(
        tap({next: (doc)=>{
          this.editForm.patchValue(doc, {emitEvent: false, onlySelf: true});
          let docCategory = this.searchCategoryById(doc.category.id!, this.categoriesSelectOptions);
          this.editForm.controls['category'].setValue(docCategory);
        }})
        );
    }
    else
    {
      this.toastr.error('Unable to load document data');
    }
  }

  searchCategoryById(id: number, categories: TreeData[]): TreeData | null {
    for (const category of categories) {
      if (+category.value === id) {
        return category;
      } else if (category.children.length > 0) {
        const result = this.searchCategoryById(id, category.children);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  onSubmit(form: FormGroup) {
    if(this.editForm.dirty)
    {
      let formCategory = this.editForm.controls['category'].value;
      const values = {...this.editForm.value, categoryId: formCategory.value};

      let newVersion = ++values.version;
      this.editForm.controls['version'].setValue(newVersion);

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

  cancel(){
    this.router.navigateByUrl('');
  }
}
