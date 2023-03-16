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
  Categories:Category[] = [];
  CategoriesNames:string[] = [];
  DocCategoryName:string;
  prefix = "-- ";

  options: TreeData[] = [];

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

  constructTreeData(data:Category[]){
    return data.map(
      (item:any)=>{
        let o:any = {
          name: item.name,
          value: item.id,
          children: item.children.length ? this.constructTreeData(item.children) : []
        }
        console.log('o:', o);
        return o
      }
    )
  }


  loadDoc(){
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if(this.id !== null)
    {
      this.doc$ = this.docService.getDocument(this.id)
      .pipe(
        tap({next: (doc)=>{
          this.editForm.patchValue(doc, {emitEvent: false, onlySelf: true});
          let docCategory = this.searchCategoryById(doc.category.id!, this.options );
          this.editForm.controls['category'].setValue(docCategory);
        }})
        );
    }
    else
    {
      this.toastr.error('Unable to load document data');
    }
  }

  // interface CategoryData {
  //   name: string;
  //   id: number;
  //   children: CategoryData[];
  // }

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


  // searchTreeData(name: string, options: TreeData[]): TreeData | null {
  //   for (const option of options) {
  //     console.log('option: ', option);
  //     console.log('option value:', option.value)
  //     console.log('typeof value:', typeof option.value)
  //     if (option.name === name) {
  //       return option;
  //     } else if (option.children.length > 0) {
  //       const result = this.searchTreeData(name, option.children);
  //       if (result) {
  //         return result;
  //       }
  //     }
  //   }
  //   return null;
  // }

  // filter(array: TreeData[], id: number) {
  //   // console.log('filter:', array,text);

  //   let res:any;


  //     const getNodes = (result:any, object:any) =>
  //       {
  //         if (object.id === id) {

  //           return object;
  //         }

  //         if (Array.isArray(object.children)) {
  //           const result:any = getNodes(object.children, id);
  //           console.log('result: ', result);
  //           if (result === null)
  //           return result;
  //         }
  //         console.log('result 2: ', result);
  //         return result;
  //       };

  //       array.forEach(category => {
  //         getNodes(res, category);
  //       });
  //   }

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

  onSubmit(form: FormGroup) {
    const values = {...this.editForm.value};
    console.log(values);

    if(this.editForm.dirty)
    {
      let categoryName = this.editForm.controls['categoryName'].value;

      if(categoryName.substring(0,3) == this.prefix)
      {
        categoryName = categoryName.replace(this.prefix, "");
      }

      let category = this.Categories.find((category) => category.name === categoryName);

      const values = {...this.editForm.value, categoryId: category?.id};

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
