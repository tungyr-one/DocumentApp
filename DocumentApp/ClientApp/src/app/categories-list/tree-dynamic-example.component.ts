import { FlatTreeControl } from "@angular/cdk/tree";
import { Component } from "@angular/core";
import { DynamicDatabase } from "./DynamicDatabase";
import { DynamicDataSource } from "./DynamicDataSource";
import { DynamicFlatNode } from "./DynamicFlatNode";

/**
 * @title Tree with dynamic data
 */
@Component({
  selector: 'tree-dynamic-example',
  templateUrl: 'tree-dynamic-example.html',
  styleUrls: ['tree-dynamic-example.css'],
})
export class TreeDynamicExample {
  constructor(database: DynamicDatabase) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    this.dataSource.data = database.initialData();
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
