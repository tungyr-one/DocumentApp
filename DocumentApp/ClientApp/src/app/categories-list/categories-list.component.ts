import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { IFlatNode } from '../_models/IFlatNode';
import { CategoryService } from '../_services/category.service';
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
      expandable: true,
      name: node.name,
      level: level,
      id: node.id
    };
  };

  treeControl = new FlatTreeControl<IFlatNode>(
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



  async onExpand(node:IFlatNode)
  {
    if(!this.treeControl.isExpanded(node))
    {
      await this.getChildren(node);
    }
    else
    {
      this.treeControl.collapse(node);
    }
  }

async getChildren(node:IFlatNode) {
    this.categoriesService.getCategory(node.id).subscribe({
      next:(category) => {
        if (category.children?.length)
        {
          const childrenTreeData = this.categoriesService.constructTreeData(category.children);
          const parentNode = this.categoriesService.findCategoryById(this.categoriesService.categoriesTreeData, node.id);

          if (parentNode)
          {
            parentNode.children = childrenTreeData;
            this.dataSource.data = this.categoriesService.categoriesTreeData;
            const index = this.treeControl.dataNodes.findIndex((item) => item.id === node.id);
            this.expandNodes(index, node.level);
          }
        }
      }
    })
  }

  expandNodes(nodeIndex:number, nodeLevel:number)
  {
    this.treeControl.expand(this.treeControl.dataNodes[nodeIndex]);
    if(nodeLevel > 0)
    {
      for(let i = nodeIndex - 1; i >= 0; i--)
      {
        const previousNode = this.treeControl.dataNodes[i];
        if(previousNode.level !== nodeLevel)
        {
          this.treeControl.expand(this.treeControl.dataNodes[i]);
        }

        if(previousNode.level === 0)
          return;
      }
    }
  }

  loadCategories()
  {
    this.categoriesService.getCategories().subscribe({
      next:() => {
        this.dataSource.data = this.categoriesService.categoriesTreeData;
      }
    })
  }

  hasChild = (_: number, node: IFlatNode) => node.expandable;

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
