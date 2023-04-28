import { LoadingInterceptor } from '../_interceptors/loading.interceptor';
import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatNode } from '../_models/FlatNode';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_models/Category';
import { ToastrService } from 'ngx-toastr';
import { TreeData } from 'mat-tree-select-input';


@Component({
  selector: 'app-cat-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit{
  treeData:TreeData[] = [];

  private _transformer = (node: TreeData, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.value
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private categoriesService:CategoryService, private toastrService:ToastrService) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories()
  {
    this.categoriesService.getCategories().subscribe({
      next:() => {
        this.dataSource.data = this.categoriesService.categoriesTreeData;
      }
    })
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  deleteCategory(id:number){
    this.categoriesService.deleteCategory(id).subscribe({
      next: () => {
        this.ngOnInit();
        this.toastrService.success('Category deleted');
      },
      error:() => {
        this.toastrService.error('Something went wrong!', 'Oops!');
      }
    });
  }
}
