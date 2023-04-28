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
          this.categoriesSelectOptions = this.categoriesService.categoriesTreeData;
        }}
      )
    ).subscribe();
  }

  cancel(){
    this.router.navigateByUrl('');
  }

}
