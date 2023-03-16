import { Category } from './../_models/Category';
import { CategoryService } from './../_services/category.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocService } from '../_services/doc.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { TreeData } from 'mat-tree-select-input';


@Component({
  selector: 'app-new-doc',
  templateUrl: './new-doc.component.html',
  styleUrls: ['./new-doc.component.css']
})
export class NewDocComponent implements OnInit{
  newDocForm: FormGroup;
  categoriesSelectOptions: TreeData[] = [];
  initialOptions: TreeData[] = [];
  selectedCategory:string;

  @ViewChild('searchInput', { static: false }) searchInputRef: ElementRef;

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
      category: ['', [Validators.required]],
      text: ['Please ensure the versions of these two packages exactly match.',
      [Validators.required, Validators.minLength(15)]],
    });
  }



  // filter(array: TreeData[], text: string) {

  //   const getNodes = (result:any, object:any) => {
  //     if ( object.name.toLowerCase().startsWith(text)) {
  //         result.push(object);
  //         return result;
  //     }
  //     if (Array.isArray(object.children)) {
  //       const children = object.children.reduce(getNodes, []);
  //       if (children.length) result.push({ ...object, children });
  //     }
  //     object.name = '0000000';
  //     result.push({ ...object});
  //     return result;
  //   };

  //   this.options = array.reduce(getNodes, []);

  // }


  filter(array: TreeData[], text: string) {
  // console.log('filter:', array,text);
    if(text !== "")
    {
      const getNodes = (result:any, object:any) =>
        {
          if ( object.name.toLowerCase().startsWith(text.toLowerCase())) {
              result.push(object);
              console.log('result: ', result);
              return result;
          }

          if (Array.isArray(object.children)) {
            const children = object.children.reduce(getNodes, []);
            // console.log('children: ', children);
            if (children.length) result.push({...object, children});
          }
          // console.log('result 2: ', result);
          return result;
        };

        this.categoriesSelectOptions = array.reduce(getNodes, []);

        console.log('options: ', this.categoriesSelectOptions);
      }
      else
      {
        this.categoriesSelectOptions = this.initialOptions;
      }
  }

  onSelectionChanged()
  {
    console.log('selectedCategory:', this.selectedCategory);
    // console.log(this.newDocForm.controls['category'].value);
  }

  reloadCategorySelect()
  {
    console.log('this.searchInputRef. reload:', this.searchInputRef.nativeElement.value);
    console.log('this.options reload:', this.categoriesSelectOptions);
    console.log(this.newDocForm.controls['category'].value);
    this.categoriesSelectOptions = this.initialOptions;
    this.newDocForm.get('category')?.reset();
    this.searchInputRef.nativeElement.value = '';

  }

  onSubmit(form: FormGroup) {
    let formCategory = this.newDocForm.controls['category'].value;
    const values = {...this.newDocForm.value, categoryId:formCategory.value};

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
        next: () => {
          this.categoriesSelectOptions = this.categoriesService.categoriesOptions;
          console.log('loadCategories options: ', this.categoriesSelectOptions);
          //remove
          this.initialOptions = this.categoriesSelectOptions;
        }}
      )
    ).subscribe();
  }

  cancel(){
    this.router.navigateByUrl('');
  }

}
