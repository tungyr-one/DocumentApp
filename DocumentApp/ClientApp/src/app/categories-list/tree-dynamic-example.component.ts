import { ToastrService } from 'ngx-toastr';
import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../_services/category.service";
import { DynamicDatabase } from "./DynamicDatabase";
import { DynamicDataSource } from "./DynamicDataSource";
import { DynamicFlatNode } from "./DynamicFlatNode";
import { Category } from '../_models/Category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tree-dynamic-example',
  templateUrl: 'tree-dynamic-example.html',
  styleUrls: ['tree-dynamic-example.css'],
})
export class TreeDynamicExample implements OnInit{
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  dataMap = new Map<Category, Category[]>([]);
  categories:Category[] = [];
  rootLevelNodes: Category[] = [];

  constructor(private database: DynamicDatabase, private categoriesService:CategoryService,
    private toastr: ToastrService, private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.database);
    this.dataSource.data = this.database.initialData();

  }

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.item.children?.length! > 0;


  deleteCategory(id:number){
      this.categoriesService.deleteCategory(id).subscribe({
      next: () => {
        this.toastr.success('Category deleted', 'Done!');
      },
      error:() => {
        this.toastr.error('Something went wrong!', 'Oops!');
      }
    });
  }

}
