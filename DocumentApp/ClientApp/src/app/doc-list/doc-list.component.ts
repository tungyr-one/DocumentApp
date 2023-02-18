import { CategoryService } from './../_services/category.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doc } from '../_models/Doc';
import { DocService } from '../_services/doc.service';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocumentListComponent implements OnInit
{
  docs: Doc[] = [];
  displayedColumns: string[] = ['name', 'created', 'version', 'author', 'category', 'subcategory'];
  dataSource: MatTableDataSource<Doc>;

  @ViewChild(MatPaginator) paginator:MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);;
  @ViewChild(MatSort) sort:MatSort = new MatSort();

  constructor(public docService: DocService, public CategoryService:CategoryService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {   
    this.loadDocs();
  }

  loadDocs() {    
    this.docService.getDocuments().subscribe({
      next: (response: any) => {
          this.dataSource = new MatTableDataSource(response);
          // console.log('doc-list loadDocs:', response)
          this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;     
      }
    })
  }

  deleteDoc(id:string)
  {
    console.log("id:" + id);
    this.docService.deleteDocument(id).subscribe({
      next: () => {
        this.ngOnInit();
      }
    });
  }

  deleteCategory(id:string)
  {
    console.log("cat id:" + id);
    this.CategoryService.deleteCategory(id).subscribe({
      next: () => {
        this.ngOnInit();
      }
    });
  }

  // deleteCategory(name:string)
  // {
  //   console.log("cat name:" + name);
  //   this.CategoryService.deleteCategory(name).subscribe({
  //     next: () => {
  //       this.ngOnInit();
  //     }
  //   });
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}