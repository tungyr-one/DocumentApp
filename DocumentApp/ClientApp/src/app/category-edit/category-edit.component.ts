import { CategoryService } from './../_services/category.service';
import { Component } from '@angular/core';
import { Category } from '../_models/Category';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {  Observable,  tap } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {
  id:string;
  category$: Observable<Category>;
  Category: Category;

  constructor(private categoryService:CategoryService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategory();
  }

loadCategory(){
    this.id = this.route.snapshot.paramMap.get('id')!;
    if(this.id !== null)
    {
      this.category$ = this.categoryService.getCategory(this.id)
      .pipe(
        tap(category =>  this.Category = category),
        );
    }
    else
    {
      this.toastr.error('Unable to load category data');
    }
  }

  onSubmit() {
    console.log(this.Category);
    if(this.id)
    {
      this.Category.children = [];
        this.categoryService.updateCategory(this.id, this.Category).subscribe({
          next: () => {
            this.router.navigateByUrl('')
          }
        })
    }
  }

   cancel(){
    this.router.navigateByUrl('');
  }
}
