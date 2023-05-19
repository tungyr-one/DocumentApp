import { CategoryService } from './../_services/category.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocService } from '../_services/doc.service';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { tap } from 'rxjs';
import { TreeData } from 'mat-tree-select-input';
import { IFlatNode } from '../_models/IFlatNode';


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

  docsCategoryId:number;
  selectableParent = true;

  constructor(private docService:DocService,
    private categoriesService:CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
    this.newDocForm = this.fb.group({
      name: ['', Validators.required],
      version: ['1'],
      author: ['', [Validators.required]],
      text: ['',
      [Validators.required, Validators.minLength(15)]],
    });
  }

  onNodeSelect(node:IFlatNode)
  {
    this.docsCategoryId = node.id;
  }

  onSubmit(form: FormGroup) {
    if(!this.docsCategoryId)
    {
      this.toastr.error('Please choose category!', 'Oops!');
      return;
    }

    const values = {...this.newDocForm.value, categoryId:this.docsCategoryId};

    this.docService.createDocument(values).subscribe({
      next: () => {
        this.toastr.success('Document created');
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
